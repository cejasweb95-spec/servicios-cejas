# Frontend UI/UX — Cejas Internacionales

Última actualización: 17/06/2026.

Documento de diseño para la futura implementación frontend. No es código todavía; define experiencia, estructura visual, componentes, responsive, animaciones y criterios de calidad.

> Actualización: el detalle profesional ampliado de shadcn, Motion, reglas anti-IA y diseño página por página está en [frontend-ui-ux-v3-profesional.md](frontend-ui-ux-v3-profesional.md). Este documento queda como base general.

---

## 1. Dirección de diseño

### Escena de uso

Una clienta mira la web desde el móvil antes de escribir por WhatsApp. Quiere saber si el servicio aplica a su país, cuánto cuesta, cuánto tarda, si puede confiar en el resultado y cómo contactar. Una alumna potencial compara cursos, PDF, duración, precio y próxima fecha disponible.

### Personalidad visual

- Premium, precisa y cercana.
- Femenina sin exceso decorativo.
- Internacional sin confundir sede con jornadas.
- Clínica/profesional sin parecer fría.
- Catálogo claro, pero no tabla seca.

### Antipatrones

- No landing genérica de belleza.
- No cards repetidas sin jerarquía.
- No beige plano como base dominante.
- No hero con texto a un lado y tarjeta al otro.
- No tienda online, checkout, carrito ni formulario de reserva.
- No usar mapa de Google como centro visual de la home.

---

## 2. Sistema visual

### Color

Estrategia: base clara y limpia con momentos de palo de rosa fuerte, negro tinta y fotografía real. El palo de rosa debe sentirse como firma de marca, no como relleno constante.

La paleta visible de marca es:

- Palo de rosa.
- Blanco.
- Negro.

Los tonos derivados existen solo como sistema técnico para hover, bordes, fondos suaves, estados y gradientes.

| Token semántico | Valor base | Uso |
|---|---|---|
| `primary` | `#B76E79` | CTA, pins del mapa, estados activos, detalles |
| `primary-hover` | `#7F3F4A` | Hover, fondos profundos, texto destacado |
| `primary-soft` | `#E8C7CC` | Bandas suaves y fondos puntuales |
| `foreground` | `#1A1A1A` | Texto principal |
| `surface` | `#FFFFFF` | Fondo base |
| `soft-surface` | `#FBF8F7` | Fondo secundario muy controlado |
| `border` | `#E6D8DA` | Bordes suaves derivados del palo de rosa |
| `ring` | `#B76E79` | Focus visible |
| `logo-accent` | `#EE5164` | Solo asset del logo o microdetalle justificado |

Regla: cada pantalla debe tener contraste real entre fotografía, blanco, negro y palo de rosa. Si todo se ve rosado, está mal.

### Tokens editables

Sí es recomendable preparar la web para cambiar colores globales desde un único sitio. La forma correcta es usar tokens semánticos, no hexadecimales repartidos por componentes.

Ejemplo de intención técnica con Tailwind CSS v4:

```css
@import "tailwindcss";

@theme {
  --color-primary: #B76E79;
  --color-primary-hover: #7F3F4A;
  --color-primary-soft: #E8C7CC;
  --color-surface: #FFFFFF;
  --color-soft-surface: #FBF8F7;
  --color-foreground: #1A1A1A;
  --color-border: #E6D8DA;
  --color-ring: #B76E79;
}

:root {
  --gradient-brand-soft: linear-gradient(135deg, var(--color-primary-soft), var(--color-surface));
  --gradient-brand-deep: linear-gradient(135deg, var(--color-primary-hover), var(--color-primary));
  --shadow-soft: 0 10px 30px color-mix(in oklab, var(--color-primary) 16%, transparent);
}
```

Reglas:

- Los componentes usan `bg-primary`, `text-foreground`, `border-border`, `ring-ring` o variables semánticas.
- Los gradientes se definen como variables (`--gradient-brand-soft`, `--gradient-brand-deep`) y no se repiten a mano.
- Si cambia el color principal, se actualiza el token y se revisa contraste, no se cambian 40 clases a mano.
- No inventar tokens por sección salvo que el patrón se repita al menos dos veces.

### Tipografía

| Uso | Fuente | Comportamiento |
|---|---|---|
| H1/H2 principales | Marcellus | Titulares elegantes, aireados, sin exceso de mayúsculas |
| Cuerpo/UI | Manrope | Textos, precios, filtros, tabs, botones, tablas |
| Script | Solo logo | No añadir otra fuente manuscrita |

Escala recomendada:

- H1: `clamp(2.6rem, 7vw, 5.8rem)`.
- H2: `clamp(2rem, 4vw, 3.6rem)`.
- H3: `clamp(1.35rem, 2vw, 2rem)`.
- Body: `1rem` / `1.0625rem`.
- Longitud de lectura: máximo 65-75 caracteres.
- `text-wrap: balance` en H1/H2/H3.

### Logo

- Header claro: logo oficial o negro monocromo.
- Header oscuro/hero foto: logo blanco.
- Footer oscuro: logo blanco.
- No depender de SVG; usar PNG transparente optimizado.

---

## 3. Arquitectura de navegación

### Header desktop

Estructura:

- Logo izquierda.
- Navegación: Servicios, Resultados, Jornadas, Formaciones, Sobre Xiomara, Cuidados.
- CTA derecha: `Contacta conmigo`.

Comportamiento:

- Sobre hero: transparente con logo blanco si la foto es oscura.
- Al hacer scroll: fondo sólido blanco/blur muy leve, logo negro, CTA palo de rosa.
- Estado activo por ruta.

### Header móvil

- Logo izquierda.
- Botón menú con icono.
- CTA fijo inferior o botón flotante `Contacta conmigo`.
- Menú tipo drawer de pantalla completa, no dropdown pequeño.
- Dentro del drawer: accesos principales + WhatsApp Colombia/España.

### WhatsAppChooser

El CTA principal no debe mandar siempre al mismo número sin contexto.

Patrones posibles:

1. Si la usuaria está en mercado Colombia: botón directo a WhatsApp Colombia.
2. Si está en España/Europa/Suiza: botón directo a WhatsApp España.
3. Si está en home/contacto: selector con dos opciones:
   - Colombia
   - España / Europa / Suiza

Mensaje prellenado siempre contextual:

- Servicio: `Hola, quiero información sobre [servicio] en [mercado].`
- Curso: `Hola, quiero información sobre la formación [curso]. Me interesa saber fechas, cupos y modalidad.`
- Jornada: `Hola, quiero consultar disponibilidad para la próxima jornada en [ciudad].`
- Valoración: `Hola, quiero una valoración gratuita por foto.`

---

## 4. Home

Objetivo: explicar marca, confianza, mercados y contacto en menos de 10 segundos.

### Sección 1 — Hero

Visual:

- Imagen real de Xiomara como fondo o protagonista full-bleed.
- No meter hero en card.
- Texto sobre imagen con overlay controlado para legibilidad.
- Dejar visible una pista de la siguiente sección en desktop y móvil.

Contenido:

- H1: `Cejas Internacionales`
- Subheadline: micropigmentación, belleza y formación con sede en Cali y jornadas internacionales.
- CTA principal: `Contacta conmigo`.
- CTA secundario: `Ver servicios`.

Detalles UI:

- Logo blanco si el hero es oscuro.
- Sello pequeño: `Sede en Cali · Jornadas Colombia, España y Suiza`.
- No usar bloque de métricas genérico como decoración.

Motion:

- Entrada inicial: imagen con scale sutil, H1 con reveal vertical suave, CTA con delay corto.
- Respetar `prefers-reduced-motion`.

### Sección 2 — Selector de mercado

Objetivo: que nadie vea servicios que no aplican a su país.

UI:

- Tres segmentos grandes: Colombia, España/Europa, Suiza.
- Cada segmento muestra moneda, disponibilidad y WhatsApp recomendado.
- No usar cards idénticas de plantilla; usar una franja comparativa horizontal en desktop y stack táctil en móvil.

Acciones:

- `Ver servicios Colombia`
- `Ver servicios España`
- `Ver servicios Suiza`

### Sección 3 — Servicios destacados

Objetivo: enseñar lo principal sin saturar.

Mostrar 4-6 servicios:

- Micropigmentación de cejas.
- Microlips / labios.
- Línea de ojos.
- Pestañas / mirada.
- Uñas y peinados solo si se está mostrando Colombia.

Cada item:

- Foto real.
- Nombre.
- Mercado.
- Precio desde.
- Duración de cita.
- CTA.

### Sección 4 — Resultados reales

Objetivo: vender confianza visual.

UI:

- Mosaico editorial con fotos reales, no grid uniforme.
- Filtros suaves: cejas, labios, mirada, uñas.
- Lightbox accesible.
- Etiquetas discretas: `cicatrizado`, `labios`, `cejas`, si aplica.

### Sección 5 — Mapa internacional

Objetivo: posicionar trayectoria internacional y disponibilidad.

Visual:

- Mapa custom SVG/React, elegante, no Google Maps embebido.
- Fondo blanco/negro o palo de rosa profundo según composición.
- Pins diferenciados:
  - Sede física: Cali.
  - Jornadas por disponibilidad: Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto, Ginebra.

Interacción:

- Hover/click en pin abre panel lateral o bottom sheet.
- En móvil: lista accesible primero o debajo del mapa.
- CTA por ciudad.

Motion:

- Línea o arco muy sutil entre Cali y ciudades.
- Pins con micro-pulse lento solo una vez o muy contenido.

### Sección 6 — Sobre Xiomara

Objetivo: autoridad sin sonar a currículum largo.

UI:

- Foto profesional de Xiomara.
- Bio corta.
- Bloque de credenciales/formaciones.
- Cabina/certificados como apoyo visual.

Contenido clave:

- Más de 5 años.
- Cerca de 2.000 procedimientos.
- Especialista en micropigmentación.
- Formadora.
- Sede en Cali y jornadas internacionales.

### Sección 7 — Formaciones

Objetivo: captar alumnas y descargar PDFs.

UI:

- Dos grupos: cursos profesionales y masterclass.
- Card horizontal o lista rica, no grid repetitivo plano.
- Cada curso muestra: duración, modalidad, PDF, precio si aplica, CTA.
- Slot futuro de fecha:
  - `Próxima fecha por disponibilidad`
  - Cuando exista: fecha, ciudad, cupos, estado.

### Sección 8 — Cuidados y confianza

Objetivo: resolver objeciones confirmadas.

UI:

- Tabs: antes/después cejas, antes/después labios.
- Resumen visual de cuidados.
- CTA valoración por foto.

### Sección 9 — Contacto final

Objetivo: cierre claro.

UI:

- Dos botones WhatsApp.
- Email.
- Redes.
- Dirección legal de Cali.
- Enlace a Google Maps solo para Cali.

---

## 5. Servicios

### `/servicios`

Objetivo: índice claro por mercado.

UI:

- Hero compacto con selector de mercado.
- Tabs o segmented control: Colombia, España/Europa, Suiza.
- Filtro por categoría: cejas, labios, mirada, pestañas, depilación, uñas, peinados/maquillaje.
- Lista principal con comparativa.

Desktop:

- Tabla visual con columnas: servicio, categoría, precio, duración cita, duración resultado, mercado, CTA.

Móvil:

- Cards compactas con filas de datos.
- No tabla horizontal obligatoria salvo vista avanzada.

### `/servicios/[mercado]`

Objetivo: catálogo real del mercado sin mezclar disponibilidad.

Secciones:

1. Intro del mercado.
2. Servicios disponibles.
3. Descarga PDF del catálogo.
4. Nota de disponibilidad/jornadas.
5. CTA WhatsApp recomendado.

### `/servicios/[slug]`

Objetivo: ficha completa del servicio.

Layout:

- Hero de servicio con foto real.
- Resumen: precio, duración cita, duración resultado, mercado.
- Descripción transcrita del catálogo.
- Cómo se reserva.
- Cuidados relacionados si aplica.
- Resultados reales relacionados.
- Descargar catálogo.
- CTA contextual.

---

## 6. Formaciones

### `/formaciones`

Objetivo: vender autoridad formativa y capturar consultas.

UI:

- Hero con Xiomara/formación/certificados.
- Tabs: cursos profesionales, masterclass.
- Listado de cursos con:
  - nombre
  - duración
  - modalidad
  - precio por país/modalidad
  - PDF descargable
  - próxima fecha por disponibilidad
  - CTA WhatsApp

### `/formaciones/[slug]`

Layout:

1. Hero del curso.
2. Resumen rápido: duración, modalidad, certificado, kit, PDF.
3. Precio por mercado/modalidad.
4. Qué aprenderás.
5. Temario por módulos/días.
6. Qué incluye.
7. Próximas fechas/cupos.
8. PDF descargable.
9. CTA WhatsApp.

Nota: no publicar fechas, cupos, requisitos ni condiciones si no están confirmados.

---

## 7. Jornadas y mapa

### `/jornadas`

Objetivo: explicar sede vs jornadas sin confusión.

Estructura:

- Intro: sede física en Cali.
- Mapa custom.
- Lista de ubicaciones.
- Panel de disponibilidad.
- CTA por ciudad.

Ubicaciones:

| Ciudad | Tipo | CTA |
|---|---|---|
| Cali, Valle del Cauca | Sede física | WhatsApp Colombia |
| Restrepo, Valle del Cauca | Próxima jornada por disponibilidad | WhatsApp Colombia |
| Madrid | Próxima jornada por disponibilidad | WhatsApp España |
| Palma de Mallorca | Próxima jornada por disponibilidad | WhatsApp España |
| Puerto de Sagunto, Valencia | Próxima jornada por disponibilidad | WhatsApp España |
| Ginebra | Próxima jornada por disponibilidad | WhatsApp España |

Futuro:

- Fecha inicio.
- Fecha fin.
- Cupos.
- Estado: disponibilidad, abierta, completa, realizada, cancelada.

---

## 8. Resultados

### `/resultados`

Objetivo: galería con prueba social visual.

UI:

- Mosaico editorial, no grid rígido.
- Filtros por categoría.
- Lightbox con navegación teclado/swipe.
- Alt text útil.
- Si hay video, insertarlo como pieza destacada.

Riesgo:

- Las fotos vienen comprimidas; no ampliarlas demasiado.
- Recortar logos/interfaz de WhatsApp si aparecen.
- Priorizar fotos con mejor nitidez y encuadre.

---

## 9. Sobre Xiomara

### `/sobre-xiomara`

Objetivo: confianza profesional.

Secciones:

1. Hero retrato.
2. Bio.
3. Trayectoria.
4. Certificaciones/formaciones recibidas.
5. Cabina/certificados.
6. Enfoque técnico.
7. CTA.

Diseño:

- Más editorial/fotográfico.
- Menos tabla.
- Usar certificados como textura de confianza, no como listado infinito.

---

## 10. Contacto

### `/contacto`

Objetivo: no perder ninguna consulta.

UI:

- WhatsApp Colombia.
- WhatsApp España.
- Email.
- Redes.
- Dirección legal/física de Cali.
- Enlace Google Maps Cali.

No incluir:

- Formulario propio en V1.
- Calendario de reserva.
- Checkout.

---

## 11. Componentes clave

| Componente | Uso |
|---|---|
| `SiteHeader` | Navegación responsive, logo dinámico, CTA |
| `WhatsAppChooser` | Selector de contacto por país/contexto |
| `MarketSwitcher` | Colombia/España/Suiza |
| `ServiceList` | Lista/tabla de servicios por mercado |
| `ServiceCard` | Tarjeta compacta de servicio |
| `PriceDurationStrip` | Precio, duración cita, duración resultado |
| `EventMap` | Mapa custom de sede/jornadas |
| `EventSlot` | Próxima fecha/jornada por disponibilidad |
| `CourseCard` | Curso con PDF, duración, precio y CTA |
| `DownloadCard` | Catálogo o PDF descargable |
| `ResultMosaic` | Galería editorial |
| `CareTabs` | Cuidados por servicio |
| `StickyMobileCTA` | CTA fijo móvil |

### Arquitectura de componentes

La web debe construirse con componentes reutilizables. Si ya existe una tabla, botón, card, selector o bloque de precio, una página nueva debe reutilizarlo y pasarle datos/variantes, no copiar markup.

Componentes base obligatorios:

- `Button`
- `IconButton`
- `LinkButton`
- `Container`
- `Section`
- `PageHero`
- `Tabs`
- `SegmentedControl`
- `DataTable`
- `ResponsiveDataList`
- `ServiceCard`
- `CourseCard`
- `DownloadCard`
- `WhatsAppChooser`
- `EventMap`
- `ResultMosaic`

Reglas de composición:

- Usar variantes explícitas: `variant="primary" | "secondary" | "outline" | "ghost" | "link"`.
- Usar tamaños explícitos: `size="sm" | "md" | "lg" | "icon"`.
- Evitar props booleanas tipo `isPrimary`, `isBig`, `hasBorder`, `isCardButton`.
- Si un patrón tiene piezas internas, usar composición: `Card.Header`, `Card.Body`, `Card.Footer`, `Table.Toolbar`, `Table.Empty`, etc.
- Los componentes visuales no deben traer datos propios; reciben datos desde la capa `getServicesByMarket`, `getCourses`, etc.

### Regla de botones y anchos

Esto es obligatorio para evitar apariencia genérica/IA:

- Un botón **no debe ocupar todo el ancho de una tarjeta o sección por defecto**.
- El botón base debe ser `inline-flex` y `width: fit-content` / ancho automático.
- Solo usar `w-full` cuando:
  - es una barra CTA móvil fija,
  - es un botón dentro de un formulario móvil,
  - hay dos botones apilados en móvil por falta real de espacio,
  - el diseño lo justifica explícitamente.
- Patrón recomendado: `w-full sm:w-auto` solo en móvil cuando mejore el toque.
- En cards de servicio/curso, el CTA debe alinearse con el contenido y conservar ancho natural.
- No estirar botones para “llenar” tarjetas.

Ejemplo de intención:

```tsx
<Button variant="primary" size="md">
  Contacta conmigo
</Button>

<Button variant="primary" size="md" className="w-full sm:w-auto">
  Consultar por WhatsApp
</Button>
```

El segundo caso solo aplica cuando móvil necesita el ancho completo. En desktop vuelve a ancho automático.

---

## 12. Responsive

### Móvil

- Prioridad: CTA WhatsApp siempre accesible.
- Header simple + drawer.
- Servicios como cards compactas.
- Mapa acompañado por lista textual.
- Botones mínimo 44x44 px.
- Evitar tablas anchas salvo scroll controlado.

### Tablet

- Dos columnas para servicios destacados.
- Mosaico de resultados con 2-3 columnas.
- Mapa y lista en layout partido.

### Desktop

- Hero full-bleed.
- Comparativas más densas.
- Mapa con panel lateral.
- Servicios en tabla/lista rica.

### Wide desktop

- Limitar ancho de lectura.
- No estirar tarjetas hasta parecer vacías.
- Usar fotografía y mapa como composición, no solo contenedores centrados.

---

## 13. Animaciones

Usar Motion/Framer Motion de forma contenida:

- Hero: entrada principal.
- Header: cambio al hacer scroll.
- Tabs/segmentos: transición suave.
- Mapa: pins y panel de ciudad.
- Galería: lightbox.
- Cards: hover/focus leve, sin saltos.

Reglas:

- Nada de animar todo igual al hacer scroll.
- Nada de bounce/elastic.
- No ocultar contenido hasta que cargue una animación.
- Soporte `prefers-reduced-motion`.

---

## 14. Accesibilidad y QA

Obligatorio:

- Contraste WCAG AA.
- Navegación por teclado.
- Estados `focus-visible`.
- Labels reales en botones de icono.
- Alt text para imágenes.
- Mapa con alternativa textual.
- Formularios no aplican en V1.
- PDFs con nombre claro.
- No depender solo del color para indicar mercado/estado.

QA visual:

- 390px móvil.
- 768px tablet.
- 1024px laptop.
- 1440px desktop.
- 1920px wide.

---

## 15. Preparación para Supabase

Aunque V1 use datos locales, la UI debe consumir datos como si vinieran de Supabase:

- `getMarkets()`
- `getServicesByMarket(market)`
- `getServiceBySlug(slug)`
- `getCourses()`
- `getCourseBySlug(slug)`
- `getEvents()`
- `getDownloads()`
- `getWhatsappTarget(context)`

Así, cuando llegue Supabase, se cambia la capa de datos y no los componentes.

---

## 16. Prioridad de implementación

1. Crear app Next limpia.
2. Sistema visual: tokens, fuentes, layout base, header/footer.
3. Copiar assets públicos y PDFs.
4. Crear data layer local tipada.
5. Home.
6. Servicios por mercado.
7. WhatsAppChooser.
8. Jornadas/mapa.
9. Formaciones + descargas.
10. Resultados.
11. Sobre Xiomara.
12. Contacto.
13. Cuidados.
14. QA responsive/accesibilidad/performance.
