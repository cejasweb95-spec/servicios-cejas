# Planificacion web V2 - Cejas Internacionales

Ultima actualizacion: 17/06/2026.

Este documento sustituye como plan principal al primer planteamiento de [analisis-referencias-planteamiento-web.md](analisis-referencias-planteamiento-web.md). El primer documento queda como analisis historico de referencias; esta V2 incorpora la documentacion nueva: transcripcion de catalogos, precios CHF, disponibilidad de Suiza, cursos, PDFs descargables, jornadas por disponibilidad, pagos y reserva solo por WhatsApp.

---

## 1. Objetivo de la web

Crear una web de marca premium, practica y clara para **Cejas Internacionales**, enfocada en:

1. Presentar a Xiomara como especialista y formadora internacional.
2. Mostrar servicios por mercado sin mezclar disponibilidad.
3. Mostrar precios en COP, EUR y CHF segun corresponda.
4. Explicar cada servicio con el texto real de catalogo, duracion de cita y duracion del resultado.
5. Permitir descargar los catalogos PDF y los PDFs de formaciones.
6. Guiar toda conversion a WhatsApp, sin tienda, sin checkout y sin formulario de reserva.
7. Mostrar sede fisica en Cali y proximas jornadas por disponibilidad en Colombia, Espana y Suiza.

---

## 2. Decisiones cerradas

| Tema | Decision |
|---|---|
| Rama principal | No tocar `main` hasta orden final |
| Tipo de web | Web de marca + catalogo + formaciones, sin tienda online |
| CTA principal | `Contacta conmigo` |
| Reserva/cita | Solo por WhatsApp |
| Servicios | Cada servicio se muestra solo donde aplica |
| Mercados | Colombia, Espana/Europa y Suiza |
| Idiomas | Espanol (`es`) e ingles internacional (`en`) |
| Monedas | COP, EUR y CHF |
| Sede fisica | Cali, Valle del Cauca, Colombia |
| Espana | Sin sede fija, solo jornadas |
| Jornadas | Proximas jornadas por disponibilidad |
| WhatsApp | Colombia y Espana visibles; el de Espana sirve tambien como contacto para Europa/Suiza salvo decision posterior |
| FAQ final | No bloquea la planificacion; si se publica, solo con respuestas confirmadas |
| Fotos | Usar las disponibles en el proyecto; la clienta perdio originales |
| Logo | PNG transparente oficial, no pedir SVG |
| Logo monocromo | Versiones blanca y negra ya creadas desde el PNG oficial |
| Color principal | Palo de rosa clasico |
| Tipografia | Marcellus para titulares/display; Manrope para cuerpo/UI |
| Hosting previsto | Hostinger |
| BD/admin | No en V1; preparar estructura para futura migracion a Supabase + `/admin` |
| Pagos Colombia | Efectivo y tarjeta confirmados por usuario; en PDFs de formaciones aparece Sistecredito/financiacion |
| Pagos Espana/Suiza | No publicar metodos concretos si no se confirman; resolver por WhatsApp |
| GA4 / cookies | Usar GA4 con banner de cookies, politica de cookies y Consent Mode; no cargar analitica antes del consentimiento |
| Visual regression | Empezar local; CI queda para cuando la UI y el repositorio esten estables |
| Legal | Crear aviso legal, privacidad y cookies en ES/EN con titular/direccion de Cali y cobertura Colombia + Espana/UE + Suiza |

---

## 3. Fuentes que debe consumir la implementacion

| Fuente | Uso en web |
|---|---|
| [catalogos-contenido-web-transcrito.md](catalogos-contenido-web-transcrito.md) | Descripciones de servicios, notas finales, valoracion gratuita |
| [catalogos-servicios-precios.md](catalogos-servicios-precios.md) | Tabla maestra de servicios y precios por mercado |
| [resumen-servicios-precios-duraciones.md](resumen-servicios-precios-duraciones.md) | Servicio + precio + duracion de cita |
| [duracion-sesiones.md](duracion-sesiones.md) | Fuente de tiempos de agenda |
| [catalogo-suiza-chf.md](catalogo-suiza-chf.md) | Reglas especificas Suiza/CHF |
| [cursos-masterclass.md](cursos-masterclass.md) | Formaciones, temarios, precios, duracion, PDFs |
| [contacto-datos-legales.md](contacto-datos-legales.md) | WhatsApp, email, redes, direccion Cali, NIT |
| [legal-privacidad-cookies-ga4.md](legal-privacidad-cookies-ga4.md) | Aviso legal, privacidad, cookies, GA4 con consentimiento, Consent Mode, SEO multi-pais y reglas hover/focus |
| [ubicaciones-jornadas.md](ubicaciones-jornadas.md) | Mapa y ciudades |
| [bio-xiomara.md](bio-xiomara.md) | Sobre Xiomara |
| [identidad-marca.md](identidad-marca.md) | Logo, color y direccion visual |
| [assets-inventario.md](assets-inventario.md) | Seleccion de imagenes y PDFs |
| [cuidados-micropigmentacion.md](cuidados-micropigmentacion.md) | Cuidados de cejas/labios |
| [arquitectura-tecnica-hostinger-futura-db.md](arquitectura-tecnica-hostinger-futura-db.md) | Framework, Hostinger, datos locales, futura BD Supabase/admin |
| [i18n-es-en-plan.md](i18n-es-en-plan.md) | Plan bilingue ES/EN, rutas localizadas, traduccion profesional, hreflang y QA bilingue |
| [frontend-ui-ux-detalle.md](frontend-ui-ux-detalle.md) | Diseño frontend, UI/UX, componentes, responsive y animaciones |
| [frontend-ui-ux-v3-profesional.md](frontend-ui-ux-v3-profesional.md) | Plan UI/UX profesional ampliado: anti-IA, shadcn, Motion, secciones y checklist web |
| [skills-auditoria-adaptacion.md](skills-auditoria-adaptacion.md) | Auditoría de skills, adaptación local, skills faltantes y flujo por fases |
| [seo-desde-inicio-estrategia.md](seo-desde-inicio-estrategia.md) | SEO desde arquitectura: SERP research, competidores, herramientas, Search Console/GA4 y estrategia por páginas |
| [testing-qa-profesional.md](testing-qa-profesional.md) | QA técnico, Playwright E2E, cross-browser, Lighthouse/PageSpeed, links, PDFs y mapa |
| [reglas-agentes-proyecto.md](reglas-agentes-proyecto.md) | Reglas compartidas para Codex, Cursor y Claude Code |
| [analisis-prototipos-stitch-figma-claude.md](analisis-prototipos-stitch-figma-claude.md) | Auditoria de prototipos generados por AI Studio/Figma/Claude y riesgos a evitar |
| [README-implementacion.md](README-implementacion.md) | Punto de entrada para empezar implementacion |
| [implementacion-fases/README.md](implementacion-fases/README.md) | Indice de fases separadas, forma de tachar checklists y flujo de trabajo |
| [implementacion-fases/CHECKLIST-MAESTRA.md](implementacion-fases/CHECKLIST-MAESTRA.md) | Estado global de fases y QA transversal |
| [implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md](implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md) | Matriz de Motion/Framer Motion por pagina, fase, componente y QA |
| [implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md](implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md) | Sistema de reutilizacion para botones, tabs, tablas/listas, cards, CTAs, dialogs y componentes de dominio |
| [implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md](implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md) | Workflow SEO senior: SERP/competencia, keyword map, briefs, auditoria final y Search Console |
| [implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md](implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md) | Matriz QA senior: smoke, regression, E2E, visual regression, trace viewer, WAVE/axe, Lighthouse, links, i18n y security headers |
| [implementacion-fases/QA-ANALISIS-PREIMPLEMENTACION-2026-06-17.md](implementacion-fases/QA-ANALISIS-PREIMPLEMENTACION-2026-06-17.md) | Auditoria previa a codigo, recomendaciones de arranque y dudas no bloqueantes |
| [implementacion-v1-plan-operativo.md](implementacion-v1-plan-operativo.md) | Fases, carpetas, reglas de datos, PDFs, WhatsApp, i18n y QA |
| [implementacion-v1-checklist.md](implementacion-v1-checklist.md) | Checklist accionable por fase |

---

## 4. Arquitectura final recomendada

```txt
/es
/en
/es/sobre-xiomara
/en/about-xiomara
/es/servicios
/en/services
/es/servicios/colombia
/en/services/colombia
/es/servicios/espana-europa
/en/services/spain-europe
/es/servicios/suiza
/en/services/switzerland
/es/servicios/[slug]
/en/services/[slug]
/es/resultados
/en/results
/es/jornadas
/en/appointments-by-city
/es/formaciones
/en/trainings
/es/formaciones/[slug]
/en/trainings/[slug]
/es/cuidados
/en/care
/es/preguntas-frecuentes
/en/faqs
/es/contacto
/en/contact
/es/descargas
/en/downloads
/es/aviso-legal
/en/legal-notice
/es/privacidad
/en/privacy
/es/cookies
/en/cookies
```

### Navegacion principal

| Item | Destino | Motivo |
|---|---|---|
| Inicio | `/` | Entrada emocional y resumen |
| Servicios | `/servicios` | Catalogo por mercado |
| Resultados | `/resultados` | Prueba visual |
| Jornadas | `/jornadas` | Mapa y disponibilidad |
| Formaciones | `/formaciones` | Cursos con PDFs |
| Cuidados | `/cuidados` | Confianza y preparacion |
| Contacto | `/contacto` | WhatsApp, email, redes |

En desktop, `Contacta conmigo` debe ir como CTA visible en header. En movil, usar boton fijo inferior o drawer compacto con los dos WhatsApp.

### Idioma

La navegacion debe incluir selector `ES / EN`. El cambio de idioma debe conservar la pagina equivalente cuando exista. El contenido fuente es espanol, pero la version inglesa debe ser localizacion profesional, no traduccion literal.

---

## 5. Direccion visual V2

### Voz visual

La marca debe sentirse como:

- **Precisa:** servicios, precios, duraciones y mercados claros.
- **Calida:** trato cercano, WhatsApp, valoracion por foto.
- **Internacional:** mapa editorial, jornadas, trayectoria Colombia/Espana/Suiza.
- **Profesional:** bio, certificados, cabina, formaciones.

### Color

| Token | Color base | Uso |
|---|---|---|
| Primary / palo de rosa | `#B76E79` | CTA, pins de mapa, acentos |
| Primary hover | `#7F3F4A` | Hover, titulares puntuales, contraste |
| Primary soft | `#E8C7CC` | Bandas suaves, fondos controlados |
| Foreground / negro tinta | `#1A1A1A` | Texto principal |
| Surface / blanco limpio | `#FFFFFF` / `#FBF8F7` | Fondos |
| Border | `#E6D8DA` | Bordes suaves derivados |

La paleta visible de marca es palo de rosa, blanco y negro. Los derivados son tokens tecnicos para hover, fondos, bordes y estados; no deben presentarse como nuevos colores de marca.

Implementar con tokens semanticos editables. No usar hexadecimales sueltos en componentes.

Gradientes y sombras tambien deben ser tokens (`--gradient-brand-soft`, `--gradient-brand-deep`, `--shadow-soft`) para poder cambiarlos globalmente.

Evitar que toda la web sea rosa. El palo de rosa debe verse como firma, no como relleno constante.

### Tipografia

Decision recomendada:

- Titulares/display: **Marcellus**.
- Cuerpo, UI, precios, tablas, botones y navegacion: **Manrope**.
- Script: solo logo, nunca parrafos ni decoracion repetida.

Razon: Marcellus da un tono premium/femenino sin caer en plantilla generica, y Manrope mantiene legibilidad en catalogos, precios y comparativas. Implementar con `next/font/google`.

### Logo

- Principal: `assets-extraidos/logo-oficial-sin-fondo.png`.
- Monocromo negro: `assets-extraidos/logo-oficial-negro-monocromo.png`.
- Monocromo blanco: `assets-extraidos/logo-oficial-blanco.png`.
- No pedir SVG/AI; el PNG transparente tiene resolucion suficiente para web.

### Imagenes

La web debe usar fotografia real. Prioridades:

1. Hero: Xiomara con globo terraqueo o retrato profesional fuerte.
2. Sobre mi: uniforme/cabina/certificados.
3. Servicios: resultados reales limpios.
4. Resultados: cicatrizados y antes/despues cuando existan.
5. Formaciones: portadas/imagenes de PDFs o fotos profesionales si se ven limpias.

---

## 6. Modelo de datos recomendado

### Servicio

```ts
type Market = "colombia" | "espana-europa" | "suiza";

type Service = {
  slug: string;
  name: string;
  category:
    | "cejas"
    | "labios"
    | "mirada"
    | "pestanas"
    | "depilacion"
    | "unas"
    | "peinados-maquillaje";
  markets: Market[];
  prices: {
    cop?: string;
    eur?: string;
    chf?: string;
  };
  appointmentDuration: string;
  resultDuration?: string;
  description: string;
  notes?: string[];
  source: {
    pdf: string;
    page?: number;
    md: string;
  };
  downloadableCatalogs: Market[];
  whatsappMessage: string;
};
```

### Mercado

```ts
type MarketConfig = {
  id: Market;
  label: string;
  currency: "COP" | "EUR" | "CHF";
  whatsappTarget: "colombia" | "espana";
  catalogPdf: string;
  availabilityNote: string;
};
```

Reglas:

- Colombia: WhatsApp Colombia, COP, sede fisica Cali.
- Espana/Europa: WhatsApp Espana, EUR, jornadas.
- Suiza: WhatsApp Espana salvo confirmacion de numero propio, CHF, jornadas en Ginebra.

### Ubicacion

```ts
type Location = {
  country: "Colombia" | "España" | "Suiza";
  city: string;
  region?: string;
  type: "sede-fisica" | "proxima-jornada-disponibilidad";
  coordinates: [number, number];
  whatsappTarget: "colombia" | "espana";
};
```

### Evento / jornada / fecha de curso

```ts
type EventSlot = {
  id: string;
  type: "jornada" | "curso";
  title: string;
  market: Market;
  locationSlug: string;
  relatedCourseSlug?: string;
  startDate?: string;
  endDate?: string;
  displayDateLabel: string;
  status: "draft" | "availability" | "open" | "full" | "completed" | "cancelled";
  whatsappTarget: "colombia" | "espana";
};
```

Regla V1: si no hay fecha exacta, usar `displayDateLabel: "Proxima jornada por disponibilidad"` y CTA a WhatsApp. Esto deja preparada la web para anadir fechas de cursos, proxima visita a Suiza, Palma de Mallorca, Madrid, Puerto de Sagunto, Restrepo o Ginebra sin redisenar componentes.

### Curso

```ts
type Course = {
  slug: string;
  name: string;
  duration: "1 dia" | "3 dias";
  type: "curso-profesional" | "masterclass";
  markets: ("colombia" | "espana-europa")[];
  modalities: ("virtual" | "presencial" | "personalizada")[];
  prices: {
    colombia?: Record<string, string>;
    espana?: Record<string, string>;
  };
  includes: string[];
  syllabus: string[];
  pdfPath: string;
  paymentNotes?: string[];
  warningNotes?: string[];
};
```

---

## 7. Paginas y UI por seccion

## 7.1 Home `/`

### Seccion 1 - Hero

**Objetivo:** que en 5 segundos se entienda quien es, que hace y donde atiende.

UI:

- Fondo con foto real de Xiomara, preferiblemente globo terraqueo o retrato profesional.
- Header transparente sobre hero que pasa a solido al hacer scroll.
- Logo oficial en PNG.
- H1 orientativo: `Cejas Internacionales`.
- Subheadline: micropigmentacion, belleza y formacion con sede en Cali y jornadas internacionales.
- CTA principal: `Contacta conmigo`.
- CTA secundario: `Ver servicios`.
- Microselector de mercado: Colombia / Espana-Europa / Suiza.

Contenido visible:

- `Sede en Cali`
- `Jornadas por disponibilidad en Colombia, España y Suiza`
- `Valoracion gratuita por foto sin maquillaje`

Interaccion:

- Al pulsar `Contacta conmigo`, abrir `WhatsAppChooser`.
- Al elegir mercado, llevar a la seccion de servicios filtrada o a la ruta del mercado.

### Seccion 2 - Selector "Elige tu mercado"

UI:

- Tres bloques horizontales en desktop, stacked en movil.
- Cada bloque con pais/region, moneda, WhatsApp recomendado y acceso a catalogo.

| Mercado | UI | CTA |
|---|---|---|
| Colombia | COP, sede Cali, catalogo completo | Ver servicios Colombia |
| Espana/Europa | EUR, jornadas por disponibilidad | Ver servicios Espana |
| Suiza | CHF, jornadas Ginebra | Ver servicios Suiza |

No usar tarjetas genericas repetidas sin jerarquia; puede ser una banda tipo selector con borde inferior animado y foto/contexto lateral.

### Seccion 3 - Servicios principales

UI:

- Tabs por familia: Cejas, Labios, Mirada, Pestañas.
- Mostrar 4-6 servicios principales, no todo el catalogo.
- Cada item debe mostrar:
  - nombre
  - descripcion corta del catalogo
  - precio desde / precio por mercado
  - duracion de cita
  - duracion del resultado si existe
  - CTA `Consultar por WhatsApp`

Regla:

- Uñas, peinados y extensiones solo aparecen si el selector esta en Colombia.
- HidraLips y depilaciones no aparecen en Suiza.

### Seccion 4 - Valoracion gratuita

UI:

- Bloque propio, no solo FAQ.
- Mensaje: si tienes procedimiento de otro lugar o dudas sobre que tecnica elegir, envia foto sin maquillaje para valoracion gratuita.
- Dos botones WhatsApp:
  - Colombia
  - Espana/Europa/Suiza

Motivo:

Este mensaje aparece en catalogos y es una objecion/conversion fuerte.

### Seccion 5 - Mapa editorial internacional

UI:

- Mapa editorial, no iframe.
- Cali con marcador especial `Sede fisica`.
- Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra como `Proxima jornada por disponibilidad`.
- Lineas sutiles palo de rosa desde Cali hacia las ciudades.
- Lista textual accesible debajo o al lado.

Interaccion:

- Hover/tap en pin abre panel con ciudad, tipo, mercado y CTA WhatsApp.
- En movil, primero lista y luego mini mapa.
- Con reduced motion: sin lineas animadas.

### Seccion 6 - Resultados reales

UI:

- Galeria editorial, con pocas imagenes fuertes.
- Filtros: Cejas, Labios, Mirada, Cicatrizados.
- No abusar de capturas de stories; recortar cuando sea necesario.
- Cada imagen con alt text util.

### Seccion 7 - Sobre Xiomara

UI:

- Foto de cabina/certificados o retrato.
- Texto breve con experiencia, mas de 5 anos, cerca de 2.000 procedimientos si se aprueba final.
- CTA: `Conoce mi trayectoria`.

### Seccion 8 - Formaciones

UI:

- Diferenciar `Cursos profesionales` y `Masterclass`.
- Mostrar 5 formaciones:
  - Micropigmentacion de cejas
  - Micropigmentacion y neutralizacion labial
  - Laminado de cejas
  - Lifting de pestañas
  - Cejas en henna
- Cada curso con duracion, modalidades, precio desde y descarga PDF.

### Seccion 9 - Cuidados

UI:

- Dos accesos: Cejas / Labios.
- Texto corto de preparacion y postcuidado.
- CTA a pagina completa.

### Seccion 10 - Contacto final

UI:

- Dos WhatsApp claramente diferenciados.
- Email.
- Redes.
- Direccion Cali.
- Texto: `Las citas y reservas se gestionan por WhatsApp.`

---

## 7.2 Servicios `/servicios`

### Objetivo

Ser el centro del catalogo web sin sentirse como tabla pesada.

### UI general

- Header de pagina con titulo `Servicios`.
- Selector fijo/visible de mercado:
  - Colombia
  - Espana/Europa
  - Suiza
- Filtros por categoria.
- Acceso a descargar catalogo PDF del mercado seleccionado.
- Buscador opcional por nombre de servicio.

### Estructura de cada servicio

Cada item debe mostrar:

| Elemento | Fuente |
|---|---|
| Nombre | catalogos/transcripcion |
| Descripcion | `catalogos-contenido-web-transcrito.md` |
| Precio | `catalogos-servicios-precios.md` |
| Duracion de cita | `duracion-sesiones.md` |
| Duracion del resultado | catalogo transcrito |
| Mercado | reglas por pais |
| CTA | WhatsApp con mensaje prellenado |

### Patron visual recomendado

No usar una parrilla interminable de cards identicas. Mejor:

- Familias en bandas.
- Dentro de cada familia, lista premium con imagen lateral opcional.
- Precio/duracion en columna fija.
- CTA compacto.
- En movil, acordeones por categoria.

### Mensaje de descarga

`Tambien puedes descargar el catalogo completo en PDF. El contenido de la web esta actualizado segun mercado y disponibilidad.`

---

## 7.3 Servicios por mercado

### `/servicios/colombia`

Debe mostrar:

- Cejas
- Micropigmentacion cejas
- Labios
- Mirada/ojos
- Pestañas
- Extensiones de pestañas
- Depilacion corporal
- Uñas
- Peinados y maquillaje

UI especial:

- Sede Cali destacada.
- WhatsApp Colombia como CTA principal.
- Pagos: efectivo y tarjeta; formaciones con Sistecredito/financiacion cuando aplique.
- Descargar catalogo Colombia PDF.

### `/servicios/espana-europa`

Debe mostrar:

- Cejas
- Depilacion cejas/corporal disponible en catalogo EUR
- Micropigmentacion cejas
- Correccion de cejas
- Labios
- HidraLips
- Mirada/ojos
- Lifting
- Refuerzos

No mostrar:

- Uñas
- Peinados/maquillaje
- Extensiones de pestañas Colombia
- Sede fisica

UI especial:

- Mensaje `Atencion por proximas jornadas por disponibilidad`.
- WhatsApp Espana.
- Descargar catalogo Espana PDF.

### `/servicios/suiza`

Debe mostrar:

- Sombreado en henna
- Laminado
- Lifting
- Neutralizacion
- Microlips
- Efecto polvo
- Efecto maquillaje
- Cejas hibridas / pelo a pelo
- Linea de ojos
- Relleno de pestañas
- Refuerzos: cejas, cejas hibridas, Microlips, linea de ojos

No mostrar:

- HidraLips
- Depilaciones
- Uñas
- Peinados/maquillaje
- Extensiones de pestañas Colombia
- Correccion de cejas, salvo confirmacion futura

UI especial:

- Mensaje `Ginebra - proxima jornada por disponibilidad`.
- Moneda CHF.
- WhatsApp Espana como contacto recomendado, salvo decision posterior.
- Descargar catalogo Suiza PDF.

---

## 7.4 Pagina de detalle de servicio `/servicios/[slug]`

No todos los servicios necesitan indexarse desde el primer dia, pero el modelo debe permitirlo.

### Layout

1. Breadcrumb.
2. Hero pequeño con nombre, categoria y mercados disponibles.
3. Bloque de precio por mercado.
4. Bloque de duracion:
   - `Duracion de cita`
   - `Duracion del resultado`
5. Descripcion completa del catalogo.
6. Para quien es ideal.
7. Cuidados relacionados si aplica.
8. Valoracion gratuita por foto.
9. Servicios relacionados.
10. CTA WhatsApp.

### Mensajes prellenados de WhatsApp

Ejemplo:

```txt
Hola, quiero informacion sobre [servicio] en [mercado]. Me gustaria saber disponibilidad para una cita.
```

Para valoracion:

```txt
Hola, quiero una valoracion gratuita por foto para saber que procedimiento es mejor para mi.
```

---

## 7.5 Sobre Xiomara `/sobre-xiomara`

### Objetivo

Construir confianza personal y autoridad profesional.

### Secciones

1. Hero con retrato profesional.
2. Bio resumida.
3. Trayectoria:
   - mas de 5 anos
   - cerca de 2.000 procedimientos si se aprueba publicarlo
   - Colombia, Espana, Suiza
4. Filosofia de trabajo:
   - resultados naturales
   - seguridad
   - personalizacion
5. Cabina/certificados.
6. Formadora:
   - cursos profesionales
   - masterclass
7. CTA final a WhatsApp.

UI:

- Evitar una biografia larga sin ritmo.
- Alternar fotos reales y texto.
- Usar citas cortas o frases de enfoque profesional.

---

## 7.6 Resultados `/resultados`

### Objetivo

Mostrar evidencia visual real.

### UI

- Filtros: Cejas, Labios, Mirada, Pestañas, Uñas, Cicatrizados.
- Modo grid editorial con imagenes de diferentes proporciones.
- Al abrir imagen: modal ligero con categoria, mercado si se conoce y nota si es cicatrizado.
- Texto educativo: resultado recien hecho vs cicatrizado.

### Cuidado

- No ampliar demasiado imagenes comprimidas.
- Recortar UI de stories cuando sea posible.
- Priorizar fotos profesionales y resultados limpios.

---

## 7.7 Jornadas `/jornadas`

### Objetivo

Resolver donde atiende sin inventar sedes.

### Secciones

1. Intro: `Sede en Cali y proximas jornadas por disponibilidad`.
2. Mapa editorial.
3. Lista de ubicaciones:

| Ubicacion | Tipo | CTA |
|---|---|---|
| Cali, Valle del Cauca | Sede fisica | WhatsApp Colombia |
| Restrepo, Valle del Cauca | Proxima jornada por disponibilidad | WhatsApp Colombia |
| Madrid | Proxima jornada por disponibilidad | WhatsApp Espana |
| Palma de Mallorca | Proxima jornada por disponibilidad | WhatsApp Espana |
| Puerto de Sagunto, Valencia | Proxima jornada por disponibilidad | WhatsApp Espana |
| Ginebra | Proxima jornada por disponibilidad | WhatsApp Espana |

4. Bloque `Consulta disponibilidad`.
5. Nota: `Las fechas se confirman por WhatsApp.`

### Fechas futuras

Cada ciudad debe estar preparada para recibir un `EventSlot` con fecha real, cupos y estado cuando la clienta los confirme. Mientras no haya fecha exacta, mostrar:

- Estado: `Proxima jornada por disponibilidad`.
- CTA: `Contacta conmigo`.
- Mensaje WhatsApp prellenado segun ciudad.

### Mapa

- SVG/React con coordenadas reales.
- Sin Google Maps embebido en home.
- En contacto se puede enlazar a Google Maps solo para Cali.

---

## 7.8 Formaciones `/formaciones`

### Objetivo

Vender autoridad y captar alumnas sin checkout.

### UI

- Hero con enfoque de academia/formadora.
- Tabs:
  - Cursos profesionales
  - Masterclass
- Cada curso:
  - nombre
  - duracion
  - modalidades
  - precios Colombia/Espana
  - incluye
  - temario resumido
  - descarga PDF
  - CTA WhatsApp

### Cursos profesionales

1. Micropigmentacion de cejas.
2. Micropigmentacion y neutralizacion labial.

Cada uno:

- 3 dias.
- Dia 1 teoria.
- Dia 2 practica.
- Dia 3 modelo real.
- Doble certificado.
- Kit segun modalidad.
- Acompanamiento por un ano.
- Grupo VIP de WhatsApp.
- Marketing, fotografia y negocio.

### Masterclass

1. Laminado de cejas.
2. Lifting de pestañas.
3. Cejas en henna.

Cada una:

- 1 dia.
- Virtual o presencial.
- Certificado.
- Kit cuando aplica.
- PDF descargable.

### Fechas, cupos y proximas ediciones

- En V1 mostrar CTA `Consultar por WhatsApp` / `Contacta conmigo`.
- Preparar cada curso para mostrar una proxima fecha cuando exista.
- Si no hay fecha confirmada, usar etiqueta `Proxima fecha por disponibilidad`.
- Los cursos presenciales pueden vincularse a las mismas ciudades de jornadas: Cali, Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra, segun disponibilidad confirmada.
- No inventar fechas, cupos ni requisitos: publicar solo cuando la clienta los confirme.

### Pagos / financiacion

- Mostrar para Colombia: efectivo y tarjeta.
- En formaciones, mencionar Sistecredito/financiacion solo donde el PDF lo respalda.
- No publicar promesas de ingresos de los PDFs como garantia. Si se mencionan, hacerlo con disclaimer.

---

## 7.9 Detalle de formacion `/formaciones/[slug]`

### Layout

1. Hero del curso.
2. Resumen: duracion, modalidad, certificado, mercado.
3. Precios por pais/modalidad.
4. Que aprenderas.
5. Que incluye.
6. Estructura por dias si es curso profesional.
7. PDF descargable.
8. Aviso de cupos limitados si se mantiene del PDF.
9. CTA WhatsApp para inscripcion.

### WhatsApp prellenado

```txt
Hola, quiero informacion sobre la formacion [nombre del curso]. Me interesa saber fechas, cupos y modalidad.
```

---

## 7.10 Cuidados `/cuidados`

### Objetivo

Reducir dudas y demostrar criterio profesional.

### UI

- Tabs o secciones:
  - Antes de micropigmentacion de cejas
  - Despues de micropigmentacion de cejas
  - Antes de micropigmentacion de labios
  - Despues de Microlips/labios
- Descarga futura opcional: guia simple de cuidados.
- CTA: consultar si tienes dudas antes de la cita.

### No publicar aun

- Cuidados de linea de ojos si no estan documentados.
- Politicas medicas no confirmadas.

---

## 7.11 Preguntas frecuentes `/preguntas-frecuentes`

### Criterio actual

El FAQ final no bloquea y no se deben inventar respuestas.

### Publicar solo si se usa con preguntas confirmadas

Preguntas publicables:

- Que es la micropigmentacion.
- Cuanto dura el resultado.
- Cuanto dura la cita.
- Como prepararme antes.
- Que cuidados seguir despues.
- Cuanto cuesta.
- Hay valoracion gratuita.
- Puedo enviar foto si tengo trabajo previo.
- Como reservo: por WhatsApp.

Ocultar/no publicar hasta confirmacion:

- Dolor/anestesia.
- Higiene/material desechable.
- Embarazo/lactancia.
- Contraindicaciones.
- Formas de pago concretas fuera de Colombia.
- Domicilio.
- Antelacion de reserva.

---

## 7.12 Contacto `/contacto`

### Objetivo

Que nadie dude de como contactar y no inventar sedes.

### UI

1. Header: `Contacta conmigo`.
2. Selector:
   - Colombia
   - Espana/Europa/Suiza
3. WhatsApp Colombia.
4. WhatsApp Espana.
5. Email corporativo.
6. Redes: Instagram, Facebook, TikTok.
7. Direccion fisica/legal de Cali.
8. Enlace externo a Google Maps de Cali.
9. Nota: `Las citas y reservas se gestionan por WhatsApp.`

### Footer global

Debe incluir:

- Logo.
- Direccion Cali.
- NIT.
- Email.
- WhatsApp Colombia/Espana.
- Redes.
- Enlaces legales.

---

## 7.13 Descargas `/descargas`

### Objetivo

Centralizar PDFs sin depender de que la usuaria navegue por todo.

### PDFs de catalogos

- Catalogo Colombia COP.
- Catalogo Espana EUR.
- Catalogo Suiza CHF.

### PDFs de formaciones

- Curso micropigmentacion de cejas.
- Curso micropigmentacion y neutralizacion labial.
- Masterclass laminado de cejas.
- Masterclass lifting de pestañas.
- Masterclass cejas en henna.

### UI

- Agrupar por `Catalogos` y `Formaciones`.
- Cada descarga con peso de archivo si se calcula.
- Boton secundario `Consultar por WhatsApp`.

---

## 8. WhatsApp: patron recomendado

### Componente `WhatsAppChooser`

Debe aparecer:

- En header CTA.
- En hero.
- En pagina de servicio.
- En formaciones.
- En contacto.
- En valoracion gratuita.

### UI

Modal o popover simple:

| Opcion | Texto | Numero |
|---|---|---|
| Colombia | Para sede Cali y servicios Colombia | `573167742299` |
| Espana / Europa / Suiza | Para jornadas y consultas internacionales | `34603804837` |

### Mensajes prellenados

Servicios:

```txt
Hola, quiero informacion sobre [servicio] en [mercado]. Quiero consultar disponibilidad por WhatsApp.
```

Jornadas:

```txt
Hola, quiero consultar disponibilidad para una proxima jornada en [ciudad].
```

Formaciones:

```txt
Hola, quiero informacion sobre [curso]. Me interesa saber fechas, cupos y modalidad.
```

Valoracion:

```txt
Hola, quiero una valoracion gratuita por foto sin maquillaje.
```

---

## 9. Backend y arquitectura tecnica

### Estado actual del repo

En `develop` no hay `package.json`, `app/`, `src/` ni `next.config.ts` como fuente editable en la raiz. Los artefactos generados `.next`, `node_modules` y `tsconfig.tsbuildinfo` ya fueron limpiados. Cuando empiece frontend, crear una app Next.js limpia y mover ahi contenido, assets y modelos.

### Recomendacion V2

No usar backend complejo en V1, pero estructurar el proyecto como si los datos vinieran de una BD/CMS.

Usar:

- Next.js App Router.
- TypeScript.
- Tailwind CSS v4.
- `next-intl` para i18n ES/EN.
- Motion/Framer Motion para animaciones.
- Datos estructurados en archivos `.ts`, validados con Zod.
- `next/font/google` para Marcellus + Manrope.
- MD/MDX solo si se quiere contenido largo editable.
- PDFs en carpeta publica (`public/descargas` o equivalente).
- Imagenes optimizadas en `public` o con pipeline de Next Image.
- Capa interna de queries: `getServicesByMarket()`, `getCourses()`, `getEvents()`, `getDownloads()`.
- Capa de traducciones/localizacion: no hardcodear textos publicos dentro de componentes.

Documento tecnico completo: [arquitectura-tecnica-hostinger-futura-db.md](arquitectura-tecnica-hostinger-futura-db.md).

### Hosting

- Hosting previsto: Hostinger.
- Recomendacion: usar Hostinger con soporte Node.js para no limitar SSR/API/futura evolucion.
- Evitar depender de export estatico si ya sabemos que en el futuro puede existir admin, fechas editables o datos dinamicos.
- La futura BD/admin sera con Supabase: Hostinger aloja la web y Supabase gestiona Postgres, Auth y Storage.

### Preparacion para futura BD/admin

La V1 debe tener entidades equivalentes a una futura BD:

- mercados
- servicios
- categorias
- precios por mercado
- ubicaciones
- jornadas/eventos
- cursos
- ofertas/precios de cursos
- descargas/PDFs
- imagenes/media
- WhatsApp targets
- redes sociales
- pagos
- SEO por pagina
- ajustes globales

### No implementar en V1

- Tienda.
- Checkout.
- Carrito.
- Formulario de reserva.
- CMS.
- Calendario editable.
- Google Maps embebido con cookies si no hace falta.

### Preparar para V2 futura

Si la clienta cambia fechas/precios con frecuencia o quiere editar sin tocar codigo:

- Supabase como base de datos, Auth y Storage.
- `/admin` dentro de Next.js para editar servicios, precios, cursos, jornadas, descargas, SEO y contactos.
- Server Actions o Route Handlers para mutaciones protegidas.
- Row Level Security en Supabase para proteger operaciones privadas.
- Estados de jornada: disponibilidad, abierta, completa, realizada, cancelada.
- Panel de descargas editable.
- Usuarios/roles y auditoria si se hace admin serio.

---

## 10. SEO

SEO no se deja para el final. La estrategia fina se refinara antes de publicar, pero la UI y la arquitectura deben nacer SEO-safe:

- Contenido principal en HTML rastreable, no solo client-side.
- URLs limpias por mercado, servicio, curso y jornada.
- H1 unico por pagina y jerarquia de headings real.
- Metadata preparada por ruta desde la primera implementacion.
- Imagenes con dimensiones estables, `alt` util y assets sociales.
- `robots.ts`, `sitemap.ts`, canonical y schema planificados desde V1.
- Core Web Vitals como presupuesto de diseno: LCP, CLS e INP se revisan desde staging.
- La investigacion de SERP y competidores se documenta en [seo-desde-inicio-estrategia.md](seo-desde-inicio-estrategia.md).
- i18n SEO: cada pagina publica debe tener version ES/EN, metadata localizada, canonical por idioma, alternates/hreflang y sitemap localizado. Ver [i18n-es-en-plan.md](i18n-es-en-plan.md).

### Paginas prioritarias

| Ruta | Intencion |
|---|---|
| `/servicios/colombia` | Servicios belleza Cali / Cejas Internacionales Colombia |
| `/servicios/espana-europa` | Micropigmentacion por jornadas Espana |
| `/servicios/suiza` | Micropigmentacion Ginebra / Suiza por jornada |
| `/servicios/micropigmentacion-cejas` | Servicio principal |
| `/servicios/micropigmentacion-labios` | Servicio principal |
| `/formaciones/micropigmentacion-cejas` | Curso principal |
| `/formaciones/micropigmentacion-labios` | Curso principal |
| `/jornadas` | Jornadas Colombia, Espana y Suiza |
| `/cuidados` | Contenido informativo |

### Schema

- `BeautySalon` / `LocalBusiness` para Cali.
- `Course` para formaciones.
- `FAQPage` solo si se publican preguntas confirmadas.
- `BreadcrumbList`.
- `ImageObject` en resultados seleccionados.

### Cuidado SEO/legal

- No crear sedes falsas en Espana o Suiza.
- No prometer ingresos por formaciones.
- No publicar metodos de pago no confirmados por pais.
- No publicar FAQ sensible sin respuesta de la clienta.

---

## 11. QA y pruebas

Plan detallado: [testing-qa-profesional.md](testing-qa-profesional.md).

### QA de datos

| Prueba | Criterio |
|---|---|
| Colombia | Muestra servicios COP y servicios exclusivos de Colombia |
| Espana/Europa | No muestra uñas/extensiones/peinados Colombia |
| Suiza | No muestra HidraLips ni depilaciones |
| Suiza | Refuerzo cejas hibridas aparece a 150 CHF |
| Duracion | Se distingue cita vs resultado |
| PDFs | Todos descargan correctamente |
| WhatsApp | Mensajes abren al numero correcto |
| Jornadas | Cali no se confunde con jornadas; resto no se confunde con sedes |
| Idiomas | Cada pagina publica existe en ES y EN sin mezclar textos |

### QA visual

- 360, 390, 430 px movil.
- 768, 834 px tablet.
- 1280, 1440, 1920 px desktop.
- Verificar que textos de botones no se cortan.
- Verificar mapa en movil como lista accesible.
- Verificar contraste palo de rosa/blanco.
- Verificar imagenes reales sin pixelacion excesiva.

### QA accesibilidad

- Navegacion por teclado.
- Foco visible.
- Mapa con lista textual equivalente.
- Acordeones con `aria-expanded`.
- Alt text util para resultados.
- `prefers-reduced-motion`.
- Contraste AA.

### QA tecnico

```txt
npm run lint
npm run typecheck
npm run build
npm run test
```

Pruebas Playwright recomendadas:

- Navegar home.
- Cambiar mercado.
- Abrir servicio.
- Descargar PDF.
- Abrir WhatsApp link.
- Abrir mapa/lista de jornadas.
- Abrir formacion y descarga.
- Cambiar idioma ES/EN y conservar ruta equivalente.

---

## 12. Fases recomendadas

### Fase 1 - Datos y estructura

- Crear data model de servicios, mercados, cursos, ubicaciones y descargas.
- Crear data model de jornadas/eventos para futuras fechas y cupos.
- Crear capa de queries internas para no acoplar componentes a archivos JSON/TS.
- Validar datos con Zod antes de build/deploy.
- Copiar PDFs a carpeta publica.
- Seleccionar imagenes base.
- Definir mensajes WhatsApp prellenados.

### Fase 2 - UI base

- Sistema visual palo de rosa/blanco/negro con tokens semanticos editables.
- Componentes base reutilizables: Button, Container, Section, Tabs, DataTable, ServiceCard, CourseCard, DownloadCard, WhatsAppChooser.
- Botones con ancho automatico por defecto; `w-full` solo en movil o casos justificados.
- Header/footer.
- Home.
- Selector de mercado.
- WhatsAppChooser.

### Fase 3 - Catalogo

- `/servicios`.
- Rutas de mercado.
- Detalle de servicio si se prioriza.
- Descarga de catalogos.

### Fase 4 - Confianza y marca

- Sobre Xiomara.
- Resultados.
- Jornadas/mapa.
- Cuidados.

### Fase 5 - Formaciones

- `/formaciones`.
- Detalle por curso.
- PDFs descargables.
- CTA WhatsApp.

### Fase 6 - QA y staging

- Responsive.
- Accesibilidad.
- SEO.
- Performance.
- Validacion de datos.
- Deploy staging.

### Fase final

Solo cuando el usuario lo indique: preparar integracion/publicacion final en `main`.

---

## 13. Dudas reales que quedan

No bloquean la arquitectura ni el diseno base, pero afectan a contenido final:

| Duda | Impacto | Decision provisional |
|---|---|---|
| Pagos Espana/Suiza | Si se publican metodos concretos | Resolver por WhatsApp |
| Correccion de cejas en Suiza | Servicio no aparece en PDF CHF | Mantener fuera de Suiza |
| Fechas/cupos de formaciones | Inscripcion concreta | CTA WhatsApp |
| Requisitos/certificados de cursos | Legalidad y expectativas | Usar PDF + consultar por WhatsApp |
| Seleccion final de fotos | Calidad visual | Usar mejores del inventario |
| FAQ sensible | Seguridad/contraindicaciones | No publicar si no esta confirmado |

---

## 14. Decision recomendada

Construir una web con estructura de datos fuerte y contenido real de catalogos, no una landing generica.

El diferencial de Cejas Internacionales debe ser:

1. Xiomara como rostro profesional.
2. Presencia internacional explicada con precision.
3. Servicios filtrados por mercado.
4. Descripciones reales de catalogo.
5. Precios y duraciones claras.
6. Resultados reales.
7. Formaciones con PDFs descargables.
8. Contacto y reserva solo por WhatsApp.

Esta V2 ya permite empezar diseno e implementacion sin esperar el FAQ final.
