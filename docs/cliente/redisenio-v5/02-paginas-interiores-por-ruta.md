# Rediseño V5 — páginas interiores, rutas y plantillas

## Cómo leer este documento

Cada ruta pública existente queda cubierta por su página o por la plantilla dinámica que la genera. Las rutas en español e inglés comparten composición, accesibilidad y datos; cambian exclusivamente la URL, el copy localizado y los metadatos. Las rutas equivalentes no se rediseñan como páginas distintas.

No se deben retirar rutas existentes sin auditoría de enlaces, sitemap, `hreflang`, canonicals y redirecciones 301.

## Inventario de rutas y decisión V5

| Familia | Rutas ES / EN | Estado V5 |
|---|---|---|
| Inicio | `/es`, `/en` | Rediseño completo en [01-home-y-navegacion.md](01-home-y-navegacion.md). |
| Índice de servicios | `/servicios`, `/services` | Nuevo landing editorial de catálogos. |
| Mercado | `/servicios/[market]`, `/services/[market]` | Una plantilla para Colombia, España/Europa y Suiza. |
| Detalle de servicio | `/servicios/[market]/[service]`, `/services/[market]/[service]` | Una plantilla para todos los servicios existentes. |
| Ubicaciones | `/jornadas`, `/appointments-by-city` | Cambiar etiqueta pública a `Dónde me encuentras` / `Where to find me`; preservar ruta temporalmente. |
| Resultados | `/resultados`, `/results` | Galería editorial con filtros y detalle. |
| Sobre Xiomara | `/sobre-xiomara`, `/about-xiomara` | Perfil profesional, no una segunda home. |
| Índice de formación | `/formaciones`, `/professional-training` | Catálogo de programas con jerarquía por tipo. |
| Detalle de curso | `/formaciones/[course]`, `/professional-training/[course]` | Una plantilla para las cinco formaciones existentes. |
| Cuidados | `/cuidados`, `/aftercare` | Guías por tratamiento, enfocadas en lectura y acción. |
| Contacto | `/contacto`, `/contact` | Página de canales y puntos físicos; no formulario de reserva. |
| Descargas | `/descargas`, `/downloads` | Biblioteca funcional de catálogos y PDFs. |
| Aviso legal | `/aviso-legal`, `/legal-notice` | Lectura legal sobria, sin cambios de contenido sin revisión legal. |
| Privacidad | `/privacidad`, `/privacy` | Lectura legal sobria, sin cambios de contenido sin revisión legal. |
| Cookies | `/cookies`, `/cookies` | Lectura legal sobria y preferencias reales. |
| 404 | Cualquier ruta no encontrada | Mensaje útil con vuelta a inicio y servicios. |

## 1. Índice de servicios

**Rutas:** `/es/servicios`, `/en/services`.

### Objetivo

Ser la puerta de entrada a los tres catálogos; no repetir la home con el mismo hero genérico.

### Composición

1. Breadcrumb discreto: `Inicio / Servicios` / `Home / Services`.
2. H1 ES: `Servicios por país`. H1 EN: `Services by country`.
3. Introducción ES: `Cada país tiene su propio catálogo, moneda y precios. Elige tu ubicación para ver los servicios que aplican allí.` EN: `Each country has its own catalog, currency and prices. Choose your location to see the services available there.`
4. Selector editorial de mercados: Colombia, España / Europa, Suiza; bandera, moneda, foto real y CTA `Ver catálogo` / `View catalogue`.
5. Módulo de ayuda compacto: `¿No sabes qué catálogo consultar?` / `Not sure which catalogue to view?`; CTA de WhatsApp.
6. Footer.

### Qué se elimina visualmente

- Hero de página interior con la misma fórmula en todas las rutas.
- Cards de igual tamaño con sombra y fotografía no relacionada.
- Texto de disponibilidad en los mercados internacionales.

## 2. Catálogo por mercado

**Rutas dinámicas:** Colombia, España / Europa y Suiza en ambos idiomas.

### Encabezado de plantilla

- Breadcrumb: `Servicios / [Mercado]` / `Services / [Market]`.
- H1: `[Mercado] · [Moneda]`, por ejemplo `Colombia · COP`.
- Línea de contexto ES: `Catálogo disponible para [Mercado].` EN: `Catalogue available in [Market].`
- Bandera y moneda son información complementaria; no sustituyen el H1 ni dependen solo de color.
- Imagen editorial específica del mercado solo si representa su contexto; si no, usar una imagen de servicio real y neutra.

### Cuerpo de plantilla

1. Navegación de categorías por ancla o pestañas, accesible y sin ocultar contenido indexable.
2. Lista de servicios en formato editorial: nombre, duración, precio, resumen y enlace. No una pared de cards iguales.
3. La foto, si existe, aparece al inicio de una categoría o en una fila alterna, no duplicada para todos los ítems.
4. CTA final: `Consulta este catálogo por WhatsApp` / `Ask about this catalogue on WhatsApp`.
5. Enlace a cuidados relevantes; no duplicar condiciones ni datos legales en cada ítem.

### Regla de datos

Cada servicio se muestra solo en el mercado donde está confirmado. No inferir un precio en EUR o CHF a partir de COP, ni publicar servicios excluidos de Suiza.

## 3. Detalle de servicio

**Rutas dinámicas:** todos los servicios de cada mercado, en ES y EN.

### Orden de información

1. Breadcrumb: `Servicios / [Mercado] / [Servicio]`.
2. H1 con el nombre real del servicio.
3. Foto de resultado o procedimiento que corresponda de forma inequívoca al servicio; si no existe, no reutilizar una foto engañosa.
4. Bloque de decisión inmediato: mercado, precio, duración y CTA `Contacta conmigo` / `Contact me`.
5. `En qué consiste` / `What it involves`: explicación confirmada, sin promesas médicas ni resultados garantizados.
6. `Cuidados` / `Aftercare`: resumen y enlace a la guía pertinente.
7. `Servicios relacionados` / `Related services`: máximo tres, por afinidad real y dentro del mismo mercado.
8. CTA final a WhatsApp.

### Dirección visual

- Una foto principal grande, texto a dos columnas en escritorio y ficha de precio limpia; evitar la sensación de landing automática con cuatro paneles idénticos.
- La ficha de datos puede llevar fondo rosa empolvado. No usar contador, badge de “más vendido”, reviews ni porcentaje de satisfacción no confirmados.

## 4. `Dónde me encuentras`

**Rutas actuales:** `/es/jornadas`, `/en/appointments-by-city`.

### Cambio de nombre visible

- H1 ES: `Dónde me encuentras`.
- H1 EN: `Where to find me`.
- Navegación: usar esas mismas etiquetas, aunque la URL se conserve en la primera entrega V5.
- A futuro, si se aprueba `/ubicaciones` y `/locations`, diseñar migración con redirecciones 301 y `hreflang`; no crear la URL de forma aislada.

### Secciones

1. Introducción breve sin disponibilidad: `Conoce los lugares en los que puedes encontrarme.` / `Explore the places where you can find me.`
2. Mapa de ancho editorial con pines de ubicación y panel inmediato de detalle.
3. `Puntos físicos`: Cali confirmada; España solo al recibir datos. Cada punto con foto, ciudad, dirección y CTA.
4. `Otras ciudades`: solo si la clienta confirma que deben seguir mostrándose. No llamarlas sedes, no publicar fechas ni cupos.
5. CTA: `Consultar por WhatsApp` / `Ask on WhatsApp`.

### Cambio funcional del mapa

- Sustituir pines `1`–`6` por iconos de marcador.
- Click, tap, teclado o foco cambian el panel sin desplazar la página.
- El panel tiene título de ciudad y país; dirección solo si es pública; estado solo si está confirmado y no equivale a disponibilidad dinámica.
- La lista de ubicaciones queda debajo como alternativa navegable por teclado y lector de pantalla.

## 5. Resultados

**Rutas:** `/es/resultados`, `/en/results`.

### Estructura

1. H1 ES: `Resultados reales`. EN: `Real results`.
2. Copy ES: `Trabajos reales de cejas, labios y mirada, incluidos resultados cicatrizados.` EN: `Real brow, lip, and eye work, including healed results.`
3. Filtros visibles por tratamiento; si no hay contenido suficiente en una categoría, no mostrar el filtro.
4. Mosaico editorial asimétrico: dos imágenes grandes como anclas y detalles menores alrededor. No cuadrícula uniforme de stock.
5. Lightbox existente, con nombre de servicio, descripción breve y navegación por teclado.
6. CTA a servicios relacionados o a WhatsApp.

### Prohibiciones

- No prometer resultados, no antes/después manipulados, no hashtags genéricos, no badges inventados.
- No mostrar imágenes con encuadres confusos, sombras/manchas indicadas por la clienta o servicios no coincidentes.

## 6. Sobre Xiomara

**Rutas:** `/es/sobre-xiomara`, `/en/about-xiomara`.

### Estructura

1. H1 ES: `Sobre Xiomara`. EN: `About Xiomara`.
2. Retrato seleccionado de la clienta, no el hero descartado.
3. Titular profesional **pendiente de H1/título final**; no inventar años de experiencia.
4. Biografía aprobada, dividida en dos párrafos cortos: especialidad y forma de trabajar/enseñar.
5. Bloque `Servicios, formación y presencia internacional` / `Services, training, and international presence`, con enlaces a las tres áreas.
6. CTA `Contacta conmigo` / `Contact me`.

La página profundiza en la presentación de home; no repite mapa, catálogos ni galería entera.

## 7. Índice de formaciones

**Rutas:** `/es/formaciones`, `/en/professional-training`.

### Estructura

1. H1 ES: `Formaciones y masterclass`. EN: `Training and masterclasses`.
2. Introducción exacta aprobada para formación, sin afirmar próximas fechas si no hay dato.
3. Separación editorial por `Cursos profesionales` / `Professional courses` y `Masterclass` / `Masterclasses`.
4. Cada programa: foto verificada, duración, certificación si consta en fuente, resumen breve y CTA `Ver programa` / `View programme`.
5. Banda final: `¿Quieres conocer la próxima edición?` / `Want to learn about the next edition?`; WhatsApp, no reserva web.

### Dirección visual

Una gran foto de formación y un listado escalonado superan a cinco cards clonadas. El material, la docente y el aprendizaje deben ser visibles, no sustituidos por iconos académicos genéricos.

## 8. Detalle de formación

**Rutas dinámicas:** cada curso/masterclass existente en ambos idiomas.

### Plantilla

1. Breadcrumb: `Formaciones / [Programa]`.
2. H1 con nombre de curso verificado.
3. Hero con foto correspondiente, duración y certificación confirmada.
4. `Qué aprenderás` / `What you will learn`: módulos en lista semántica, sin acordeón si la lista es corta.
5. `Qué incluye` / `What is included`: kit, modelo, acompañamiento u otros datos exactamente confirmados.
6. `Modalidades y precio` / `Formats and pricing`: tabla simple por mercado y modalidad; no ocultar condiciones relevantes en tooltips.
7. Botón `Descargar PDF` / `Download PDF` si el archivo existe.
8. CTA `Consultar esta formación` / `Ask about this training`.

## 9. Cuidados

**Rutas:** `/es/cuidados`, `/en/aftercare`.

### Estructura

1. H1 ES: `Cuidados después de tu servicio`. EN: `Aftercare for your service`.
2. Introducción que aclara que la guía no sustituye una evaluación profesional o médica cuando corresponda.
3. Selector por tratamiento, accesible y con URL/ancla compartible si es posible.
4. Pasos antes, durante y después en listas numeradas; no en cards de iconos.
5. CTA WhatsApp para dudas específicas.

No se alteran indicaciones clínicas o de cuidados sin una fuente confirmada.

## 10. Contacto

**Rutas:** `/es/contacto`, `/en/contact`.

### Estructura

1. H1 ES: `Hablemos de tu servicio o formación`. EN: `Let’s talk about your service or training`.
2. Explicación exacta ES: `Las citas y reservas se gestionan únicamente por WhatsApp.` EN: `Appointments and bookings are managed exclusively through WhatsApp.`
3. Dos acciones claras: `WhatsApp Colombia` y `WhatsApp España / Europa / Suiza`, con número visible y texto de contexto.
4. Correo y redes sociales como canales secundarios, no como cards gigantes.
5. Bloque de Cali con dirección confirmada y mapa embebido solo si es funcional y no degrada rendimiento.
6. Punto físico español solo cuando exista información confirmada.

No añadir formulario de reserva, checkout ni calendario.

## 11. Descargas

**Rutas:** `/es/descargas`, `/en/downloads`.

### Estructura

1. H1 ES: `Catálogos y material oficial`. EN: `Official catalogues and materials`.
2. Agrupación `Catálogos de servicios` / `Service catalogues` y `Formaciones` / `Training`.
3. Cada descarga muestra nombre, mercado o tipo, formato, tamaño si se conoce y CTA `Descargar PDF` / `Download PDF`.
4. Enlace contextual a servicios o formación; no duplicar todo el contenido de cada PDF en una card.

Es una biblioteca de recursos; no debe parecer el centro comercial de la web ni estar en el menú principal.

## 12. Páginas legales

**Rutas:** aviso legal, privacidad y cookies en ambos idiomas.

- Mantener H1 y texto legal vigente hasta revisión jurídica.
- Aplicar tipografía de lectura, índice anclado y ancho de columna controlado.
- Sin animaciones de revelado, CTAs comerciales intermedios ni fotos de relleno.
- La página de cookies conecta con el panel real de preferencias; no cambia consentimiento por diseño.

## 13. 404

- H1 ES: `Esta página no existe o ha cambiado de lugar.`
- H1 EN: `This page does not exist or has moved.`
- Acciones: `Volver al inicio` / `Back home` y `Ver servicios` / `View services`.
- Mantener el header y footer nuevos; no dejar una pantalla técnica vacía.

## Reglas comunes a todas las rutas

1. Un solo H1 por página; jerarquía H2/H3 semántica.
2. Todo copy público se entrega en ES y EN, con metadatos y `hreflang` actualizados.
3. El CTA principal siempre usa el selector de WhatsApp; no crear un flujo de reserva distinto.
4. Foto real antes que icono decorativo; asset incorrecto es peor que ninguna foto.
5. Solo cuatro tipos de superficie: página editorial, ficha de datos, control interactivo y CTA. No crear cards para cada párrafo.
6. Movimiento opcional, contenido visible sin JavaScript y reducción de movimiento respetada.
7. Mantener contraste WCAG 2.2 AA, foco visible, tamaños táctiles mínimos y navegación por teclado.
8. Antes de desplegar: revisar 390, 430, 768, 1024, 1440 y 1920 px; comprobar menú, selector de idioma, WhatsApp, mapas, PDFs, filtros, lightbox y enlaces.

