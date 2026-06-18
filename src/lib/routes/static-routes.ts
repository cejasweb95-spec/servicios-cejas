import type { Locale } from "@/i18n/routing";

export const resultsBasePath: Record<Locale, `/${string}`> = {
  es: "/resultados",
  en: "/results",
};

export const aboutBasePath: Record<Locale, `/${string}`> = {
  es: "/sobre-xiomara",
  en: "/about-xiomara",
};

export const contactBasePath: Record<Locale, `/${string}`> = {
  es: "/contacto",
  en: "/contact",
};

export const aftercareBasePath: Record<Locale, `/${string}`> = {
  es: "/cuidados",
  en: "/aftercare",
};

export const legalNoticeBasePath: Record<Locale, `/${string}`> = {
  es: "/aviso-legal",
  en: "/legal-notice",
};

export const privacyBasePath: Record<Locale, `/${string}`> = {
  es: "/privacidad",
  en: "/privacy",
};

export const cookiesBasePath: Record<Locale, `/${string}`> = {
  es: "/cookies",
  en: "/cookies",
};
