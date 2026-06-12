export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cejasinternacionales.com";

export const SITE_NAME = "Cejas Internacionales";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34603804837";

export const WHATSAPP_DISPLAY = "+34 603 80 48 37";

export const WHATSAPP_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
  "Hola, quiero reservar o pedir información sobre micropigmentación en Cejas Internacionales.";

export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/cejasinternacionales";

export const INSTAGRAM_HANDLE = "cejasinternacionales";

export function getWhatsAppUrl(message: string = WHATSAPP_MESSAGE): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
