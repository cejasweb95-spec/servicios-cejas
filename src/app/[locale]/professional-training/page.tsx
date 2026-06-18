import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TrainingIndexPage } from "@/app/[locale]/_pages/training-index-page";
import { isLocale } from "@/i18n/routing";
import { getWhatsAppTargets } from "@/lib/content/queries";
import { courseBasePath } from "@/lib/routes/course-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type TrainingPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: TrainingPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Training" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: courseBasePath.en,
    alternates: {
      es: courseBasePath.es,
      en: courseBasePath.en,
    },
  });
}

export default async function TrainingPage({ params }: TrainingPageProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Training" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });

  return (
    <TrainingIndexPage
      copy={{
        breadcrumbsLabel: t("breadcrumbsLabel"),
        courseDetailLabel: t("courseDetailLabel"),
        description: t("description"),
        downloadLabel: t("downloadLabel"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        nextDateLabel: t("nextDateLabel"),
        title: t("title"),
      }}
      locale={locale}
      whatsapp={{
        closeLabel: whatsappT("close"),
        description: whatsappT("description"),
        targets: getWhatsAppTargets(locale),
        title: whatsappT("title"),
      }}
    />
  );
}
