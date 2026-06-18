import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CourseCard } from "@/components/domain/course-card";
import { MarketSelector } from "@/components/domain/market-selector";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { ButtonLink } from "@/components/primitives/button-link";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/i18n/routing";
import {
  getCourses,
  getDownloads,
  getLegalProfile,
  getLocations,
  getMarkets,
  getMediaAssets,
  getServicesByMarket,
  getSocialLinks,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import { courseBasePath } from "@/lib/routes/course-routes";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import { buildMarketPath, serviceBasePath } from "@/lib/routes/service-routes";
import { buildHomeJsonLd } from "@/lib/seo/structured-data";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const downloadsBasePath: Record<Locale, `/${string}`> = {
  es: "/descargas",
  en: "/downloads",
};

function getRequiredMedia(id: string, locale: Locale) {
  const media = getMediaAssets().find((item) => item.id === id);

  if (!media?.publicPath || !media.width || !media.height) {
    notFound();
  }

  return {
    alt: media.alt[locale],
    height: media.height,
    src: media.publicPath,
    width: media.width,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });
  const markets = getMarkets(locale);
  const whatsappTargets = getWhatsAppTargets(locale);
  const downloads = getDownloads(locale);
  const catalogDownloads = downloads.filter((download) => download.type === "catalog");
  const courseDownloads = downloads.filter((download) => download.type === "course_pdf");
  const courseDownloadById = new Map(
    courseDownloads.map((download) => [download.courseId, download]),
  );
  const courses = getCourses(locale).slice(0, 3);
  const locations = getLocations(locale);
  const heroImage = getRequiredMedia("xiomara-foto-profesional", locale);
  const studioImage = getRequiredMedia("estudio-cabina-certificados", locale);
  const resultsImage = getRequiredMedia("resultados-cejas-labios-pared", locale);
  const logo = getRequiredMedia("logo-oficial", locale);
  const legalProfile = getLegalProfile(locale);
  const serviceHighlights = markets.map((market) => ({
    href: buildMarketPath(locale, market.slug),
    market,
    services: getServicesByMarket(market.id, locale)
      .filter((service) => service.featured)
      .slice(0, 3),
  }));
  const homeJsonLd = buildHomeJsonLd({
    description: t("intro"),
    legalProfile,
    locale,
    logoPath: logo.src,
    socialLinks: getSocialLinks(),
    title: t("title"),
  });
  const whatsappProps = {
    closeLabel: whatsappT("close"),
    description: whatsappT("description"),
    targets: whatsappTargets,
    title: whatsappT("title"),
  };

  return (
    <main>
      {homeJsonLd.map((data, index) => (
        <JsonLd data={data} key={index} />
      ))}

      <header className="border-b border-border bg-surface-strong">
        <Container className="grid min-h-[calc(88dvh-5rem)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.92fr] lg:py-20">
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">{t("heroEyebrow")}</Eyebrow>
            <h1 className="text-balance font-display text-5xl leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              {t("intro")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppChooser
                {...whatsappProps}
                triggerLabel={t("primaryCta")}
              />
              <ButtonLink href={serviceBasePath[locale]} variant="outline">
                {t("secondaryCta")}
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                alt={heroImage.alt}
                className="h-full w-full object-cover"
                height={heroImage.height}
                priority
                sizes="(min-width: 1024px) 42vw, 90vw"
                src={heroImage.src}
                width={heroImage.width}
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden w-44 overflow-hidden rounded-lg border border-border bg-surface sm:block lg:w-52">
              <Image
                alt=""
                className="aspect-[4/5] h-full w-full object-cover"
                height={resultsImage.height}
                sizes="14rem"
                src={resultsImage.src}
                width={resultsImage.width}
              />
            </div>
          </div>
        </Container>
      </header>

      <Section id="mercados" spacing="loose">
        <Container className="grid gap-8">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3">{t("marketEyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl leading-tight text-foreground">
              {t("marketTitle")}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t("marketDescription")}
            </p>
          </div>
          <MarketSelector
            items={markets.map((market) => ({
              currency: market.currency,
              description: market.description,
              href: buildMarketPath(locale, market.slug),
              id: market.id,
              name: market.name,
            }))}
            label={t("marketSelectorLabel")}
          />
        </Container>
      </Section>

      <Section id="servicios-destacados" spacing="loose" tone="muted">
        <Container className="grid gap-8">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3">{t("featuredEyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl leading-tight text-foreground">
              {t("featuredTitle")}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t("featuredDescription")}
            </p>
          </div>
          <div className="grid gap-5">
            {serviceHighlights.map((group) => (
              <Reveal key={group.market.id}>
                <article className="grid gap-5 border-t border-border py-6 lg:grid-cols-[0.48fr_1fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-3xl leading-tight text-foreground">
                        {group.market.name}
                      </h3>
                      <Badge variant="outline">{group.market.currency}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {group.market.description}
                    </p>
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-3">
                    {group.services.length > 0 ? (
                      group.services.map((service) => (
                        <li
                          className="rounded-md border border-border bg-surface px-4 py-3 text-sm font-semibold leading-6 text-foreground"
                          key={service.id}
                        >
                          {service.name}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm leading-6 text-muted-foreground">
                        {t("featuredEmpty")}
                      </li>
                    )}
                  </ul>
                  <ButtonLink href={group.href} size="sm" variant="outline">
                    {t("marketCta")}
                  </ButtonLink>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="compact" tone="ink">
        <Container className="grid gap-6 py-2 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight">
              {t("assessmentTitle")}
            </h2>
            <p className="mt-4 text-base leading-8 text-secondary-foreground/80">
              {t("assessmentCopy")}
            </p>
          </div>
          <WhatsAppChooser {...whatsappProps} triggerLabel={t("primaryCta")} />
        </Container>
      </Section>

      <Section id="jornadas" spacing="loose">
        <Container className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow className="mb-3">{t("journeysEyebrow")}</Eyebrow>
              <h2 className="font-display text-4xl leading-tight text-foreground">
                {t("journeysTitle")}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {t("journeysDescription")}
              </p>
              <ButtonLink
                className="mt-6"
                href={journeyBasePath[locale]}
                variant="outline"
              >
                {t("journeysLinkLabel")}
              </ButtonLink>
            </div>
          </Reveal>
          <StaggerList className="grid gap-3 sm:grid-cols-2">
            {locations.map((location) => (
              <StaggerListItem key={location.id}>
                <article className="rounded-lg border border-border bg-surface p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-display text-2xl leading-tight text-foreground">
                      {location.region
                        ? `${location.city}, ${location.region}`
                        : `${location.city}, ${location.country}`}
                    </h3>
                    <Badge
                      variant={
                        location.type === "physical_studio" ? "default" : "outline"
                      }
                    >
                      {location.type === "physical_studio"
                        ? t("studioLabel")
                        : t("journeyLabel")}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {location.notes}
                  </p>
                </article>
              </StaggerListItem>
            ))}
          </StaggerList>
        </Container>
      </Section>

      <Section spacing="loose" tone="muted">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-[0.84fr_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface">
                <Image
                  alt={resultsImage.alt}
                  className="h-full w-full object-cover"
                  height={resultsImage.height}
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  src={resultsImage.src}
                  width={resultsImage.width}
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface sm:mt-10">
                <Image
                  alt={studioImage.alt}
                  className="h-full w-full object-cover"
                  height={studioImage.height}
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  src={studioImage.src}
                  width={studioImage.width}
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="grid gap-8">
              <section aria-labelledby="home-results-title">
                <h2
                  className="font-display text-4xl leading-tight text-foreground"
                  id="home-results-title"
                >
                  {t("resultsTitle")}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("resultsCopy")}
                </p>
              </section>
              <section
                aria-labelledby="home-about-title"
                className="border-t border-border pt-8"
              >
                <h2
                  className="font-display text-4xl leading-tight text-foreground"
                  id="home-about-title"
                >
                  {t("aboutTitle")}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("aboutCopy")}
                </p>
              </section>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="formaciones" spacing="loose">
        <Container className="grid gap-8">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3">{t("coursesEyebrow")}</Eyebrow>
            <h2 className="font-display text-4xl leading-tight text-foreground">
              {t("coursesTitle")}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {t("coursesDescription")}
            </p>
          </div>
          <StaggerList className="grid gap-4 lg:grid-cols-3">
            {courses.map((course) => {
              const download = courseDownloadById.get(course.downloadId);

              return (
                <StaggerListItem key={course.id}>
                  <CourseCard
                    certification={course.certification}
                    downloadHref={download?.publicPath}
                    downloadLabel={download ? t("courseDownloadLabel") : undefined}
                    duration={course.duration.label}
                    summary={course.summary}
                    title={course.name}
                  />
                </StaggerListItem>
              );
            })}
          </StaggerList>
          <div className="flex flex-wrap gap-3">
            <WhatsAppChooser {...whatsappProps} triggerLabel={t("coursesCta")} />
            <ButtonLink href={courseBasePath[locale]} variant="outline">
              {t("coursesLinkLabel")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section spacing="compact" tone="muted">
        <Container className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl leading-tight text-foreground">
              {t("downloadsTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t("downloadsDescription", {
                catalogCount: catalogDownloads.length,
                courseCount: courseDownloads.length,
              })}
            </p>
          </div>
          <ButtonLink href={downloadsBasePath[locale]} variant="outline">
            {t("downloadsCta")}
          </ButtonLink>
        </Container>
      </Section>

      <Section spacing="loose" tone="ink">
        <Container className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight">
              {t("finalTitle")}
            </h2>
            <p className="mt-4 text-base leading-8 text-secondary-foreground/80">
              {t("finalCopy")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppChooser {...whatsappProps} triggerLabel={t("primaryCta")} />
            <ButtonLink href={serviceBasePath[locale]} variant="outline">
              {t("secondaryCta")}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
