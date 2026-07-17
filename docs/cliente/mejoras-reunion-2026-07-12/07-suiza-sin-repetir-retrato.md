# 07 — Suiza: no repetir retrato de Xiomara en servicios

## Lo que dijo la cliente

> «Está en Suiza… aquí ponen una foto mía y aquí otra diferente. En servicios colocó mis fotos… para que no quede repetido otra vez la misma foto.»

## Análisis

- El hero del listado de servicios de Suiza usa imágenes de **mercado** (`getMarketMediaAsset`), no del servicio — típicamente retrato de Xiomara (`mercado-suiza` en `media.ts`).
- En el detalle de cada servicio puede volver a aparecer foto de categoría o de servicio; si también es retrato, hay **repetición** en la misma visita.
- La cliente quiere variedad: punto físico / bloque editorial con una foto; servicios con fotos de **resultado o procedimiento**, no el mismo retrato otra vez.

## Qué hacer

1. Auditar `/es/servicios/suiza` y 2–3 detalles de servicio en Suiza.
2. Confirmar qué imagen usa `market-services-page.tsx` (primary/secondary) vs `service-detail-page.tsx`.
3. Si el listado de mercado muestra retrato de Xiomara, **mantener** solo ahí (presentación del mercado).
4. En detalle de servicio en Suiza: asegurar que `getServiceMediaAsset` devuelve foto de **servicio** (labios, cejas, etc.), no fallback a `mercado-suiza` ni a `result-*` que sea retrato.
5. Revisar `serviceCategoryMediaIds` y fallbacks en `queries.ts` para que no caigan en assets de retrato editorial (`xiomara-*`, `mercado-suiza`).
6. Si un servicio en Suiza no tiene foto propia, preferir **sin imagen** antes que repetir retrato de la clienta.

## Archivos probables

- `src/content/media.ts` — `mercado-suiza`, `serviceMediaIds`
- `src/lib/content/queries.ts` — `getServiceMediaAsset`, `getMarketMediaAsset`
- `src/app/[locale]/_pages/market-services-page.tsx`
- `src/app/[locale]/_pages/service-detail-page.tsx`

## QA

- [x] Listado Suiza: retrato de mercado OK (una vez, hero del listado + `result-labios-01` de par)
- [x] Detalle servicio Suiza: no repite retrato (todos usan foto de servicio; `refuerzo-cejas` cae a `result-cejas-03`, foto de resultado, no retrato)
- [x] ES + EN
- [x] 390 / 1024

## Estado

- [x] Auditoría hecha: los 14 servicios de Suiza tienen foto propia o fallback de resultado; ningún fallback cae en `xiomara-*` ni `mercado-suiza`
- [x] Fallbacks ajustados (no hizo falta cambio de código; mapeo ya correcto tras lote jul 2026)
- [x] QA pasado (2026-07-16, Claude Code)
- [x] **Ampliado a los 3 mercados (aclaración Jeffrey 16/07 tras reescuchar el audio):** la regla es que la foto del hero del país no se repita en sus detalles de servicio. Rastreo automatizado de las 85 páginas de detalle (49 CO + 22 ES + 14 CH) contra los heroes de mercado: **0 repeticiones**. Ya cumplido por el lote de fotos jul 2026; sin cambios de código.
