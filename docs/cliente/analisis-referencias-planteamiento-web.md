# Análisis de referencias y primer planteamiento web

Última actualización: 16/06/2026.

> **Nota 17/06/2026:** este documento queda como análisis inicial de referencias. La planificación principal actualizada está en [planificacion-web-v2.md](planificacion-web-v2.md), incorporando catálogos transcritos, Suiza/CHF, PDFs descargables, jornadas por disponibilidad, reserva solo por WhatsApp y UI detallada por página.

Este documento resume el análisis de las webs de referencia, los criterios de mejora y una primera arquitectura completa para la futura web de **Cejas Internacionales**. Es documentación de trabajo: no implica todavía tocar `main` ni publicar cambios.

---

## 1. Fuentes revisadas

### Referencias externas

| Web | URL | Estado de revisión | Notas |
|---|---|---|---|
| BAURI Barcelona | https://www.bauribarcelona.com/ | Revisada: home, tratamientos, centro, cursos y contacto | Web completa accesible. Buen referente de estructura comercial y confianza local. |
| Paola Cardona Academy | https://paolacardonaacademy.com/ | Revisión limitada por verificación anti-bot | Se usaron snippets indexados, el documento interno de referencias y su web relacionada de cursos. |
| Paola Cardona cursos | https://www.cursospaolacardona.com/ | Revisada como apoyo | Útil para entender tono de formación, bio y venta de cursos. |

### Documentación interna usada

- `docs/cliente/webs-referencia.md`
- `docs/cliente/identidad-marca.md`
- `docs/cliente/contacto-datos-legales.md`
- `docs/cliente/ubicaciones-jornadas.md`
- `docs/cliente/resumen-servicios-precios-duraciones.md`
- `docs/cliente/cursos-masterclass.md`
- `docs/cliente/fotos-cicatrizados-y-sesion.md`
- `docs/cliente/fotos-instagram-inventario.md`
- `PRODUCT.md`

---

## 2. Resumen ejecutivo

La web de Cejas Internacionales debe quedar más cerca del posicionamiento premium e internacional de Paola Cardona que del modelo comercial de BAURI, pero tomando de BAURI su claridad práctica: CTA visible, estructura de servicios, confianza, contacto y organización de tratamientos.

La diferencia principal respecto a ambas referencias debe ser esta: **Cejas Internacionales necesita explicar muy bien dónde atiende, qué servicios aplican a cada mercado, qué moneda corresponde a cada región y cómo contactar por WhatsApp según país**. Ahí está la oportunidad de superar a las referencias.

Decisiones ya confirmadas que condicionan la web:

- No habrá tienda online.
- CTA principal: **Contacta conmigo**.
- Color principal: **palo de rosa clásico**.
- Hay WhatsApp de Colombia y WhatsApp de España; la web debe permitir elegir ambos.
- La sede física está en **Cali, Valle del Cauca, Colombia**.
- En España no hay sede física fija; trabaja por jornadas.
- Los servicios se muestran solo donde aplican.
- Las fotos disponibles del proyecto serán el material definitivo.
- Los PDFs de formaciones deben estar preparados para descarga futura.

---

## 3. QA de referencias

### BAURI Barcelona

**Qué hace bien**

| Área | Observación | Qué podemos aprovechar |
|---|---|---|
| Navegación | Tiene menú claro con Tratamientos, Tienda, Bonos, Cursos, Centro, Blog y Contacto. | Menú visible y CTA fijo, pero simplificado para Cejas Internacionales. |
| Conversión | El botón "Reserva una cita" aparece de forma repetida y muy visible. | Mantener un CTA constante: "Contacta conmigo". |
| Servicios | La página de tratamientos lista muchas categorías y precios. | Crear catálogo filtrable por mercado y categoría. |
| Confianza | Usa sección "Conócenos", trayectoria, marcas, testimonios e Instagram. | Replicar la lógica de confianza con fotos reales, bio, resultados y formación. |
| Contacto | La página de contacto muestra dirección, horario, WhatsApp y email. | Hacer contacto claro, pero separando Colombia/España y sin inventar sede en España. |
| Formación | Tiene página de cursos con formadora y técnicas. | Crear sección de Formaciones con PDFs descargables y CTA a WhatsApp. |

**Qué no conviene copiar**

| Problema | Por qué no aplica | Mejora para Cejas Internacionales |
|---|---|---|
| Tienda, carrito, descuentos y newsletter comercial | La clienta ya confirmó que no quiere tienda online. | Sustituir por contacto, valoración y descarga de PDFs. |
| Menú demasiado cargado | Mezcla tratamientos, tienda, bonos, cursos y regalo. | Menú más editorial y directo: Servicios, Resultados, Jornadas, Formaciones, Cuidados, FAQ, Contacto. |
| Catálogo muy largo sin relato premium | Es práctico, pero puede sentirse denso. | Combinar catálogo con historia, resultados, mapa y experiencia internacional. |
| Cursos con FAQ de ejemplo | En BAURI aparecen preguntas genéricas tipo "Pregunta 1". | No publicar placeholders; si falta FAQ, dejar bloque oculto hasta tener respuestas reales. |
| Contacto local simple | BAURI tiene una sola ciudad. | Cejas necesita mapa internacional + WhatsApp por país. |

### Paola Cardona Academy

**Qué hace bien**

| Área | Observación | Qué podemos aprovechar |
|---|---|---|
| Posicionamiento | Se presenta como micropigmentación premium y formación PMU en Madrid. | Cejas Internacionales puede posicionarse como marca PMU/belleza con trayectoria Colombia-Europa. |
| CTA | Usa una lógica de "Valoración" más premium que "comprar". | Nuestro CTA será "Contacta conmigo", con tono de valoración personalizada. |
| Servicios | El menú indexado muestra Cejas, Labios, Ojos, Faciales y Eliminación de pigmentos. | Estructura por familias claras: Cejas, Labios, Mirada, Pestañas, Uñas, Peinados, Formaciones. |
| Autoridad personal | El relato de Paola se apoya en experiencia, premios, formación y seguridad. | Potenciar a Xiomara como rostro de la marca, no solo listar servicios. |
| Formación | La web relacionada de cursos trabaja el relato de experiencia y transformación profesional. | Cejas tiene material fuerte en PDFs: temarios, precios, kits, certificado y acompañamiento. |

**Limitaciones / cuidado**

| Punto | Riesgo | Mejora para Cejas Internacionales |
|---|---|---|
| Verificación anti-bot | Dificulta la revisión completa y puede afectar rastreo/accesibilidad si está mal configurada. | Evitar barreras innecesarias para Google, clientas y herramientas de QA. |
| Shop | No aplica para nuestra clienta. | No incluir tienda ni carrito. |
| Lujo sin precio visible | Puede elevar percepción, pero reduce claridad. | Cejas ya tiene precios: mostrarlos por mercado cuando estén confirmados. |
| Madrid como sede clara | Cejas no tiene sede fija en España. | Presentar España como jornadas: Madrid, Palma de Mallorca y Puerto de Sagunto, Valencia. |

---

## 4. Qué debe hacer mejor nuestra web

1. **Mapa internacional real, no solo dirección.** Las referencias muestran ubicación/contacto, pero Cejas necesita contar una historia de sede + jornadas: Cali, Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra.
2. **Servicios por mercado sin confusión.** España/Europa, Suiza y Colombia no tienen exactamente el mismo catálogo ni moneda. Esto debe resolverse con filtros, tabs o rutas separadas.
3. **WhatsApp doble y claro.** El usuario debe poder contactar por Colombia o España sin adivinar.
4. **Sin tienda online.** Quitar todo lo que huela a ecommerce salvo descargas de PDFs y CTA de contacto.
5. **Más autoridad personal.** Xiomara debe aparecer como especialista, formadora y rostro visible, con fotos reales.
6. **FAQ y cuidados como confianza.** En micropigmentación las dudas de dolor, higiene, embarazo, contraindicaciones y retoques son decisivas.
7. **Más premium que catálogo.** El catálogo es necesario, pero la home debe vender criterio, experiencia y resultados.

---

## 5. Dirección visual

### Paleta base

| Token | Color | Uso |
|---|---|---|
| Palo de rosa principal | `#B76E79` | Botones, acentos, mapa, highlights |
| Palo de rosa profundo | `#7F3F4A` | Hover, fondos de contraste, titulares puntuales |
| Rosa empolvado | `#E8C7CC` | Fondos suaves y detalles |
| Coral del logo | `#EE5164` | Acento secundario, firma, microdetalles |
| Negro tinta | `#1A1A1A` | Texto principal |
| Blanco limpio | `#FFFFFF` / `#FBF8F7` | Fondo base |
| Gris cálido | `#6B6466` | Texto secundario |

**Criterio:** palo de rosa como protagonista, pero no una web monocromática rosa. Debe respirar con blanco, negro, fotos reales y algún contraste neutro.

### Estilo

- Premium, femenino, internacional y preciso.
- Fotografía real como material principal, no ilustraciones genéricas.
- Mucho aire, pero con secciones útiles y escaneables.
- Bordes sobrios; evitar tarjetas enormes y repetidas.
- Evitar fondos con orbes/decoración de plantilla.
- Microinteracciones elegantes: líneas, pins, cambios suaves, transiciones de imagen.

### Tipografía

No cerrar fuente final hasta hacer prueba visual, pero la dirección debería ser:

- Titulares: una serif/sans elegante con presencia, no una serif editorial genérica.
- Cuerpo/UI: sans limpia, legible y profesional.
- El estilo manuscrito solo debe vivir en el logo o en detalles muy puntuales; no usarlo para párrafos ni navegación.

---

## 6. Arquitectura de información propuesta

### Navegación principal

| Menú | Objetivo |
|---|---|
| Inicio | Resumen premium, CTA, mapa, servicios destacados y resultados |
| Sobre Xiomara | Trayectoria, formación, experiencia, sede y visión |
| Servicios | Catálogo por mercado y familia |
| Resultados | Galería de trabajos, cicatrizados y sesión profesional |
| Jornadas | Mapa, ciudades, disponibilidad y contacto por país |
| Formaciones | Cursos/masterclass, temarios, precios, PDFs descargables |
| Cuidados | Antes/después, preparación, cicatrización |
| FAQ | Preguntas frecuentes de clientas |
| Contacto | WhatsApp Colombia/España, email, redes, dirección Cali |

### Rutas recomendadas

```txt
/
/sobre-xiomara
/servicios
/servicios/espana-europa
/servicios/colombia
/servicios/[slug]
/resultados
/jornadas
/formaciones
/formaciones/[slug]
/cuidados
/preguntas-frecuentes
/contacto
/aviso-legal
/privacidad
/cookies
```

### Home recomendada

1. **Hero**
   - Foto real de Xiomara o resultado fuerte.
   - Logo visible.
   - Claim: micropigmentación, belleza y formación con trayectoria internacional.
   - CTA principal: **Contacta conmigo**.
   - CTA secundario: Ver servicios / Ver jornadas.

2. **Selector rápido de mercado**
   - Colombia
   - España / Europa
   - Ver todos los servicios

3. **Mapa editorial de jornadas**
   - Cali como sede física.
   - Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra como jornadas/ciudades de atención.

4. **Servicios destacados**
   - Cejas, labios, mirada, pestañas.
   - Uñas, peinados y extensiones solo para Colombia.

5. **Resultados reales**
   - Antes/después, cicatrizados, sesión profesional.
   - Filtros por cejas, labios, mirada.

6. **Sobre Xiomara**
   - Historia, formación, enfoque, autoridad.

7. **Formaciones**
   - Cursos principales con botón de descarga de PDF y WhatsApp.

8. **Cuidados y FAQ**
   - Bloque de confianza, seguridad, preparación y dudas.

9. **Contacto final**
   - Dos rutas de WhatsApp: Colombia / España.
   - Email y redes.

---

## 7. Mapa: propuesta de diseño

La sección del mapa debería ser una pieza diferencial de la web, no un iframe genérico.

### Recomendación principal: mapa editorial animado

Un mapa estilizado tipo atlas, con fondo limpio y líneas palo de rosa. No necesita mostrar calles; necesita contar presencia internacional.

**Ubicaciones exactas a documentar:**

| País | Ubicación | Tipo |
|---|---|---|
| Colombia | Cali, Valle del Cauca | Sede física |
| Colombia | Restrepo, Valle del Cauca | Jornada / atención por disponibilidad |
| España | Madrid | Jornada |
| España | Palma de Mallorca | Jornada |
| España | Puerto de Sagunto, Valencia | Jornada |
| Suiza | Ginebra | Jornada |

### Interacción

- Puntos animados sobre cada ciudad.
- Cali con marcador especial: "Sede física".
- Resto de ciudades con marcador: "Jornadas".
- Al pasar o tocar un punto: panel con país, ciudad, tipo, CTA de WhatsApp recomendado.
- Filtro por país: Colombia, España, Suiza.
- Línea animada de trayectoria internacional.
- En móvil: lista compacta + mini mapa arriba.
- Con `prefers-reduced-motion`: mapa estático, sin trazos animados.

### Tecnología recomendada

| Opción | Ventaja | Riesgo | Recomendación |
|---|---|---|---|
| SVG/React con coordenadas reales | Máximo control visual, rápido, sin cookies ni tokens | No es mapa callejero | Mejor opción para la primera versión premium |
| `react-simple-maps` | Buen equilibrio entre mapa real y estética editorial | Añade dependencia | Buena si queremos geografía precisa sin tiles |
| Leaflet/OpenStreetMap | Mapa funcional real | Se ve más estándar si no se personaliza | Útil para página de contacto o "Cómo llegar" |
| Google Maps iframe | Familiar | Menos elegante, privacidad/cookies, menos control | Solo como enlace externo a la sede de Cali |
| Mapbox/MapLibre | Muy visual y potente | Token/configuración/coste según proveedor | Opción avanzada si se quiere mapa con tiles premium |

**Decisión propuesta:** para la home, usar mapa editorial animado; para contacto/legal, usar enlace a Google Maps de la sede de Cali.

---

## 8. Frontend

### Stack recomendado

Si se mantiene la línea técnica del proyecto principal:

- Next.js con App Router.
- TypeScript.
- Componentes server-first cuando no haya interacción.
- Componentes client solo para mapa, filtros, galerías, acordeones y animaciones.
- Framer Motion / Motion para microinteracciones.
- CSS variables o Tailwind tokens para paleta palo de rosa.

### Componentes clave

| Componente | Función |
|---|---|
| `MarketSelector` | Cambiar entre Colombia y España/Europa |
| `ServiceCatalog` | Mostrar servicios por mercado, categoría, precio y duración |
| `ServiceCard` | Servicio con precio, duración, mercado y CTA |
| `WhatsAppChooser` | Elegir Colombia o España sin confusión |
| `InternationalMap` | Mapa editorial animado de sedes/jornadas |
| `ResultsGallery` | Galería filtrable por tipo de resultado |
| `CourseCard` | Curso con modalidad, precio, PDF y CTA |
| `FAQAccordion` | Dudas frecuentes |
| `LegalFooter` | Datos de Cali, NIT, email, redes |

### Animaciones

- Entrada del hero con foto, logo y línea de palo de rosa.
- Aparición escalonada de servicios, pero sin saturar.
- Transición suave en selector de mercado.
- Pins del mapa con `scale`/`opacity`, líneas dibujadas con `stroke-dashoffset`.
- Galería con hover sutil y transición al abrir imagen.
- Botón WhatsApp con microinteracción clara, no invasiva.
- Reducir o desactivar movimiento para usuarios con reducción de movimiento.

---

## 9. Backend y datos

### Recomendación V1: sin backend complejo

Para la primera versión no hace falta base de datos ni panel de administración. La web puede ser estática/dinámica con datos estructurados en archivos TypeScript/JSON/MDX.

Ventajas:

- Más rápido de implementar.
- Menos coste.
- Menos riesgo.
- Mejor rendimiento.
- Ideal mientras el contenido se está cerrando.

### Datos estructurados propuestos

```ts
type Market = "colombia" | "espana-europa" | "suiza";

type Service = {
  slug: string;
  name: string;
  category: string;
  markets: Market[];
  price: {
    colombia?: string;
    espanaEuropa?: string;
    suiza?: string;
  };
  duration?: string;
  durationStatus: "cerrado" | "rango" | "por-confirmar";
  description?: string;
  ctaMessage?: string;
};

type Location = {
  country: "Colombia" | "España" | "Suiza";
  city: string;
  region?: string;
  type: "sede-fisica" | "jornada";
  coordinates: [number, number];
  whatsappTarget: "colombia" | "espana";
};

type Course = {
  slug: string;
  name: string;
  duration: string;
  modalities: string[];
  markets: Market[];
  pdfPath: string;
  prices: Record<string, string>;
  pending: string[];
};
```

### Cuándo sí tendría sentido un backend/CMS

Más adelante, si la clienta cambia fechas de jornadas, cursos o precios con frecuencia, se puede añadir:

- Sanity / Strapi / Directus para contenido editable.
- Airtable/Google Sheets como fuente temporal de servicios y fechas.
- Formulario propio si se decide no depender solo de WhatsApp.
- Calendario de jornadas con estados: próxima, abierta, completa, realizada.

Para V1, no lo recomiendo todavía.

---

## 10. SEO y contenido

### Enfoque SEO

La web debe posicionar por intención local y por servicio, sin inventar sedes:

- Micropigmentación de cejas en Cali.
- Micropigmentación de labios en Cali.
- Micropigmentación / cejas / labios por jornadas en Madrid.
- Cursos de micropigmentación de cejas.
- Cursos de micropigmentación labial.
- Laminado de cejas, lifting de pestañas, cejas en henna.

### Páginas con potencial SEO

| Página | Objetivo |
|---|---|
| `/servicios/espana-europa` | Mostrar servicios disponibles en jornadas España/Europa |
| `/servicios/colombia` | Mostrar catálogo completo Colombia |
| `/servicios/micropigmentacion-cejas` | Servicio principal |
| `/servicios/micropigmentacion-labios` | Servicio principal |
| `/formaciones/micropigmentacion-cejas` | Curso principal |
| `/formaciones/micropigmentacion-labios` | Curso principal |
| `/jornadas` | Presencia internacional y ciudades |
| `/cuidados` | Contenido informativo útil |
| `/preguntas-frecuentes` | Resolver objeciones |

### Datos estructurados

- `LocalBusiness` / `BeautySalon` para la sede de Cali.
- `Course` para formaciones.
- `FAQPage` solo cuando las preguntas estén respondidas con contenido real.
- `BreadcrumbList` en páginas internas.
- `ImageObject` cuando haya resultados destacados.

### Cuidado legal/SEO

- No usar dirección de España como sede.
- En footer y aviso legal, usar solo Cali.
- Si hay cookies/analytics/mapas externos, preparar política de cookies.
- Si se usan promesas de ingresos en cursos, añadir disclaimer; mejor no publicarlas como promesa.

---

## 11. QA y pruebas

### QA funcional

| Área | Prueba |
|---|---|
| WhatsApp | Links `wa.me` abren correctamente para Colombia y España. |
| Mercado | Servicios de Colombia no aparecen en España si no aplican. |
| Precios | EUR/COP correctos por mercado. |
| Duraciones | Todas las duraciones de cita del catálogo se muestran según la tabla confirmada. |
| PDFs | Cada curso descarga el PDF correcto. |
| Galería | Imágenes cargan, tienen alt text y no rompen layout móvil. |
| Mapa | Los pins muestran la ciudad correcta y no llaman "sede" a jornadas. |
| Legal | Footer y aviso legal usan datos de Cali. |

### QA visual/responsive

- Móvil: 360, 390, 430 px.
- Tablet: 768, 834 px.
- Desktop: 1280, 1440, 1920 px.
- Revisar que no haya textos cortados en botones.
- Revisar contraste del palo de rosa sobre blanco y sobre fondos oscuros.
- Revisar mapa en móvil: debe ser legible o convertirse en lista.
- Revisar que los filtros de servicios no muevan el layout de forma brusca.

### QA accesibilidad

- Navegación por teclado.
- Foco visible.
- Acordeones FAQ con `aria-expanded`.
- Mapa con lista textual equivalente.
- `prefers-reduced-motion`.
- Contraste AA.
- Alt text útil en resultados.
- No depender solo del color para distinguir sede/jornada.

### QA técnico

Cuando exista la app en la rama de implementación:

```txt
npm run lint
npm run typecheck
npm run build
npm run test
```

Y pruebas recomendadas:

- Playwright para navegación principal, filtros, WhatsApp, PDFs y mapa.
- Axe/Lighthouse para accesibilidad.
- Lighthouse performance en home, servicios y formaciones.
- Link checker para rutas internas, PDFs y redes sociales.
- Validación de schema.org.
- Validación de sitemap/robots.

---

## 12. Skills / especialidades a aplicar en implementación

| Área | Uso |
|---|---|
| Diseño frontend | Sistema visual palo de rosa, jerarquía, responsive, pulido visual |
| Copywriting | Hero, servicios, bio, cursos, FAQ y CTAs |
| SEO | Metadata, estructura, schema, URLs, contenido por intención |
| Accesibilidad | WCAG 2.2 AA, teclado, contraste, motion safe |
| Animación | Framer Motion/Motion para mapa, hero y microinteracciones |
| QA browser | Playwright, capturas desktop/móvil y pruebas de flujos |
| Next.js best practices | Server/client boundaries, imágenes, metadata, build |

---

## 13. Fases recomendadas

### Fase 1: cerrar documentación

- Cerrar preguntas FAQ.
- Confirmar condiciones de cursos: fechas, cupos, requisitos y vigencia de precios.
- Definir cómo llamaremos a las jornadas: "próximas", "por disponibilidad" o "ciudades donde atiende".

### Fase 2: diseño base

- Crear sistema visual con palo de rosa clásico.
- Definir composición de home y mapa.
- Elegir 10-15 fotos principales para home/resultados.
- Definir patrón de WhatsApp doble.

### Fase 3: implementación frontend

- Crear data model de servicios, cursos, ubicaciones y FAQ.
- Construir home.
- Construir servicios por mercado.
- Construir formaciones con PDFs descargables.
- Construir mapa editorial animado.
- Construir contacto/legal.

### Fase 4: QA y publicación

- Responsive completo.
- Accesibilidad.
- SEO técnico.
- Performance.
- Revisión de textos y datos legales.
- Deploy en staging.
- Solo al final, cuando tú lo indiques, integrar/publicar en `main`.

---

## 14. Pendientes actuales antes de implementación

| Pendiente | Impacto |
|---|---|
| FAQ final de la clienta | Necesario para sección pública de preguntas frecuentes. |
| Fechas/cupos/requisitos de formaciones | Necesario si se quiere vender cursos por jornadas concretas. |
| Estado de cada ciudad | Decidir si son próximas jornadas, jornadas realizadas o atención por disponibilidad. |
| Patrón WhatsApp | Elegir entre selector, dos botones, modal o lógica por mercado. |
| Selección final de fotos | Necesario para hero, resultados y bio. |

---

## 15. Decisión recomendada

Para la primera versión, construir una web de marca premium con datos estructurados, sin tienda y sin backend complejo. El diferencial debe ser:

1. **Hero con Xiomara + trayectoria internacional.**
2. **Mapa editorial animado de sede y jornadas.**
3. **Catálogo claro por país/mercado.**
4. **Resultados reales y cuidados.**
5. **Formaciones con PDFs descargables.**
6. **Contacto por WhatsApp Colombia y España sin fricción.**

Esta dirección aprovecha lo mejor de BAURI y Paola Cardona, pero evita copiar sus debilidades: ecommerce innecesario, navegación pesada, falta de claridad internacional y dependencia de claims genéricos.
