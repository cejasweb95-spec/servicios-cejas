import { expect, test, type Page } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

const LOGO_ALT = /Logo de Cejas Internacionales|Cejas Internacionales logo/;

async function gotoHomeEs(page: Page) {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

async function logoMetrics(page: Page) {
  const logo = page.locator('[data-slot="site-logo"]');
  const menuButton = page.getByRole("button", { name: /Abrir menú|Open menu/i });

  await expect(logo).toBeVisible();
  await expect(menuButton).toBeVisible();

  const [logoBox, menuBox, logoHeight] = await Promise.all([
    logo.boundingBox(),
    menuButton.boundingBox(),
    logo.evaluate((node) => node.getBoundingClientRect().height),
  ]);

  if (!logoBox || !menuBox) {
    throw new Error("Expected logo and mobile menu button bounding boxes.");
  }

  return { logo, logoBox, menuBox, logoHeight };
}

test.describe("site header logo", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("renders at 56px on narrow mobile without overlapping the menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHomeEs(page);

    const { logoBox, menuBox, logoHeight } = await logoMetrics(page);

    expect(logoHeight).toBeGreaterThanOrEqual(55);
    expect(logoHeight).toBeLessThanOrEqual(58);
    expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(menuBox.x - 8);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("renders at 64px on tablet without overlapping the menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoHomeEs(page);

    const { logoBox, menuBox, logoHeight } = await logoMetrics(page);

    expect(logoHeight).toBeGreaterThanOrEqual(63);
    expect(logoHeight).toBeLessThanOrEqual(66);
    expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(menuBox.x - 8);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("keeps a balanced size on desktop while preserving the home link", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await gotoHomeEs(page);

    const logo = page.locator('[data-slot="site-logo"]');
    await expect(logo).toBeVisible();

    const logoHeight = await logo.evaluate((node) => node.getBoundingClientRect().height);
    expect(logoHeight).toBeGreaterThanOrEqual(55);
    expect(logoHeight).toBeLessThanOrEqual(58);

    await expect(page.getByRole("button", { name: /Abrir menú|Open menu/i })).toHaveCount(0);

    const logoLink = page.locator('[data-slot="site-logo-link"]');
    await expect(logoLink).toHaveAttribute("href", "/es");
    await expect(logoLink).toHaveAccessibleName(LOGO_ALT);
  });

  test("logo home link meets minimum touch height on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHomeEs(page);

    const logoLink = page.locator('[data-slot="site-logo-link"]');
    const linkBox = await logoLink.boundingBox();

    expect(linkBox).not.toBeNull();
    expect(linkBox!.height).toBeGreaterThanOrEqual(56);
  });

  test("logo remains visible on a market services page at tablet width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/es/servicios/espana-europa");

    const logo = page.locator('[data-slot="site-logo"]');
    await expect(logo).toBeVisible();

    const logoHeight = await logo.evaluate((node) => node.getBoundingClientRect().height);
    expect(logoHeight).toBeGreaterThanOrEqual(63);
    expect(logoHeight).toBeLessThanOrEqual(66);
  });
});
