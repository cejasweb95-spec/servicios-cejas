import type { Locale } from "@/i18n/routing";

export const serviceBasePath: Record<Locale, string> = {
  es: "/servicios",
  en: "/services",
};

export function buildMarketPath(locale: Locale, marketSlug: string): `/${string}` {
  return `${serviceBasePath[locale]}/${marketSlug}` as `/${string}`;
}

export function buildServicePath(
  locale: Locale,
  marketSlug: string,
  serviceSlug: string,
): `/${string}` {
  return `${buildMarketPath(locale, marketSlug)}/${serviceSlug}` as `/${string}`;
}
