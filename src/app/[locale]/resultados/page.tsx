import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ResultsPage } from "@/app/[locale]/_pages/results-page";
import { isLocale } from "@/i18n/routing";
import { resultsBasePath } from "@/lib/routes/static-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type RouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "es" }];
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "es") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "ResultsPage" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: resultsBasePath.es,
    alternates: resultsBasePath,
  });
}

export default async function Route({ params }: RouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ResultsPage" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });

  return (
    <ResultsPage
      copy={{
        breadcrumbsLabel: t("breadcrumbsLabel"),
        closeLightboxLabel: t("closeLightboxLabel"),
        contactLabel: t("contactLabel"),
        description: t("description"),
        emptyGalleryLabel: t("emptyGalleryLabel"),
        eyebrow: t("eyebrow"),
        galleryNote: t("galleryNote"),
        galleryTitle: t("galleryTitle"),
        healingLabel: t("healingLabel"),
        homeLabel: t("homeLabel"),
        imageCountLabel: t.raw("imageCountLabel"),
        nextResultLabel: t("nextResultLabel"),
        openResultLabel: t("openResultLabel"),
        previousResultLabel: t("previousResultLabel"),
        title: t("title"),
      }}
      locale={locale}
      path={resultsBasePath.es}
      whatsapp={{
        closeLabel: whatsappT("close"),
        description: whatsappT("description"),
        title: whatsappT("title"),
      }}
    />
  );
}
