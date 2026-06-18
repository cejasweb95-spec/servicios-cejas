# Fase 02 - Modelado de datos + query layer

Estado: Completada

Objetivo: modelar servicios, mercados, cursos, ubicaciones, jornadas, descargas, media, SEO, WhatsApp y legal como datos tipados. La UI debe consumir queries, no arrays crudos, para facilitar futura migracion a Supabase.

---

## Fuentes obligatorias

- `PRODUCT.md`
- `docs/cliente/catalogos-servicios-precios.md`
- `docs/cliente/catalogos-contenido-web-transcrito.md`
- `docs/cliente/resumen-servicios-precios-duraciones.md`
- `docs/cliente/duracion-sesiones.md`
- `docs/cliente/catalogo-suiza-chf.md`
- `docs/cliente/cursos-masterclass.md`
- `docs/cliente/contacto-datos-legales.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`
- `docs/cliente/ubicaciones-jornadas.md`
- `docs/cliente/assets-inventario.md`
- `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `supabase-nextjs-admin`
- `next-best-practices`
- `vercel-composition-patterns`

Uso: construir local data como si manana se pudiera cambiar a un provider Supabase sin tocar componentes visuales.

---

## Estructura a crear

```txt
src/content/
  markets.ts
  service-categories.ts
  services.ts
  courses.ts
  locations.ts
  events.ts
  downloads.ts
  media.ts
  whatsapp-targets.ts
  social-links.ts
  legal-profile.ts
  legal-pages.ts
  analytics-settings.ts
  cookie-consent.ts
  site-settings.ts
  seo.ts
src/lib/content/
  schema.ts
  queries.ts
  validators.ts
src/lib/format/
  currency.ts
  duration.ts
  market.ts
src/lib/whatsapp/
  build-whatsapp-url.ts
```

---

## Entidades minimas

- [x] `Market`: Colombia, Espana/Europa, Suiza.
- [x] `Service`.
- [x] `ServiceOffer` por mercado.
- [x] `ServiceCategory`.
- [x] `Course`.
- [x] `CourseModule` o `CourseSection`.
- [x] `Location`.
- [x] `EventAvailability`.
- [x] `Download`.
- [x] `MediaAsset`.
- [x] `WhatsAppTarget`.
- [x] `SocialLink`.
- [x] `LegalProfile`.
- [x] `LegalPage`.
- [x] `AnalyticsSettings`.
- [x] `CookieCategory`.
- [x] `SeoEntry`.
- [x] `LocalizedString`.

---

## Checklist de schemas

- [x] Zod valida slugs.
- [x] Zod valida idiomas ES/EN obligatorios.
- [x] Zod valida mercado permitido.
- [x] Zod valida moneda por mercado.
- [x] Zod valida precio cuando aplica.
- [x] Zod diferencia duracion de cita y duracion de resultado.
- [x] Zod valida path PDF si `download.type` lo requiere.
- [x] Zod valida WhatsApp target.
- [x] Zod valida que no hay enlaces vacios.
- [x] Zod valida que no hay fechas/cupos inventados.
- [x] Zod valida paginas legales ES/EN.
- [x] Zod valida eventos GA4 permitidos y sin PII.
- [x] Zod valida categorias de cookies.

---

## Checklist de queries

- [x] `getMarkets(locale)`.
- [x] `getMarketBySlug(slug, locale)`.
- [x] `getServices(locale)`.
- [x] `getServicesByMarket(market, locale)`.
- [x] `getServiceBySlug(slug, locale)`.
- [x] `getServiceCategories(locale)`.
- [x] `getCourses(locale)`.
- [x] `getCourseBySlug(slug, locale)`.
- [x] `getLocations(locale)`.
- [x] `getEvents(locale)`.
- [x] `getDownloads(locale)`.
- [x] `getDownloadsByMarket(market, locale)`.
- [x] `getWhatsAppTarget(target)`.
- [x] `getSeoEntry(route, locale)`.
- [x] `getLegalPage(type, locale)`.
- [x] `getCookieCategories(locale)`.
- [x] `getAnalyticsSettings()`.

---

## Reglas de mercado en datos

- [x] Colombia permite COP.
- [x] Espana/Europa permite EUR.
- [x] Suiza permite CHF.
- [x] Colombia contiene exclusivos: pestanas, unas, peinados, maquillaje.
- [x] Espana/Europa no contiene servicios exclusivos de Colombia si no aplican.
- [x] Suiza no contiene HidraLips.
- [x] Suiza no contiene depilaciones.
- [x] Suiza no contiene correccion de cejas salvo confirmacion futura.
- [x] Cada servicio tiene `offers[]` por mercado, no campos sueltos duplicados.
- [x] El frontend nunca infiere mercado por texto.

---

## Checklist i18n de datos

- [x] Nombre ES.
- [x] Nombre EN.
- [x] Descripcion corta ES.
- [x] Descripcion corta EN.
- [x] Descripcion larga ES cuando aplique.
- [x] Descripcion larga EN cuando aplique.
- [x] Alt text ES/EN para media.
- [x] WhatsApp template ES/EN.
- [x] SEO title ES/EN.
- [x] SEO description ES/EN.
- [x] Slugs definidos por idioma si la URL cambia.

---

## Checklist Supabase-ready

- [x] IDs estables.
- [x] Slugs estables.
- [x] Relaciones claras: services -> offers -> markets.
- [x] Downloads separadas de servicios.
- [x] Media separada de servicios/cursos.
- [x] Query layer oculta el origen de datos.
- [x] No hay `import { services }` dentro de componentes visuales.
- [x] Los tipos permiten futuro provider `local` o `supabase`.

---

## Tests / comandos

```bash
npm run typecheck
npm run test
```

Tests recomendados:

- [x] Validador falla si falta ES o EN.
- [x] Validador falla si Suiza incluye HidraLips.
- [x] Validador falla si Suiza incluye depilacion.
- [x] Validador falla si un PDF no tiene path.
- [x] `getServicesByMarket("colombia")` devuelve solo COP.
- [x] `getServicesByMarket("suiza")` devuelve solo CHF.
- [x] `buildWhatsAppUrl()` genera URL codificada correctamente.

---

## No avanzar si

- [ ] Los componentes visuales necesitan importar datos crudos.
- [ ] Hay servicios sin mercado.
- [ ] Hay precios sin moneda.
- [ ] Falta ES o EN para contenido publico.
- [ ] Quedan datos dudosos marcados como publicables.

---

## Done cuando

- [x] Datos base validados.
- [x] Query layer funcionando.
- [x] Tests de datos pasan.
- [x] Fase 02 marcada en `CHECKLIST-MAESTRA.md`.
