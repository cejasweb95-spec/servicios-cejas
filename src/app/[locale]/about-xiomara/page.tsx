import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutXiomaraPage } from "@/app/[locale]/_pages/about-xiomara-page";
import { isLocale } from "@/i18n/routing";
import { aboutBasePath } from "@/lib/routes/static-routes";
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

  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: aboutBasePath.en,
    alternates: aboutBasePath,
  });
}

export default async function Route({ params }: RouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });

  return (
    <AboutXiomaraPage
      copy={{
        bio: t.raw("bio"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        certificationTitle: t("certificationTitle"),
        certifications: t.raw("certifications"),
        contactLabel: t("contactLabel"),
        description: t("description"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        stats: t.raw("stats"),
        title: t("title"),
        trajectoryTitle: t("trajectoryTitle"),
        trajectoryText: t("trajectoryText"),
      }}
      locale={locale}
      path={aboutBasePath.en}
      whatsapp={{
        closeLabel: whatsappT("close"),
        description: whatsappT("description"),
        title: whatsappT("title"),
      }}
    />
  );
}
