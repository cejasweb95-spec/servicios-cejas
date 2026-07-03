# 04 — Reseñas y opiniones en la web

## Lo que dijo la cliente

> "¿Dónde se pueden ver las opiniones?... Me gustaría ver las reseñas de acá, tanto de Cali como de España. Y que la gente lo pueda escribir ahí mismo en la web, que haya un botón de escribir opiniones o reseñas, y cuando escriban se publiquen automáticamente aquí en la web."

## Análisis (importante antes de implementar)

La petición tiene dos partes con distinto coste:

1. **Mostrar reseñas** (Cali y España): viable en V1.
2. **Escribir reseñas desde la web con publicación automática**: choca con las reglas de V1 (informativa, sin formularios ni backend) y con el plan de que la futura BD sea Supabase. Publicación automática sin moderación además es un riesgo (spam, contenido ofensivo, reseñas falsas que afectan SEO/confianza).

### Opciones propuestas

| Opción | Descripción | Esfuerzo | Recomendación |
|--------|-------------|----------|---------------|
| A | Mostrar reseñas reales de Google (curadas manualmente como datos tipados locales, con fecha y autor reales) + botón "Escribir reseña" que enlaza a la ficha de Google Business Profile de cada sede | Bajo | ✅ Recomendada para V1 |
| B | Widget de terceros que embebe reseñas de Google en vivo | Medio | ⚠️ Script externo: coste de rendimiento y consentimiento |
| C | Sistema propio con Supabase (formulario + moderación + publicación) | Alto | Futuro, fase Supabase; **nunca** publicación automática sin moderar |

Con la opción A la cliente consigue lo esencial: las reseñas se ven en la web y el visitante puede escribir la suya (en Google, que además alimenta el SEO local de la mejora 09). La ficha nueva de España (mejora 05) da el enlace para las reseñas de España.

## Qué hacer (opción A)

1. Confirmar la opción con Jeffrey/cliente.
2. Modelar `reviews` en la capa de datos local (autor, texto ES/EN si se traduce, valoración, sede, fecha, fuente).
3. Copiar reseñas reales de la ficha de Google de Cali (no inventar ninguna).
4. Crear componente de reseñas (sin carrusel como presentación principal) con filtro/pestañas por sede cuando exista la de España.
5. Botón natural-width "Escribir una reseña" → enlace directo a reseñar en Google de la sede correspondiente.
6. **No** añadir schema `AggregateRating`/`Review` salvo que se decida y solo con datos verificables.

## Dependencias

- Enlace de reseñas de la ficha de Google de Cali (ya existe) y de España (tras la mejora 05).

## QA

- [x] Reseñas visibles con contenido real.
- [x] Botón de escribir reseña abre la ficha de Google correcta por sede.
- [x] ES y EN completos.
- [x] Sin scripts de terceros bloqueantes.

## Estado

- [x] Opción confirmada (Jeffrey aprobó la Opción 1 el 03/07/2026 y pasó los enlaces de ambas fichas públicas)
- [x] Implementado (03/07/2026)
- [x] QA pasado (lint, typecheck, build, 87 tests E2E chromium-desktop, verificación visual ES/EN)

## Resultado de la aplicación (03/07/2026)

Implementada la **Opción 1**: botón con enlace directo al formulario de reseña de Google, más las reseñas reales curadas en la web.

### Fichas de Google confirmadas (Place IDs extraídos de los enlaces de Jeffrey)

| Sede | Place ID | Datos ficha (03/07/2026) |
|------|----------|--------------------------|
| Cali, Colombia | `ChIJg98SfXOnMI4RAyDR2tKq6Ng` | 5,0 · 61 reseñas · Centrosur Plaza, calle 9 #32A-16 local 118 |
| Puerto de Sagunto, España | `ChIJ97PZB9gXYA0R3HuqKedSjM0` | Ficha nueva sin reseñas aún · Carrer Catalunya 24, 46520 Port de Sagunt |

### Qué se implementó

- `src/content/reviews.ts`: nuevo dataset tipado con los 2 perfiles de Google (`googleReviewProfiles`) y 6 reseñas reales copiadas de la ficha pública de Cali (Zule Suárez, María Camila Alzate, Nathalia Mora, Julia García, Michelle Pulido y Laura Arbeláez), con texto ES original y EN localizado.
- `src/lib/content/schema.ts`: schemas `googleReviewProfileSchema` y `reviewSchema` (Zod).
- `src/lib/content/queries.ts`: `getGoogleReviewProfiles()` y `getReviewsByProfile()`.
- `src/lib/content/validators.ts`: valida IDs únicos, referencias a `locations` y que la URL de escritura contenga el Place ID.
- `src/components/domain/review-section.tsx`: `ReviewList` (citas editoriales con estrellas, sin carrusel) y `WriteReviewButtons` (botones natural-width que abren `https://search.google.com/local/writereview?placeid=…` en pestaña nueva).
- Home (`/es` y `/en`): nueva sección `#opiniones` entre Resultados y Descargas, con la valoración real de la ficha de Cali (5,0 · 61 reseñas), las 6 reseñas, botones "Escribir reseña" para Cali y Puerto de Sagunto y enlace "Ver todas en Google".

### Notas

- **No** se añadió schema `AggregateRating`/`Review` (según lo acordado: solo con decisión explícita).
- La ficha de España es nueva y aún no tiene reseñas; cuando las tenga, se copian a `reviews.ts` con `profileId: "google-puerto-sagunto"`.
- La ficha de España confirma dirección física en Carrer Catalunya 24, Port de Sagunt — dato útil para las mejoras 03 y 05 (pendiente confirmación de la cliente antes de publicarla en la web).
- La Opción 2 (WhatsApp "Cuéntame tu experiencia") quedó descartada por decisión de Jeffrey (solo Opción 1).
