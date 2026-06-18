import type { CurrencyCode, Locale } from "@/lib/content/schema";

const currencyLocales: Record<CurrencyCode, string> = {
  COP: "es-CO",
  EUR: "es-ES",
  CHF: "de-CH",
};

export function formatCurrency(amount: number, currency: CurrencyCode, locale: Locale) {
  const intlLocale = locale === "es" ? currencyLocales[currency] : "en-US";

  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
