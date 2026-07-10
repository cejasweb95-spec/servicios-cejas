export type CookieCategory = "necessary" | "analytics" | "preferences";

export type CookieEntry = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  category: CookieCategory;
};

export const cookieInventoryEs: CookieEntry[] = [
  {
    name: "cejas_cookie_consent_v1",
    provider: "Cejas Internacionales (localStorage)",
    purpose:
      "Almacena las preferencias de cookies de la usuaria para no volver a mostrar el banner.",
    duration: "Persistente (hasta que la usuaria borre el almacenamiento local)",
    category: "necessary",
  },
  {
    name: "_ga",
    provider: "Google LLC (Google Analytics 4)",
    purpose:
      "Distingue a las usuarias únicas asignando un identificador anónimo. Solo se establece con consentimiento analítico.",
    duration: "2 años",
    category: "analytics",
  },
  {
    name: "_ga_*",
    provider: "Google LLC (Google Analytics 4)",
    purpose:
      "Mantiene el estado de la sesión de Analytics. Solo se establece con consentimiento analítico.",
    duration: "2 años",
    category: "analytics",
  },
  {
    name: "NID, CONSENT, SOCS",
    provider: "Google LLC (Google Maps)",
    purpose:
      "Cookies establecidas por Google Maps al cargar el mapa. Solo se activan si la usuaria pulsa el botón de mapa.",
    duration: "6 meses – 2 años (según cookie)",
    category: "necessary",
  },
];

export const cookieInventoryEn: CookieEntry[] = [
  {
    name: "cejas_cookie_consent_v1",
    provider: "Cejas Internacionales (localStorage)",
    purpose:
      "Stores the user's cookie preferences so the banner is not shown again.",
    duration: "Persistent (until the user clears local storage)",
    category: "necessary",
  },
  {
    name: "_ga",
    provider: "Google LLC (Google Analytics 4)",
    purpose:
      "Distinguishes unique users by assigning an anonymous identifier. Only set with analytics consent.",
    duration: "2 years",
    category: "analytics",
  },
  {
    name: "_ga_*",
    provider: "Google LLC (Google Analytics 4)",
    purpose:
      "Maintains the Analytics session state. Only set with analytics consent.",
    duration: "2 years",
    category: "analytics",
  },
  {
    name: "NID, CONSENT, SOCS",
    provider: "Google LLC (Google Maps)",
    purpose:
      "Cookies set by Google Maps when the map loads. Only activated if the user clicks the map button.",
    duration: "6 months – 2 years (per cookie)",
    category: "necessary",
  },
];

export function getCookieInventory(locale: string): CookieEntry[] {
  return locale === "en" ? cookieInventoryEn : cookieInventoryEs;
}

export const cookieCategoryLabelEs: Record<CookieCategory, string> = {
  necessary: "Necesarias",
  analytics: "Analíticas",
  preferences: "Preferencias",
};

export const cookieCategoryLabelEn: Record<CookieCategory, string> = {
  necessary: "Necessary",
  analytics: "Analytics",
  preferences: "Preferences",
};

export function getCookieCategoryLabel(
  category: CookieCategory,
  locale: string,
): string {
  const labels =
    locale === "en" ? cookieCategoryLabelEn : cookieCategoryLabelEs;
  return labels[category];
}
