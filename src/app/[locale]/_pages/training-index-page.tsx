import Image from "next/image";
import { notFound } from "next/navigation";

import { CourseCard } from "@/components/domain/course-card";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { Section } from "@/components/primitives/section";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { JsonLd } from "@/components/seo/json-ld";
import type { Locale } from "@/i18n/routing";
import {
  getCourses,
  getDownloads,
  getMediaAssetById,
} from "@/lib/content/queries";
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
  masterclassDescription: string;
  masterclassTitle: string;
  nextDateLabel: string;
  professionalDescription: string;
  professionalTitle: string;
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
  const heroImage = getMediaAssetById("xiomara-formadora-tablet", locale);

  if (
    !heroImage?.publicPath ||
    !heroImage.width ||
    !heroImage.height
  ) {
    notFound();
  }
  const downloads = getDownloads(locale).filter(
    (download) => download.type === "course_pdf",
  );
  const downloadByCourseId = new Map(
    downloads.map((download) => [download.courseId, download]),
  );
  const professionalCourses = courses.filter(
    (course) => course.kind === "professional",
  );
  const masterclasses = courses.filter(
    (course) => course.kind === "masterclass",
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

  const renderCourseCard = (course: (typeof courses)[number]) => {
    const download = downloadByCourseId.get(course.downloadId);
    const image = getMediaAssetById(course.imageId, locale);

    if (!image?.publicPath || !image.width || !image.height) {
      notFound();
    }

    return (
      <CourseCard
        certification={course.certification}
        detailHref={buildCoursePath(locale, course.slug)}
        detailLabel={copy.courseDetailLabel}
        downloadHref={download?.publicPath}
        downloadLabel={download ? copy.downloadLabel : undefined}
        duration={course.duration.label}
        image={{
          alt: image.alt,
          height: image.height,
          src: image.publicPath,
          width: image.width,
        }}
        summary={course.summary}
        title={course.name}
      />
    );
  };

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
        aside={
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
            <Image
              alt={heroImage.alt}
              className="h-full w-full object-cover object-top"
              height={heroImage.height}
              priority
              sizes="(min-width: 1024px) 34vw, 92vw"
              src={heroImage.publicPath}
              width={heroImage.width}
            />
          </div>
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

          <section aria-labelledby="professional-training-title">
            <div className="max-w-3xl">
              <h2
                className="font-display text-4xl leading-tight text-foreground"
                id="professional-training-title"
              >
                {copy.professionalTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {copy.professionalDescription}
              </p>
            </div>
            <StaggerList className="mt-7 grid gap-5 lg:grid-cols-2">
              {professionalCourses.map((course) => (
                <StaggerListItem key={course.id}>
                  {renderCourseCard(course)}
                </StaggerListItem>
              ))}
            </StaggerList>
          </section>

          <section aria-labelledby="masterclass-training-title">
            <div className="max-w-3xl border-t border-primary/30 pt-8">
              <h2
                className="font-display text-4xl leading-tight text-foreground"
                id="masterclass-training-title"
              >
                {copy.masterclassTitle}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {copy.masterclassDescription}
              </p>
            </div>
            <StaggerList className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {masterclasses.map((course) => (
                <StaggerListItem key={course.id}>
                  {renderCourseCard(course)}
                </StaggerListItem>
              ))}
            </StaggerList>
          </section>

          <section
            aria-labelledby="training-next-date"
            className="rounded-2xl bg-primary-soft p-6"
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
