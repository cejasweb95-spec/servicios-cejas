import { type ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CourseCard } from "@/components/domain/course-card";
import { EventMap, type EventMapLocation } from "@/components/domain/event-map";
import { CountryFlag } from "@/components/primitives/country-flag";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Reveal } from "@/components/motion/reveal";
import {
  HeroItem,
  HeroMedia,
  HeroParallax,
  HeroStage,
} from "@/components/motion/hero-reveal";
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
  getMarketById,
  getMarketMediaAsset,
  getMarkets,
  getMediaAssets,
  getServicesByMarket,
  getSocialLinks,
  getWhatsAppTarget,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";
import { courseBasePath } from "@/lib/routes/course-routes";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import { buildMarketPath, serviceBasePath } from "@/lib/routes/service-routes";
import { buildHomeJsonLd } from "@/lib/seo/structured-data";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const italicAccent = (chunks: ReactNode) => (
  <i className="font-display italic">{chunks}</i>
);

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
  const journeysT = await getTranslations({ locale, namespace: "Journeys" });
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
  const eventMapLocations = locations.map((location): EventMapLocation => {
    const market = getMarketById(location.marketId, locale);
    const target = market
      ? getWhatsAppTarget(market.whatsappTargetId, locale)
      : null;
    const label = [location.city, location.region, location.country]
      .filter(Boolean)
      .join(", ");

    return {
      address: location.address,
      city: location.city,
      country: location.country,
      href: target
        ? buildWhatsAppHref(
            target.phoneE164,
            journeysT("whatsappMessage", { location: label }),
          )
        : "https://wa.me/573167742299",
      id: location.id,
      marketId: location.marketId,
      notes: location.notes,
      region: location.region,
      statusLabel:
        location.type === "physical_studio"
          ? journeysT("physicalStudioLabel")
          : journeysT("journeyLabel"),
      type: location.type,
      whatsappLabel: target?.label ?? journeysT("contactLabel"),
    };
  });
  const heroImage = getRequiredMedia("xiomara-hero-escritorio", locale);
  const journeysImage = getRequiredMedia("jornadas-globo", locale);
  const studioImage = getRequiredMedia("estudio-cabina-certificados", locale);
  const resultsImage = getRequiredMedia("resultados-cejas-labios-pared", locale);
  const logo = getRequiredMedia("logo-oficial", locale);
  const legalProfile = getLegalProfile(locale);
  const serviceHighlights = markets.map((market) => ({
    href: buildMarketPath(locale, market.slug),
    image: getMarketMediaAsset(market.id, locale),
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
        <HeroStage>
          <Container className="grid min-h-[calc(88dvh-5rem)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.92fr] lg:py-20">
            <HeroItem className="max-w-3xl">
              <Eyebrow className="mb-4">{t("heroEyebrow")}</Eyebrow>
              <h1 className="text-balance font-display text-[2rem] leading-[1.1] text-foreground sm:text-5xl lg:text-7xl">
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
            </HeroItem>

            <HeroMedia className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
              <HeroParallax className="relative aspect-[5/4] overflow-hidden rounded-lg border border-border bg-surface sm:aspect-square lg:aspect-[5/6]">
                <Image
                  alt={heroImage.alt}
                  className="h-full w-full object-cover object-top"
                  height={heroImage.height}
                  priority
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  src={heroImage.src}
                  width={heroImage.width}
                />
              </HeroParallax>
            </HeroMedia>
          </Container>
        </HeroStage>
      </header>

      <Section id="servicios-por-pais" spacing="loose" tone="rose">
        <Container className="grid gap-12">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
              {t("servicesEyebrow")}
            </Eyebrow>
            <h2 className="font-display text-balance text-4xl leading-tight text-foreground sm:text-5xl">
              {t.rich("marketTitle", { i: italicAccent })}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/80">
              {t("marketDescription")}
            </p>
          </div>
          <div className="grid gap-10 sm:gap-12">
            {serviceHighlights.map((group, index) => (
              <Reveal key={group.market.id}>
                <article className="grid items-center gap-6 border-t border-primary/30 pt-9 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                  {group.image?.publicPath ? (
                    <div
                      className={
                        index % 2 === 1
                          ? "relative aspect-[16/11] overflow-hidden rounded-2xl bg-surface lg:order-last lg:aspect-[3/2]"
                          : "relative aspect-[16/11] overflow-hidden rounded-2xl bg-surface lg:aspect-[3/2]"
                      }
                    >
                      <Image
                        alt={group.image.alt}
                        className="object-cover object-center transition-transform duration-700 motion-reduce:transition-none hover:scale-[1.03]"
                        fill
                        sizes="(min-width: 1024px) 46vw, 92vw"
                        src={group.image.publicPath}
                      />
                    </div>
                  ) : null}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <CountryFlag className="h-5 w-7" market={group.market.id} />
                      <h3 className="font-display text-3xl leading-tight text-foreground">
                        {group.market.name}
                      </h3>
                      <Badge variant="outline">{group.market.currency}</Badge>
                    </div>
                    <p className="mt-4 max-w-prose text-base leading-7 text-foreground/75">
                      {group.market.description}
                    </p>
                    <div className="mt-7">
                      <ButtonLink href={group.href}>{t("marketCta")}</ButtonLink>
                    </div>
                  </div>
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

      <Section id="jornadas" spacing="loose" tone="muted">
        <Container className="grid gap-10">
          <Reveal>
            <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-2xl bg-surface lg:mx-0">
                <Image
                  alt={journeysImage.alt}
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 1024px) 34vw, 88vw"
                  src={journeysImage.src}
                />
              </div>
              <div className="max-w-2xl">
                <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                  {t("journeysEyebrow")}
                </Eyebrow>
                <h2 className="font-display text-4xl leading-tight text-foreground">
                  {t.rich("journeysTitle", { i: italicAccent })}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("journeysDescription")}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {markets.map((market) => (
                    <li
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground"
                      key={market.id}
                    >
                      <CountryFlag className="h-3.5 w-5" market={market.id} />
                      {market.shortName}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ButtonLink href={journeyBasePath[locale]} variant="outline">
                    {t("journeysLinkLabel")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <EventMap
              copy={{
                addressLabel: journeysT("addressLabel"),
                contactLabel: journeysT("contactLabel"),
                journeyLabel: journeysT("journeyLabel"),
                listTitle: journeysT("listTitle"),
                mapAriaLabel: journeysT("mapAriaLabel"),
                mapTitle: journeysT("mapTitle"),
                physicalStudioLabel: journeysT("physicalStudioLabel"),
                selectLocationLabel: journeysT("selectLocationLabel"),
                selectedLocationLabel: journeysT("selectedLocationLabel"),
              }}
              locations={eventMapLocations}
            />
          </Reveal>
        </Container>
      </Section>

      <Section spacing="loose">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-[0.84fr_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted">
                <Image
                  alt={resultsImage.alt}
                  className="h-full w-full object-cover"
                  height={resultsImage.height}
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  src={resultsImage.src}
                  width={resultsImage.width}
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted sm:mt-10">
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
                <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                  {t("resultsEyebrow")}
                </Eyebrow>
                <h2
                  className="font-display text-4xl leading-tight text-foreground"
                  id="home-results-title"
                >
                  {t.rich("resultsTitle", { i: italicAccent })}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("resultsCopy")}
                </p>
              </section>
              <section
                aria-labelledby="home-about-title"
                className="border-t border-primary/30 pt-8"
              >
                <h2
                  className="font-display text-4xl leading-tight text-foreground"
                  id="home-about-title"
                >
                  {t.rich("aboutTitle", { i: italicAccent })}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("aboutCopy")}
                </p>
              </section>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="formaciones" spacing="loose" tone="muted">
        <Container className="grid gap-8">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
              {t("coursesEyebrow")}
            </Eyebrow>
            <h2 className="font-display text-4xl leading-tight text-foreground">
              {t.rich("coursesTitle", { i: italicAccent })}
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
                    image={getRequiredMedia(course.imageId, locale)}
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

      <Section spacing="compact">
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
