import { analyticsSettings } from "@/content/analytics-settings";
import { cookieCategories } from "@/content/cookie-consent";
import { courses } from "@/content/courses";
import { downloads } from "@/content/downloads";
import { events } from "@/content/events";
import { legalPages } from "@/content/legal-pages";
import { locations } from "@/content/locations";
import { markets } from "@/content/markets";
import { mediaAssets, serviceCategoryMediaIds } from "@/content/media";
import { googleReviewProfiles, reviews } from "@/content/reviews";
import { seoEntries } from "@/content/seo";
import { serviceCategories } from "@/content/service-categories";
import { services } from "@/content/services";
import { socialLinks } from "@/content/social-links";
import { whatsappTargets } from "@/content/whatsapp-targets";
import type { CurrencyCode, MarketId, Service } from "@/lib/content/schema";
import { marketCurrency } from "@/lib/format/market";

type ContentDataset = {
  services: Service[];
};

const swissForbiddenServiceIds = new Set([
  "hidralips-tres-sesiones",
  "hidralips-una-sesion",
  "correccion-cejas",
]);

const swissForbiddenCategoryIds = new Set(["depilacion-corporal"]);

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }

    seen.add(value);
  }
}

export function assertMarketOfferRules(dataset: ContentDataset) {
  for (const service of dataset.services) {
    for (const offer of service.offers) {
      const expectedCurrency: CurrencyCode = marketCurrency[offer.marketId];

      if (offer.price.currency !== expectedCurrency) {
        throw new Error(
          `${service.id} has ${offer.price.currency} for ${offer.marketId}; expected ${expectedCurrency}`,
        );
      }

      for (const addon of offer.addons) {
        if (addon.price.currency !== expectedCurrency) {
          throw new Error(
            `${service.id}/${addon.id} has ${addon.price.currency} for ${offer.marketId}; expected ${expectedCurrency}`,
          );
        }
      }

      if (
        offer.marketId === "suiza" &&
        (swissForbiddenServiceIds.has(service.id) ||
          swissForbiddenCategoryIds.has(service.categoryId))
      ) {
        throw new Error(`${service.id} must not be available in Switzerland`);
      }
    }
  }
}

function assertReferences() {
  const marketIds = new Set<MarketId>(markets.map((market) => market.id));
  const categoryIds = new Set(serviceCategories.map((category) => category.id));
  const serviceIds = new Set(services.map((service) => service.id));
  const courseIds = new Set(courses.map((course) => course.id));
  const downloadIds = new Set(downloads.map((download) => download.id));
  const mediaIds = new Set(mediaAssets.map((asset) => asset.id));
  const locationIds = new Set(locations.map((location) => location.id));
  const whatsappTargetIds = new Set(whatsappTargets.map((target) => target.id));

  for (const [categoryId, mediaId] of Object.entries(serviceCategoryMediaIds)) {
    if (!categoryIds.has(categoryId)) {
      throw new Error(`Unknown service category media key: ${categoryId}`);
    }

    if (!mediaIds.has(mediaId)) {
      throw new Error(`Unknown service category media asset: ${mediaId}`);
    }
  }

  for (const market of markets) {
    if (!whatsappTargetIds.has(market.whatsappTargetId)) {
      throw new Error(`Market ${market.id} references missing WhatsApp target`);
    }
  }

  for (const category of serviceCategories) {
    assertUnique([category.slug.es, category.slug.en], `${category.id} localized slugs`);
  }

  for (const service of services) {
    if (!categoryIds.has(service.categoryId)) {
      throw new Error(`Service ${service.id} references missing category ${service.categoryId}`);
    }

    if (
      service.careGuide === "micropigmentation-brows" &&
      service.categoryId !== "micropigmentacion-cejas"
    ) {
      throw new Error(`Service ${service.id} has an invalid brow care guide`);
    }

    if (
      service.careGuide === "micropigmentation-lips" &&
      service.categoryId !== "labios"
    ) {
      throw new Error(`Service ${service.id} has an invalid lip care guide`);
    }

    for (const offer of service.offers) {
      if (!marketIds.has(offer.marketId)) {
        throw new Error(`Service ${service.id} references missing market ${offer.marketId}`);
      }
    }
  }

  for (const course of courses) {
    if (!mediaIds.has(course.imageId)) {
      throw new Error(`Course ${course.id} references missing media ${course.imageId}`);
    }

    if (!downloadIds.has(course.downloadId)) {
      throw new Error(`Course ${course.id} references missing download ${course.downloadId}`);
    }

    for (const offer of course.offers) {
      if (!marketIds.has(offer.marketId)) {
        throw new Error(`Course ${course.id} references missing market ${offer.marketId}`);
      }
    }
  }

  for (const download of downloads) {
    if (download.courseId && !courseIds.has(download.courseId)) {
      throw new Error(`Download ${download.id} references missing course ${download.courseId}`);
    }

    if (download.marketId && !marketIds.has(download.marketId)) {
      throw new Error(`Download ${download.id} references missing market ${download.marketId}`);
    }
  }

  for (const event of events) {
    if (!locationIds.has(event.locationId)) {
      throw new Error(`Event ${event.id} references missing location ${event.locationId}`);
    }

    if (event.status === "by_availability" && (event.date || event.capacity)) {
      throw new Error(`Event ${event.id} invents date/capacity for by-availability status`);
    }
  }

  const reviewProfileIds = new Set(googleReviewProfiles.map((profile) => profile.id));

  for (const profile of googleReviewProfiles) {
    if (!locationIds.has(profile.locationId)) {
      throw new Error(
        `Review profile ${profile.id} references missing location ${profile.locationId}`,
      );
    }

    if (!profile.writeReviewUrl.includes(profile.placeId)) {
      throw new Error(`Review profile ${profile.id} write URL does not match its place ID`);
    }
  }

  for (const review of reviews) {
    if (!reviewProfileIds.has(review.profileId)) {
      throw new Error(`Review ${review.id} references missing profile ${review.profileId}`);
    }
  }

  for (const item of [...downloads, ...mediaAssets]) {
    if (!item.sourcePath) {
      throw new Error(`Asset/download ${item.id} has empty source path`);
    }
  }

  for (const item of socialLinks) {
    if (!item.href) {
      throw new Error(`Social link ${item.id} has empty href`);
    }
  }

  if (legalPages.length !== 3) {
    throw new Error("Expected legal notice, privacy and cookies pages");
  }

  if (!analyticsSettings.piiForbidden) {
    throw new Error("GA4 events must forbid PII");
  }

  for (const category of cookieCategories) {
    if (category.id !== "necessary" && category.enabledByDefault) {
      throw new Error(`Cookie category ${category.id} must not be enabled by default`);
    }
  }

  if (!serviceIds.size) {
    throw new Error("Services dataset cannot be empty");
  }
}

export function validateContent() {
  assertUnique(markets.map((market) => market.id), "market id");
  assertUnique(serviceCategories.map((category) => category.id), "service category id");
  assertUnique(services.map((service) => service.id), "service id");
  assertUnique(courses.map((course) => course.id), "course id");
  assertUnique(downloads.map((download) => download.id), "download id");
  assertUnique(locations.map((location) => location.id), "location id");

  for (const location of locations) {
    if (location.type !== "physical_studio" || !location.mediaId) {
      continue;
    }

    const media = mediaAssets.find((asset) => asset.id === location.mediaId);
    if (!media) {
      throw new Error(
        `Location ${location.id} references missing media ${location.mediaId}`,
      );
    }
  }
  assertUnique(whatsappTargets.map((target) => target.id), "WhatsApp target id");
  assertUnique(googleReviewProfiles.map((profile) => profile.id), "review profile id");
  assertUnique(reviews.map((review) => review.id), "review id");
  assertUnique(seoEntries.map((entry) => `${entry.locale}:${entry.route}`), "SEO entry");
  assertMarketOfferRules({ services });
  assertReferences();

  return true;
}
