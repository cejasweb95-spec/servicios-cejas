/**
 * Regenera favicon, iconos PWA y apple-touch desde el logo oficial.
 * Fuente: public/images/brand/logo-oficial-sin-fondo.png
 *
 * Uso: npm run generate:brand-icons
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";
import toIco from "to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SOURCE = join(root, "public/images/brand/logo-oficial-sin-fondo.png");
const BACKGROUND = "#ffffff";

const outputs = {
  favicon: join(root, "src/app/favicon.ico"),
  icon: join(root, "src/app/icon.png"),
  apple: join(root, "src/app/apple-icon.png"),
  android192: join(root, "public/icons/android-chrome-192x192.png"),
  android512: join(root, "public/icons/android-chrome-512x512.png"),
  maskable512: join(root, "public/icons/maskable-icon-512x512.png"),
};

async function renderSquareIcon(size, paddingRatio) {
  const padding = Math.round(size * paddingRatio);
  const inner = size - padding * 2;

  const logoBuffer = await sharp(SOURCE)
    .resize(inner, inner, {
      fit: "inside",
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logoBuffer).metadata();
  const logoWidth = logoMeta.width ?? inner;
  const logoHeight = logoMeta.height ?? inner;
  const left = Math.round((size - logoWidth) / 2);
  const top = Math.round((size - logoHeight) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BACKGROUND,
    },
  })
    .composite([{ input: logoBuffer, left, top }])
    .png();
}

async function writePng(pipeline, destination) {
  await mkdir(dirname(destination), { recursive: true });
  const buffer = await pipeline.toBuffer();
  await writeFile(destination, buffer);
  return buffer;
}

async function main() {
  const faviconSizes = [16, 32, 48];
  const faviconBuffers = await Promise.all(
    faviconSizes.map(async (size) => {
      const pipeline = await renderSquareIcon(size, 0.08);
      return pipeline.toBuffer();
    }),
  );

  await writeFile(outputs.favicon, await toIco(faviconBuffers));

  await writePng(await renderSquareIcon(512, 0.1), outputs.icon);
  await writePng(await renderSquareIcon(180, 0.1), outputs.apple);
  await writePng(await renderSquareIcon(192, 0.1), outputs.android192);
  await writePng(await renderSquareIcon(512, 0.1), outputs.android512);
  await writePng(await renderSquareIcon(512, 0.18), outputs.maskable512);

  console.log("Brand icons generated from logo-oficial-sin-fondo.png:");
  for (const [key, path] of Object.entries(outputs)) {
    console.log(`  ${key}: ${path}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
