import {
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "./config";
import type { AppLocale } from "@/i18n/routing";

const META: Record<
  AppLocale,
  { description: string; businessDescription: string; knowsAbout: string[] }
> = {
  es: {
    description:
      "Especialista internacional en micropigmentación de cejas, labios y mirada. España, Europa y Colombia. Reserva por WhatsApp — web completa muy pronto.",
    businessDescription:
      "Micropigmentación estética de cejas, labios y mirada. Especialista internacional con jornadas en España, Europa y Colombia.",
    knowsAbout: [
      "Micropigmentación de cejas",
      "Micropigmentación labial",
      "Diseño de cejas",
      "Lifting de pestañas",
      "Delineado de ojos",
    ],
  },
  en: {
    description:
      "International specialist in eyebrow, lip and eye micropigmentation. Spain, Europe and Colombia. Book via WhatsApp — full website coming soon.",
    businessDescription:
      "Aesthetic eyebrow, lip and eye micropigmentation. International specialist with tour dates in Spain, Europe and Colombia.",
    knowsAbout: [
      "Eyebrow micropigmentation",
      "Lip micropigmentation",
      "Brow design",
      "Lash lift",
      "Eye liner",
    ],
  },
};

export function getMetaDescription(locale: AppLocale): string {
  return META[locale].description;
}

export function getStructuredData(locale: AppLocale) {
  const meta = META[locale];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: meta.description,
        inLanguage: locale,
      },
      {
        "@type": "BeautySalon",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        description: meta.businessDescription,
        url: SITE_URL,
        telephone: WHATSAPP_DISPLAY,
        sameAs: [INSTAGRAM_URL],
        areaServed: [
          { "@type": "Country", name: locale === "es" ? "España" : "Spain" },
          { "@type": "Country", name: "Colombia" },
          { "@type": "Place", name: locale === "es" ? "Europa" : "Europe" },
        ],
        knowsAbout: meta.knowsAbout,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${WHATSAPP_NUMBER}`,
          contactType: "reservas",
          availableLanguage: ["Spanish", "English"],
        },
      },
    ],
  };
}
