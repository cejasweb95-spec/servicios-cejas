import { expect, test, type Page } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

const WORDMARK_ARIA =
  /Cejas Internacionales by Xiomara, (inicio|home)/i;

async function gotoHomeEs(page: Page) {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

async function wordmarkMetrics(page: Page) {
  const wordmark = page.locator('[data-slot="site-wordmark"]');
  const menuButton = page.getByRole("button", { name: /Abrir menú|Open menu/i });

  await expect(wordmark).toBeVisible();
  await expect(menuButton).toBeVisible();

  const [wordmarkBox, menuBox, wordmarkHeight] = await Promise.all([
    wordmark.boundingBox(),
    menuButton.boundingBox(),
    wordmark.evaluate((node) => node.getBoundingClientRect().height),
  ]);

  if (!wordmarkBox || !menuBox) {
    throw new Error("Expected wordmark and mobile menu button bounding boxes.");
  }

  return { wordmark, wordmarkBox, menuBox, wordmarkHeight };
}

test.describe("site header wordmark", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
  });

  test("renders legibly on narrow mobile without overlapping the menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHomeEs(page);

    const { wordmark, wordmarkBox, menuBox, wordmarkHeight } = await wordmarkMetrics(page);

    expect(wordmarkHeight).toBeGreaterThanOrEqual(12);
    expect(wordmarkHeight).toBeLessThanOrEqual(28);
    expect(wordmarkBox.x + wordmarkBox.width).toBeLessThanOrEqual(menuBox.x - 8);

    await expect(wordmark.getByText("Cejas Internacionales", { exact: true })).toBeVisible();
    await expect(wordmark.getByText("by Xiomara", { exact: true })).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test("renders legibly on tablet without overlapping the menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await gotoHomeEs(page);

    const { wordmark, wordmarkBox, menuBox, wordmarkHeight } = await wordmarkMetrics(page);

    expect(wordmarkHeight).toBeGreaterThanOrEqual(12);
    expect(wordmarkHeight).toBeLessThanOrEqual(30);
    expect(wordmarkBox.x + wordmarkBox.width).toBeLessThanOrEqual(menuBox.x - 8);

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

    const wordmark = page.locator('[data-slot="site-wordmark"]');
    await expect(wordmark).toBeVisible();

    const wordmarkHeight = await wordmark.evaluate(
      (node) => node.getBoundingClientRect().height,
    );
    expect(wordmarkHeight).toBeGreaterThanOrEqual(12);
    expect(wordmarkHeight).toBeLessThanOrEqual(28);

    await expect(page.getByRole("button", { name: /Abrir menú|Open menu/i })).toHaveCount(0);

    const logoLink = page.locator('[data-slot="site-logo-link"]');
    await expect(logoLink).toHaveAttribute("href", "/es");
    await expect(logoLink).toHaveAccessibleName(WORDMARK_ARIA);
  });

  test("wordmark home link meets minimum touch height on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHomeEs(page);

    const logoLink = page.locator('[data-slot="site-logo-link"]');
    const linkBox = await logoLink.boundingBox();

    expect(linkBox).not.toBeNull();
    expect(linkBox!.height).toBeGreaterThanOrEqual(56);
  });

  test("wordmark remains visible on a market services page at tablet width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/es/servicios/espana-europa");

    const wordmark = page.locator('[data-slot="site-wordmark"]');
    await expect(wordmark).toBeVisible();

    const wordmarkHeight = await wordmark.evaluate(
      (node) => node.getBoundingClientRect().height,
    );
    expect(wordmarkHeight).toBeGreaterThanOrEqual(12);
    expect(wordmarkHeight).toBeLessThanOrEqual(30);
  });

  test("footer keeps the official logo image", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await gotoHomeEs(page);

    const footerLogo = page.locator("footer img").first();
    await expect(footerLogo).toBeVisible();
    await expect(footerLogo).toHaveAttribute(
      "src",
      /logo-oficial-sin-fondo\.png/,
    );
  });
});
