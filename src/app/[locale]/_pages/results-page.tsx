import { ResultMosaic } from "@/components/domain/result-mosaic";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import { getMediaAssets, getWhatsAppTargets } from "@/lib/content/queries";
import {
  buildBreadcrumbListJsonLd,
  buildImageObjectJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type ResultsPageCopy = {
  breadcrumbsLabel: string;
  closeLightboxLabel: string;
  contactLabel: string;
  description: string;
  emptyGalleryLabel: string;
  eyebrow: string;
  galleryNote: string;
  galleryTitle: string;
  healingLabel: string;
  homeLabel: string;
  imageCountLabel: string;
  nextResultLabel: string;
  openResultLabel: string;
  previousResultLabel: string;
  title: string;
};

type WhatsAppCopy = {
  closeLabel: string;
  description: string;
  title: string;
};

type ResultsPageProps = {
  copy: ResultsPageCopy;
  locale: Locale;
  path: string;
  whatsapp: WhatsAppCopy;
};

export function ResultsPage({
  copy,
  locale,
  path,
  whatsapp,
}: ResultsPageProps) {
  const galleryImages = getMediaAssets()
    .filter((asset) => asset.type === "gallery" && asset.publicPath)
    .map((asset) => ({
      alt: asset.alt[locale],
      height: asset.height,
      id: asset.id,
      src: asset.publicPath ?? "",
      width: asset.width,
    }));
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
  const imageJsonLd = galleryImages.map((image) =>
    buildImageObjectJsonLd({
      contentUrl: image.src,
      description: image.alt,
      height: image.height,
      locale,
      name: image.alt,
      pagePath: path,
      width: image.width,
    }),
  );

  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {imageJsonLd.map((data) => (
        <JsonLd data={data} key={data.contentUrl as string} />
      ))}
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
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />
      <Section>
        <Container className="grid gap-8">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <ResultMosaic
              copy={{
                closeLabel: copy.closeLightboxLabel,
                emptyLabel: copy.emptyGalleryLabel,
                imageCountLabel: copy.imageCountLabel,
                nextLabel: copy.nextResultLabel,
                openLabel: copy.openResultLabel,
                previousLabel: copy.previousResultLabel,
              }}
              images={galleryImages}
            />
            <section aria-labelledby="results-gallery-title" className="lg:sticky lg:top-24">
              <Badge variant="outline">{copy.healingLabel}</Badge>
              <h2
                className="mt-4 font-display text-4xl leading-tight text-foreground"
                id="results-gallery-title"
              >
                {copy.galleryTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {copy.galleryNote}
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </main>
  );
}
