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
      "Sede física y dirección legal.",
      "Physical studio and legal address.",
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
      "Próxima jornada por disponibilidad. No es una sede fija.",
      "Appointments are subject to availability. This is not a permanent studio.",
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
      "Próxima jornada por disponibilidad. No hay sede física fija en España.",
      "Appointments are subject to availability. There is no permanent studio in Spain.",
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
      "Próxima jornada por disponibilidad. No es una sede fija.",
      "Appointments are subject to availability. This is not a permanent studio.",
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
      "Próxima jornada por disponibilidad. No es una sede fija.",
      "Appointments are subject to availability. This is not a permanent studio.",
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
      "Próxima jornada por disponibilidad en Suiza. No es una sede fija.",
      "Appointments in Switzerland are subject to availability. This is not a permanent studio.",
    ),
  },
] satisfies Location[]);
