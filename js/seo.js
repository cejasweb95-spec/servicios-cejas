import {
  SITE_URL,
  SITE_NAME,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
} from "./config.js";

const META_DESCRIPTION =
  "Especialista internacional en micropigmentación de cejas, labios y mirada. España, Europa y Colombia. Reserva por WhatsApp — web completa muy pronto.";

export function initSeo() {
  if (!SITE_URL) return;

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = SITE_URL + "/";

  document.querySelectorAll("[data-og-url]").forEach((el) => {
    el.setAttribute("content", SITE_URL + "/");
  });

  injectStructuredData();
}

function injectStructuredData() {
  const schema = {
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
          areaServed: ["ES", "CO", "EU"],
        },
      },
    ],
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
