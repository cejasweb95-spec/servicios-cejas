import { expect, test } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

test.describe("home hero", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("shows the professional session portrait and biography on Spanish home", async ({
    page,
  }) => {
    await page.goto("/es");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Xiomara Andrea Sánchez Noreña",
    );
    await expect(
      page.getByText(
        "Soy Xiomara Andrea Sánchez Noreña, especialista en micropigmentación",
      ),
    ).toBeVisible();
    await expect(
      page.locator('#apertura img[src*="xiomara-hero-home"]'),
    ).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Sobre mí" })).toHaveAttribute(
      "href",
      "/es/sobre-xiomara",
    );
  });

  test("links About me to the English about page", async ({ page }) => {
    await page.goto("/en");

    await expect(page.getByRole("link", { name: "About me" })).toHaveAttribute(
      "href",
      "/en/about-xiomara",
    );
    await expect(
      page.locator('#apertura img[src*="xiomara-hero-home"]'),
    ).toHaveCount(1);
  });
});
