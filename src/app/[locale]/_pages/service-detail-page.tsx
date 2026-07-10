import { notFound } from "next/navigation";
import Image from "next/image";

import { ServiceCard } from "@/components/domain/service-card";
import { WhatsAppCTA } from "@/components/domain/whatsapp-cta";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { ResponsiveDataList } from "@/components/primitives/responsive-data-list";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import type { MarketId, ServiceOffer } from "@/lib/content/schema";
import {
  getMarketBySlug,
  getServiceBySlug,
  getServiceCategories,
  getServiceCategoryById,
  getServiceMediaAsset,
  getServicesByMarket,
  getWhatsAppTarget,
} from "@/lib/content/queries";
import { formatCurrency } from "@/lib/format/currency";
import { formatDuration } from "@/lib/format/duration";
import {
  buildMarketPath,
  buildServicePath,
  serviceBasePath,
} from "@/lib/routes/service-routes";
import { aftercareBasePath } from "@/lib/routes/static-routes";
import {
  buildBreadcrumbListJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";

type ServiceDetailCopy = {
  appointmentDurationLabel: string;
  assessmentDescription: string;
  assessmentLabel: string;
  assessmentTitle: string;
  afterCareLabel: string;
  backToMarketLabel: string;
  beforeCareLabel: string;
  breadcrumbsLabel: string;
  careDescription: string;
  careTitle: string;
  categoryLabel: string;
  contactLabel: string;
  descriptionTitle: string;
  detailsTitle: string;
  heroEyebrow: string;
  heroTitle: (serviceName: string, marketName: string) => string;
  homeLabel: string;
  marketLabel: string;
  priceLabel: string;
  relatedActionLabel: string;
  relatedDescription: string;
  relatedTitle: string;
  resultDurationLabel: string;
  servicesLabel: string;
  sourceNoteLabel: string;
  whatsappMessage: (serviceName: string, marketName: string) => string;
};

type ServiceDetailPageProps = {
  copy: ServiceDetailCopy;
  locale: Locale;
  marketSlug: string;
  serviceSlug: string;
};

function formatOffer(offer: ServiceOffer, locale: Locale) {
  return {
    price: offer.price.amount
      ? formatCurrency(offer.price.amount, offer.price.currency, locale)
      : offer.price.label?.[locale],
    duration: formatDuration(offer.appointmentDuration, locale),
  };
}

function getOfferForMarket(serviceOffers: ServiceOffer[], marketId: MarketId) {
  return serviceOffers.find((offer) => offer.marketId === marketId) ?? null;
}

export function ServiceDetailPage({
  copy,
  locale,
  marketSlug,
  serviceSlug,
}: ServiceDetailPageProps) {
  const market = getMarketBySlug(marketSlug, locale);

  if (!market) {
    notFound();
  }

  const service = getServiceBySlug(serviceSlug, locale);

  if (!service) {
    notFound();
  }

  const offer = getOfferForMarket(service.offers, market.id);

  if (!offer) {
    notFound();
  }

  const category =
    getServiceCategoryById(service.categoryId, locale) ??
    getServiceCategories(locale)[0];
  const whatsappTarget = getWhatsAppTarget(market.whatsappTargetId, locale);
  const serviceImage = getServiceMediaAsset(service.id, service.categoryId, locale);

  if (!whatsappTarget) {
    notFound();
  }

  const marketPath = buildMarketPath(locale, market.slug);
  const servicePath = buildServicePath(locale, market.slug, service.slug);
  const title = copy.heroTitle(service.name, market.name);
  const formattedOffer = formatOffer(offer, locale);
  const whatsappHref = buildWhatsAppHref(
    whatsappTarget.phoneE164,
    copy.whatsappMessage(service.name, market.name),
  );
  const relatedServices = getServicesByMarket(market.id, locale)
    .filter(
      (item) => item.id !== service.id && item.categoryId === service.categoryId,
    )
    .slice(0, 3);
  const careAnchors =
    service.careGuide === "micropigmentation-brows"
      ? { before: "before-brows", after: "after-brows" }
      : service.careGuide === "micropigmentation-lips"
        ? { before: "before-lips", after: "after-lips" }
        : null;
  const dataItems = [
    { label: copy.priceLabel, value: formattedOffer.price },
    { label: copy.appointmentDurationLabel, value: formattedOffer.duration },
    ...(service.resultDuration
      ? [{ label: copy.resultDurationLabel, value: service.resultDuration }]
      : []),
    { label: copy.marketLabel, value: market.name },
    { label: copy.categoryLabel, value: category.name },
  ].filter((item) => item.value);
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.servicesLabel, path: `/${locale}${serviceBasePath[locale]}` },
    { name: market.name, path: `/${locale}${marketPath}` },
    { name: service.name, path: `/${locale}${servicePath}` },
  ]);
  const serviceJsonLd = buildServiceJsonLd({
    name: service.name,
    description: service.longDescription ?? service.shortDescription,
    image: serviceImage?.publicPath,
    areaServed: market.name,
    price: offer.price.amount,
    priceCurrency: offer.price.currency,
    url: `/${locale}${servicePath}`,
  });
  const pageJsonLd = buildWebPageJsonLd({
    description: service.shortDescription,
    locale,
    path: servicePath,
    title,
  });

  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <PageHero
        actions={
          <>
            <WhatsAppCTA href={whatsappHref} label={copy.contactLabel} />
            <ButtonLink href={marketPath} variant="outline">
              {copy.backToMarketLabel}
            </ButtonLink>
          </>
        }
        aside={
          <div className="grid gap-4">
            {serviceImage?.publicPath && serviceImage.width && serviceImage.height ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/15 bg-surface">
                <Image
                  alt={serviceImage.alt}
                  className="h-full w-full object-cover"
                  height={serviceImage.height}
                  priority
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  src={serviceImage.publicPath}
                  width={serviceImage.width}
                />
              </div>
            ) : null}
            <ResponsiveDataList className="hidden lg:grid" items={dataItems} />
          </div>
        }
        description={service.shortDescription}
        eyebrow={`${copy.heroEyebrow} · ${category.name}`}
        mobileAsideFirst={false}
        title={title}
      />

      <Section tone="muted">
        <Container className="grid gap-12">
          <Breadcrumbs
            items={[
              { label: copy.homeLabel, href: "/" },
              { label: copy.servicesLabel, href: serviceBasePath[locale] },
              { label: market.name, href: marketPath },
              { label: service.name },
            ]}
            label={copy.breadcrumbsLabel}
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <Reveal>
              <section aria-labelledby="service-description">
                <h2
                  className="font-display text-3xl leading-tight text-foreground"
                  id="service-description"
                >
                  {copy.descriptionTitle}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {service.longDescription ?? service.shortDescription}
                </p>
                {service.sourceNote ? (
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {copy.sourceNoteLabel}:{" "}
                    </span>
                    {service.sourceNote}
                  </p>
                ) : null}
              </section>
            </Reveal>

            <Reveal delay={0.04}>
              <aside
                aria-labelledby="service-quick-details"
                className="rounded-2xl bg-primary-soft p-6"
              >
                <h2
                  className="font-display text-2xl text-foreground"
                  id="service-quick-details"
                >
                  {copy.detailsTitle}
                </h2>
                <ResponsiveDataList className="mt-5 sm:grid-cols-1" items={dataItems} />
                <div className="mt-5">
                  <WhatsAppCTA href={whatsappHref} label={copy.contactLabel} />
                </div>
              </aside>
            </Reveal>
          </div>

          {careAnchors ? (
            <Reveal>
              <section
                aria-labelledby="service-care-guide"
                className="grid gap-5 border-y border-primary/25 py-7 md:grid-cols-[1fr_auto] md:items-center"
              >
                <div className="max-w-3xl">
                  <h2
                    className="font-display text-3xl leading-tight text-foreground"
                    id="service-care-guide"
                  >
                    {copy.careTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {copy.careDescription}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink
                    href={`${aftercareBasePath[locale]}#${careAnchors.before}`}
                    variant="outline"
                  >
                    {copy.beforeCareLabel}
                  </ButtonLink>
                  <ButtonLink
                    href={`${aftercareBasePath[locale]}#${careAnchors.after}`}
                    variant="outline"
                  >
                    {copy.afterCareLabel}
                  </ButtonLink>
                </div>
              </section>
            </Reveal>
          ) : null}

          <section aria-labelledby="free-assessment">
            <div className="grid gap-5 border-y border-primary/25 py-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2
                  className="font-display text-3xl leading-tight text-foreground"
                  id="free-assessment"
                >
                  {copy.assessmentTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.assessmentDescription}
                </p>
              </div>
              <WhatsAppCTA
                href={whatsappHref}
                label={copy.assessmentLabel}
                variant="outline"
              />
            </div>
          </section>

          {relatedServices.length > 0 ? (
            <section aria-labelledby="related-services">
              <div className="max-w-3xl">
                <h2
                  className="font-display text-3xl leading-tight text-foreground"
                  id="related-services"
                >
                  {copy.relatedTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.relatedDescription}
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((item) => {
                  const relatedOffer = item.offers[0];
                  const formatted = relatedOffer
                    ? formatOffer(relatedOffer, locale)
                    : { duration: undefined, price: undefined };

                  return (
                    <ServiceCard
                      actionHref={buildServicePath(locale, market.slug, item.slug)}
                      actionLabel={copy.relatedActionLabel}
                      description={item.shortDescription}
                      duration={formatted.duration}
                      key={item.id}
                      price={formatted.price}
                      resultDuration={item.resultDuration}
                      title={item.name}
                      variant="compact"
                    />
                  );
                })}
              </div>
            </section>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}
