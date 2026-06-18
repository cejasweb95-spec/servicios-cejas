import type { Locale } from "@/i18n/routing";

export const courseBasePath: Record<Locale, `/${string}`> = {
  es: "/formaciones",
  en: "/professional-training",
};

export function buildCoursePath(
  locale: Locale,
  courseSlug: string,
): `/${string}` {
  return `${courseBasePath[locale]}/${courseSlug}` as `/${string}`;
}
