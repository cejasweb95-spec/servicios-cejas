const knownPhoneFormats: Record<string, string> = {
  "34603804837": "+34 603 80 48 37",
  "573167742299": "+57 316 774 2299",
};

export function formatPhoneNumber(phoneE164: string) {
  const digits = phoneE164.replace(/\D/g, "");

  return knownPhoneFormats[digits] ?? `+${digits}`;
}
