import {
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "./config";

export const META_DESCRIPTION =
  "Especialista internacional en micropigmentación de cejas, labios y mirada. España, Europa y Colombia. Reserva por WhatsApp — web completa muy pronto.";

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: META_DESCRIPTION,
        inLanguage: "es",
      },
      {
        "@type": "BeautySalon",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        description:
          "Micropigmentación estética de cejas, labios y mirada. Especialista internacional con jornadas en España, Europa y Colombia.",
        url: SITE_URL,
        telephone: WHATSAPP_DISPLAY,
        sameAs: [INSTAGRAM_URL],
        areaServed: [
          { "@type": "Country", name: "España" },
          { "@type": "Country", name: "Colombia" },
          { "@type": "Place", name: "Europa" },
        ],
        knowsAbout: [
          "Micropigmentación de cejas",
          "Micropigmentación labial",
          "Diseño de cejas",
          "Lifting de pestañas",
          "Delineado de ojos",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${WHATSAPP_NUMBER}`,
          contactType: "reservas",
          availableLanguage: ["Spanish"],
        },
      },
    ],
  };
}
