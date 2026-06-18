export function formatFileSize(bytes: number | undefined, locale: string) {
  if (!bytes) {
    return undefined;
  }

  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    maximumFractionDigits: bytes >= 1_000_000 ? 1 : 0,
    style: "unit",
    unit: bytes >= 1_000_000 ? "megabyte" : "kilobyte",
    unitDisplay: "short",
  }).format(bytes >= 1_000_000 ? bytes / 1_000_000 : bytes / 1_000);
}
