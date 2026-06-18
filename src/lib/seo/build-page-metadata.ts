import type { Metadata } from "next";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

type BuildPageMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  path: `/${string}` | "";
  alternates?: Partial<Record<Locale, `/${string}` | "">>;
};

const openGraphLocale: Record<Locale, string> = {
  es: "es_ES",
  en: "en",
};

function withLocale(locale: Locale, path: `/${string}` | "") {
  return `/${locale}${path}`;
}

function absolute(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function buildPageMetadata({
  alternates,
  description,
  locale,
  path,
  title,
}: BuildPageMetadataInput): Metadata {
  const canonical = withLocale(locale, path);
  const esPath = alternates?.es ?? path;
  const enPath = alternates?.en ?? path;
  const socialImage = {
    url: absolute(withLocale(locale, "/opengraph-image")),
    width: 1200,
    height: 630,
  };
  const twitterImage = {
    url: absolute(withLocale(locale, "/twitter-image")),
    width: 1200,
    height: 630,
  };

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title,
    description,
    alternates: {
      canonical: absolute(canonical),
      languages: {
        es: absolute(withLocale("es", esPath)),
        en: absolute(withLocale("en", enPath)),
        "x-default": absolute(withLocale("es", esPath)),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: absolute(canonical),
      siteName: siteConfig.name,
      locale: openGraphLocale[locale],
      type: "website",
      images: [{ ...socialImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ ...twitterImage, alt: title }],
    },
    category: "beauty",
    other: {
      "theme-color": brandColors.primary,
    },
  };
}
