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
      "Sede fisica en Cali y servicios del catalogo Colombia.",
      "Physical studio in Cali and services from the Colombia catalog.",
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
      "Jornadas por disponibilidad y servicios con precios en euros.",
      "Availability-based sessions and services priced in euros.",
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
      "Jornadas por disponibilidad en Ginebra y servicios confirmados en CHF.",
      "Availability-based sessions in Geneva and confirmed CHF services.",
    ),
  },
] satisfies Market[]);
