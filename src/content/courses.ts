import {
  type Course,
  type CourseOffer,
  type CurrencyCode,
  type Duration,
  type LocalizedString,
  type MarketId,
  courseSchema,
} from "@/lib/content/schema";

const l = (es: string, en: string): LocalizedString => ({ es, en });

const days = (count: number, es: string, en: string): Duration => ({
  days: count,
  label: l(es, en),
});

const price = (amount: number, currency: CurrencyCode) => ({ amount, currency });

const offer = (
  marketId: MarketId,
  modality: CourseOffer["modality"],
  currency: CurrencyCode,
  withKit?: number,
  withoutKit?: number,
): CourseOffer => ({
  marketId,
  modality,
  ...(withKit ? { withKit: price(withKit, currency) } : {}),
  ...(withoutKit ? { withoutKit: price(withoutKit, currency) } : {}),
});

const commonBusinessModules = [
  l("Fotografia profesional y redes sociales", "Professional photography and social media"),
  l("Marketing, publicidad y ventas", "Marketing, advertising and sales"),
  l("Proveedores", "Suppliers"),
  l("Como lograr las primeras clientas", "How to get the first clients"),
  l("Como proyectarse profesionalmente", "How to position yourself professionally"),
];

const commonMentoringIncludes = [
  l("Acompañamiento por un año", "One year of support"),
  l("Acceso a grupo VIP de WhatsApp", "Access to a VIP WhatsApp group"),
  l("Evaluacion de trabajos realizados", "Review of completed work"),
  l("Resolucion de dudas durante procedimientos", "Question support during procedures"),
  l("Orientacion para convertirlo en negocio", "Guidance to turn the skill into a business"),
];

export const courses = courseSchema.array().parse([
  {
    id: "curso-micropigmentacion-cejas",
    slug: l("curso-micropigmentacion-cejas", "brow-micropigmentation-course"),
    name: l(
      "Curso profesional de micropigmentacion de cejas",
      "Professional brow micropigmentation course",
    ),
    summary: l(
      "Formacion profesional en efecto polvo y efecto maquillaje, con teoria, practica y modelo real.",
      "Professional training in powder brows and makeup-effect brows, with theory, practice and a real model.",
    ),
    duration: days(3, "3 dias", "3 days"),
    certification: l("Doble certificado", "Double certificate"),
    modalities: ["virtual", "presencial", "personalizada"],
    modules: [
      l("Fundamentos de la micropigmentacion", "Micropigmentation fundamentals"),
      l("Bioseguridad y etica profesional", "Biosafety and professional ethics"),
      l("Tipos de piel y cicatrizacion", "Skin types and healing"),
      l("Colorimetria aplicada a cejas", "Brow colorimetry"),
      l("Visagismo bajo medidas faciales", "Facial-measure brow mapping"),
      l("Tecnicas: efecto polvo y efecto maquillaje", "Techniques: powder brows and makeup-effect brows"),
      l("Uso de dermografo y agujas", "Dermograph and needle use"),
      l("Procedimiento paso a paso", "Step-by-step procedure"),
      l("Cuidados postratamiento", "Aftercare"),
      l("Practica con modelo real", "Practice with a real model"),
      ...commonBusinessModules,
    ],
    includes: [
      l("Kit profesional", "Professional kit"),
      l("Dermografo profesional y dos tintas", "Professional dermograph and two pigments"),
      l("Pie de rey, lapiz de diseño, hilo y pincel", "Caliper, design pencil, thread and brush"),
      l("Piel de practica, anillos y agujas", "Practice skin, rings and needles"),
      l("Obsequio: elegir lifting, laminado o henna", "Gift: choose lash lift, lamination or henna"),
      ...commonMentoringIncludes,
    ],
    offers: [
      offer("colombia", "virtual", "COP", 2200000, 1600000),
      offer("colombia", "presencial", "COP", 3200000, 2600000),
      offer("colombia", "personalizada", "COP", 4000000, 3500000),
      offer("espana-europa", "virtual", "EUR", 800, 500),
      offer("espana-europa", "presencial", "EUR", 1000, 700),
      offer("espana-europa", "personalizada", "EUR", 1300, 1000),
    ],
    downloadId: "curso-micropigmentacion-cejas",
  },
  {
    id: "curso-micropigmentacion-labios",
    slug: l("curso-micropigmentacion-labios", "lip-micropigmentation-course"),
    name: l(
      "Curso profesional de micropigmentacion y neutralizacion labial",
      "Professional lip micropigmentation and neutralization course",
    ),
    summary: l(
      "Formacion en full lips, acuarela y neutralizacion labial, con teoria, practica y modelo real.",
      "Training in full lips, watercolor lips and lip neutralization, with theory, practice and a real model.",
    ),
    duration: days(3, "3 dias", "3 days"),
    certification: l("Doble certificado", "Double certificate"),
    modalities: ["virtual", "presencial", "personalizada"],
    modules: [
      l("Fundamentos de micropigmentacion y neutralizacion", "Micropigmentation and neutralization fundamentals"),
      l("Bioseguridad y etica profesional", "Biosafety and professional ethics"),
      l("Tipos de piel y cicatrizacion", "Skin types and healing"),
      l("Colorimetria aplicada en labios", "Lip colorimetry"),
      l("Visagismo bajo medidas", "Measured lip mapping"),
      l("Tecnicas: full lips, acuarela y neutralizacion", "Techniques: full lips, watercolor and neutralization"),
      l("Uso de dermografo y agujas", "Dermograph and needle use"),
      l("Procedimiento paso a paso", "Step-by-step procedure"),
      l("Cuidados postratamiento", "Aftercare"),
      l("Practica con modelo real", "Practice with a real model"),
      ...commonBusinessModules,
    ],
    includes: [
      l("Kit profesional", "Professional kit"),
      l("Dermografo profesional y dos tintas", "Professional dermograph and two pigments"),
      l("Pie de rey, lapiz de diseño, hilo y pincel", "Caliper, design pencil, thread and brush"),
      l("Piel de practica, anillos y agujas", "Practice skin, rings and needles"),
      l("Obsequio: elegir lifting, laminado o henna", "Gift: choose lash lift, lamination or henna"),
      ...commonMentoringIncludes,
    ],
    offers: [
      offer("colombia", "virtual", "COP", 2500000, 1900000),
      offer("colombia", "presencial", "COP", 3500000, 2900000),
      offer("colombia", "personalizada", "COP", 4200000, 3600000),
      offer("espana-europa", "virtual", "EUR", 800, 500),
      offer("espana-europa", "presencial", "EUR", 1000, 700),
      offer("espana-europa", "personalizada", "EUR", 1300, 1000),
    ],
    downloadId: "curso-micropigmentacion-labios",
  },
  {
    id: "masterclass-laminado-cejas",
    slug: l("masterclass-laminado-cejas", "brow-lamination-masterclass"),
    name: l("Master Class Laminado de Cejas", "Brow Lamination Master Class"),
    summary: l(
      "Masterclass de un dia sobre laminado, visagismo, cuidados, materiales y marketing.",
      "One-day masterclass on lamination, brow mapping, aftercare, materials and marketing.",
    ),
    duration: days(1, "1 dia", "1 day"),
    certification: l("Certificado", "Certificate"),
    modalities: ["virtual", "presencial"],
    modules: [
      l("Que es el laminado", "What brow lamination is"),
      l("A quien se recomienda y a quien no", "Who it is and is not recommended for"),
      l("Paso a paso", "Step by step"),
      l("Medidas faciales y visagismo", "Facial measurements and brow mapping"),
      l("Cuidados", "Aftercare"),
      l("Materiales", "Materials"),
      ...commonBusinessModules,
    ],
    includes: [
      l("Kit profesional", "Professional kit"),
      l("Hennas, perfiladores, pie de rey y lapiz de diseño", "Hennas, profilers, caliper and design pencil"),
      l("Kit de laminado completo", "Complete lamination kit"),
      ...commonMentoringIncludes,
    ],
    offers: [
      offer("colombia", "virtual", "COP", 350000, 270000),
      offer("colombia", "presencial", "COP", 450000, 370000),
      offer("espana-europa", "virtual", "EUR", 300),
      offer("espana-europa", "presencial", "EUR", 400),
    ],
    downloadId: "masterclass-laminado-cejas",
  },
  {
    id: "masterclass-lifting-pestanas",
    slug: l("masterclass-lifting-pestanas", "lash-lift-masterclass"),
    name: l("Master Class Lifting de Pestañas", "Lash Lift Master Class"),
    summary: l(
      "Masterclass de un dia sobre lifting, cuidados, materiales, proveedores y marketing.",
      "One-day masterclass on lash lift, aftercare, materials, suppliers and marketing.",
    ),
    duration: days(1, "1 dia", "1 day"),
    certification: l("Certificado", "Certificate"),
    modalities: ["virtual", "presencial"],
    modules: [
      l("Que es el lifting", "What lash lifting is"),
      l("A quien se recomienda y a quien no", "Who it is and is not recommended for"),
      l("Paso a paso", "Step by step"),
      l("Cuidados", "Aftercare"),
      l("Materiales", "Materials"),
      ...commonBusinessModules,
    ],
    includes: [
      l("Kit profesional", "Professional kit"),
      l("Moldes, peine, aplicadores y parches", "Molds, comb, applicators and pads"),
      l("Kit de lifting completo", "Complete lash lift kit"),
      ...commonMentoringIncludes,
    ],
    offers: [
      offer("colombia", "virtual", "COP", 350000, 270000),
      offer("colombia", "presencial", "COP", 450000, 370000),
      offer("espana-europa", "virtual", "EUR", 300),
      offer("espana-europa", "presencial", "EUR", 400),
    ],
    downloadId: "masterclass-lifting-pestanas",
  },
  {
    id: "masterclass-cejas-henna",
    slug: l("masterclass-cejas-henna", "henna-brows-masterclass"),
    name: l("Master Class Cejas en Henna", "Henna Brows Master Class"),
    summary: l(
      "Masterclass de un dia sobre henna, visagismo, cuidados, materiales y marketing.",
      "One-day masterclass on henna brows, mapping, aftercare, materials and marketing.",
    ),
    duration: days(1, "1 dia", "1 day"),
    certification: l("Certificado", "Certificate"),
    modalities: ["virtual", "presencial"],
    modules: [
      l("Que es la henna", "What henna brows are"),
      l("A quien se recomienda y a quien no", "Who it is and is not recommended for"),
      l("Paso a paso", "Step by step"),
      l("Medidas faciales y visagismo", "Facial measurements and brow mapping"),
      l("Cuidados", "Aftercare"),
      l("Materiales", "Materials"),
      ...commonBusinessModules,
    ],
    includes: [
      l("Kit profesional", "Professional kit"),
      l("Hennas, perfiladores, pie de rey y lapiz de diseño", "Hennas, profilers, caliper and design pencil"),
      l("Cepillos, perfiladores, cuchillas y estuche", "Brushes, profilers, razors and case"),
      ...commonMentoringIncludes,
    ],
    offers: [
      offer("colombia", "virtual", "COP", 180000),
      offer("colombia", "presencial", "COP", 280000),
      offer("espana-europa", "virtual", "EUR", 180),
      offer("espana-europa", "presencial", "EUR", 280),
    ],
    downloadId: "masterclass-cejas-henna",
  },
] satisfies Course[]);
