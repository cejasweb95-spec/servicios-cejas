# Arquitectura técnica — Hostinger, web informativa y futura base de datos

Este documento define la arquitectura recomendada para construir la web ahora sin base de datos, pero dejando el proyecto preparado para una futura migración a CMS, base de datos y panel admin.

---

## 1. Decisión recomendada

### Estado actual del repositorio

En `develop` hay documentación y assets, pero no aparece `package.json`, `app/`, `src/` ni `next.config.ts` como código fuente versionado en la raíz. Los artefactos generados `.next`, `node_modules` y `tsconfig.tsbuildinfo` se limpiaron el 17/06/2026 para evitar confusión. Para la fase de frontend no conviene editar builds compilados; conviene crear una base limpia de app Next.js y migrar ahí el contenido/documentación ya consolidado.

### V1 — web informativa premium

Usar:

- **Next.js App Router** como framework principal.
- **TypeScript** para contratos de datos claros.
- **Tailwind CSS v4** para sistema visual y tokens de marca.
- **next-intl** para i18n ES/EN con App Router.
- **Motion / Framer Motion** para animaciones finas y respetando `prefers-reduced-motion`.
- **shadcn/ui solo donde aporte**: tabs, dialog, accordion, drawer, tooltip, select, no como estética genérica.
- **Datos estructurados en archivos `.ts`** dentro del proyecto, validados con Zod.
- **PDFs descargables en `public/descargas`** o ruta pública equivalente.
- **Sin base de datos, sin checkout, sin formulario de reserva y sin panel admin en V1**.

La web debe comportarse como si los datos vinieran de un CMS aunque en V1 estén en archivos locales. Los componentes no deben leer textos/precios directamente; deben consumir funciones tipo `getServicesByMarket()`, `getCourses()`, `getEvents()` y `getDownloads()`.

La web publica debe ser bilingue desde V1. Los componentes tampoco deben leer textos publicos hardcodeados: deben consumir contenido localizado o traducciones para `es` y `en`.

### V2 futura — Supabase + admin

Decisión actual del proyecto: cuando haya base de datos será con **Supabase**.

Supabase encaja bien porque aporta:

- **Postgres gestionado** para servicios, precios, cursos, jornadas, descargas, ubicaciones y SEO.
- **Auth** para proteger un futuro panel admin.
- **Storage** para PDFs, imágenes de resultados y assets descargables.
- **Row Level Security** para separar datos públicos de edición privada.
- APIs y cliente TypeScript para integrar con Next.js sin montar un backend pesado propio.

Si se crea panel admin, la recomendación es hacerlo dentro de la propia app Next.js:

- `/admin` protegido por Supabase Auth.
- Server Actions o Route Handlers para mutaciones.
- Supabase Storage para subir PDFs/imágenes.
- Tablas normalizadas según el modelo de datos definido en este documento.

No recomiendo empezar con Google Sheets/Airtable como núcleo del sistema si se busca una base premium/enterprise. Pueden servir como puente temporal para fechas, pero no como arquitectura principal.

---

## 2. Hosting: Hostinger

Hostinger es viable, pero la decisión exacta depende del plan:

| Escenario | Recomendación |
|---|---|
| Web informativa sin BD | Next.js en Hostinger Node.js Web App si el plan lo permite. |
| Web casi estática sin funciones server | Export estático de Next.js, solo si se acepta perder funcionalidades server. |
| Futuro admin + BD | Next.js en Hostinger + Supabase gestionado. |
| Futuro con muchas subidas de imágenes/PDF | Supabase Storage como origen de media; Next solo consume/optimiza. |

Punto importante: Hostinger sirve para alojar la web, pero la base de datos futura no tiene por qué vivir en Hostinger. Si la decisión es Supabase, lo más limpio es: **Hostinger para Next.js + Supabase para datos/auth/storage**.

---

## 3. Tipografía recomendada

Tipografía elegida para la propuesta:

| Uso | Fuente | Razón |
|---|---|---|
| Titulares / display | **Marcellus** | Elegante, limpia, femenina sin caer en serif editorial genérica. Funciona bien con belleza premium y con el logo. |
| Cuerpo / UI | **Manrope** | Muy legible, moderna, seria y buena para catálogos, precios, botones y tablas. |
| Script | Solo el logo | No usar otra script en la interfaz para evitar ruido visual. |

Implementación recomendada con `next/font/google`:

```ts
import { Manrope, Marcellus } from "next/font/google";

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const displayFont = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});
```

Uso:

- H1/H2 principales: `Marcellus`.
- Navegación, textos, precios, chips, tablas y botones: `Manrope`.
- Mayúsculas con moderación; el logo ya tiene bastante personalidad.

---

## 4. Logo y assets de marca

El PNG transparente oficial ya es suficiente para web. Se han creado variantes monocromas para fondos claros/oscuros:

| Archivo | Uso |
|---|---|
| `docs/cliente/assets-extraidos/logo-oficial-sin-fondo.png` | Logo oficial principal. |
| `docs/cliente/assets-extraidos/logo-oficial-negro-monocromo.png` | Header/footer sobre fondos claros cuando se quiera marca sobria. |
| `docs/cliente/assets-extraidos/logo-oficial-blanco.png` | Footer, hero oscuro, overlays con foto o fondos tinta. |
| `docs/cliente/assets-extraidos/logo-variantes-monocromo-preview.png` | Previsualización interna de variantes. |

No queda pendiente pedir SVG/AI.

---

## 5. Contrato de datos V1

Aunque no haya BD, los datos deben vivir con una estructura que pueda convertirse a tablas/colecciones después.

Estructura sugerida:

```txt
src/
  app/
    [locale]/
  content/
    markets.ts
    services.ts
    service-categories.ts
    courses.ts
    events.ts
    locations.ts
    downloads.ts
    media.ts
    social-links.ts
    payment-methods.ts
    analytics-settings.ts
    cookie-consent.ts
    legal-pages.ts
    site-settings.ts
  i18n/
    routing.ts
    navigation.ts
    request.ts
  messages/
    es.json
    en.json
  lib/
    content/
      queries.ts
      schema.ts
```

Reglas:

1. Todo elemento debe tener `id`/`slug` estable.
2. No mezclar precios de países en textos libres; deben ir como campos estructurados.
3. Los PDFs deben modelarse como descargas vinculadas a mercado, curso o catálogo.
4. Las jornadas y fechas de cursos deben ser eventos, no textos pegados en una sección.
5. La UI debe usar queries internas, no importar arrays directamente desde componentes.
6. Validar datos con Zod para detectar precios, slugs o campos vacíos antes de desplegar.
7. Todo texto publico debe existir en `es` y `en`; los campos estructurados no se duplican por idioma.
8. GA4 y cookies se modelan como configuracion, no como scripts sueltos hardcodeados en componentes.
9. Tokens personales de GitHub nunca se leen desde `.env.local` para GitHub Actions ni se publican. Si se necesita CI, usar GitHub Secrets.

---

## 5.1 Sistema de diseño técnico

La futura app debe arrancar con un sistema de diseño basado en tokens:

- Tailwind CSS v4 con `@theme`.
- CSS custom properties para gradientes, sombras y estados especiales.
- Colores semánticos: `primary`, `primary-hover`, `primary-soft`, `surface`, `foreground`, `border`, `ring`.
- Componentes base con variantes tipadas.
- Nada de hexadecimales repetidos dentro de componentes.

Esto permite cambiar el palo de rosa, el borde o un degradado desde un único lugar y que se propague a toda la web.

### Componentes reutilizables

La implementación debe priorizar una librería interna de componentes:

- `Button`, `IconButton`, `LinkButton`.
- `Container`, `Section`, `PageHero`.
- `Tabs`, `SegmentedControl`.
- `DataTable`, `ResponsiveDataList`.
- `ServiceCard`, `CourseCard`, `DownloadCard`.
- `WhatsAppChooser`, `EventMap`, `ResultMosaic`.

Usar variantes explícitas en vez de booleanos acumulados. Ejemplo: `variant="primary"` y `size="md"` en vez de `isPrimary` / `isLarge`.

Regla de UI: el botón base debe ser `inline-flex` y ancho automático. `w-full` solo se permite en móvil o casos justificados.

---

## 5.2 Por qué Next.js y no React/Vite puro

Next.js **usa React**. La decisión no es "Next.js en vez de React", sino **React con un framework que ya trae routing, renderizado, SEO, servidor y optimización**.

Para esta web conviene Next.js porque:

1. **SEO y páginas indexables:** servicios, mercados, cursos, jornadas y cuidados necesitan URLs propias, metadata y sitemap.
2. **Rendimiento:** permite SSG/SSR, optimización de imágenes y fuentes con `next/image` y `next/font`.
3. **Contenido estructurado:** genera rutas por `slug` para servicios/cursos sin duplicar lógica.
4. **Supabase futuro:** integra bien llamadas server-side, Auth con cookies, Route Handlers y Server Actions.
5. **Admin futuro:** se puede crear `/admin` dentro de la misma app sin montar otro frontend.
6. **Hostinger:** si el plan tiene Node.js, puede alojar una app Next con rutas server; si no, se podría evaluar export estático para V1.

React/Vite puro sería válido para una SPA simple, pero aquí obligaría a montar aparte routing avanzado, SSR/SSG, SEO, API layer, auth server-side, sitemap, optimización de imágenes y estructura de admin. Para una web de marca con catálogo, SEO y futura BD, Next.js reduce piezas sueltas.

---

## 6. Entidades para una futura base de datos

### Marca y configuración

| Entidad | Campos principales |
|---|---|
| `site_settings` | marca, claim, color principal, teléfonos, email, dirección legal, CTA principal |
| `social_links` | red, URL, estado visible |
| `whatsapp_targets` | país/mercado, número E.164, label, mensaje base |
| `legal_profile` | NIT, dirección, ciudad, país, textos de aviso legal |
| `legal_pages` | aviso legal, privacidad, cookies, idioma, version, fecha de actualizacion |
| `analytics_settings` | GA4 measurement ID publico, eventos permitidos, estado, consentimiento requerido |
| `cookie_categories` | necesarias, analiticas, preferencias, marketing futuro, descripcion ES/EN |

### Servicios y mercados

| Entidad | Campos principales |
|---|---|
| `markets` | Colombia, España/Europa, Suiza; moneda, WhatsApp recomendado, PDF de catálogo |
| `service_categories` | cejas, labios, mirada, pestañas, depilación, uñas, peinados/maquillaje |
| `services` | nombre, slug, descripción, duración cita, duración resultado, notas, imágenes |
| `service_market_offers` | servicio, mercado, precio, moneda, disponible, orden, CTA, PDF fuente |
| `service_faq_items` | pregunta, respuesta, servicio/mercado, visible |

### Cursos y formaciones

| Entidad | Campos principales |
|---|---|
| `courses` | nombre, slug, tipo, duración, descripción, certificado, PDF, visible |
| `course_modules` | curso, orden, título, contenido |
| `course_offers` | curso, mercado, modalidad, precio, moneda, incluye kit, financiación |
| `course_events` | curso, ciudad, país, fecha inicio/fin, cupos, estado, WhatsApp |
| `course_requirements` | curso, requisito, obligatorio/opcional |

### Jornadas, mapa y fechas

| Entidad | Campos principales |
|---|---|
| `locations` | país, ciudad, región, tipo, latitud, longitud, dirección si aplica |
| `events` | tipo `jornada`/`curso`, ubicación, fecha inicio/fin opcional, label visible, estado |
| `event_statuses` | borrador, próxima por disponibilidad, abierta, completa, realizada, cancelada |

Modelo clave para lo que pidió la clienta:

```ts
type Event = {
  id: string;
  type: "jornada" | "curso";
  title: string;
  market: "colombia" | "espana-europa" | "suiza";
  locationId: string;
  relatedCourseSlug?: string;
  startDate?: string;
  endDate?: string;
  displayDateLabel: string; // ej. "Próxima jornada por disponibilidad"
  status: "draft" | "availability" | "open" | "full" | "completed" | "cancelled";
  whatsappTarget: "colombia" | "espana";
};
```

Esto permite mostrar hoy `Próxima jornada por disponibilidad` y mañana añadir fechas exactas, cupos o ciudades sin cambiar la UI.

### Media, descargas y SEO

| Entidad | Campos principales |
|---|---|
| `media_assets` | archivo, alt, origen, tipo, categoría, servicio/curso relacionado |
| `downloads` | título, archivo, tipo, mercado, curso/servicio relacionado |
| `seo_entries` | ruta, title, description, OG image, indexable |
| `legal_pages` | ruta, tipo, idioma, contenido, version, fecha_actualizacion |
| `analytics_events` | nombre evento, categoria, descripcion, activo, no_pii |
| `translations` / localized fields | textos `es` y `en`, slugs localizados, metadata y mensajes de UI |
| `pages` | slug, bloques de contenido, estado, SEO |

### Admin futuro

Módulos mínimos del panel:

1. Servicios y precios por mercado.
2. Cursos/formaciones, temarios y PDFs.
3. Jornadas/fechas/cupos por ciudad.
4. Galería/resultados.
5. Descargas.
6. WhatsApp, redes y datos legales.
7. SEO por página.
8. Traducciones ES/EN.
9. Usuarios, roles y auditoría de cambios.

---

## 7. Frontend preparado para migración

La UI debe diseñarse así:

- Componentes visuales puros: `ServiceCard`, `MarketTabs`, `CourseCard`, `EventMap`, `WhatsAppChooser`.
- Queries internas: `getServicesByMarket(market)`, `getCourseBySlug(slug)`, `getUpcomingEvents()`.
- Nada de precios escritos dentro del JSX.
- Nada de ciudades duplicadas a mano entre home, mapa y contacto.
- Las animaciones no deben depender de datos hardcodeados; deben recibir arrays.
- Las páginas de detalle deben generarse por `slug` para facilitar migración a CMS.
- El idioma debe ser parametro de las queries o del contexto de ruta: `getServicesByMarket(market, locale)`.
- El cambio ES/EN debe conservar pagina equivalente y usar slugs localizados.

Cuando llegue la BD, se reemplaza el proveedor de datos local por Supabase sin rehacer componentes.

---

## 8. Recomendación final

Construir V1 con **Next.js + TypeScript + Tailwind + datos locales tipados**. Alojarla en Hostinger con soporte Node.js si el plan lo permite. No usar BD todavía.

Dejar lista la estructura para una V2 con **Supabase**:

- Postgres para datos estructurados.
- Auth para el panel admin.
- Storage para PDFs, catálogos, cursos e imágenes.
- RLS para seguridad.

Para Cejas Internacionales, mi recomendación de arquitectura premium es:

1. V1 ahora: Next.js informativa, rápida, con datos estructurados.
2. V1.5 opcional: eventos/jornadas editables desde archivo si cambian poco.
3. V2 futura: Supabase + `/admin` en Next.js cuando el volumen de cambios lo justifique.

---

## 9. Fuentes consultadas

- Hostinger — Node.js Web Apps: https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- Hostinger — Next.js hosting: https://www.hostinger.com/in/web-apps-hosting/nextjs-hosting
- Next.js — Self-hosting: https://nextjs.org/docs/app/guides/self-hosting
- Next.js — Deploying / static export: https://nextjs.org/docs/app/getting-started/deploying
- Next.js — Fetching data: https://nextjs.org/docs/app/getting-started/fetching-data
- React — Creating a React App: https://react.dev/learn/creating-a-react-app
- Supabase — Use Supabase with Next.js: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Supabase — Server-Side Auth: https://supabase.com/docs/guides/auth/server-side
- Supabase — Creating an SSR client: https://supabase.com/docs/guides/auth/server-side/creating-a-client
- Drizzle ORM — Schema declaration: https://orm.drizzle.team/docs/sql-schema-declaration
