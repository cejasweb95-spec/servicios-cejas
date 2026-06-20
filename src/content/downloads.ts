import { downloadSchema, type Download } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const downloads = downloadSchema.array().parse([
  {
    id: "catalogo-colombia-cop",
    type: "catalog",
    marketId: "colombia",
    title: l("Catálogo de Colombia", "Colombia catalog"),
    description: l(
      "PDF oficial con servicios y precios en pesos colombianos.",
      "Official PDF with services and prices in Colombian pesos.",
    ),
    publicPath: "/descargas/catalogos/catalogo-colombia-cejas-internacionales.pdf",
    sourcePath: "docs/cliente/catalogo-colombia-cop.pdf",
    fileSizeBytes: 1747310,
  },
  {
    id: "catalogo-espana-eur",
    type: "catalog",
    marketId: "espana-europa",
    title: l("Catálogo de España / Europa", "Spain / Europe catalog"),
    description: l(
      "PDF oficial con servicios y precios en euros.",
      "Official PDF with services and prices in euros.",
    ),
    publicPath: "/descargas/catalogos/catalogo-espana-europa-cejas-internacionales.pdf",
    sourcePath: "docs/cliente/catalogo-españa-eur.pdf",
    fileSizeBytes: 1416718,
  },
  {
    id: "catalogo-suiza-chf",
    type: "catalog",
    marketId: "suiza",
    title: l("Catálogo de Suiza", "Switzerland catalog"),
    description: l(
      "PDF oficial con servicios y precios confirmados en francos suizos.",
      "Official PDF with confirmed services and prices in Swiss francs.",
    ),
    publicPath: "/descargas/catalogos/catalogo-suiza-cejas-internacionales.pdf",
    sourcePath: "docs/cliente/catalogo-suiza-chf.pdf",
    fileSizeBytes: 16841956,
  },
  {
    id: "curso-micropigmentacion-cejas",
    type: "course_pdf",
    courseId: "curso-micropigmentacion-cejas",
    title: l(
      "PDF del curso profesional de micropigmentación de cejas",
      "Professional brow micropigmentation course PDF",
    ),
    description: l(
      "Programa descargable del curso profesional de micropigmentación de cejas.",
      "Downloadable program for the professional brow micropigmentation course.",
    ),
    publicPath: "/descargas/formaciones/curso-micropigmentacion-cejas.pdf",
    sourcePath:
      "docs/cliente/assets-extraidos/formaciones-pdfs/originales/curso-micropigmentacion-cejas.pdf",
    fileSizeBytes: 1078145,
  },
  {
    id: "curso-micropigmentacion-labios",
    type: "course_pdf",
    courseId: "curso-micropigmentacion-labios",
    title: l(
      "PDF del curso profesional de micropigmentación y neutralización labial",
      "Professional lip micropigmentation and neutralization course PDF",
    ),
    description: l(
      "Programa descargable del curso profesional de micropigmentación y neutralización labial.",
      "Downloadable program for the professional lip micropigmentation and neutralization course.",
    ),
    publicPath: "/descargas/formaciones/curso-micropigmentacion-labios.pdf",
    sourcePath:
      "docs/cliente/assets-extraidos/formaciones-pdfs/originales/curso-micropigmentacion-labios.pdf",
    fileSizeBytes: 1028344,
  },
  {
    id: "masterclass-laminado-cejas",
    type: "course_pdf",
    courseId: "masterclass-laminado-cejas",
    title: l("PDF Master Class Laminado de Cejas", "Brow Lamination Master Class PDF"),
    description: l(
      "Programa descargable de la Master Class de Laminado de Cejas.",
      "Downloadable program for the Brow Lamination Master Class.",
    ),
    publicPath: "/descargas/formaciones/masterclass-laminado-cejas.pdf",
    sourcePath:
      "docs/cliente/assets-extraidos/formaciones-pdfs/originales/masterclass-laminado-cejas.pdf",
    fileSizeBytes: 511129,
  },
  {
    id: "masterclass-lifting-pestanas",
    type: "course_pdf",
    courseId: "masterclass-lifting-pestanas",
    title: l("PDF Master Class Lifting de Pestañas", "Lash Lift Master Class PDF"),
    description: l(
      "Programa descargable de la Master Class de Lifting de Pestañas.",
      "Downloadable program for the Lash Lift Master Class.",
    ),
    publicPath: "/descargas/formaciones/masterclass-lifting-pestanas.pdf",
    sourcePath:
      "docs/cliente/assets-extraidos/formaciones-pdfs/originales/masterclass-lifting-pestanas.pdf",
    fileSizeBytes: 506569,
  },
  {
    id: "masterclass-cejas-henna",
    type: "course_pdf",
    courseId: "masterclass-cejas-henna",
    title: l("PDF Master Class Cejas en Henna", "Henna Brows Master Class PDF"),
    description: l(
      "Programa descargable de la Master Class de Cejas en Henna.",
      "Downloadable program for the Henna Brows Master Class.",
    ),
    publicPath: "/descargas/formaciones/masterclass-cejas-henna.pdf",
    sourcePath:
      "docs/cliente/assets-extraidos/formaciones-pdfs/originales/masterclass-cejas-henna.pdf",
    fileSizeBytes: 541796,
  },
] satisfies Download[]);
