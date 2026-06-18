import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalContentPage } from "@/app/[locale]/_pages/legal-content-page";
import { isLocale } from "@/i18n/routing";
import { cookiesBasePath } from "@/lib/routes/static-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type RouteProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "CookiesPage" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: cookiesBasePath[locale],
    alternates: cookiesBasePath,
  });
}

export default async function Route({ params }: RouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CookiesPage" });
  const legalContentT = await getTranslations({
    locale,
    namespace: "LegalContent",
  });

  return (
    <LegalContentPage
      copy={{
        breadcrumbsLabel: t("breadcrumbsLabel"),
        cookiePreferencesLabel: t("cookiePreferencesLabel"),
        description: t("description"),
        detailsTitle: t("detailsTitle"),
        homeLabel: t("homeLabel"),
        labels: {
          addressLabel: legalContentT("addressLabel"),
          brandLabel: legalContentT("brandLabel"),
          cookieCategoriesTitle: legalContentT("cookieCategoriesTitle"),
          emailLabel: legalContentT("emailLabel"),
          ownerLabel: legalContentT("ownerLabel"),
          taxIdLabel: legalContentT("taxIdLabel"),
        },
        reviewNote: t("reviewNote"),
        sections: t.raw("sections"),
        title: t("title"),
      }}
      locale={locale}
      path={cookiesBasePath[locale]}
    />
  );
}
