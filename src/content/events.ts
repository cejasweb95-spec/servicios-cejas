import {
  eventAvailabilitySchema,
  type EventAvailability,
} from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const events = eventAvailabilitySchema.array().parse([
  "restrepo-valle",
  "madrid",
  "palma-mallorca",
  "puerto-sagunto",
  "ginebra",
].map((locationId) => ({
  id: `availability-${locationId}`,
  locationId,
  status: "by_availability",
  label: l(
    "Proxima jornada por disponibilidad",
    "Upcoming session by availability",
  ),
})) satisfies EventAvailability[]);
