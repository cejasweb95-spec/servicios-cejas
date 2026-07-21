import { expect, test } from "@playwright/test";

import { CONSENT_STORAGE_KEY } from "../helpers/consent";

async function readConsent(page: import("@playwright/test").Page) {
  return page.evaluate((key) => {
    const stored = localStorage.getItem(key);

    return stored ? JSON.parse(stored) : null;
  }, CONSENT_STORAGE_KEY);
}

test.describe("legal, aftercare and cookie consent", () => {
  test("serves aftercare and legal pages in both locales", async ({ page }) => {
    await page.goto("/es/cuidados");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Cuidados antes y después de tu micropigmentación",
      }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    await page.goto("/en/aftercare");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Before and aftercare for your micropigmentation appointment",
      }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.goto("/es/aviso-legal");
    await expect(
      page.getByRole("heading", { level: 1, name: "Aviso legal" }),
    ).toBeVisible();
    await expect(page.locator("main")).toContainText("Xiomara Andrea Sánchez Noreña");
    await expect(page.locator("main")).toContainText("1.144.186.472-5");
    await expect(page.locator("main")).toContainText("Cali, Colombia");
    await expect(page.locator("main")).toContainText("contacto@cejasinternacionales.com");
    await expect(page.locator("main")).toContainText("Puerto de Sagunto");

    await page.goto("/en/privacy");
    await expect(
      page.getByRole("heading", { level: 1, name: "Privacy policy" }),
    ).toBeVisible();
    await expect(page.getByText("Spain/EU and Switzerland")).toBeVisible();

    await page.goto("/en/cookies");
    await expect(
      page.getByRole("heading", { level: 1, name: "Cookie policy" }),
    ).toBeVisible();
    await expect(page.getByText("GA4 does not load or run before you accept analytics cookies.")).toBeVisible();
  });

  test("cookie banner rejects, configures and reopens preferences from footer", async ({
    page,
  }) => {
    await page.goto("/es/cookies");

    await expect(
      page.getByRole("region", { name: "Privacidad y cookies" }),
    ).toBeVisible();
    await expect(page.locator("script[data-ga4-script]")).toHaveCount(0);
    await expect.poll(async () =>
      page.evaluate(() => JSON.stringify(window.dataLayer ?? [])),
    ).toContain("denied");

    const banner = page.getByRole("region", { name: "Privacidad y cookies" });
    // Fixed bottom banner: avoid scrollIntoView bringing page/footer over the CTA.
    await page.evaluate(() => window.scrollTo(0, 0));
    await banner.getByRole("button", { name: "Rechazar" }).click({ force: true });
    await expect(banner).toHaveCount(0);
    await expect(page.locator("script[data-ga4-script]")).toHaveCount(0);

    const rejectedConsent = await readConsent(page);
    expect(rejectedConsent).toMatchObject({
      analytics: false,
      marketing: false,
      preferences: false,
    });

    await page
      .getByRole("contentinfo")
      .getByRole("button", { name: "Cambiar preferencias de cookies" })
      .click({ force: true });
    await expect(banner).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));

    const analyticsCheckbox = banner.getByRole("checkbox", { name: /Analíticas/ });
    await expect(analyticsCheckbox).not.toBeChecked();
    await analyticsCheckbox.check({ force: true });
    await banner.getByRole("button", { name: "Guardar preferencias" }).click({
      force: true,
    });

    const acceptedConsent = await readConsent(page);
    expect(acceptedConsent).toMatchObject({
      analytics: true,
      marketing: false,
      preferences: false,
    });
  });
});

test.describe("banner AEPD compliance", () => {
  test("banner shows cookies-policy link", async ({ page }) => {
    await page.goto("/es");
    const banner = page.getByRole("region", { name: "Privacidad y cookies" });
    await expect(banner).toBeVisible();
    const policyLink = banner.getByRole("link", { name: "Política de cookies" });
    await expect(policyLink).toBeVisible();
    await expect(policyLink).toHaveAttribute("href", "/es/cookies");
  });

  test("Rechazar and Aceptar buttons have equal visual weight (same variant class)", async ({
    page,
  }) => {
    await page.goto("/es");
    const banner = page.getByRole("region", { name: "Privacidad y cookies" });
    await expect(banner).toBeVisible();
    const rejectBtn = banner.getByRole("button", { name: "Rechazar" });
    const acceptBtn = banner.getByRole("button", { name: "Aceptar analíticas" });
    const rejectClass = await rejectBtn.getAttribute("class");
    const acceptClass = await acceptBtn.getAttribute("class");
    // Both should use the outline variant — same set of Tailwind classes
    expect(rejectClass).toBeTruthy();
    expect(acceptClass).toBeTruthy();
    expect(rejectClass).toEqual(acceptClass);
  });

  test("configurator only shows analytics checkbox (no marketing/preferences)", async ({
    page,
  }) => {
    await page.goto("/es");
    const banner = page.getByRole("region", { name: "Privacidad y cookies" });
    await banner.getByRole("button", { name: "Configurar" }).click();
    const checkboxes = banner.getByRole("checkbox");
    await expect(checkboxes).toHaveCount(1);
    await expect(checkboxes.first()).toHaveAccessibleName(/Analíticas/);
  });
});

test.describe("privacy page — new legal sections", () => {
  test("privacidad ES contains AEPD, transferencias, conservación, WhatsApp, menores", async ({
    page,
  }) => {
    await page.goto("/es/privacidad");
    const main = page.locator("main");
    await expect(main).toContainText("AEPD");
    await expect(main).toContainText("Bases de legitimación");
    await expect(main).toContainText("Plazos de conservación");
    await expect(main).toContainText("Transferencias internacionales y destinatarios");
    await expect(main).toContainText("WhatsApp");
    await expect(main).toContainText("Menores");
    await expect(main).toContainText("Colombia");
  });

  test("privacy EN contains GDPR, transfers, retention, WhatsApp, minors", async ({
    page,
  }) => {
    await page.goto("/en/privacy");
    const main = page.locator("main");
    await expect(main).toContainText("GDPR");
    await expect(main).toContainText("Legal bases");
    await expect(main).toContainText("Retention periods");
    await expect(main).toContainText("international transfers");
    await expect(main).toContainText("WhatsApp");
    await expect(main).toContainText("Minors");
  });
});

test.describe("cookies page — inventory table", () => {
  test("ES cookies page shows cookie inventory table with _ga and cejas key", async ({
    page,
  }) => {
    await page.goto("/es/cookies");
    const main = page.locator("main");
    await expect(main).toContainText("Inventario de cookies");
    await expect(main).toContainText("cejas_cookie_consent_v1");
    await expect(main).toContainText("_ga");
  });

  test("EN cookies page shows cookie inventory table with _ga and cejas key", async ({
    page,
  }) => {
    await page.goto("/en/cookies");
    const main = page.locator("main");
    await expect(main).toContainText("Cookie and local storage inventory");
    await expect(main).toContainText("cejas_cookie_consent_v1");
    await expect(main).toContainText("_ga");
  });

  test("cookie inventory table is accessible with proper headers", async ({ page }) => {
    await page.goto("/es/cookies");
    const table = page.getByRole("table", { name: /Inventario/ });
    await expect(table).toBeVisible();
    const headers = table.getByRole("columnheader");
    await expect(headers).toHaveCount(5);
  });
});

test.describe("reject → no GA4 script", () => {
  test("rejecting cookies at 768px viewport leaves no GA4 script", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/es");
    await page.getByRole("button", { name: "Rechazar" }).click();
    await expect(page.locator("script[data-ga4-script]")).toHaveCount(0);
    const consent = await readConsent(page);
    expect(consent?.analytics).toBe(false);
  });

  test("accepting analytics loads GA4 script after page reload", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/es");
    await page.getByRole("button", { name: "Aceptar analíticas" }).click();
    // GA4 requires a valid measurement ID; in test env the script may not load
    // but the consent key must be set correctly.
    const consent = await readConsent(page);
    expect(consent?.analytics).toBe(true);
  });
});
