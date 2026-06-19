import { localContentProvider } from "@/lib/content/provider";
import type {
  Course,
  Download,
  LegalPage,
  Locale,
  Market,
  MarketId,
  Service,
  ServiceCategory,
  WhatsAppTarget,
} from "@/lib/content/schema";
import { validateContent } from "@/lib/content/validators";

validateContent();

const {
  analyticsSettings,
  cookieCategories,
  courses,
  downloads,
  events,
  legalPages,
  legalProfile,
  locations,
  markets,
  mediaAssets,
  seoEntries,
  serviceCategories,
  services,
  socialLinks,
  siteSettings,
  whatsappTargets,
} = localContentProvider;

type Localized<T> = Omit<T, "slug" | "name" | "description" | "shortDescription" | "longDescription" | "resultDuration" | "sourceNote" | "title" | "summary" | "label" | "country" | "city" | "region" | "address" | "notes" | "defaultMessage">;

const text = (value: { es: string; en: string }, locale: Locale) => value[locale];

function localizeMarket(market: Market, locale: Locale) {
  return {
    ...market,
    slug: text(market.slug, locale),
    name: text(market.name, locale),
    shortName: text(market.shortName, locale),
    countryLabel: text(market.countryLabel, locale),
    description: text(market.description, locale),
  };
}

function localizeCategory(category: ServiceCategory, locale: Locale) {
  return {
    ...category,
    slug: text(category.slug, locale),
    name: text(category.name, locale),
    description: text(category.description, locale),
  };
}

function localizeService(service: Service, locale: Locale) {
  return {
    ...service,
    slug: text(service.slug, locale),
    name: text(service.name, locale),
    shortDescription: text(service.shortDescription, locale),
    longDescription: service.longDescription ? text(service.longDescription, locale) : undefined,
    resultDuration: service.resultDuration ? text(service.resultDuration, locale) : undefined,
    sourceNote: service.sourceNote ? text(service.sourceNote, locale) : undefined,
  };
}

function localizeCourse(course: Course, locale: Locale) {
  return {
    ...course,
    slug: text(course.slug, locale),
    name: text(course.name, locale),
    summary: text(course.summary, locale),
    certification: text(course.certification, locale),
    duration: {
      ...course.duration,
      label: text(course.duration.label, locale),
      note: course.duration.note ? text(course.duration.note, locale) : undefined,
    },
    modules: course.modules.map((module) => text(module, locale)),
    includes: course.includes.map((item) => text(item, locale)),
  };
}

function localizeDownload(download: Download, locale: Locale) {
  return {
    ...download,
    title: text(download.title, locale),
    description: text(download.description, locale),
  };
}

function localizeWhatsAppTarget(target: WhatsAppTarget, locale: Locale) {
  return {
    ...target,
    label: text(target.label, locale),
    defaultMessage: text(target.defaultMessage, locale),
  };
}

function byMarket<T extends { marketId?: MarketId }>(items: T[], marketId: MarketId) {
  return items.filter((item) => item.marketId === marketId);
}

export function getMarkets(locale: Locale) {
  return markets.map((market) => localizeMarket(market, locale));
}

export function getMarketById(id: MarketId, locale: Locale) {
  const market = markets.find((item) => item.id === id);
  return market ? localizeMarket(market, locale) : null;
}

export function getMarketBySlug(slug: string, locale: Locale) {
  const market = markets.find((item) => item.slug[locale] === slug);
  return market ? localizeMarket(market, locale) : null;
}

export function getServices(locale: Locale) {
  return services.map((service) => localizeService(service, locale));
}

export function getServicesByMarket(marketId: MarketId, locale: Locale) {
  return services
    .filter((service) => service.offers.some((offer) => offer.marketId === marketId))
    .map((service) => ({
      ...localizeService(service, locale),
      offers: service.offers.filter((offer) => offer.marketId === marketId),
    }));
}

export function getServiceBySlug(slug: string, locale: Locale) {
  const service = services.find((item) => item.slug[locale] === slug);
  return service ? localizeService(service, locale) : null;
}

export function getServiceById(id: string, locale: Locale) {
  const service = services.find((item) => item.id === id);
  return service ? localizeService(service, locale) : null;
}

export function getServiceCategories(locale: Locale) {
  return serviceCategories
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((category) => localizeCategory(category, locale));
}

export function getServiceCategoryById(id: string, locale: Locale) {
  const category = serviceCategories.find((item) => item.id === id);
  return category ? localizeCategory(category, locale) : null;
}

export function getCourses(locale: Locale) {
  return courses.map((course) => localizeCourse(course, locale));
}

export function getCourseBySlug(slug: string, locale: Locale) {
  const course = courses.find((item) => item.slug[locale] === slug);
  return course ? localizeCourse(course, locale) : null;
}

export function getCourseById(id: string, locale: Locale) {
  const course = courses.find((item) => item.id === id);
  return course ? localizeCourse(course, locale) : null;
}

export function getLocations(locale: Locale) {
  return locations.map((location) => ({
    ...location,
    country: text(location.country, locale),
    city: text(location.city, locale),
    region: location.region ? text(location.region, locale) : undefined,
    address: location.address ? text(location.address, locale) : undefined,
    notes: text(location.notes, locale),
  }));
}

export function getEvents(locale: Locale) {
  return events.map((event) => ({
    ...event,
    label: text(event.label, locale),
  }));
}

export function getDownloads(locale: Locale) {
  return downloads.map((download) => localizeDownload(download, locale));
}

export function getDownloadsByMarket(marketId: MarketId, locale: Locale) {
  return byMarket(downloads, marketId).map((download) => localizeDownload(download, locale));
}

export function getWhatsAppTarget(targetId: string, locale: Locale) {
  const target = whatsappTargets.find((item) => item.id === targetId);
  return target ? localizeWhatsAppTarget(target, locale) : null;
}

export function getWhatsAppTargets(locale: Locale) {
  return whatsappTargets.map((target) => localizeWhatsAppTarget(target, locale));
}

export function getSeoEntry(route: string, locale: Locale) {
  return seoEntries.find((entry) => entry.route === route && entry.locale === locale) ?? null;
}

export function getLegalPage(type: LegalPage["type"], locale: Locale) {
  const page = legalPages.find((item) => item.type === type);

  return page
    ? {
        ...page,
        slug: text(page.slug, locale),
        title: text(page.title, locale),
        summary: text(page.summary, locale),
      }
    : null;
}

export function getCookieCategories(locale: Locale) {
  return cookieCategories.map((category) => ({
    ...category,
    title: text(category.title, locale),
    description: text(category.description, locale),
  }));
}

export function getAnalyticsSettings() {
  return analyticsSettings;
}

export function getLegalProfile(locale: Locale) {
  return {
    ...legalProfile,
    address: text(legalProfile.address, locale),
    note: text(legalProfile.note, locale),
  };
}

export function getMediaAssets() {
  return mediaAssets;
}

export function getMediaAssetById(id: string, locale: Locale) {
  const asset = mediaAssets.find((item) => item.id === id);

  return asset
    ? {
        ...asset,
        alt: text(asset.alt, locale),
      }
    : null;
}

export function getSocialLinks() {
  return socialLinks;
}

export function getSiteSettings() {
  return siteSettings;
}

export type { Localized };
