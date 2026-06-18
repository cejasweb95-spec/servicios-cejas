import { notFound } from "next/navigation";

import { CourseModuleList } from "@/components/domain/course-module-list";
import {
  CoursePriceList,
  type CoursePriceListItem,
} from "@/components/domain/course-price-list";
import { DownloadButton } from "@/components/domain/download-button";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { ResponsiveDataList } from "@/components/primitives/responsive-data-list";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import type { CourseOffer } from "@/lib/content/schema";
import {
  getCourseBySlug,
  getDownloads,
  getMarketById,
} from "@/lib/content/queries";
import { formatCurrency } from "@/lib/format/currency";
import { buildCoursePath, courseBasePath } from "@/lib/routes/course-routes";
import {
  buildBreadcrumbListJsonLd,
  buildCourseJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type CourseDetailCopy = {
  backLabel: string;
  breadcrumbsLabel: string;
  certificationLabel: string;
  downloadDescription: string;
  downloadLabel: string;
  downloadTitle: string;
  durationLabel: string;
  heroEyebrow: string;
  homeLabel: string;
  includesTitle: string;
  marketsLabel: string;
  modalitiesLabel: string;
  modulesTitle: string;
  nextDateDescription: string;
  nextDateLabel: string;
  nextDateTitle: string;
  notSpecifiedLabel: string;
  priceWithKitLabel: string;
  priceWithoutKitLabel: string;
  pricingTitle: string;
  trainingLabel: string;
  whatsappMessage: (courseName: string) => string;
};

type WhatsAppCopy = {
  closeLabel: string;
  description: string;
  targets: {
    id: string;
    label: string;
    phoneE164: string;
    defaultMessage: string;
  }[];
  title: string;
};

type CourseDetailPageProps = {
  copy: CourseDetailCopy;
  courseSlug: string;
  locale: Locale;
  whatsapp: WhatsAppCopy;
};

const modalityLabels: Record<CourseOffer["modality"], Record<Locale, string>> = {
  personalizada: { es: "Personalizada", en: "Personalized" },
  presencial: { es: "Presencial", en: "In person" },
  virtual: { es: "Virtual", en: "Online" },
};

function formatCourseOffer(
  offer: CourseOffer,
  locale: Locale,
  notSpecifiedLabel: string,
): CoursePriceListItem {
  const market = getMarketById(offer.marketId, locale);

  if (!market) {
    notFound();
  }

  return {
    id: `${offer.marketId}-${offer.modality}`,
    market: market.name,
    modality: modalityLabels[offer.modality][locale],
    withKit: offer.withKit?.amount
      ? formatCurrency(offer.withKit.amount, offer.withKit.currency, locale)
      : notSpecifiedLabel,
    withoutKit: offer.withoutKit?.amount
      ? formatCurrency(offer.withoutKit.amount, offer.withoutKit.currency, locale)
      : notSpecifiedLabel,
  };
}

function buildSchemaOffers(courseName: string, courseSlug: string, locale: Locale) {
  const course = getCourseBySlug(courseSlug, locale);

  if (!course) {
    return [];
  }

  return course.offers.flatMap((offer) => {
    const market = getMarketById(offer.marketId, locale);
    const url = buildCoursePath(locale, course.slug);
    const modality = modalityLabels[offer.modality][locale];
    const withKitLabel = locale === "es" ? "con kit" : "with kit";
    const withoutKitLabel = locale === "es" ? "sin kit" : "without kit";
    const rows = [];

    if (offer.withKit?.amount) {
      rows.push({
        name: `${courseName} ${market?.name ?? ""} ${modality} ${withKitLabel}`,
        price: offer.withKit.amount,
        priceCurrency: offer.withKit.currency,
        url,
      });
    }

    if (offer.withoutKit?.amount) {
      rows.push({
        name: `${courseName} ${market?.name ?? ""} ${modality} ${withoutKitLabel}`,
        price: offer.withoutKit.amount,
        priceCurrency: offer.withoutKit.currency,
        url,
      });
    }

    return rows;
  });
}

export function CourseDetailPage({
  copy,
  courseSlug,
  locale,
  whatsapp,
}: CourseDetailPageProps) {
  const course = getCourseBySlug(courseSlug, locale);

  if (!course) {
    notFound();
  }

  const download = getDownloads(locale).find(
    (item) => item.id === course.downloadId && item.type === "course_pdf",
  );

  if (!download) {
    notFound();
  }

  const coursePath = buildCoursePath(locale, course.slug);
  const courseWhatsAppTargets = whatsapp.targets.map((target) => ({
    ...target,
    defaultMessage: copy.whatsappMessage(course.name),
  }));
  const priceItems = course.offers.map((offer) =>
    formatCourseOffer(offer, locale, copy.notSpecifiedLabel),
  );
  const markets = Array.from(
    new Set(
      course.offers
        .map((offer) => getMarketById(offer.marketId, locale)?.name)
        .filter(Boolean),
    ),
  ).join(", ");
  const modalities = Array.from(
    new Set(course.offers.map((offer) => modalityLabels[offer.modality][locale])),
  ).join(", ");
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.trainingLabel, path: `/${locale}${courseBasePath[locale]}` },
    { name: course.name, path: `/${locale}${coursePath}` },
  ]);
  const courseJsonLd = buildCourseJsonLd({
    courseMode: Array.from(
      new Set(course.offers.map((offer) => modalityLabels[offer.modality][locale])),
    ),
    description: course.summary,
    name: course.name,
    offers: buildSchemaOffers(course.name, course.slug, locale),
    timeRequired: course.duration.label,
    url: `/${locale}${coursePath}`,
  });
  const pageJsonLd = buildWebPageJsonLd({
    description: course.summary,
    locale,
    path: coursePath,
    title: course.name,
  });

  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={courseJsonLd} />
      <PageHero
        actions={
          <>
            <WhatsAppChooser
              closeLabel={whatsapp.closeLabel}
              description={whatsapp.description}
              targets={courseWhatsAppTargets}
              title={whatsapp.title}
              triggerLabel={copy.nextDateLabel}
            />
            <DownloadButton href={download.publicPath} label={copy.downloadLabel} />
          </>
        }
        aside={
          <ResponsiveDataList
            items={[
              { label: copy.durationLabel, value: course.duration.label },
              { label: copy.certificationLabel, value: course.certification },
              { label: copy.modalitiesLabel, value: modalities },
              { label: copy.marketsLabel, value: markets },
            ]}
          />
        }
        description={course.summary}
        eyebrow={copy.heroEyebrow}
        title={course.name}
      />

      <Section>
        <Container className="grid gap-10">
          <Breadcrumbs
            items={[
              { label: copy.homeLabel, href: "/" },
              { label: copy.trainingLabel, href: courseBasePath[locale] },
              { label: course.name },
            ]}
            label={copy.breadcrumbsLabel}
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr]">
            <Reveal>
              <section aria-labelledby="course-modules">
                <h2
                  className="font-display text-3xl leading-tight text-foreground"
                  id="course-modules"
                >
                  {copy.modulesTitle}
                </h2>
                <CourseModuleList className="mt-5" items={course.modules} />
              </section>
            </Reveal>

            <Reveal delay={0.04}>
              <aside
                aria-labelledby="course-next-date"
                className="rounded-lg border border-border bg-surface-muted p-5"
              >
                <h2
                  className="font-display text-2xl leading-tight text-foreground"
                  id="course-next-date"
                >
                  {copy.nextDateTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.nextDateDescription}
                </p>
                <div className="mt-5">
                  <WhatsAppChooser
                    closeLabel={whatsapp.closeLabel}
                    description={whatsapp.description}
                    targets={courseWhatsAppTargets}
                    title={whatsapp.title}
                    triggerLabel={copy.nextDateLabel}
                  />
                </div>
              </aside>
            </Reveal>
          </div>

          <section aria-labelledby="course-includes">
            <h2
              className="font-display text-3xl leading-tight text-foreground"
              id="course-includes"
            >
              {copy.includesTitle}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {course.includes.map((item) => (
                <li
                  className="rounded-md border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="course-pricing">
            <div className="flex flex-wrap items-center gap-3">
              <h2
                className="font-display text-3xl leading-tight text-foreground"
                id="course-pricing"
              >
                {copy.pricingTitle}
              </h2>
              <Badge variant="outline">{course.certification}</Badge>
            </div>
            <CoursePriceList
              className="mt-5"
              items={priceItems}
              withKitLabel={copy.priceWithKitLabel}
              withoutKitLabel={copy.priceWithoutKitLabel}
            />
          </section>

          <section
            aria-labelledby="course-download"
            className="rounded-lg border border-border bg-surface-muted p-5"
          >
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2
                  className="font-display text-3xl leading-tight text-foreground"
                  id="course-download"
                >
                  {copy.downloadTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.downloadDescription}
                </p>
              </div>
              <DownloadButton href={download.publicPath} label={copy.downloadLabel} />
            </div>
          </section>

          <div>
            <ButtonLink href={courseBasePath[locale]} variant="outline">
              {copy.backLabel}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
