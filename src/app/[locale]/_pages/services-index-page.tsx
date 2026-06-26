import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Container } from "@/components/primitives/container";
import { CountryFlag } from "@/components/primitives/country-flag";
import { PageHero } from "@/components/primitives/page-hero";
import { EditorialImagePair } from "@/components/primitives/editorial-image-pair";
import { ButtonLink } from "@/components/primitives/button-link";
import { Section } from "@/components/primitives/section";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
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
  marketCta: string;
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
      <Section tone="muted">
        <Container className="grid gap-10">
          <Breadcrumbs
            items={[
              { label: copy.homeLabel, href: "/" },
              { label: copy.title },
            ]}
            label={copy.breadcrumbsLabel}
          />

          <div className="max-w-3xl border-l-4 border-primary pl-5">
            <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
              {copy.selectorLabel}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {copy.description}
            </p>
          </div>

          <nav aria-label={copy.selectorLabel}>
            <StaggerList className="grid gap-10 sm:gap-12">
              {markets.map((market, index) => (
                <StaggerListItem key={market.id}>
                  <Reveal>
                    <article
                      className={
                        index % 2 === 1
                          ? "grid items-center gap-8 border-t border-primary/25 pt-10 lg:grid-cols-[1fr_1.08fr] lg:gap-12"
                          : "grid items-center gap-8 border-t border-primary/25 pt-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12"
                      }
                    >
                      {market.image?.publicPath ? (
                        <div
                          className={
                            index % 2 === 1
                              ? "relative aspect-[16/11] overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-soft lg:order-last lg:aspect-[3/2]"
                              : "relative aspect-[16/11] overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-soft lg:aspect-[3/2]"
                          }
                        >
                          <Image
                            alt={market.image.alt}
                            className="object-cover object-center transition-transform duration-700 motion-reduce:transition-none hover:scale-[1.03]"
                            fill
                            sizes="(min-width: 1024px) 46vw, 92vw"
                            src={market.image.publicPath}
                          />
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-transparent"
                          />
                        </div>
                      ) : null}
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <CountryFlag
                            className="h-5 w-7"
                            market={market.id}
                          />
                          <h3 className="font-display text-3xl leading-tight text-foreground">
                            {market.name}
                          </h3>
                          <Badge variant="outline">{market.currency}</Badge>
                        </div>
                        <p className="mt-4 max-w-prose text-base leading-7 text-foreground/75">
                          {market.description}
                        </p>
                        <div className="mt-7">
                          <ButtonLink
                            href={`${servicesPath}/${market.slug}`}
                          >
                            {copy.marketCta}
                            <ArrowUpRight
                              aria-hidden="true"
                              data-icon="inline-end"
                            />
                          </ButtonLink>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </StaggerListItem>
              ))}
            </StaggerList>
          </nav>
        </Container>
      </Section>
    </main>
  );
}
