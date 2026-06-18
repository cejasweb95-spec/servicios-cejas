# Frontend UI/UX V3 — Diseño profesional, shadcn, motion y reglas anti-IA

Última actualización: 17/06/2026.

Este documento amplía [frontend-ui-ux-detalle.md](frontend-ui-ux-detalle.md) con decisiones más concretas para implementación: reglas anti-IA, uso de shadcn/ui, animaciones con Motion/Framer Motion, diseño página por página, estrategia de imágenes y checklist web completo.

---

## 1. Reglas anti-IA obligatorias

Estas reglas son criterio de calidad. No son gustos sueltos: evitan que la web parezca generada por plantilla.

### Layout y composición

1. **No botones full-width por defecto.** El botón base será `inline-flex` y ancho automático. `w-full` solo en móvil, barras fijas o formularios donde tenga sentido.
2. **No cards dentro de cards.** Las secciones son bandas/layouts; las cards solo para elementos repetidos: servicio, curso, descarga, resultado.
3. **No grids idénticos eternos.** Alternar composición: lista rica, mosaico editorial, tabla desktop, panel lateral, mapa.
4. **No secciones convertidas en “tarjetas flotantes”.** El contenido principal debe respirar en página, no dentro de cajas innecesarias.
5. **No hero partido texto/tarjeta.** La home debe abrir con imagen real fuerte y texto integrado.
6. **No texto que se sale del contenedor.** Verificar títulos largos como “Puerto de Sagunto, Valencia” o “Micropigmentación y neutralización labial”.
7. **No espaciado uniforme en todas las secciones.** Ritmo visual: algunas secciones densas, otras respiradas.

### Color y estilo

8. **No beige genérico como identidad.** La marca es palo de rosa, blanco y negro.
9. **No gradiente de texto.** El énfasis se hace con tamaño, peso, color sólido o composición.
10. **No orbes, blobs, bokeh ni decoración abstracta.**
11. **No sombras enormes con borde de 1px en la misma tarjeta.** Elegir borde suave o sombra contenida, no ambos como recurso decorativo.
12. **No radios exagerados.** Cards: 8-12px. Botones tipo pill solo cuando sea un CTA o chip.
13. **No colores raw en componentes.** Usar tokens: `primary`, `foreground`, `surface`, `border`, `ring`.

### Copy y contenido

14. **No frases genéricas:** “realza tu belleza”, “transforma tu mirada”, “vive una experiencia única” salvo que vayan con dato real.
15. **No métricas decorativas.** Si se muestra “5+ años” o “cerca de 2.000 procedimientos”, debe aportar confianza, no llenar espacio.
16. **No mini-eyebrow en cada sección.** Etiquetas pequeñas solo cuando ayuden a orientar.
17. **No numerar secciones salvo procesos reales.** 01/02/03 solo para pasos, módulos o cronologías.

### Interacción

18. **No animar todo igual.** Cada movimiento debe tener una función.
19. **No carrusel como contenido principal.** Oculta información, reduce escaneo y puede perjudicar rastreo/descubrimiento de imágenes.
20. **No hover como única señal.** En móvil no existe hover; todo debe funcionar por click/tap/focus.
21. **No menús o overlays sin título accesible.** Dialog/Sheet/Drawer siempre con título, aunque sea `sr-only`.

---

## 2. Cómo se usará shadcn/ui

shadcn/ui se usará como **base accesible y componible**, no como estética final. Los componentes se copian al proyecto y se adaptan con tokens de marca.

### Componentes que sí usaremos en V1

| Necesidad | shadcn/ui | Uso en la web |
|---|---|---|
| Botones | `Button` | CTA, descargas, WhatsApp, enlaces internos |
| Etiquetas | `Badge` | Mercado, duración, disponibilidad, moneda |
| Pestañas | `Tabs` | Servicios por mercado, cursos/masterclass, cuidados |
| Segmentos | `ToggleGroup` | Selector Colombia/España/Suiza si conviene más que Tabs |
| Menú móvil | `Sheet` | Drawer lateral de navegación |
| WhatsApp chooser | `Dialog` desktop / `Drawer` móvil | Elegir Colombia o España/Europa/Suiza |
| Notas contextuales | `Alert` | “Próxima jornada por disponibilidad”, “Solo por WhatsApp” |
| Separadores | `Separator` | Separación sobria entre bloques |
| Tooltips | `Tooltip` | Iconos de descarga, mapa o información corta |
| Acordeones | `Accordion` | Cuidados o FAQ confirmado, no para ocultar contenido principal |
| Tabla desktop | `Table` | Comparativa de servicios/precios/duraciones |
| Estados carga | `Skeleton` | Si hay carga futura desde Supabase |
| Toast | `sonner` | Solo futuro admin, no imprescindible en web pública |

### Componentes que evitaremos o usaremos con cuidado

| Componente | Criterio |
|---|---|
| `Card` | Solo para items repetidos. No para secciones completas ni cards anidadas. |
| `Carousel` | No como forma principal de enseñar resultados o cursos. Solo lightbox/rail secundario si aporta. |
| `NavigationMenu` | No hace falta si la navegación es simple. Mejor header propio + Sheet móvil. |
| `Calendar` | No en V1 porque no hay fechas confirmadas. Futuro admin o jornadas con fechas reales. |
| `Chart` | No aplica a esta web. |
| `Sidebar` | Solo futuro admin, no web pública. |

### Reglas de implementación shadcn

- Usar variantes nativas antes de meter clases custom.
- `className` solo para layout, no para re-pintar componentes.
- Iconos dentro de botones con `data-icon="inline-start"` / `inline-end`.
- `gap-*`, no `space-y-*`.
- `Badge`, no spans custom para estados.
- `Alert`, no cajas manuales para avisos.
- `TabsTrigger` siempre dentro de `TabsList`.
- `Dialog`, `Sheet`, `Drawer` siempre con título accesible.
- Colores semánticos: `bg-primary`, `text-foreground`, `border-border`.

---

## 3. Motion / Framer Motion

Usar el paquete moderno **Motion for React** (`motion/react`) salvo que el proyecto final ya venga con `framer-motion`.

### Estrategia

- Animaciones pequeñas, de alto valor, no espectáculo.
- Client Components mínimos: no convertir toda la app en client-side.
- `MotionConfig reducedMotion="user"` global.
- `LazyMotion` si el bundle crece o hay muchas animaciones.
- Animar `opacity` y `transform`; evitar animar layout pesado, blur grande o sombras grandes.

### Patrones

| Patrón | Uso |
|---|---|
| `motion` | Hero, cards, pins, botones, paneles |
| `AnimatePresence` | WhatsApp chooser, lightbox, drawer/paneles |
| `layoutId` | Underline del selector de mercado, tabs, filtros |
| `layout` | Cards que cambian al filtrar |
| `useInView` / `whileInView` | Revelados puntuales, no en todas las secciones |
| `useReducedMotion` | Cambiar animación por fade/instant |

### Motion budget

| Interacción | Duración |
|---|---|
| Hover/tap | 120-180ms |
| Entrada hero | 300-450ms |
| Cambio tabs/filtros | 180-260ms |
| Dialog/lightbox | 180-260ms |
| Mapa/pins | 250-400ms |

Nada de bounce/elastic.

---

## 4. Home `/`

### Hero

**Diseño:** imagen real full-bleed de Xiomara, overlay controlado, logo blanco si el fondo lo pide.

**UI:**

- H1: `Cejas Internacionales`.
- Subheadline concreta: sede Cali + jornadas internacionales + formación.
- CTA principal `Contacta conmigo`.
- CTA secundario `Ver servicios`.
- Selector de idioma `ES / EN`, discreto y visible.
- Sello discreto: `Cali · Madrid · Palma de Mallorca · Ginebra`.

**Motion:**

- Imagen: scale 1.03 → 1 durante 450ms.
- H1: reveal vertical sutil.
- CTA: fade + y 8px.

**SEO-safe:**

- H1 real en HTML.
- Imagen con `next/image`, priority, tamaños definidos.
- No esconder texto hasta que termine animación.

### Selector de mercado

**Diseño:** barra segmentada, no cards grandes idénticas.

**UI:**

- Colombia: COP, sede Cali.
- España/Europa: EUR, jornadas.
- Suiza: CHF, Ginebra por disponibilidad.

**shadcn:** `Tabs` o `ToggleGroup`.

**Motion:** `layoutId` para indicador activo.

### Servicios destacados

**Diseño:** lista editorial con imagen + datos, no grid plano de 6 cards iguales.

**Cada item:**

- Foto o recorte real.
- Nombre.
- Mercado.
- Precio desde.
- Duración cita.
- CTA ancho natural.

**Motion:** hover leve en imagen (`scale: 1.025`), no card saltarina.

### Resultados reales

**Diseño:** mosaico editorial.

**No carrusel principal.** El mosaico muestra contenido visible para escaneo y SEO. El lightbox puede permitir navegación tipo carrusel después de abrir una imagen.

**shadcn:** `Dialog` para lightbox, `Badge` para etiquetas.

### Mapa internacional

**Diseño:** mapa custom SVG/React, no Google Maps embebido en home.

**UI:**

- Pin sede: Cali.
- Pins jornadas: Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto, Ginebra.
- Panel lateral desktop / bottom sheet móvil.

**Motion:**

- Pins entran con pequeño fade/scale.
- Línea/arco muy sutil entre Cali y ciudades.
- Panel con `AnimatePresence`.

### Sobre Xiomara

**Diseño:** retrato + texto + cabina/certificados.

**UI:**

- Bio corta.
- 5+ años.
- Cerca de 2.000 procedimientos.
- Certificaciones resumidas.

**No usar:** bloque de métricas gigante estilo SaaS.

### Formaciones teaser

**Diseño:** dos columnas: cursos profesionales y masterclass.

**UI:**

- 2 cursos profesionales.
- 3 masterclass.
- PDF descargable.
- `Próxima fecha por disponibilidad`.
- CTA WhatsApp.

### Contacto final

**Diseño:** bloque sobrio, claro.

**UI:**

- WhatsApp Colombia.
- WhatsApp España.
- Email.
- Redes.
- Dirección Cali.

---

## 5. Servicios

### `/servicios`

**Objetivo:** entrada al catálogo por mercado.

**Diseño:**

- Hero compacto.
- Selector de mercado sticky o visible.
- Categorías en chips.
- Tabla desktop + cards móviles.

**shadcn:**

- `Tabs` / `ToggleGroup`.
- `Badge`.
- `Table`.
- `Alert`.

**Motion:**

- Cambio de mercado con `layoutId`.
- Filtrado con `layout`.

### `/servicios/[mercado]`

**Diseño:**

- Cabecera del mercado.
- Lista de servicios solo de ese mercado.
- Descarga PDF.
- Nota de disponibilidad.

**No mezclar:** uñas/peinados de Colombia en España si no aplican.

### `/servicios/[slug]`

**Diseño:**

- Ficha de servicio.
- Imagen hero estable.
- Bloque datos: precio, duración cita, duración resultado, mercado.
- Descripción real del catálogo.
- Resultados relacionados.
- Cuidados si aplica.
- CTA contextual.

**Imágenes:** galería secundaria visible, no carousel obligatorio.

---

## 6. Resultados `/resultados`

**Diseño:** galería editorial con filtros.

### Galería

- Desktop: masonry/mosaico controlado con aspect ratios predefinidos.
- Móvil: grid de 2 columnas o lista destacada según calidad de fotos.
- Lightbox: `Dialog` con navegación siguiente/anterior.

### Carrusel

No como vista principal. Solo dentro de lightbox, porque:

- El contenido oculto se escanea peor.
- Las imágenes visibles ayudan más al usuario.
- Menos riesgo de CLS/layout raro.
- Mejor para enlazar/alt text/SEO visual.

---

## 7. Jornadas `/jornadas`

**Diseño:** mapa + lista accesible.

### Secciones

1. Hero: sede en Cali y jornadas por disponibilidad.
2. Mapa custom.
3. Lista de ciudades.
4. Explicación de cómo consultar.
5. CTA WhatsApp.

### Móvil

- Lista primero si el mapa queda pequeño.
- Bottom sheet para ciudad seleccionada.

### Motion

- Pin activo con `layoutId` o scale.
- Panel con `AnimatePresence`.
- Reducir motion: sin arcos animados.

---

## 8. Formaciones

### `/formaciones`

**Diseño:** página de autoridad académica.

**UI:**

- Hero con Xiomara/certificados.
- Tabs: cursos profesionales / masterclass.
- Lista rica, no carousel.
- PDFs descargables.
- Próxima fecha por disponibilidad.
- CTA WhatsApp.

**shadcn:** `Tabs`, `Badge`, `Button`, `Alert`.

### `/formaciones/[slug]`

**Diseño:**

1. Hero del curso.
2. Resumen rápido.
3. Precio/modalidad.
4. Temario.
5. Qué incluye.
6. Duración.
7. PDF.
8. Próximas fechas/cupos.
9. CTA.

**Cursos de 3 días:** usar timeline vertical real.

**Masterclass 1 día:** usar agenda compacta.

**Motion:** reveal del timeline, no animación en cada punto si hay demasiados.

---

## 9. Sobre Xiomara `/sobre-xiomara`

**Diseño:** editorial/fotográfico, con autoridad.

**Secciones:**

1. Hero retrato.
2. Bio.
3. Trayectoria.
4. Formación/certificaciones.
5. Cabina/certificados.
6. Filosofía técnica.
7. CTA.

**No usar:** cards de icono genéricas para valores.

---

## 10. Cuidados `/cuidados`

**Diseño:** contenido útil, escaneable.

**UI:**

- Tabs: cejas antes, cejas después, labios antes, labios después.
- Bloques con listas claras.
- Alertas para puntos críticos.
- CTA valoración por foto.

**shadcn:** `Tabs`, `Accordion` si el contenido crece, `Alert`.

---

## 11. Contacto `/contacto`

**Diseño:** decisión rápida.

**UI:**

- Dos CTAs principales:
  - WhatsApp Colombia.
  - WhatsApp España.
- Email.
- Redes.
- Dirección Cali.
- Link Google Maps Cali.

**WhatsApp button behavior:**

- En home y contacto: abre `Dialog`/`Drawer` con opciones Colombia / España-Europa-Suiza.
- En páginas Colombia: directo a Colombia.
- En páginas España/Suiza: directo a España.
- En cursos: selector si no se sabe país.

---

## 12. Elementos web que no deben faltar

### Identidad técnica

- `favicon.ico`.
- `icon.png` para navegadores.
- `apple-icon.png` para iOS.
- Iconos Android/PWA 192x192 y 512x512 en `manifest.ts`.
- `theme_color` palo de rosa o blanco según decisión final.
- `manifest.ts` aunque no hagamos PWA completa.

### Compartir en redes y WhatsApp

- `opengraph-image`.
- `twitter-image`.
- Títulos/descripciones por página.
- Imagen social cuidada con logo, palo de rosa y foto real.

### SEO técnico base desde el inicio

- Contenido principal renderizado en HTML y legible sin depender de interaccion.
- H1 unico por pagina y headings con jerarquia real.
- URLs limpias por mercado, servicio, formacion y jornada.
- URLs localizadas para ES/EN.
- Selector de idioma con rutas equivalentes.
- Metadata por ruta desde el primer build.
- `robots.ts`.
- `sitemap.ts`.
- Canonical URLs.
- `not-found.tsx`.
- `error.tsx`.
- Metadata por ruta.
- Alt text útil.
- Imágenes con dimensiones estables.
- JSON-LD preparado solo con datos confirmados.
- Investigacion SERP previa para definir copy, headings e intencion de cada pagina.
- Alternates/hreflang y sitemap localizado.

### i18n ES/EN

- Toda pagina publica debe existir en espanol e ingles internacional.
- El ingles debe ser localizacion profesional, no traduccion literal.
- Los componentes no deben hardcodear strings publicos.
- Probar que los textos ingleses no rompen botones, tabs, cards, mapa ni drawer movil.
- El cambio de idioma debe conservar la pagina equivalente cuando exista.

### Legal/confianza

- Aviso legal.
- Política de privacidad obligatoria porque se usara GA4/cookies analiticas con consentimiento.
- Política de cookies obligatoria con aceptar, rechazar, configurar y cambio de preferencias.
- Footer con dirección Cali, NIT, email y redes.

### Performance

- `next/image`.
- Hero con prioridad solo en imagen LCP.
- Lazy loading debajo del fold.
- PDFs como descargas, no embebidos pesados en la primera carga.
- Motion limitado a componentes interactivos.
- No cargar librerías de carrusel pesadas si no son necesarias.

---

## 13. Librerías recomendadas

| Necesidad | Librería |
|---|---|
| Framework | Next.js App Router |
| UI base | shadcn/ui |
| Estilos | Tailwind CSS v4 |
| Variantes | `class-variance-authority` / patrón CVA |
| Animación | Motion for React |
| Iconos | lucide-react si shadcn queda configurado con lucide |
| Validación datos locales | Zod |
| Futuro backend | Supabase |
| Galería/lightbox | Dialog propio con shadcn + Motion, no dependencia pesada al inicio |

No añadir una librería por cada efecto. Primero componentes propios sobre shadcn y Motion.

---

## 14. Fuentes consultadas

- shadcn/ui Components: https://ui.shadcn.com/docs/components
- shadcn/ui Dialog: https://ui.shadcn.com/docs/components/radix/dialog
- shadcn/ui Sheet: https://ui.shadcn.com/docs/components/radix/sheet
- shadcn/ui Tooltip: https://ui.shadcn.com/docs/components/radix/tooltip
- Motion for React: https://motion.dev/docs/react
- Motion LazyMotion: https://motion.dev/docs/react-lazy-motion
- Motion Accessibility: https://motion.dev/docs/react-accessibility
- Motion AnimatePresence: https://motion.dev/docs/react-animate-presence
- Next.js Metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js favicon/icon/apple-icon: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
- Next.js manifest: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
- Next.js Image Optimization: https://nextjs.org/docs/app/getting-started/images
- Google Core Web Vitals and Search: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- MDN Web App Manifest: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest
