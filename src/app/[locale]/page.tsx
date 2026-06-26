import { type ReactNode } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CourseEditorialFeature } from "@/components/domain/course-editorial-feature";
import { EventMap, type EventMapLocation } from "@/components/domain/event-map";
import { CountryFlag } from "@/components/primitives/country-flag";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import {
  HeroItem,
  HeroMedia,
  HeroParallax,
  HeroStage,
} from "@/components/motion/hero-reveal";
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
import { buildCoursePath, courseBasePath } from "@/lib/routes/course-routes";
import { journeyBasePath } from "@/lib/routes/journey-routes";
import { aboutBasePath, contactBasePath, resultsBasePath } from "@/lib/routes/static-routes";
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
  const colombiaWhatsapp = getWhatsAppTarget("colombia", locale);
  const studioWhatsappHref = colombiaWhatsapp
    ? buildWhatsAppHref(
        colombiaWhatsapp.phoneE164,
        colombiaWhatsapp.defaultMessage,
      )
    : "https://wa.me/573167742299";
  const downloads = getDownloads(locale);
  const catalogDownloads = downloads.filter((download) => download.type === "catalog");
  const courseDownloads = downloads.filter((download) => download.type === "course_pdf");
  const courseDownloadById = new Map(
    courseDownloads.map((download) => [download.courseId, download]),
  );
  const courses = getCourses(locale).slice(0, 3);
  const locations = getLocations(locale);
  const caliStudio = locations.find((location) => location.id === "cali");
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

      <Section
        className="border-b border-primary/20"
        id="apertura"
        spacing="loose"
        tone="strong"
      >
        <RoseWash accent="corner">
          <HeroStage>
            <Container className="grid min-h-0 items-center gap-8 py-10 sm:gap-10 sm:py-16 lg:min-h-[calc(88dvh-5rem)] lg:grid-cols-[1fr_0.92fr] lg:py-20">
              <HeroMedia className="relative order-first mx-auto w-full max-w-[20rem] sm:max-w-[26rem] lg:order-none lg:mr-0 lg:max-w-[34rem]">
                <HeroParallax className="relative aspect-[4/5] overflow-hidden rounded-lg border border-primary/20 bg-surface lg:aspect-[5/6]">
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

              <HeroItem className="order-last max-w-3xl lg:order-none">
                <Eyebrow className="mb-4">{t("heroEyebrow")}</Eyebrow>
                <h1 className="text-balance font-display text-[1.7rem] leading-[1.12] text-foreground sm:text-5xl lg:text-7xl">
                  {t("title")}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                  {t("heroBio")}
                </p>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-foreground/80">
                  {t("intro")}
                </p>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-text">
                    {t("heroMarketsLabel")}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {markets.map((market) => (
                      <li
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-surface px-3.5 py-2 text-sm font-semibold text-foreground"
                        key={market.id}
                      >
                        <CountryFlag className="h-3.5 w-5" market={market.id} />
                        {market.shortName}
                        <span className="text-xs text-muted-foreground">
                          {market.currency}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
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
            </Container>
          </HeroStage>
        </RoseWash>
      </Section>

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
          <div className="max-w-3xl border-l-4 border-primary pl-5">
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

      {caliStudio ? (
        <Section id="punto-fisico" spacing="loose" tone="rose">
          <RoseWash accent="band-left">
            <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/20 bg-surface">
                  <Image
                    alt={studioImage.alt}
                    className="h-full w-full object-cover"
                    height={studioImage.height}
                    sizes="(min-width: 1024px) 42vw, 92vw"
                    src={studioImage.src}
                    width={studioImage.width}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="max-w-xl">
                  <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                    {t("studioEyebrow")}
                  </Eyebrow>
                  <h2 className="font-display text-4xl leading-tight text-foreground">
                    {t.rich("studioTitle", { i: italicAccent })}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-foreground/85">
                    {t("studioCopy")}
                  </p>
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/25 bg-surface/80 p-4">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary-text"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        {caliStudio.city}, {caliStudio.country}
                      </p>
                      {caliStudio.address ? (
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {caliStudio.address}
                        </p>
                      ) : null}
                      <p className="mt-2 text-xs font-semibold text-primary-text">
                        {legalProfile.note}
                      </p>
                    </div>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <ButtonLink href={studioWhatsappHref}>
                      {t("studioCta")}
                    </ButtonLink>
                    <ButtonLink href={contactBasePath[locale]} variant="outline">
                      {t("studioContactLabel")}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </Container>
          </RoseWash>
        </Section>
      ) : null}

      <Section id="formaciones" spacing="loose" tone="rose">
        <RoseWash accent="band-right">
          <Container className="grid gap-10">
            <div className="max-w-3xl border-l-4 border-primary pl-5">
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
