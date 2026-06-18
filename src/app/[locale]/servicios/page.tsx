import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ServicesIndexPage } from "@/app/[locale]/_pages/services-index-page";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import { isLocale } from "@/i18n/routing";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "es" }];
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "es") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Services" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/servicios",
    alternates: {
      es: "/servicios",
      en: "/services",
    },
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Services" });

  return (
    <ServicesIndexPage
      copy={{
        breadcrumbsLabel: t("breadcrumbsLabel"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        title: t("title"),
        description: t("description"),
        selectorLabel: t("selectorLabel"),
      }}
      locale={locale}
    />
  );
}
