/**
 * Fires a GA4 custom event only when the user has granted analytics consent.
 * Safe to call at any time; it no-ops if analytics are not accepted or gtag
 * is not loaded.
 */
export function trackConsentEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem("cejas_cookie_consent_v1");
    if (!raw) return;

    const consent = JSON.parse(raw) as { analytics?: boolean };
    if (!consent.analytics) return;

    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, params);
  } catch {
    // Silently ignore any storage or JSON parse errors.
  }
}
