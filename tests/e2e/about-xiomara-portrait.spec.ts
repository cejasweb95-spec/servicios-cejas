import { expect, test } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

test.describe("about xiomara portrait", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("shows the globe portrait on Spanish about page", async ({ page }) => {
    await page.goto("/es/sobre-xiomara");

    const portrait = page.locator('main img[src*="xiomara-retrato-mundo"]').first();
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute(
      "alt",
      /globo terráqueo|jornadas internacionales/i,
    );
    await expect(
      page.locator('main img[src*="xiomara-retrato-rosa"]'),
    ).toHaveCount(0);
  });

  test("shows the globe portrait on English about page", async ({ page }) => {
    await page.goto("/en/about-xiomara");

    const portrait = page.locator('main img[src*="xiomara-retrato-mundo"]').first();
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute("alt", /globe|international appointments/i);
    await expect(
      page.locator('main img[src*="xiomara-retrato-rosa"]'),
    ).toHaveCount(0);
  });
});
