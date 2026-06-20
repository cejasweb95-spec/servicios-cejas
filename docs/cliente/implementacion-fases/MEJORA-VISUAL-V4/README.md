# Mejora visual V4 — Salto UI/UX "senior" (imágenes, identidad de país, mapa y galería)

> Objetivo: cerrar la brecha **visual** frente a competencia (p. ej. bauribarcelona.com)
> aprovechando la imagen real ya disponible en `docs/cliente/assets-extraidos/`, sin
> romper las reglas de marca, i18n, SEO, accesibilidad ni rendimiento del proyecto.

## Decisiones de diseño (confirmadas con Jeffrey)

1. **Identidad de país** = chip de bandera SVG sutil + foto real del mercado.
2. **Mapa de contacto** = fachada con consentimiento (preview → iframe real al clic).
3. **Galería** = rediseño editorial masonry.

## Ronda 2 — Ajustes de feedback

- **Galería sin capturas**: 6 imágenes que eran capturas de Instagram (con texto, emojis y
  ubicaciones superpuestas: `result-cejas-04/05/06`, `result-labios-03`, `result-pestanas-01`,
  `result-cicatrizado-labios`) se han sustituido por fotos de trabajo limpias de
  `fotos-trabajos/` y `cicatrizados/`, optimizadas con `sharp`. La infografía
  `sets-pestanas-panel` se sacó de la galería (pasó a `type: photo`). Galería: 15 piezas limpias.
- **Lightbox rediseñado** (`result-mosaic.tsx`): el panel lateral estiraba la fila de botones
  (`align-content: stretch`) creando pills gigantes que se salían de pantalla. Reconstruido a
  columna única: imagen `object-contain` centrada, **flechas circulares 44×44** superpuestas a
  los lados, X de cierre y pie con título + contador. Diálogo a `max-w-3xl`.
- **Retrato Xiomara sobre blanco + degradado palo de rosa** (`xiomara-retrato-rosa.jpg`): la foto
  era un recorte sobre negro puro; con `sharp` (flood-fill desde bordes para conservar la tablet
  + erosión del halo) se compuso sobre un degradado blanco→palo de rosa. Usado en Contacto y
  Sobre Xiomara.
- **Banderas en jornadas**: el `EventMap` (Home y página de Jornadas) muestra bandera por
  ubicación en la lista y en la tarjeta seleccionada. El hero de la página de Jornadas pasó de
  una tarjeta de texto a un visual con la **foto del globo + chips de los 3 países**.

## Estado por fases

| Fase | Descripción | Estado |
|------|-------------|--------|
| 0 | Pipeline de imágenes reales + registro en `media.ts` | ✅ Hecho |
| 1 | Componente `CountryFlag` + identidad de mercado | ✅ Hecho |
| 2 | Home: "Servicios destacados por mercado" + Jornadas | ✅ Hecho |
| 3 | Páginas de servicios por país (hero por mercado) | ✅ Hecho |
| 4 | Galería de resultados (masonry editorial) | ✅ Hecho |
| 5 | Contacto: mapa con fachada de consentimiento | ✅ Hecho |
| 6 | Pulido transversal (índice de servicios + auditoría de otras páginas) | ✅ Hecho |

## Fase 0 — Assets

Optimizados con `sharp` desde `docs/cliente/assets-extraidos/` a `public/images/`:

- `public/images/mercados/` → `mercado-colombia.jpg` (cabina Cali), `mercado-espana.jpg`,
  `mercado-suiza.jpg` (retratos de sesión profesional, distintos por mercado).
- `public/images/jornadas/jornadas-globo.jpg` → retrato con globo terráqueo (tema internacional).
- `public/images/resultados/` → +6 piezas (`result-cejas-05/06`, `result-labios-03`,
  `result-mirada-02`, `result-cicatrizado-cejas/labios`).

Todos registrados en `src/content/media.ts` con `alt` ES/EN. Mapeo mercado→imagen en
`marketMediaIds` (consumido vía `getMarketMediaAsset()` en `queries.ts`).

## Fase 1 — CountryFlag

`src/components/primitives/country-flag.tsx`. Banderas SVG inline por `MarketId`.

> **Excepción documentada a "sin hex crudo":** este es el único componente con valores
> hex. No son paleta de UI: son los colores oficiales de cada bandera nacional (dato).
> La regla aplica a tokens de marca, no a este dato.

Accesibilidad: decorativa (`aria-hidden`) cuando va junto al nombre del país; `role="img"`
con `aria-label` cuando va sola (prop `label`). Integrada en `MarketSelector`, Home
(destacados + jornadas) y hero de servicios por mercado.

## Fase 5 — Mapa de contacto

`src/components/domain/map-embed.tsx` (cliente). Muestra una fachada de marca; el iframe
oficial de Google Maps (`...!2scejas%20internacionales...`) **solo se carga tras el clic**
→ preserva Lighthouse y la política de cookies/consentimiento de AGENTS.md. Incluye enlace
de respaldo "Abrir en Google Maps". Cadenas en `messages` (`ContactPage.map*`).

## Verificación realizada

- `npm run typecheck` ✅ · `npm run lint` ✅ · `npm run build` ✅ (todas las rutas).
- Preview de **producción** (`next start`): Home, jornadas, servicios por país, galería y
  contacto verificados en ES. Bandera Colombia `#FCD116` presente; grid editorial
  `1fr/1fr`; alternancia de imagen (segunda fila `order:last`); galería masonry 3 columnas
  con 16 tiles; mapa con 0 iframes hasta el clic → carga el iframe real con `title` accesible.
- Móvil 375px: sin overflow horizontal.

> Nota dev: el routing localizado usa `src/proxy.ts` (middleware next-intl). Con `next dev`
> de esta máquina las subrutas daban 404; con `next start` (build) funcionan al 100%.
> Verificar siempre sobre build de producción.

## Fase 6 — Pulido transversal

- **Índice de servicios** (`services-index-page.tsx`): era la página más "vacía" (solo hero +
  selector de texto). Sustituido el selector plano por una **pasarela visual de mercados**:
  3 tarjetas con foto real (`mercado-*.jpg`), bandera, nombre, divisa y gradiente, cada una
  enlazando a su página de mercado. Verificado: 3 tarjetas con banderas correctas
  (`#FCD116`/`#AA151B`/`#D52B1E`), divisas (COP/EUR/CHF), imágenes cargadas, sin overflow.
- **Auditoría del resto**: Sobre Xiomara (retrato + sección de certificaciones con imagen),
  Cuidados (hero con par editorial cejas+labios) y Formaciones (hero + tarjetas de curso con
  imagen) **ya contaban con imagen real suficiente**; no requerían intervención.

### Siguiente sesión (opcional)

- Pasada de espaciado/aire global tomando como referencia la competencia.
- QA completa: E2E ampliado, a11y (axe/WAVE), cross-browser y Lighthouse sobre las pantallas nuevas.
