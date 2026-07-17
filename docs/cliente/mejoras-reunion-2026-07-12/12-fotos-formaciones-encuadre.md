# 12 — Formaciones: fotos con zoom excesivo o desorientadas

> Añadido el 16/07/2026 a pedido de Jeffrey durante la validación en local (no venía de la llamada del 12/07): en `/es/formaciones` había fotos de curso «con mucho zoom y desorientadas».

## Auditoría (16/07/2026)

| Curso | Asset | Problema encontrado | Acción |
|---|---|---|---|
| Micropigmentación de cejas | `curso-cejas-pigmentos` | Ninguno (Xiomara con pigmentos) | — |
| Micropigmentación de labios | `curso-labios-demostracion` | Ninguno (Xiomara con tablet) | — |
| Master Class laminado | `curso-laminado-cejas` | Ya corregido en [08](./08-curso-laminado-foto.md) | — |
| **Master Class lifting** | `curso-lifting-pestanas` | **Zoom extremo, borrosa, banda negra** (imagen extraída de PDF a baja resolución) | Nueva fuente: `lifting-pestanas/incoming-lote-2026-07-09/03-antes-despues.png` (nítida), crop 4:3 con los dos ojos y pestañas levantadas |
| **Master Class henna** | `curso-cejas-henna` | **Cara girada 90° (desorientada)** y recorte raro | Panel «después» de `cejas-05`/`cejas-10`, rotado a vertical natural y crop 4:3 con ambas cejas sombreadas |

## Detalle técnico

**Criterio (iterado con Jeffrey el 16/07):** para tarjetas y heros de curso, plano abierto — nada de macros de ojo, que a tamaño tarjeta se ven «con mucho zoom». Los macros del material de cliente (lifting antes/después, mirada-0X) están tomados con la cara tumbada/diagonal y no dan un plano limpio.

- `curso-lifting-pestanas.jpg`: **retrato de Xiomara formadora** (sesión-09: en la camilla con su equipo, pared de certificados), crop 4:3 1366×1025. Sustituye al extracto borroso del PDF y al antes/después macro que se veía «con pestañas que no corresponden». Alt ES/EN actualizado.
- `curso-cejas-henna.jpg`: panel superior del collage de sombreado en henna (`02-collage-sombreado-henna.png`): cara derecha, ambas cejas y ojos, sin marca de agua ni etiqueta de ubicación (crop 506×380 → 675×507). Alt ES/EN.
- Fotos distintas de las de los servicios equivalentes (`lifting-pestanas.webp`, `sombreado-henna.webp`) y sin repetir ninguna otra foto de `/es/formaciones`.
- ⚠️ Al reemplazar imágenes conservando el nombre de archivo, el optimizador de Next en dev sirve caché stale: parar server, borrar `.next` y recalentar rutas (dos veces nos pasó hoy).

## QA

- [x] `/es/formaciones`: las 5 tarjetas con foto nítida, orientada y sin recorte raro
- [x] Detalle Master Class lifting (ES/EN): foto nueva, PDF intacto
- [x] Detalle Master Class henna (ES/EN): foto nueva, PDF intacto
- [x] 390 / 768 / 1024 sin overflow
- [x] Typecheck limpio

## Estado

- [x] Auditoría hecha (2 tarjetas OK, laminado ya resuelto, 2 corregidas)
- [x] Re-exports aplicados y `media.ts` actualizado
- [x] Verificado en navegador
