import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { CourseEditorialFeature } from "@/components/domain/course-editorial-feature";
import { WhatsAppChooser } from "@/components/domain/whatsapp-chooser";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger-list";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { PageHero } from "@/components/primitives/page-hero";
import { RoseWash } from "@/components/primitives/rose-wash";
import { Section } from "@/components/primitives/section";
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
  modulesTitle: string;
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

  if (!heroImage?.publicPath || !heroImage.width || !heroImage.height) {
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

  const renderEditorialCourse = (
    course: (typeof courses)[number],
    options: {
      featured?: boolean;
      reverse?: boolean;
      variant?: "showcase" | "compact";
    } = {},
  ) => {
    const download = downloadByCourseId.get(course.downloadId);
    const image = getMediaAssetById(course.imageId, locale);

    if (!image?.publicPath || !image.width || !image.height) {
      notFound();
    }

    return (
      <CourseEditorialFeature
        certification={course.certification}
        detailHref={buildCoursePath(locale, course.slug)}
        detailLabel={copy.courseDetailLabel}
        downloadHref={download?.publicPath}
        downloadLabel={download ? copy.downloadLabel : undefined}
        duration={course.duration.label}
        featured={options.featured}
        image={{
          alt: image.alt,
          height: image.height,
          src: image.publicPath,
          width: image.width,
        }}
        modules={course.modules}
        modulesTitle={copy.modulesTitle}
        reverse={options.reverse}
        summary={course.summary}
        title={course.name}
        variant={options.variant}
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
          <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-surface shadow-soft">
            <div className="relative aspect-[3/4]">
              <Image
                alt={heroImage.alt}
                className="h-full w-full object-cover object-top"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, 92vw"
                src={heroImage.publicPath}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent"
              />
            </div>
          </div>
        }
        description={copy.description}
        eyebrow={copy.eyebrow}
        title={copy.title}
      />

      <Section tone="muted">
        <Container className="grid gap-12">
          <Breadcrumbs
            items={[{ label: copy.homeLabel, href: "/" }, { label: copy.title }]}
            label={copy.breadcrumbsLabel}
          />

          <section aria-labelledby="professional-training-title">
            <div className="max-w-3xl border-l-4 border-primary pl-5">
              <h2
                className="font-display text-4xl leading-tight text-foreground sm:text-5xl"
                id="professional-training-title"
              >
                {copy.professionalTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {copy.professionalDescription}
              </p>
            </div>
            <StaggerList className="mt-10 grid gap-14">
              {professionalCourses.map((course, index) => (
                <StaggerListItem key={course.id}>
                  <Reveal>
                    {renderEditorialCourse(course, {
                      featured: index === 0,
                      reverse: index % 2 === 1,
                      variant: "showcase",
                    })}
                  </Reveal>
                </StaggerListItem>
              ))}
            </StaggerList>
          </section>
        </Container>
      </Section>

      <Section tone="rose">
        <RoseWash accent="band-left">
          <Container className="grid gap-10">
            <section aria-labelledby="masterclass-training-title">
              <div className="max-w-3xl border-l-4 border-primary pl-5">
                <h2
                  className="font-display text-4xl leading-tight text-foreground sm:text-5xl"
                  id="masterclass-training-title"
                >
                  {copy.masterclassTitle}
                </h2>
                <p className="mt-4 text-base leading-8 text-foreground/80">
                  {copy.masterclassDescription}
                </p>
              </div>
              <StaggerList className="mt-10 grid gap-10">
                {masterclasses.map((course, index) => (
                  <StaggerListItem key={course.id}>
                    <Reveal>
                      <div
                        className={
                          index > 0
                            ? "border-t border-primary/25 pt-10"
                            : undefined
                        }
                      >
                        {renderEditorialCourse(course, {
                          reverse: index % 2 === 1,
                          variant: "compact",
                        })}
                      </div>
                    </Reveal>
                  </StaggerListItem>
                ))}
              </StaggerList>
            </section>

            <section
              aria-labelledby="training-next-date"
              className="rounded-2xl border border-primary/20 bg-surface/90 p-6 shadow-soft backdrop-blur-sm"
            >
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="max-w-2xl">
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
        </RoseWash>
      </Section>
    </main>
  );
}
