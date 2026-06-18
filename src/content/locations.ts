import { locationSchema, type Location } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const locations = locationSchema.array().parse([
  {
    id: "cali",
    marketId: "colombia",
    country: l("Colombia", "Colombia"),
    city: l("Cali", "Cali"),
    region: l("Valle del Cauca", "Valle del Cauca"),
    type: "physical_studio",
    address: l(
      "Calle 9 # 32 A 16, local 118, barrio El Templete",
      "Calle 9 # 32 A 16, local 118, El Templete neighborhood",
    ),
    coordinates: { lat: 3.4516, lng: -76.532 },
    notes: l(
      "Sede fisica y direccion legal de la web.",
      "Physical studio and legal address for the website.",
    ),
  },
  {
    id: "restrepo-valle",
    marketId: "colombia",
    country: l("Colombia", "Colombia"),
    city: l("Restrepo", "Restrepo"),
    region: l("Valle del Cauca", "Valle del Cauca"),
    type: "journey_availability",
    coordinates: { lat: 3.822, lng: -76.522 },
    notes: l(
      "Proxima jornada por disponibilidad. No es sede fija.",
      "Upcoming session by availability. It is not a fixed studio.",
    ),
  },
  {
    id: "madrid",
    marketId: "espana-europa",
    country: l("España", "Spain"),
    city: l("Madrid", "Madrid"),
    type: "journey_availability",
    coordinates: { lat: 40.4168, lng: -3.7038 },
    notes: l(
      "Proxima jornada por disponibilidad. No hay sede fisica fija en España.",
      "Upcoming session by availability. There is no fixed physical studio in Spain.",
    ),
  },
  {
    id: "palma-mallorca",
    marketId: "espana-europa",
    country: l("España", "Spain"),
    city: l("Palma de Mallorca", "Palma de Mallorca"),
    type: "journey_availability",
    coordinates: { lat: 39.5696, lng: 2.6502 },
    notes: l(
      "Proxima jornada por disponibilidad. No es sede fija.",
      "Upcoming session by availability. It is not a fixed studio.",
    ),
  },
  {
    id: "puerto-sagunto",
    marketId: "espana-europa",
    country: l("España", "Spain"),
    city: l("Puerto de Sagunto", "Puerto de Sagunto"),
    region: l("Valencia", "Valencia"),
    type: "journey_availability",
    coordinates: { lat: 39.659, lng: -0.2202 },
    notes: l(
      "Proxima jornada por disponibilidad. No es sede fija.",
      "Upcoming session by availability. It is not a fixed studio.",
    ),
  },
  {
    id: "ginebra",
    marketId: "suiza",
    country: l("Suiza", "Switzerland"),
    city: l("Ginebra", "Geneva"),
    type: "journey_availability",
    coordinates: { lat: 46.2044, lng: 6.1432 },
    notes: l(
      "Proxima jornada por disponibilidad en Suiza. No es sede fija.",
      "Upcoming session by availability in Switzerland. It is not a fixed studio.",
    ),
  },
] satisfies Location[]);
