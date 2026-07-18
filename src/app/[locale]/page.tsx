import { type ReactNode } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CourseEditorialFeature } from "@/components/domain/course-editorial-feature";
import { EventMap, type EventMapLocation } from "@/components/domain/event-map";
import {
  ReviewList,
  WriteReviewButtons,
  type ReviewWriteAction,
} from "@/components/domain/review-section";
import { HomeHero } from "@/components/domain/home-hero";
import { CountryFlag } from "@/components/primitives/country-flag";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { ButtonLink } from "@/components/primitives/button-link";
import { RoseWash } from "@/components/primitives/rose-wash";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/i18n/routing";
import {
  getCourses,
  getDownloads,
  getGoogleReviewProfiles,
  getLegalProfile,
  getLocations,
  getMarketById,
  getMarketMediaAsset,
  getMarkets,
  getMediaAssets,
  getPhysicalStudios,
  getReviewsByProfile,
  getServicesByMarket,
  getSocialLinks,
  getWhatsAppTarget,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import { buildWhatsAppHref } from "@/lib/whatsapp/build-whatsapp-url";
import { buildCoursePath, courseBasePath } from "@/lib/routes/course-routes";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import { aboutBasePath, contactBasePath, resultsBasePath } from "@/lib/routes/static-routes";
import { puertoSaguntoStudioBasePath } from "@/lib/routes/studio-routes";
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
  const physicalStudios = getPhysicalStudios(locale).flatMap((studio) => {
    const media = studio.mediaId
      ? getMediaAssets().find((item) => item.id === studio.mediaId)
      : null;

    if (!media?.publicPath || !media.width || !media.height) {
      return [];
    }

    const market = getMarketById(studio.marketId, locale);
    const target = market ? getWhatsAppTarget(market.whatsappTargetId, locale) : null;
    const label = [studio.city, studio.region, studio.country].filter(Boolean).join(", ");

    return [
      {
        image: {
          alt: media.alt[locale],
          height: media.height,
          src: media.publicPath,
          width: media.width,
        },
        roleLabel:
          studio.studioRole === "primary"
            ? t("studioPrimaryLabel")
            : t("studioSecondaryLabel"),
        showLegalNote: studio.studioRole === "primary",
        studio,
        studioPageHref:
          studio.id === "puerto-sagunto"
            ? puertoSaguntoStudioBasePath[locale]
            : undefined,
        whatsappHref: target
          ? buildWhatsAppHref(
              target.phoneE164,
              journeysT("whatsappMessage", { location: label }),
            )
          : "https://wa.me/573167742299",
      },
    ];
  });
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
      coordinates: location.coordinates ?? { lat: 0, lng: 0 },
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
  const reviewProfiles = getGoogleReviewProfiles(locale);
  const highlightedReviews = reviewProfiles.flatMap((profile) =>
    getReviewsByProfile(profile.id, locale),
  );
  const reviewWriteActions = reviewProfiles.map(
    (profile): ReviewWriteAction => ({
      id: profile.id,
      label: t("reviewsWriteCta", { location: profile.label }),
      writeReviewUrl: profile.writeReviewUrl,
    }),
  );
  const ratedProfile = reviewProfiles.find(
    (profile) => profile.rating !== undefined && profile.reviewCount !== undefined,
  );
  const reviewsMeta =
    ratedProfile && ratedProfile.rating !== undefined && ratedProfile.reviewCount !== undefined
      ? t("reviewsMetaLabel", {
          count: ratedProfile.reviewCount,
          location: ratedProfile.label,
          rating: ratedProfile.rating.toLocaleString(locale, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }),
        })
      : null;
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

      <HomeHero
        aboutHref={aboutBasePath[locale]}
        copy={{
          aboutCta: t("heroAboutCta"),
          bioParagraphs: t.raw("heroBioParagraphs") as string[],
          eyebrow: t("heroEyebrow"),
          lead: t("heroLead"),
          marketsLine: t("heroMarketsLine"),
          primaryCta: t("primaryCta"),
          servicesCta: t("secondaryCta"),
          title: t("heroTitle"),
        }}
        heroImage={heroImage}
        servicesHref={serviceBasePath[locale]}
        whatsapp={whatsappProps}
      />

      <Section id="jornadas" spacing="loose" tone="muted">
        <Container className="grid gap-10">
          <Reveal>
            <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
              <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-2xl border border-primary/15 bg-surface md:block lg:mx-0">
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
                mapInteractionHint: journeysT("mapInteractionHint"),
                mapLegendHint: journeysT("mapLegendHint"),
                mapTitle: journeysT("mapTitle"),
                mapZoomControlsLabel: journeysT("mapZoomControlsLabel"),
                physicalStudioLabel: journeysT("physicalStudioLabel"),
                resetZoomLabel: journeysT("resetZoomLabel"),
                selectLocationLabel: journeysT("selectLocationLabel"),
                selectedLocationLabel: journeysT("selectedLocationLabel"),
                zoomInLabel: journeysT("zoomInLabel"),
                zoomOutLabel: journeysT("zoomOutLabel"),
              }}
              locations={eventMapLocations}
              showHeading={false}
            />
          </Reveal>
        </Container>
      </Section>

      <Section id="servicios-por-pais" spacing="loose">
        <Container className="grid gap-12">
          <div className="mx-auto max-w-2xl text-center">
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
                          ? "relative aspect-[16/11] overflow-hidden rounded-2xl border border-primary/10 bg-surface lg:order-last lg:aspect-[3/2]"
                          : "relative aspect-[16/11] overflow-hidden rounded-2xl border border-primary/10 bg-surface lg:aspect-[3/2]"
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

      {physicalStudios.length > 0 ? (
        <Section id="punto-fisico" spacing="loose" tone="rose">
          <RoseWash accent="band-left">
            <Container className="grid gap-10">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                    {t("studioEyebrow")}
                  </Eyebrow>
                  <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
                    {t.rich("studioTitle", { i: italicAccent })}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-foreground/85">
                    {t("studioCopy")}
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-10 lg:grid-cols-2">
                {physicalStudios.map((entry, index) => (
                  <Reveal delay={index * 0.04} key={entry.studio.id}>
                    <article className="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/20 bg-surface">
                        <Image
                          alt={entry.image.alt}
                          className="h-full w-full object-cover object-center"
                          height={entry.image.height}
                          sizes="(min-width: 1024px) 42vw, 92vw"
                          src={entry.image.src}
                          width={entry.image.width}
                        />
                      </div>
                      <div className="max-w-xl">
                        <Badge variant="outline">{entry.roleLabel}</Badge>
                        <h3 className="mt-4 font-display text-3xl leading-tight text-foreground">
                          {entry.studio.city}
                          {entry.studio.region ? `, ${entry.studio.region}` : ""}
                        </h3>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {entry.studio.country}
                        </p>
                        <p className="mt-4 text-base leading-8 text-foreground/85">
                          {entry.studio.notes}
                        </p>
                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/25 bg-surface/80 p-4">
                          <MapPin
                            aria-hidden="true"
                            className="mt-0.5 size-5 shrink-0 text-primary-text"
                          />
                          <div>
                            <p className="font-semibold text-foreground">
                              {journeysT("addressLabel")}
                            </p>
                            {entry.studio.address ? (
                              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                {entry.studio.address}
                              </p>
                            ) : null}
                            {entry.showLegalNote ? (
                              <p className="mt-2 text-xs font-semibold text-primary-text">
                                {legalProfile.note}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <ButtonLink href={entry.whatsappHref}>
                            {t("studioCta")}
                          </ButtonLink>
                          {entry.studioPageHref ? (
                            <ButtonLink href={entry.studioPageHref} variant="outline">
                              {t("studioPageLinkLabel")}
                            </ButtonLink>
                          ) : (
                            <ButtonLink href={contactBasePath[locale]} variant="outline">
                              {t("studioContactLabel")}
                            </ButtonLink>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </Container>
          </RoseWash>
        </Section>
      ) : null}

      <Section id="formaciones" spacing="loose" tone="rose">
        <RoseWash accent="band-right">
          <Container className="grid gap-10">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                {t("coursesEyebrow")}
              </Eyebrow>
              <h2 className="font-display text-balance text-4xl leading-tight text-foreground sm:text-5xl">
                {t.rich("coursesTitle", { i: italicAccent })}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/80">
                {t("coursesDescription")}
              </p>
            </div>
            <StaggerList className="grid gap-12 sm:gap-14">
              {courses.map((course, index) => {
                const download = courseDownloadById.get(course.downloadId);
                const image = getRequiredMedia(course.imageId, locale);

                return (
                  <StaggerListItem key={course.id}>
                    <Reveal>
                      <CourseEditorialFeature
                        certification={course.certification}
                        detailHref={buildCoursePath(locale, course.slug)}
                        detailLabel={t("courseDetailLabel")}
                        downloadHref={download?.publicPath}
                        downloadLabel={
                          download ? t("courseDownloadLabel") : undefined
                        }
                        duration={course.duration.label}
                        featured={index === 0}
                        image={image}
                        modules={course.modules}
                        modulesTitle={t("courseModulesLabel")}
                        reverse={index % 2 === 1}
                        summary={course.summary}
                        title={course.name}
                      />
                    </Reveal>
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
        </RoseWash>
      </Section>

      <Section spacing="loose" tone="muted">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/15 bg-surface">
              <Image
                alt={resultsImage.alt}
                className="h-full w-full object-cover"
                height={resultsImage.height}
                sizes="(min-width: 1024px) 42vw, 90vw"
                src={resultsImage.src}
                width={resultsImage.width}
              />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                {t("resultsEyebrow")}
              </Eyebrow>
              <h2 className="font-display text-4xl leading-tight text-foreground">
                {t.rich("resultsTitle", { i: italicAccent })}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {t("resultsCopy")}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={resultsBasePath[locale]}>
                  {t("resultsCta")}
                </ButtonLink>
                <ButtonLink href={aboutBasePath[locale]} variant="outline">
                  {t("aboutLinkLabel")}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {highlightedReviews.length > 0 ? (
        <Section id="opiniones" spacing="loose">
          <Container className="grid gap-10">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                {t("reviewsEyebrow")}
              </Eyebrow>
              <h2 className="font-display text-balance text-4xl leading-tight text-foreground sm:text-5xl">
                {t.rich("reviewsTitle", { i: italicAccent })}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/80">
                {t("reviewsCopy")}
              </p>
              {reviewsMeta ? (
                <p className="mt-3 text-sm font-semibold text-primary-text">
                  {reviewsMeta}
                </p>
              ) : null}
            </div>
            <Reveal>
              <ReviewList
                ratingLabel={(rating) => t("reviewsRatingLabel", { rating })}
                reviews={highlightedReviews}
                sourceLabel={t("reviewsSourceLabel")}
              />
            </Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <WriteReviewButtons actions={reviewWriteActions} />
              {ratedProfile ? (
                <a
                  className="inline-flex items-center text-sm font-semibold text-primary-text underline-offset-4 hover:underline focus-visible:underline"
                  href={ratedProfile.listingUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t("reviewsListingCta")}
                </a>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

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
        <RoseWash accent="band-right">
          <Container className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl leading-tight">
                {t("assessmentTitle")}
              </h2>
              <p className="mt-4 text-base leading-8 text-secondary-foreground/85">
                {t("assessmentCopy")}
              </p>
              <p className="mt-4 text-sm leading-7 text-secondary-foreground/70">
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
        </RoseWash>
      </Section>
    </main>
  );
}
