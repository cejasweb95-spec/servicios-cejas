# QA Responsive — Centrado y equilibrio (desktop, tablet, móvil)

Fecha: 2026-07-16 · Autor: Claude Code (QA senior responsive) · A petición de Jeffrey.

## Motivo

En desktop a pantalla completa (1440–1920px) el contenido se percibe **«todo a la izquierda»**, sin sensación de centrado, especialmente en `/es/formaciones` y en las páginas de listado.

## Metodología

Medición automatizada con Playwright/Chromium en **9 anchos** (390, 430, 768, 834, 1024, 1280, 1440, 1536, 1920) sobre **13 páginas** representativas. Se midió por sección:
- Márgenes izquierdo/derecho del container y su **asimetría**.
- **Overflow horizontal**.
- Offset de cada encabezado respecto al container y **hueco libre a su derecha** (`rightGap`).

Script: `scratchpad/qa-responsive-analisis.js` · Datos: `scratchpad/qa-report.json`.

## Hallazgo raíz (importante)

**No hay bug de responsive:**
- ✅ **0 overflow horizontal** en las 13 páginas × 9 anchos.
- ✅ El container (`max-w-7xl` = 1280px, `mx-auto`) está **perfectamente centrado** (asimetría 0px; la única diferencia proviene de la barra de scroll ~15px).

**La sensación de «izquierda» viene del contenido interno**, no del contenedor:
- Los **encabezados e intros de sección** usan el patrón editorial `max-w-3xl border-l-4 border-primary pl-5` **alineado a la izquierda**.
- Dentro de un container de 1280px, esos títulos ocupan 600–770px y dejan **480–1079px de hueco vacío a la derecha**.
- En pantallas de 1920px el container ya deja 320px de margen a cada lado; sumado al título pegado a la izquierda, el «centro de masa» visual queda claramente a la izquierda.

Ver detalle por página en [01-inventario-centrado.md](./01-inventario-centrado.md).

## Plan

Ver [02-plan-correccion.md](./02-plan-correccion.md) (estrategia y opciones) y [03-matriz-responsive.md](./03-matriz-responsive.md) (anchos y criterios de validación).

## Estado

- [x] Análisis y medición
- [x] Inventario documentado
- [x] Dirección confirmada con Jeffrey: **Opción A** (centrar encabezados + equilibrar)
- [x] Corrección aplicada (ver más abajo)
- [x] Validación Playwright + Chromium

## Corrección aplicada (2026-07-16)

**Encabezados de sección centrados** (`mx-auto max-w-2xl text-center`) en las páginas de listado/overview:
- Home: «Servicios por país», «Sedes físicas», «Formaciones y masterclass», «Lo que dicen mis clientas».
- Servicios (index): «Selecciona un país».
- Formaciones: «Cursos profesionales», «Masterclass de especialización».
- Descargas: rótulos «Catálogos por mercado» y «Formaciones» (`justify-center`).

**No se tocó (correcto tal cual):**
- Layouts de 2 columnas (contacto, sobre-xiomara, resultados, jornadas, sede, sección resultados de home): el encabezado va en su columna y está equilibrado.
- Banners con acción a la derecha (CTA home, descargas-preview, «próxima fecha» de formaciones).
- Catálogo de servicios (lista menú nombre-izquierda / precio-derecha): los rótulos de categoría van alineados a la izquierda por convención de lista.

**Validación:**
- `typecheck` + `lint` (0 errores) + `build` OK.
- Suite E2E **106/106**.
- **0 overflow** en 13 páginas × 9 anchos (390→1920).
- Chromium: encabezados centrados confirmados (offset izq ≈ hueco der) en 1440 y 390.
