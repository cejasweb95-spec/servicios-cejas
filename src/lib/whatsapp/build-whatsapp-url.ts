import { whatsappTargetSchema, type LocalizedString, type Locale } from "@/lib/content/schema";

type BuildWhatsAppUrlInput = {
  phoneE164: string;
  message: LocalizedString;
  locale: Locale;
};

export function buildWhatsAppUrl({
  phoneE164,
  message,
  locale,
}: BuildWhatsAppUrlInput) {
  const target = whatsappTargetSchema
    .pick({
      phoneE164: true,
      label: true,
      defaultMessage: true,
      id: true,
    })
    .partial({
      label: true,
      defaultMessage: true,
      id: true,
    })
    .parse({ phoneE164 });

  return `https://wa.me/${target.phoneE164}?text=${encodeURIComponent(message[locale])}`;
}

export function buildWhatsAppHref(phoneE164: string, message: string) {
  const target = whatsappTargetSchema
    .pick({
      phoneE164: true,
    })
    .parse({ phoneE164 });

  return `https://wa.me/${target.phoneE164}?text=${encodeURIComponent(message)}`;
}
