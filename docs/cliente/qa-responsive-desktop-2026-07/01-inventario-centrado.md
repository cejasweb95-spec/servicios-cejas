# 01 — Inventario de centrado por página y sección

Medido a **1440px** (el patrón es idéntico a 1280 y 1920 porque el container está capado a 1280).
`offL` = px desde el borde izquierdo del container hasta el encabezado. `rightGap` = px vacíos a la derecha del encabezado dentro del container (1280px). Un `rightGap` alto = título muy pegado a la izquierda.

## Home (`/es`)

| Sección | Encabezado | offL | rightGap | Diagnóstico |
|---|---|---|---|---|
| Hero | Xiomara Andrea Sánchez… | 733 | 32 | OK (lado texto del hero) |
| Jornadas | Dónde me encuentras | 559 | 49 | OK-ish |
| Servicios por país | Servicios por país | 56 | **480** | Izquierda |
| Sedes físicas | Sedes físicas | 32 | **480** | Izquierda |
| Formaciones | Formaciones y masterclass | 56 | **480** | Izquierda |
| Reseñas | Lo que dicen mis clientas | 56 | **480** | Izquierda |
| Descargas | Catálogos y PDFs oficiales | 32 | **480** | Izquierda |
| CTA | Valoración gratuita | 32 | **480** | Izquierda |

## Formaciones (`/es/formaciones`)

| Encabezado | offL | rightGap |
|---|---|---|
| Cursos profesionales y masterclass (hero) | 32 | **613** |
| Cursos profesionales (H2 sección) | 56 | **480** |
| Masterclass de especialización (H2) | 56 | **480** |
| Consultar próxima fecha | 57 | **551** |

## Descargas (`/es/descargas`) — los peores

| Encabezado | offL | rightGap |
|---|---|---|
| Catálogos y PDFs oficiales (hero) | 32 | **480** |
| Catálogos por mercado | 32 | **927** |
| Formaciones (grupo de descargas) | 32 | **1079** |

## Contacto (`/es/contacto`)

| Encabezado | offL | rightGap |
|---|---|---|
| Contacto y reservas por WhatsApp (hero) | 32 | **613** |
| Elige el WhatsApp correcto | 32 | **622** |
| Email oficial / Dirección / Redes (columna lateral) | 706 | 56 | OK (columna derecha) |

## Resultados (`/es/resultados`)

| Encabezado | offL | rightGap |
|---|---|---|
| Resultados reales de Cejas… (hero) | 32 | **480** |
| Detalles que inspiran (galería) | 745 | 32 | OK (sticky derecha) |

## Patrón común detectado

Los encabezados con `rightGap ≥ 480` provienen del bloque:

```
<div className="max-w-3xl border-l-4 border-primary pl-5"> … </div>
```

presente en `page.tsx` (×3), `services-index-page.tsx`, `training-index-page.tsx` (×2), `market-services-page.tsx`, `journeys-page.tsx`, más variantes en `contact-page.tsx` y la de descargas. Todos alineados a la izquierda.

## Lo que ya está bien (no tocar sin motivo)

- Sin overflow horizontal en ningún ancho.
- Container centrado y simétrico.
- Heros de detalle (servicio/curso) con dos columnas que llenan el ancho.
- Columnas laterales (contacto, resultados) correctamente posicionadas.
