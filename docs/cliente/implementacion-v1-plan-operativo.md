# Implementacion V1 - plan operativo

Ultima actualizacion: 17/06/2026.

Objetivo: definir como empezar la implementacion real de la web sin perder nada de la planificacion, sin copiar prototipos externos y sin mezclar datos de mercados, idiomas, PDFs o WhatsApp.

Nota operativa: este documento queda como vista general. La ejecucion senior con checklist por fase, skills, tests, criterios de aceptacion y bloqueos vive en `docs/cliente/implementacion-fases/`.

---

## 1. Principio de arranque

No empezar por "hacer la home bonita".

Empezar por esta secuencia:

1. App limpia Next.js.
2. i18n ES/EN.
3. modelos de datos tipados.
4. assets/PDFs publicos.
5. sistema visual/tokens.
6. componentes base.
7. una vertical slice completa.
8. luego escalar paginas.

La primera vertical slice recomendada es:

```txt
/es
/en
/es/servicios/colombia
/en/services/colombia
/es/descargas
/en/downloads
```

Motivo: obliga desde el principio a resolver i18n, SEO, descargas, precios, mercado Colombia, WhatsApp y componentes reutilizables.

---

## 2. Stack de implementacion

| Area | Decision |
|---|---|
| Framework | Next.js App Router |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| UI base | shadcn/ui como base accesible, no estetica final |
| i18n | `next-intl` |
| Validacion de contenido | Zod |
| Animacion | Motion for React / Framer Motion en client components pequenos |
| Iconos | lucide-react |
| Tests | lint, typecheck, build, Playwright, Lighthouse/PageSpeed |
| Datos V1 | Archivos `.ts` locales tipados |
| Futuro V2 | Supabase + `/admin` |

Fuentes tecnicas base:

- Next.js App Router e i18n.
- next-intl App Router.
- shadcn/ui Next.js.
- Tailwind CSS v4 `@theme`.

---

## 3. Estructura de carpetas recomendada

Cuando se cree la app, usar esta estructura base:

```txt
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      servicios/
        page.tsx
        [market]/
          page.tsx
        [slug]/
          page.tsx
      formaciones/
        page.tsx
        [slug]/
          page.tsx
      jornadas/
        page.tsx
      resultados/
        page.tsx
      sobre-xiomara/
        page.tsx
      cuidados/
        page.tsx
      descargas/
        page.tsx
      contacto/
        page.tsx
      aviso-legal/
        page.tsx
      privacidad/
        page.tsx
      cookies/
        page.tsx
      not-found.tsx
    icon.png
    apple-icon.png
    manifest.ts
    robots.ts
    sitemap.ts
    opengraph-image.tsx
    twitter-image.tsx
  components/
    ui/
    layout/
      site-header.tsx
      site-footer.tsx
      mobile-nav.tsx
      locale-switcher.tsx
    primitives/
      container.tsx
      section.tsx
      button-link.tsx
      page-hero.tsx
      responsive-data-list.tsx
    domain/
      whatsapp-chooser.tsx
      market-selector.tsx
      market-download-banner.tsx
      service-list.tsx
      service-card.tsx
      service-price-block.tsx
      course-card.tsx
      download-card.tsx
      event-map.tsx
      result-mosaic.tsx
  content/
    markets.ts
    services.ts
    service-categories.ts
    courses.ts
    locations.ts
    events.ts
    downloads.ts
    media.ts
    whatsapp-targets.ts
    social-links.ts
    legal-profile.ts
    site-settings.ts
    seo.ts
  i18n/
    routing.ts
    navigation.ts
    request.ts
  lib/
    content/
      queries.ts
      schema.ts
      validators.ts
    seo/
      metadata.ts
      schema-jsonld.ts
    whatsapp/
      build-whatsapp-url.ts
    format/
      currency.ts
      duration.ts
      market.ts
  messages/
    es.json
    en.json
  styles/
    globals.css
tests/
  e2e/
    home.spec.ts
    services.spec.ts
    downloads.spec.ts
    i18n.spec.ts
    whatsapp.spec.ts
    map.spec.ts
public/
  descargas/
    catalogos/
    formaciones/
  images/
    brand/
    hero/
    resultados/
    formaciones/
```

---

## 4. Reglas de datos antes de UI

Antes de disenar componentes finales, crear los modelos con Zod.

### Entidades minimas V1

| Entidad | Archivo |
|---|---|
| Mercados | `src/content/markets.ts` |
| Servicios | `src/content/services.ts` |
| Categorias | `src/content/service-categories.ts` |
| Cursos | `src/content/courses.ts` |
| Ubicaciones | `src/content/locations.ts` |
| Jornadas/eventos | `src/content/events.ts` |
| Descargas | `src/content/downloads.ts` |
| Imagenes/media | `src/content/media.ts` |
| WhatsApp | `src/content/whatsapp-targets.ts` |
| SEO | `src/content/seo.ts` |

### Regla critica

Los componentes visuales no pueden importar arrays crudos.

Correcto:

```ts
const services = getServicesByMarket("colombia", locale);
```

Incorrecto:

```ts
import { services } from "@/content/services";
```

Motivo: cuando migremos a Supabase, cambiamos `queries.ts`, no toda la UI.

---

## 5. Regla de descargas PDF

Esta regla evita el error de repetir el boton de descarga en cada servicio.

### Catalogos de servicios

Los PDFs de catalogo se muestran solo en:

1. Header/bloque superior de cada pagina de mercado.
2. Pagina `/descargas`.
3. Footer global como acceso secundario.

No se muestran dentro de cada `ServiceCard`.

Ejemplo:

```txt
/es/servicios/colombia
  PageHero mercado
  MarketDownloadBanner -> Descargar catalogo Colombia PDF
  ServiceCategorySections
    ServiceCard
    ServiceCard
    ServiceCard
```

`ServiceCard` puede tener:

- nombre,
- descripcion corta,
- precio,
- duracion cita,
- duracion resultado,
- mercado,
- CTA WhatsApp.

`ServiceCard` no puede tener:

- boton "Descargar catalogo PDF".

### PDFs de formaciones

Los PDFs de cursos si pueden aparecer en cada `CourseCard`, porque cada curso tiene su propio PDF.

Regla:

- Catalogo de mercado: una descarga por mercado.
- Formacion: una descarga por curso.
- Pagina `/descargas`: lista centralizada de todos.

---

## 6. Regla de WhatsApp

WhatsApp no se escribe a mano en componentes.

Numeros fuente:

| Target | Numero |
|---|---|
| Colombia | `573167742299` |
| Espana/Europa/Suiza | `34603804837` |

Componentes:

- `WhatsAppChooser`: selector Colombia / Espana-Europa-Suiza.
- `buildWhatsAppUrl(target, messageKey, params, locale)`: genera URL.

Uso:

| Contexto | Comportamiento |
|---|---|
| Header / Home | Abre chooser |
| Pagina Colombia | Directo Colombia o chooser con Colombia destacado |
| Pagina Espana/Europa | Directo Espana |
| Pagina Suiza | Directo Espana |
| Curso sin mercado claro | Chooser |
| Contacto | Dos opciones visibles |

---

## 7. Regla de mercado

Nunca inferir disponibilidad desde texto.

Cada servicio debe tener ofertas por mercado:

```ts
type Market = "colombia" | "espana-europa" | "suiza";

type ServiceOffer = {
  market: Market;
  price: number;
  currency: "COP" | "EUR" | "CHF";
  available: boolean;
};
```

La UI lista servicios asi:

```ts
getServicesByMarket("suiza")
```

No usar:

```ts
services.filter(service => service.description.includes("Suiza"))
```

Reglas especiales:

- Colombia muestra servicios exclusivos: pestanas, unas, peinados, maquillaje.
- Espana/Europa no muestra esos exclusivos de Colombia.
- Suiza no muestra HidraLips ni depilaciones.
- Correccion de cejas no se muestra en Suiza salvo confirmacion futura.

---

## 8. Regla i18n ES/EN

Cada pagina/componente publico debe salir con ES y EN en el mismo cambio.

No se acepta:

- pagina nueva solo en espanol,
- metadata solo en espanol,
- WhatsApp template solo en espanol,
- alt text solo en espanol,
- botones traducidos literalmente mal.

Estructura:

```ts
type Locale = "es" | "en";
type LocalizedString = Record<Locale, string>;
```

Ejemplo:

```ts
name: {
  es: "Valoracion gratuita por foto",
  en: "Free photo assessment"
}
```

No usar traducciones literales pobres:

- "Contact with me"
- "Journeys by availability"
- "Formations"

Preferir:

- `Contact me`
- `Appointments by availability`
- `Professional training`

---

## 9. Fases de implementacion

Detalle ampliado:

- `docs/cliente/implementacion-fases/README.md`
- `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md`
- `docs/cliente/implementacion-fases/00-qa-auditoria-preimplementacion.md`
- `docs/cliente/implementacion-fases/01-scaffold-next-i18n.md`
- `docs/cliente/implementacion-fases/02-modelado-datos-query-layer.md`
- `docs/cliente/implementacion-fases/03-assets-pdfs-imagenes.md`
- `docs/cliente/implementacion-fases/04-design-system-shadcn-tokens.md`
- `docs/cliente/implementacion-fases/05-app-shell-navegacion-whatsapp.md`
- `docs/cliente/implementacion-fases/06-vertical-slice-colombia-descargas.md`
- `docs/cliente/implementacion-fases/07-servicios-mercados-detalles.md`
- `docs/cliente/implementacion-fases/08-home-editorial-conversion.md`
- `docs/cliente/implementacion-fases/09-formaciones-cursos.md`
- `docs/cliente/implementacion-fases/10-jornadas-mapa-animado.md`
- `docs/cliente/implementacion-fases/11-resultados-sobre-cuidados-contacto-legal.md`
- `docs/cliente/implementacion-fases/12-seo-schema-performance.md`
- `docs/cliente/implementacion-fases/13-qa-crossbrowser-accesibilidad-e2e.md`
- `docs/cliente/implementacion-fases/14-predeploy-hostinger-supabase.md`

### Fase 0 - Preparacion

Objetivo: confirmar base limpia.

Tareas:

- Confirmar rama `develop`.
- Confirmar `main` no se toca.
- Confirmar no hay `package.json`/app fuente actual.
- Mantener docs y assets existentes.
- Decidir gestor: recomiendo `pnpm` si no hay restriccion; `npm` tambien es valido.

Salida:

- Repo listo para scaffold.

### Fase 1 - Scaffold app limpia

Tareas:

- Crear app Next.js limpia.
- Configurar TypeScript.
- Configurar Tailwind v4.
- Configurar alias `@/*`.
- Configurar ESLint.
- Instalar dependencias base.

Dependencias candidatas:

```txt
next react react-dom
next-intl
zod
lucide-react
motion
class-variance-authority
clsx
tailwind-merge
@radix-ui/react-dialog
@radix-ui/react-tabs
@radix-ui/react-tooltip
```

shadcn se inicializa despues de confirmar Tailwind/alias.

Salida:

- `/es` y `/en` funcionando con layout minimo.
- `npm run lint`, `npm run typecheck`, `npm run build` preparados.

### Fase 2 - i18n y rutas

Tareas:

- Configurar `src/i18n/routing.ts`.
- Configurar `src/i18n/navigation.ts`.
- Configurar `src/i18n/request.ts`.
- Crear `messages/es.json` y `messages/en.json`.
- Crear `LocaleSwitcher`.
- Crear metadata localizada base.

Salida:

- `/es` y `/en` renderizan idioma correcto.
- Cambio ES/EN conserva home.
- `lang` HTML correcto.

### Fase 3 - Content model y validacion

Tareas:

- Crear Zod schemas.
- Crear datos de mercados.
- Crear WhatsApp targets.
- Crear downloads.
- Crear subset inicial de servicios Colombia.
- Crear queries.

Salida:

- `getMarkets(locale)`
- `getDownloads(locale)`
- `getServicesByMarket(market, locale)`
- validacion de datos en build/test.

### Fase 4 - Assets y descargas

Tareas:

- Copiar PDFs de catalogos a `public/descargas/catalogos/`.
- Copiar PDFs de formaciones a `public/descargas/formaciones/`.
- Copiar logos a `public/images/brand/`.
- Seleccionar primeras imagenes reales para hero/sobre/resultados.
- Crear placeholders propios solo para desarrollo si falta algo.

Reglas:

- PDFs reales, no links rotos.
- No usar Unsplash/stock en produccion.
- No optimizar destruyendo calidad.

### Fase 5 - Sistema visual

Tareas:

- `globals.css` con Tailwind v4 y tokens.
- Tokens:
  - primary palo de rosa,
  - foreground negro tinta,
  - surface,
  - border,
  - ring,
  - shadow,
  - gradients.
- Configurar Marcellus + Manrope con `next/font`.
- Crear `Button`, `Container`, `Section`, `PageHero`.

Reglas:

- Boton base `inline-flex`.
- `w-full` solo movil/caso justificado.
- No raw hex en componentes.

### Fase 6 - App shell

Tareas:

- `SiteHeader`.
- `MobileNav`.
- `SiteFooter`.
- `LocaleSwitcher`.
- `WhatsAppChooser`.
- `not-found.tsx`.
- `robots.ts`, `sitemap.ts`, metadata base.

Salida:

- Navegacion completa en ES/EN.
- Footer con Cali, NIT, email, redes, WhatsApp.
- Chooser WhatsApp correcto.

### Fase 7 - Vertical slice Colombia + Descargas

Tareas:

- `/es/servicios/colombia`
- `/en/services/colombia`
- `/es/descargas`
- `/en/downloads`
- `MarketDownloadBanner`.
- `ServiceList`.
- `ServiceCard`.
- `DownloadCard`.

Aceptacion:

- Catalogo Colombia PDF aparece una vez en pagina Colombia.
- No aparece dentro de cada servicio.
- Cada servicio Colombia muestra precio COP y duracion cita.
- WhatsApp Colombia correcto.
- Version EN existe.

### Fase 8 - Servicios completo

Tareas:

- `/servicios`
- mercado Espana/Europa.
- mercado Suiza.
- detalle de servicio para servicios prioritarios.
- filtros/categorias.

Aceptacion:

- Espana no muestra servicios exclusivos Colombia.
- Suiza no muestra HidraLips ni depilaciones.
- Correccion cejas no aparece en Suiza.
- CHF/EUR/COP correctos.

### Fase 9 - Home

Tareas:

- Hero real.
- Selector mercado.
- Servicios destacados.
- Valoracion gratuita.
- Mapa teaser.
- Resultados teaser.
- Sobre Xiomara teaser.
- Formaciones teaser.
- Contacto final.

Regla:

- Home resume, no duplica todo el catalogo.
- Descarga PDF puede aparecer en selector/descargas, no en cada card.

### Fase 10 - Formaciones

Tareas:

- `/formaciones`
- detalle de curso.
- PDFs por curso.
- CTA WhatsApp fechas/cupos.

Aceptacion:

- Curso cejas: 3 dias.
- Curso labios: 3 dias.
- Laminado/lifting/henna: 1 dia.
- No inventar fechas/cupos/requisitos.
- PDFs por curso si aparecen en cards.

### Fase 11 - Jornadas y mapa

Tareas:

- `EventMap`.
- Lista accesible.
- ciudades:
  - Cali,
  - Restrepo,
  - Madrid,
  - Palma de Mallorca,
  - Puerto de Sagunto,
  - Ginebra.

Aceptacion:

- Cali = sede fisica.
- Resto = jornadas por disponibilidad.
- No inventar fechas.
- CTA correcto por ciudad.
- Reduced motion soportado.

### Fase 12 - Resultados, Sobre, Cuidados, Contacto, Legal

Tareas:

- Galeria resultados.
- Sobre Xiomara.
- Cuidados.
- Contacto.
- Aviso legal.
- Privacidad.
- Cookies obligatorias porque se usara GA4 con consentimiento.
- Banner cookies con aceptar, rechazar y configurar.

Aceptacion:

- Fotos reales.
- No claims sensibles sin confirmar.
- Direccion legal solo Cali.
- GA4 no carga antes de aceptar analiticas.
- Aviso legal, privacidad y cookies en ES/EN.

### Fase 13 - QA y hardening

Tareas:

- Lint.
- Typecheck.
- Build.
- Playwright.
- Lighthouse/PageSpeed.
- SEO QA.
- i18n QA.
- A11y keyboard.
- Cross-browser.

Salida:

- Staging listo.

---

## 10. Uso de skills por fase

| Fase | Skills |
|---|---|
| Todas | `cejas-internacionales-guardrails` |
| i18n | `cejas-i18n-localization` |
| Scaffold / Next | `next-best-practices` |
| Tokens / UI | `tailwind-design-system`, `shadcn`, `frontend-ui-engineering` |
| Diseño visual | `impeccable`, `frontend-design`, `design-taste-frontend` |
| Componentes | `vercel-composition-patterns`, `vercel-react-best-practices` |
| Animacion | `nextjs-framer-motion-animations` |
| SEO | `seo-serp-research`, `schema-structured-data`, `seo`, `seo-audit` |
| Performance | `core-web-vitals-performance` |
| Imagenes/PDFs | `image-asset-pipeline` |
| QA | `cross-browser-device-qa`, `user-flow-e2e-testing`, `playwright`, `accessibility` |
| Futuro admin | `supabase-nextjs-admin` |

---

## 11. Primer sprint recomendado

No intentar hacer toda la web en el primer sprint.

Sprint 1:

1. Scaffold app limpia.
2. i18n ES/EN.
3. tokens y fuentes.
4. content schemas.
5. markets + WhatsApp + downloads.
6. `/es`, `/en`.
7. `/es/servicios/colombia`, `/en/services/colombia`.
8. `/es/descargas`, `/en/downloads`.
9. pruebas basicas.

Esto nos da una base solida para escalar el resto sin rehacer arquitectura.
