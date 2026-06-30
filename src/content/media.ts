import { mediaAssetSchema } from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

export const mediaAssets = mediaAssetSchema.array().parse([
  {
    id: "logo-oficial",
    type: "logo",
    sourcePath: "docs/cliente/assets-extraidos/logo-oficial-sin-fondo.png",
    publicPath: "/images/brand/logo-oficial-sin-fondo.png",
    alt: l("Logo de Cejas Internacionales", "Cejas Internacionales logo"),
    width: 2095,
    height: 949,
  },
  {
    id: "logo-negro",
    type: "logo",
    sourcePath: "docs/cliente/assets-extraidos/logo-oficial-negro-monocromo.png",
    publicPath: "/images/brand/logo-oficial-negro-monocromo.png",
    alt: l(
      "Logo negro monocromo de Cejas Internacionales",
      "Black monochrome Cejas Internacionales logo",
    ),
    width: 2095,
    height: 949,
  },
  {
    id: "logo-blanco",
    type: "logo",
    sourcePath: "docs/cliente/assets-extraidos/logo-oficial-blanco.png",
    publicPath: "/images/brand/logo-oficial-blanco.png",
    alt: l(
      "Logo blanco monocromo de Cejas Internacionales",
      "White monochrome Cejas Internacionales logo",
    ),
    width: 2095,
    height: 949,
  },
  {
    id: "xiomara-foto-profesional",
    type: "photo",
    sourcePath: "docs/cliente/assets-extraidos/xiomara-foto-profesional.jpg",
    publicPath: "/images/xiomara/xiomara-foto-profesional.jpg",
    alt: l(
      "Xiomara Sánchez, especialista de Cejas Internacionales",
      "Xiomara Sánchez, Cejas Internacionales specialist",
    ),
    width: 1339,
    height: 1867,
  },
  {
    id: "xiomara-retrato-rosa",
    type: "photo",
    sourcePath: "docs/cliente/assets-extraidos/xiomara-foto-profesional.jpg",
    publicPath: "/images/xiomara/xiomara-retrato-rosa.jpg",
    alt: l(
      "Xiomara Sánchez, especialista de Cejas Internacionales, sobre fondo claro",
      "Xiomara Sánchez, Cejas Internacionales specialist, on a light background",
    ),
    width: 1200,
    height: 1673,
  },
  {
    id: "xiomara-hero-escritorio",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-12.jpeg",
    publicPath: "/images/xiomara/xiomara-hero-home.jpg",
    alt: l(
      "Xiomara Sánchez con uniforme profesional y globo terráqueo, símbolo de las jornadas internacionales de Cejas Internacionales",
      "Xiomara Sánchez in professional uniform holding a globe, symbol of Cejas Internacionales international appointments",
    ),
    width: 1366,
    height: 2048,
  },
  {
    id: "xiomara-formadora-tablet",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-13.jpeg",
    publicPath: "/images/formaciones/xiomara-formadora-tablet.jpg",
    alt: l(
      "Xiomara Sánchez preparando material de formación profesional con una tableta",
      "Xiomara Sánchez preparing professional training material with a tablet",
    ),
    width: 1050,
    height: 1400,
  },
  {
    id: "xiomara-certificaciones-estudio",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-07.jpeg",
    publicPath: "/images/xiomara/xiomara-certificaciones-estudio.jpg",
    alt: l(
      "Xiomara en su estudio de Cali frente a su pared de certificaciones profesionales",
      "Xiomara at her Cali studio in front of her professional certification wall",
    ),
    width: 1000,
    height: 1500,
  },
  {
    id: "curso-cejas-pigmentos",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-08.jpeg",
    publicPath: "/images/formaciones/curso-cejas-pigmentos.jpg",
    alt: l(
      "Xiomara mostrando pigmentos utilizados en la formación profesional de cejas",
      "Xiomara presenting pigments used in professional brow training",
    ),
    width: 1200,
    height: 900,
  },
  {
    id: "curso-labios-demostracion",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-05.jpeg",
    publicPath: "/images/formaciones/curso-labios-demostracion.jpg",
    alt: l(
      "Xiomara mostrando un resultado labial durante una demostracion profesional",
      "Xiomara presenting a lip result during a professional demonstration",
    ),
    width: 1200,
    height: 900,
  },
  {
    id: "curso-laminado-cejas",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/fotos-instagram/cejas/cejas-05.jpeg",
    publicPath: "/images/formaciones/curso-laminado-cejas.jpg",
    alt: l(
      "Detalle de ceja utilizado en la Master Class de laminado de cejas",
      "Brow detail used in the brow lamination masterclass",
    ),
    width: 992,
    height: 744,
  },
  {
    id: "curso-lifting-pestanas",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/formaciones-pdfs/master-class-lifting/page-02-image-01.jpg",
    publicPath: "/images/formaciones/curso-lifting-pestanas.jpg",
    alt: l(
      "Detalle de pestañas utilizado en la Master Class de lifting",
      "Lash detail used in the lash lift masterclass",
    ),
    width: 992,
    height: 744,
  },
  {
    id: "curso-cejas-henna",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/fotos-instagram/cejas/cejas-10.jpeg",
    publicPath: "/images/formaciones/curso-cejas-henna.jpg",
    alt: l(
      "Detalle de diseño de cejas utilizado en la Master Class de henna",
      "Brow design detail used in the henna brow masterclass",
    ),
    width: 992,
    height: 744,
  },
  {
    id: "xiomara-uniforme-dermografo",
    type: "photo",
    sourcePath: "docs/cliente/assets-extraidos/xiomara-uniforme-dermografo.jpg",
    publicPath: "/images/xiomara/xiomara-uniforme-dermografo.jpg",
    alt: l(
      "Xiomara con uniforme de Cejas Internacionales y dermógrafo",
      "Xiomara wearing the Cejas Internacionales uniform and holding a dermograph",
    ),
    width: 576,
    height: 768,
  },
  {
    id: "estudio-cabina-certificados",
    type: "photo",
    sourcePath: "docs/cliente/assets-extraidos/estudio-cabina-certificados.jpg",
    publicPath: "/images/xiomara/estudio-cabina-certificados.jpg",
    alt: l(
      "Cabina del estudio de Cali con certificados visibles",
      "Cali studio room with visible certificates",
    ),
    width: 890,
    height: 1267,
  },
  {
    id: "resultados-cejas-labios-pared",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/resultados-cejas-labios-pared.jpg",
    publicPath: "/images/resultados/resultados-cejas-labios-pared.jpg",
    alt: l(
      "Panel con resultados reales de cejas y labios",
      "Panel with real brow and lip results",
    ),
    width: 799,
    height: 1137,
  },
  {
    id: "sets-pestanas-panel",
    type: "photo",
    sourcePath: "docs/cliente/assets-extraidos/sets-pestanas-panel.jpg",
    publicPath: "/images/servicios/sets-pestanas-panel.jpg",
    alt: l(
      "Panel visual de sets de extensiones de pestañas",
      "Visual panel of lash extension sets",
    ),
    width: 739,
    height: 1111,
  },
  {
    id: "result-labios-01",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/labios/labios-01.jpeg",
    publicPath: "/images/resultados/result-labios-01.jpg",
    alt: l(
      "Resultado de micropigmentación labial con tono natural definido",
      "Lip micropigmentation result with a defined natural tone",
    ),
    width: 1000,
    height: 1333,
  },
  {
    id: "result-labios-02",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/labios/labios-03.jpeg",
    publicPath: "/images/resultados/result-labios-02.jpg",
    alt: l(
      "Micropigmentación de labios con acabado luminoso y simétrico",
      "Lip micropigmentation with a luminous, symmetrical finish",
    ),
    width: 1000,
    height: 1331,
  },
  {
    id: "result-cejas-01",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/cejas/cejas-03.jpeg",
    publicPath: "/images/resultados/result-cejas-01.jpg",
    alt: l(
      "Resultado de micropigmentación de cejas con efecto natural en el rostro",
      "Brow micropigmentation result with a natural effect on the face",
    ),
    width: 1000,
    height: 1245,
  },
  {
    id: "result-cejas-02",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/cejas/cejas-04.jpeg",
    publicPath: "/images/resultados/result-cejas-02.jpg",
    alt: l(
      "Diseño de cejas micropigmentadas adaptado a los rasgos del rostro",
      "Micropigmented brow design adapted to the face features",
    ),
    width: 1000,
    height: 1778,
  },
  {
    id: "result-cejas-03",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/cejas/cejas-07.jpeg",
    publicPath: "/images/resultados/result-cejas-03.jpg",
    alt: l(
      "Cejas micropigmentadas con acabado pelo a pelo muy natural",
      "Micropigmented brows with a very natural hair-stroke finish",
    ),
    width: 1000,
    height: 1333,
  },
  {
    id: "result-cejas-04",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-trabajos/es_pag8_2.jpg",
    publicPath: "/images/resultados/result-cejas-04.jpg",
    alt: l(
      "Resultado de cejas y labios micropigmentados con efecto natural",
      "Brow and lip micropigmentation result with a natural effect",
    ),
    width: 630,
    height: 595,
  },
  {
    id: "result-mirada-01",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/mirada/mirada-02.jpeg",
    publicPath: "/images/resultados/result-mirada-01.jpg",
    alt: l(
      "Resultado de diseño de cejas y mirada realzada",
      "Brow design and enhanced eye result",
    ),
    width: 1000,
    height: 1778,
  },
  {
    id: "result-pestanas-01",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-trabajos/es_pag7_1.jpg",
    publicPath: "/images/resultados/result-pestanas-01.jpg",
    alt: l(
      "Resultado de micropigmentación labial con tono definido",
      "Lip micropigmentation result with a defined tone",
    ),
    width: 462,
    height: 611,
  },
  {
    id: "mercado-colombia",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-11.jpeg",
    publicPath: "/images/mercados/mercado-colombia.jpg",
    alt: l(
      "Cabina del estudio físico de Cejas Internacionales en Cali, Colombia",
      "Treatment room at the Cejas Internacionales studio in Cali, Colombia",
    ),
    width: 1200,
    height: 1600,
  },
  {
    id: "mercado-espana-europa",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-01.jpeg",
    publicPath: "/images/mercados/mercado-espana.jpg",
    alt: l(
      "Xiomara Sánchez, especialista de Cejas Internacionales para jornadas en España y Europa",
      "Xiomara Sánchez, Cejas Internacionales specialist for appointments across Spain and Europe",
    ),
    width: 1000,
    height: 1499,
  },
  {
    id: "mercado-suiza",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-04.jpeg",
    publicPath: "/images/mercados/mercado-suiza.jpg",
    alt: l(
      "Xiomara Sánchez preparando una jornada profesional para clientas en Suiza",
      "Xiomara Sánchez preparing for professional appointments in Switzerland",
    ),
    width: 1000,
    height: 1395,
  },
  {
    id: "jornadas-globo",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-12.jpeg",
    publicPath: "/images/jornadas/jornadas-globo.jpg",
    alt: l(
      "Xiomara Sánchez sosteniendo un globo terráqueo, símbolo de las jornadas internacionales",
      "Xiomara Sánchez holding a globe, symbol of international appointments",
    ),
    width: 1200,
    height: 1799,
  },
  {
    id: "result-cejas-05",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-trabajos/co_pag16_2.jpg",
    publicPath: "/images/resultados/result-cejas-05.jpg",
    alt: l(
      "Detalle de cejas micropigmentadas y mirada definida",
      "Detail of micropigmented brows and a defined gaze",
    ),
    width: 540,
    height: 594,
  },
  {
    id: "result-cejas-06",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/cicatrizados/cicatrizados-02.jpeg",
    publicPath: "/images/resultados/result-cejas-06.jpg",
    alt: l(
      "Diseño de cejas pelo a pelo en detalle",
      "Hair-stroke brow design in detail",
    ),
    width: 943,
    height: 2048,
  },
  {
    id: "result-labios-03",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-trabajos/es_pag5_2.jpg",
    publicPath: "/images/resultados/result-labios-03.jpg",
    alt: l(
      "Micropigmentación labial con tono natural y acabado luminoso",
      "Lip micropigmentation with a natural tone and luminous finish",
    ),
    width: 491,
    height: 638,
  },
  {
    id: "result-mirada-02",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/mirada/mirada-01.jpeg",
    publicPath: "/images/resultados/result-mirada-02.jpg",
    alt: l(
      "Resultado de realce de mirada con cejas y pestañas definidas",
      "Enhanced-gaze result with defined brows and lashes",
    ),
    width: 1000,
    height: 1778,
  },
  {
    id: "result-cicatrizado-cejas",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/cicatrizados/cicatrizados-04.jpeg",
    publicPath: "/images/resultados/result-cicatrizado-cejas.jpg",
    alt: l(
      "Cejas micropigmentadas ya cicatrizadas con resultado natural y estable",
      "Healed micropigmented brows with a natural, stable result",
    ),
    width: 900,
    height: 1955,
  },
  {
    id: "result-cicatrizado-labios",
    type: "gallery",
    sourcePath: "docs/cliente/assets-extraidos/fotos-trabajos/es_pag6_1.jpg",
    publicPath: "/images/resultados/result-cicatrizado-labios.jpg",
    alt: l(
      "Resultado labial con tono uniforme y acabado natural",
      "Lip result with an even tone and natural finish",
    ),
    width: 484,
    height: 638,
  },
]);

export const marketMediaIds: Record<string, string> = {
  colombia: "mercado-colombia",
  "espana-europa": "mercado-espana-europa",
  suiza: "mercado-suiza",
};

export const serviceCategoryMediaIds: Record<string, string> = {
  cejas: "result-cejas-01",
  "micropigmentacion-cejas": "result-cejas-03",
  labios: "result-labios-01",
  "mirada-pestanas": "result-mirada-01",
  "extensiones-pestanas": "sets-pestanas-panel",
};
