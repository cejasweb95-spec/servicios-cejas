import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/routing";
import { getCourses, getMarkets, getServicesByMarket } from "@/lib/content/queries";
import { buildCoursePath } from "@/lib/routes/course-routes";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import { buildServicePath } from "@/lib/routes/service-routes";
import {
  aboutBasePath,
  aftercareBasePath,
  contactBasePath,
  cookiesBasePath,
  legalNoticeBasePath,
  privacyBasePath,
  resultsBasePath,
} from "@/lib/routes/static-routes";

type SitemapRoute = {
  path: string;
  priority: number;
};

const staticRoutes: Record<(typeof locales)[number], SitemapRoute[]> = {
  es: [
    { path: "", priority: 1 },
    { path: "/servicios", priority: 0.9 },
    { path: "/formaciones", priority: 0.82 },
    { path: journeyBasePath.es, priority: 0.78 },
    { path: resultsBasePath.es, priority: 0.72 },
    { path: aboutBasePath.es, priority: 0.72 },
    { path: aftercareBasePath.es, priority: 0.7 },
    { path: contactBasePath.es, priority: 0.74 },
    { path: "/sede-puerto-sagunto", priority: 0.76 },
    { path: "/descargas", priority: 0.7 },
    { path: legalNoticeBasePath.es, priority: 0.45 },
    { path: privacyBasePath.es, priority: 0.45 },
    { path: cookiesBasePath.es, priority: 0.45 },
  ],
  en: [
    { path: "", priority: 0.9 },
    { path: "/services", priority: 0.85 },
    { path: "/professional-training", priority: 0.78 },
    { path: journeyBasePath.en, priority: 0.74 },
    { path: resultsBasePath.en, priority: 0.68 },
    { path: aboutBasePath.en, priority: 0.68 },
    { path: aftercareBasePath.en, priority: 0.66 },
    { path: contactBasePath.en, priority: 0.7 },
    { path: "/puerto-sagunto-studio", priority: 0.72 },
    { path: "/downloads", priority: 0.65 },
    { path: legalNoticeBasePath.en, priority: 0.42 },
    { path: privacyBasePath.en, priority: 0.42 },
    { path: cookiesBasePath.en, priority: 0.42 },
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = locales.flatMap((locale) => {
    const marketBasePath = locale === "es" ? "/servicios" : "/services";
    const marketRoutes = getMarkets(locale).map((market) => ({
      path: `${marketBasePath}/${market.slug}`,
      priority: locale === siteConfig.defaultLocale ? 0.85 : 0.8,
    }));
    const serviceRoutes = getMarkets(locale).flatMap((market) =>
      getServicesByMarket(market.id, locale).map((service) => ({
        path: buildServicePath(locale, market.slug, service.slug),
        priority: locale === siteConfig.defaultLocale ? 0.72 : 0.68,
      })),
    );
    const courseRoutes = getCourses(locale).map((course) => ({
      path: buildCoursePath(locale, course.slug),
      priority: locale === siteConfig.defaultLocale ? 0.74 : 0.7,
    }));

    return [...staticRoutes[locale], ...marketRoutes, ...serviceRoutes, ...courseRoutes].map((route) => ({
      url: new URL(`/${locale}${route.path}`, siteConfig.url).toString(),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    }));
  });

  return routes;
}
