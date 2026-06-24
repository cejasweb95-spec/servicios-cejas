# Rediseño V5 — QA del sitio actual + hallazgos del vídeo de la clienta

## Estado y fuentes (todo verificado de primera mano)

Documentación. No modifica código. Reúne las dos pasadas de QA que pidió el cliente:

1. **QA del sitio en vivo** `https://servicios-cejas.vercel.app/es` (commit desplegado `3289fa6`, idéntico al local).
2. **Análisis del vídeo** de la clienta (`WhatsApp Video 2026-06-21 at 18.22.23.mp4`, 4 min 57 s, 464×832).

Fuentes procesadas en este equipo (no vía terceros):
- Audios 1 y 2 y el vídeo transcritos con `faster-whisper` (modelo `small`, ES) el 2026-06-24.
- 50 fotogramas extraídos del vídeo (1 cada 6 s) con `PyAV`; revisados los momentos clave.
- Lectura directa del código fuente desplegado.

---

## 🔴 CRÍTICO — En producción todo el sitio se anuncia como `http://localhost:3000`

**Evidencia en vivo:**
- `robots.txt` → `Sitemap: http://localhost:3000/sitemap.xml`.
- `sitemap.xml` → las **304 URLs** empiezan por `http://localhost:3000/...`.

**Causa raíz:** [src/config/site.ts](../../../src/config/site.ts) línea 8:
```ts
url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
```
En Vercel `NEXT_PUBLIC_SITE_URL` no está definido → cae al fallback `localhost`. De `siteConfig.url` dependen `metadataBase`, canonical, hreflang, Open Graph/Twitter (imágenes), el sitemap completo y todo el JSON-LD (Organization, BeautySalon, WebSite, WebPage, logo).

**Impacto:** Google no puede indexar (canónica = localhost), el sitemap es inválido y los previews al compartir están rotos. Ocurre ahora mismo.

**Fix (sin código):** en Vercel → Environment Variables → `NEXT_PUBLIC_SITE_URL = https://servicios-cejas.vercel.app` (y el dominio final cuando exista) → redeploy.
**Endurecimiento opcional (código):** usar `VERCEL_PROJECT_PRODUCTION_URL`/`VERCEL_URL` como fallback antes de `localhost`.

---

## Hallazgos de estructura/UX de la home — cita de la clienta → estado actual → acción

| Time | Lo que dice la clienta (vídeo) | Estado actual (verificado) | Acción V5 |
|---|---|---|---|
| 00:00–00:30 | "Este logito… muy pequeñito, como perdido. Agrandarlo o poner grande `Cejas Internacionales` y `Xiomara Sánchez` debajo." | Wordmark cursivo pequeño en header. | Aumentar el logo o tratamiento tipográfico. Ver [01](01-home-y-navegacion.md) §header. |
| 00:21–00:35 | "El título… más profesional, simplificado, como especialista en micropigmentación." | H1 `Belleza especializada con sede en Cali y jornadas internacionales`. | **H1 confirmado:** `Micropigmentación Avanzada, Formación Profesional y Jornadas Internacionales`. |
| 00:35–01:05 | "Que esté mi foto con mi biografía al inicio; no esta foto, otra de más abajo." | Hero = retrato manos al mentón + CTAs. Sin bio. | Apertura: identidad + retrato elegido + bio breve. Foto exacta pendiente de la clienta. |
| 00:48 / 04:24 | "Esta fotico chiquitica no me gusta, esta sombra negra." | Miniatura superpuesta en hero ([page.tsx:192-201](../../../src/app/[locale]/page.tsx#L192), `shadow-soft`). | **Eliminar** la miniatura. No reintroducir en móvil. |
| 01:17–02:03 | "El mapa después de mi presentación. No `mapa de disponibilidad`, sino `dónde me encuentras`. Pines tipo Google, que al pinchar salga el nombre (Cali Colombia, España Mallorca)." | "Mapa de disponibilidad", pines numéricos 1–6 + rutas rosa, lista debajo. | Renombrar, **subir antes de servicios**, pines de ubicación, detalle al pulsar. Ver [01](01-home-y-navegacion.md) §2. |
| 02:03–02:29 | "La siento muy blanca, muy plana. Jugar más con el rosadito de los botones." | Mayoría de secciones blanco/`muted`; rosa solo acento. | Pase de color: rosa en bandas, reglas, estados. Ver [00](00-auditoria-direccion-visual-y-motion.md) §sistema visual. |
| 02:29–03:13 | "Después del mapa, servicios: Colombia, España, Suiza catálogos. La disponibilidad la pongo en redes, no en la web." | "Elige el mercado…" antes de servicios; textos con "jornadas por disponibilidad". | Orden presentación→mapa→servicios; quitar disponibilidad. Ver [04](04-servicios-detalle.md). |
| 03:05–03:55 | "Punto físico: me encanta esta foto (estudio Cali) → dirección y comentarios. Pronto tendré punto físico en España (¿principal?)." | No hay sección de puntos físicos diferenciada. | Crear "Puntos físicos": Colombia ya; España al recibir datos. Ver [02](02-paginas-interiores-por-ruta.md) §4. |
| 04:02–04:10 | "Abajo, para los cursos, esta foto me encanta." | Formaciones con cards. | Foto de cursos indicada (identificar archivo). |
| 04:19–04:56 | "Más orden, la siento sin orden. Y adentro hay servicios cuya foto no corresponde." | 9 bloques con misma receta; fotos de retrato usadas como 'servicio'. | Reordenar + auditoría foto→servicio. |

---

## Inventario de fotos del vídeo → destino

| Foto (lo que se ve) | Aparición | Qué dijo | Destino V5 |
|---|---|---|---|
| Retrato manos al mentón, pelo cobrizo, fondo mármol | hero (00:12) | "me encanta, pero quiero otra de más abajo para el inicio" | Conservable, **no** como apertura. |
| Collage labios/cejas con esquina oscura | miniatura hero (00:48) | "no me gusta, esta sombra negra" | **Eliminar.** |
| Xiomara con tablet (blazer blanco) | destacados España (01:06) | (foto de 'servicio' que no representa el servicio) | Reemplazar por foto real del servicio. |
| Xiomara camiseta negra, mano en cara | destacados (04:12) | ídem | Reemplazar / reubicar como retrato editorial. |
| **Estudio/cabina Cali** (camillas salmón, espejo, estantes) | destacados Colombia + resultados (03:18) | "me encanta → punto físico Colombia + dirección + comentarios" | **Punto Físico Colombia.** |
| Foto para cursos | (04:02) | "esta foto me encanta para cursos" | Cabecera Formaciones — **identificar archivo exacto**. |
| Pared de 4 marcos macro (ojo/labios) | resultados (04:24) | "no me gusta por esta manchita" | Revisar/recortar; quitar la de la mancha. |

> Las asignaciones que dependen de fotos nuevas o de marcar el archivo exacto quedan **bloqueadas** hasta que la clienta envíe/identifique los archivos (hero de apertura, foto España, recortes).

---

## SEO · i18n · A11y · Marca (resumen)

- **SEO (arquitectura buena, config rota):** canonical + hreflang `es/en/x-default`, robots index/follow, OG/Twitter, JSON-LD rico, `theme-color`, sitemap 152 ES / 152 EN, `next/font`, `next/image`. **Todo envenenado por el bug `localhost`.** Mejora menor: añadir `xhtml:link` hreflang dentro del sitemap.
- **i18n:** rutas localizadas (`/servicios`↔`/services`), selector ES/EN. ✓
- **A11y:** `SkipLink` ✓, `<html lang>` ✓, `motion-reduce` en imágenes ✓. Menor: hero usa `<header>` dentro de `<main>` además del header global (doble landmark `banner`).
- **Marca:** tokens de color, Marcellus/Manrope, WhatsApp CO `573167742299` / EU `34603804837` correctos ✓.
- **A unificar:** dirección entre [site.ts:11](../../../src/config/site.ts#L11) (*"Calle 9 # 32 A 16…"*) y la mostrada en la web/footer (*"Cl. 5 #15A-118…"*). Posible doble fuente.
- **Mapa (dato OK):** las **6 ubicaciones ya existen** en [locations.ts](../../../src/content/locations.ts), incluida **Palma de Mallorca** (`palma-mallorca`). El cambio del mapa es de **presentación** (pines tipo ubicación + nombre al pulsar + renombrar a "Dónde me encuentras"), no de datos.

## No verificable sin navegador real

Responsive real (390/430/768/1024/1440/1920), Lighthouse/Core Web Vitals, contraste medido, errores de consola e interacciones (menú móvil, lightbox, mapa, selector WhatsApp). Requiere la extensión Claude-in-Chrome o Playwright.
