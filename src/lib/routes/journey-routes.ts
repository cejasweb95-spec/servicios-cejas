import type { Locale } from "@/i18n/routing";

export const journeyBasePath: Record<Locale, `/${string}`> = {
  es: "/jornadas",
  en: "/appointments-by-city",
};
