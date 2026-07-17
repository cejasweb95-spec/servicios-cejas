# 03 — Depilación con cuchilla: sin foto, solo texto

## Lo que dijo la cliente

> «Depilación de cejas con cuchilla… la foto la quitamos. ¿En todo lado, donde llega cuchilla? La quitamos. Solo texto ya.»

## Análisis

- Hoy `depilacion-cejas-cuchilla` reutiliza la foto de **cera** (`serviceMediaIds` en `src/content/media.ts` L958).
- Eso confunde: el copy dice cuchilla y la imagen muestra cera.
- La cliente pide **explícitamente** cero imagen en ese servicio (y en cualquier aparición de cuchilla).

## Qué hacer

1. En `src/content/media.ts`, quitar el mapeo de `depilacion-cejas-cuchilla` en `serviceMediaIds` (o mapear a un valor que la query interprete como «sin imagen»).
2. Asegurar que `getServiceMediaAsset()` en `src/lib/content/queries.ts` devuelve `null` para cuchilla (sin fallback a categoría si mostraría otra foto incorrecta).
3. Verificar que `service-detail-page.tsx` ya renderiza bien el hero **sin** bloque imagen cuando `serviceImage` es `null` (layout de una columna o datos sin hueco roto).
4. Buscar otras rutas donde aparezca cuchilla (listados no llevan foto; solo detalle).
5. Actualizar nota en `docs/cliente/mejoras-reunion-2026-06-30/07-fotos-servicios-mapeo.md` si aplica: cuchilla = 🚫 sin foto (decisión 12/07).

## Archivos probables

- `src/content/media.ts` — `serviceMediaIds`
- `src/lib/content/queries.ts` — `getServiceMediaAsset`
- `src/app/[locale]/_pages/service-detail-page.tsx`
- Tests de validators si validan que todo servicio con foto tenga asset

## QA

- [x] `/es/servicios/colombia/depilacion-cejas-cuchilla` sin imagen en hero
- [x] Equivalente EN (`/en/services/colombia/brow-razor-shaping`)
- [x] Copy, precio, CTA WhatsApp intactos
- [x] Sin imagen rota ni placeholder vacío feo
- [x] JSON-LD del servicio sin campo `image`

## Estado

- [x] Mapeo `depilacion-cejas-cuchilla: null` (sin fallback a categoría; `getServiceMediaAsset` devuelve `null`)
- [x] Layout sin imagen verificado (hero mantiene acento corner al no haber foto)
- [x] ES + EN
- [x] QA pasado (2026-07-16, Claude Code)
