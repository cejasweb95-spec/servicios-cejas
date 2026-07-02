# Imágenes de marca para compartir (favicon, PWA, OG)

Mapa de **dónde va cada imagen** y cómo regenerarla desde el logo oficial.

## Fuente única

| Archivo | Uso |
|---------|-----|
| `public/images/brand/logo-oficial-sin-fondo.png` | Logo horizontal (PNG transparente). **Fuente para iconos y OG.** |
| `public/images/brand/logo-oficial-negro-monocromo.png` | UI alternativa (no generación automática) |
| `public/images/brand/logo-oficial-blanco.png` | Fondos oscuros (no generación automática) |

## Salidas generadas (`npm run generate:brand-icons`)

| Archivo | Tamaño | Consumidor |
|---------|--------|------------|
| `src/app/favicon.ico` | 16+32+48 multi | Pestaña navegador, marcadores |
| `src/app/icon.png` | 512×512 | Next.js metadata, manifest |
| `src/app/apple-icon.png` | 180×180 | iOS «Añadir a pantalla de inicio» |
| `public/icons/android-chrome-192x192.png` | 192×192 | Android PWA |
| `public/icons/android-chrome-512x512.png` | 512×512 | Android PWA |
| `public/icons/maskable-icon-512x512.png` | 512×512 (zona segura) | PWA maskable |

**Criterio de encuadre:** logo centrado sobre fondo blanco `#ffffff`, padding ~10% (favicon) y ~18% (maskable).

## Open Graph / Twitter / WhatsApp

| Qué | Dónde | Tamaño |
|-----|-------|--------|
| Imagen al compartir enlace | `src/app/[locale]/opengraph-image.tsx` → `/{locale}/opengraph-image` | 1200×630 PNG dinámico |
| Twitter card | `src/app/[locale]/twitter-image.tsx` (alias OG) | Igual |
| Meta HTML | `src/lib/seo/build-page-metadata.ts` → `og:image`, `twitter:image` | URLs absolutas |

**WhatsApp (Android/iOS), Facebook, LinkedIn, iMessage:** leen `og:image` de la URL compartida. Debe ser **HTTPS** en producción (`NEXT_PUBLIC_SITE_URL`).

### Comprobar en producción

1. Compartir `https://cejasinternacionales.com/es` en WhatsApp  
2. O usar [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) con la URL  
3. Verificar que la miniatura muestra el **logo**, no solo texto

## Manifest PWA

`src/app/manifest.ts` referencia `/icon.png`, `/apple-icon.png` y `/public/icons/*`.

## Schema.org (logo)

`src/app/[locale]/page.tsx` → JSON-LD `Organization` / `BeautySalon` con `logo` → `/images/brand/logo-oficial-sin-fondo.png`.

## No confundir con

- Iconos SVG de redes en `src/components/icons/brand-icons.tsx` (WhatsApp, Instagram, etc.)
- Fotos de resultados / hero en `public/images/`

## Regenerar tras cambiar logo

```bash
npm run generate:brand-icons
npm run build
npm run test:seo
```

Subir cambios de `src/app/*.ico`, `src/app/*.png`, `public/icons/*` en el mismo commit que el logo fuente.
