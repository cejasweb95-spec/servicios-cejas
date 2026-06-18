import { expect, test } from "@playwright/test";

const consentStorageKey = "cejas_cookie_consent_v1";

async function readConsent(page: import("@playwright/test").Page) {
  return page.evaluate((key) => {
    const stored = localStorage.getItem(key);

    return stored ? JSON.parse(stored) : null;
  }, consentStorageKey);
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
    await expect(page.locator("main")).toContainText("Cali, Colombia");
    await expect(page.locator("main")).not.toContainText("sede física en España");

    await page.goto("/en/privacy");
    await expect(
      page.getByRole("heading", { level: 1, name: "Privacy policy" }),
    ).toBeVisible();
    await expect(page.getByText("Spain/EU and Switzerland")).toBeVisible();

    await page.goto("/en/cookies");
    await expect(
      page.getByRole("heading", { level: 1, name: "Cookie policy" }),
    ).toBeVisible();
    await expect(page.getByText("GA4 does not load before analytics are accepted.")).toBeVisible();
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

    await page.getByRole("button", { name: "Rechazar" }).click();
    await expect(
      page.getByRole("region", { name: "Privacidad y cookies" }),
    ).toHaveCount(0);
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
      .click();
    await expect(
      page.getByRole("region", { name: "Privacidad y cookies" }),
    ).toBeVisible();

    const analyticsCheckbox = page.getByRole("checkbox", { name: /Analíticas/ });
    await expect(analyticsCheckbox).not.toBeChecked();
    await analyticsCheckbox.check();
    await page.getByRole("button", { name: "Guardar preferencias" }).click();

    const acceptedConsent = await readConsent(page);
    expect(acceptedConsent).toMatchObject({
      analytics: true,
      marketing: false,
      preferences: false,
    });
  });
});
