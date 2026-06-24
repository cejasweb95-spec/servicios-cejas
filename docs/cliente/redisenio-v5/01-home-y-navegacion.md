# Rediseño V5 — navegación y home, sección por sección

## Regla de copy

Este documento da el texto exacto cuando ya está confirmado o cuando se propone como borrador de UX. Los textos marcados **pendiente de cliente** no deben publicarse como definitivos. La web sigue siendo bilingüe: toda cadena pública aprobada en español requiere localización editorial en inglés, no traducción literal.

## Navegación global

### Arquitectura propuesta

La navegación actual tiene demasiados destinos de igual peso. La V5 concentra el menú en decisiones de cliente y deja recursos secundarios en el footer.

| Orden | Español visible | English visible | Destino / estado |
|---:|---|---|---|
| 1 | `Servicios` | `Services` | Índice de servicios. |
| 2 | `Dónde me encuentras` | `Where to find me` | Página de ubicaciones; puede conservar temporalmente la ruta `/jornadas` mientras se planifica la migración SEO. |
| 3 | `Formaciones` | `Training` | Índice de cursos y masterclass. |
| 4 | `Resultados` | `Results` | Galería real y resultados cicatrizados. |
| 5 | `Sobre Xiomara` | `About Xiomara` | Biografía, método y trayectoria. |
| CTA | `Contacta conmigo` | `Contact me` | Abre el selector de WhatsApp existente. |

`Cuidados`, `Descargas`, `Contacto` y enlaces legales siguen existiendo, pero dejan de competir en el menú principal. `Contacto` se alcanza desde el CTA persistente y el footer. No eliminar rutas ni crear redirecciones sin plan SEO.

### Header de escritorio

- Altura objetivo: 72–80 px; fondo blanco cálido con transparencia ligera al hacer scroll.
- Aumentar el ancho visual del logo oficial hasta que se lea claramente. No estirarlo ni sustituirlo por texto sin decisión escrita de la clienta.
- El menú ocupa una única línea con cinco enlaces. El activo se marca con una línea palo de rosa, no con una pastilla de color completa.
- El selector de idioma se presenta como `ES / EN`; el idioma activo tiene contraste y `aria-current`.
- El CTA conserva exactamente `Contacta conmigo` / `Contact me`.
- Las tres banderas no se duplican en la barra. Van en el hero, donde explican la presencia internacional.

### Header móvil

- Cabecera: logo legible a la izquierda; botón de menú de al menos 44 × 44 px a la derecha.
- El panel muestra exactamente los cinco enlaces anteriores, selector `ES / EN` y CTA `Contacta conmigo` al final.
- No cargar iconos decorativos en cada enlace. La navegación debe ser breve, clara y táctil.
- Al abrir, foco dentro del panel; al cerrar, vuelve al botón; respetar reducción de movimiento.

## Home: orden y especificación

La secuencia V5 respeta el orden pedido por la clienta: presentación → mapa → servicios → puntos físicos → cursos. Resultados, valoración y recursos se conservan después porque no hay instrucción de eliminarlos.

### 1. Apertura: identidad y presentación

**Propósito:** que la primera pantalla responda quién es Xiomara, qué hace y dónde tiene presencia.

| Elemento | Especificación |
|---|---|
| Sobrelinea | `Cejas Internacionales` / `Cejas Internacionales`. No añadir slogans genéricos. |
| H1 | **Pendiente de cliente.** Sustituirá el actual “Belleza especializada con sede en Cali y jornadas internacionales”. Dirección aprobada: título más corto y profesional alrededor de “Especialista en micropigmentación”. |
| Presentación | **Borrador para aprobación:** `Soy Xiomara Sánchez, especialista en micropigmentación y belleza especializada. Atiendo en Colombia y realizo servicios internacionales en España y Suiza.` La grafía `Xiomara Sánchez` debe validarse frente a `Xiomy Sanchez` del logo actual. |
| Banderas | Colombia, España y Suiza en una fila discreta bajo la presentación. Cada una tiene etiqueta de texto visible o accesible: `Colombia`, `España`, `Suiza`. |
| CTA principal | `Contacta conmigo` / `Contact me`; abre selector WhatsApp. |
| CTA secundario | `Ver servicios` / `View services`; enlaza a índice de servicios. |
| Imagen principal | Foto seleccionada por la clienta “de más abajo”, no la imagen actual hasta confirmar su archivo. Retrato vertical o 4:5, con rostro y mirada visibles en móvil. |
| Imagen secundaria | Eliminar la miniatura actual con la sombra/mancha negra. No reemplazarla por una foto arbitraria. |

**Composición:** escritorio en 12 columnas: texto 5, aire 1, imagen 6. La foto no es un rectángulo aislado; puede salir 24–40 px del fondo rosa empolvado. Móvil: texto primero, foto después y CTA antes de que termine la primera pantalla.

### 2. `Dónde me encuentras`

**Propósito:** reemplazar el mensaje de disponibilidad por presencia geográfica comprensible.

- Título exacto ES: `Dónde me encuentras`.
- Título EN: `Where to find me`.
- Copy ES propuesto: `Conoce los lugares donde puedes encontrarme y consulta la información de cada ubicación.`
- Copy EN propuesto: `Explore the places where you can find me and view the details for each location.`
- Eliminar del título, subtítulo y leyendas las fórmulas `Mapa de disponibilidad`, `Próxima jornada por disponibilidad` y `No hay una fecha fija`.
- Cada marcador será un pin de ubicación palo de rosa, no un círculo numerado. Al activarlo muestra al lado o debajo: ciudad, país, tipo de ubicación y, solo si existe y está aprobado, dirección.
- La lista bajo el mapa se mantiene como alternativa accesible, pero visualmente secundaria. No obligar al usuario a bajar para saber el nombre de un pin.
- No mostrar fecha, cupos o disponibilidad. El detalle puede incluir CTA `Consultar por WhatsApp` / `Ask on WhatsApp`.

**Datos aún bloqueados:** lista final de ciudades; confirmación de si Mallorca sustituye o complementa Madrid/Puerto de Sagunto; datos del futuro espacio de España.

### 3. `Servicios por país`

**Propósito:** llevar al catálogo correcto sin repetir una pantalla de selección separada.

- Título ES: `Servicios por país`.
- Título EN: `Services by country`.
- Copy ES: `Cada país tiene su propio catálogo, moneda y precios. Elige tu ubicación para ver los servicios que aplican allí.`
- Copy EN: `Each country has its own catalog, currency and prices. Choose your location to see the services available there.`
- Orden: `Colombia` (COP), `España / Europa` (EUR), `Suiza` (CHF).
- Cada mercado es una composición editorial con una fotografía real verificada, bandera, moneda, texto de una línea y CTA `Ver catálogo` / `View catalogue`.
- Sustituir los chips que enumeran tres servicios por una muestra visual o por uno o dos servicios realmente destacados. No mezclar una foto de labios, cejas o formación con un servicio distinto.
- No añadir disponibilidad de jornadas a las descripciones de España ni Suiza.

### 4. `Puntos físicos`

**Propósito:** separar una dirección real de la presencia internacional.

- Título ES: `Puntos físicos`.
- Título EN: `Physical locations`.
- Ficha Colombia: imagen del espacio elegida, `Cali, Colombia`, dirección legal confirmada y CTA de WhatsApp. Copy funcional: `Atención en punto físico` / `In-person appointments`.
- Ficha España: no publicar hasta recibir imagen, dirección, ciudad, texto y autorización. El layout debe aceptar una segunda ficha sin rediseño.
- No llamar a España `sede principal` ni modificar el footer legal hasta resolver ese cambio de negocio y de datos legales.

### 5. `Formaciones y masterclass`

**Propósito:** presentar los cursos inmediatamente después de los puntos físicos, como solicitó la clienta.

- Título ES: `Formaciones y masterclass`.
- Título EN: `Training and masterclasses`.
- Copy ES: `Programas profesionales con contenido, duración y materiales detallados en cada formación.`
- Copy EN: `Professional programmes with content, duration, and materials detailed in every training course.`
- Usar la fotografía que la clienta señaló en el vídeo tras identificar el archivo. No mostrar la foto actual por inercia.
- Mostrar las tres formaciones prioritarias en una secuencia horizontal editorial; no tres cards idénticas con borde, imagen, badge y botón.
- CTAs: `Ver formaciones` / `View training` y `Descargar PDF` / `Download PDF` solo cuando exista PDF confirmado.

### 6. `Resultados reales`

La clienta no pidió eliminar resultados. Debe ir después de formaciones para no romper el orden explícito de los bloques principales.

- Título ES: `Resultados reales`.
- Título EN: `Real results`.
- Mantener la aclaración sobre trabajos reales y resultados cicatrizados, sin promesas garantizadas.
- Usar una galería asimétrica y pocas imágenes grandes; no una pared de miniaturas sin jerarquía.
- Cada resultado enlaza a su detalle de manera accesible y tiene texto alternativo específico del tratamiento visible.

### 7. Valoración, descargas y CTA final

Estas secciones no fueron eliminadas por la clienta. Se compactan para que no compitan con presentación, mapa, servicios, puntos físicos y cursos.

- Valoración: bloque corto `¿No sabes qué servicio elegir?` / `Not sure which service is right for you?`; texto: `Envíame una foto por WhatsApp y te orientaré antes de reservar.` No repetir la explicación completa de reserva.
- Descargas: no usar una banda autónoma en la home. Integrar un enlace secundario dentro de cursos y catálogos.
- CTA final ES: `¿Hablamos sobre tu servicio o formación?`.
- CTA final EN: `Shall we talk about your service or training?`.
- CTA: `Contacta conmigo` / `Contact me`. Fondo negro tinta, tipografía clara y acento palo de rosa; sin gradientes.

### 8. Footer

- Conserva datos legales de Cali hasta que la información de España esté confirmada jurídicamente.
- Agrupa enlaces en `Explorar`, `Información` y `Legal`; colocar `Cuidados` y `Descargas` aquí.
- No repetir el texto comercial del hero. Una línea breve basta: `Micropigmentación, belleza especializada y formación profesional.`
- El logo vuelve a ser legible, pero no compite con la navegación legal.

## Móvil, tablet y escritorio

| Rango | Decisiones no negociables |
|---|---|
| 390–430 px | Hero legible antes de cualquier scroll largo; CTAs en columna si no caben; pines y detalle de mapa a ancho completo; no usar miniaturas superpuestas. |
| 768 px | Imagen y texto pueden convivir, pero el mapa no pierde los nombres de ubicaciones; catálogos en dos columnas solo si la foto sigue siendo clara. |
| 1024–1440 px | Hero editorial de dos columnas, bloques alternos y navegación de escritorio. No extender líneas de texto a todo el ancho. |
| 1920 px | Contenedor limitado; aumentar aire, no tamaños de letra desproporcionados ni tarjetas. |

