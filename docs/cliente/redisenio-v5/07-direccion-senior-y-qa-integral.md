# Rediseño V5 — Dirección senior y QA integral (toda la web)

## Propósito

Esta es la **vuelta senior** sobre todo lo propuesto en `00`–`06`: no los reemplaza, los **eleva** con
especificaciones concretas (escala tipográfica, ritmo de color, tratamiento de imagen, motion) y cubre
**la web entera — página por página y elemento por elemento, incluido el footer, los estados y el QA**.
Norte: que se sienta hecho por un diseñador senior con 20 años, no por una plantilla ni por IA.

Todo sigue las reglas de `AGENTS.md` (paleta palo de rosa, tokens, fotos reales, WhatsApp, bilingüe) y
reutiliza las primitivas existentes (`split-feature`, `editorial-image-pair`, `page-hero`, `service-list`,
`result-mosaic`, `Section`). Sin código aún.

## Referencias investigadas (06/2026) y qué tomamos

Investigación de referencia (no se pudieron capturar pixeles porque no hay extensión de navegador conectada;
se extrajeron patrones por contenido). Fuentes: [makeup-artist-websites — sitebuilderreport](https://www.sitebuilderreport.com/inspiration/makeup-artist-websites) y [cosmetics websites — muffingroup](https://muffingroup.com/blog/cosmetics-websites/).

| Patrón senior observado | Cómo lo aplicamos a Cejas Internacionales |
|---|---|
| Lujo = **contención**: imagen premium + aire, no ruido (Aesop, Susanne Kaufmann). | Menos elementos por sección, más espacio negativo, una idea fuerte por bloque. |
| **Serif display + sans body** señala oficio. | Marcellus en grande para titulares/credenciales; Manrope para cuerpo. Subir el contraste de escala. |
| **Fuera del blanco plano**: neutros cálidos + ritmo tonal, no bloques de alto contraste. | Secuencia tonal por toda la web: marfil cálido → blush (`primary-soft`) → tinta. |
| **Rechazo de la rejilla de tarjetas uniforme**: pares imagen-texto desplazados, anchos variables, full-bleed alternando con texto contenido. | `split-feature`/`editorial-image-pair` con `reverse` alterno; nada de N tarjetas clonadas. |
| Galerías **before/after grandes, marco mínimo, agrupadas por subtono de piel**. | Resultados: mosaico asimétrico, pocas imágenes grandes, agrupar por zona (cejas/labios/mirada) y, si hay material, por subtono. |
| Nav **4–5 enlaces**, sticky, logo con aire. | Ya en 5 + logo con presencia. |
| Footer = **navegación secundaria + confianza** (datos, social refinado), espaciado generoso. | Footer editorial (detalle abajo). |
| Motion **sutil**: fade-in al hacer scroll, zoom lento de hero (2–3 s), sin autoplay. | `motion/react` con reveal sobrio + `prefers-reduced-motion`. |

---

## Sistema de diseño senior

### Tipografía (elevar el contraste de escala)

- **Display (Marcellus):** H1 hero `clamp(2.25rem, 6vw, 4.5rem)`; H2 de sección `clamp(1.75rem, 3.5vw, 2.75rem)`; nombres/cifras destacadas en Marcellus. `text-balance` en titulares, `leading` 1.05–1.12.
- **Body (Manrope):** cuerpo 16–18 px, `leading` 1.6–1.7; ojo de lectura máx. ~68ch; etiquetas/UI 13–14 px con `tracking` ligero en mayúsculas (eyebrows).
- **Jerarquía:** un solo H1 por página; eyebrow (Manrope, mayúsculas, `primary-text`) sobre H2 (Marcellus). No usar Marcellus para párrafos largos.
- Senior: aumentar el salto de tamaño H1↔body y el aire sobre/bajo titulares; menos pesos, más tamaño.

#### Refinamiento de elegancia (feedback cliente, 2026-06-25)
- **Acento en cursiva**: en cada título de sección, una **palabra clave en cursiva** (Marcellus itálica) para dar aire editorial elegante (p. ej. «Servicios por *país*», «Resultados *reales*»). Se implementa con `t.rich` + `<i>` en las traducciones para mantener ES/EN. No añadir una 3ª fuente (regla de marca): se usa la itálica de Marcellus.
- **Compactar en desktop**: las bandas editoriales (empezando por «Servicios por país» en la home) tenían demasiado aire vertical y huecos en desktop. Reducir gaps de fila, acercar columnas imagen↔texto y ratios de imagen más bajos para una composición más densa y elegante.
- **Sin guionado feo**: quitar `hyphens-auto` de titulares grandes (el H1 partía «Micropigmenta-ción»); permitir el salto natural por palabra.

### Color y ritmo tonal (matar el "muy blanco/plano")

Tokens existentes (no inventar): `--background #fff`, `--surface-muted #fbf8f7`, `--surface-strong #fff8f9`,
`--primary-soft #e8c7cc`, `--primary #b76e79`, `--primary-text #7f3f4a`, `--secondary #111` (ink).

- **Secuencia tonal de la home** (cada sección una "respiración" distinta, sin dos iguales seguidas):
  `surface-strong` (hero) → `background` (presentación) → `surface-muted` (mapa) → `background` (servicios) →
  `primary-soft` (puntos físicos, banda rosa) → `background` (formaciones) → `surface-muted` (resultados) →
  `ink` (CTA final) → footer `surface-muted`.
- **Palo de rosa con intención:** reglas/divisores `primary`, eyebrows `primary-text`, pin activo, estado activo de nav, bordes de foco, y **una o dos bandas** `primary-soft`. Nunca texto largo sobre rosa saturado; mantener contraste AA.
- Prohibido: gradientes de texto, orbes/blobs, sombras de colores, teñir todas las tarjetas.

### Superficies y elevación (filosofía anti-tarjeta)

Solo **3 superficies** en toda la web:
1. **Editorial** — texto + foto real, sin borde de tarjeta ni sombra.
2. **Ficha de datos** — precio/duración/ubicación; fondo `surface-strong`/`primary-soft`, borde 1px sutil, radio `lg`.
3. **Banda CTA** — fondo `ink`, acento rosa.

Bordes finos y radio solo donde se delimita una unidad interactiva o una foto. Sombra solo en overlays
(menú móvil, diálogo, lightbox). Nada de `hover:-translate-y` ni borde+sombra por defecto en cada bloque.

### Imagen (tratamiento senior)

- Solo material real de Xiomara/trabajos/formación/espacios. Auditoría foto→contexto antes de publicar.
- Ratios consistentes: retrato 4:5, editorial 3:2/16:11, resultado 1:1 o 4:5. `next/image` con `sizes` correcto, `priority` solo en hero.
- Resultados: marco mínimo, foco en el trabajo; agrupar por tratamiento (y subtono si hay material). Sin antes/después manipulados ni stock.
- Tratamiento unificado (mismo encuadre/luz cuando sea posible); evitar mezclar retrato-con-tablet como si fuera "foto de servicio".

### Motion senior

- Reveal de entrada: opacidad 0→1 + `translateY` 12–16px, 280–420 ms, una vez. Hero: escala 1.015→1, ≤520 ms.
- Hover foto: escala ≤1.03, 300–450 ms; siempre con equivalente de foco/tap. Pin/CTA: cambios de 160–220 ms.
- `prefers-reduced-motion`: desactiva parallax, cascadas y zoom; el contenido existe sin JS.
- Sin animación automática infinita; sin autoplay de vídeo.

### Estados (que casi siempre se olvidan)

- **Focus visible** en todo lo interactivo (ya hay `:focus-visible` con anillo `ring`). Verificar en menú, mapa, lightbox, selector de idioma, chips de mercado.
- **Hover** = solo realce; nunca única vía. **Active/aria-current** en nav y selector de idioma.
- **Empty**: usar `empty-state` (catálogo sin servicios, resultados sin filtro). **Loading**: `skeleton` si aplica. **Error/404**: útil, con vuelta a inicio/servicios.

---

## Recorrido senior por TODA la web

### Header (escritorio y móvil)
- Logo con aire (no "perdido"); altura header 72–80px; fondo `background/92` con blur sutil al hacer scroll (ya existe).
- 5 enlaces: Servicios · Dónde me encuentras · Formaciones · Resultados · Sobre Xiomara. Activo con regla `primary` (ya implementado).
- Selector `ES/EN` con `aria-current`; CTA `Contacta conmigo` (botón sólido). Móvil: panel con los 5 + idioma + CTA, foco atrapado, 44px táctiles.

### Home (orden V5, con ritmo tonal y sin tarjetas clonadas)
1. **Apertura** (`surface-strong`): eyebrow `Cejas Internacionales`, H1 confirmado, **bio breve de Xiomara**, 3 banderas con etiqueta, doble CTA, retrato 4:5 (foto de apertura pendiente de la clienta). Sin miniatura superpuesta (ya quitada).
2. **Dónde me encuentras** (`surface-muted`): mapa con pines de ubicación + panel de detalle al pulsar; sin disponibilidad. (Mapa rediseñado = Fase 3.)
3. **Servicios por país** (`background`): 3 países como composición editorial (bandera, moneda, foto real, 1 CTA), no 3 tarjetas con sombra.
4. **Puntos físicos** (`primary-soft`, banda rosa): Cali (foto del estudio + dirección + comentarios). España, layout listo pero bloqueado.
5. **Formaciones** (`background`): listado escalonado con foto real, no 5 cards clonadas.
6. **Resultados** (`surface-muted`): mosaico asimétrico, pocas imágenes grandes, lightbox accesible.
7. **Valoración + CTA final** (`ink`): bloque corto de valoración por foto y CTA WhatsApp; sin gradiente.

### Servicios — índice / mercado / detalle
- **Índice** (`/servicios`): H1 `Servicios por país`, intro canónica, selector editorial de 3 países, módulo de ayuda WhatsApp. (Ver `04`.)
- **Mercado** (`/servicios/[market]`): catálogo real por categoría en **lista editorial** (no pared de cards); foto al inicio de categoría o fila alterna; banda de catálogo PDF si existe.
- **Detalle** (`/servicios/[market]/[service]`): una foto grande correcta, ficha de datos (precio/duración/resultado) sobre `surface-strong`, descripción, cuidados (si `careGuide`), 3 relacionados del mismo mercado+categoría, CTA WhatsApp. Sin badges/contadores inventados.

### Dónde me encuentras (`/jornadas` → etiqueta nueva)
- H1 `Dónde me encuentras` (ya aplicado). Pines de ubicación tipo marcador (no números), detalle ciudad/país al pulsar junto al mapa; lista accesible secundaria. **El mapa no debe generar scroll horizontal** (hoy `min-w-[43rem]` provoca scroll interno → rehacer responsive en Fase 3). 6 ubicaciones ya en datos (Cali, Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto, Ginebra). Sin fechas/cupos.

### Puntos físicos
- Ficha Cali: foto del estudio (la que le encanta a la clienta), `Cali, Colombia`, dirección confirmada, CTA. Layout admite 2ª ficha (España) sin rediseño; **no** publicar España como sede/sede principal hasta datos + visto bueno de Jeffrey.

### Formaciones — índice / detalle
- Índice (`/formaciones`): H1 `Formaciones y masterclass`, separar `Cursos` y `Masterclass`, foto real, listado escalonado, CTA `Ver programa`.
- Detalle: hero con foto correspondiente, `Qué aprenderás` (lista semántica), `Qué incluye`, modalidades/precio por mercado en tabla simple, `Descargar PDF` si existe, CTA WhatsApp.

### Resultados (`/resultados`)
- H1 `Resultados reales`; mosaico asimétrico (2 imágenes ancla grandes + detalles), filtros por tratamiento (ocultar filtro sin contenido), lightbox con teclado y alt específico. Quitar/recortar la imagen con "manchita". Sin promesas garantizadas.

### Sobre Xiomara (`/sobre-xiomara`)
- Retrato elegido + titular profesional + bio en 2 párrafos (especialidad / forma de trabajar y enseñar). Enlaces a servicios, formación y presencia internacional. No repetir la home.

### Cuidados (`/cuidados`)
- H1 `Cuidados después de tu servicio`; selector por tratamiento; pasos antes/durante/después en listas numeradas (no cards de iconos); aviso de que no sustituye evaluación profesional. CTA WhatsApp.

### Contacto (`/contacto`)
- H1 `Hablemos de tu servicio o formación`; "Las citas se gestionan solo por WhatsApp"; 2 acciones WhatsApp (CO / EU-Suiza) con número visible; email y redes secundarios; bloque Cali con mapa embebido si no degrada rendimiento. Sin formulario de reserva.

### Descargas (`/descargas`)
- H1 `Catálogos y material oficial`; agrupar `Catálogos por mercado` y `Formaciones`; cada ítem: nombre, mercado/tipo, formato, tamaño si se conoce, `Descargar PDF`. Biblioteca funcional, no escaparate; fuera del menú principal.

### Legales (aviso legal / privacidad / cookies)
- Tipografía de lectura, índice anclado, ancho de columna controlado, sin CTAs comerciales intermedios ni animaciones. Cookies conecta con el panel real de preferencias. Sin cambios de texto legal sin revisión jurídica.

### 404
- H1 útil; acciones `Volver al inicio` y `Ver servicios`; conserva header/footer.

### Footer (detalle senior — la clienta pidió no dejar nada)
- Estructura en 4 zonas con **espaciado generoso**: (1) logo legible + tagline de una línea + datos legales de Cali (owner, NIT, dirección — **fuente única**, resolver `site.ts` vs `locations.ts`); (2) `Explorar` (los 5 + Inicio); (3) `Información` (Cuidados, Descargas, Contacto) + WhatsApp CO/EU + email; (4) `Legal` (aviso, privacidad, cookies) + preferencias de cookies.
- Social con iconos refinados, área táctil 44px, hover `primary` (ya existe). Línea de copyright discreta.
- No repetir el copy comercial del hero; una sola línea de marca. Jerarquía: títulos de columna 13–14px bold, enlaces `muted-foreground`→`primary-text` en hover/foco. Mantener contraste AA sobre `surface-muted`.
- Senior: alinear baseline, igualar interlineado entre columnas, y que en móvil colapse a una columna ordenada (Explorar → Información → Legal → datos), sin perder el aire.

### Banner de cookies
- Acción primaria `Aceptar analíticas`, secundarias `Rechazar`/`Configurar` con igual peso accesible; no precargar GA4 sin consentimiento (ya es el comportamiento). Foco inicial dentro del banner.

---

## QA integral (matriz, el más mínimo detalle)

**Responsive** (390, 430, 768, 1024, 1440, 1920): `scrollWidth === clientWidth` en TODAS las rutas; el mapa sin scroll horizontal; imágenes con `sizes` correcto; botones 44px; sin alturas fijas basadas en captura.

**Accesibilidad (WCAG 2.2 AA):** un H1 por página y jerarquía correcta; foco visible en todo interactivo; navegación completa por teclado (menú, mapa, selector idioma, lightbox, diálogos, chips); nombres accesibles y `aria-current`; contraste AA (texto y controles, también sobre rosa/ink); `prefers-reduced-motion` respetado; alt útil y específico; landmarks correctos (revisar el doble `header` del hero).

**SEO:** títulos y metadescripciones por página; un H1; canonical + `hreflang` (es/en/x-default); sitemap y robots con **dominio real** (depende de `NEXT_PUBLIC_SITE_URL` en Vercel — bug crítica de `05`); JSON-LD solo de datos confirmados; enlaces internos; `next/font`/`next/image`.

**Rendimiento (CWV móvil):** LCP del hero (imagen `priority`, tamaños correctos); CLS (dimensiones estables, fuentes con `swap`); JS cliente mínimo (motion en componentes pequeños); sin autoplay; objetivo Lighthouse móvil 95+ Perf, 100 SEO/A11y/BP cuando haya pantallas finales.

**i18n:** paridad ES/EN en cada cadena pública nueva; selector conserva la ruta equivalente; sin mezclar idiomas en la misma página; localización profesional (no literal) — el EN del H1 está **pendiente de aprobar**.

**Funcional/E2E:** selector de idioma, selector WhatsApp (CO/EU), filtrado por mercado, PDFs, mapa (ratón/teclado/tap), menú móvil, lightbox, back/forward. Scripts existentes: `test:e2e`, `test:a11y`, `test:seo`, `test:responsive:all`, `test:links`, `test:visual`.

**Higiene de repo/tooling:** `node_modules` completo (`npm install`); `lint`/`typecheck`/`build` en verde — hoy hay errores **preexistentes solo en `tests/`** (faltaban dev-deps) y el `eslint.config.mjs` importa `eslint-config-next/core-web-vitals` sin `.js` (revisar). No son del rediseño, pero conviene dejarlos limpios.

## Orden recomendado
Mantener el de `06` (Fase 0 config → 1 contenido → 2 header/home → 3 mapa → 4 servicios/puntos → 5 formaciones/resultados → 6 color/motion → 7 QA). Este `07` es la vara de medir senior para cada fase y el checklist final.
