import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { DownloadsPage } from "@/app/[locale]/_pages/downloads-page";
import { isLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type DownloadsRouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: DownloadsRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Downloads" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/downloads",
    alternates: {
      es: "/descargas",
      en: "/downloads",
    },
  });
}

export default async function DownloadsRoute({ params }: DownloadsRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Downloads" });

  return (
    <DownloadsPage
      copy={{
        actionLabel: t("actionLabel"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        catalogLabel: t("catalogLabel"),
        courseLabel: t("courseLabel"),
        description: t("description"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        title: t("title"),
      }}
      locale={locale}
    />
  );
}
