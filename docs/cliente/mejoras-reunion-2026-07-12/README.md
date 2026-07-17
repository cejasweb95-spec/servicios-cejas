# Mejoras — Reunión con la cliente 12/07/2026

Fuente: `docs/cliente/audio-transcripciones/reunion-revision-web-2026-07-12-22h.md` (llamada de revisión pre-publicación, ~14 min).

**Contexto:** la cliente está contenta con la base (“estructura y base ya está”). Esta reunión es **pulido final** antes del dominio principal. Llamada de cierre prevista el **miércoles** siguiente a la grabación.

Cada mejora tiene su propio MD. Aplicarlas **una a una**, marcando el checklist de cada archivo y este índice al terminar.

**Prompt para Claude Code:** [PROMPT-CLAUDE-CODE.md](./PROMPT-CLAUDE-CODE.md)

**Relación con reunión anterior (30/06):** varias mejoras de `docs/cliente/mejoras-reunion-2026-06-30/` ya están hechas. Esta carpeta cubre solo lo nuevo o lo que sigue pendiente tras la revisión del 12/07.

---

## Índice y orden sugerido

| # | Mejora | Bloqueada por material de la cliente | Estado |
|---|--------|--------------------------------------|--------|
| 01 | [Header: apellido «Xiomara Sánchez»](./01-header-xiomara-sanchez.md) | — | ✅ Hecho (2026-07-16) |
| 02 | [Quitar cuadrado rosa en esquina sobre fotos](./02-quitar-rosewash-esquina-fotos.md) | — | ✅ Hecho (2026-07-16) |
| 03 | [Depilación con cuchilla: sin foto, solo texto](./03-cuchilla-sin-foto.md) | — | ✅ Hecho (2026-07-16) |
| 04 | [Centrado y encuadre de fotos de servicio](./04-centrado-fotos-servicios.md) | Parcial (ajustes finos) | ✅ Hecho (2026-07-16, re-exports) |
| 05 | [Re-mapeo servicio → foto (lote renombrado)](./05-remapeo-fotos-cliente.md) | Sí (lista de la clienta) | ⬜ Bloqueada (lote no llegó) |
| 06 | [Extensiones: collage 9 celdas / 11 servicios](./06-extensiones-collage-fallback.md) | Opcional (fotos individuales) | ✅ Hecho (panel completo temporal) |
| 07 | [Suiza: no repetir retrato de Xiomara](./07-suiza-sin-repetir-retrato.md) | — | ✅ Hecho (auditoría, sin cambios necesarios) |
| 08 | [Curso Master Class laminado: foto cortada](./08-curso-laminado-foto.md) | — | ✅ Hecho (2026-07-16) |
| 09 | [Servicios señalados en la llamada](./09-servicios-senalados-encuadre.md) | Parcial (línea de ojos nueva) | ✅ Hecho (línea de ojos espera archivo nuevo) |
| 10 | [QA pre-publicación y dominio principal](./10-qa-pre-publicacion-dominio.md) | — | 🟡 Bloques A y C completos; falta llamada + go-live |
| 11 | [Validado sin cambios](./11-validado-sin-cambios.md) | — | ✅ No tocar |
| E1 | Extra (pedido Jeffrey 16/07, fuera de MDs): sede Cali en «Sedes físicas» reutiliza la foto de camillas de la tarjeta de mercado Colombia (`mercado-colombia`); la tarjeta de mercado no cambia y `estudio-cabina-certificados` sigue en /contacto | — | ✅ Hecho (2026-07-16) |
| E2 | Extra (pedido clienta vía Jeffrey 16/07): tarjetas «Servicios por país» de la home ya no repiten las fotos de «Sedes físicas»; Colombia y España usan retratos nuevos de Xiomara (`mercado-colombia-retrato` = sesión-02 escritorio, `mercado-espana-retrato` = sesión-03 uniforme negro), distintos entre sí, de Suiza (sesión-04) y del resto de la home (0 imágenes duplicadas en home). Afecta también a los heroes de /servicios/[país], re-verificado el rastreo anti-repetición: 85/85 sin repetir | — | ✅ Hecho (2026-07-16) |
| 12 | [Formaciones: fotos con zoom o desorientadas](./12-fotos-formaciones-encuadre.md) (añadido 16/07 en validación) | — | ✅ Hecho (2026-07-16) |

---

## Confirmado por la cliente (no requiere cambios)

Ver detalle en [11-validado-sin-cambios.md](./11-validado-sin-cambios.md).

- Mapa «Dónde me encuentro»: OK.
- Formaciones / cursos: fotos corresponden; lifting añadido.
- Reseñas: mayoría Cali; España recién abierta — explicado y aceptado.
- SEO básico: la encontró en Google; contenta.
- Estructura general: «lo más difícil ya está; ahora pulir».

---

## Reglas a respetar en todas las mejoras

- Rama de trabajo: **`develop`** (no tocar `main`).
- V1 informativa: sin formularios de reserva ni checkout.
- Contenido **ES + EN** a la vez en todo cambio público.
- Sin hex crudos en componentes; tokens semánticos.
- No mezclar servicios entre mercados.
- No inventar reseñas, oficinas ni datos de sedes.
- WhatsApp: Colombia `573167742299`; España/Europa/Suiza `34603804837`.
- Antes de marcar hecho: lint, typecheck, build y verificación visual 390 / 768 / 1024.

---

## Criterio de cierre (go-live)

La cliente indicó publicar en el **dominio principal** cuando:

1. Estén los detallitos de esta reunión (fotos + apellido).
2. Pase la revisión del miércoles.

Ver checklist completo en [10-qa-pre-publicacion-dominio.md](./10-qa-pre-publicacion-dominio.md).
