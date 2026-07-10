import { legalPageSchema, type LegalPage } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const legalPages = legalPageSchema.array().parse([
  {
    type: "legal_notice",
    slug: l("aviso-legal", "legal-notice"),
    title: l("Aviso legal", "Legal notice"),
    summary: l(
      "Información del titular, finalidad informativa de la web, propiedad intelectual y enlaces externos.",
      "Owner details, informational purpose of the site, intellectual property and external links.",
    ),
    status: "published",
  },
  {
    type: "privacy",
    slug: l("privacidad", "privacy"),
    title: l("Política de privacidad", "Privacy policy"),
    summary: l(
      "Tratamiento de datos por WhatsApp, email, hosting y analítica solo con consentimiento.",
      "Data processing through WhatsApp, email, hosting and analytics only with consent.",
    ),
    status: "published",
  },
  {
    type: "cookies",
    slug: l("cookies", "cookies"),
    title: l("Política de cookies", "Cookie policy"),
    summary: l(
      "Categorías de cookies, consentimiento, GA4 y retirada de preferencias.",
      "Cookie categories, consent, GA4 and preference withdrawal.",
    ),
    status: "published",
  },
] satisfies LegalPage[]);
