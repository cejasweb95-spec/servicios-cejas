# 02 — Plan de corrección

## Objetivo

Que en desktop (1440–1920) el contenido se perciba **equilibrado/centrado**, sin huecos grandes a la derecha, y que tablet/iPad/móvil mantengan o mejoren su comportamiento (que ya es correcto: 0 overflow).

## Opciones de dirección (decisión de diseño)

### A. Encabezados de sección centrados + contenido equilibrado (RECOMENDADA)
- Crear un componente compartido `SectionHeading` con variante `align="center"`.
- En páginas de **listado/overview** (home, servicios, formaciones, descargas, contacto, resultados, cuidados), centrar el bloque encabezado+intro (`mx-auto`, `text-center`, `max-w-2xl/3xl`).
- Mantener el cuerpo largo y las fichas en rejillas equilibradas (no centrar párrafos largos: perjudica lectura).
- Mantener los heros de detalle y columnas laterales como están.
- **Resultado:** página se lee centrada y balanceada, conservando la identidad de marca.

### B. Solo ensanchar el contenido en pantallas grandes
- Subir el container de 1280 → ~1440 en `xl`/`2xl` y dejar los encabezados a la izquierda.
- Menos intervención, pero **no elimina** la sensación de «izquierda» (el hueco a la derecha sigue).

### C. Centrado clásico total
- Centrar encabezados y además centrar bloques de contenido.
- Máximo centrado, pero riesgo de «look de plantilla» (contra reglas de marca).

## Recomendación

**Opción A.** Es el estándar senior: equilibra sin romper la marca ni la legibilidad. Se puede combinar con un ligero ensanche del container en `2xl` (1280 → 1360) para reducir margen muerto en 1920.

## Cambios técnicos previstos (opción A)

1. `src/components/primitives/section-heading.tsx` (nuevo): eyebrow + h2 + descripción, con `align: "left" | "center"`, `mx-auto` y `text-center` cuando centrado. Reemplaza el `max-w-3xl border-l-4 pl-5` repetido.
2. Aplicar `align="center"` en los encabezados de: `page.tsx` (secciones país, formaciones, reseñas, descargas, CTA), `services-index`, `training-index`, `market-services`, `contact`, `downloads`, `results`, `aftercare`.
3. Revisar rejillas de fichas para que queden centradas/equilibradas bajo el encabezado centrado.
4. (Opcional) `Container`: `max-w-7xl 2xl:max-w-[85rem]` para 1920.
5. No tocar: heros de detalle, columnas laterales, mapa, reseñas (contenido validado).

## Criterio de aceptación

- En 1440/1920: encabezados centrados (`offL` ≈ `rightGap`, asimetría < 24px respecto al eje del container).
- 0 overflow horizontal en los 9 anchos.
- Sin regresiones en la suite E2E (106/106).
- Validación Chromium con capturas en 1920, 1024, 390.
