import { expect, test, type Page } from "@playwright/test";

const consentStorageKey = "cejas_cookie_consent_v1";

const rejectedConsent = {
  analytics: false,
  marketing: false,
  preferences: false,
  updatedAt: "2026-06-18T00:00:00.000Z",
};

const criticalRoutes = [
  "/es",
  "/en",
  "/es/servicios/colombia",
  "/es/servicios/espana-europa",
  "/es/servicios/suiza",
  "/es/formaciones",
  "/es/jornadas",
  "/es/resultados",
  "/es/cuidados",
  "/es/contacto",
  "/es/aviso-legal",
  "/es/servicios/colombia/efecto-polvo",
  "/es/formaciones/curso-micropigmentacion-cejas",
  "/en/services/colombia",
  "/en/professional-training",
  "/en/appointments-by-city",
  "/en/results",
  "/en/aftercare",
  "/en/contact",
  "/en/legal-notice",
  "/en/services/colombia/powder-brows",
  "/en/professional-training/brow-micropigmentation-course",
] as const;

async function seedRejectedConsent(page: Page) {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    { key: consentStorageKey, value: rejectedConsent },
  );
}

async function expectNoHorizontalOverflow(page: Page, path: string) {
  const width = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(width.scrollWidth, `${path} has horizontal overflow`).toBeLessThanOrEqual(
    width.clientWidth + 1,
  );
}

async function gotoStable(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(
    () => undefined,
  );

  return response;
}

function isIgnorableRuntimeError(message: string) {
  return message.includes("_rsc=") && message.includes("due to access control checks");
}

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    const text = message.text();

    if (message.type() === "error" && !isIgnorableRuntimeError(text)) {
      errors.push(text);
    }
  });
  page.on("pageerror", (error) => {
    if (!isIgnorableRuntimeError(error.message)) {
      errors.push(error.message);
    }
  });

  return errors;
}

test.beforeEach(async ({ page }) => {
  await seedRejectedConsent(page);
});

test.describe("cross-browser and device smoke", () => {
  test("critical routes render with one H1, no console errors and no horizontal overflow", async ({
    page,
  }) => {
    const runtimeErrors = collectRuntimeErrors(page);

    for (const path of criticalRoutes) {
      const response = await gotoStable(page, path);

      expect(response?.status(), `${path} should respond successfully`).toBeLessThan(
        400,
      );
      await expect(page.locator("main"), `${path} main landmark`).toBeVisible();
      await expect(page.locator("h1"), `${path} H1 count`).toHaveCount(1);
      await expect(page.locator("h1").first(), `${path} visible H1`).toBeVisible();
      await expectNoHorizontalOverflow(page, path);
    }

    expect(runtimeErrors).toEqual([]);
  });

  test("language switcher, mobile menu and WhatsApp chooser stay usable", async ({
    page,
  }) => {
    const runtimeErrors = collectRuntimeErrors(page);

    await gotoStable(page, "/es");

    const viewport = page.viewportSize();
    if (viewport && viewport.width < 1280) {
      await page.getByRole("button", { name: /Abrir men/i }).click();
    }

    const languageNav = page.getByRole("navigation", {
      name: /Cambiar idioma|Change language/i,
    });
    await expect(languageNav.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en",
    );

    if (viewport && viewport.width < 1280) {
      await page.keyboard.press("Escape");
    }

    await page.getByRole("button", { name: "Contacta conmigo" }).first().click();
    const chooser = page.getByRole("dialog", {
      name: /Elige el WhatsApp de contacto/i,
    });
    await expect(chooser).toBeVisible();
    await expect(chooser.getByRole("link", { name: /WhatsApp Colombia/i })).toHaveAttribute(
      "href",
      /573167742299/,
    );
    await expect(chooser.getByRole("link", { name: /WhatsApp Espa/i })).toHaveAttribute(
      "href",
      /34603804837/,
    );

    await page.keyboard.press("Escape");
    await expect(chooser).toBeHidden();
    expect(runtimeErrors).toEqual([]);
  });

  test("downloads, map and results lightbox work across the matrix", async ({
    page,
  }) => {
    const runtimeErrors = collectRuntimeErrors(page);

    await gotoStable(page, "/es/descargas");
    const pdfLinks = page.locator('a[download][href$=".pdf"]');
    expect(await pdfLinks.count()).toBeGreaterThanOrEqual(3);

    const firstPdfHref = await pdfLinks.first().getAttribute("href");
    expect(firstPdfHref).toBeTruthy();

    const pdfResponse = await page.request.get(firstPdfHref ?? "");
    expect(pdfResponse.status()).toBe(200);
    expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");

    await gotoStable(page, "/es/jornadas");
    await page.getByRole("button", { name: /Madrid/ }).first().click();
    const locationDetail = page.locator("aside").filter({ hasText: "Madrid" });
    await expect(locationDetail).toContainText("Madrid");
    await expect(
      locationDetail.getByRole("link", { name: "Contacta conmigo" }),
    ).toHaveAttribute("href", /34603804837/);
    await expectNoHorizontalOverflow(page, "/es/jornadas");

    await gotoStable(page, "/es/resultados");
    const firstResult = page.locator('[data-slot="result-tile"]').first();
    await expect(firstResult).toBeVisible();
    await firstResult.click();
    const lightbox = page.getByRole("dialog", {
      name: /Panel con resultados reales/i,
    });
    await expect(lightbox).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();

    expect(runtimeErrors).toEqual([]);
  });

  test("reduced motion still leaves animated UI operable", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("reduced-motion"),
      "Covered only by the reduced-motion project.",
    );

    await page.emulateMedia({ reducedMotion: "reduce" });

    await expect
      .poll(() =>
        page.evaluate(() =>
          window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        ),
      )
      .toBe(true);

    await gotoStable(page, "/es/jornadas");
    await page.getByRole("button", { name: /Ginebra/ }).first().click();
    await expect(
      page.locator("aside").filter({ hasText: "Ginebra" }),
    ).toContainText("Ginebra");

    await gotoStable(page, "/es/resultados");
    await page.locator('[data-slot="result-tile"]').first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
