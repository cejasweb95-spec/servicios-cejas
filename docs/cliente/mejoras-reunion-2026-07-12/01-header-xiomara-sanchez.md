# 01 — Header: apellido «Xiomara Sánchez»

## Lo que dijo la cliente

> «¿Puedes ir al lado o abajo de Xiomara? Sí, abajo. Así que con esa letra más chiquita pero con el apellido… Xiomara Sánchez.»

> «Cuando ya tengas todo eso… lo último que faltaría es cambiar esos detallitos… y ya lo dejo Xiomara Sánchez.»

## Análisis

- Hoy el wordmark del header muestra `Cejas Internacionales` + **`by Xiomara`** incluso en **español** (`src/messages/es.json` → `headerByline`).
- Falta el apellido **Sánchez** y la localización correcta en ES.

## Qué hacer

1. Actualizar `headerByline` en `src/messages/es.json`:
   - Propuesta: `"Xiomara Sánchez"` o `"de Xiomara Sánchez"` (elegir la que mejor encaje visualmente con `HeaderWordmark`).
2. Actualizar `headerByline` en `src/messages/en.json`:
   - Propuesta: `"by Xiomara Sánchez"`.
3. Revisar que el tamaño tipográfico del byline siga siendo **más pequeño** que la línea de marca (`header-wordmark.tsx` ya lo hace).
4. **No** cambiar logo en OG, footer ni JSON-LD salvo que Jeffrey lo pida; solo cabecera.
5. Opcional (solo si encaja con lo que vio en pantalla): valorar el mismo tratamiento en el título visible de Sobre Xiomara — hoy ya usa nombre completo en `AboutPage.title`; confirmar visualmente.

## Archivos probables

- `src/messages/es.json` — clave `Shell.headerByline`
- `src/messages/en.json` — clave `Shell.headerByline`
- `src/components/layout/header-wordmark.tsx` (solo si hace falta ajuste de layout)
- `src/app/[locale]/layout.tsx` (pasa `wordmark` al header)

## QA

- [x] Header ES muestra apellido Sánchez («de Xiomara Sánchez»)
- [x] Header EN muestra apellido Sánchez («by Xiomara Sánchez»)
- [x] Byline más pequeño que «Cejas Internacionales» (sin cambios de layout)
- [x] Sin desbordamiento en 390 px (verificado; wordmark envuelve en dos líneas)
- [x] Sin regresión en navegación móvil

## Estado

- [x] Copy ES actualizado (`headerByline` + `headerWordmarkAriaLabel`)
- [x] Copy EN actualizado (`headerByline` + `headerWordmarkAriaLabel`)
- [x] Verificado en navegador (390 / 768 / 1024)
- [x] QA pasado (2026-07-16, Claude Code)
