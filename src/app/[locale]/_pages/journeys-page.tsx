import Image from "next/image";

import { EventMap, type EventMapLocation } from "@/components/domain/event-map";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { CountryFlag } from "@/components/primitives/country-flag";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import {
  getEvents,
  getLegalProfile,
  getLocations,
  getMarketById,
  getMarkets,
  getMediaAssetById,
  getMediaAssets,
  getWhatsAppTarget,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import {
  buildBreadcrumbListJsonLd,
  buildJourneysJsonLd,
} from "@/lib/seo/structured-data";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";

type JourneysCopy = {
  addressLabel: string;
  availabilityDescription: string;
  availabilityTitle: string;
  breadcrumbsLabel: string;
  contactLabel: string;
  description: string;
  eyebrow: string;
  homeLabel: string;
  journeyLabel: string;
  listTitle: string;
  mapAriaLabel: string;
  mapTitle: string;
  noFixedStudioDescription: string;
  noFixedStudioTitle: string;
  physicalStudioDescription: string;
  physicalStudioLabel: string;
  primaryCta: string;
  selectLocationLabel: string;
  selectedLocationLabel: string;
  title: string;
  whatsappMessage: string;
};

type WhatsAppCopy = {
  closeLabel: string;
  description: string;
  title: string;
};

type JourneysPageProps = {
  copy: JourneysCopy;
  locale: Locale;
  whatsapp: WhatsAppCopy;
};

function interpolate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}

function locationLabel(location: {
  city: string;
  country: string;
  region?: string;
}) {
  return [location.city, location.region, location.country]
    .filter(Boolean)
    .join(", ");
}

export function JourneysPage({ copy, locale, whatsapp }: JourneysPageProps) {
  const locations = getLocations(locale);
  const markets = getMarkets(locale);
  const globeImage = getMediaAssetById("jornadas-globo", locale);
  const eventsByLocation = new Map(
    getEvents(locale).map((event) => [event.locationId, event]),
  );
  const legalProfile = getLegalProfile(locale);
  const logo =
    getMediaAssets().find((asset) => asset.id === "logo-primary") ??
    getMediaAssets().find((asset) => asset.type === "logo");
  const path = journeyBasePath[locale];
  const pageJsonLd = buildJourneysJsonLd({
    description: copy.description,
    legalProfile,
    locale,
    logoPath: logo?.publicPath ?? "/assets/logo/cejas-internacionales-logo.png",
    path,
    title: copy.title,
  });
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.title, path: `/${locale}${path}` },
  ]);

  const eventMapLocations = locations.map((location): EventMapLocation => {
    const market = getMarketById(location.marketId, locale);
    const target = market
      ? getWhatsAppTarget(market.whatsappTargetId, locale)
      : null;
    const label = locationLabel(location);
    const message = interpolate(copy.whatsappMessage, {
      location: label,
    });

    return {
      address: location.address,
      city: location.city,
      country: location.country,
      href: target
        ? buildWhatsAppHref(target.phoneE164, message)
        : "https://wa.me/573167742299",
      id: location.id,
      marketId: location.marketId,
      notes: location.notes,
      region: location.region,
      statusLabel:
        eventsByLocation.get(location.id)?.label ??
        (location.type === "physical_studio"
          ? copy.physicalStudioLabel
          : copy.journeyLabel),
      type: location.type,
      whatsappLabel: target?.label ?? copy.contactLabel,
    };
  });

  return (
    <main>
      {pageJsonLd.map((data, index) => (
        <JsonLd data={data} key={index} />
      ))}
      <JsonLd data={breadcrumbJsonLd} />

      <PageHero
        actions={
          <>
            <Button asChild>
              <a href="#mapa-jornadas">{copy.primaryCta}</a>
            </Button>
            <WhatsAppChooser
              closeLabel={whatsapp.closeLabel}
              description={whatsapp.description}
              targets={getWhatsAppTargets(locale)}
              title={whatsapp.title}
              triggerLabel={copy.contactLabel}
            />
          </>
        }
        aside={
          globeImage?.publicPath ? (
            <div className="relative mx-auto w-full max-w-[26rem] overflow-hidden rounded-xl border border-primary/15 bg-surface shadow-soft lg:mx-0">
              <div className="relative aspect-[4/5]">
                <Image
                  alt={globeImage.alt}
                  className="object-cover object-center"
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  src={globeImage.publicPath}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <ul className="flex flex-wrap gap-2">
                    {markets.map((market) => (
                      <li
                        className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-sm font-semibold text-foreground shadow-soft"
                        key={market.id}
                      >
                        <CountryFlag className="h-3.5 w-5" market={market.id} />
                        {market.shortName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-background p-5 shadow-soft">
              <Badge variant="outline">{copy.physicalStudioLabel}</Badge>
              <p className="mt-4 font-display text-3xl leading-tight text-foreground">
                Cali, Valle del Cauca
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {copy.physicalStudioDescription}
              </p>
            </div>
          )
        }
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />

      <Section id="mapa-jornadas" tone="muted">
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />
          <EventMap
            copy={{
              addressLabel: copy.addressLabel,
              contactLabel: copy.contactLabel,
              journeyLabel: copy.journeyLabel,
              listTitle: copy.listTitle,
              mapAriaLabel: copy.mapAriaLabel,
              mapTitle: copy.mapTitle,
              physicalStudioLabel: copy.physicalStudioLabel,
              selectLocationLabel: copy.selectLocationLabel,
              selectedLocationLabel: copy.selectedLocationLabel,
            }}
            locations={eventMapLocations}
          />
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge variant="outline">{copy.journeyLabel}</Badge>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground">
                {copy.availabilityTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {copy.availabilityDescription}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <section className="rounded-xl border border-primary/15 bg-background p-5">
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {copy.noFixedStudioTitle}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.noFixedStudioDescription}
                </p>
              </section>
              <section className="rounded-xl border border-primary/15 bg-background p-5">
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {copy.contactLabel}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.description}
                </p>
                <div className="mt-5">
                  <WhatsAppChooser
                    closeLabel={whatsapp.closeLabel}
                    description={whatsapp.description}
                    targets={getWhatsAppTargets(locale)}
                    title={whatsapp.title}
                    triggerLabel={copy.contactLabel}
                  />
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
