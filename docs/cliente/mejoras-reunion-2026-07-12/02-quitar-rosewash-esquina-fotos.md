# 02 — Quitar cuadrado rosa en esquina sobre fotos

## Lo que dijo la cliente

> «No se le puede quitar este cuadrado ahí en la esquina. Sí, el cuadrado rosado se le puede quitar. Para que no le estén tapando.»

> «A las que usted vea que le estorba… aquí no le afectan nada.»

## Análisis

- `PageHero` envuelve todo el hero interior con `RoseWash accent="corner"` (`src/components/primitives/page-hero.tsx`).
- Ese acento dibuja pseudo-elementos rosados en esquinas (`src/components/primitives/rose-wash.tsx`) que **pueden superponerse** a la foto lateral del detalle de servicio y de cursos.
- La cliente pide quitarlo donde tape la imagen; puede mantenerse donde solo hay texto.

## Qué hacer

1. Añadir prop opcional a `PageHero`, por ejemplo `roseAccent?: "corner" | "band-right" | "band-left" | "none"` (default `"corner"` para no romper páginas sin foto).
2. En páginas cuyo `aside` es una **foto de servicio o curso**, usar `roseAccent="none"` o un acento que no invada la imagen:
   - `src/app/[locale]/_pages/service-detail-page.tsx`
   - Páginas de detalle de curso si usan `PageHero` con imagen
   - Cualquier hero donde la cliente señaló el cuadrado (revisar en navegador)
3. **No** quitar el ritmo rosa de toda la web; solo evitar superposición sobre fotos.
4. Alternativa mínima: en `RoseWash`, cuando hay `aside` con imagen, mover los pseudo-elementos detrás del contenido sin cubrir el `aside` (evaluar cuál diff es más limpio).

## Archivos probables

- `src/components/primitives/page-hero.tsx`
- `src/components/primitives/rose-wash.tsx`
- `src/app/[locale]/_pages/service-detail-page.tsx`
- `src/app/[locale]/_pages/training-*` o equivalente de cursos

## QA

- [x] Detalle de servicio: foto sin mancha rosa encima
- [x] Master Class laminado (curso): foto sin mancha rosa
- [x] Heroes solo texto siguen con acento de marca (p. ej. cuchilla, resultados, contacto)
- [x] 390 / 768 / 1024 — sin regresión visual ni overflow
- [x] Sin CLS al cargar

## Estado

- [x] Prop `roseAccent` («corner» por defecto, «none» donde el aside es foto) en `PageHero` + `RoseWash`
- [x] Servicios verificados (detalle usa `none` solo cuando hay imagen)
- [x] Cursos verificados (`course-detail-page` con `none`; también mercados, sobre-xiomara, sede y formaciones)
- [x] QA pasado (2026-07-16, Claude Code)
