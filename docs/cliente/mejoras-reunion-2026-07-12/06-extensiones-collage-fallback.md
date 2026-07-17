# 06 — Extensiones de pestañas: collage 9 celdas / 11 servicios

## Lo que dijo la cliente

> «La imagen grande donde están todas… esta generada para todas. Para todas, pero… creo que hay 11 y en la foto hay sólo 9.»

> «Si no se vea así cortado… que se vea tal cual… mientras tanto, ya me va modificando.»

## Análisis

- Hay **11** servicios de extensiones en Colombia; el collage 3×3 solo tiene **9** celdas.
- Los 2 «por punto» (`por-punto-efecto-volumen`, `por-punto-mega-volumen`) no están en el collage — ya documentado en `mejoras-reunion-2026-06-30/07`.
- Hoy cada set tiene recorte individual; la cliente preferiría ver el **panel completo** «como tal cual» mientras no haya 11 fotos individuales.

## Qué hacer

1. **Corto plazo (esta reunión):**
   - Valorar usar `sets-pestanas-panel` (collage completo sin recortes agresivos) como imagen de **categoría** en listado/detalle cuando el recorte 3×3 se ve «mocho».
   - O mejorar recortes 3×3 con más margen alrededor del ojo.
2. **Por punto:** mantener fallback a `volumen-ruso-2d` / `mega-volumen` (ya implementado).
3. **Medio plazo:** cuando la clienta pase fotos individuales por set, reemplazar recortes.
4. No inventar sets 10 y 11 en el collage; la cliente aceptó solución temporal.

## Archivos probables

- `src/content/media.ts` — assets `servicio-set-*`, `sets-pestanas-panel`
- `src/app/[locale]/_pages/service-detail-page.tsx`
- `public/images/servicios/*.webp`

## QA

- [x] Los 11 servicios CO muestran imagen coherente (panel completo)
- [x] Panel completo legible en 390 px (renderiza a proporción natural, 350×526 aprox.)
- [x] Por punto: mismo panel (coherente)
- [x] Solo mercado Colombia

## Estado

- [x] Decisión aplicada: **panel completo** para los 11 (el collage maestro es 689×1024; los recortes por celda quedaban pixelados, irrecuperables). El marco del detalle usa el aspect-ratio real del asset, así el panel se ve «tal cual» sin cortes.
- [x] 11 servicios verificados (9 sets + 2 por punto → `sets-pestanas-panel`)
- [x] QA pasado (2026-07-16, Claude Code) — pendiente medio plazo: fotos individuales por set cuando la clienta las pase
