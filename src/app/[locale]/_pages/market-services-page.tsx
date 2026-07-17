import { notFound } from "next/navigation";

import { MarketDownloadBanner } from "@/components/domain/market-download-banner";
import {
  type ServiceListGroup,
  type ServiceListItem,
  ServiceList,
} from "@/components/domain/service-list";
import { Container } from "@/components/primitives/container";
import { ButtonLink } from "@/components/primitives/button-link";
import { EmptyState } from "@/components/primitives/empty-state";
import { MarketSelector } from "@/components/domain/market-selector";
import { CountryFlag } from "@/components/primitives/country-flag";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { PageHero } from "@/components/primitives/page-hero";
import { EditorialImagePair } from "@/components/primitives/editorial-image-pair";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import type { MarketId, ServiceOffer } from "@/lib/content/schema";
import {
  getDownloadsByMarket,
  getMarketBySlug,
  getMarketMediaAsset,
  getMarketSecondaryMediaAsset,
  getMarkets,
  getMediaAssetById,
  getServiceCategories,
  getServicesByMarket,
  getWhatsAppTarget,
} from "@/lib/content/queries";
import { formatCurrency } from "@/lib/format/currency";
import { formatDuration } from "@/lib/format/duration";
import { buildServicePath } from "@/lib/routes/service-routes";
import { puertoSaguntoStudioBasePath } from "@/lib/routes/studio-routes";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";

type MarketServicesCopy = {
  allMarketsLabel: string;
  breadcrumbsLabel: string;
  catalogBannerTitle: string;
  catalogBannerDescription: string;
  catalogDownloadLabel: string;
  contactLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  heroEyebrow: string;
  heroTitle: (marketName: string) => string;
  homeLabel: string;
  servicesLabel: string;
  selectorLabel: string;
  serviceDetailLabel: string;
  studioBannerCta?: string;
  studioBannerDescription?: string;
  studioBannerTitle?: string;
};

type MarketServicesPageProps = {
  copy: MarketServicesCopy;
  locale: Locale;
  marketSlug: string;
};

const marketBasePath: Record<Locale, string> = {
  es: "/servicios",
  en: "/services",
};

function formatOffer(offer: ServiceOffer, locale: Locale) {
  const price = offer.price.amount
    ? formatCurrency(offer.price.amount, offer.price.currency, locale)
    : offer.price.label?.[locale];

  return {
    price,
    duration: formatDuration(offer.appointmentDuration, locale),
  };
}

function buildGroups(
  marketId: MarketId,
  marketSlug: string,
  locale: Locale,
  serviceDetailLabel: string,
): ServiceListGroup[] {
  const services = getServicesByMarket(marketId, locale);
  const categories = getServiceCategories(locale);

  return categories
    .map((category) => {
      const categoryServices: ServiceListItem[] = services
        .filter((service) => service.categoryId === category.id)
        .map((service) => {
          const offer = service.offers[0];
          const formatted = offer ? formatOffer(offer, locale) : {};

          return {
            id: service.id,
            title: service.name,
            description: service.longDescription ?? service.shortDescription,
            actionHref: buildServicePath(locale, marketSlug, service.slug),
            actionLabel: serviceDetailLabel,
            featured: service.featured,
            resultDuration: service.resultDuration,
            ...formatted,
          };
        });

      return {
        id: category.id,
        title: category.name,
        description: category.description,
        services: categoryServices,
      };
    })
    .filter((group) => group.services.length > 0);
}

export function MarketServicesPage({
  copy,
  locale,
  marketSlug,
}: MarketServicesPageProps) {
  const market = getMarketBySlug(marketSlug, locale);

  if (!market) {
    notFound();
  }

  const markets = getMarkets(locale);
  const primaryImage =
    getMarketMediaAsset(market.id, locale) ??
    getMediaAssetById("result-cejas-01", locale);
  const secondaryImage = getMarketSecondaryMediaAsset(market.id, locale);
  const groups = buildGroups(
    market.id,
    market.slug,
    locale,
    copy.serviceDetailLabel,
  );
  const servicesPath = marketBasePath[locale];
  const catalog = getDownloadsByMarket(market.id, locale).find(
    (download) => download.type === "catalog",
  );
  const whatsappTarget = getWhatsAppTarget(market.whatsappTargetId, locale);

  if (!whatsappTarget) {
    notFound();
  }

  const whatsappHref = buildWhatsAppHref(
    whatsappTarget.phoneE164,
    whatsappTarget.defaultMessage,
  );
  const title = copy.heroTitle(market.name);
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.servicesLabel, path: `/${locale}${servicesPath}` },
    { name: title, path: `/${locale}${servicesPath}/${market.slug}` },
  ]);
  const pageJsonLd = buildWebPageJsonLd({
    description: market.description,
    locale,
    path: `${servicesPath}/${market.slug}`,
    title,
  });

  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        aside={
          primaryImage?.publicPath && secondaryImage?.publicPath ? (
            <EditorialImagePair
              primary={primaryImage}
              priority
              secondary={secondaryImage}
            />
          ) : undefined
        }
        description={market.description}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <CountryFlag className="h-3.5 w-5" market={market.id} />
            {copy.heroEyebrow}
          </span>
        }
        roseAccent={
          primaryImage?.publicPath && secondaryImage?.publicPath
            ? "none"
            : "corner"
        }
        title={title}
      />
      <Section tone="muted">
        <Container className="grid gap-10">
          <Breadcrumbs
            items={[
              { label: copy.homeLabel, href: "/" },
              { label: copy.servicesLabel, href: servicesPath },
              { label: title },
            ]}
            label={copy.breadcrumbsLabel}
          />
          <MarketSelector
            activeId={market.id}
            items={markets.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              currency: item.currency,
              href: `${servicesPath}/${item.slug}`,
            }))}
            label={copy.selectorLabel}
          />

          <Reveal>
            <MarketDownloadBanner
              description={copy.catalogBannerDescription}
              downloadHref={catalog?.publicPath}
              downloadLabel={catalog ? copy.catalogDownloadLabel : undefined}
              title={copy.catalogBannerTitle}
              whatsappHref={whatsappHref}
              whatsappLabel={copy.contactLabel}
            />
          </Reveal>

          {market.id === "espana-europa" && copy.studioBannerTitle ? (
            <Reveal>
              <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                <h2 className="font-display text-3xl leading-tight text-foreground">
                  {copy.studioBannerTitle}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                  {copy.studioBannerDescription}
                </p>
                <ButtonLink
                  className="mt-6"
                  href={puertoSaguntoStudioBasePath[locale]}
                >
                  {copy.studioBannerCta}
                </ButtonLink>
              </section>
            </Reveal>
          ) : null}

          {groups.length > 0 ? (
            <ServiceList groups={groups} />
          ) : (
            <EmptyState
              description={copy.emptyDescription}
              title={copy.emptyTitle}
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
