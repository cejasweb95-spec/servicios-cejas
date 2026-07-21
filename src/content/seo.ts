import { seoEntrySchema, type SeoEntry } from "@/lib/content/schema";

export const seoEntries = seoEntrySchema.array().parse([
  {
    route: "/es",
    locale: "es",
    title: "Cejas Internacionales | Micropigmentación y formaciones",
    description:
      "Micropigmentación, belleza especializada y formaciones con sedes físicas en Cali y Puerto de Sagunto, y atención por cita en otras ciudades de Colombia, España y Suiza.",
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
      "Micropigmentation, beauty services and professional training from studios in Cali and Puerto de Sagunto, with appointments in selected cities.",
    keywords: [
      "brow micropigmentation Cali",
      "brow micropigmentation Madrid",
      "eyebrow micropigmentation Geneva",
      "micropigmentation training",
    ],
  },
] satisfies SeoEntry[]);
