import { serviceCategorySchema, type ServiceCategory } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const serviceCategories = serviceCategorySchema.array().parse([
  {
    id: "cejas",
    slug: l("cejas", "brows"),
    name: l("Cejas", "Brows"),
    description: l(
      "Diseño, henna, laminado y depilacion de cejas.",
      "Brow design, henna, lamination and brow hair removal.",
    ),
    order: 10,
  },
  {
    id: "micropigmentacion-cejas",
    slug: l("micropigmentacion-cejas", "brow-micropigmentation"),
    name: l("Micropigmentacion de cejas", "Brow micropigmentation"),
    description: l(
      "Tecnicas de cejas semipermanentes y refuerzos.",
      "Semi-permanent brow techniques and touch-ups.",
    ),
    order: 20,
  },
  {
    id: "labios",
    slug: l("labios", "lips"),
    name: l("Labios", "Lips"),
    description: l(
      "Micropigmentacion, neutralizacion e hidratacion labial.",
      "Lip micropigmentation, neutralization and hydration.",
    ),
    order: 30,
  },
  {
    id: "mirada-pestanas",
    slug: l("mirada-pestanas", "eyes-lashes"),
    name: l("Mirada y pestañas", "Eyes and lashes"),
    description: l(
      "Linea de ojos, relleno, lifting y servicios de pestañas.",
      "Eyeliner, lash line enhancement, lifting and lash services.",
    ),
    order: 40,
  },
  {
    id: "depilacion-corporal",
    slug: l("depilacion-corporal", "body-waxing"),
    name: l("Depilacion corporal", "Body waxing"),
    description: l(
      "Servicios de depilacion disponibles segun mercado.",
      "Hair removal services available by market.",
    ),
    order: 50,
  },
  {
    id: "extensiones-pestanas",
    slug: l("extensiones-pestanas", "lash-extensions"),
    name: l("Extensiones de pestañas", "Lash extensions"),
    description: l(
      "Sets y retoques de pestañas disponibles en Colombia.",
      "Lash extension sets and refills available in Colombia.",
    ),
    order: 60,
  },
  {
    id: "unas",
    slug: l("unas", "nails"),
    name: l("Uñas", "Nails"),
    description: l(
      "Manicure, pedicure y sistemas de uñas del catalogo Colombia.",
      "Manicure, pedicure and nail systems from the Colombia catalog.",
    ),
    order: 70,
  },
  {
    id: "peinados-maquillaje",
    slug: l("peinados-maquillaje", "hair-makeup"),
    name: l("Peinados y maquillaje", "Hair and makeup"),
    description: l(
      "Servicios sociales con cotizacion por referencia cuando aplica.",
      "Social hair and makeup services, quoted by reference when needed.",
    ),
    order: 80,
  },
] satisfies ServiceCategory[]);
