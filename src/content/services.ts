import {
  type CurrencyCode,
  type Duration,
  type LocalizedString,
  type MarketId,
  serviceSchema,
  type ServiceOffer,
} from "@/lib/content/schema";

const l = (es: string, en: string): LocalizedString => ({ es, en });

const min = (minutes: number, es: string, en: string, note?: LocalizedString): Duration => ({
  minutes,
  label: l(es, en),
  ...(note ? { note } : {}),
});

const range = (
  minutes: number,
  maxMinutes: number,
  es: string,
  en: string,
  note?: LocalizedString,
): Duration => ({
  minutes,
  maxMinutes,
  label: l(es, en),
  ...(note ? { note } : {}),
});

const offer = (
  marketId: MarketId,
  amount: number,
  currency: CurrencyCode,
  appointmentDuration: Duration,
  notes?: LocalizedString,
  addons: ServiceOffer["addons"] = [],
): ServiceOffer => ({
  marketId,
  price: { amount, currency },
  appointmentDuration,
  ...(notes ? { notes } : {}),
  addons,
});

const addon = (
  id: string,
  name: LocalizedString,
  amount: number,
  currency: CurrencyCode,
): ServiceOffer["addons"][number] => ({
  id,
  name,
  price: { amount, currency },
});

const d = {
  browWax: min(20, "20 min", "20 min"),
  henna: min(40, "40 min", "40 min"),
  oneHour: min(60, "1 hora", "1 hour"),
  halfHour: min(30, "30 min", "30 min"),
  ninety: min(90, "1 h 30 min", "1 hr 30 min"),
  twoHours: min(120, "2 horas", "2 hours"),
  threeHours: min(180, "3 horas", "3 hours"),
  threeThirty: min(210, "3 h 30 min", "3 hr 30 min"),
  fifteenMax: min(15, "15 min max.", "15 min max."),
  pedicureRange: range(
    60,
    80,
    "1 h a 1 h 20 min",
    "1 hr to 1 hr 20 min",
    l("Depende del estado de los pies.", "Depends on the condition of the feet."),
  ),
  semiRange: range(
    60,
    120,
    "1 a 2 horas",
    "1 to 2 hours",
    l("Depende del decorado.", "Depends on the nail art."),
  ),
  pressOnRange: range(120, 180, "2 a 3 horas", "2 to 3 hours"),
  braidsRange: range(
    15,
    25,
    "15 a 25 min aprox.",
    "Approx. 15 to 25 min",
    l("Depende del diseño.", "Depends on the design."),
  ),
};

export const services = serviceSchema.array().parse([
  {
    id: "laminado-cejas",
    slug: l("laminado-cejas", "brow-lamination"),
    categoryId: "cejas",
    name: l("Laminado de cejas", "Brow lamination"),
    shortDescription: l(
      "Planchado, diseño, depilacion y sombreado en henna.",
      "Brow lamination with design, hair removal and henna shading.",
    ),
    resultDuration: l("Resultado hasta 1 mes.", "Result lasts up to 1 month."),
    featured: true,
    offers: [
      offer("colombia", 80000, "COP", d.oneHour),
      offer("espana-europa", 45, "EUR", d.oneHour),
      offer("suiza", 95, "CHF", d.oneHour),
    ],
  },
  {
    id: "sombreado-henna",
    slug: l("sombreado-henna", "henna-brows"),
    categoryId: "cejas",
    name: l("Sombreado en henna", "Henna brow shading"),
    shortDescription: l(
      "Diseño bajo medidas faciales y tonos adaptados a cada piel.",
      "Facial-measure brow design with shades adapted to each skin tone.",
    ),
    offers: [
      offer("colombia", 43000, "COP", d.henna),
      offer("espana-europa", 27, "EUR", d.henna),
      offer("suiza", 50, "CHF", d.henna),
    ],
  },
  {
    id: "depilacion-cejas-cera",
    slug: l("depilacion-cejas-cera", "brow-waxing"),
    categoryId: "cejas",
    name: l("Depilacion de cejas con cera", "Brow waxing"),
    shortDescription: l(
      "Diseño bajo medidas faciales. El vello tarda de 15 a 20 dias en salir.",
      "Facial-measure brow design. Hair regrowth takes 15 to 20 days.",
    ),
    resultDuration: l("15 a 20 dias.", "15 to 20 days."),
    offers: [
      offer("colombia", 25000, "COP", d.browWax),
      offer("espana-europa", 9, "EUR", d.browWax),
    ],
  },
  {
    id: "depilacion-cejas-cuchilla",
    slug: l("depilacion-cejas-cuchilla", "brow-razor-shaping"),
    categoryId: "cejas",
    name: l("Depilacion de cejas con cuchilla", "Brow razor shaping"),
    shortDescription: l(
      "Diseño bajo medidas faciales. El vello tarda de 4 a 5 dias en salir.",
      "Facial-measure brow design. Hair regrowth takes 4 to 5 days.",
    ),
    resultDuration: l("4 a 5 dias.", "4 to 5 days."),
    offers: [
      offer("colombia", 20000, "COP", d.browWax),
      offer("espana-europa", 7, "EUR", d.browWax),
    ],
  },
  {
    id: "efecto-polvo",
    slug: l("efecto-polvo", "powder-brows"),
    categoryId: "micropigmentacion-cejas",
    name: l("Efecto polvo", "Powder brows"),
    shortDescription: l(
      "Tecnica con puntos de luz para un cicatrizado mas natural.",
      "Light-dot technique designed for a more natural healed result.",
    ),
    resultDuration: l("10 meses a 1 año.", "10 months to 1 year."),
    featured: true,
    offers: [
      offer("colombia", 350000, "COP", d.twoHours),
      offer("espana-europa", 250, "EUR", d.twoHours),
      offer("suiza", 260, "CHF", d.twoHours),
    ],
  },
  {
    id: "efecto-maquillaje",
    slug: l("efecto-maquillaje", "makeup-effect-brows"),
    categoryId: "micropigmentacion-cejas",
    name: l("Efecto maquillaje", "Makeup-effect brows"),
    shortDescription: l(
      "Tecnica mas definida para una ceja marcada pero natural.",
      "A more defined technique for shaped brows that still look natural.",
    ),
    resultDuration: l("1 año a 1 año y medio.", "1 to 1.5 years."),
    featured: true,
    offers: [
      offer("colombia", 350000, "COP", d.twoHours),
      offer("espana-europa", 250, "EUR", d.twoHours),
      offer("suiza", 260, "CHF", d.twoHours),
    ],
  },
  {
    id: "cejas-hibridas",
    slug: l("cejas-hibridas", "hybrid-brows"),
    categoryId: "micropigmentacion-cejas",
    name: l("Cejas hibridas", "Hybrid brows"),
    shortDescription: l(
      "Pelo a pelo combinado con sombras para un resultado muy natural.",
      "Hair-stroke technique combined with shading for a very natural result.",
    ),
    resultDuration: l("Hasta 12 meses.", "Up to 12 months."),
    featured: true,
    offers: [
      offer("colombia", 400000, "COP", d.twoHours),
      offer("espana-europa", 330, "EUR", d.twoHours),
      offer("suiza", 300, "CHF", d.twoHours),
    ],
  },
  {
    id: "correccion-cejas",
    slug: l("correccion-cejas", "brow-correction"),
    categoryId: "micropigmentacion-cejas",
    name: l("Correccion de cejas", "Brow correction"),
    shortDescription: l(
      "Tecnica avanzada para neutralizar tonos y rediseñar cejas con trabajos previos.",
      "Advanced technique to neutralize tones and redesign brows with previous work.",
    ),
    sourceNote: l(
      "Disponible en catalogo España/Europa. Mantener fuera de Suiza salvo confirmacion futura.",
      "Available in the Spain/Europe catalog. Keep out of Switzerland unless later confirmed.",
    ),
    offers: [offer("espana-europa", 280, "EUR", d.twoHours)],
  },
  {
    id: "refuerzo-cejas",
    slug: l("refuerzo-cejas", "brow-touch-up"),
    categoryId: "micropigmentacion-cejas",
    name: l("Refuerzo cejas", "Brow touch-up"),
    shortDescription: l(
      "Retoque o mantenimiento del procedimiento de cejas.",
      "Touch-up or maintenance for brow procedures.",
    ),
    offers: [
      offer("colombia", 150000, "COP", d.halfHour),
      offer("espana-europa", 100, "EUR", d.halfHour),
      offer("suiza", 150, "CHF", d.halfHour),
    ],
  },
  {
    id: "refuerzo-cejas-hibridas",
    slug: l("refuerzo-cejas-hibridas", "hybrid-brow-touch-up"),
    categoryId: "micropigmentacion-cejas",
    name: l("Refuerzo cejas hibridas", "Hybrid brow touch-up"),
    shortDescription: l(
      "Retoque o mantenimiento de cejas hibridas.",
      "Touch-up or maintenance for hybrid brows.",
    ),
    offers: [
      offer("colombia", 150000, "COP", d.halfHour),
      offer("espana-europa", 150, "EUR", d.halfHour),
      offer("suiza", 150, "CHF", d.halfHour),
    ],
  },
  {
    id: "neutralizacion-labios",
    slug: l("neutralizacion-labios", "lip-neutralization"),
    categoryId: "labios",
    name: l("Neutralizacion", "Lip neutralization"),
    shortDescription: l(
      "Ideal para labios oscuros, manchados o violaceos.",
      "Designed for dark, stained or violet-toned lips.",
    ),
    resultDuration: l("Hasta 3 años.", "Up to 3 years."),
    featured: true,
    offers: [
      offer("colombia", 420000, "COP", d.twoHours),
      offer("espana-europa", 300, "EUR", d.twoHours),
      offer("suiza", 300, "CHF", d.twoHours),
    ],
  },
  {
    id: "microlips",
    slug: l("microlips", "microlips"),
    categoryId: "labios",
    name: l("Microlips", "Microlips"),
    shortDescription: l(
      "Aporta luminosidad y color natural a labios palidos o sin definicion.",
      "Adds brightness and natural color to pale or undefined lips.",
    ),
    resultDuration: l("2 a 3 años.", "2 to 3 years."),
    featured: true,
    offers: [
      offer("colombia", 420000, "COP", d.twoHours),
      offer("espana-europa", 300, "EUR", d.twoHours),
      offer("suiza", 300, "CHF", d.twoHours),
    ],
  },
  {
    id: "hidralips-tres-sesiones",
    slug: l("hidralips-tres-sesiones", "hidralips-three-sessions"),
    categoryId: "labios",
    name: l("HidraLips (3 sesiones)", "HidraLips (3 sessions)"),
    shortDescription: l(
      "Hidratacion labial con acido hialuronico en tres sesiones.",
      "Lip hydration with hyaluronic acid over three sessions.",
    ),
    offers: [
      offer("colombia", 220000, "COP", d.oneHour, l("1 hora por sesion.", "1 hour per session.")),
      offer("espana-europa", 150, "EUR", d.oneHour, l("1 hora por sesion.", "1 hour per session.")),
    ],
  },
  {
    id: "hidralips-una-sesion",
    slug: l("hidralips-una-sesion", "hidralips-one-session"),
    categoryId: "labios",
    name: l("HidraLips (1 sesion)", "HidraLips (1 session)"),
    shortDescription: l(
      "Sesion individual de hidratacion labial.",
      "Single lip hydration session.",
    ),
    offers: [
      offer("colombia", 90000, "COP", d.oneHour),
      offer("espana-europa", 60, "EUR", d.oneHour),
    ],
  },
  {
    id: "refuerzo-microlips",
    slug: l("refuerzo-microlips", "microlips-touch-up"),
    categoryId: "labios",
    name: l("Refuerzo Microlips", "Microlips touch-up"),
    shortDescription: l(
      "Retoque o mantenimiento de Microlips.",
      "Touch-up or maintenance for Microlips.",
    ),
    offers: [
      offer("colombia", 190000, "COP", d.halfHour),
      offer("espana-europa", 150, "EUR", d.halfHour),
      offer("suiza", 180, "CHF", d.halfHour),
    ],
  },
  {
    id: "linea-ojos",
    slug: l("linea-ojos", "eyeliner"),
    categoryId: "mirada-pestanas",
    name: l("Linea de ojos", "Eyeliner"),
    shortDescription: l(
      "Diseño previo para parpados amplios y definicion de la mirada.",
      "Pre-designed eyeliner for broader eyelids and eye definition.",
    ),
    resultDuration: l("Hasta 1 año.", "Up to 1 year."),
    offers: [
      offer("colombia", 220000, "COP", d.twoHours),
      offer("espana-europa", 200, "EUR", d.twoHours),
      offer("suiza", 200, "CHF", d.twoHours),
    ],
  },
  {
    id: "relleno-pestanas",
    slug: l("relleno-pestanas", "lash-line-enhancement"),
    categoryId: "mirada-pestanas",
    name: l("Relleno de pestañas", "Lash line enhancement"),
    shortDescription: l(
      "Apariencia de mas pestañas y linea de agua maquillada.",
      "Creates the look of fuller lashes and a naturally defined lash line.",
    ),
    resultDuration: l("Hasta 1 año.", "Up to 1 year."),
    offers: [
      offer("colombia", 150000, "COP", d.oneHour),
      offer("espana-europa", 120, "EUR", d.oneHour),
      offer("suiza", 180, "CHF", d.oneHour),
    ],
  },
  {
    id: "refuerzo-linea-ojos",
    slug: l("refuerzo-linea-ojos", "eyeliner-touch-up"),
    categoryId: "mirada-pestanas",
    name: l("Refuerzo linea de ojos", "Eyeliner touch-up"),
    shortDescription: l(
      "Retoque o mantenimiento de linea de ojos.",
      "Touch-up or maintenance for eyeliner.",
    ),
    offers: [
      offer("colombia", 85000, "COP", d.halfHour),
      offer("espana-europa", 90, "EUR", d.halfHour),
      offer("suiza", 100, "CHF", d.halfHour),
    ],
  },
  {
    id: "lifting-pestanas",
    slug: l("lifting-pestanas", "lash-lift"),
    categoryId: "mirada-pestanas",
    name: l("Lifting de pestañas", "Lash lift"),
    shortDescription: l(
      "Ondulamiento de pestaña natural con tinte incluido.",
      "Natural lash lifting with tint included.",
    ),
    resultDuration: l("Hasta 2 meses.", "Up to 2 months."),
    offers: [
      offer("colombia", 85000, "COP", d.oneHour),
      offer("espana-europa", 45, "EUR", d.oneHour),
      offer("suiza", 75, "CHF", d.oneHour),
    ],
  },
  {
    id: "depilacion-axilas",
    slug: l("depilacion-axilas", "underarm-waxing"),
    categoryId: "depilacion-corporal",
    name: l("Depilacion axilas", "Underarm waxing"),
    shortDescription: l(
      "Ayuda a disminuir manchas. El vello tarda hasta 20 dias en salir.",
      "Helps reduce dark spots. Hair regrowth takes up to 20 days.",
    ),
    offers: [
      offer("colombia", 25000, "COP", d.browWax),
      offer("espana-europa", 18, "EUR", d.browWax),
    ],
  },
  {
    id: "depilacion-bigote-bozo",
    slug: l("depilacion-bigote-bozo", "upper-lip-waxing"),
    categoryId: "depilacion-corporal",
    name: l("Depilacion bigote / bozo", "Upper lip waxing"),
    shortDescription: l(
      "Piel desmanchada y sin irritacion. Vello hasta 20 dias.",
      "Clearer skin with less irritation. Hair regrowth up to 20 days.",
    ),
    offers: [
      offer("colombia", 18000, "COP", d.browWax),
      offer("espana-europa", 5, "EUR", d.browWax),
    ],
  },
  {
    id: "depilacion-nariz",
    slug: l("depilacion-nariz", "nose-waxing"),
    categoryId: "depilacion-corporal",
    name: l("Depilacion nariz", "Nose waxing"),
    shortDescription: l(
      "Depilacion de nariz con duracion aproximada del vello hasta 20 dias.",
      "Nose hair removal with regrowth in up to approximately 20 days.",
    ),
    offers: [
      offer("colombia", 8000, "COP", d.browWax),
      offer("espana-europa", 7, "EUR", d.browWax),
    ],
  },
  {
    id: "depilacion-media-pierna",
    slug: l("depilacion-media-pierna", "half-leg-waxing"),
    categoryId: "depilacion-corporal",
    name: l("Depilacion media pierna", "Half-leg waxing"),
    shortDescription: l(
      "Servicio de depilacion corporal del catalogo Colombia.",
      "Body waxing service from the Colombia catalog.",
    ),
    offers: [offer("colombia", 35000, "COP", d.browWax)],
  },
  {
    id: "set-rimel",
    slug: l("set-rimel", "mascara-look-set"),
    categoryId: "extensiones-pestanas",
    name: l("Set rimel", "Mascara-look set"),
    shortDescription: l(
      "Set de extensiones de pestañas disponible en Colombia.",
      "Lash extension set available in Colombia.",
    ),
    offers: [
      offer("colombia", 95000, "COP", d.ninety, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 50000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 65000, "COP"),
      ]),
    ],
  },
  {
    id: "volumen-ligero",
    slug: l("volumen-ligero", "light-volume-lashes"),
    categoryId: "extensiones-pestanas",
    name: l("Volumen ligero", "Light volume"),
    shortDescription: l(
      "Set de volumen ligero del catalogo Colombia.",
      "Light volume lash set from the Colombia catalog.",
    ),
    offers: [
      offer("colombia", 120000, "COP", d.twoHours, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 60000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 80000, "COP"),
      ]),
    ],
  },
  {
    id: "wispy",
    slug: l("wispy", "wispy-lashes"),
    categoryId: "extensiones-pestanas",
    name: l("Wispy", "Wispy"),
    shortDescription: l("Set wispy del catalogo Colombia.", "Wispy lash set from the Colombia catalog."),
    offers: [
      offer("colombia", 120000, "COP", d.ninety, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 60000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 80000, "COP"),
      ]),
    ],
  },
  {
    id: "volumen-ruso-2d",
    slug: l("volumen-ruso-2d", "russian-volume-2d"),
    categoryId: "extensiones-pestanas",
    name: l("Volumen ruso 2D", "Russian volume 2D"),
    shortDescription: l(
      "Set volumen ruso 2D del catalogo Colombia.",
      "Russian volume 2D lash set from the Colombia catalog.",
    ),
    offers: [
      offer("colombia", 145000, "COP", d.twoHours, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 80000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 100000, "COP"),
      ]),
    ],
  },
  {
    id: "mega-volumen",
    slug: l("mega-volumen", "mega-volume-lashes"),
    categoryId: "extensiones-pestanas",
    name: l("Mega volumen", "Mega volume"),
    shortDescription: l(
      "Set mega volumen del catalogo Colombia.",
      "Mega volume lash set from the Colombia catalog.",
    ),
    offers: [
      offer("colombia", 160000, "COP", d.twoHours, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 90000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 110000, "COP"),
      ]),
    ],
  },
  {
    id: "volumen-aura-2d",
    slug: l("volumen-aura-2d", "aura-volume-2d"),
    categoryId: "extensiones-pestanas",
    name: l("Volumen aura 2D", "Aura volume 2D"),
    shortDescription: l(
      "Set volumen aura 2D del catalogo Colombia.",
      "Aura volume 2D lash set from the Colombia catalog.",
    ),
    offers: [
      offer("colombia", 140000, "COP", d.ninety, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 70000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 90000, "COP"),
      ]),
    ],
  },
  {
    id: "volumen-aura-5d",
    slug: l("volumen-aura-5d", "aura-volume-5d"),
    categoryId: "extensiones-pestanas",
    name: l("Volumen aura 5D", "Aura volume 5D"),
    shortDescription: l(
      "Set volumen aura 5D del catalogo Colombia.",
      "Aura volume 5D lash set from the Colombia catalog.",
    ),
    offers: [
      offer("colombia", 150000, "COP", d.ninety, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 80000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 100000, "COP"),
      ]),
    ],
  },
  {
    id: "volumen-griego-3d",
    slug: l("volumen-griego-3d", "greek-volume-3d"),
    categoryId: "extensiones-pestanas",
    name: l("Volumen griego 3D", "Greek volume 3D"),
    shortDescription: l(
      "Set volumen griego 3D del catalogo Colombia.",
      "Greek volume 3D lash set from the Colombia catalog.",
    ),
    offers: [
      offer("colombia", 140000, "COP", d.ninety, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 70000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 90000, "COP"),
      ]),
    ],
  },
  {
    id: "volumen-griego-5d",
    slug: l("volumen-griego-5d", "greek-volume-5d"),
    categoryId: "extensiones-pestanas",
    name: l("Volumen griego 5D", "Greek volume 5D"),
    shortDescription: l(
      "Nombre confirmado por la clienta; corrige la etiqueta erronea del panel visual.",
      "Client-confirmed name; corrects the mislabeled visual panel.",
    ),
    offers: [
      offer("colombia", 150000, "COP", d.ninety, undefined, [
        addon("retoque-15-dias", l("Retoque 15 dias", "15-day refill"), 80000, "COP"),
        addon("retoque-20-dias", l("Retoque 20 dias", "20-day refill"), 100000, "COP"),
      ]),
    ],
  },
  {
    id: "por-punto-efecto-volumen",
    slug: l("por-punto-efecto-volumen", "volume-clusters"),
    categoryId: "extensiones-pestanas",
    name: l("Por punto efecto volumen", "Volume clusters"),
    shortDescription: l(
      "Grupos de pestañas con duracion de 8 a 10 dias.",
      "Lash clusters that last 8 to 10 days.",
    ),
    offers: [offer("colombia", 40000, "COP", d.fifteenMax)],
  },
  {
    id: "por-punto-mega-volumen",
    slug: l("por-punto-mega-volumen", "mega-volume-clusters"),
    categoryId: "extensiones-pestanas",
    name: l("Por punto mega volumen", "Mega volume clusters"),
    shortDescription: l(
      "Grupos de pestañas con efecto mega volumen.",
      "Lash clusters with a mega-volume effect.",
    ),
    offers: [offer("colombia", 50000, "COP", d.fifteenMax)],
  },
  {
    id: "manicure-tradicional",
    slug: l("manicure-tradicional", "traditional-manicure"),
    categoryId: "unas",
    name: l("Manicure tradicional", "Traditional manicure"),
    shortDescription: l("Esmaltado tradicional.", "Traditional nail polish service."),
    resultDuration: l("8 a 10 dias.", "8 to 10 days."),
    offers: [offer("colombia", 22000, "COP", d.oneHour)],
  },
  {
    id: "pedicure-tradicional",
    slug: l("pedicure-tradicional", "traditional-pedicure"),
    categoryId: "unas",
    name: l("Pedicure tradicional", "Traditional pedicure"),
    shortDescription: l("Pedicure tradicional.", "Traditional pedicure."),
    resultDuration: l("10 a 15 dias.", "10 to 15 days."),
    offers: [offer("colombia", 27000, "COP", d.pedicureRange)],
  },
  {
    id: "manicure-pedicure",
    slug: l("manicure-pedicure", "manicure-pedicure"),
    categoryId: "unas",
    name: l("Manicure + pedicure", "Manicure + pedicure"),
    shortDescription: l(
      "Valor combinado si se hacen las dos juntas.",
      "Combined price when both services are done together.",
    ),
    offers: [offer("colombia", 45000, "COP", d.threeHours)],
  },
  {
    id: "manicure-semipermanente",
    slug: l("manicure-semipermanente", "gel-manicure"),
    categoryId: "unas",
    name: l("Manicure semipermanente", "Gel manicure"),
    shortDescription: l(
      "Semipermanente con secado inmediato y brillo.",
      "Gel manicure with instant curing and shine.",
    ),
    resultDuration: l("20 a 25 dias.", "20 to 25 days."),
    offers: [offer("colombia", 55000, "COP", d.semiRange)],
  },
  {
    id: "pedicure-semipermanente",
    slug: l("pedicure-semipermanente", "gel-pedicure"),
    categoryId: "unas",
    name: l("Pedicure semipermanente", "Gel pedicure"),
    shortDescription: l(
      "Pedicure semipermanente con secado inmediato.",
      "Gel pedicure with instant curing.",
    ),
    resultDuration: l("20 a 25 dias.", "20 to 25 days."),
    offers: [offer("colombia", 55000, "COP", d.semiRange)],
  },
  {
    id: "base-rubber",
    slug: l("base-rubber", "rubber-base"),
    categoryId: "unas",
    name: l("Base rubber", "Rubber base"),
    shortDescription: l(
      "Base que ayuda a tener una uña mas gruesa y resistente.",
      "Base that helps create a thicker, stronger natural nail.",
    ),
    offers: [offer("colombia", 67000, "COP", d.semiRange)],
  },
  {
    id: "dipping",
    slug: l("dipping", "dipping-powder"),
    categoryId: "unas",
    name: l("Dipping", "Dipping powder"),
    shortDescription: l(
      "Capas delgadas de polvo acrilico sobre la uña natural.",
      "Thin acrylic powder layers over the natural nail.",
    ),
    offers: [offer("colombia", 75000, "COP", d.twoHours)],
  },
  {
    id: "press-on",
    slug: l("press-on", "press-on-nails"),
    categoryId: "unas",
    name: l("Press on", "Press-on nails"),
    shortDescription: l(
      "Uña postiza en gel que no daña la uña natural.",
      "Gel press-on nails that do not damage the natural nail.",
    ),
    offers: [
      offer("colombia", 100000, "COP", d.pressOnRange, undefined, [
        addon("retoque", l("Retoque", "Refill"), 90000, "COP"),
      ]),
    ],
  },
  {
    id: "acrilico-esculpido",
    slug: l("acrilico-esculpido", "sculpted-acrylic"),
    categoryId: "unas",
    name: l("Acrilico esculpido", "Sculpted acrylic"),
    shortDescription: l(
      "Acrilico para alargar y evitar que se quiebren las uñas.",
      "Acrylic system to lengthen and help prevent nail breakage.",
    ),
    offers: [
      offer("colombia", 140000, "COP", d.threeThirty, undefined, [
        addon("retoque", l("Retoque", "Refill"), 100000, "COP"),
      ]),
    ],
  },
  {
    id: "acrilico-cubrimiento",
    slug: l("acrilico-cubrimiento", "acrylic-overlay"),
    categoryId: "unas",
    name: l("Acrilico cubrimiento", "Acrylic overlay"),
    shortDescription: l(
      "Cubrimiento acrilico sobre la uña.",
      "Acrylic overlay over the nail.",
    ),
    offers: [
      offer("colombia", 120000, "COP", d.threeThirty, undefined, [
        addon("retoque", l("Retoque", "Refill"), 90000, "COP"),
      ]),
    ],
  },
  {
    id: "retiro-acrilico",
    slug: l("retiro-acrilico", "acrylic-removal"),
    categoryId: "unas",
    name: l("Retiro acrilico", "Acrylic removal"),
    shortDescription: l("Retiro de sistema acrilico.", "Acrylic system removal."),
    offers: [offer("colombia", 25000, "COP", d.oneHour)],
  },
  {
    id: "retiro-semipermanente",
    slug: l("retiro-semipermanente", "gel-removal"),
    categoryId: "unas",
    name: l("Retiro semipermanente", "Gel removal"),
    shortDescription: l("Retiro de semipermanente.", "Gel polish removal."),
    offers: [offer("colombia", 20000, "COP", d.oneHour)],
  },
  {
    id: "retiro-press-on",
    slug: l("retiro-press-on", "press-on-removal"),
    categoryId: "unas",
    name: l("Retiro press on", "Press-on removal"),
    shortDescription: l("Retiro de press on.", "Press-on nail removal."),
    offers: [offer("colombia", 25000, "COP", d.oneHour)],
  },
  {
    id: "maquillaje-social",
    slug: l("maquillaje-social", "social-makeup"),
    categoryId: "peinados-maquillaje",
    name: l("Maquillaje social", "Social makeup"),
    shortDescription: l(
      "Enviar imagen de referencia para dar valor exacto si aplica.",
      "Send a reference image for an exact quote when needed.",
    ),
    offers: [offer("colombia", 95000, "COP", d.ninety)],
  },
  {
    id: "peinado-social",
    slug: l("peinado-social", "event-hairstyling"),
    categoryId: "peinados-maquillaje",
    name: l("Peinado social", "Event hairstyling"),
    shortDescription: l(
      "Enviar imagen de referencia para cotizar.",
      "Send a reference image for a quote.",
    ),
    offers: [offer("colombia", 45000, "COP", d.halfHour)],
  },
  {
    id: "trenzas",
    slug: l("trenzas", "braids"),
    categoryId: "peinados-maquillaje",
    name: l("Trenzas", "Braids"),
    shortDescription: l(
      "Servicio segun referencia y diseño.",
      "Service based on the reference and design.",
    ),
    offers: [
      offer(
        "colombia",
        15000,
        "COP",
        d.braidsRange,
        l("Cotizar segun referencia.", "Quote according to reference."),
      ),
    ],
  },
]);
