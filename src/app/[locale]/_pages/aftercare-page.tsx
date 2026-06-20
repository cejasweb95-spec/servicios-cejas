import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { EditorialImagePair } from "@/components/primitives/editorial-image-pair";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import { getMediaAssetById, getWhatsAppTargets } from "@/lib/content/queries";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type CareBlock = {
  title: string;
  items: string[];
};

type AftercareCopy = {
  beforeTitle: string;
  beforeBrowsIntro: string;
  beforeLipsIntro: string;
  breadcrumbsLabel: string;
  browsLabel: string;
  contactLabel: string;
  description: string;
  eyebrow: string;
  homeLabel: string;
  lipsLabel: string;
  note: string;
  noteTitle: string;
  afterTitle: string;
  title: string;
  beforeBrows: CareBlock[];
  beforeLips: CareBlock[];
  afterBrows: string[];
  afterLips: string[];
};

type WhatsAppCopy = {
  closeLabel: string;
  description: string;
  title: string;
};

type AftercarePageProps = {
  copy: AftercareCopy;
  locale: Locale;
  path: string;
  whatsapp: WhatsAppCopy;
};

function CareTimeline({ blocks }: { blocks: CareBlock[] }) {
  return (
    <StaggerList className="grid gap-4">
      {blocks.map((block) => (
        <StaggerListItem key={block.title}>
          <section className="rounded-xl border border-border bg-background p-5">
            <h3 className="font-display text-2xl leading-tight text-foreground">
              {block.title}
            </h3>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </StaggerListItem>
      ))}
    </StaggerList>
  );
}

function CareList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li className="rounded-lg border border-border bg-background p-4" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function AftercarePage({
  copy,
  locale,
  path,
  whatsapp,
}: AftercarePageProps) {
  const browsImage = getMediaAssetById("result-cejas-03", locale);
  const lipsImage = getMediaAssetById("result-labios-02", locale);
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
          browsImage?.publicPath && lipsImage?.publicPath ? (
            <EditorialImagePair
              primary={browsImage}
              priority
              secondary={lipsImage}
            />
          ) : undefined
        }
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Section>
        <Container className="grid gap-10">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />
          <Reveal>
            <section aria-labelledby="before-care" className="grid gap-6">
            <div>
              <Badge variant="outline">{copy.beforeTitle}</Badge>
              <h2
                className="mt-4 font-display text-4xl leading-tight text-foreground"
                id="before-care"
              >
                {copy.beforeTitle}
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <section aria-labelledby="before-brows">
                <h3
                  className="mb-4 scroll-mt-28 font-display text-3xl leading-tight text-foreground"
                  id="before-brows"
                >
                  {copy.browsLabel}
                </h3>
                <p className="mb-5 max-w-prose text-sm leading-7 text-muted-foreground">
                  {copy.beforeBrowsIntro}
                </p>
                <CareTimeline blocks={copy.beforeBrows} />
              </section>
              <section aria-labelledby="before-lips">
                <h3
                  className="mb-4 scroll-mt-28 font-display text-3xl leading-tight text-foreground"
                  id="before-lips"
                >
                  {copy.lipsLabel}
                </h3>
                <p className="mb-5 max-w-prose text-sm leading-7 text-muted-foreground">
                  {copy.beforeLipsIntro}
                </p>
                <CareTimeline blocks={copy.beforeLips} />
              </section>
            </div>
            </section>
          </Reveal>

          <Reveal direction="right">
            <section aria-labelledby="after-care" className="grid gap-6">
            <div>
              <Badge variant="outline">{copy.afterTitle}</Badge>
              <h2
                className="mt-4 font-display text-4xl leading-tight text-foreground"
                id="after-care"
              >
                {copy.afterTitle}
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <section aria-labelledby="after-brows">
                <h3
                  className="mb-4 scroll-mt-28 font-display text-3xl leading-tight text-foreground"
                  id="after-brows"
                >
                  {copy.browsLabel}
                </h3>
                <CareList items={copy.afterBrows} />
              </section>
              <section aria-labelledby="after-lips">
                <h3
                  className="mb-4 scroll-mt-28 font-display text-3xl leading-tight text-foreground"
                  id="after-lips"
                >
                  {copy.lipsLabel}
                </h3>
                <CareList items={copy.afterLips} />
              </section>
            </div>
            </section>
          </Reveal>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <div className="grid gap-5 rounded-xl border border-border bg-background p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl leading-tight text-foreground">
                {copy.noteTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {copy.note}
              </p>
            </div>
            <WhatsAppChooser
              closeLabel={whatsapp.closeLabel}
              description={whatsapp.description}
              targets={getWhatsAppTargets(locale)}
              title={whatsapp.title}
              triggerLabel={copy.contactLabel}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
