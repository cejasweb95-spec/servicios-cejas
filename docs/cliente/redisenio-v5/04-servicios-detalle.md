# Rediseño V5 — Servicios (detalle letra por letra)

## Estado y alcance

Este documento es el desarrollo profundo de la familia **Servicios**, que en
[02-paginas-interiores-por-ruta.md](02-paginas-interiores-por-ruta.md) solo quedaba
resumida en las secciones §1–§3. Aquí se baja a copy exacto (ES/EN) y al **catálogo real**.

- Fuente de verdad usada (no inventada):
  - [src/content/services.ts](../../../src/content/services.ts) — **50 servicios**.
  - [src/content/service-categories.ts](../../../src/content/service-categories.ts) — **8 categorías**.
  - [src/content/markets.ts](../../../src/content/markets.ts) — **3 mercados** (COP, EUR, CHF).
  - [src/messages/es.json](../../../src/messages/es.json) y [en.json](../../../src/messages/en.json) — copy vigente.
- No se ha modificado código, datos ni traducciones. Todo texto marcado **`propuesta V5`** está pendiente de aprobación.
- Regla bilingüe: cada cadena pública aprobada en español necesita su localización profesional en inglés en el mismo cambio.

## Rutas que cubre este documento

| Página | Rutas ES / EN | Componente |
|---|---|---|
| Índice de servicios | `/es/servicios`, `/en/services` | `_pages/services-index-page` |
| Catálogo por mercado | `/es/servicios/[market]`, `/en/services/[market]` | `_pages/market-services-page` |
| Detalle de servicio | `/es/servicios/[market]/[service]`, `/en/services/[market]/[service]` | `_pages/service-detail-page` |
| Bloque de home "Servicios por país" | sección de `/es`, `/en` | ver [01-home-y-navegacion.md §3](01-home-y-navegacion.md) |

## Datos reales que mandan (fuente de verdad)

### Mercados

| ID interno | Visible ES | Visible EN | Moneda | WhatsApp | Nº de servicios |
|---|---|---|---|---|---:|
| `colombia` | Colombia | Colombia | COP | Colombia | **49** |
| `espana-europa` | España / Europa | Spain / Europe | EUR | Europa | **22** |
| `suiza` | Suiza | Switzerland | CHF | Europa | **14** |

### Categorías (orden de aparición real por campo `order`)

| Orden | ID | Visible ES | Visible EN |
|---:|---|---|---|
| 10 | `cejas` | Cejas | Brows |
| 20 | `micropigmentacion-cejas` | Micropigmentación de cejas | Brow micropigmentation |
| 30 | `labios` | Labios | Lips |
| 40 | `mirada-pestanas` | Mirada y pestañas | Eyes and lashes |
| 50 | `depilacion-corporal` | Depilación corporal | Body waxing |
| 60 | `extensiones-pestanas` | Extensiones de pestañas | Lash extensions |
| 70 | `unas` | Uñas | Nails |
| 80 | `peinados-maquillaje` | Peinados y maquillaje | Hair and makeup |

> Regla de producto clave: **un servicio solo se muestra en el mercado donde está confirmado.**
> El catálogo maestro de abajo usa `—` cuando un servicio no se ofrece en ese mercado; esa columna `—`
> ES la regla de filtrado por mercado, no un dato pendiente.

---

## 1. Índice de servicios — `/servicios`

### 1.1 Copy: actual vs propuesta V5

| Clave (`Services`) | ES actual (en código) | EN actual | Propuesta V5 ES | Propuesta V5 EN |
|---|---|---|---|---|
| `eyebrow` | Servicios por mercado | Services by market | *(mantener)* | *(keep)* |
| `title` (H1) | Elige el mercado para ver servicios, precios y tiempos | Choose a market to view services, prices and timing | **Servicios por país** | **Services by country** |
| `description` | Cada catálogo mantiene su propia moneda, disponibilidad y WhatsApp de contacto. Colombia usa la sede física de Cali; España/Europa y Suiza funcionan por jornadas próximas según disponibilidad. | Each catalog has its own currency, availability and WhatsApp contact. Colombia is served from the Cali studio; appointments in Spain/Europe and Switzerland are subject to availability. | **Cada país tiene su propio catálogo, moneda y precios. Elige tu ubicación para ver los servicios que aplican allí.** | **Each country has its own catalog, currency and prices. Choose your location to see the services available there.** |
| `selectorLabel` | Selecciona un mercado | Select a market | *(mantener)* | *(keep)* |
| `metaTitle` | Servicios de micropigmentación y belleza \| Cejas Internacionales | Micropigmentation and beauty services \| Cejas Internacionales | *(mantener)* | *(keep)* |
| `metaDescription` | Consulta servicios por mercado: Colombia, España/Europa y Suiza, con precios, tiempos confirmados y contacto por WhatsApp. | Browse services by market: Colombia, Spain/Europe and Switzerland, with prices, confirmed appointment times and WhatsApp contact. | *(mantener)* | *(keep)* |

**Decisión de H1.** El título actual es una instrucción ("elige el mercado…"). La clienta piensa en
**países** (Colombia, España/Europa, Suiza). Por eso la `propuesta V5` cambia el H1 visible a
`Servicios por país` y mueve la instrucción a `description`. El concepto interno de dato sigue siendo
`market`; solo cambia la etiqueta visible. **Motivo del cambio de `description`:** se elimina toda mención de
"disponibilidad" y "jornadas", según la regla de la clienta de que la disponibilidad va en redes sociales, no en la web.

> **Cadena canónica del intro de Servicios.** Esta es la versión aprobada y unificada:
> ES `Cada país tiene su propio catálogo, moneda y precios. Elige tu ubicación para ver los servicios que aplican allí.` ·
> EN `Each country has its own catalog, currency and prices. Choose your location to see the services available there.`
> Se usa idéntica en el bloque de home ([01-home-y-navegacion.md](01-home-y-navegacion.md) §3) y en el índice
> ([02-paginas-interiores-por-ruta.md](02-paginas-interiores-por-ruta.md) §1). Si se reescribe, actualizar los tres a la vez.

### 1.2 Composición V5

1. Breadcrumb discreto: `Inicio / Servicios` · `Home / Services`.
2. H1 `Servicios por país` + párrafo de introducción (una sola idea, ancho de lectura controlado).
3. **Selector editorial de los tres países** (no tres cards clonadas con sombra): bandera, nombre, moneda, una línea de contexto, foto real del mercado si existe, y CTA `Ver catálogo` · `View catalogue`.
4. Módulo de ayuda compacto `¿No sabes qué catálogo consultar?` · `Not sure which catalogue to view?` con CTA de WhatsApp.
5. Footer.

### 1.3 Copy de los tres selectores de país (letra por letra)

Tomado de `markets.ts`, con la `propuesta V5` que retira "jornadas/disponibilidad":

| País | ES actual | EN actual | Propuesta V5 ES | Propuesta V5 EN |
|---|---|---|---|---|
| Colombia · COP | Sede física en Cali y servicios del catálogo de Colombia. | Physical studio in Cali and services from the Colombia catalog. | Atención en el punto físico de Cali y catálogo completo de Colombia. | In-person service at the Cali studio and the full Colombia catalogue. |
| España / Europa · EUR | Jornadas por disponibilidad y servicios con precios en euros. | Appointments subject to availability, with services priced in euros. | **Servicios y catálogo con precios en euros para España y Europa.** | **Services and catalogue priced in euros for Spain and Europe.** |
| Suiza · CHF | Jornadas por disponibilidad en Ginebra y servicios confirmados en CHF. | Appointments in Geneva subject to availability, with confirmed CHF services. | **Servicios confirmados con precios en francos suizos (CHF).** | **Confirmed services priced in Swiss francs (CHF).** |

### 1.4 Qué se elimina visualmente

- El hero genérico de página interior repetido en todas las rutas.
- Tres cards de igual tamaño con sombra y foto no relacionada.
- Cualquier texto de "jornada / disponibilidad / próxima fecha" en los mercados internacionales.

---

## 2. Catálogo por mercado — `/servicios/[market]`

### 2.1 Copy de cabecera: actual vs propuesta V5

| Clave (`MarketServices`) | ES actual | EN actual | Propuesta V5 |
|---|---|---|---|
| `heroEyebrow` | Servicios confirmados | Confirmed services | *(mantener)* |
| `heroTitle` | Servicios en {market} | Services in {market} | *(mantener)* |
| `catalogBannerTitle` | Catálogo oficial del mercado | Official market catalog | *(mantener)* |
| `catalogBannerDescription` | Consulta los servicios disponibles para este mercado y descarga el catálogo oficial con sus precios correspondientes. | Browse the services available in this market and download the official catalog with the corresponding prices. | *(mantener; no menciona disponibilidad)* |
| `catalogDownloadLabel` | Descargar catálogo PDF | Download catalog PDF | *(mantener)* |
| `contactLabel` | Contacta conmigo | Contact me | *(mantener — CTA principal de marca)* |
| `selectorLabel` | Cambiar mercado | Change market | *(mantener)* |
| `serviceDetailLabel` | Ver detalle | View details | *(mantener)* |
| `emptyTitle` / `emptyDescription` | Sin servicios publicados / Todavía no hay servicios confirmados para este mercado. | No services published / There are no confirmed services for this market yet. | *(mantener)* |

### 2.2 Dirección visual de la plantilla

1. Breadcrumb `Servicios / [Mercado]`.
2. Encabezado con H1 `Servicios en [Mercado]` + bandera + moneda como dato complementario (nunca solo color).
3. Cuerpo en **lista editorial por categoría** (en el orden 10→80), no una pared de cards iguales.
4. La foto, si existe, abre una categoría o aparece en una fila alterna; no se duplica por ítem.
5. Banda de catálogo oficial con `Descargar catálogo PDF` solo si el PDF de ese mercado existe.
6. CTA final `Contacta conmigo` → selector WhatsApp del mercado correspondiente.

### 2.3 Catálogo maestro real (los 50 servicios)

Precios reales por mercado. `—` = no se ofrece en ese mercado (regla de filtrado). `★` = `featured`.
COP sin decimales; EUR/CHF en su moneda.

#### Cejas

| Servicio (ES) | Service (EN) | COP | EUR | CHF | Cita | Resultado |
|---|---|---:|---:|---:|---|---|
| Laminado de cejas ★ | Brow lamination | 80.000 | 45 | 95 | 1 h | Hasta 1 mes |
| Sombreado en henna | Henna brow shading | 43.000 | 27 | 50 | 40 min | — |
| Depilación de cejas con cera | Brow waxing | 25.000 | 9 | — | 20 min | 15–20 días |
| Depilación de cejas con cuchilla | Brow razor shaping | 20.000 | 7 | — | 20 min | 4–5 días |

#### Micropigmentación de cejas

| Servicio (ES) | Service (EN) | COP | EUR | CHF | Cita | Resultado |
|---|---|---:|---:|---:|---|---|
| Efecto polvo ★ | Powder brows | 350.000 | 250 | 260 | 2 h | 10 meses–1 año |
| Efecto maquillaje ★ | Makeup-effect brows | 350.000 | 250 | 260 | 2 h | 1–1.5 años |
| Cejas híbridas ★ | Hybrid brows | 400.000 | 330 | 300 | 2 h | Hasta 12 meses |
| Corrección de cejas | Brow correction | — | 280 | — | 2 h | — |
| Refuerzo cejas | Brow touch-up | 150.000 | 100 | 150 | 30 min | — |
| Refuerzo cejas híbridas | Hybrid brow touch-up | 150.000 | 150 | 150 | 30 min | — |

> `Corrección de cejas` lleva nota de origen: *"Disponible en el catálogo de España/Europa." / "Available in the Spain/Europe catalog."* — es el único servicio que **no** está en Colombia.

#### Labios

| Servicio (ES) | Service (EN) | COP | EUR | CHF | Cita | Resultado |
|---|---|---:|---:|---:|---|---|
| Neutralización ★ | Lip neutralization | 420.000 | 300 | 300 | 2 h | Hasta 3 años |
| Microlips ★ | Microlips | 420.000 | 300 | 300 | 2 h | 2–3 años |
| HidraLips (3 sesiones) | HidraLips (3 sessions) | 220.000 | 150 | — | 1 h/sesión | — |
| HidraLips (1 sesión) | HidraLips (1 session) | 90.000 | 60 | — | 1 h | — |
| Refuerzo Microlips | Microlips touch-up | 190.000 | 150 | 180 | 30 min | — |

#### Mirada y pestañas

| Servicio (ES) | Service (EN) | COP | EUR | CHF | Cita | Resultado |
|---|---|---:|---:|---:|---|---|
| Línea de ojos | Eyeliner | 220.000 | 200 | 200 | 2 h | Hasta 1 año |
| Relleno de pestañas | Lash line enhancement | 150.000 | 120 | 180 | 1 h | Hasta 1 año |
| Refuerzo línea de ojos | Eyeliner touch-up | 85.000 | 90 | 100 | 30 min | — |
| Lifting de pestañas | Lash lift | 85.000 | 45 | 75 | 1 h | Hasta 2 meses |

#### Depilación corporal

| Servicio (ES) | Service (EN) | COP | EUR | CHF | Cita |
|---|---|---:|---:|---:|---|
| Depilación de axilas | Underarm waxing | 25.000 | 18 | — | 20 min |
| Depilación de bigote / bozo | Upper lip waxing | 18.000 | 5 | — | 20 min |
| Depilación de nariz | Nose waxing | 8.000 | 7 | — | 20 min |
| Depilación de media pierna | Half-leg waxing | 35.000 | — | — | 20 min |

#### Extensiones de pestañas *(solo Colombia)*

| Servicio (ES) | Service (EN) | COP | Cita | Retoque 15 d / 20 d |
|---|---|---:|---|---|
| Set rímel | Mascara-look lash set | 95.000 | 1 h 30 | 50.000 / 65.000 |
| Volumen ligero | Light volume | 120.000 | 2 h | 60.000 / 80.000 |
| Wispy | Wispy | 120.000 | 1 h 30 | 60.000 / 80.000 |
| Volumen ruso 2D | Russian volume 2D | 145.000 | 2 h | 80.000 / 100.000 |
| Mega volumen | Mega volume | 160.000 | 2 h | 90.000 / 110.000 |
| Volumen aura 2D | Aura volume 2D | 140.000 | 1 h 30 | 70.000 / 90.000 |
| Volumen aura 5D | Aura volume 5D | 150.000 | 1 h 30 | 80.000 / 100.000 |
| Volumen griego 3D | Greek volume 3D | 140.000 | 1 h 30 | 70.000 / 90.000 |
| Volumen griego 5D | Greek volume 5D | 150.000 | 1 h 30 | 80.000 / 100.000 |
| Por punto efecto volumen | Volume clusters | 40.000 | 15 min máx. | — |
| Por punto mega volumen | Mega volume clusters | 50.000 | 15 min máx. | — |

#### Uñas *(solo Colombia)*

| Servicio (ES) | Service (EN) | COP | Cita | Resultado / Retoque |
|---|---|---:|---|---|
| Manicure tradicional | Traditional manicure | 22.000 | 1 h | 8–10 días |
| Pedicure tradicional | Traditional pedicure | 27.000 | 1 h–1 h 20 | 10–15 días |
| Manicure + pedicure | Manicure + pedicure | 45.000 | 3 h | — |
| Manicure semipermanente | Gel manicure | 55.000 | 1–2 h | 20–25 días |
| Pedicure semipermanente | Gel pedicure | 55.000 | 1–2 h | 20–25 días |
| Base rubber | Rubber base | 67.000 | 1–2 h | — |
| Dipping | Dipping powder | 75.000 | 2 h | — |
| Press on | Press-on nails | 100.000 | 2–3 h | Retoque 90.000 |
| Acrílico esculpido | Sculpted acrylic | 140.000 | 3 h 30 | Retoque 100.000 |
| Acrílico cubrimiento | Acrylic overlay | 120.000 | 3 h 30 | Retoque 90.000 |
| Retiro de acrílico | Acrylic removal | 25.000 | 1 h | — |
| Retiro semipermanente | Gel removal | 20.000 | 1 h | — |
| Retiro press on | Press-on removal | 25.000 | 1 h | — |

#### Peinados y maquillaje *(solo Colombia)*

| Servicio (ES) | Service (EN) | COP | Cita | Nota |
|---|---|---:|---|---|
| Maquillaje social | Social makeup | 95.000 | 1 h 30 | Enviar imagen de referencia para valor exacto si aplica |
| Peinado social | Event hairstyling | 45.000 | 30 min | Enviar imagen de referencia para cotizar |
| Trenzas | Braids | 15.000 | 15–25 min aprox. | Cotizar según referencia |

### 2.4 Resumen de cobertura por mercado

- **Colombia · COP — 49 servicios.** Todas las categorías. Único mercado con extensiones de pestañas, uñas, peinados/maquillaje y `media pierna`. No incluye `Corrección de cejas`.
- **España / Europa · EUR — 22 servicios.** Cejas (4), micropigmentación de cejas (6, incluida la exclusiva `Corrección de cejas`), labios (5), mirada y pestañas (4), depilación corporal (3: axilas, bigote, nariz). No: extensiones, uñas, peinados, `media pierna`.
- **Suiza · CHF — 14 servicios.** Cejas (2: laminado, henna), micropigmentación de cejas (5), labios (3: neutralización, microlips, refuerzo microlips), mirada y pestañas (4). No: depilación corporal, extensiones, uñas, peinados, HidraLips ni `Corrección`.

---

## 3. Detalle de servicio — `/servicios/[market]/[service]`

### 3.1 Copy de la plantilla (letra por letra, real)

Todas estas claves existen ya en `ServiceDetail` (ES/EN); `{service}` y `{market}` se interpolan.

| Clave | ES | EN |
|---|---|---|
| `heroEyebrow` | Ficha de servicio | Service details |
| `heroTitle` | {service} en {market} | {service} in {market} |
| `priceLabel` | Precio | Price |
| `appointmentDurationLabel` | Duración de cita | Appointment duration |
| `resultDurationLabel` | Duración del resultado | Result duration |
| `marketLabel` / `categoryLabel` | Mercado / Categoría | Market / Category |
| `descriptionTitle` | Descripción del servicio | Service description |
| `detailsTitle` | Datos rápidos | Quick details |
| `sourceNoteLabel` | Nota | Note |
| `assessmentTitle` | Valoración gratuita por foto | Free photo assessment |
| `assessmentDescription` | Si tienes un procedimiento previo o dudas sobre qué técnica elegir, puedes enviar una foto sin maquillaje por WhatsApp para recibir orientación antes de reservar. | If you have previous work or are unsure which technique fits you best, you can send a makeup-free photo via WhatsApp for guidance before booking. |
| `assessmentLabel` | Pedir valoración | Request assessment |
| `relatedTitle` | Servicios relacionados | Related services |
| `relatedDescription` | Opciones del mismo mercado y categoría que pueden ayudarte a comparar técnica, precio y duración. | Options from the same market and category to compare technique, price and timing. |
| `careTitle` | Prepárate antes y protege el resultado | Prepare beforehand and protect your result |
| `careDescription` | Consulta las recomendaciones confirmadas para preparar la zona antes de la cita y cuidarla después de la micropigmentación. | Read the confirmed guidance for preparing the area before your appointment and caring for it after micropigmentation. |
| `beforeCareLabel` / `afterCareLabel` | Ver preparación antes de la cita / Ver cuidados posteriores | View pre-appointment preparation / View aftercare guidance |
| `contactLabel` / `backToMarketLabel` | Contacta conmigo / Volver al mercado | Contact me / Back to market |
| `whatsappMessage` | Hola, quiero información sobre {service} en {market}. Me gustaría consultar disponibilidad por WhatsApp. | Hello, I would like information about {service} in {market}. I would like to check availability by WhatsApp. |

> `careTitle/careDescription` y `beforeCareLabel/afterCareLabel` solo se muestran si el servicio tiene
> `careGuide` (lo tienen efecto polvo, efecto maquillaje, cejas híbridas, corrección y refuerzos de cejas,
> neutralización, microlips y refuerzo microlips).

### 3.2 Dirección visual V5

- Una sola foto principal grande del resultado/procedimiento **inequívocamente** correspondiente al servicio. Si no existe, no reutilizar una foto engañosa (la clienta señaló desajustes foto↔servicio).
- Bloque de decisión inmediato: precio del mercado, duración de cita, duración de resultado y CTA `Contacta conmigo`.
- `Datos rápidos` puede ir sobre fondo rosa empolvado. **Prohibido**: contador, badge de "más vendido", reviews o % de satisfacción no confirmados.
- `Servicios relacionados`: máximo tres, del **mismo mercado y categoría** (ya es la lógica del dato).
- Si hay `addons` (retoques de pestañas/uñas), mostrarlos como lista clara de extras, no como precio principal.

---

## 4. Reglas específicas de la familia Servicios

1. **Filtrado por mercado obligatorio.** Nunca mostrar un servicio en un mercado donde no tiene `offer`. No inferir EUR/CHF a partir de COP.
2. **Sin disponibilidad.** Quitar "jornadas", "próxima fecha" y "disponibilidad" del copy de mercados; esa información va en redes sociales.
3. **CTA único.** Todo `Contacta conmigo` abre el selector de WhatsApp (Colombia `573167742299`, España/Europa/Suiza `34603804837`). Sin formularios, reservas ni checkout.
4. **Precios desde el dato.** Ningún componente codifica precios; todo sale de `services.ts` vía las query functions.
5. **Bilingüe completo.** Index, plantilla de mercado y plantilla de detalle ya tienen ES/EN; cualquier copy nuevo de la `propuesta V5` se aprueba en ES y se localiza a EN en el mismo cambio.
6. **Color con intención.** Palo de rosa `#B76E79` para regla, bandas suaves, estado activo y CTA; no teñir todas las cards.
7. **Tipografía.** Marcellus para H1/H2 y nombres de servicio; Manrope para precios, duraciones y cuerpo.

## 5. Checklist de aceptación — Servicios

- [ ] El índice abre con `Servicios por país` y los tres países como selector editorial, no tres cards clonadas.
- [ ] Ningún copy de mercado menciona disponibilidad/jornadas.
- [ ] Colombia muestra 49 servicios; España/Europa 22; Suiza 14 (cuadra con el dato).
- [ ] Cada ficha de detalle usa una foto que corresponde realmente al servicio.
- [ ] Precios COP/EUR/CHF se leen tal cual del dato, sin conversiones inventadas.
- [ ] `Servicios relacionados` se limita a mismo mercado + categoría, máximo 3.
- [ ] `scrollWidth === clientWidth` en 390, 430, 768, 1024, 1440 y 1920 px para index, un mercado y un detalle.
- [ ] Selector de idioma conserva la ruta equivalente (`/servicios/colombia` ↔ `/services/colombia`).
- [ ] `lint`, `typecheck`, build y pruebas en verde.

---

## Nota de seguimiento (fuera del alcance de este archivo)

La clienta ya confirmó el **H1 de la home**:
`Micropigmentación Avanzada, Formación Profesional y Jornadas Internacionales`.
Eso desbloquea el "pendiente de cliente" del hero en
[01-home-y-navegacion.md §1](01-home-y-navegacion.md) y debería reflejarse allí (con su localización EN)
cuando se trabaje la home, no en este documento de Servicios.
