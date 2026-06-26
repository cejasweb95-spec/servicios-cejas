import { type Locale } from "@/i18n/routing";

export type NavigationItem = {
  id: string;
  label: Record<Locale, string>;
  href: Record<Locale, string>;
};

export const mainNavigation = [
  {
    id: "home",
    label: { es: "Inicio", en: "Home" },
    href: { es: "/", en: "/" },
  },
  {
    id: "services",
    label: { es: "Servicios", en: "Services" },
    href: { es: "/servicios", en: "/services" },
  },
  {
    id: "training",
    label: { es: "Formaciones", en: "Training" },
    href: { es: "/formaciones", en: "/professional-training" },
  },
  {
    id: "journeys",
    label: { es: "Dónde me encuentras", en: "Where to find me" },
    href: { es: "/jornadas", en: "/appointments-by-city" },
  },
  {
    id: "results",
    label: { es: "Resultados", en: "Results" },
    href: { es: "/resultados", en: "/results" },
  },
  {
    id: "about",
    label: { es: "Sobre Xiomara", en: "About Xiomara" },
    href: { es: "/sobre-xiomara", en: "/about-xiomara" },
  },
  {
    id: "aftercare",
    label: { es: "Cuidados", en: "Aftercare" },
    href: { es: "/cuidados", en: "/aftercare" },
  },
  {
    id: "contact",
    label: { es: "Contacto", en: "Contact" },
    href: { es: "/contacto", en: "/contact" },
  },
  {
    id: "downloads",
    label: { es: "Descargas", en: "Downloads" },
    href: { es: "/descargas", en: "/downloads" },
  },
] satisfies NavigationItem[];

/** Destinos visibles en el header (desktop y hamburguesa). */
export const primaryNavigationIds = [
  "services",
  "journeys",
  "training",
  "results",
  "about",
] as const;

/** Enlaces secundarios: menú «Más» en desktop y bloque inferior en móvil. */
export const secondaryNavigationIds = [
  "aftercare",
  "contact",
  "downloads",
] as const;

export const footerDiscoverNavigationIds = [
  "home",
  "services",
  "training",
  "journeys",
  "results",
  "about",
] as const;

export const footerResourcesNavigationIds = [
  "aftercare",
  "contact",
  "downloads",
] as const;

export type ResolvedNavItem = {
  id: string;
  label: string;
  href: string;
};

export function resolveNavItems(
  items: ResolvedNavItem[],
  ids: readonly string[],
): ResolvedNavItem[] {
  return ids
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is ResolvedNavItem => Boolean(item));
}

export const legalNavigation = [
  {
    id: "legal-notice",
    label: { es: "Aviso legal", en: "Legal notice" },
    href: { es: "/aviso-legal", en: "/legal-notice" },
  },
  {
    id: "privacy",
    label: { es: "Privacidad", en: "Privacy" },
    href: { es: "/privacidad", en: "/privacy" },
  },
  {
    id: "cookies",
    label: { es: "Cookies", en: "Cookies" },
    href: { es: "/cookies", en: "/cookies" },
  },
] satisfies NavigationItem[];
