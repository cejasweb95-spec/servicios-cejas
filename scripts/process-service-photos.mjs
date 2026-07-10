/**
 * Genera los WebP de fotos por servicio (marco 4:3 del detalle) y las fotos
 * de reserva para la galería de resultados, a partir de los originales de la
 * clienta en docs/cliente/fotos-servicios-2026/.
 *
 * Uso: node scripts/process-service-photos.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "docs/cliente/fotos-servicios-2026");
const OUT_SERVICIOS = path.join(ROOT, "public/images/servicios");
const OUT_RESULTADOS = path.join(ROOT, "public/images/resultados");

/**
 * Recortes 4:3 por servicio. Coordenadas medidas sobre el original.
 * region: { left, top, width, height } — width/height ya en proporción ~4:3.
 */
const serviceCrops = [
  {
    id: "laminado-cejas",
    src: "laminado-cejas/laminado-cejas-original.png",
    region: { left: 0, top: 150, width: 814, height: 610 },
  },
  {
    id: "sombreado-henna",
    src: "sombreado-henna/sombreado-henna-original.png",
    region: { left: 0, top: 140, width: 676, height: 507 },
  },
  {
    id: "depilacion-cejas-cera",
    src: "depilacion-cejas-cera/depilacion-cejas-cera-original.png",
    region: { left: 0, top: 180, width: 1024, height: 768 },
  },
  {
    id: "efecto-polvo",
    src: "efecto-polvo/efecto-polvo-original.png",
    region: { left: 0, top: 120, width: 774, height: 580 },
  },
  {
    id: "efecto-maquillaje",
    src: "efecto-maquillaje/efecto-maquillaje-original.jpeg",
    // Panel inferior (resultado); se evita el guante del panel superior.
    region: { left: 0, top: 1180, width: 1156, height: 867 },
  },
  {
    id: "cejas-hibridas",
    src: "cejas-hibridas/cejas-hibridas-original.jpeg",
    // Panel superior = después (técnica híbrida visible).
    region: { left: 0, top: 10, width: 1169, height: 877 },
  },
  {
    id: "correccion-cejas",
    src: "correccion-cejas/01-antes-despues-correccion-cejas.png",
    // Panel inferior = después (cejas rediseñadas).
    region: { left: 40, top: 527, width: 663, height: 497 },
  },
  {
    id: "neutralizacion-labios",
    src: "neutralizacion-labios/neutralizacion-labios-original.jpeg",
    region: { left: 0, top: 420, width: 1179, height: 884 },
  },
  {
    id: "microlips",
    src: "microlips/microlips-original.png",
    region: { left: 0, top: 200, width: 636, height: 477 },
  },
  {
    id: "hidralips",
    src: "hidralips/hidralips-original.png",
    // Screenshot: panel superior (labios tratados), sin barra móvil ni miniaturas.
    region: { left: 0, top: 90, width: 471, height: 353 },
  },
  {
    id: "linea-ojos",
    src: "linea-ojos/linea-ojos-original.png",
    region: { left: 0, top: 220, width: 768, height: 576 },
  },
  {
    id: "relleno-pestanas",
    src: "relleno-pestanas/03-antes-despues-horizontal.png",
    // Panel izquierdo = después (línea rellena), sin borde marrón.
    region: { left: 55, top: 190, width: 450, height: 338 },
  },
  {
    id: "lifting-pestanas",
    src: "lifting-pestanas/lifting-pestanas-original.png",
    region: { left: 0, top: 180, width: 660, height: 495 },
  },
  {
    id: "depilacion-axilas",
    src: "depilacion-axilas/depilacion-axilas-original.png",
    region: { left: 0, top: 420, width: 576, height: 432 },
  },
  {
    id: "depilacion-bigote-bozo",
    src: "depilacion-bigote-bozo/depilacion-bigote-bozo-original.png",
    region: { left: 0, top: 120, width: 417, height: 313 },
  },
  {
    id: "depilacion-nariz",
    src: "depilacion-nariz/depilacion-nariz-original.png",
    region: { left: 0, top: 180, width: 846, height: 635 },
  },
  {
    id: "depilacion-media-pierna",
    src: "depilacion-media-pierna/depilacion-media-pierna-original.png",
    region: { left: 0, top: 380, width: 682, height: 512 },
  },
];

/**
 * Collage 3×3 de sets de extensiones (689×1024). Centro de cada círculo y
 * recorte 4:3 inscrito (144×108) para no arrastrar el fondo rosa.
 */
const COLLAGE = "extensiones-pestanas/00-collage-sets-3x3-maestro.png";
const CIRCLE_CROP = { width: 128, height: 96 };
const extensionCells = [
  { id: "set-rimel", cx: 136, cy: 392 },
  { id: "volumen-ligero", cx: 350, cy: 392 },
  { id: "wispy", cx: 566, cy: 392 },
  { id: "volumen-ruso-2d", cx: 124, cy: 626 },
  { id: "mega-volumen", cx: 356, cy: 628 },
  { id: "volumen-aura-2d", cx: 564, cy: 626 },
  { id: "volumen-aura-5d", cx: 136, cy: 858 },
  { id: "volumen-griego-3d", cx: 356, cy: 860 },
  { id: "volumen-griego-5d", cx: 566, cy: 856 },
];

/** Fotos de reserva → galería de resultados (sin recorte, solo WebP). */
const galleryExports = [
  {
    id: "result-lifting-antes-despues",
    src: "lifting-pestanas/incoming-lote-2026-07-09/03-antes-despues.png",
  },
  {
    id: "result-laminado-collage",
    src: "laminado-cejas/incoming-lote-2026-07-09/03-collage-antes-despues-laminado-henna.png",
  },
  {
    id: "result-laminado-closeup",
    src: "laminado-cejas/incoming-lote-2026-07-09/01-closeup-resultado-piercing.png",
  },
  {
    id: "result-microlips-collage",
    src: "microlips/incoming-lote-2026-07-09/02-collage-grid-antes-despues.png",
  },
  {
    id: "result-microlips-duo",
    src: "microlips/incoming-lote-2026-07-09/01-collage-dos-labios.png",
  },
  {
    id: "result-neutralizacion-antes-despues",
    src: "neutralizacion-labios/incoming-lote-2026-07-09/collage-antes-despues-logo.png",
  },
  {
    id: "result-henna-collage",
    src: "sombreado-henna/incoming-lote-2026-07-09/02-collage-sombreado-henna.png",
  },
  {
    id: "result-efecto-polvo-procedimiento",
    src: "efecto-polvo/incoming-lote-2026-07-09/01-procedimiento-vista-invertida.png",
  },
  {
    id: "result-relleno-antes-despues",
    src: "relleno-pestanas/01-antes-despues-linea-pestanas.png",
  },
];

const WEBP = { quality: 85 };

async function exportCrop(srcRel, region, outFile, { minWidth = 0 } = {}) {
  let pipeline = sharp(path.join(SRC, srcRel)).extract(region);

  if (minWidth > region.width) {
    pipeline = pipeline.resize({ width: minWidth, kernel: "lanczos3" }).sharpen();
  }

  const info = await pipeline.webp(WEBP).toFile(outFile);
  return info;
}

async function main() {
  await mkdir(OUT_SERVICIOS, { recursive: true });
  await mkdir(OUT_RESULTADOS, { recursive: true });

  const manifest = [];

  for (const { id, src, region } of serviceCrops) {
    const out = path.join(OUT_SERVICIOS, `${id}.webp`);
    const info = await exportCrop(src, region, out);
    manifest.push({ id, file: `servicios/${id}.webp`, width: info.width, height: info.height, size: info.size });
  }

  for (const { id, cx, cy } of extensionCells) {
    const region = {
      left: Math.max(0, Math.round(cx - CIRCLE_CROP.width / 2)),
      top: Math.max(0, Math.round(cy - CIRCLE_CROP.height / 2)),
      width: CIRCLE_CROP.width,
      height: CIRCLE_CROP.height,
    };
    const out = path.join(OUT_SERVICIOS, `${id}.webp`);
    const info = await exportCrop(COLLAGE, region, out, { minWidth: 576 });
    manifest.push({ id, file: `servicios/${id}.webp`, width: info.width, height: info.height, size: info.size });
  }

  for (const { id, src } of galleryExports) {
    const out = path.join(OUT_RESULTADOS, `${id}.webp`);
    const info = await sharp(path.join(SRC, src))
      .resize({ width: 1200, withoutEnlargement: true })
      .webp(WEBP)
      .toFile(out);
    manifest.push({ id, file: `resultados/${id}.webp`, width: info.width, height: info.height, size: info.size });
  }

  for (const row of manifest) {
    console.log(`${row.id}\t${row.file}\t${row.width}x${row.height}\t${Math.round(row.size / 1024)}KB`);
  }
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
