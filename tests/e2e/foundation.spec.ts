import { expect, test } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

test.describe("localized foundation", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("redirects the root route to the default Spanish locale", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/es/);
  });

  test("serves the Spanish home and language switcher", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto("/es");
    await expect(page).toHaveTitle(/Cejas Internacionales/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Xiomara Andrea Sánchez Noreña",
    );
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1024) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
    }
    const languageNav = page.getByRole("navigation", {
      name: /Cambiar idioma|Change language/,
    });
    const englishLink = languageNav.getByRole("link", { name: "English" });
    await expect(englishLink).toHaveAttribute("href", "/en");
    await englishLink.click();
    await page.waitForURL(/\/en$/, { timeout: 15_000 });
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Xiomara Andrea Sánchez Noreña",
    );
    expect(consoleErrors).toEqual([]);
  });

  test("does not create horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/es");

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  });

  test("opens the WhatsApp chooser with Colombia and Spain options", async ({
    page,
  }) => {
    await page.goto("/es");

    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1280) {
      await page.getByRole("button", { name: "Abrir menú" }).click();
      await page.getByRole("button", { name: "Contacta conmigo" }).click();
    } else {
      await page
        .locator("header")
        .getByRole("button", { name: "Contacta conmigo" })
        .click();
    }

    const dialog = page.getByRole("dialog", {
      name: "Elige el WhatsApp de contacto",
    });
    await expect(dialog).toBeVisible();
    await expect(
      page.getByRole("link", { name: /WhatsApp Colombia/ }),
    ).toHaveAttribute("href", /573167742299/);
    await expect(
      page.getByRole("link", { name: /WhatsApp España/ }),
    ).toHaveAttribute("href", /34603804837/);

    await page.waitForTimeout(200);

    const closeButton = dialog.getByRole("button", { name: "Cerrar" });
    const closeBox = await closeButton.boundingBox();
    const optionBox = await dialog
      .getByRole("link", { name: /WhatsApp Colombia/ })
      .boundingBox();
    const headerPadding = await dialog
      .locator('[data-slot="dialog-header"]')
      .evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).paddingRight),
      );

    expect(closeBox?.width).toBeGreaterThanOrEqual(44);
    expect(closeBox?.height).toBeGreaterThanOrEqual(44);
    expect(optionBox?.height).toBeGreaterThanOrEqual(64);
    expect(headerPadding).toBeGreaterThanOrEqual(56);

    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: "Elige el WhatsApp de contacto" }),
    ).toBeHidden();
  });

  test("preserves routed pages through browser back and forward", async ({
    page,
  }) => {
    await page.goto("/es");

    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1280) {
      await page.getByRole("button", { name: /Abrir men/i }).click();
    }

    await page.getByRole("link", { name: "Servicios" }).first().click();
    await page.waitForURL(/\/es\/servicios$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Servicios por país",
    );

    await page.getByRole("link", { name: /Colombia/ }).first().click();
    await page.waitForURL(/\/es\/servicios\/colombia$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Servicios en Colombia",
    );

    await page.goBack();
    await expect(page).toHaveURL(/\/es\/servicios$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Servicios por país",
    );

    await page.goForward();
    await expect(page).toHaveURL(/\/es\/servicios\/colombia$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Servicios en Colombia",
    );
  });
});
