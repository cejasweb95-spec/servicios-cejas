import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { DownloadCard } from "@/components/domain/download-card";
import { Container } from "@/components/primitives/container";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import { getDownloads } from "@/lib/content/queries";
import { formatFileSize } from "@/lib/format/file-size";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type DownloadsCopy = {
  actionLabel: string;
  breadcrumbsLabel: string;
  catalogLabel: string;
  courseLabel: string;
  description: string;
  eyebrow: string;
  homeLabel: string;
  title: string;
};

type DownloadsPageProps = {
  copy: DownloadsCopy;
  locale: Locale;
};

export function DownloadsPage({ copy, locale }: DownloadsPageProps) {
  const downloads = getDownloads(locale);
  const catalogs = downloads.filter((download) => download.type === "catalog");
  const courses = downloads.filter((download) => download.type === "course_pdf");
  const downloadsPath = locale === "es" ? "/descargas" : "/downloads";
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.title, path: `/${locale}${downloadsPath}` },
  ]);
  const pageJsonLd = buildWebPageJsonLd({
    description: copy.description,
    locale,
    path: downloadsPath,
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
        <Container className="grid gap-12">
          <Breadcrumbs
            items={[
              { label: copy.homeLabel, href: "/" },
              { label: copy.title },
            ]}
            label={copy.breadcrumbsLabel}
          />
          <Reveal>
          <section aria-labelledby="catalog-downloads">
            <div className="mb-5 flex items-center justify-center gap-3">
              <h2
                className="font-display text-3xl leading-tight text-foreground"
                id="catalog-downloads"
              >
                {copy.catalogLabel}
              </h2>
              <Badge variant="outline">{catalogs.length}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {catalogs.map((download) => (
                <DownloadCard
                  actionLabel={copy.actionLabel}
                  description={download.description}
                  href={download.publicPath}
                  key={download.id}
                  meta={formatFileSize(download.fileSizeBytes, locale)}
                  title={download.title}
                />
              ))}
            </div>
          </section>
          </Reveal>

          <Reveal delay={0.05}>
          <section aria-labelledby="course-downloads">
            <div className="mb-5 flex items-center justify-center gap-3">
              <h2
                className="font-display text-3xl leading-tight text-foreground"
                id="course-downloads"
              >
                {copy.courseLabel}
              </h2>
              <Badge variant="outline">{courses.length}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((download) => (
                <DownloadCard
                  actionLabel={copy.actionLabel}
                  description={download.description}
                  href={download.publicPath}
                  key={download.id}
                  meta={formatFileSize(download.fileSizeBytes, locale)}
                  title={download.title}
                />
              ))}
            </div>
          </section>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
