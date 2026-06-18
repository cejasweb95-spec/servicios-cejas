import { CookiePreferencesLink } from "@/components/layout/cookie-preferences-link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import {
  getCookieCategories,
  getLegalProfile,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type LegalSection = {
  title: string;
  items: string[];
};

type LegalContentCopy = {
  breadcrumbsLabel: string;
  cookiePreferencesLabel: string;
  description: string;
  detailsTitle: string;
  homeLabel: string;
  labels: {
    addressLabel: string;
    brandLabel: string;
    cookieCategoriesTitle: string;
    emailLabel: string;
    ownerLabel: string;
    taxIdLabel: string;
  };
  reviewNote: string;
  sections: LegalSection[];
  title: string;
};

type LegalContentPageProps = {
  copy: LegalContentCopy;
  locale: Locale;
  path: string;
};

export function LegalContentPage({
  copy,
  locale,
  path,
}: LegalContentPageProps) {
  const legalProfile = getLegalProfile(locale);
  const whatsappTargets = getWhatsAppTargets(locale);
  const cookieCategories = getCookieCategories(locale);
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.title, path: `/${locale}${path}` },
  ]);
  const pageJsonLd = buildWebPageJsonLd({
    description: copy.description,
    locale,
    path,
    title: copy.title,
  });

  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero description={copy.description} title={copy.title} />
      <Section>
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <aside className="grid gap-4">
              <section className="rounded-xl border border-border bg-surface p-5">
                <Badge variant="outline">{copy.detailsTitle}</Badge>
                <dl className="mt-4 grid gap-3 text-sm leading-6">
                  <div>
                    <dt className="font-semibold text-foreground">
                      {copy.labels.brandLabel}
                    </dt>
                    <dd className="text-muted-foreground">
                      {legalProfile.brandName}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      {copy.labels.ownerLabel}
                    </dt>
                    <dd className="text-muted-foreground">
                      {legalProfile.ownerName}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      {copy.labels.taxIdLabel}
                    </dt>
                    <dd className="text-muted-foreground">
                      {legalProfile.taxId}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      {copy.labels.emailLabel}
                    </dt>
                    <dd className="text-muted-foreground">
                      {legalProfile.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      {copy.labels.addressLabel}
                    </dt>
                    <dd className="text-muted-foreground">
                      {legalProfile.address}
                    </dd>
                  </div>
                </dl>
                <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
                  {whatsappTargets.map((target) => (
                    <li key={target.id}>
                      {target.label}: +{target.phoneE164}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-xl border border-border bg-background p-5">
                <p className="text-sm leading-6 text-muted-foreground">
                  {copy.reviewNote}
                </p>
                <div className="mt-4">
                  <CookiePreferencesLink label={copy.cookiePreferencesLabel} />
                </div>
              </section>
            </aside>

            <div className="grid gap-5">
              {copy.sections.map((section, index) => (
                <section
                  aria-labelledby={`legal-section-${index}`}
                  className="rounded-xl border border-border bg-background p-5"
                  key={section.title}
                >
                  <h2
                    className="font-display text-3xl leading-tight text-foreground"
                    id={`legal-section-${index}`}
                  >
                    {section.title}
                  </h2>
                  <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
              <section
                aria-labelledby="cookie-categories"
                className="rounded-xl border border-border bg-surface-muted p-5"
              >
                <h2
                  className="font-display text-3xl leading-tight text-foreground"
                  id="cookie-categories"
                >
                  {copy.labels.cookieCategoriesTitle}
                </h2>
                <div className="mt-4 grid gap-3">
                  {cookieCategories.map((category) => (
                    <div
                      className="rounded-lg border border-border bg-background p-4"
                      key={category.id}
                    >
                      <p className="font-semibold text-foreground">
                        {category.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
