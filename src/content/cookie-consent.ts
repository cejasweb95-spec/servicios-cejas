import { cookieCategorySchema, type CookieCategory } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const cookieCategories = cookieCategorySchema.array().parse([
  {
    id: "necessary",
    required: true,
    enabledByDefault: true,
    title: l("Necesarias", "Necessary"),
    description: l(
      "Permiten que la web funcione y no se pueden desactivar desde el panel.",
      "They allow the website to work and cannot be disabled from the panel.",
    ),
  },
  {
    id: "analytics",
    required: false,
    enabledByDefault: false,
    title: l("Analíticas", "Analytics"),
    description: l(
      "Ayudan a medir visitas y clics sin enviar datos personales a los eventos.",
      "They help measure visits and clicks without sending personal data in events.",
    ),
  },
  {
    id: "preferences",
    required: false,
    enabledByDefault: false,
    title: l("Preferencias", "Preferences"),
    description: l(
      "Guardan preferencias de experiencia si se activan funciones que lo necesiten.",
      "They store experience preferences if future features require them.",
    ),
  },
  {
    id: "marketing",
    required: false,
    enabledByDefault: false,
    title: l("Marketing", "Marketing"),
    description: l(
      "No se usan en V1. Quedan bloqueadas hasta nueva decisión.",
      "Not used in V1. They remain blocked until a future decision.",
    ),
  },
] satisfies CookieCategory[]);
