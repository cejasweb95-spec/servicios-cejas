import type { Duration, Locale } from "@/lib/content/schema";

export function formatDuration(duration: Duration, locale: Locale) {
  return duration.label[locale];
}
