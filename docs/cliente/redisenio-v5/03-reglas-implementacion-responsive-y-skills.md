# Rediseño V5 — reglas de implementación, responsive y uso de skills

## Decisión

Sí: con reglas de implementación más estrictas, el rediseño V5 es viable y puede alejarse de la apariencia genérica actual sin reescribir la arquitectura de datos, i18n, SEO ni WhatsApp. El riesgo no es técnico; es ejecutar cambios visuales sin cerrar el contenido, los assets y los límites de diseño.

La base actual ya aporta Next.js, datos tipados, rutas localizadas, componentes de movimiento, selector de WhatsApp, mapa accesible y preferencia de reducción de movimiento. Se debe evolucionar esa base, no reemplazarla por una plantilla o por una generación completa de IA.

## Evidencia responsive del despliegue actual

Se comprobó `https://servicios-cejas.vercel.app/es` en viewports de referencia. Los tamaños efectivos del navegador fueron 375, 753 y 1425 px.

| Viewport solicitado | Ancho efectivo observado | `scrollWidth` | Resultado |
|---:|---:|---:|---|
| 390 × 844 | 375 px | 375 px | Sin desbordamiento horizontal. Header compacto y menú móvil visible. |
| 768 × 1024 | 753 px | 753 px | Sin desbordamiento horizontal. La navegación continúa compacta visualmente. |
| 1440 × 1000 | 1425 px | 1425 px | Sin desbordamiento horizontal. Navegación de escritorio visible. |

Esto valida la base técnica, no el resultado V5. La interacción completa de menú, selector de mercado, mapa, idioma, WhatsApp y lightbox debe volver a probarse una vez exista el nuevo diseño.

## Reglas de implementación V5

### 1. Orden de trabajo

1. Cerrar decisiones de contenido y assets bloqueantes.
2. Actualizar datos estructurados, traducciones y rutas afectadas.
3. Cambiar layout y componentes reutilizables, empezando por header/home/mapa.
4. Adaptar plantillas interiores por familia de ruta, no una página aislada cada vez.
5. Verificar funcionalidad, accesibilidad, responsive y SEO antes de desplegar.

No empezar por animaciones, sombras o colores. Esos detalles solo se aplican cuando la jerarquía, el copy y las fotos sean correctos.

### 2. Fuente de verdad

- Precios, mercados, servicios, cursos, ubicaciones, PDFs, WhatsApp y traducciones permanecen en datos tipados; ningún componente visual los codifica directamente.
- El punto físico de España no se añade a contenido, schema, mapa, footer ni datos estructurados hasta que la clienta entregue información completa y autorizada.
- La disponibilidad no se modela ni publica como calendario en la V5. Si un texto vigente dice “jornada por disponibilidad”, se sustituye solo después de decidir el texto permanente de cada ciudad.
- Cada asset recibe destino explícito: `hero`, `punto físico Colombia`, `punto físico España`, `curso`, `resultado` o `servicio`. Un asset sin destino no entra al diseño.

### 3. Restricciones de interfaz

- No usar más de una superficie principal por sección. Una sección no puede contener una card grande con varias cards pequeñas salvo que exista una razón funcional clara.
- No usar gradientes de texto, orbes, blobs, brillos continuos, imágenes de stock, iconos sanitarios, contadores inventados ni testimonios no confirmados.
- No aplicar bordes, sombras, `hover:-translate-y` o fondos de color a todos los bloques por defecto.
- El rosa se usa para jerarquía y ritmo, no como sustituto de contenido: fondos de banda, regla, pin, estado activo y CTA definidos en la especificación.
- El CTA primario sigue siendo `Contacta conmigo` y conduce al selector WhatsApp existente. No crear formularios, reservas ni checkout.

### 4. Copy, localización y SEO

- Cada texto nuevo se aprueba primero en ES y se localiza profesionalmente a EN en el mismo cambio.
- Un H1 por página. El H1 de home queda bloqueado hasta recibir el texto final de la clienta.
- Los cambios de nombre público no cambian automáticamente la razón legal, el footer, JSON-LD ni metadatos; requieren confirmación separada.
- Si `Jornadas` pasa a presentarse como `Dónde me encuentras`, conservar URL y SEO hasta ejecutar una migración explícita con 301, canonical, sitemap y `hreflang`.

### 5. Movimiento

- Reutilizar `motion/react`, los tokens y `prefers-reduced-motion` existentes.
- No instalar Animate.css: añade peso y otra fuente de estilos sin aportar una capacidad necesaria.
- Solo animar transform y opacidad cuando el contenido ya sea visible en SSR; no ocultar información hasta que JavaScript cargue.
- Toda interacción de hover tiene equivalente con foco y tap.
- Ninguna animación automática infinita salvo un indicador de carga real y necesario.

## Especificación responsive V5

### Breakpoints de diseño y comportamiento

| Rango | Header | Hero | Mapa | Catálogos / puntos / cursos |
|---|---|---|---|---|
| 320–389 px | Menú móvil; logo nunca más ancho de 190 px; CTA dentro del panel. | Una columna; texto, CTA y foto sin miniaturas superpuestas. | Un pin activo y detalle debajo; lista de ubicaciones en acordeón o lista vertical. | Una columna; imágenes 4:5 o 3:4; botones a ancho natural salvo falta de espacio. |
| 390–767 px | Menú móvil; áreas táctiles de 44 px. | Una columna; banderas se envuelven sin reducir texto. | Mapa sin scroll horizontal; panel tras el mapa. | Una columna; el orden visual coincide con el DOM. |
| 768–1023 px | Menú móvil intencionado: cinco enlaces + idioma + CTA no caben con calidad en una barra. | Dos zonas flexibles, pero conservar orden de lectura de texto antes que imagen. | Mapa y panel pueden ir en dos filas; no dos columnas estrechas. | Dos columnas solo en listas, no para texto largo ni fichas de dirección. |
| 1024–1279 px | Mantener menú móvil o usar menú comprimido tras validación visual; no forzar siete enlaces. | Dos columnas 5/7 o 6/6. | Mapa y panel en dos columnas si ambos mantienen anchura útil. | Servicios alternos; puntos físicos en dos columnas si España está confirmado. |
| 1280–1919 px | Navegación de escritorio de cinco enlaces, idioma y CTA. | Rejilla editorial de 12 columnas. | Mapa amplio y panel lateral fijo en la sección. | Alternancia de imagen/texto; evitar tres cards idénticas. |
| ≥1920 px | Mismo layout que escritorio, con contenedor máximo. | Más espacio negativo, no texto o fotos gigantes. | Sin ampliar pines ni tipografía sin límite. | Limitar ancho de lectura y mantener densidad. |

### Reglas de composición responsiva

1. No usar `window.innerWidth` para decidir el layout. Usar CSS responsive, container queries cuando aporten valor y HTML semántico estable.
2. El orden del DOM debe ser coherente sin CSS: título → contexto → acción → imagen o detalle. No depender de `order` para invertir la comprensión del contenido en móvil.
3. No superponer la miniatura del hero en móvil ni tablet. La clienta ya rechazó esa miniatura; el rediseño no debe reintroducirla por decoración.
4. Los botones conservan altura mínima de 44 px. En móvil se apilan solo cuando no caben; no se vuelven automáticamente a ancho completo en todos los casos.
5. Las fotos usan ratio definido y `next/image` con `sizes` correcto. No cargar una imagen de escritorio sobredimensionada en móvil.
6. El mapa nunca genera scroll horizontal. Los pines tienen área táctil mínima 44 × 44 px y etiqueta accesible.
7. El contenido de un pin se actualiza sin depender de hover. Focus, click, tap y lector de pantalla llegan al mismo detalle.
8. El selector ES/EN, los modales WhatsApp, PDFs, lightbox y menú móvil se prueban con teclado y táctil.
9. `prefers-reduced-motion` quita parallax, cascadas y escalados; el mapa conserva su capacidad de selección.
10. Ningún bloque usa altura fija basada en la captura de diseño. El contenido real, los textos en inglés y una dirección larga deben poder crecer.

## Criterios de aceptación antes de desplegar

### Visuales

- La home se entiende sin hacer scroll: marca, profesional, especialidad, países y CTA.
- Cada sección tiene una razón visual distinta; no hay una secuencia de cards idénticas.
- La foto de cada servicio/curso/punto físico es correcta y aprobada.
- El rosa está presente en toda la experiencia sin dominar los textos ni bajar contraste.
- El logo es legible y no parece perdido.

### Funcionales

- `scrollWidth === clientWidth` en 390, 430, 768, 1024, 1440 y 1920 px para home y rutas críticas.
- Menú abre/cierra, trampa el foco y restaura el foco de origen en móvil.
- Selector de idioma conserva la ruta equivalente correcta.
- Todos los CTAs `Contacta conmigo` presentan el selector de canal correcto.
- El mapa selecciona cada pin con ratón, teclado y tap; el detalle y la lista reflejan el mismo estado.
- PDFs descargables, filtros de resultados y lightbox funcionan sin depender del hover.

### Calidad

- `lint`, `typecheck`, build y pruebas existentes en verde.
- Pruebas end-to-end de navegación, idioma, WhatsApp, mercado, mapa, descargas y menú móvil.
- Auditoría de accesibilidad: foco visible, orden de encabezados, contraste, nombres accesibles y reduced motion.
- Auditoría de SEO: títulos, metadescripciones, canonical, sitemap, `hreflang`, JSON-LD y enlaces internos.
- Revisar rendimiento móvil: LCP de hero, tamaños de imágenes, CLS, JavaScript cliente y fuentes.

## Skills: decisión de uso

| Skill disponible | ¿Usarla en V5? | Decisión |
|---|---|---|
| `browser:control-in-app-browser` | **Sí** | Es necesaria para inspección del despliegue, puntos responsive, pruebas del menú, mapa, WhatsApp, idiomas y verificación visual final. Se utilizó para comprobar la base responsive actual. |
| `imagegen` | **No por defecto** | La regla de proyecto exige fotografía real. Solo tendría sentido si la clienta pide expresamente una ilustración no fotográfica, un fondo abstracto o una pieza raster que no suplante un servicio o resultado real. |
| `documents:documents` | **No** | Los entregables son Markdown versionado, no documentos Word. Añadiría un flujo de render innecesario. |
| `presentations` | **No** | No hay una presentación solicitada. Puede usarse después si se necesita presentar el rediseño a la clienta en diapositivas. |
| `pdf:pdf` | **Solo si cambian PDFs** | Útil para inspeccionar o actualizar catálogos/formaciones, no para el rediseño de interfaz por sí solo. |
| `spreadsheets` | **No** | No hay una hoja de cálculo que analizar. |
| `openai-docs` | **No** | El proyecto no depende de un producto OpenAI ni requiere documentación de modelos. |
| `template-creator`, `skill-creator`, `plugin-creator`, `skill-installer` | **No** | Crear o instalar una habilidad no resuelve una necesidad de la V5 y ampliaría el alcance sin beneficio inmediato. |

## Recomendación operativa

Implementar por etapas, con un commit verificable por etapa:

1. Datos, copy y assets aprobados.
2. Header, navegación y home.
3. Ubicaciones y mapa.
4. Servicios y páginas de mercado/detalle.
5. Puntos físicos, formación, resultados y páginas restantes.
6. Localización, SEO, accesibilidad, responsive y regresión visual.

No iniciar la etapa 2 hasta cerrar los bloqueantes de cliente enumerados en el documento de auditoría V5.

