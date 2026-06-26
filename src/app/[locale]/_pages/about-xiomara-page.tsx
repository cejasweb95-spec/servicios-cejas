import Image from "next/image";

import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import { getMediaAssets, getWhatsAppTargets } from "@/lib/content/queries";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type AboutPageCopy = {
  bio: string[];
  breadcrumbsLabel: string;
  certificationTitle: string;
  certifications: string[];
  contactLabel: string;
  description: string;
  eyebrow: string;
  homeLabel: string;
  stats: { label: string; value: string }[];
  title: string;
  trajectoryTitle: string;
  trajectoryText: string;
};

type WhatsAppCopy = {
  closeLabel: string;
  description: string;
  title: string;
};

type AboutXiomaraPageProps = {
  copy: AboutPageCopy;
  locale: Locale;
  path: string;
  whatsapp: WhatsAppCopy;
};

export function AboutXiomaraPage({
  copy,
  locale,
  path,
  whatsapp,
}: AboutXiomaraPageProps) {
  const portrait = getMediaAssets().find(
    (asset) => asset.id === "xiomara-retrato-rosa",
  );
  const certificationsImage = getMediaAssets().find(
    (asset) => asset.id === "xiomara-certificaciones-estudio",
  );
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
      <PageHero
        actions={
          <WhatsAppChooser
            closeLabel={whatsapp.closeLabel}
            description={whatsapp.description}
            targets={getWhatsAppTargets(locale)}
            title={whatsapp.title}
            triggerLabel={copy.contactLabel}
          />
        }
        aside={
          portrait?.publicPath ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
              <Image
                alt={portrait.alt[locale]}
                className="h-full w-full object-cover"
                height={portrait.height}
                priority
                sizes="(min-width: 1024px) 34vw, 90vw"
                src={portrait.publicPath}
                width={portrait.width}
              />
            </div>
          ) : null
        }
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Section tone="muted">
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <Reveal direction="left">
              <section aria-labelledby="about-bio">
              <h2
                className="font-display text-4xl leading-tight text-foreground"
                id="about-bio"
              >
                {copy.trajectoryTitle}
              </h2>
              <div className="mt-5 grid gap-4 text-base leading-8 text-muted-foreground">
                {copy.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              </section>
            </Reveal>
            <Reveal delay={0.04} direction="right">
              <div className="grid gap-8">
              <StaggerList className="grid grid-cols-3 gap-4 border-y border-primary/25 py-6">
                {copy.stats.map((stat) => (
                  <StaggerListItem key={stat.label}>
                    <div>
                      <p className="font-display text-4xl leading-none text-primary-text">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </StaggerListItem>
                ))}
              </StaggerList>
              <section>
                <Eyebrow className="mb-3 uppercase tracking-[0.14em]">
                  {copy.trajectoryTitle}
                </Eyebrow>
                <p className="text-base leading-8 text-muted-foreground">
                  {copy.trajectoryText}
                </p>
              </section>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      {certificationsImage?.publicPath ? (
        <Section tone="muted">
          <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface sm:aspect-[3/4]">
                <Image
                  alt={certificationsImage.alt[locale]}
                  className="h-full w-full object-cover"
                  height={certificationsImage.height}
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  src={certificationsImage.publicPath}
                  width={certificationsImage.width}
                />
              </div>
            </Reveal>
            <Reveal delay={0.04} direction="right">
              <section aria-labelledby="about-certifications">
              <Eyebrow className="uppercase tracking-[0.14em]">
                {copy.trajectoryTitle}
              </Eyebrow>
              <h2
                className="mt-3 text-balance font-display text-4xl leading-tight text-foreground"
                id="about-certifications"
              >
                {copy.certificationTitle}
              </h2>
              <ul className="mt-6 divide-y divide-primary/20 border-y border-primary/20">
                {copy.certifications.map((item) => (
                  <li
                    className="py-4 text-sm leading-7 text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              </section>
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
