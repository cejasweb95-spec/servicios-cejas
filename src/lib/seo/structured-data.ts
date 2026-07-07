import { siteConfig } from "@/config/site";
import { locations } from "@/content/locations";
import type { Locale } from "@/i18n/routing";
import type { LegalProfile, SocialLink } from "@/lib/content/schema";

type BreadcrumbItem = {
  name: string;
  path: string;
};

function localizedField<T extends { es: string; en: string }>(value: T, locale: Locale) {
  return value[locale];
}

function buildPhysicalStudioJsonLdNodes({
  legalProfile,
  locale,
  logoUrl,
}: {
  legalProfile: Pick<LegalProfile, "brandName" | "email" | "ownerName" | "taxId"> & {
    address: string;
  };
  locale: Locale;
  logoUrl: string;
}) {
  return locations
    .filter((location) => location.type === "physical_studio")
    .map((location) => ({
      "@context": "https://schema.org",
      "@type": "BeautySalon" as const,
      name: legalProfile.brandName,
      image: logoUrl,
      url: siteConfig.url,
      telephone:
        location.marketId === "colombia"
          ? `+${siteConfig.whatsapp.colombia}`
          : `+${siteConfig.whatsapp.europe}`,
      email: legalProfile.email,
      address: location.address
        ? localizedField(location.address, locale)
        : legalProfile.address,
    }));
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

type WebPageJsonLdInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
};

export function buildWebPageJsonLd({
  description,
  locale,
  path,
  title,
}: WebPageJsonLdInput) {
  const pageUrl = new URL(`/${locale}${path}`, siteConfig.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

type ImageObjectJsonLdInput = {
  locale: Locale;
  name: string;
  description: string;
  contentUrl: string;
  pagePath: string;
  caption?: string;
  width?: number;
  height?: number;
};

export function buildImageObjectJsonLd({
  caption,
  contentUrl,
  description,
  height,
  locale,
  name,
  pagePath,
  width,
}: ImageObjectJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name,
    description,
    contentUrl: new URL(contentUrl, siteConfig.url).toString(),
    url: new URL(`/${locale}${pagePath}`, siteConfig.url).toString(),
    inLanguage: locale,
    ...(caption ? { caption } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };
}

type ServiceJsonLdInput = {
  name: string;
  description: string;
  image?: string;
  url: string;
  areaServed: string;
  price?: number;
  priceCurrency?: string;
};

export function buildServiceJsonLd({
  areaServed,
  description,
  image,
  name,
  price,
  priceCurrency,
  url,
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    ...(image ? { image: new URL(image, siteConfig.url).toString() } : {}),
    areaServed: {
      "@type": "Place",
      name: areaServed,
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(price && priceCurrency
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency,
            availability: "https://schema.org/InStock",
            url: new URL(url, siteConfig.url).toString(),
          },
        }
      : {}),
    url: new URL(url, siteConfig.url).toString(),
  };
}

type HomeJsonLdInput = {
  locale: Locale;
  title: string;
  description: string;
  legalProfile: Pick<
    LegalProfile,
    "brandName" | "email" | "ownerName" | "taxId"
  > & { address: string };
  logoPath: string;
  socialLinks: SocialLink[];
};

export function buildHomeJsonLd({
  description,
  legalProfile,
  locale,
  logoPath,
  socialLinks,
  title,
}: HomeJsonLdInput) {
  const homeUrl = new URL(`/${locale}`, siteConfig.url).toString();
  const logoUrl = new URL(logoPath, siteConfig.url).toString();
  const sameAs = socialLinks.map((link) => link.href);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: legalProfile.brandName,
      legalName: legalProfile.ownerName,
      url: siteConfig.url,
      logo: logoUrl,
      email: legalProfile.email,
      taxID: legalProfile.taxId,
      sameAs,
    },
    ...buildPhysicalStudioJsonLdNodes({ legalProfile, locale, logoUrl }),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: homeUrl,
      inLanguage: locale,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];
}

type PhysicalStudioPageJsonLdInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  legalProfile: Pick<
    LegalProfile,
    "brandName" | "email" | "ownerName" | "taxId"
  > & { address: string };
  logoPath: string;
  studio: {
    marketId: string;
    address: string;
    coordinates: { lat: number; lng: number } | null;
  };
};

export function buildPhysicalStudioPageJsonLd({
  description,
  legalProfile,
  locale,
  logoPath,
  path,
  studio,
  title,
}: PhysicalStudioPageJsonLdInput) {
  const pageUrl = new URL(`/${locale}${path}`, siteConfig.url).toString();
  const logoUrl = new URL(logoPath, siteConfig.url).toString();
  const telephone =
    studio.marketId === "colombia"
      ? `+${siteConfig.whatsapp.colombia}`
      : `+${siteConfig.whatsapp.europe}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: legalProfile.brandName,
      image: logoUrl,
      url: pageUrl,
      telephone,
      email: legalProfile.email,
      address: studio.address,
      ...(studio.coordinates
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: studio.coordinates.lat,
              longitude: studio.coordinates.lng,
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
      inLanguage: locale,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];
}

type JourneysJsonLdInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  legalProfile: Pick<
    LegalProfile,
    "brandName" | "email" | "ownerName" | "taxId"
  > & { address: string };
  logoPath: string;
};

export function buildJourneysJsonLd({
  description,
  legalProfile,
  locale,
  logoPath,
  path,
  title,
}: JourneysJsonLdInput) {
  const pageUrl = new URL(`/${locale}${path}`, siteConfig.url).toString();
  const logoUrl = new URL(logoPath, siteConfig.url).toString();

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: legalProfile.brandName,
      legalName: legalProfile.ownerName,
      url: siteConfig.url,
      logo: logoUrl,
      email: legalProfile.email,
      taxID: legalProfile.taxId,
    },
    ...buildPhysicalStudioJsonLdNodes({ legalProfile, locale, logoUrl }),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
      inLanguage: locale,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];
}

type CourseOfferJsonLdInput = {
  name: string;
  price: number;
  priceCurrency: string;
  url: string;
};

type CourseJsonLdInput = {
  name: string;
  description: string;
  image?: string;
  url: string;
  timeRequired: string;
  courseMode: string[];
  offers: CourseOfferJsonLdInput[];
};

export function buildCourseJsonLd({
  courseMode,
  description,
  image,
  name,
  offers,
  timeRequired,
  url,
}: CourseJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    ...(image
      ? { image: new URL(image, siteConfig.url).toString() }
      : {}),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    timeRequired,
    courseMode,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode,
      courseWorkload: timeRequired,
      offers: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        url: new URL(offer.url, siteConfig.url).toString(),
      })),
    },
    url: new URL(url, siteConfig.url).toString(),
  };
}
