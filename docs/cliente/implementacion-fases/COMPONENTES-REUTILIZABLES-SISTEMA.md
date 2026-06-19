# Sistema de componentes reutilizables

Ultima actualizacion: 19/06/2026.

Objetivo: que la web se sienta homogenea, premium y mantenible. Cada boton, tabla/lista, card, CTA, tab, dialog, descarga, servicio, curso y bloque de contacto debe salir de componentes reutilizables, no de estilos inventados pagina por pagina.

---

## Regla base

- Usar `cejas-internacionales-guardrails` antes de cualquier decision.
- Usar `shadcn` como base accesible, no como estetica final.
- Usar `tailwind-design-system` para tokens, variantes y consistencia.
- Usar `vercel-composition-patterns` para evitar props booleanas excesivas y componentes monoliticos.
- Crear componentes con variantes explicitas, no copias con clases ligeramente distintas.
- Si una UI se repite dos veces, debe convertirse en componente o primitive.
- Si una UI maneja datos de negocio, debe recibir datos desde queries/modelos, no importarlos crudos.

---

## Capas de componentes

```txt
src/components/
  ui/            # shadcn adaptado: Button, Dialog, Sheet, Tabs, Badge, Table...
  primitives/    # Container, Section, PageHero, ButtonLink, DataList...
  motion/        # Reveal, StaggerList, MotionPanel, MotionButton...
  layout/        # SiteHeader, SiteFooter, MobileNav, LocaleSwitcher, CookiePreferencesLink...
  domain/        # ServiceCard, CourseCard, DownloadCard, WhatsAppChooser, CookieConsentBanner...
  composed/      # bloques de pagina reutilizables: MarketIntro, CTASection...
```

Regla:

- `ui/` no conoce negocio.
- `primitives/` no conoce negocio.
- `motion/` no conoce negocio.
- `layout/` conoce navegacion y contexto global.
- `domain/` conoce entidades: servicio, curso, descarga, mercado, jornada.
- `composed/` combina componentes para secciones repetibles.

---

## Botones y CTAs

Componentes unicos:

- [x] `Button` desde shadcn adaptado a tokens.
- [x] `ButtonLink` para enlaces internos/externos con apariencia de boton.
- [x] `WhatsAppCTA` para CTA directo.
- [ ] `WhatsAppChooserTrigger` para abrir selector.
- [x] `DownloadButton` para PDFs.
- [x] `IconButton` para acciones solo icono.
- [x] `CookiePreferenceButton` para reabrir preferencias desde footer cubierto por `CookiePreferencesLink`.

Reglas:

- [ ] No crear botones con `<a className="...">` o `<button className="...">` fuera de estos componentes.
- [ ] Base `inline-flex`.
- [ ] `w-full` solo en mobile o layout justificado.
- [ ] Iconos con `data-icon`, sin clases manuales de tamano.
- [ ] Variantes limitadas: `primary`, `secondary`, `outline`, `ghost`, `link`, `download`, `whatsapp`.
- [ ] Tamaños limitados: `sm`, `md`, `lg`, `icon`.
- [ ] Texto y aria-label localizados ES/EN.

---

## Tabs, filtros y selectores

Componentes unicos:

- [ ] `MarketTabs` para Colombia / Espana-Europa / Suiza.
- [x] `MarketSelector` para cards/enlaces de mercado.
- [ ] `SegmentedControl` sobre shadcn `ToggleGroup` cuando no sea contenido tabular.
- [ ] `LocalizedTabs` si se usan tabs con contenido real.

Reglas:

- [ ] No crear tabs manuales con botones sueltos.
- [ ] `TabsTrigger` siempre dentro de `TabsList`.
- [x] Estado activo con variantes/tokens, no raw classes.
- [x] `layoutId` implementado para indicador activo con Motion en `MarketSelector`.
- [ ] Cambio de filtro no debe perder foco ni romper back/forward si afecta URL.

---

## Cards y bloques de contenido

Componentes de dominio:

- [x] `ServiceCard`.
- [x] `CourseCard`.
- [x] `DownloadCard`.
- [x] `ResultTile` dentro de `ResultMosaic`.
- [x] `EventMap` para mapa/lista de jornadas con pins accesibles.
- [x] `LocationCard` cubierto por lista seleccionable dentro de `EventMap`.
- [ ] `ContactOption`.
- [ ] `CertificationItem`.

Implementacion 19/06/2026:

- `CourseCard` recibe contenido e imagen estructurados, y se reutiliza en Home y Formaciones.
- `EventMap` combina mapa visual optimizado, pins numerados y lista accesible; en movil contiene su propio desplazamiento horizontal.
- Certificaciones usa una composicion editorial unica sobre `Section`, `StaggerList` e imagen registrada; no se creo `CertificationItem` porque no existe un segundo patron repetido que justifique esa abstraccion.

Reglas:

- [ ] No usar una `Card` generica para todo sin semantica.
- [ ] No cards dentro de cards.
- [ ] No grids infinitos identicos.
- [ ] Cada card tiene estructura estable: heading, meta, body, actions.
- [ ] CTA dentro de card no ocupa todo el ancho en desktop por defecto.
- [ ] Las variantes deben ser explicitas, no booleanas tipo `isFeatured`, `isCompact`, `isHome`, `isDark` acumuladas.

Preferir:

```txt
<ServiceCard variant="featured" />
<ServiceCard variant="compact" />
```

Antes que:

```txt
<ServiceCard isFeatured isCompact isHome isDark />
```

Si las variantes empiezan a crecer, crear composiciones:

- `FeaturedServiceCard`
- `CompactServiceCard`
- `ServiceListItem`

---

## Tablas, listas y datos

Componentes unicos:

- [x] `ResponsiveDataList`.
- [ ] `ServicePriceTable`.
- [ ] `ServiceDurationList`.
- [x] `CourseModuleList`.
- [x] `CoursePriceList`.
- [ ] `DownloadList`.
- [ ] `MarketComparison`.

Reglas:

- [ ] No crear tablas ad hoc por pagina.
- [ ] En desktop se puede usar tabla si mejora lectura.
- [ ] En mobile, tabla se transforma en lista/cards accesibles.
- [ ] Cabeceras y labels localizados ES/EN.
- [ ] Precios siempre formateados por `formatCurrency()`.
- [ ] Duraciones siempre formateadas por `formatDuration()`.
- [ ] No mezclar duracion de cita con duracion de resultado.
- [ ] No repetir boton de descarga de catalogo dentro de filas de servicio.

---

## Dialogs, sheets, lightbox y overlays

Componentes unicos:

- [x] `WhatsAppChooser`.
- [x] `MobileNav`.
- [x] `ResultLightbox` integrado en `ResultMosaic`.
- [x] `CookieConsentBanner`.
- [x] `CookiePreferencesDialog` integrado como modo configurar dentro de `CookieConsentBanner`.
- [ ] `DownloadDialog` solo si hiciera falta.

Reglas:

- [ ] Usar shadcn `Dialog`, `Sheet` o `Drawer`.
- [ ] Siempre tener title accesible.
- [ ] Focus trap correcto.
- [ ] Cerrar con Escape.
- [ ] Devolver foco al trigger.
- [ ] Usar `AnimatePresence` desde `MotionPanel` si hay animacion.
- [ ] Banner cookies tiene aceptar, rechazar y configurar sin dark patterns.
- [ ] Preferencias cookies no cargan GA4 antes de consentimiento.

---

## Legal, cookies y analytics

Componentes unicos:

- [x] `LegalPageLayout` cubierto por `LegalContentPage`.
- [x] `LegalSection` cubierto dentro de `LegalContentPage`.
- [x] `CookieConsentBanner`.
- [x] `CookiePreferencesDialog` integrado como modo configurar dentro de `CookieConsentBanner`.
- [x] `CookiePreferencesLink`.
- [ ] `AnalyticsConsentProvider`.

Reglas:

- [ ] Textos legales desde contenido localizado, no hardcodeados en componentes.
- [ ] Aviso legal, privacidad y cookies comparten layout legible.
- [ ] Acciones del banner usan `Button` base, no botones ad hoc.
- [ ] `Aceptar`, `Rechazar` y `Configurar` tienen jerarquia visual equilibrada.
- [ ] Las cookies analiticas estan desactivadas por defecto.
- [ ] GA4 no carga hasta consentimiento.
- [ ] No enviar PII a eventos analytics.

---

## Composicion y API

Reglas:

- [ ] Evitar props booleanas acumulativas.
- [ ] Usar `variant`, `size`, `tone` o composicion explicita.
- [ ] Usar compound components en piezas complejas.
- [ ] Mantener APIs pequenas y legibles.
- [ ] `className` es para layout excepcional, no para reestilizar colores/tipografia.
- [ ] Si un componente necesita muchas excepciones por pagina, esta mal abstraido.

Ejemplo de composicion preferida:

```tsx
<ServiceSection>
  <ServiceSection.Header />
  <ServiceSection.List />
  <ServiceSection.Action />
</ServiceSection>
```

---

## Registro de componentes

Crear y mantener:

```txt
docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md
```

Cuando se cree un componente nuevo durante implementacion, anotar:

- [ ] Nombre.
- [ ] Carpeta.
- [ ] Proposito.
- [ ] Donde se usa.
- [ ] Variantes permitidas.
- [ ] Datos que recibe.
- [ ] Tests/QA aplicables.

---

## QA de homogeneidad

Comandos/checks recomendados cuando exista `src/`:

```bash
rg "<button|<a className|<table|w-full|#[0-9A-Fa-f]{3,8}" src
rg "is[A-Z][A-Za-z]+=" src/components
rg "from ['\"]@/content" src/components
```

Validar:

- [x] Botones salen de `Button`, `ButtonLink`, `WhatsAppCTA` o `DownloadButton`.
- [x] Tablas/listas creadas hasta ahora salen de componentes reutilizables.
- [x] Cards de servicios/cursos/descargas no duplican estructura.
- [x] No hay imports directos de datos crudos en componentes visuales.
- [x] No hay raw hex en componentes.
- [x] No hay `w-full` en CTAs desktop salvo justificacion.
- [x] No hay props booleanas creciendo sin control.
- [x] El mismo patron visual creado hasta ahora se ve igual en ES/EN y en todos los mercados publicados.
