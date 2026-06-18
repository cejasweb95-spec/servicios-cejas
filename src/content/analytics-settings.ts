import {
  analyticsSettingsSchema,
  type AnalyticsSettings,
} from "@/lib/content/schema";

export const analyticsSettings = analyticsSettingsSchema.parse({
  provider: "ga4",
  measurementIdEnv: "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  defaultConsent: "denied",
  piiForbidden: true,
  allowedEvents: [
    "whatsapp_click",
    "catalog_download",
    "course_pdf_download",
    "market_select",
    "language_switch",
    "map_location_select",
    "course_interest",
  ],
} satisfies AnalyticsSettings);
