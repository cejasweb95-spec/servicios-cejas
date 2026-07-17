# 04 — Centrado y encuadre de fotos de servicio

## Lo que dijo la cliente

> «Centro las fotos como debe estar centrada.»

> «La foto no te deja mover… ¿se puede mover, expandir?»

> Varias fotos «se ven como mocha» / cortadas / sin mostrar el detalle completo.

## Análisis

- El marco del detalle usa `aspect-[4/3]` + `object-cover` sin `object-position` por defecto (`service-detail-page.tsx`).
- Fotos verticales o collages antes/después se recortan mal en móvil.
- Solución preferida: **pre-export 4:3** en archivo (ver `mejoras-reunion-2026-06-30/07`) + `objectPosition` por asset cuando el crop CSS sea necesario.

## Qué hacer

1. Extender el modelo de media (si no existe) con `objectPosition?: string` opcional en assets de servicio.
2. Aplicar en `Image` del detalle: `className` con `object-cover` + style o clase Tailwind arbitraria `object-[center_40%]` etc.
3. Revisar **todos** los servicios con foto en navegador (390 primero) y ajustar posición por asset.
4. Priorizar servicios que la cliente nombró en la llamada (ver [09-servicios-senalados-encuadre.md](./09-servicios-senalados-encuadre.md)).
5. Si un asset es irrecuperable con CSS, re-exportar WebP desde original en `docs/cliente/fotos-servicios-2026/` con crop manual.

## Valores orientativos (ajustar en navegador)

| Servicio | Problema | Acción sugerida |
|----------|----------|-----------------|
| `neutralizacion-labios` | Labio no centrado | `object-[center_45%]` o crop al labio |
| `relleno-pestanas` | Ojo cortado | Panel «después» o `object-[center_35%]` |
| `linea-ojos` | Encuadre | Centrar línea de pestañas |
| `efecto-polvo` | Cicatrizado poco visible | Acercar ceja / quitar banda de texto en export |
| `lifting-pestanas` | Detalle pestañas | Ver también curso en MD 08 |
| `hidralips-*` | Screenshot con UI | Recorte en archivo (crítico) |

## Archivos probables

- `src/content/media.ts` — campo `objectPosition` por asset
- `src/lib/content/schema.ts` — Zod del asset
- `src/app/[locale]/_pages/service-detail-page.tsx`
- `public/images/servicios/*.webp` — re-export si hace falta

## QA

- [x] Campo `objectPosition` tipado y validado (Zod en `schema.ts`, aplicado vía `style` en detalle)
- [x] Servicios del MD 09 revisados en 390 / 768 / 1024
- [x] Sin sujeto principal cortado en móvil
- [x] Sin CLS (el marco usa el aspect-ratio real del asset)
- [x] Alt ES/EN sin cambios incorrectos

## Estado

- [x] Modelo extendido (`objectPosition` opcional por asset)
- [x] Ajustes aplicados a servicios prioritarios — **nota:** todas las WebP ya estaban en 4:3 exacto, así que el crop CSS no aplicaba; se re-exportaron desde original: `efecto-polvo` (rotado + acercado a la ceja, sin banda de texto), `neutralizacion-labios` (recorte centrado en labios, sin logo/texto), `relleno-pestanas` (nueva fuente `01-antes-despues-linea-pestanas.png`, ojo «después» completo). El marco del detalle ahora respeta la proporción natural del asset.
- [x] QA visual pasado (2026-07-16, Claude Code)

## Ampliación 16/07 (pedido Jeffrey): fotos completas sin zoom en TODAS las landing

La clienta pidió que las fotos se vean **completas como el original**, sin recorte con zoom (referencia: `refuerzo-cejas`, que ya salía completa). Las 17 WebP de servicio estaban recortadas a 4:3; se **re-exportaron desde el original a su proporción nativa** y se corrigieron `width`/`height` en `media.ts`. HidraLips: se quitó solo la barra de estado del móvil y la tira de miniaturas.

- Se intercambiaron además las fotos de `linea-ojos` ↔ `relleno-pestanas` (pedido Jeffrey).
- **Tope de altura elegante:** en `service-detail-page.tsx`, las verticales muy altas se acotan a máx. 30rem (480px) limitando el ancho del marco y centrando, **sin recortar** la imagen (`maxWidth = 30rem × ratio` para ratio < 1).
- Verificado con **test chromium** (19 páginas ES+EN): ratio servido = ratio del archivo, alto ≤ 480px, sin overflow, en 390 y 1440.
- Suite E2E completa **106/106**; se actualizó `puerto-sagunto-studio.spec.ts` (hero de mercado España ahora es el retrato de Xiomara por el extra E2).
