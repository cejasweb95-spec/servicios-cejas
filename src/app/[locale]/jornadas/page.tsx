import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JourneysPage } from "@/app/[locale]/_pages/journeys-page";
import { isLocale } from "@/i18n/routing";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type JourneysRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "es" }];
}

export async function generateMetadata({
  params,
}: JourneysRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "es") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Journeys" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: journeyBasePath.es,
    alternates: {
      es: journeyBasePath.es,
      en: journeyBasePath.en,
    },
  });
}

export default async function JourneysRoute({ params }: JourneysRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Journeys" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });

  return (
    <JourneysPage
      copy={{
        addressLabel: t("addressLabel"),
        availabilityDescription: t("availabilityDescription"),
        availabilityTitle: t("availabilityTitle"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        contactLabel: t("contactLabel"),
        description: t("description"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        journeyLabel: t("journeyLabel"),
        listTitle: t("listTitle"),
        mapAriaLabel: t("mapAriaLabel"),
        mapInteractionHint: t("mapInteractionHint"),
        mapLegendHint: t("mapLegendHint"),
        mapTitle: t("mapTitle"),
        mapZoomControlsLabel: t("mapZoomControlsLabel"),
        noFixedStudioDescription: t("noFixedStudioDescription"),
        noFixedStudioTitle: t("noFixedStudioTitle"),
        physicalStudioDescription: t("physicalStudioDescription"),
        physicalStudioLabel: t("physicalStudioLabel"),
        primaryCta: t("primaryCta"),
        resetZoomLabel: t("resetZoomLabel"),
        selectLocationLabel: t("selectLocationLabel"),
        selectedLocationLabel: t("selectedLocationLabel"),
        title: t("title"),
        whatsappMessage: t.raw("whatsappMessage"),
        zoomInLabel: t("zoomInLabel"),
        zoomOutLabel: t("zoomOutLabel"),
      }}
      locale={locale}
      whatsapp={{
        closeLabel: whatsappT("close"),
        description: whatsappT("description"),
        title: whatsappT("title"),
      }}
    />
  );
}
