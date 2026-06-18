import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { MarketSelector } from "@/components/domain/market-selector";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import { getMarkets } from "@/lib/content/queries";
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
  const markets = getMarkets(locale);
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
          <MarketSelector
            items={markets.map((market) => ({
              id: market.id,
              name: market.name,
              description: market.description,
              currency: market.currency,
              href: `${servicesPath}/${market.slug}`,
            }))}
            label={copy.selectorLabel}
          />
        </Container>
      </Section>
    </main>
  );
}
