# 12 — Logo solo en menú (header desktop y móvil)

## Origen del feedback

**Reunión 23/06/2026** (`docs/cliente/audio-transcripciones/mejoras-home-2026-06-23.md`):

> «Este loguito acá no me gusta mucho, siento que se ve muy pequeñito, como perdido, entonces o agrandar el logo más, que se vea más imponente o poner aquí más bien grande en letricas como Cejas Internacionales… abajo Xiomara Sánchez en una esquinita.»

**Reunión 30/06/2026:** la clienta **aprobó** la tipografía y colores del logo (negro + palo de rosa). No pide cambiar la marca en general; el problema es **legibilidad en la cabecera**.

**Video 21/06/2026** (`VIDEO-REVISION-2026-06-21-CAMBIOS-SUGERIDOS.md` → B02): revisar logo en cabecera (tamaño, alineación, espacio con hamburguesa).

**Rediseño V5** (`docs/cliente/redisenio-v5/01-home-y-navegacion.md` §Header): aumentar ancho visual del logo en barra sin estirarlo ni sustituir por texto sin decisión escrita.

---

## Decisión de alcance (Jeffrey / equipo)

**Decisión con la clienta (julio 2026):** wordmark tipográfico **solo en header** — «Cejas Internacionales» + «by Xiomara» en negro, fuente condensada tipo «Internacionales» del logo (Oswald). Footer, OG, favicon y JSON-LD **sin cambios**.

| Zona | ¿Cambiar logo? | Asset actual |
|------|----------------|--------------|
| **Header sticky** (desktop + móvil — mismo `SiteHeader`) | **Sí** | Wordmark tipográfico (`HeaderWordmark` + Oswald) |
| Footer | **No** | `logo-oficial` → `logo-oficial-sin-fondo.png` |
| Open Graph / Twitter card | **No** | `opengraph-image.tsx` + `logo-oficial-sin-fondo.png` |
| Favicon / `apple-icon` / manifest | **No** | Generados desde logo oficial |
| JSON-LD (`Organization`, `BeautySalon`) | **No** | `logo-oficial-sin-fondo.png` |
| Compartir en redes (previews automáticas) | **No** | OG + iconos actuales |
| PDFs, catálogos, watermarks en resultados | **No** | Marca existente |

> **Regla:** el logo «de marca» para compartir, SEO y pie de página **se queda como está**. Solo la cabecera de navegación puede usar otro tratamiento (otro PNG, más grande, monocromo negro, o wordmark tipográfico si la clienta lo confirma por escrito).

---

## Opciones evaluadas

| Opción | Enfoque | Pros | Contras |
|--------|---------|------|---------|
| **A** | Mismo `logo-oficial-sin-fondo.png` con **CSS más grande** en header | Sin asset nuevo; rápido | Puede seguir viéndose «perdido» en móvil |
| **B** | Asset header dedicado (`logo-header`) — p. ej. recorte más compacto o versión pensada para barra | Control fino desktop/móvil; footer/OG intactos | Requiere archivo o recorte acordado con la clienta |
| **C** | `logo-oficial-negro-monocromo.png` **solo en header** | Ya existe en `media.ts`; más sobrio en barra clara | Sigue siendo el mismo wordmark cursivo pequeño si no se escala |
| **D** | Wordmark tipográfico (texto Marcellus) solo en header | Máxima legibilidad en móvil | Cambio visual fuerte; la clienta aprobó el logo gráfico — hay que confirmar |

**Recomendación técnica:** **opción B** — nuevo `mediaId` `logo-header` en `media.ts`, pasado **solo** a `SiteHeader` desde `layout.tsx`; footer y resto siguen con `logo-oficial`.

---

## Implementación prevista (cuando haya asset o decisión)

1. Añadir en `src/content/media.ts` entrada `logo-header` (o reutilizar `logo-negro` si la clienta elige monocromo solo en barra).
2. En `src/app/[locale]/layout.tsx`:
   - `headerLogo` → `SiteHeader`
   - `logo` (oficial) → `SiteFooter` sin cambios
3. No tocar `opengraph-image.tsx`, `icon.png`, `structured-data.ts`, ni rutas de compartir.
4. Ajustar alt ES/EN del asset header si el recorte cambia el mensaje accesible.
5. Actualizar umbrales en `tests/e2e/site-header-logo.spec.ts` si cambia la altura objetivo.

**Archivos tocados (estimado):** `media.ts`, `layout.tsx`, opcional `site-header.tsx` (clases de tamaño), tests E2E header.

---

## Pendiente de la clienta

- [x] Confirmar wordmark tipográfico en barra (negro, «Cejas Internacionales by Xiomara»).

---

## QA

- [x] Logo header legible en 390, 768 y 1440 px sin solapar menú hamburguesa.
- [x] Footer sigue mostrando `logo-oficial-sin-fondo.png`.
- [x] OG / favicon sin cambios (comparar hash o URL en `seo.spec.ts` / inspección manual).
- [x] `npm run test:e2e` → `site-header-logo.spec.ts` en verde.
- [x] Sin overflow horizontal en home y `/es/servicios/espana-europa`.

## Estado

- [x] Decisión visual con la clienta
- [x] Asset listo (wordmark tipográfico; sin PNG nuevo)
- [x] Implementado
- [x] QA pasado
