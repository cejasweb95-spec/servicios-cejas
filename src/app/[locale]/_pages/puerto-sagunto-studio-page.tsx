import { ExternalLink, MapPin, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { MapEmbed } from "@/components/domain/map-embed";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import {
  getGoogleReviewProfileByLocationId,
  getLegalProfile,
  getLocationById,
  getMarketById,
  getMediaAssetById,
} from "@/lib/content/queries";
import { formatPhoneNumber } from "@/lib/format/phone";
import { buildMarketPath } from "@/lib/routes/service-routes";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import {
  buildBreadcrumbListJsonLd,
  buildPhysicalStudioPageJsonLd,
} from "@/lib/seo/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";
import { siteConfig } from "@/config/site";

const PUERTO_SAGUNTO_LOCATION_ID = "puerto-sagunto";
const PUERTO_SAGUNTO_MAP_EMBED_SRC =
  "https://www.google.com/maps?q=place_id:ChIJ97PZB9gXYA0R3HuqKedSjM0&output=embed";

type PuertoSaguntoStudioPageCopy = {
  addressLabel: string;
  breadcrumbsLabel: string;
  businessNameLabel: string;
  description: string;
  directionsLabel: string;
  eyebrow: string;
  homeLabel: string;
  introParagraphs: string[];
  journeysLinkLabel: string;
  mapHint: string;
  mapLoadLabel: string;
  mapTitle: string;
  napNote: string;
  phoneLabel: string;
  reviewCta: string;
  reviewTitle: string;
  servicesCta: string;
  servicesDescription: string;
  servicesTitle: string;
  title: string;
  whatsappCta: string;
  whatsappMessage: string;
};

type PuertoSaguntoStudioPageProps = {
  copy: PuertoSaguntoStudioPageCopy;
  locale: Locale;
  path: string;
};

export function PuertoSaguntoStudioPage({
  copy,
  locale,
  path,
}: PuertoSaguntoStudioPageProps) {
  const studio = getLocationById(PUERTO_SAGUNTO_LOCATION_ID, locale);
  const legalProfile = getLegalProfile(locale);
  const reviewProfile = getGoogleReviewProfileByLocationId(
    PUERTO_SAGUNTO_LOCATION_ID,
    locale,
  );
  const portada = getMediaAssetById("estudio-puerto-sagunto-portada", locale);
  const interior = getMediaAssetById("estudio-puerto-sagunto-interior", locale);
  const spainMarket = getMarketById("espana-europa", locale);

  if (!studio || studio.type !== "physical_studio" || !studio.address || !spainMarket) {
    notFound();
  }

  const phoneE164 = siteConfig.whatsapp.europe;
  const whatsappHref = buildWhatsAppHref(phoneE164, copy.whatsappMessage);
  const servicesHref = buildMarketPath(locale, spainMarket.slug);
  const journeysHref = journeyBasePath[locale];
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.title, path: `/${locale}${path}` },
  ]);
  const pageJsonLd = buildPhysicalStudioPageJsonLd({
    description: copy.description,
    legalProfile,
    locale,
    logoPath: "/images/brand/logo-oficial-sin-fondo.png",
    path,
    studio: {
      address: studio.address,
      coordinates: studio.coordinates,
      marketId: studio.marketId,
    },
    title: copy.title,
  });

  return (
    <main>
      {pageJsonLd.map((data, index) => (
        <JsonLd data={data} key={index} />
      ))}
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        aside={
          portada?.publicPath ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/20 bg-surface shadow-soft">
              <Image
                alt={portada.alt}
                className="h-full w-full object-cover object-center"
                height={portada.height ?? 2048}
                priority
                sizes="(min-width: 1024px) 38vw, 92vw"
                src={portada.publicPath}
                width={portada.width ?? 1536}
              />
            </div>
          ) : undefined
        }
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Section tone="muted">
        <Container className="grid gap-10">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal direction="left">
              <div className="grid gap-6">
                {copy.introParagraphs.map((paragraph) => (
                  <p
                    className="max-w-2xl text-base leading-8 text-muted-foreground"
                    key={paragraph.slice(0, 24)}
                  >
                    {paragraph}
                  </p>
                ))}

                <section
                  aria-labelledby="puerto-sagunto-nap"
                  className="rounded-2xl border border-primary/20 bg-surface/90 p-6 shadow-soft"
                >
                  <h2
                    className="font-display text-3xl leading-tight text-foreground"
                    id="puerto-sagunto-nap"
                  >
                    {copy.businessNameLabel}
                  </h2>
                  <p className="mt-2 font-display text-2xl text-primary-text">
                    {legalProfile.brandName}
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-primary-text"
                      />
                      <div>
                        <p className="font-semibold text-foreground">
                          {copy.addressLabel}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {studio.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageCircle
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-primary-text"
                      />
                      <div>
                        <p className="font-semibold text-foreground">
                          {copy.phoneLabel}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {formatPhoneNumber(phoneE164)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {copy.napNote}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild className="min-h-11">
                      <a href={whatsappHref} rel="noreferrer" target="_blank">
                        {copy.whatsappCta}
                      </a>
                    </Button>
                    <Button asChild className="min-h-11" variant="outline">
                      <a href={journeysHref}>{copy.journeysLinkLabel}</a>
                    </Button>
                  </div>
                </section>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="grid gap-8">
                {interior?.publicPath ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-muted">
                    <Image
                      alt={interior.alt}
                      className="h-full w-full object-cover object-center"
                      height={interior.height ?? 2048}
                      sizes="(min-width: 1024px) 42vw, 92vw"
                      src={interior.publicPath}
                      width={interior.width ?? 1536}
                    />
                  </div>
                ) : null}

                {reviewProfile ? (
                  <section
                    aria-labelledby="puerto-sagunto-reviews"
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <h2
                      className="font-display text-2xl leading-tight text-foreground"
                      id="puerto-sagunto-reviews"
                    >
                      {copy.reviewTitle}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {copy.reviewCta}
                    </p>
                    <Button asChild className="mt-5 min-h-11" variant="outline">
                      <a
                        href={reviewProfile.writeReviewUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Star aria-hidden="true" className="size-4" />
                        Google
                        <ExternalLink aria-hidden="true" className="size-3.5" />
                      </a>
                    </Button>
                  </section>
                ) : null}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <section
              aria-labelledby="puerto-sagunto-services"
              className="rounded-2xl border border-primary/15 bg-primary/5 p-6 sm:p-8"
            >
              <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                {spainMarket.shortName}
              </Eyebrow>
              <h2
                className="font-display text-3xl leading-tight text-foreground"
                id="puerto-sagunto-services"
              >
                {copy.servicesTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                {copy.servicesDescription}
              </p>
              <Button asChild className="mt-6 min-h-11">
                <a href={servicesHref}>{copy.servicesCta}</a>
              </Button>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="puerto-sagunto-map" className="grid gap-4">
              <h2
                className="font-display text-3xl leading-tight text-foreground"
                id="puerto-sagunto-map"
              >
                {copy.mapTitle}
              </h2>
              <MapEmbed
                directionsHref={reviewProfile?.listingUrl ?? PUERTO_SAGUNTO_MAP_EMBED_SRC}
                directionsLabel={copy.directionsLabel}
                hint={copy.mapHint}
                loadLabel={copy.mapLoadLabel}
                src={PUERTO_SAGUNTO_MAP_EMBED_SRC}
                title={copy.mapTitle}
              />
            </section>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
