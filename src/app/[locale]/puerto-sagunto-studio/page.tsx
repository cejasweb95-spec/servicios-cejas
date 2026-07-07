import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PuertoSaguntoStudioPage } from "@/app/[locale]/_pages/puerto-sagunto-studio-page";
import { isLocale } from "@/i18n/routing";
import { puertoSaguntoStudioBasePath } from "@/lib/routes/studio-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type RouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "PuertoSaguntoStudioPage" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: puertoSaguntoStudioBasePath.en,
    alternates: puertoSaguntoStudioBasePath,
  });
}

export default async function Route({ params }: RouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "PuertoSaguntoStudioPage" });

  return (
    <PuertoSaguntoStudioPage
      copy={{
        addressLabel: t("addressLabel"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        businessNameLabel: t("businessNameLabel"),
        description: t("description"),
        directionsLabel: t("directionsLabel"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        introParagraphs: t.raw("introParagraphs") as string[],
        journeysLinkLabel: t("journeysLinkLabel"),
        mapHint: t("mapHint"),
        mapLoadLabel: t("mapLoadLabel"),
        mapTitle: t("mapTitle"),
        napNote: t("napNote"),
        phoneLabel: t("phoneLabel"),
        reviewCta: t("reviewCta"),
        reviewTitle: t("reviewTitle"),
        servicesCta: t("servicesCta"),
        servicesDescription: t("servicesDescription"),
        servicesTitle: t("servicesTitle"),
        title: t("title"),
        whatsappCta: t("whatsappCta"),
        whatsappMessage: t("whatsappMessage"),
      }}
      locale={locale}
      path={puertoSaguntoStudioBasePath.en}
    />
  );
}
