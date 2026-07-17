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
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-07.jpeg",
    publicPath: "/images/xiomara/xiomara-hero-home.jpg",
    alt: l(
      "Xiomara Sánchez en su estudio de Cali con diplomas y certificaciones profesionales en la pared",
      "Xiomara Sánchez at her Cali studio with professional diplomas and certifications on the wall",
    ),
    width: 1000,
    height: 1500,
  },
  {
    id: "xiomara-retrato-mundo",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-12.jpeg",
    publicPath: "/images/xiomara/xiomara-retrato-mundo.jpg",
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
    width: 1152,
    height: 864,
  },
  {
    id: "curso-lifting-pestanas",
    type: "course",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-09.jpeg",
    publicPath: "/images/formaciones/curso-lifting-pestanas.jpg",
    alt: l(
      "Xiomara Sánchez en la camilla de su estudio con su equipo profesional, formadora de la Master Class",
      "Xiomara Sánchez at her studio treatment chair with her professional tools, masterclass trainer",
    ),
    width: 1366,
    height: 1025,
  },
  {
    id: "curso-cejas-henna",
    type: "course",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/sombreado-henna/incoming-lote-2026-07-09/02-collage-sombreado-henna.png",
    publicPath: "/images/formaciones/curso-cejas-henna.jpg",
    alt: l(
      "Cejas con diseño sombreado en henna, resultado de la Master Class",
      "Brows with henna shading design, masterclass result",
    ),
    width: 675,
    height: 507,
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
    id: "estudio-puerto-sagunto-portada",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/estudio-puerto-sagunto/01-portada-cabina-letras-cejas-internacionales.jpeg",
    publicPath:
      "/images/estudio/puerto-sagunto/01-portada-cabina-letras-cejas-internacionales.jpeg",
    alt: l(
      "Cabina de Cejas Internacionales en Puerto de Sagunto con letras del estudio",
      "Cejas Internacionales treatment room in Puerto de Sagunto with studio lettering",
    ),
    width: 1536,
    height: 2048,
  },
  {
    id: "estudio-puerto-sagunto-interior",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/estudio-puerto-sagunto/02-interior-vista-general-local.jpeg",
    publicPath:
      "/images/estudio/puerto-sagunto/02-interior-vista-general-local.jpeg",
    alt: l(
      "Interior del estudio de Cejas Internacionales en Puerto de Sagunto",
      "Interior of the Cejas Internacionales studio in Puerto de Sagunto",
    ),
    width: 1536,
    height: 2048,
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
    height: 1080,
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
    height: 1015,
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
    height: 1555,
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
    // Tarjeta de mercado Colombia: retrato de Xiomara (pedido clienta 16/07/2026,
    // para no repetir en la home las fotos de las sedes físicas).
    id: "mercado-colombia-retrato",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-02.jpeg",
    publicPath: "/images/mercados/mercado-colombia-retrato.jpg",
    alt: l(
      "Xiomara Sánchez en su escritorio con pigmentos y dermógrafo, lista para atender en Colombia",
      "Xiomara Sánchez at her desk with pigments and PMU device, ready to serve clients in Colombia",
    ),
    width: 1200,
    height: 1600,
  },
  {
    // Tarjeta de mercado España/Europa: retrato profesional de Xiomara (pedido clienta 16/07/2026).
    id: "mercado-espana-retrato",
    type: "photo",
    sourcePath:
      "docs/cliente/assets-extraidos/xiomara-sesion-profesional/xiomara-sesion-profesional-03.jpeg",
    publicPath: "/images/mercados/mercado-espana-retrato.jpg",
    alt: l(
      "Retrato profesional de Xiomara Sánchez con uniforme de trabajo",
      "Professional portrait of Xiomara Sánchez in her work uniform",
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
    width: 903,
    height: 1320,
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
    height: 908,
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
    width: 870,
    height: 1285,
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
  // --- Fotos por servicio (lote clienta 2026-07-09) ---
  {
    id: "servicio-laminado-cejas",
    type: "photo",
    sourcePath: "docs/cliente/fotos-servicios-2026/laminado-cejas/laminado-cejas-original.png",
    publicPath: "/images/servicios/laminado-cejas.webp",
    alt: l(
      "Resultado de laminado de cejas con pelo peinado hacia arriba",
      "Brow lamination result with hairs brushed upward",
    ),
    width: 814,
    height: 1024,
  },
  {
    id: "servicio-sombreado-henna",
    type: "photo",
    sourcePath: "docs/cliente/fotos-servicios-2026/sombreado-henna/sombreado-henna-original.png",
    publicPath: "/images/servicios/sombreado-henna.webp",
    alt: l(
      "Cejas con sombreado en henna y diseño definido",
      "Brows with henna shading and a defined design",
    ),
    width: 676,
    height: 1024,
  },
  {
    id: "servicio-depilacion-cejas-cera",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/depilacion-cejas-cera/depilacion-cejas-cera-original.png",
    publicPath: "/images/servicios/depilacion-cejas-cera.webp",
    alt: l(
      "Aplicación de cera para perfilar la ceja",
      "Wax application to shape the brow",
    ),
    width: 1024,
    height: 1024,
  },
  {
    id: "servicio-efecto-polvo",
    type: "photo",
    sourcePath: "docs/cliente/fotos-servicios-2026/efecto-polvo/efecto-polvo-original.png",
    publicPath: "/images/servicios/efecto-polvo.webp",
    alt: l(
      "Ceja cicatrizada con micropigmentación efecto polvo en tono natural",
      "Healed brow with powder-effect micropigmentation in a natural tone",
    ),
    width: 640,
    height: 480,
  },
  {
    id: "servicio-efecto-maquillaje",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/efecto-maquillaje/efecto-maquillaje-original.jpeg",
    publicPath: "/images/servicios/efecto-maquillaje.webp",
    alt: l(
      "Resultado de micropigmentación efecto maquillaje en cejas",
      "Makeup-effect brow micropigmentation result",
    ),
    width: 1180,
    height: 2048,
  },
  {
    id: "servicio-cejas-hibridas",
    type: "photo",
    sourcePath: "docs/cliente/fotos-servicios-2026/cejas-hibridas/cejas-hibridas-original.jpeg",
    publicPath: "/images/servicios/cejas-hibridas.webp",
    alt: l(
      "Cejas híbridas con trazos pelo a pelo y sombreado",
      "Hybrid brows combining hair strokes and shading",
    ),
    width: 1169,
    height: 1600,
  },
  {
    id: "servicio-correccion-cejas",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/correccion-cejas/01-antes-despues-correccion-cejas.png",
    publicPath: "/images/servicios/correccion-cejas.webp",
    alt: l(
      "Cejas corregidas y rediseñadas tras una micropigmentación previa",
      "Brows corrected and redesigned after previous micropigmentation work",
    ),
    width: 727,
    height: 1024,
  },
  {
    id: "servicio-neutralizacion-labios",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/neutralizacion-labios/incoming-lote-2026-07-09/collage-neutralizacion-texto.png",
    publicPath: "/images/servicios/neutralizacion-labios.webp",
    alt: l(
      "Labios neutralizados con tono rosa natural y uniforme",
      "Neutralized lips with an even, natural pink tone",
    ),
    width: 658,
    height: 410,
  },
  {
    id: "servicio-microlips",
    type: "photo",
    sourcePath: "docs/cliente/fotos-servicios-2026/microlips/microlips-original.png",
    publicPath: "/images/servicios/microlips.webp",
    alt: l(
      "Micropigmentación labial Microlips con color intenso y definido",
      "Microlips lip micropigmentation with intense, defined color",
    ),
    width: 636,
    height: 1024,
  },
  {
    id: "servicio-hidralips",
    type: "photo",
    sourcePath: "docs/cliente/fotos-servicios-2026/hidralips/hidralips-original.png",
    publicPath: "/images/servicios/hidralips.webp",
    alt: l(
      "Antes y después de la primera sesión de HidraLips con labios hidratados",
      "Before and after of the first HidraLips session with hydrated lips",
    ),
    width: 471,
    height: 843,
  },
  {
    id: "servicio-linea-ojos",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/relleno-pestanas/01-antes-despues-linea-pestanas.png",
    publicPath: "/images/servicios/linea-ojos.webp",
    alt: l(
      "Antes y después de línea de ojos micropigmentada sobre la línea de pestañas superior",
      "Before and after of a micropigmented eyeliner along the upper lash line",
    ),
    width: 831,
    height: 1024,
  },
  {
    id: "servicio-relleno-pestanas",
    type: "photo",
    sourcePath: "docs/cliente/fotos-servicios-2026/linea-ojos/linea-ojos-original.png",
    publicPath: "/images/servicios/relleno-pestanas.webp",
    alt: l(
      "Relleno de pestañas con línea de agua maquillada y efecto de mayor densidad",
      "Lash line enhancement with a tinted waterline and fuller-lash effect",
    ),
    width: 768,
    height: 1024,
  },
  {
    id: "servicio-lifting-pestanas",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/lifting-pestanas/lifting-pestanas-original.png",
    publicPath: "/images/servicios/lifting-pestanas.webp",
    alt: l(
      "Pestañas naturales onduladas tras un lifting con tinte",
      "Natural lashes curled after a lash lift with tint",
    ),
    width: 660,
    height: 1024,
  },
  {
    id: "servicio-depilacion-axilas",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/depilacion-axilas/depilacion-axilas-original.png",
    publicPath: "/images/servicios/depilacion-axilas.webp",
    alt: l(
      "Aplicación de cera durante una depilación de axilas",
      "Wax application during underarm hair removal",
    ),
    width: 576,
    height: 1024,
  },
  {
    id: "servicio-depilacion-bigote-bozo",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/depilacion-bigote-bozo/depilacion-bigote-bozo-original.png",
    publicPath: "/images/servicios/depilacion-bigote-bozo.webp",
    alt: l(
      "Depilación con cera del bozo en el labio superior",
      "Upper-lip waxing in progress",
    ),
    width: 417,
    height: 626,
  },
  {
    id: "servicio-depilacion-nariz",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/depilacion-nariz/depilacion-nariz-original.png",
    publicPath: "/images/servicios/depilacion-nariz.webp",
    alt: l(
      "Depilación de nariz con cera aplicada en la fosa nasal",
      "Nose waxing with wax applied to the nostril",
    ),
    width: 846,
    height: 1024,
  },
  {
    id: "servicio-depilacion-media-pierna",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/depilacion-media-pierna/depilacion-media-pierna-original.png",
    publicPath: "/images/servicios/depilacion-media-pierna.webp",
    alt: l(
      "Aplicación de cera durante una depilación de media pierna",
      "Wax application during half-leg hair removal",
    ),
    width: 682,
    height: 1024,
  },
  // Sets de extensiones de pestañas (recortes del collage 3×3 de la clienta).
  {
    id: "servicio-set-rimel",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/set-rimel.webp",
    alt: l(
      "Extensiones de pestañas set rímel con efecto de máscara natural",
      "Mascara-look lash extension set with a natural mascara effect",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-volumen-ligero",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/volumen-ligero.webp",
    alt: l(
      "Extensiones de pestañas de volumen ligero con acabado suave",
      "Light volume lash extensions with a soft finish",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-wispy",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/wispy.webp",
    alt: l(
      "Extensiones de pestañas wispy con picos de distintas longitudes",
      "Wispy lash extensions with spiked, varied lengths",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-volumen-ruso-2d",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/volumen-ruso-2d.webp",
    alt: l(
      "Extensiones de pestañas volumen ruso 2D con densidad completa",
      "Russian volume 2D lash extensions with full density",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-mega-volumen",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/mega-volumen.webp",
    alt: l(
      "Extensiones de pestañas mega volumen con efecto dramático",
      "Mega volume lash extensions with a dramatic effect",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-volumen-aura-2d",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/volumen-aura-2d.webp",
    alt: l(
      "Extensiones de pestañas volumen aura 2D con acabado uniforme",
      "Aura volume 2D lash extensions with an even finish",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-volumen-aura-5d",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/volumen-aura-5d.webp",
    alt: l(
      "Extensiones de pestañas volumen aura 5D con alta densidad",
      "Aura volume 5D lash extensions with high density",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-volumen-griego-3d",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/volumen-griego-3d.webp",
    alt: l(
      "Extensiones de pestañas volumen griego 3D con textura marcada",
      "Greek volume 3D lash extensions with a textured look",
    ),
    width: 576,
    height: 432,
  },
  {
    id: "servicio-volumen-griego-5d",
    type: "photo",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png",
    publicPath: "/images/servicios/volumen-griego-5d.webp",
    alt: l(
      "Extensiones de pestañas volumen griego 5D con máxima densidad",
      "Greek volume 5D lash extensions with maximum density",
    ),
    width: 576,
    height: 432,
  },
  // --- Reservas del lote 2026-07-09 → galería de resultados ---
  {
    id: "result-lifting-antes-despues",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/lifting-pestanas/incoming-lote-2026-07-09/03-antes-despues.png",
    publicPath: "/images/resultados/result-lifting-antes-despues.webp",
    alt: l(
      "Antes y después de un lifting de pestañas con tinte",
      "Before and after of a lash lift with tint",
    ),
    width: 768,
    height: 1024,
  },
  {
    id: "result-laminado-collage",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/laminado-cejas/incoming-lote-2026-07-09/03-collage-antes-despues-laminado-henna.png",
    publicPath: "/images/resultados/result-laminado-collage.webp",
    alt: l(
      "Antes y después de laminado de cejas con henna y depilación",
      "Before and after of brow lamination with henna and waxing",
    ),
    width: 642,
    height: 1024,
  },
  {
    id: "result-laminado-closeup",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/laminado-cejas/incoming-lote-2026-07-09/01-closeup-resultado-piercing.png",
    publicPath: "/images/resultados/result-laminado-closeup.webp",
    alt: l(
      "Detalle de cejas laminadas con acabado peinado y natural",
      "Close-up of laminated brows with a brushed, natural finish",
    ),
    width: 762,
    height: 1024,
  },
  {
    id: "result-microlips-collage",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/microlips/incoming-lote-2026-07-09/02-collage-grid-antes-despues.png",
    publicPath: "/images/resultados/result-microlips-collage.webp",
    alt: l(
      "Collage de antes y después de micropigmentación labial Microlips",
      "Before-and-after collage of Microlips lip micropigmentation",
    ),
    width: 588,
    height: 1024,
  },
  {
    id: "result-microlips-duo",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/microlips/incoming-lote-2026-07-09/01-collage-dos-labios.png",
    publicPath: "/images/resultados/result-microlips-duo.webp",
    alt: l(
      "Dos resultados de micropigmentación labial con tonos rosados",
      "Two lip micropigmentation results with rosy tones",
    ),
    width: 577,
    height: 1024,
  },
  {
    id: "result-neutralizacion-antes-despues",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/neutralizacion-labios/incoming-lote-2026-07-09/collage-antes-despues-logo.png",
    publicPath: "/images/resultados/result-neutralizacion-antes-despues.webp",
    alt: l(
      "Antes y después de neutralización de labios oscuros",
      "Before and after of dark lip neutralization",
    ),
    width: 775,
    height: 1024,
  },
  {
    id: "result-henna-collage",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/sombreado-henna/incoming-lote-2026-07-09/02-collage-sombreado-henna.png",
    publicPath: "/images/resultados/result-henna-collage.webp",
    alt: l(
      "Resultado de sombreado de cejas en henna con diseño a medida",
      "Henna brow shading result with a tailored design",
    ),
    width: 652,
    height: 1024,
  },
  {
    id: "result-efecto-polvo-procedimiento",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/efecto-polvo/incoming-lote-2026-07-09/01-procedimiento-vista-invertida.png",
    publicPath: "/images/resultados/result-efecto-polvo-procedimiento.webp",
    alt: l(
      "Micropigmentación efecto polvo recién realizada en el estudio",
      "Powder-effect micropigmentation freshly done at the studio",
    ),
    width: 825,
    height: 1024,
  },
  {
    id: "result-relleno-antes-despues",
    type: "gallery",
    sourcePath:
      "docs/cliente/fotos-servicios-2026/relleno-pestanas/01-antes-despues-linea-pestanas.png",
    publicPath: "/images/resultados/result-relleno-antes-despues.webp",
    alt: l(
      "Antes y después de un relleno de pestañas en la línea de agua",
      "Before and after of a lash line enhancement",
    ),
    width: 831,
    height: 1024,
  },
]);

export const marketMediaIds: Record<string, string> = {
  // Retratos de Xiomara distintos por país; las fotos de sede quedan solo en
  // la sección de sedes físicas (pedido clienta 16/07/2026).
  colombia: "mercado-colombia-retrato",
  "espana-europa": "mercado-espana-retrato",
  suiza: "mercado-suiza",
};

/** Imagen pequeña del par editorial en la ficha de mercado (hero lateral). */
export const marketSecondaryMediaIds: Record<string, string> = {
  "espana-europa": "estudio-puerto-sagunto-interior",
};

export const serviceCategoryMediaIds: Record<string, string> = {
  cejas: "result-cejas-01",
  "micropigmentacion-cejas": "result-cejas-03",
  labios: "result-labios-01",
  "mirada-pestanas": "result-mirada-01",
  "extensiones-pestanas": "sets-pestanas-panel",
};

/**
 * Foto propia por servicio (lote clienta jul 2026).
 * Reglas: refuerzos, uñas y peinados no tienen foto (fallback de categoría o
 * ninguna); cuchilla va SIN foto por pedido de la clienta (reunión 12/07/2026):
 * `null` explícito = no mostrar imagen ni caer al fallback de categoría;
 * HidraLips comparte foto entre 1 y 3 sesiones; los servicios «por punto»
 * reutilizan el set más parecido.
 */
export const serviceMediaIds: Record<string, string | null> = {
  "laminado-cejas": "servicio-laminado-cejas",
  "sombreado-henna": "servicio-sombreado-henna",
  "depilacion-cejas-cera": "servicio-depilacion-cejas-cera",
  "depilacion-cejas-cuchilla": null,
  "efecto-polvo": "servicio-efecto-polvo",
  "efecto-maquillaje": "servicio-efecto-maquillaje",
  "cejas-hibridas": "servicio-cejas-hibridas",
  "correccion-cejas": "servicio-correccion-cejas",
  "neutralizacion-labios": "servicio-neutralizacion-labios",
  microlips: "servicio-microlips",
  "hidralips-una-sesion": "servicio-hidralips",
  "hidralips-tres-sesiones": "servicio-hidralips",
  "linea-ojos": "servicio-linea-ojos",
  "relleno-pestanas": "servicio-relleno-pestanas",
  "lifting-pestanas": "servicio-lifting-pestanas",
  "depilacion-axilas": "servicio-depilacion-axilas",
  "depilacion-bigote-bozo": "servicio-depilacion-bigote-bozo",
  "depilacion-nariz": "servicio-depilacion-nariz",
  "depilacion-media-pierna": "servicio-depilacion-media-pierna",
  // Extensiones CO: el collage maestro es de baja resolución y los recortes
  // por celda se ven pixelados/«mochos»; la clienta aceptó (12/07/2026) mostrar
  // el panel completo tal cual hasta tener fotos individuales por set.
  "set-rimel": "sets-pestanas-panel",
  "volumen-ligero": "sets-pestanas-panel",
  wispy: "sets-pestanas-panel",
  "volumen-ruso-2d": "sets-pestanas-panel",
  "mega-volumen": "sets-pestanas-panel",
  "volumen-aura-2d": "sets-pestanas-panel",
  "volumen-aura-5d": "sets-pestanas-panel",
  "volumen-griego-3d": "sets-pestanas-panel",
  "volumen-griego-5d": "sets-pestanas-panel",
  "por-punto-efecto-volumen": "sets-pestanas-panel",
  "por-punto-mega-volumen": "sets-pestanas-panel",
  "refuerzo-cejas-hibridas": "servicio-cejas-hibridas",
  "refuerzo-microlips": "servicio-microlips",
  "refuerzo-linea-ojos": "servicio-linea-ojos",
};
