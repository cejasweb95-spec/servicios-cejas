import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ServiceDetailPage } from "@/app/[locale]/_pages/service-detail-page";
import {
  getMarketById,
  getMarketBySlug,
  getMarkets,
  getServiceById,
  getServiceBySlug,
  getServicesByMarket,
} from "@/lib/content/queries";
import { buildServicePath } from "@/lib/routes/service-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import { fitMetadataTitle } from "@/lib/seo/fit-metadata-title";

type ServicePageProps = {
  params: Promise<{ locale: string; market: string; service: string }>;
};

export function generateStaticParams() {
  return getMarkets("en").flatMap((market) =>
    getServicesByMarket(market.id, "en").map((service) => ({
      locale: "en",
      market: market.slug,
      service: service.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, market: marketSlug, service: serviceSlug } = await params;

  if (locale !== "en") {
    notFound();
  }

  const market = getMarketBySlug(marketSlug, locale);
  const service = getServiceBySlug(serviceSlug, locale);

  if (
    !market ||
    !service ||
    !service.offers.some((offer) => offer.marketId === market.id)
  ) {
    notFound();
  }

  const spanishMarket = getMarketById(market.id, "es");
  const spanishService = getServiceById(service.id, "es");
  const t = await getTranslations({ locale, namespace: "ServiceDetail" });

  return buildPageMetadata({
    locale,
    title: fitMetadataTitle(
      t("metaTitle", { service: service.name, market: market.name }),
    ),
    description: t("metaDescription", {
      service: service.name,
      market: market.name,
    }),
    path: buildServicePath(locale, market.slug, service.slug),
    alternates: {
      es:
        spanishMarket && spanishService
          ? buildServicePath("es", spanishMarket.slug, spanishService.slug)
          : "/servicios",
      en: buildServicePath(locale, market.slug, service.slug),
    },
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, market, service } = await params;

  if (locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ServiceDetail" });

  return (
    <ServiceDetailPage
      copy={{
        appointmentDurationLabel: t("appointmentDurationLabel"),
        assessmentDescription: t("assessmentDescription"),
        assessmentLabel: t("assessmentLabel"),
        assessmentTitle: t("assessmentTitle"),
        afterCareLabel: t("afterCareLabel"),
        backToMarketLabel: t("backToMarketLabel"),
        beforeCareLabel: t("beforeCareLabel"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        careDescription: t("careDescription"),
        careTitle: t("careTitle"),
        categoryLabel: t("categoryLabel"),
        contactLabel: t("contactLabel"),
        descriptionTitle: t("descriptionTitle"),
        detailsTitle: t("detailsTitle"),
        heroEyebrow: t("heroEyebrow"),
        heroTitle: (serviceName, marketName) =>
          t("heroTitle", { service: serviceName, market: marketName }),
        homeLabel: t("homeLabel"),
        marketLabel: t("marketLabel"),
        priceLabel: t("priceLabel"),
        relatedActionLabel: t("relatedActionLabel"),
        relatedDescription: t("relatedDescription"),
        relatedTitle: t("relatedTitle"),
        resultDurationLabel: t("resultDurationLabel"),
        servicesLabel: t("servicesLabel"),
        sourceNoteLabel: t("sourceNoteLabel"),
        whatsappMessage: (serviceName, marketName) =>
          t("whatsappMessage", { service: serviceName, market: marketName }),
      }}
      locale={locale}
      marketSlug={market}
      serviceSlug={service}
    />
  );
}
