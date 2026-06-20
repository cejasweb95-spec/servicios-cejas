import Image from "next/image";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { CountryFlag } from "@/components/primitives/country-flag";
import { PageHero } from "@/components/primitives/page-hero";
import { EditorialImagePair } from "@/components/primitives/editorial-image-pair";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Section } from "@/components/primitives/section";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getMarketMediaAsset,
  getMarkets,
  getMediaAssetById,
} from "@/lib/content/queries";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type ServicesIndexCopy = {
  breadcrumbsLabel: string;
  eyebrow: string;
  homeLabel: string;
  title: string;
  description: string;
  selectorLabel: string;
};

type ServicesIndexPageProps = {
  copy: ServicesIndexCopy;
  locale: Locale;
};

const marketBasePath: Record<Locale, string> = {
  es: "/servicios",
  en: "/services",
};

export function ServicesIndexPage({ copy, locale }: ServicesIndexPageProps) {
  const markets = getMarkets(locale).map((market) => ({
    ...market,
    image: getMarketMediaAsset(market.id, locale),
  }));
  const primaryImage = getMediaAssetById("xiomara-uniforme-dermografo", locale);
  const secondaryImage = getMediaAssetById("resultados-cejas-labios-pared", locale);
  const servicesPath = marketBasePath[locale];
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.title, path: `/${locale}${servicesPath}` },
  ]);
  const pageJsonLd = buildWebPageJsonLd({
    description: copy.description,
    locale,
    path: servicesPath,
    title: copy.title,
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
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Section>
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[
              { label: copy.homeLabel, href: "/" },
              { label: copy.title },
            ]}
            label={copy.breadcrumbsLabel}
          />
          <Reveal>
            <nav aria-label={copy.selectorLabel}>
              <StaggerList className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => (
                  <StaggerListItem key={market.id}>
                    <Link
                      className="group relative block aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-3 focus-visible:ring-ring/40 motion-reduce:transform-none"
                      href={`${servicesPath}/${market.slug}`}
                    >
                      {market.image?.publicPath ? (
                        <Image
                          alt={market.image.alt}
                          className="object-cover object-center transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.04]"
                          fill
                          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                          src={market.image.publicPath}
                        />
                      ) : null}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/35 to-transparent"
                      />
                      <span className="absolute inset-x-0 bottom-0 grid gap-2 p-5 text-background">
                        <span className="flex items-center gap-2">
                          <CountryFlag className="h-4 w-6" market={market.id} />
                          <span className="font-display text-2xl leading-tight">
                            {market.name}
                          </span>
                          <Badge
                            className="ml-auto border-background/40 text-background"
                            variant="outline"
                          >
                            {market.currency}
                          </Badge>
                        </span>
                        <span className="text-sm leading-6 text-background/85">
                          {market.description}
                        </span>
                      </span>
                    </Link>
                  </StaggerListItem>
                ))}
              </StaggerList>
            </nav>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
