import { expect, test, type Page } from "@playwright/test";

const consentStorageKey = "cejas_cookie_consent_v1";

const rejectedConsent = {
  analytics: false,
  marketing: false,
  preferences: false,
  updatedAt: "2026-06-18T00:00:00.000Z",
};

async function seedRejectedConsent(page: Page) {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    { key: consentStorageKey, value: rejectedConsent },
  );
}

test.describe("event map zoom QA", () => {
  test.beforeEach(async ({ page }) => {
    await seedRejectedConsent(page);
    await page.goto("/es/jornadas");
    await page.locator('[data-slot="event-map-scroll-region"]').waitFor();
  });

  test("allows deep zoom up to 8x via SVG transform (vector, no CSS scale)", async ({
    page,
  }) => {
    const mapRegion = page.locator('[data-slot="event-map-scroll-region"]');
    const zoomIn = mapRegion.getByRole("button", { name: "Acercar mapa" });
    const viewportGroup = mapRegion.locator("[data-map-overlay] > g").first();

    await zoomIn.scrollIntoViewIfNeeded();

    const readZoom = () =>
      viewportGroup.evaluate((element) => {
        const transform = element.getAttribute("transform") ?? "";
        const match = transform.match(/scale\(([\d.]+)\)/);
        return match ? Number(match[1]) : 1;
      });

    for (let index = 0; index < 16; index += 1) {
      const zoom = await readZoom();
      if (zoom >= 7.8) {
        break;
      }
      if (await zoomIn.isDisabled()) {
        break;
      }
      await zoomIn.click();
    }

    expect(await readZoom()).toBeGreaterThanOrEqual(7.8);

    const contentTransform = await mapRegion
      .locator("[data-map-zoom-content]")
      .evaluate((element) => element.style.transform);
    expect(contentTransform).toBe("");

    const pinWrapperTransform = await mapRegion
      .locator("[data-map-pin]")
      .first()
      .evaluate((element) => element.parentElement?.style.transform ?? "");
    expect(pinWrapperTransform).toBe("translate(-50%, -50%)");
  });

  test("filters pins to the visible region when zoomed into Spain", async ({ page }) => {
    const mapRegion = page.locator('[data-slot="event-map-scroll-region"]');
    const container = mapRegion.locator('[role="group"]');

    await page
      .locator('section[aria-labelledby="event-location-list"]')
      .getByRole("button", { name: /Madrid/i })
      .click();

    const madridPin = mapRegion.locator('[data-map-pin][aria-label*="Madrid"]');
    const focus = await madridPin.boundingBox();
    if (!focus) {
      throw new Error("Madrid pin not found");
    }

    for (let index = 0; index < 9; index += 1) {
      await container.dispatchEvent("wheel", {
        deltaY: -400,
        clientX: focus.x + focus.width / 2,
        clientY: focus.y + focus.height / 2,
      });
      await page.waitForTimeout(80);
    }

    // Madrid (selección/España) sigue presente y clicable.
    await expect(madridPin).toBeVisible();

    // Colombia queda fuera del viewport europeo, por lo que no se renderiza.
    await expect(
      mapRegion.locator('[data-map-pin][aria-label*="Cali"]'),
    ).toHaveCount(0);
  });

  test("keeps leader arrows and geo dots visible when zoomed in", async ({ page }) => {
    const mapRegion = page.locator('[data-slot="event-map-scroll-region"]');
    const zoomIn = mapRegion.getByRole("button", { name: "Acercar mapa" });
    const overlaySvg = mapRegion.locator("[data-map-overlay]");

    for (let index = 0; index < 8; index += 1) {
      await zoomIn.click();
    }

    await expect(overlaySvg.locator("line")).not.toHaveCount(0);
    await expect(overlaySvg.locator("circle")).not.toHaveCount(0);
  });

  test("uses an inline (vector) SVG map for crisp zoom", async ({ page }) => {
    const mapRegion = page.locator('[data-slot="event-map-scroll-region"]');
    const mapSvg = mapRegion.locator("[data-map-zoom-content] > svg").first();
    const viewportGroup = mapRegion.locator("[data-map-overlay] > g").first();
    await page.waitForTimeout(600);
    await expect(mapSvg).toBeVisible();
    await expect(mapSvg).toHaveAttribute("viewBox", "0 0 1100 480");
    await expect(mapSvg).toHaveAttribute("shape-rendering", "geometricPrecision");
    await expect(viewportGroup).not.toHaveAttribute("transform", /.+/);
  });

  test("has no hydration mismatch on home map section", async ({ page }) => {
    const hydrationErrors: string[] = [];
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        message.text().includes("hydration") &&
        message.text().includes("data-map-zoom-content")
      ) {
        hydrationErrors.push(message.text());
      }
    });

    await page.goto("/es#jornadas");
    await page.locator("[data-map-zoom-content]").waitFor();
    await page.waitForTimeout(500);
    expect(hydrationErrors).toHaveLength(0);
  });

  test("selected pin label stacks above other pins", async ({ page }) => {
    const mapRegion = page.locator('[data-slot="event-map-scroll-region"]');
    const zoomIn = mapRegion.getByRole("button", { name: "Acercar mapa" });
    const viewportGroup = mapRegion.locator("[data-map-overlay] > g").first();

    const readZoom = () =>
      viewportGroup.evaluate((element) => {
        const transform = element.getAttribute("transform") ?? "";
        const match = transform.match(/scale\(([\d.]+)\)/);
        return match ? Number(match[1]) : 1;
      });

    for (let index = 0; index < 8; index += 1) {
      if ((await readZoom()) >= 3) {
        break;
      }
      await zoomIn.click();
    }

    await page
      .locator('section[aria-labelledby="event-location-list"]')
      .getByRole("button", { name: /Madrid/i })
      .click();
    await page
      .locator('section[aria-labelledby="event-location-list"]')
      .getByRole("button", { name: /Cali/i })
      .click();

    const label = mapRegion.getByText("Cali, Colombia");
    await expect(label).toBeVisible();

    const stacking = await label.evaluate((element) => {
      const pinWrapper = element.parentElement;
      if (!pinWrapper) {
        return { zIndex: "", lastChild: false };
      }

      const zIndex = getComputedStyle(pinWrapper).zIndex;
      const siblings = pinWrapper.parentElement?.children ?? [];
      return {
        zIndex,
        lastChild: siblings[siblings.length - 1] === pinWrapper,
      };
    });

    expect(Number(stacking.zIndex)).toBeGreaterThanOrEqual(80);
    expect(stacking.lastChild).toBe(true);
  });

  test("zoom controls stay usable at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const mapRegion = page.locator('[data-slot="event-map-scroll-region"]');
    const zoomIn = mapRegion.getByRole("button", { name: "Acercar mapa" });
    const viewportGroup = mapRegion.locator("[data-map-overlay] > g").first();

    await zoomIn.scrollIntoViewIfNeeded();
    await expect(zoomIn).toBeVisible();
    await zoomIn.click();
    await zoomIn.click();

    await expect
      .poll(async () =>
        viewportGroup.evaluate((element) => {
          const transform = element.getAttribute("transform") ?? "";
          const match = transform.match(/scale\(([\d.]+)\)/);
          return match ? Number(match[1]) : 1;
        }),
      )
      .toBeGreaterThan(1.2);
    const zoomOut = mapRegion.getByRole("button", { name: "Alejar mapa" });
    await expect(zoomOut).toBeEnabled();

    const box = await zoomIn.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });
});
