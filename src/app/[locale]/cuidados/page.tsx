import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AftercarePage } from "@/app/[locale]/_pages/aftercare-page";
import { isLocale } from "@/i18n/routing";
import { aftercareBasePath } from "@/lib/routes/static-routes";
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

  const t = await getTranslations({ locale, namespace: "AftercarePage" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: aftercareBasePath.es,
    alternates: aftercareBasePath,
  });
}

export default async function Route({ params }: RouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "AftercarePage" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });

  return (
    <AftercarePage
      copy={{
        afterBrows: t.raw("afterBrows"),
        afterLips: t.raw("afterLips"),
        afterTitle: t("afterTitle"),
        beforeBrows: t.raw("beforeBrows"),
        beforeBrowsIntro: t("beforeBrowsIntro"),
        beforeLips: t.raw("beforeLips"),
        beforeLipsIntro: t("beforeLipsIntro"),
        beforeTitle: t("beforeTitle"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        browsLabel: t("browsLabel"),
        contactLabel: t("contactLabel"),
        description: t("description"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        lipsLabel: t("lipsLabel"),
        note: t("note"),
        noteTitle: t("noteTitle"),
        title: t("title"),
      }}
      locale={locale}
      path={aftercareBasePath.es}
      whatsapp={{
        closeLabel: whatsappT("close"),
        description: whatsappT("description"),
        title: whatsappT("title"),
      }}
    />
  );
}
