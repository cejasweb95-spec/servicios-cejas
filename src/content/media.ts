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
]);
