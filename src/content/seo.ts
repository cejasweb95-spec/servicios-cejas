import { seoEntrySchema, type SeoEntry } from "@/lib/content/schema";

export const seoEntries = seoEntrySchema.array().parse([
  {
    route: "/es",
    locale: "es",
    title: "Cejas Internacionales | Micropigmentación y formaciones",
    description:
      "Micropigmentación, belleza especializada y formaciones con sede en Cali y jornadas por disponibilidad en Colombia, España y Suiza.",
    keywords: [
      "micropigmentación cejas Cali",
      "micropigmentación cejas Madrid",
      "micropigmentación cejas Ginebra",
      "cursos micropigmentación",
    ],
  },
  {
    route: "/en",
    locale: "en",
    title: "Cejas Internacionales | Micropigmentation and training",
    description:
      "Specialized micropigmentation, beauty services and professional training from Cali, with sessions by availability in Colombia, Spain and Switzerland.",
    keywords: [
      "brow micropigmentation Cali",
      "brow micropigmentation Madrid",
      "eyebrow micropigmentation Geneva",
      "micropigmentation training",
    ],
  },
] satisfies SeoEntry[]);
