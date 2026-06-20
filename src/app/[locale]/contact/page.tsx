import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactPage } from "@/app/[locale]/_pages/contact-page";
import { isLocale } from "@/i18n/routing";
import { contactBasePath } from "@/lib/routes/static-routes";
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

  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: contactBasePath.en,
    alternates: contactBasePath,
  });
}

export default async function Route({ params }: RouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return (
    <ContactPage
      copy={{
        addressLabel: t("addressLabel"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        description: t("description"),
        emailLabel: t("emailLabel"),
        eyebrow: t("eyebrow"),
        homeLabel: t("homeLabel"),
        mapDirectionsLabel: t("mapDirectionsLabel"),
        mapHint: t("mapHint"),
        mapLoadLabel: t("mapLoadLabel"),
        mapTitle: t("mapTitle"),
        noFormNote: t("noFormNote"),
        socialLabel: t("socialLabel"),
        title: t("title"),
        whatsappLabel: t("whatsappLabel"),
      }}
      locale={locale}
      path={contactBasePath.en}
    />
  );
}
