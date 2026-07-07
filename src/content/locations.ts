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
    studioRole: "primary",
    mediaId: "estudio-cabina-certificados",
    address: l(
      "Calle 9 # 32 A 16, local 118, barrio El Templete",
      "Calle 9 # 32 A 16, local 118, El Templete neighborhood",
    ),
    coordinates: { lat: 3.4516, lng: -76.532 },
    notes: l(
      "Sede principal y dirección legal.",
      "Main studio and legal address.",
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
      "Atención internacional por cita previa vía WhatsApp.",
      "International appointments by prior contact via WhatsApp.",
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
      "Atención internacional por cita previa vía WhatsApp.",
      "International appointments by prior contact via WhatsApp.",
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
      "Atención internacional por cita previa vía WhatsApp.",
      "International appointments by prior contact via WhatsApp.",
    ),
  },
  {
    id: "puerto-sagunto",
    marketId: "espana-europa",
    country: l("España", "Spain"),
    city: l("Puerto de Sagunto", "Puerto de Sagunto"),
    region: l("Valencia", "Valencia"),
    type: "physical_studio",
    studioRole: "secondary",
    mediaId: "estudio-puerto-sagunto-portada",
    address: l(
      "Carrer Catalunya, 24, 46520 Puerto de Sagunto, Valencia",
      "Carrer Catalunya, 24, 46520 Puerto de Sagunto, Valencia",
    ),
    coordinates: { lat: 39.659, lng: -0.2202 },
    notes: l(
      "Segunda sede física en España. Cabina dentro de un local compartido; atención con cita previa por WhatsApp.",
      "Second physical studio in Spain. Treatment room inside a shared premises; appointments via WhatsApp.",
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
      "Atención internacional por cita previa vía WhatsApp.",
      "International appointments by prior contact via WhatsApp.",
    ),
  },
] satisfies Location[]);
