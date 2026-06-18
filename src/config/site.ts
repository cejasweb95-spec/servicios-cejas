import { defaultLocale, locales, type Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "Cejas Internacionales",
  ownerName: "Xiomara",
  defaultLocale,
  locales,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "contacto@cejasinternacionales.com",
  legalId: "NIT 1.144.186.472-5",
  address: "Calle 9 # 32 A 16 local 118, barrio El Templete, Cali, Valle del Cauca, Colombia",
  whatsapp: {
    colombia: "573167742299",
    europe: "34603804837",
  },
  social: {
    instagram: "https://www.instagram.com/cejasinternacionales/",
    facebook: "https://www.facebook.com/share/1G425xaA7s/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@cejasinternacionales?_r=1&_t=ZS-97EwJJASFNc",
  },
} as const;

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export function getLocalizedUrl(locale: Locale, path = "") {
  return new URL(`/${locale}${path}`, siteConfig.url).toString();
}
