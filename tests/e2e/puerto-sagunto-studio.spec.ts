import { test, expect } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

test.describe("puerto sagunto studio page", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("serves localized studio page with NAP, map and Spain services link in Spanish", async ({
    page,
  }) => {
    await page.goto("/es/sede-puerto-sagunto");

    await expect(page).toHaveTitle(/Micropigmentación de cejas en Puerto de Sagunto/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Micropigmentación de cejas en Puerto de Sagunto, Valencia/,
      }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("main")).toContainText("Cejas Internacionales");
    await expect(page.locator("main")).toContainText("Carrer Catalunya, 24");
    await expect(page.locator("main")).toContainText("+34 603 80 48 37");

    const servicesLink = page.getByRole("link", {
      name: "Ver servicios en España/Europa",
    });
    await expect(servicesLink).toHaveAttribute("href", "/servicios/espana-europa");

    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts.map((script) => JSON.parse(script.textContent ?? "{}")),
      );
    const beautySalon = schemas.find((schema) => schema["@type"] === "BeautySalon");

    expect(beautySalon?.name).toBe("Cejas Internacionales");
    expect(JSON.stringify(beautySalon)).toContain("Carrer Catalunya, 24");
    expect(beautySalon?.geo?.latitude).toBeCloseTo(39.659, 2);
  });

  test("serves English equivalent with hreflang alternates", async ({ page }) => {
    await page.goto("/en/puerto-sagunto-studio");

    await expect(page).toHaveTitle(/Brow micropigmentation in Puerto de Sagunto/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Brow micropigmentation in Puerto de Sagunto, Valencia/,
      }),
    ).toBeVisible();

    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute(
      "href",
      /\/es\/sede-puerto-sagunto/,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      "href",
      /\/en\/puerto-sagunto-studio/,
    );
  });

  test("links from Spain market services page", async ({ page }) => {
    await page.goto("/es/servicios/espana-europa");

    await expect(
      page.getByRole("link", { name: "Ver sede en Puerto de Sagunto" }),
    ).toHaveAttribute("href", /\/sede-puerto-sagunto$/);
  });

  test("shows Puerto de Sagunto studio photos in Spain market hero", async ({
    page,
  }) => {
    await page.goto("/es/servicios/espana-europa");

    const heroImages = page.locator('section[aria-labelledby="page-hero-title"] img');
    await expect(heroImages).toHaveCount(2);

    const primary = heroImages.nth(0);
    const secondary = heroImages.nth(1);

    await expect(primary).toHaveAttribute(
      "src",
      /01-portada-cabina-letras-cejas-internacionales/,
    );
    await expect(primary).toHaveAttribute(
      "alt",
      /Cabina de Cejas Internacionales en Puerto de Sagunto/i,
    );

    await expect(secondary).toHaveAttribute(
      "src",
      /02-interior-vista-general-local/,
    );
    await expect(secondary).toHaveAttribute(
      "alt",
      /Interior del estudio de Cejas Internacionales en Puerto de Sagunto/i,
    );
  });
});
