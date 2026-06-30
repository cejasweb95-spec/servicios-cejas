import { expect, test, type Page } from "@playwright/test";

import { seedRejectedConsent } from "../helpers/consent";

const visualRoutes = [
  { label: "home-es", path: "/es" },
  { label: "services-colombia-es", path: "/es/servicios/colombia" },
  { label: "training-es", path: "/es/formaciones" },
  { label: "journeys-es", path: "/es/jornadas" },
  { label: "contact-es", path: "/es/contacto" },
] as const;

async function expectNoHorizontalOverflow(page: Page, path: string) {
  const width = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(width.scrollWidth, `${path} has horizontal overflow`).toBeLessThanOrEqual(
    width.clientWidth + 1,
  );
}

test.beforeEach(async ({ page }) => {
  await seedRejectedConsent(page);
});

test.describe("local visual smoke", () => {
  for (const route of visualRoutes) {
    test(`${route.label} can be captured for manual visual review`, async ({
      page,
    }, testInfo) => {
      await page.goto(route.path);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await expectNoHorizontalOverflow(page, route.path);

      await testInfo.attach(`${route.label}.png`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    });
  }
});
