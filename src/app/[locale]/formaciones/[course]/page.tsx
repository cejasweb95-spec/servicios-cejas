import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CourseDetailPage } from "@/app/[locale]/_pages/course-detail-page";
import {
  getCourseById,
  getCourseBySlug,
  getCourses,
  getWhatsAppTargets,
} from "@/lib/content/queries";
import { buildCoursePath, courseBasePath } from "@/lib/routes/course-routes";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";

type CoursePageProps = {
  params: Promise<{ locale: string; course: string }>;
};

export function generateStaticParams() {
  return getCourses("es").map((course) => ({
    locale: "es",
    course: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { course: courseSlug, locale } = await params;

  if (locale !== "es") {
    notFound();
  }

  const course = getCourseBySlug(courseSlug, locale);

  if (!course) {
    notFound();
  }

  const englishCourse = getCourseById(course.id, "en");
  const t = await getTranslations({ locale, namespace: "CourseDetail" });

  return buildPageMetadata({
    locale,
    title: t("metaTitle", { course: course.name }),
    description: t("metaDescription", { course: course.name }),
    path: buildCoursePath(locale, course.slug),
    alternates: {
      es: buildCoursePath("es", course.slug),
      en: englishCourse ? buildCoursePath("en", englishCourse.slug) : courseBasePath.en,
    },
  });
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course, locale } = await params;

  if (locale !== "es") {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "CourseDetail" });
  const whatsappT = await getTranslations({ locale, namespace: "WhatsApp" });

  return (
    <CourseDetailPage
      copy={{
        backLabel: t("backLabel"),
        breadcrumbsLabel: t("breadcrumbsLabel"),
        certificationLabel: t("certificationLabel"),
        downloadDescription: t("downloadDescription"),
        downloadLabel: t("downloadLabel"),
        downloadTitle: t("downloadTitle"),
        durationLabel: t("durationLabel"),
        heroEyebrow: t("heroEyebrow"),
        homeLabel: t("homeLabel"),
        includesTitle: t("includesTitle"),
        marketsLabel: t("marketsLabel"),
        modalitiesLabel: t("modalitiesLabel"),
        modulesTitle: t("modulesTitle"),
        nextDateDescription: t("nextDateDescription"),
        nextDateLabel: t("nextDateLabel"),
        nextDateTitle: t("nextDateTitle"),
        notSpecifiedLabel: t("notSpecifiedLabel"),
        priceWithKitLabel: t("priceWithKitLabel"),
        priceWithoutKitLabel: t("priceWithoutKitLabel"),
        pricingTitle: t("pricingTitle"),
        trainingLabel: t("trainingLabel"),
        whatsappMessage: (courseName) => t("whatsappMessage", { course: courseName }),
      }}
      courseSlug={course}
      locale={locale}
      whatsapp={{
        closeLabel: whatsappT("close"),
        description: whatsappT("description"),
        targets: getWhatsAppTargets(locale),
        title: whatsappT("title"),
      }}
    />
  );
}
