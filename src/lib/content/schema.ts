import { z } from "zod";

export const localeSchema = z.enum(["es", "en"]);
export type Locale = z.infer<typeof localeSchema>;

export const marketIdSchema = z.enum(["colombia", "espana-europa", "suiza"]);
export type MarketId = z.infer<typeof marketIdSchema>;

export const currencySchema = z.enum(["COP", "EUR", "CHF"]);
export type CurrencyCode = z.infer<typeof currencySchema>;

export const localizedStringSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});
export type LocalizedString = z.infer<typeof localizedStringSchema>;

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const priceSchema = z
  .object({
    amount: z.number().positive().optional(),
    currency: currencySchema,
    label: localizedStringSchema.optional(),
    note: localizedStringSchema.optional(),
  })
  .refine((price) => price.amount !== undefined || price.label !== undefined, {
    message: "Price requires amount or label",
  });
export type Price = z.infer<typeof priceSchema>;

export const durationSchema = z.object({
  minutes: z.number().int().positive().optional(),
  maxMinutes: z.number().int().positive().optional(),
  days: z.number().int().positive().optional(),
  label: localizedStringSchema,
  note: localizedStringSchema.optional(),
});
export type Duration = z.infer<typeof durationSchema>;

export const marketSchema = z.object({
  id: marketIdSchema,
  slug: localizedStringSchema,
  name: localizedStringSchema,
  shortName: localizedStringSchema,
  countryLabel: localizedStringSchema,
  currency: currencySchema,
  whatsappTargetId: z.string().min(1),
  description: localizedStringSchema,
});
export type Market = z.infer<typeof marketSchema>;

export const serviceCategorySchema = z.object({
  id: z.string().min(1),
  slug: localizedStringSchema,
  name: localizedStringSchema,
  description: localizedStringSchema,
  order: z.number().int().nonnegative(),
});
export type ServiceCategory = z.infer<typeof serviceCategorySchema>;

export const serviceOfferSchema = z.object({
  marketId: marketIdSchema,
  price: priceSchema,
  appointmentDuration: durationSchema,
  notes: localizedStringSchema.optional(),
  addons: z
    .array(
      z.object({
        id: z.string().min(1),
        name: localizedStringSchema,
        price: priceSchema,
      }),
    )
    .default([]),
});
export type ServiceOffer = z.infer<typeof serviceOfferSchema>;

export const serviceSchema = z.object({
  id: z.string().min(1),
  slug: localizedStringSchema,
  categoryId: z.string().min(1),
  name: localizedStringSchema,
  shortDescription: localizedStringSchema,
  longDescription: localizedStringSchema.optional(),
  resultDuration: localizedStringSchema.optional(),
  sourceNote: localizedStringSchema.optional(),
  careGuide: z.enum(["micropigmentation-brows", "micropigmentation-lips"]).optional(),
  featured: z.boolean().default(false),
  offers: z.array(serviceOfferSchema).min(1),
});
export type Service = z.infer<typeof serviceSchema>;

export const courseOfferSchema = z.object({
  marketId: marketIdSchema,
  modality: z.enum(["virtual", "presencial", "personalizada"]),
  withKit: priceSchema.optional(),
  withoutKit: priceSchema.optional(),
});
export type CourseOffer = z.infer<typeof courseOfferSchema>;

export const courseSchema = z.object({
  id: z.string().min(1),
  imageId: z.string().min(1),
  kind: z.enum(["professional", "masterclass"]),
  slug: localizedStringSchema,
  name: localizedStringSchema,
  summary: localizedStringSchema,
  duration: durationSchema,
  certification: localizedStringSchema,
  modalities: z.array(z.enum(["virtual", "presencial", "personalizada"])).min(1),
  modules: z.array(localizedStringSchema).min(1),
  includes: z.array(localizedStringSchema).min(1),
  offers: z.array(courseOfferSchema).min(1),
  downloadId: z.string().min(1),
});
export type Course = z.infer<typeof courseSchema>;

export const locationSchema = z.object({
  id: z.string().min(1),
  marketId: marketIdSchema,
  country: localizedStringSchema,
  city: localizedStringSchema,
  region: localizedStringSchema.optional(),
  type: z.enum(["physical_studio", "journey_availability"]),
  address: localizedStringSchema.optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
  notes: localizedStringSchema,
});
export type Location = z.infer<typeof locationSchema>;

export const eventAvailabilitySchema = z.object({
  id: z.string().min(1),
  locationId: z.string().min(1),
  status: z.enum(["by_availability", "open", "full", "completed", "cancelled"]),
  label: localizedStringSchema,
  date: z.string().date().optional(),
  capacity: z.number().int().positive().optional(),
});
export type EventAvailability = z.infer<typeof eventAvailabilitySchema>;

export const downloadSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["catalog", "course_pdf", "legal"]),
  marketId: marketIdSchema.optional(),
  courseId: z.string().min(1).optional(),
  title: localizedStringSchema,
  description: localizedStringSchema,
  publicPath: z.string().startsWith("/").endsWith(".pdf"),
  sourcePath: z.string().min(1),
  fileSizeBytes: z.number().int().positive().optional(),
});
export type Download = z.infer<typeof downloadSchema>;

export const mediaAssetSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["logo", "photo", "gallery", "course", "social", "map"]),
  sourcePath: z.string().min(1),
  publicPath: z.string().startsWith("/").optional(),
  alt: localizedStringSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});
export type MediaAsset = z.infer<typeof mediaAssetSchema>;

export const whatsappTargetSchema = z.object({
  id: z.string().min(1),
  label: localizedStringSchema,
  phoneE164: z.string().regex(/^[1-9]\d{7,14}$/),
  defaultMessage: localizedStringSchema,
});
export type WhatsAppTarget = z.infer<typeof whatsappTargetSchema>;

export const socialLinkSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  href: z.string().url(),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;

export const legalProfileSchema = z.object({
  ownerName: z.string().min(1),
  brandName: z.string().min(1),
  taxId: z.string().min(1),
  address: localizedStringSchema,
  email: z.string().email(),
  phoneColombia: z.string().min(1),
  note: localizedStringSchema,
});
export type LegalProfile = z.infer<typeof legalProfileSchema>;

export const legalPageSchema = z.object({
  type: z.enum(["legal_notice", "privacy", "cookies"]),
  slug: localizedStringSchema,
  title: localizedStringSchema,
  summary: localizedStringSchema,
  status: z.enum(["draft", "ready_for_legal_review", "published"]),
});
export type LegalPage = z.infer<typeof legalPageSchema>;

export const analyticsSettingsSchema = z.object({
  provider: z.literal("ga4"),
  measurementIdEnv: z.literal("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  defaultConsent: z.literal("denied"),
  allowedEvents: z.array(z.string().min(1)),
  piiForbidden: z.boolean(),
});
export type AnalyticsSettings = z.infer<typeof analyticsSettingsSchema>;

export const cookieCategorySchema = z.object({
  id: z.enum(["necessary", "analytics", "preferences", "marketing"]),
  required: z.boolean(),
  enabledByDefault: z.boolean(),
  title: localizedStringSchema,
  description: localizedStringSchema,
});
export type CookieCategory = z.infer<typeof cookieCategorySchema>;

export const seoEntrySchema = z.object({
  route: z.string().startsWith("/"),
  locale: localeSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string().min(1)).default([]),
});
export type SeoEntry = z.infer<typeof seoEntrySchema>;
