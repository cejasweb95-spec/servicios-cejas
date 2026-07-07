import { expect, test } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

test.describe("physical studios", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("shows Cali and Puerto de Sagunto as physical studios on Spanish home", async ({
    page,
  }) => {
    await page.goto("/es");

    await expect(page.locator("#punto-fisico")).toContainText("Sedes físicas");
    await expect(page.locator("#punto-fisico")).toContainText("Sede principal");
    await expect(page.locator("#punto-fisico")).toContainText("Sede España");
    await expect(page.locator("#punto-fisico")).toContainText("Puerto de Sagunto");
    await expect(page.locator("#punto-fisico")).toContainText("Carrer Catalunya, 24");
    await expect(
      page.locator('#punto-fisico img[src*="puerto-sagunto"]'),
    ).toHaveCount(1);
  });

  test("marks Puerto de Sagunto as physical studio on journeys map", async ({
    page,
  }) => {
    await page.goto("/es/jornadas");

    const saguntoButton = page
      .locator('section[aria-labelledby="event-location-list"] button')
      .filter({ hasText: /Puerto de Sagunto/ })
      .first();

    await expect(saguntoButton).toContainText("Sede física");
    await saguntoButton.click();

    const detail = page.locator('aside[aria-label="Detalle de ubicación seleccionada"]');
    await expect(detail).toContainText("Carrer Catalunya, 24");
    await expect(
      detail.getByRole("link", { name: "Contacta conmigo" }),
    ).toHaveAttribute("href", /34603804837/);
  });
});
