import { expect, test } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
}

test.describe("Colombia vertical slice", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("serves Colombia services in Spanish with one catalog download and Colombia WhatsApp", async ({
    page,
  }) => {
    await page.goto("/es/servicios/colombia");

    await expect(page).toHaveTitle(/Servicios en Colombia/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Servicios en Colombia/ }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    const colombiaCatalog = page.locator(
      'a[href$="catalogo-colombia-cejas-internacionales.pdf"]',
    );
    await expect(colombiaCatalog).toHaveCount(1);
    await expect(colombiaCatalog).toHaveAttribute("download", "");
    await expect(
      page.locator(
        '[data-slot="service-row"] a[href$="catalogo-colombia-cejas-internacionales.pdf"]',
      ),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-slot="service-row"]').first(),
    ).toContainText(/COP|\$/);
    await expect(
      page.locator("main").getByRole("link", { name: "Contacta conmigo" }).first(),
    ).toHaveAttribute("href", /573167742299/);
    await expect(
      page.locator('[data-slot="service-row"]').filter({ hasText: /EUR|CHF/ }),
    ).toHaveCount(0);

    const breadcrumbSchema = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts
          .map((script) => JSON.parse(script.textContent ?? "{}"))
          .find((schema) => schema["@type"] === "BreadcrumbList"),
      );

    expect(breadcrumbSchema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
    });
    expect(breadcrumbSchema.itemListElement).toHaveLength(3);
  });

  test("serves Colombia services in English with localized URL", async ({
    page,
  }) => {
    await page.goto("/en/services/colombia");

    await expect(page).toHaveTitle(/Services in Colombia/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Services in Colombia/ }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.locator(
        'a[href$="catalogo-colombia-cejas-internacionales.pdf"]',
      ),
    ).toHaveCount(1);
  });

  test("lists market catalogs and training PDFs in downloads", async ({
    page,
  }) => {
    await page.goto("/es/descargas");

    await expect(
      page.getByRole("heading", { level: 1, name: "Catálogos y PDFs oficiales" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Descargar PDF" }).first(),
    ).toHaveAttribute("href", /catalogo-colombia-cejas-internacionales\.pdf$/);

    await page.goto("/en/downloads");
    await expect(
      page.getByRole("heading", { level: 1, name: "Official catalogs and PDFs" }),
    ).toBeVisible();
    await expect(page.getByText("Colombia catalog")).toBeVisible();
  });

  test("does not create horizontal overflow on mobile service and downloads pages", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto("/es/servicios/colombia");
    await expectNoHorizontalOverflow(page);

    await page.goto("/es/descargas");
    await expectNoHorizontalOverflow(page);
  });
});

test.describe("services by market", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("keeps Spain / Europe services in EUR and direct WhatsApp Spain", async ({
    page,
  }) => {
    await page.goto("/es/servicios/espana-europa");

    await expect(
      page.getByRole("heading", { level: 1, name: /Servicios en España \/ Europa/ }),
    ).toBeVisible();
    await expect(
      page.locator(
        'a[href$="catalogo-espana-europa-cejas-internacionales.pdf"]',
      ),
    ).toHaveCount(1);
    await expect(
      page.locator('[data-slot="service-row"]').filter({ hasText: /COP|CHF/ }),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-slot="service-row"]').filter({ hasText: /Acrílico|Manicure|Peinado social/ }),
    ).toHaveCount(0);
    await expect(
      page.locator("main").getByRole("link", { name: "Contacta conmigo" }).first(),
    ).toHaveAttribute("href", /34603804837/);
  });

  test("keeps Switzerland services in CHF and excludes non-confirmed services", async ({
    page,
  }) => {
    await page.goto("/es/servicios/suiza");

    await expect(
      page.getByRole("heading", { level: 1, name: /Servicios en Suiza/ }),
    ).toBeVisible();
    await expect(
      page.locator('a[href$="catalogo-suiza-cejas-internacionales.pdf"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('[data-slot="service-row"]').filter({ hasText: /COP|EUR/ }),
    ).toHaveCount(0);
    await expect(
      page
        .locator('[data-slot="service-row"]')
        .filter({ hasText: /HidraLips|Depilación|Corrección de cejas/ }),
    ).toHaveCount(0);
    await expect(
      page
        .locator('[data-slot="service-row"]')
        .filter({ hasText: /Refuerzo cejas h[ií]bridas/ }),
    ).toContainText(/150\s*CHF|CHF\s*150/);
    await expect(
      page.locator("main").getByRole("link", { name: "Contacta conmigo" }).first(),
    ).toHaveAttribute("href", /34603804837/);
  });

  test("serves service detail with contextual data, schema and equivalent language switch", async ({
    page,
  }) => {
    await page.goto("/es/servicios/colombia/efecto-polvo");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Efecto polvo en Colombia/,
      }),
    ).toBeVisible();
    const quickDetails = page.locator(
      'aside[aria-labelledby="service-quick-details"]',
    );
    await expect(quickDetails.getByText("Duración de cita")).toBeVisible();
    await expect(quickDetails.getByText(/COP|\$/)).toBeVisible();
    await expect(
      page.locator("main").getByRole("link", { name: "Contacta conmigo" }).first(),
    ).toHaveAttribute("href", /573167742299/);

    const serviceSchema = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts
          .map((script) => JSON.parse(script.textContent ?? "{}"))
          .find((schema) => schema["@type"] === "Service"),
      );

    expect(serviceSchema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Efecto polvo",
    });

    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1024) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
    }

    const languageNav = page.getByRole("navigation", { name: "Cambiar idioma" });
    await expect(languageNav.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/services/colombia/powder-brows",
    );
    await languageNav.getByRole("link", { name: "English" }).click();
    await page.waitForURL(/\/en\/services\/colombia\/powder-brows$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Powder brows in Colombia/,
      }),
    ).toBeVisible();
  });

  test("links confirmed micropigmentation care without applying it to HidraLips", async ({
    page,
  }) => {
    await page.goto("/es/servicios/colombia/efecto-polvo");

    const beforeBrows = page.getByRole("link", {
      name: "Ver preparación antes de la cita",
    });
    await expect(beforeBrows).toHaveAttribute(
      "href",
      "/es/cuidados#before-brows",
    );
    await expect(
      page.getByRole("link", { name: "Ver cuidados posteriores" }),
    ).toHaveAttribute("href", "/es/cuidados#after-brows");

    await beforeBrows.click();
    await page.waitForURL(/\/es\/cuidados#before-brows$/);
    const browHeading = page.getByRole("heading", { level: 3, name: "Cejas" }).first();
    await expect(browHeading).toBeVisible();
    const browBox = await browHeading.boundingBox();
    expect(browBox?.y).toBeGreaterThanOrEqual(70);

    await page.goto("/es/servicios/colombia/microlips");
    await expect(
      page.getByRole("link", { name: "Ver preparación antes de la cita" }),
    ).toHaveAttribute("href", "/es/cuidados#before-lips");

    await page.goto("/es/servicios/colombia/hidralips-una-sesion");
    await expect(
      page.getByRole("heading", {
        name: "Prepárate antes y protege el resultado",
      }),
    ).toHaveCount(0);
  });
});

test.describe("professional training", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("lists courses with PDFs and WhatsApp date CTA", async ({ page }) => {
    await page.goto("/es/formaciones");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Cursos profesionales y masterclass",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Descargar PDF" }).first(),
    ).toHaveAttribute(
      "href",
      /curso-micropigmentacion-cejas\.pdf$/,
    );
    await expect(page.getByText("Consultar próxima fecha").first()).toBeVisible();
    await expect(
      page.getByText(/Consulta por WhatsApp próximas fechas, cupos y ciudades/).first(),
    ).toBeVisible();
    await expect(page.getByText(/cupo disponible el/i)).toHaveCount(0);

    const courseFeatures = page.locator('[data-slot="course-editorial"]');
    await expect(courseFeatures).toHaveCount(5);
    await expect(courseFeatures.locator('[data-slot="course-image"]')).toHaveCount(5);
  });

  test("serves course detail with syllabus, prices, schema and language equivalent", async ({
    page,
  }) => {
    await page.goto("/es/formaciones/curso-micropigmentacion-cejas");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Curso profesional de micropigmentación de cejas",
      }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Temario" })).toBeVisible();
    await expect(page.getByText("3 días").first()).toBeVisible();
    await expect(page.getByText("Doble certificado").first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Descargar PDF" }).first(),
    ).toHaveAttribute(
      "href",
      /curso-micropigmentacion-cejas\.pdf$/,
    );
    await expect(page.locator("main img").first()).toBeVisible();

    const courseSchema = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts
          .map((script) => JSON.parse(script.textContent ?? "{}"))
          .find((schema) => schema["@type"] === "Course"),
      );

    expect(courseSchema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Curso profesional de micropigmentación de cejas",
    });
    expect(courseSchema.image).toMatch(/curso-cejas-pigmentos\.jpg$/);

    await page
      .getByRole("button", { name: "Consultar próxima fecha" })
      .first()
      .click();
    await expect(
      page.getByRole("link", { name: /WhatsApp España/ }),
    ).toHaveAttribute(
      "href",
      /Curso%20profesional%20de%20micropigmentaci%C3%B3n/,
    );
    await page.keyboard.press("Escape");

    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1024) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
    }

    const languageNav = page.getByRole("navigation", { name: "Cambiar idioma" });
    await expect(languageNav.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/professional-training/brow-micropigmentation-course",
    );
    await languageNav.getByRole("link", { name: "English" }).click();
    await page.waitForURL(
      /\/en\/professional-training\/brow-micropigmentation-course$/,
    );
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Professional brow micropigmentation course",
      }),
    ).toBeVisible();
  });
});

test.describe("results gallery", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("opens the results lightbox and returns focus to the tile", async ({
    page,
  }) => {
    await page.goto("/es/resultados");

    const firstTile = page.locator('[data-slot="result-tile"]').first();
    await expect(firstTile).toBeVisible();

    await firstTile.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", {
      name: /Panel con resultados reales de cejas y labios/,
    });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(/Imagen 1 de/);

    await dialog.getByRole("button", { name: "Siguiente" }).click();
    await expect(page.getByRole("dialog")).toContainText(/Imagen 2 de/);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(firstTile).toBeFocused();
  });
});

test.describe("confirmed contact channels", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("publishes both WhatsApp targets, official email and social profiles", async ({
    page,
  }) => {
    await page.goto("/es/contacto");

    const main = page.locator("main");
    await expect(main.locator('a[href*="573167742299"]')).toHaveCount(1);
    await expect(main.locator('a[href*="34603804837"]')).toHaveCount(1);
    await expect(
      main.getByRole("link", { name: "contacto@cejasinternacionales.com" }),
    ).toHaveAttribute("href", "mailto:contacto@cejasinternacionales.com");
    await expect(main.getByRole("link", { name: /Instagram/ })).toHaveAttribute(
      "href",
      "https://www.instagram.com/cejasinternacionales/",
    );
    await expect(main.getByRole("link", { name: /Facebook/ })).toHaveAttribute(
      "href",
      /facebook\.com\/share\/1G425xaA7s/,
    );
    await expect(main.getByRole("link", { name: /TikTok/ })).toHaveAttribute(
      "href",
      /tiktok\.com\/@cejasinternacionales/,
    );
  });
});

test.describe("journeys and animated map", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("serves the Spanish journeys page with correct city WhatsApp targets", async ({
    page,
  }) => {
    await page.goto("/es/jornadas");

    await expect(page).toHaveTitle(/Jornadas por ciudad/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Dónde me encuentras",
      }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    const detail = page.locator(
      'aside[aria-label="Detalle de ubicación seleccionada"]',
    );
    const locationList = page.locator(
      'section[aria-labelledby="event-location-list"]',
    );
    const checks = [
      { name: /Cali/, phone: /573167742299/ },
      { name: /Restrepo/, phone: /573167742299/ },
      { name: /Madrid/, phone: /34603804837/ },
      { name: /Palma de Mallorca/, phone: /34603804837/ },
      { name: /Puerto de Sagunto/, phone: /34603804837/ },
      { name: /Ginebra/, phone: /34603804837/ },
    ];

    for (const check of checks) {
      await locationList.getByRole("button", { name: check.name }).first().click();
      await expect(detail).toContainText(check.name);
      await expect(
        detail.getByRole("link", { name: "Contacta conmigo" }),
      ).toHaveAttribute("href", check.phone);
    }

    await expect(page.locator("main")).toContainText(
      "Sin sedes fijas fuera de Cali",
    );
    await expect(page.locator("main")).not.toContainText(/cupo disponible el/i);

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts.map((script) => JSON.parse(script.textContent ?? "{}")),
      );
    const hasEventSchema = schemas.some((schema) => schema["@type"] === "Event");
    const beautySalonSchema = schemas.find(
      (schema) => schema["@type"] === "BeautySalon",
    );

    expect(hasEventSchema).toBe(false);
    expect(JSON.stringify(beautySalonSchema)).toContain("Cali");
    expect(JSON.stringify(beautySalonSchema)).not.toContain("Madrid");
  });

  test("keeps journeys responsive, keyboard usable and language-equivalent", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/es/jornadas");
    await expectNoHorizontalOverflow(page);

    const mapScrollRegion = page.locator(
      '[data-slot="event-map-scroll-region"]',
    );
    await expect(mapScrollRegion).toBeVisible();
    await expect(
      page.locator('img[src*="mapa-mundial-clasico"]'),
    ).toBeVisible();
    expect(
      await mapScrollRegion.evaluate(
        (element) => element.scrollWidth > element.clientWidth,
      ),
    ).toBe(false);

    const madridPin = page
      .getByRole("button", { name: /Seleccionar ubicación: Madrid/ })
      .first();
    await madridPin.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.locator('aside[aria-label="Detalle de ubicación seleccionada"]'),
    ).toContainText("Madrid");
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "Abrir menú" }).click();
    const languageNav = page.getByRole("navigation", { name: "Cambiar idioma" });
    await expect(languageNav.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/appointments-by-city",
    );
    await languageNav.getByRole("link", { name: "English" }).click();
    await page.waitForURL(/\/en\/appointments-by-city$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Where to find me",
      }),
    ).toBeVisible();
  });
});
