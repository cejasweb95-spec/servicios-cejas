import type { Metadata } from "next";
import { Marcellus, Manrope, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { AppProviders } from "@/components/providers/app-providers";
import { CookieConsentBanner } from "@/components/domain/cookie-consent-banner";
import { MobileStickyContact } from "@/components/layout/mobile-sticky-contact";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import {
  footerDiscoverNavigationIds,
  footerResourcesNavigationIds,
  legalNavigation,
  mainNavigation,
  resolveNavItems,
} from "@/config/navigation";
import { isLocale, locales, type Locale } from "@/i18n/routing";
import {
  getLegalProfile,
  getAnalyticsSettings,
  getCookieCategories,
  getMarkets,
  getMediaAssets,
  getSeoEntry,
  getSocialLinks,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import { cookiesBasePath } from "@/lib/routes/static-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Meta" });
  const seo = getSeoEntry(`/${locale}`, locale);
  const title = seo?.title ?? t("title");
  const description = seo?.description ?? t("description");

  return buildPageMetadata({
    locale,
    title,
    description,
    path: "",
    alternates: {
      es: "",
      en: "",
    },
  });
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  setRequestLocale(locale);
  const messages = await getMessages();
  const shellT = await getTranslations({ locale, namespace: "Shell" });
  const footerT = await getTranslations({ locale, namespace: "Footer" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });
  const navItems = mainNavigation.map((item) => ({
    id: item.id,
    href: item.href[locale],
    label: item.label[locale],
  }));
  const legalItems = legalNavigation.map((item) => ({
    id: item.id,
    href: item.href[locale],
    label: item.label[locale],
  }));
  const servicesBase = locale === "es" ? "/servicios" : "/services";
  const marketItems = getMarkets(locale).map((market) => ({
    id: market.id,
    href: `${servicesBase}/${market.slug}`,
    label: market.shortName,
  }));
  const footerNavGroups = [
    {
      id: "discover",
      label: footerT("navGroupDiscover"),
      items: resolveNavItems(navItems, footerDiscoverNavigationIds),
    },
    {
      id: "resources",
      label: footerT("navGroupResources"),
      items: resolveNavItems(navItems, footerResourcesNavigationIds),
    },
  ];
  const whatsappTargets = getWhatsAppTargets(locale);
  const whatsapp = {
    closeLabel: whatsappT("close"),
    description: whatsappT("description"),
    targets: whatsappTargets,
    title: whatsappT("title"),
  };
  const logoAsset = getMediaAssets().find((item) => item.id === "logo-oficial");
  const logo = logoAsset
    ? {
        alt: logoAsset.alt[locale],
        height: logoAsset.height ?? 949,
        src: logoAsset.publicPath ?? "/images/brand/logo-oficial-sin-fondo.png",
        width: logoAsset.width ?? 2095,
      }
    : null;

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${marcellus.variable} ${oswald.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <SkipLink label={shellT("skipToContent")} />
            <div className="min-h-dvh">
              <SiteHeader
                contactLabel={shellT("contactCta")}
                currentLocale={locale}
                wordmark={{
                  ariaLabel: shellT("headerWordmarkAriaLabel"),
                  brandLine: shellT("headerBrandLine"),
                  byline: shellT("headerByline"),
                  surname: shellT("headerSurname"),
                }}
                labels={{
                  closeMenu: shellT("closeMenu"),
                  language: shellT("languageNavigation"),
                  mainNavigation: shellT("mainNavigation"),
                  mobileMenuTitle: shellT("mobileMenuTitle"),
                  moreNavigation: shellT("moreNavigation"),
                  openMenu: shellT("openMenu"),
                  secondaryNavigation: shellT("secondaryNavigation"),
                }}
                navItems={navItems}
                whatsapp={whatsapp}
              />
              <div className="pb-6 xl:pb-0" id="contenido">
                {children}
              </div>
              <SiteFooter
                logo={logo}
                labels={{
                  contact: footerT("contact"),
                  cookiePreferences: footerT("cookiePreferences"),
                  legal: footerT("legal"),
                  legalData: footerT("legalData"),
                  markets: footerT("markets"),
                  rights: footerT("rights"),
                  social: footerT("social"),
                  studioNote: footerT("studioNote"),
                  tagline: footerT("tagline"),
                }}
                legalItems={legalItems}
                legalProfile={getLegalProfile(locale)}
                marketItems={marketItems}
                navGroups={footerNavGroups}
                socialLinks={getSocialLinks()}
                whatsappTargets={whatsappTargets}
              />
              <MobileStickyContact
                contactLabel={shellT("contactCta")}
                whatsapp={whatsapp}
              />
              <CookieConsentBanner
                categories={getCookieCategories(locale)}
                copy={{
                  acceptLabel: shellT("cookiesAccept"),
                  analyticsUnavailableLabel: shellT("cookiesUnavailable"),
                  bannerDescription: shellT("cookiesDescription"),
                  bannerTitle: shellT("cookiesTitle"),
                  configureLabel: shellT("cookiesConfigure"),
                  cookiesPolicyHref: `/${locale}${cookiesBasePath[locale]}`,
                  cookiesPolicyLabel: shellT("cookiesPolicyLink"),
                  rejectLabel: shellT("cookiesReject"),
                  saveLabel: shellT("cookiesSave"),
                }}
                measurementId={
                  process.env[getAnalyticsSettings().measurementIdEnv]
                }
              />
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
