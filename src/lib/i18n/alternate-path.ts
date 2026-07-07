import type { Locale } from "@/i18n/routing";
import {
  getMarketById,
  getMarketBySlug,
  getCourseBySlug,
  getCourseById,
  getServiceById,
  getServiceBySlug,
} from "@/lib/content/queries";
import { buildCoursePath } from "@/lib/routes/course-routes";
import { buildMarketPath, buildServicePath } from "@/lib/routes/service-routes";

const staticAlternates: Record<Locale, Record<string, string>> = {
  es: {
    "/": "/",
    "/servicios": "/services",
    "/descargas": "/downloads",
    "/formaciones": "/professional-training",
    "/jornadas": "/appointments-by-city",
    "/cuidados": "/aftercare",
    "/resultados": "/results",
    "/sobre-xiomara": "/about-xiomara",
    "/contacto": "/contact",
    "/sede-puerto-sagunto": "/puerto-sagunto-studio",
    "/aviso-legal": "/legal-notice",
    "/privacidad": "/privacy",
    "/cookies": "/cookies",
  },
  en: {
    "/": "/",
    "/services": "/servicios",
    "/downloads": "/descargas",
    "/professional-training": "/formaciones",
    "/appointments-by-city": "/jornadas",
    "/aftercare": "/cuidados",
    "/results": "/resultados",
    "/about-xiomara": "/sobre-xiomara",
    "/contact": "/contacto",
    "/puerto-sagunto-studio": "/sede-puerto-sagunto",
    "/legal-notice": "/aviso-legal",
    "/privacy": "/privacidad",
    "/cookies": "/cookies",
  },
};

function splitLocalizedPath(pathname: string) {
  const [, localeSegment, rest = ""] =
    pathname.match(/^\/(es|en)(\/.*)?$/) ?? [];
  const locale: Locale = localeSegment === "en" ? "en" : "es";
  const path = rest || "/";

  return { locale, path };
}

function prefixLocale(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function resolveServicePath(
  sourceLocale: Locale,
  targetLocale: Locale,
  path: string,
) {
  const segments = path.split("/").filter(Boolean);
  const sourceBase = sourceLocale === "es" ? "servicios" : "services";

  if (segments[0] !== sourceBase || segments.length < 2) {
    return null;
  }

  const sourceMarket = getMarketBySlug(segments[1], sourceLocale);

  if (!sourceMarket) {
    return null;
  }

  const targetMarket = getMarketById(sourceMarket.id, targetLocale);

  if (!targetMarket) {
    return null;
  }

  if (segments.length === 2) {
    return buildMarketPath(targetLocale, targetMarket.slug);
  }

  const sourceService = getServiceBySlug(segments[2], sourceLocale);

  if (!sourceService) {
    return null;
  }

  const hasServiceInMarket = sourceService.offers.some(
    (offer) => offer.marketId === sourceMarket.id,
  );

  if (!hasServiceInMarket) {
    return null;
  }

  const targetService = getServiceById(sourceService.id, targetLocale);

  if (!targetService) {
    return null;
  }

  return buildServicePath(targetLocale, targetMarket.slug, targetService.slug);
}

function resolveCoursePath(
  sourceLocale: Locale,
  targetLocale: Locale,
  path: string,
) {
  const segments = path.split("/").filter(Boolean);
  const sourceBase = sourceLocale === "es" ? "formaciones" : "professional-training";

  if (segments[0] !== sourceBase || segments.length !== 2) {
    return null;
  }

  const sourceCourse = getCourseBySlug(segments[1], sourceLocale);

  if (!sourceCourse) {
    return null;
  }

  const targetCourse = getCourseById(sourceCourse.id, targetLocale);

  if (!targetCourse) {
    return null;
  }

  return buildCoursePath(targetLocale, targetCourse.slug);
}

export function resolveLocalizedPath(pathname: string, targetLocale: Locale) {
  const { locale: sourceLocale, path } = splitLocalizedPath(pathname);

  if (sourceLocale === targetLocale) {
    return prefixLocale(targetLocale, path);
  }

  const servicePath = resolveServicePath(sourceLocale, targetLocale, path);

  if (servicePath) {
    return prefixLocale(targetLocale, servicePath);
  }

  const coursePath = resolveCoursePath(sourceLocale, targetLocale, path);

  if (coursePath) {
    return prefixLocale(targetLocale, coursePath);
  }

  const staticPath = staticAlternates[sourceLocale][path] ?? "/";

  return prefixLocale(targetLocale, staticPath);
}
