# Revisión en video — Cambios sugeridos (21 jun 2026)

**Fuente:** `WhatsApp Video 2026-06-21 at 19.22.23.mp4`  
**Entorno revisado:** `servicios-cejas.vercel.app` en iPad (vista móvil/tablet vertical)  
**Duración del video:** ~4:57  
**Estado de este documento:** solo análisis; **no implica que nada esté implementado aún**

> **Cómo usarlo:** pregunta por el ID (ej. «¿está hecho el #07?») y marcaremos el estado.  
> **Nota:** el video no tenía subtítulos; los ítems se infieren del recorrido visual, del lápiz señalando zonas concretas y de bugs evidentes en pantalla. Donde la intención exacta no es 100 % clara, está marcado como *inferido*.

---

## Resumen ejecutivo

| Prioridad | Cantidad | Tipo principal |
|-----------|----------|----------------|
| 🔴 Crítica | 3 | Bug visual (texto fantasma / duplicado) |
| 🟠 Alta | 12 | Layout móvil, mapa, selector de mercado, secciones clave |
| 🟡 Media | 10 | Copy, espaciado, imágenes, detalle de cursos/descargas |
| 🟢 Baja | 5 | Pulido visual y consistencia de textos |

**Hallazgo transversal más grave:** en varias secciones el texto aparece **duplicado / con efecto fantasma** (misma frase renderizada dos veces con ligero desplazamiento). Aparece en página de España, bloque CTA oscuro, «Resultados reales», «Xiomara» y «Formaciones».

---

## Checklist de cambios sugeridos

### A. Bugs críticos (visual / render)

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **A01** | ⬜ Pendiente | **Corregir texto fantasma/duplicado en el bloque CTA oscuro** («¿Quieres confirmar servicio, ciudad o próxima fecha?» + párrafo de WhatsApp). El texto se ve superpuesto e ilegible. | 4:24–4:28 | Alta |
| **A02** | ⬜ Pendiente | **Corregir texto fantasma en encabezados de sección** en home: «Resultados reales que inspiran confianza», «Xiomara, técnica y formadora», «Formaciones y masterclass». | 4:18–4:22 | Alta |
| **A03** | ⬜ Pendiente | **Corregir texto fantasma en página «Servicios en España / Europa»** (título principal con efecto de doble capa / sombra excesiva). | 0:00–0:06 | Alta |

---

### B. Home — Hero y cabecera

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **B01** | ⬜ Pendiente | Revisar **jerarquía y legibilidad del hero**: H1 «Belleza especializada con sede en Cali y jornadas internacionales» + párrafo de micropigmentación/mercados. El lápiz señala varias veces «especializada» / «jornadas internacionales». | 0:08–0:22 | Media |
| **B02** | ✅ Hecho | Revisar **logo en cabecera** (tamaño, alineación y espacio respecto al menú hamburguesa en tablet). Señalado al inicio en varias páginas. | 0:00–0:10 | Media |
| **B03** | ⬜ Pendiente | Revisar **composición de la imagen principal del hero** (retrato de Xiomara) y la **imagen inset/collage** superpuesta en la esquina inferior izquierda: posición, tamaño y que no compita con el CTA. | 0:20–0:26, 2:30 | Media |
| **B04** | ⬜ Pendiente | Confirmar **CTAs del hero**: «Contacta conmigo» (WhatsApp) + «Ver servicios» — contraste, tamaño táctil y separación en móvil/tablet. | 0:08–0:18 | Media |
| **B05** | ⬜ Pendiente | Evitar **corte de texto** en subtítulo del hero (en algunos frames el párrafo termina truncado: «…y Su…»). | 0:08–0:10 | Alta |

---

### C. Página / bloque «Servicios en España / Europa»

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **C01** | ⬜ Pendiente | Revisar etiqueta superior **«Servicios confirmados»** sobre el H1: ¿debe mostrarse? ¿copy correcto? El lápiz apunta al área logo/etiqueta. | 0:04–0:06 | Media |
| **C02** | ⬜ Pendiente | Revisar **imagen inset de labios** superpuesta en la foto principal: proporción, posición y coherencia con el catálogo España/Europa. | 0:00–0:06 | Media |
| **C03** | ⬜ Pendiente | Ajustar **padding horizontal en móvil** para que no se corte «España» → se ve «…aña / Europa» y tabs de servicio cortados a la izquierda. | 4:28–4:32 | Alta |
| **C04** | ⬜ Pendiente | Revisar **badge/moneda EUR** junto al título: tamaño, alineación y separación del H1. | 4:28–4:32 | Media |
| **C05** | ⬜ Pendiente | Revisar **tabs/filtros de servicio** («Diseño de cejas», «Efecto polvo», «Efecto maquillaje»): scroll horizontal, área táctil y que no queden cortados. | 4:28–4:32, 2:00–2:06 | Alta |
| **C06** | ⬜ Pendiente | Corregir posible **duplicación de «España / Europa»** en la vista de servicios (aparece repetido en la misma zona). | 4:16–4:18 | Media |

---

### D. Bloque «Valoración gratuita por foto»

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **D01** | ⬜ Pendiente | Revisar **layout del bloque oscuro**: H1 «Valoración gratuita por foto», texto legal de WhatsApp y botón «Contacta conmigo» en la misma franja. | 0:58–1:06 | Media |
| **D02** | ⬜ Pendiente | Revisar **imagen central** (Xiomara con bata verde y globo): encuadre, relación con el texto y espaciado inferior hacia «Sede en Cali…». | 0:58–1:06 | Media |
| **D03** | ⬜ Pendiente | Confirmar que el copy deja claro: **valoración por foto + cita/reserva solo por WhatsApp** (sin formulario). | 0:58–1:06 | Alta (contenido ya visible; revisar redacción) |

---

### E. «Sede en Cali y jornadas internacionales» + mapa

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **E01** | ⬜ Pendiente | Revisar **chips de país** (Colombia, España, Suiza) y botón «Ver mapa de jornadas»: tamaño, contraste y comportamiento al tocar. | 1:06–1:20 | Media |
| **E02** | ⬜ Pendiente | Revisar **mapa editorial de disponibilidad**: marcadores numerados, líneas de conexión desde Cali/Colombia hacia Europa, y jerarquía visual del marcador principal (rojo vs blancos). El lápiz interactúa con marcadores 2, 5 y 6. | 1:20–2:06 | Alta |
| **E03** | ⬜ Pendiente | Revisar **zoom / interacción del mapa en tablet** (el recorrido insiste en tocar círculos del mapa). Verificar que el zoom no rompa layout ni deje elementos fuera de pantalla. | 1:20–2:06 | Alta |
| **E04** | ⬜ Pendiente | Revisar **listado bajo el mapa** al seleccionar marcadores: aparecen «Restrepo, Valle…», «Madrid, España», «Puerto de Sagunto, Valencia, España», «Ginebra, Suiza». Confirmar datos, copy «jornada por disponibilidad» y banderas. | 1:50–2:06, 3:50 | Alta |
| **E05** | ⬜ Pendiente | Aclarar visualmente que **no hay sedes fijas fuera de Colombia** (el texto ya lo dice; revisar si hace falta más énfasis o iconografía). | 1:06–1:20 | Baja |

---

### F. Selector de mercado («Elige el mercado correcto…»)

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **F01** | ⬜ Pendiente | Unificar copy del H2: en el video aparece **«antes de comprar»**, **«antes de comparar»** y **«Escoge el mercado…»**. Definir texto final (V1 informativa → probablemente *comparar*, no *comprar*). | 1:20–2:30 | Alta |
| **F02** | ⬜ Pendiente | Revisar **layout de las 3 tarjetas** (Colombia / España-Europa / Suiza) en tablet vertical: hoy se ven muy comprimidas; valorar stack vertical o scroll horizontal con snap. | 1:20–2:30 | Alta |
| **F03** | ⬜ Pendiente | Revisar **texto introductorio** del selector: moneda, catálogo y WhatsApp por mercado + sede física en Cali. El lápiz señala este párrafo varias veces. | 1:20–2:30 | Media |
| **F04** | ⬜ Pendiente | Revisar **hero compuesto** encima del selector (retrato + collage de trabajos): proporciones y que el H2 no quede cortado por el borde izquierdo («el mercado correcto antes de compra…»). | 2:14–2:20 | Alta |
| **F05** | ⬜ Pendiente | Confirmar contenido de cada tarjeta: **COP / EUR / CHF**, descripciones de Cali, jornadas España y Ginebra. | 1:20–2:30 | Media |

---

### G. «Servicios destacados por mercado»

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **G01** | ⬜ Pendiente | Revisar **foto del estudio** (camillas, certificados, aro de luz): encuadre, peso visual y relación con el título de sección. Señalada con el lápiz. | 2:00–2:20 | Media |
| **G02** | ⬜ Pendiente | Revisar **bloque Colombia COP**: título, subtítulo «Sede en Cali y servicios del catálogo de Colombia» y transición hacia filtros. | 2:00–2:20 | Media |
| **G03** | ⬜ Pendiente | Revisar **filtros/categorías** debajo del mercado (cejas, Efecto polvo, Efecto maquillaje, etc.): que no se corten y tengan buen tap target. | 2:00–2:20, 3:50 | Alta |
| **G04** | ⬜ Pendiente | Revisar **tarjetas/listado de servicios** tras elegir mercado (imágenes de resultados, retrato, etc.) y ritmo vertical entre bloques. | 2:20–3:00 | Media |

---

### H. «Resultados reales» + confianza + sobre Xiomara

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **H01** | ⬜ Pendiente | Revisar **grid de dos imágenes** (collage de labios/ojos + foto del gabinete): alineación inferior, gap y comportamiento responsive. | 3:50–4:10 | Alta |
| **H02** | ⬜ Pendiente | Revisar copy **«Resultados reales que inspiran confianza»** + subtítulo sobre trabajos cicatrizados sin promesas garantizadas. | 3:50–4:10 | Media |
| **H03** | ⬜ Pendiente | Revisar bloque **«Xiomara, técnica y formadora»** (texto + posible imagen): espaciado y bug de texto fantasma (ver A02). | 4:18–4:22 | Media |
| **H04** | ⬜ Pendiente | Revisar **tarjetas de ubicación** visibles en esta zona (Puerto de Sagunto, Ginebra) y su relación con el mapa/eventos. | 3:50–4:00 | Media |

---

### I. Formaciones, cursos y descargas

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **I01** | ⬜ Pendiente | Revisar sección **«Formaciones y masterclass»** en home: H2, texto de PDF/duración/CTA WhatsApp e imagen hero del bloque. | 4:10–4:18 | Media |
| **I02** | ⬜ Pendiente | Revisar página/detalle **«Master Class Laminado de Cejas»**: botones «Descargar PDF», «Consultar próxima fecha», «Ver formaciones». | 4:20–4:24 | Alta |
| **I03** | ⬜ Pendiente | Revisar bloque **«Catálogos y PDFs oficiales»** + enlace «Ver descargas» y copy de programas por mercado. | 4:20–4:28 | Media |
| **I04** | ⬜ Pendiente | Revisar curso **«Profesional de micropigmentación y neutralización labial»** (layout de imágenes y titulares en móvil). | 4:26–4:30 | Media |

---

### J. Footer, CTA final y navegación

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **J01** | ⬜ Pendiente | Revisar **CTA final oscuro** además del bug A01: botones «Contacta conmigo» y «Ver servicios», copy de WhatsApp Colombia vs Europa/Suiza. | 4:24–4:28 | Alta |
| **J02** | ⬜ Pendiente | Revisar **footer legal** (dirección solo Cali, Colombia; datos de Xiomara; enlaces legales). Parcialmente visible al final. | 4:28–4:32 | Media |
| **J03** | ⬜ Pendiente | Revisar **menú hamburguesa** en tablet: tamaño del icono, panel móvil y accesos a mercados/idioma. | Recorrido completo | Baja |
| **J04** | ⬜ Pendiente | Revisar si debe existir **selector de mercado persistente en cabecera** (en un frame aparecen chips Colombia / España-Madrid / España-Europa + icono YouTube bajo el logo). Confirmar si es deseado o fue estado intermedio. | 0:48–0:50 | Baja (*inferido*) |

---

### K. Pulido general responsive (tablet / móvil)

| ID | Estado | Cambio sugerido | Evidencia en video (~) | Confianza |
|----|--------|-----------------|------------------------|-----------|
| **K01** | ⬜ Pendiente | Auditar **padding horizontal global** en 390–430px y tablet vertical para evitar títulos cortados. | Varias secciones | Alta |
| **K02** | ⬜ Pendiente | Revisar **espaciado vertical** entre secciones largas del home (hero → valoración → mapa → mercado → servicios → resultados → formaciones → CTA). | Recorrido completo | Media |
| **K03** | ⬜ Pendiente | Revisar **contraste del botón secundario blanco** («Ver servicios») sobre fondo claro. | 0:08–0:18 | Media |
| **K04** | ⬜ Pendiente | Verificar que **no haya animaciones de texto** que provoquen el efecto fantasma en Safari iOS (relacionado con A01–A03). | Varias secciones | Media (*hipótesis técnica*) |

---

## Mapa del recorrido del video (referencia rápida)

| Tiempo aprox. | Sección visitada |
|---------------|------------------|
| 0:00–0:30 | Servicios España/Europa + Hero home |
| 0:30–1:10 | Valoración gratuita + Sede/mapa (inicio) |
| 1:10–2:10 | Mapa interactivo (zoom y marcadores) |
| 2:10–3:10 | Selector de mercado + Servicios destacados Colombia |
| 3:10–4:00 | Servicios España / tabs + ubicaciones Sagunto/Ginebra |
| 4:00–4:30 | Resultados reales + Xiomara + Formaciones + curso + PDFs + CTA final |
| 4:30–4:57 | Vuelta al hero / cierre |

---

## IDs rápidos para preguntar

```
Críticos:     A01 A02 A03
Home:         B01 B02 B03 B04 B05
España:       C01 C02 C03 C04 C05 C06
Valoración:   D01 D02 D03
Mapa:         E01 E02 E03 E04 E05
Mercado:      F01 F02 F03 F04 F05
Servicios:    G01 G02 G03 G04
Confianza:    H01 H02 H03 H04
Formaciones:  I01 I02 I03 I04
Footer:       J01 J02 J03 J04
Responsive:   K01 K02 K03 K04
```

---

## Leyenda de estados (para ir actualizando)

- ⬜ Pendiente
- 🟨 En progreso
- ✅ Hecho
- ❌ No aplica / descartado

---

*Documento generado por análisis frame-a-frame del video. Sin ejecución de código en el repositorio.*
