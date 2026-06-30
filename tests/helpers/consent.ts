import type { Page } from "@playwright/test";

export const CONSENT_STORAGE_KEY = "cejas_cookie_consent_v1";

export const rejectedConsent = {
  analytics: false,
  marketing: false,
  preferences: false,
  updatedAt: "2026-06-18T00:00:00.000Z",
} as const;

export async function seedRejectedConsent(page: Page) {
  await page.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    { key: CONSENT_STORAGE_KEY, value: rejectedConsent },
  );
}
