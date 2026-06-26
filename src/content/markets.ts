import { marketSchema, type Market } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const markets = marketSchema.array().parse([
  {
    id: "colombia",
    slug: l("colombia", "colombia"),
    name: l("Colombia", "Colombia"),
    shortName: l("Colombia", "Colombia"),
    countryLabel: l("Colombia", "Colombia"),
    currency: "COP",
    whatsappTargetId: "colombia",
    description: l(
      "Atención en el punto físico de Cali y catálogo completo de Colombia.",
      "In-person service at the Cali studio and the full Colombia catalogue.",
    ),
  },
  {
    id: "espana-europa",
    slug: l("espana-europa", "spain-europe"),
    name: l("España / Europa", "Spain / Europe"),
    shortName: l("España", "Spain"),
    countryLabel: l("España y Europa", "Spain and Europe"),
    currency: "EUR",
    whatsappTargetId: "europa",
    description: l(
      "Servicios y catálogo con precios en euros para España y Europa.",
      "Services and catalogue priced in euros for Spain and Europe.",
    ),
  },
  {
    id: "suiza",
    slug: l("suiza", "switzerland"),
    name: l("Suiza", "Switzerland"),
    shortName: l("Suiza", "Switzerland"),
    countryLabel: l("Suiza", "Switzerland"),
    currency: "CHF",
    whatsappTargetId: "europa",
    description: l(
      "Servicios confirmados con precios en francos suizos (CHF).",
      "Confirmed services priced in Swiss francs (CHF).",
    ),
  },
] satisfies Market[]);
