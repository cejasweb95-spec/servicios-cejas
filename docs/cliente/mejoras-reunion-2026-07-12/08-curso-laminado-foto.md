# 08 — Curso Master Class laminado: foto cortada

## Lo que dijo la cliente

> «Esta mía que está como cortada… esta es Master Class laminado de cejas.»

## Análisis

- La cliente revisó la página del curso de laminado y la imagen del hero se ve **recortada** (probablemente `aspect-[4/3]` + `object-cover` en hero de curso o asset `curso-laminado-cejas` / master class).
- Relacionado con [04-centrado-fotos-servicios.md](./04-centrado-fotos-servicios.md) y [02-quitar-rosewash-esquina-fotos.md](./02-quitar-rosewash-esquina-fotos.md).

## Qué hacer

1. Localizar la ruta del curso (ES/EN) — p. ej. Master Class laminado / lifting según catálogo en `src/content/courses.ts`.
2. Identificar asset en `media.ts` (`curso-laminado-cejas`, `curso-lifting-pestanas`, etc.).
3. Aplicar:
   - Quitar `RoseWash corner` si tapa la foto (MD 02).
   - Ajustar `object-position` o re-exportar imagen a 4:3 centrada en el sujeto del curso.
4. Verificar que no se confunda con el servicio `laminado-cejas` (foto distinta).

## Archivos probables

- `src/content/courses.ts`
- `src/content/media.ts` — assets de formaciones
- Página de detalle de curso en `src/app/[locale]/_pages/` o ruta `[course]`
- `src/components/primitives/page-hero.tsx`

## QA

- [x] Curso laminado (ES): imagen completa, sin corte feo en 390
- [x] Equivalente EN (`/en/professional-training/brow-lamination-masterclass`)
- [x] Sin cuadrado rosa sobre la foto (`roseAccent="none"` en detalle de curso)
- [x] PDF descargable y temario intactos

## Estado

- [x] Curso identificado: `masterclass-laminado-cejas`, asset `curso-laminado-cejas`
- [x] Encuadre corregido: re-export desde `cejas-05.jpeg` (1152×864) centrado en cejas y ojos; el crop anterior era solo la frente con las cejas cortadas
- [x] QA pasado (2026-07-16, Claude Code)
