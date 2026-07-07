import { expect, test, type Page } from "@playwright/test";

const keyRoutes = [
  { path: "/es", locale: "es" },
  { path: "/en", locale: "en" },
  { path: "/es/servicios/colombia", locale: "es" },
  { path: "/en/services/colombia", locale: "en" },
  { path: "/es/servicios/colombia/efecto-polvo", locale: "es" },
  { path: "/en/services/colombia/powder-brows", locale: "en" },
  { path: "/es/formaciones", locale: "es" },
  { path: "/en/professional-training", locale: "en" },
  {
    path: "/es/formaciones/curso-micropigmentacion-cejas",
    locale: "es",
  },
  {
    path: "/en/professional-training/brow-micropigmentation-course",
    locale: "en",
  },
  { path: "/es/resultados", locale: "es" },
  { path: "/en/results", locale: "en" },
  { path: "/es/contacto", locale: "es" },
  { path: "/en/contact", locale: "en" },
  { path: "/es/cookies", locale: "es" },
  { path: "/en/cookies", locale: "en" },
] as const;

async function getMetaContent(page: Page, selector: string) {
  return page.locator(selector).first().getAttribute("content");
}

async function getJsonLd(page: Page) {
  return page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? "{}");

      return Array.isArray(parsed) ? parsed : [parsed];
    }),
  );
}

test.describe("SEO technical foundation", () => {
  for (const route of keyRoutes) {
    test(`${route.path} has indexable localized metadata`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page.locator("html")).toHaveAttribute("lang", route.locale);
      await expect(page.locator("h1")).toHaveCount(1);

      const title = await page.title();
      expect(title.length).toBeGreaterThan(18);

      const description = await getMetaContent(page, 'meta[name="description"]');
      expect(description?.length ?? 0).toBeGreaterThan(60);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain(route.path);
      expect(canonical).not.toContain("undefined");

      for (const hreflang of ["es", "en", "x-default"]) {
        const alternate = await page
          .locator(`link[rel="alternate"][hreflang="${hreflang}"]`)
          .getAttribute("href");
        expect(alternate).toBeTruthy();
        expect(alternate).not.toContain("undefined");
      }

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);

      const robots = await getMetaContent(page, 'meta[name="robots"]');
      expect(robots ?? "").not.toContain("noindex");

      const schemas = await getJsonLd(page);
      expect(schemas.length).toBeGreaterThan(0);
      expect(schemas.some((schema) => schema["@type"] === "WebPage")).toBe(true);
    });
  }

  test("home schema lists confirmed physical studios in Cali and Puerto de Sagunto", async ({
    page,
  }) => {
    await page.goto("/es");

    const schemas = await getJsonLd(page);
    const schemaTypes = schemas.map((schema) => schema["@type"]);
    expect(schemaTypes).toEqual(
      expect.arrayContaining(["Organization", "BeautySalon", "WebSite", "WebPage"]),
    );

    const beautySalons = schemas.filter((schema) => schema["@type"] === "BeautySalon");
    const serialized = JSON.stringify(beautySalons);
    expect(beautySalons).toHaveLength(2);
    expect(serialized).toContain("El Templete");
    expect(serialized).toContain("Puerto de Sagunto");
    expect(serialized).toContain("Carrer Catalunya, 24");
    expect(serialized).not.toContain("Madrid");
    expect(serialized).not.toContain("Ginebra");
    expect(serialized).not.toContain("Palma de Mallorca");
  });

  test("results exposes selected real images as ImageObject schema", async ({
    page,
  }) => {
    await page.goto("/es/resultados");

    const schemas = await getJsonLd(page);
    const imageObjects = schemas.filter((schema) => schema["@type"] === "ImageObject");

    expect(imageObjects.length).toBeGreaterThanOrEqual(2);
    for (const image of imageObjects) {
      expect(image.contentUrl).toContain("/images/");
      expect(image.name).toBeTruthy();
      expect(image.width).toBeTruthy();
      expect(image.height).toBeTruthy();
    }
  });

  test("robots, sitemap, manifest and social/icon assets respond", async ({
    request,
  }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const robotsText = await robots.text();
    expect(robotsText).toContain("Disallow: /admin");
    expect(robotsText).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain("/es/servicios/colombia");
    expect(sitemapText).toContain("/en/services/colombia");

    const manifest = await request.get("/manifest.webmanifest");
    expect(manifest.status()).toBe(200);
    const manifestJson = await manifest.json();
    expect(manifestJson.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: "/icon.png" }),
        expect.objectContaining({ src: "/apple-icon.png" }),
      ]),
    );

    for (const asset of [
      "/icon.png",
      "/apple-icon.png",
      "/icons/android-chrome-192x192.png",
      "/icons/android-chrome-512x512.png",
      "/es/opengraph-image",
      "/en/opengraph-image",
      "/es/twitter-image",
      "/en/twitter-image",
    ]) {
      const response = await request.get(asset);
      expect(response.status(), asset).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }

    const favicon = await request.get("/favicon.ico");
    expect(favicon.status()).toBe(200);
    expect(favicon.headers()["content-type"]).toMatch(/image\/(png|x-icon|vnd\.microsoft\.icon)/);

    const iconBody = await (await request.get("/icon.png")).body();
    const ogBody = await (await request.get("/es/opengraph-image")).body();
    expect(iconBody.byteLength).toBeGreaterThan(8_000);
    expect(ogBody.byteLength).toBeGreaterThan(25_000);
  });

  test("home exposes brand icon links and social preview metadata", async ({ page }) => {
    await page.goto("/es");

    await expect(page.locator('link[rel="icon"]')).toHaveCount(2);
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);

    const ogImage = await getMetaContent(page, 'meta[property="og:image"]');
    expect(ogImage).toContain("/es/opengraph-image");

    const twitterImage = await getMetaContent(page, 'meta[name="twitter:image"]');
    expect(twitterImage).toContain("/es/twitter-image");
  });
});
