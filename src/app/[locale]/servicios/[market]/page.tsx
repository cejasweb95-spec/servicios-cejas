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
  return getMarkets("es").map((market) => ({
    locale: "es",
    market: market.slug,
  }));
}

export async function generateMetadata({
  params,
}: MarketPageProps): Promise<Metadata> {
  const { locale, market: marketSlug } = await params;

  if (locale !== "es") {
    notFound();
  }

  const market = getMarketBySlug(marketSlug, locale);

  if (!market) {
    notFound();
  }

  const englishMarket = getMarketById(market.id, "en");
  const t = await getTranslations({ locale, namespace: "MarketServices" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle", { market: market.name }),
    description: t("metaDescription", { market: market.name }),
    path: `/servicios/${market.slug}`,
    alternates: {
      es: `/servicios/${market.slug}`,
      en: englishMarket ? `/services/${englishMarket.slug}` : "/services",
    },
  });
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { locale, market } = await params;

  if (locale !== "es") {
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
        studioBannerCta: t("studioBannerCta"),
        studioBannerDescription: t("studioBannerDescription"),
        studioBannerTitle: t("studioBannerTitle"),
      }}
      locale={locale}
      marketSlug={market}
    />
  );
}
