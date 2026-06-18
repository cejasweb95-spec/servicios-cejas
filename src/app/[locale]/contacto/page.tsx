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
  return [{ locale: "es" }];
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "es") {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: contactBasePath.es,
    alternates: contactBasePath,
  });
}

export default async function Route({ params }: RouteProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale !== "es") {
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
        noFormNote: t("noFormNote"),
        socialLabel: t("socialLabel"),
        title: t("title"),
        whatsappLabel: t("whatsappLabel"),
      }}
      locale={locale}
      path={contactBasePath.es}
    />
  );
}
