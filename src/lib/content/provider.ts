import { analyticsSettings } from "@/content/analytics-settings";
import { cookieCategories } from "@/content/cookie-consent";
import { courses } from "@/content/courses";
import { downloads } from "@/content/downloads";
import { events } from "@/content/events";
import { legalPages } from "@/content/legal-pages";
import { legalProfile } from "@/content/legal-profile";
import { locations } from "@/content/locations";
import { markets } from "@/content/markets";
import { mediaAssets } from "@/content/media";
import { googleReviewProfiles, reviews } from "@/content/reviews";
import { seoEntries } from "@/content/seo";
import { serviceCategories } from "@/content/service-categories";
import { services } from "@/content/services";
import { socialLinks } from "@/content/social-links";
import { siteSettings } from "@/content/site-settings";
import { whatsappTargets } from "@/content/whatsapp-targets";

export type ContentProvider = {
  analyticsSettings: typeof analyticsSettings;
  cookieCategories: typeof cookieCategories;
  courses: typeof courses;
  downloads: typeof downloads;
  events: typeof events;
  legalPages: typeof legalPages;
  legalProfile: typeof legalProfile;
  locations: typeof locations;
  markets: typeof markets;
  googleReviewProfiles: typeof googleReviewProfiles;
  mediaAssets: typeof mediaAssets;
  reviews: typeof reviews;
  seoEntries: typeof seoEntries;
  serviceCategories: typeof serviceCategories;
  services: typeof services;
  socialLinks: typeof socialLinks;
  siteSettings: typeof siteSettings;
  whatsappTargets: typeof whatsappTargets;
};

export const localContentProvider: ContentProvider = {
  analyticsSettings,
  cookieCategories,
  courses,
  downloads,
  events,
  legalPages,
  legalProfile,
  locations,
  markets,
  googleReviewProfiles,
  mediaAssets,
  reviews,
  seoEntries,
  serviceCategories,
  services,
  socialLinks,
  siteSettings,
  whatsappTargets,
};
