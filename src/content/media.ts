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
      "Xiomara Sanchez, especialista de Cejas Internacionales",
      "Xiomara Sanchez, Cejas Internacionales specialist",
    ),
    width: 1339,
    height: 1867,
  },
  {
    id: "xiomara-hero-escritorio",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-02.jpeg",
    publicPath: "/images/xiomara/xiomara-hero-escritorio.jpg",
    alt: l(
      "Xiomara Sánchez, especialista de Cejas Internacionales, en su estudio",
      "Xiomara Sánchez, Cejas Internacionales specialist, in her studio",
    ),
    width: 1400,
    height: 1329,
  },
  {
    id: "xiomara-formadora-tablet",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-13.jpeg",
    publicPath: "/images/formaciones/xiomara-formadora-tablet.jpg",
    alt: l(
      "Xiomara Sanchez preparando material de formacion profesional con una tableta",
      "Xiomara Sanchez preparing professional training material with a tablet",
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
      "Xiomara mostrando pigmentos utilizados en la formacion profesional de cejas",
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
      "Detalle de pestanas utilizado en la Master Class de lifting",
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
      "Detalle de diseno de cejas utilizado en la Master Class de henna",
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
      "Xiomara con uniforme de Cejas Internacionales y dermografo",
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
    type: "gallery",
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
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/cejas/cejas-11.jpeg",
    publicPath: "/images/resultados/result-cejas-04.jpg",
    alt: l(
      "Detalle de cejas con técnica de micropigmentación definida",
      "Brow detail with a defined micropigmentation technique",
    ),
    width: 1000,
    height: 1778,
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
    sourcePath: "docs/cliente/assets-extraidos/fotos-instagram/mirada/mirada-03.jpeg",
    publicPath: "/images/resultados/result-pestanas-01.jpg",
    alt: l(
      "Resultado de lifting de pestañas con curvatura natural",
      "Lash lift result with a natural curl",
    ),
    width: 1000,
    height: 1778,
  },
]);
