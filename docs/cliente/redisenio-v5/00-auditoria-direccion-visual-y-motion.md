# Rediseño V5 — auditoría, dirección visual y movimiento

## Estado y alcance

Documento de especificación. Se elaboró tras revisar:

- La home desplegada en `https://servicios-cejas.vercel.app/es` el 23/06/2026.
- Las transcripciones y referencias reunidas en [mejoras-home-2026-06-23.md](../audio-transcripciones/mejoras-home-2026-06-23.md) y [analisis-mejoras-home-2026-06-23.md](../analisis-mejoras-home-2026-06-23.md).
- `animate.style` y `motion.so`.
- Las referencias visuales de catálogo, home y moda que aportó el usuario.

No se ha modificado código, contenido publicado ni assets. La especificación solo debe ejecutarse cuando estén cerrados los datos marcados como pendientes.

## Diagnóstico directo del sitio actual

La web actual funciona y contiene información estructurada, pero transmite una composición generada porque repite una misma receta visual: título grande, párrafo, borde, fondo claro, tarjeta y CTA. El problema no es que haya IA; es que la dirección de arte no toma suficientes decisiones específicas de la marca y de la profesional.

| Hallazgo actual | Efecto visual | Corrección V5 |
|---|---|---|
| La home abre con un título corporativo largo y una foto, pero no con una presentación de Xiomara. | La marca parece una plataforma de servicios, no una especialista reconocible. | Abrir con identidad, retrato elegido y una biografía breve antes de catálogo o mercados. |
| El logo queda pequeño respecto a la superficie del hero. | No consolida la marca ni aprovecha el asset oficial. | Aumentar su presencia sin deformarlo; solo usar un wordmark alternativo si la clienta lo aprueba. |
| Hay once bloques consecutivos con jerarquía muy parecida. | La página se percibe extensa, plana y poco curada. | Dar una misión distinta a cada sección, alternar composiciones y reducir la promoción repetida. |
| “Jornadas por disponibilidad” aparece en selector, destacados y mapa. | Contradice el nuevo criterio: la disponibilidad se comunica en redes sociales. | El mapa pasa a `Dónde me encuentras`; los catálogos describen mercado, no disponibilidad. |
| El mapa numera los pines y separa su detalle en una lista extensa. | La interacción parece técnica y obliga a leer lejos del lugar clicado. | Pines tipo ubicación, detalle inmediato y lista accesible secundaria. |
| Algunas fotos no representan el servicio que acompañan. | Reduce confianza, incluso cuando las imágenes son reales. | Auditoría asset → servicio antes de componer las páginas. |
| Navegación de escritorio con siete enlaces. | El usuario recibe demasiadas decisiones y el header queda comprimido. | Cinco enlaces prioritarios; cuidados y descargas pasan al footer o a contexto específico. |
| Bordes, esquinas redondeadas y pequeñas tarjetas se aplican casi a todo. | Se acerca a una plantilla genérica de UI. | Usar superficies con intención: editorial, ficha funcional, ficha de datos o CTA; no una card para cada idea. |

## Principio creativo

La referencia adecuada no es una clínica dental ni una tienda de moda: es su **jerarquía**. Una profesional con experiencia se presenta primero; después demuestra dónde trabaja, qué ofrece, dónde atiende y cómo se forma. Cada bloque usa fotografía real, una sola idea fuerte y suficiente espacio para respirar.

El resultado debe ser elegante y editorial, no decorativo:

- La profesional y su trabajo son el centro, no iconos genéricos ni mosaicos de tarjetas.
- Palo de rosa, negro y blanco organizan la página; el rosa no se limita a botones.
- Las banderas explican alcance internacional, pero siempre van acompañadas de texto.
- El contenido comercial se organiza por mercado; la disponibilidad queda en redes o WhatsApp.
- Ninguna estadística, valoración, promesa médica, icono de salud o testimonio se inventa para “rellenar” la composición.

## Sistema visual obligatorio

| Token / decisión | Uso V5 |
|---|---|
| Palo de rosa `#B76E79` | Acciones principales, rule-lines, pines, indicadores de sección, fondos de bandas suaves y estado activo. |
| Palo de rosa profundo `#7F3F4A` | Hover, texto de alto contraste sobre rosa claro, CTA oscuro de marca. |
| Rosa empolvado `#E8C7CC` | Fondos de sección y paneles editoriales; nunca como texto pequeño. |
| Negro tinta `#1A1A1A` | Titulares, navegación, fondos de CTA final y contraste. |
| Blanco cálido `#FBF8F7` | Base de lectura y espacio negativo; no blanco puro en todas las secciones. |
| Marcellus | H1, H2, nombre de sección y cifras confirmadas. No usar para texto largo. |
| Manrope | Navegación, cuerpo, precios, formularios inexistentes, etiquetas y controles. |
| Fotografía | Solo material real de Xiomara, resultados, formación o espacios. Cada foto debe tener propósito y relación con su texto. |
| Borde / radio | Borde fino y radio sobrio solo donde se delimita una unidad interactiva o una foto. Las secciones no se encierran como tarjetas. |

## Referencias: qué tomar y qué descartar

### De `animate.style`

Animate.css ofrece animaciones CSS listas para usar: entradas, salidas, atención, rotaciones, zoom y desplazamientos. Es útil como catálogo de nombres y de límites, pero **no debe instalarse** en este proyecto: ya existen `motion`, `tw-animate-css`, tokens de movimiento y soporte de reducción de movimiento.

Usos que encajan conceptualmente:

- `fadeInUp` / `fadeIn`: revelado sobrio de contenido editorial.
- `slideIn*`: solo para paneles, menú móvil y cambios de contexto.
- `pulse`: solo para feedback breve de un botón o pin seleccionado, nunca repetido en automático.

Usos que se descartan:

- `bounce`, `rubberBand`, `tada`, `wobble`, `jello`, `heartBeat`, giros y entradas “back”. Restan seriedad, distraen de los servicios y se sienten de plantilla.

### De `motion.so`

`motion.so` es un producto de creación de vídeo con IA, no la librería `motion/react` que ya usa el proyecto. No se debe integrar como dependencia ni usar para generar una página. La referencia útil es su dirección de movimiento: una jerarquía clara, ritmo por secciones, tipografía con presencia y animaciones que revelan una historia en lugar de mover todo a la vez.

El proyecto ya incluye `motion@12`. Es suficiente para la V5 y evita añadir peso, duplicidad y estilos contradictorios.

## Especificación de movimiento

La animación debe aumentar la percepción de calidad sin convertirse en el tema del sitio. Todo el contenido debe existir y poder leerse sin JavaScript. `prefers-reduced-motion` desactiva desplazamientos, parallax y entradas no esenciales.

| Contexto | Movimiento | Duración / curva | Límite |
|---|---|---|---|
| Carga del hero | Retrato: escala de 1.015 a 1; texto: desplazamiento vertical máximo de 16 px. | 420–520 ms, `[0.22, 1, 0.36, 1]`. | Una vez por carga; sin opacidad inicial que oculte texto sin JS. |
| Cambio de enlace activo en menú | Línea de 2 px se desplaza entre opciones. | 180–240 ms. | Ya existe; mantenerlo. |
| Entrada de sección | Título y contenido suben 12–16 px como máximo; una sola secuencia. | 280–360 ms. | Una vez al entrar; nada de cascadas largas. |
| Foto editorial | Escala de 1.00 a 1.02 en hover/focus; sin parallax en móvil. | 300–450 ms. | Solo si la imagen es un enlace o tiene interacción. |
| Pin del mapa | El pin seleccionado cambia de color/tamaño de forma discreta y el panel de detalle se desvanece. | 180–220 ms. | Sin pulso infinito; el estado seleccionado también se expresa con texto. |
| Selector de mercado | Indicador de selección y contenido asociado, no la tarjeta completa saltando. | 180–220 ms. | Debe ser navegable con teclado. |
| Menú móvil / modal WhatsApp | Overlay funde; panel entra desde lateral o inferior. | 200–260 ms. | Mantener la implementación accesible existente. |
| CTA | Cambio de color, sombra y elevación máxima de 1 px. | 160–180 ms. | Sin rebote, brillo continuo ni escalado agresivo. |

## Puntos de control antes de implementar

1. H1 definitivo en español de la clienta y adaptación profesional en inglés.
2. Decisión sobre el logo: PNG oficial ampliado o nuevo tratamiento tipográfico aprobado.
3. Identificación de todas las fotografías que el audio señala para hero, cursos, puntos físicos, recorte y sustitución.
4. Datos completos y autorización de publicación del punto físico de España. Hasta entonces Cali sigue siendo la única sede física/legal publicada.
5. Lista final de pines y texto de cada ubicación.
6. Revisión de que ningún copy de V5 afirme disponibilidad, sedes, resultados o estadísticas no confirmadas.

