# Rediseño V5 — punto de entrada (handoff)

> Lee esto primero al retomar el trabajo (incluido en **otro PC**: `git pull origin develop`).
>
> **¿Continúas en otra máquina?** Pega el prompt de [PROMPT-CONTINUACION.md](PROMPT-CONTINUACION.md) en una sesión nueva.

## Estado (2026-06-24)

- Rama de trabajo: **`develop`** (es la que despliega Vercel; producción es `main` — no tocar sin Jeffrey).
- Material de la clienta analizado **de primera mano**: 2 audios + vídeo (~5 min) transcritos, 50 fotogramas revisados.
- QA del sitio en vivo hecha. **Hay una bug crítica de SEO** (ver más abajo).
- Documentación completa de spec + plan en esta carpeta. Implementación: iniciada por fases.

## Orden de lectura

1. **[05-qa-y-hallazgos-video.md](05-qa-y-hallazgos-video.md)** — evidencia: QA del sitio + lo que pidió la clienta (con minutos) + inventario de fotos.
2. **[06-plan-implementacion-por-fases.md](06-plan-implementacion-por-fases.md)** — qué hacer y en qué orden (Fases 0–7, skills por fase, bloqueantes).
3. **[07-direccion-senior-y-qa-integral.md](07-direccion-senior-y-qa-integral.md)** — dirección de diseño senior de toda la web (incl. footer) + QA integral.
4. Spec de detalle: [00 dirección/motion](00-auditoria-direccion-visual-y-motion.md) · [01 home/nav](01-home-y-navegacion.md) · [02 páginas interiores](02-paginas-interiores-por-ruta.md) · [03 reglas/responsive](03-reglas-implementacion-responsive-y-skills.md) · [04 servicios (catálogo real)](04-servicios-detalle.md).

## Lo más urgente (independiente del rediseño)

🔴 **Producción se anuncia como `http://localhost:3000`** (sitemap, canonical, hreflang, OG, JSON-LD) porque
`NEXT_PUBLIC_SITE_URL` no está en Vercel. **Fix:** Vercel → Environment Variables →
`NEXT_PUBLIC_SITE_URL = https://servicios-cejas.vercel.app` → redeploy. Detalle en `05`.

## Bloqueantes de cliente (frenan su fase)

1. Foto de **apertura** del hero (la "de más abajo"). 2. Datos+autorización del **punto físico España**
(además requiere visto bueno de Jeffrey por la regla "dirección solo Cali"). 3. Archivos exactos de **foto de cursos** y **recortes**.
4. Lista final de **pines del mapa** (Palma de Mallorca **ya está** en los datos). 5. Nombre exacto: **Xiomara Sánchez** vs **Xiomy Sanchez**. 6. **EN del H1**.

## H1 confirmado por la clienta

`Micropigmentación Avanzada, Formación Profesional y Jornadas Internacionales` (EN pendiente de aprobar).

## Transcripción de audio/vídeo (si hace falta re-hacerla en otro PC)

La API de Claude no acepta audio. Pipeline que funciona: `pip install --only-binary=:all: faster-whisper av pillow`
y `WhisperModel("small", device="cpu", compute_type="int8").transcribe(path, language="es", vad_filter=True)`.
`av` (PyAV) decodifica el Opus de WhatsApp y extrae fotogramas de vídeo. Las transcripciones ya están en
[../audio-transcripciones/](../audio-transcripciones/).
