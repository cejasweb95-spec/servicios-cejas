import { CourseCard } from "@/components/domain/course-card";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import { getCourses, getDownloads } from "@/lib/content/queries";
import { buildCoursePath, courseBasePath } from "@/lib/routes/course-routes";
import {
  buildBreadcrumbListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/structured-data";

type TrainingIndexCopy = {
  breadcrumbsLabel: string;
  courseDetailLabel: string;
  description: string;
  downloadLabel: string;
  eyebrow: string;
  homeLabel: string;
  nextDateLabel: string;
  title: string;
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

type TrainingIndexPageProps = {
  copy: TrainingIndexCopy;
  locale: Locale;
  whatsapp: WhatsAppCopy;
};

export function TrainingIndexPage({
  copy,
  locale,
  whatsapp,
}: TrainingIndexPageProps) {
  const courses = getCourses(locale);
  const downloads = getDownloads(locale).filter(
    (download) => download.type === "course_pdf",
  );
  const downloadByCourseId = new Map(
    downloads.map((download) => [download.courseId, download]),
  );
  const trainingPath = courseBasePath[locale];
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: copy.homeLabel, path: `/${locale}` },
    { name: copy.title, path: `/${locale}${trainingPath}` },
  ]);
  const pageJsonLd = buildWebPageJsonLd({
    description: copy.description,
    locale,
    path: trainingPath,
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
            targets={whatsapp.targets}
            title={whatsapp.title}
            triggerLabel={copy.nextDateLabel}
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

          <section aria-labelledby="training-list-title">
            <h2 className="sr-only" id="training-list-title">
              {copy.title}
            </h2>
            <StaggerList className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => {
                const download = downloadByCourseId.get(course.downloadId);

                return (
                  <StaggerListItem key={course.id}>
                    <CourseCard
                      certification={course.certification}
                      detailHref={buildCoursePath(locale, course.slug)}
                      detailLabel={copy.courseDetailLabel}
                      downloadHref={download?.publicPath}
                      downloadLabel={download ? copy.downloadLabel : undefined}
                      duration={course.duration.label}
                      summary={course.summary}
                      title={course.name}
                    />
                  </StaggerListItem>
                );
              })}
            </StaggerList>
          </section>

          <section
            aria-labelledby="training-next-date"
            className="rounded-lg border border-border bg-surface-muted p-5"
          >
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2
                  className="font-display text-3xl leading-tight text-foreground"
                  id="training-next-date"
                >
                  {copy.nextDateLabel}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {copy.description}
                </p>
              </div>
              <WhatsAppChooser
                closeLabel={whatsapp.closeLabel}
                description={whatsapp.description}
                targets={whatsapp.targets}
                title={whatsapp.title}
                triggerLabel={copy.nextDateLabel}
              />
            </div>
          </section>
        </Container>
      </Section>
    </main>
  );
}
