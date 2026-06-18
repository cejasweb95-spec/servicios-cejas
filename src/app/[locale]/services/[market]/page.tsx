import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { MarketServicesPage } from "@/app/[locale]/_pages/market-services-page";
import { getMarketById, getMarketBySlug, getMarkets } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type MarketPageProps = {
  params: Promise<{ locale: string; market: string }>;
};

export function generateStaticParams() {
  return getMarkets("en").map((market) => ({
    locale: "en",
    market: market.slug,
  }));
}

export async function generateMetadata({
  params,
}: MarketPageProps): Promise<Metadata> {
  const { locale, market: marketSlug } = await params;

  if (locale !== "en") {
    notFound();
  }

  const market = getMarketBySlug(marketSlug, locale);

  if (!market) {
    notFound();
  }

  const spanishMarket = getMarketById(market.id, "es");
  const t = await getTranslations({ locale, namespace: "MarketServices" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle", { market: market.name }),
    description: t("metaDescription", { market: market.name }),
    path: `/services/${market.slug}`,
    alternates: {
      es: spanishMarket ? `/servicios/${spanishMarket.slug}` : "/servicios",
      en: `/services/${market.slug}`,
    },
  });
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { locale, market } = await params;

  if (locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "MarketServices" });

  return (
    <MarketServicesPage
      copy={{
        allMarketsLabel: t("allMarketsLabel"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        catalogBannerTitle: t("catalogBannerTitle"),
        catalogBannerDescription: t("catalogBannerDescription"),
        catalogDownloadLabel: t("catalogDownloadLabel"),
        contactLabel: t("contactLabel"),
        emptyTitle: t("emptyTitle"),
        emptyDescription: t("emptyDescription"),
        heroEyebrow: t("heroEyebrow"),
        heroTitle: (marketName) => t("heroTitle", { market: marketName }),
        homeLabel: t("homeLabel"),
        servicesLabel: t("servicesLabel"),
        selectorLabel: t("selectorLabel"),
        serviceDetailLabel: t("serviceDetailLabel"),
      }}
      locale={locale}
      marketSlug={market}
    />
  );
}
