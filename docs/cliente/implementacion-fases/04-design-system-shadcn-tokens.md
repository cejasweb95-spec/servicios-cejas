# Fase 04 - Sistema de diseno, shadcn y tokens

Estado: Completada como sistema base el 18/06/2026.

Nota de cierre: los tokens, shadcn adaptado, primitives, componentes de dominio base, MotionProvider y QA inicial estan listos. Los componentes que dependen de flujos completos (`MobileNav`, `WhatsAppChooser`, `ResultLightbox`, cookies, mapa) quedan asignados a sus fases naturales para no crear APIs falsas antes de tener la pantalla real.

Objetivo: crear un sistema visual reutilizable, editable y elegante: palo de rosa, blanco y negro; tipografias correctas; shadcn como base accesible; componentes propios sin aspecto generico de IA.

---

## Fuentes obligatorias

- `docs/cliente/identidad-marca.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/frontend-ui-ux-detalle.md`
- `docs/cliente/analisis-prototipos-stitch-figma-claude.md`
- `docs/cliente/planificacion-web-v2.md`
- `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `tailwind-design-system`
- `shadcn`
- `frontend-ui-engineering`
- `impeccable`
- `frontend-design`
- `design-taste-frontend`
- `responsive-design`
- `accessibility`
- `vercel-composition-patterns`
- `nextjs-framer-motion-animations`

Uso: shadcn se usa para primitivos accesibles y patrones robustos. La estetica final la definen los tokens y componentes propios del proyecto.

---

## Tokens obligatorios

- [x] `--color-background`
- [x] `--color-foreground`
- [x] `--color-primary` = palo de rosa `#B76E79` definido solo en tokens.
- [x] `--color-primary-foreground`
- [x] `--color-primary-text` anadido para texto pequeno accesible.
- [x] `--color-surface`
- [x] `--color-surface-muted`
- [x] `--color-border`
- [x] `--color-ring`
- [x] `--color-destructive`
- [x] `--shadow-soft`
- [x] `--shadow-elevated`
- [x] `--radius-sm`
- [x] `--radius-md`
- [x] `--radius-lg`
- [x] `--gradient-brand-soft`
- [x] `--gradient-ink`

Regla: no usar hex crudos dentro de componentes. Si cambia el color primario, bordes, sombras o gradientes, debe aplicarse a toda la web desde tokens.

---

## Tipografia

- [x] Marcellus para display/headings.
- [x] Manrope para body/UI.
- [x] Cargar con `next/font`.
- [x] No usar script fuera del logo.
- [x] No usar font-size con `vw`.
- [x] Letter spacing 0 salvo excepcion muy justificada.
- [x] Titulares grandes solo en heroes reales.
- [x] Titulares compactos dentro de panels/cards.

---

## shadcn: que usar

- [x] `Button` como base accesible, adaptado a tokens.
- [x] `Dialog` para WhatsApp chooser/lightbox si aplica.
- [x] `Sheet` para menu movil.
- [x] `Tabs` solo si mejora navegacion real.
- [x] `Tooltip` para iconos no obvios.
- [x] `Accordion` solo para contenido secundario no SEO-critico o renderizado HTML.
- [x] `Select` o menu si hay filtros reales; queda para fases con filtros.
- [x] `Badge` con uso sobrio para mercado, moneda, duracion.

shadcn no debe decidir la estetica. Se personaliza.

---

## Componentes base a crear

```txt
src/components/ui/
src/components/primitives/
  container.tsx
  section.tsx
  button-link.tsx
  page-hero.tsx
  eyebrow.tsx
  split-feature.tsx
  responsive-data-list.tsx
  empty-state.tsx
src/components/domain/
  market-selector.tsx
  service-card.tsx
  course-card.tsx
  download-card.tsx
```

Regla: estos componentes deben seguir `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`.

---

## Reutilizacion y homogeneidad

- [x] Definir `Button`, `ButtonLink`, `WhatsAppCTA`, `DownloadButton`.
- [x] Definir `MarketSelector`; `MarketTabs`/`SegmentedControl` se crean cuando una pantalla real los necesite.
- [x] Definir `ResponsiveDataList`; `ServicePriceTable` queda para Fase 07 con datos de servicios.
- [x] Definir `ServiceCard`, `CourseCard`, `DownloadCard`; `ResultTile` y `LocationCard` quedan para Fases 10/11.
- [x] Deferir `WhatsAppChooser`, `MobileNav`, `ResultLightbox` a Fases 05/11 para evitar APIs inventadas.
- [x] No crear botones/tabs/cards/tablas ad hoc en paginas creadas hasta ahora.
- [x] Variantes con CVA o patron equivalente.
- [x] Evitar props booleanas acumulativas.
- [x] Usar compound components si una pieza empieza a crecer.
- [x] `className` se permite para layout, no para reestilizar marca.

---

## Motion primitives a crear

Fuente: `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`.

- [x] `MotionProvider` con `MotionConfig reducedMotion="user"`.
- [x] `Reveal` para entradas de seccion.
- [x] `StaggerList` para listas cortas.
- [x] `MotionButton` o variantes de microinteraccion para CTA.
- [x] `MotionPanel` para dialog/drawer/lightbox.
- [x] Tokens de duracion/easing reutilizables.
- [x] Variants compartidas para fade, slide pequeno y scale sutil.
- [x] Documentar cuando usar CSS en vez de Motion.

---

## Reglas anti-IA

- [x] Botones naturales `inline-flex`; `w-full` solo en movil o necesidad real.
- [x] No cards dentro de cards.
- [x] No secciones completas como tarjetas flotantes.
- [x] No grid repetitivo de tarjetas para todo.
- [x] No carrusel como principal de servicios/cursos/resultados.
- [x] No gradientes morados/azules ni beige generico.
- [x] No orbs, blobs, bokeh ni decoracion abstracta.
- [x] No gradient text.
- [x] No sombras excesivas.
- [x] No copy explicando como usar la UI si la interaccion es evidente.
- [x] Las imagenes deben mostrar producto/persona/trabajo real.
- [x] CTAs no ocupan todo el ancho de una card en desktop.
- [x] Espaciado consistente pero no robotico.

---

## Reglas responsive

- [x] Mobile-first.
- [x] Container queries donde ayuden.
- [x] Grids con `minmax()` y constraints.
- [x] Touch targets minimo 44px.
- [x] No overflow horizontal en 390px.
- [x] Textos no se solapan.
- [x] Botones largos hacen wrap elegante o usan texto mas corto.
- [x] Elementos fijos no tapan CTA ni contenido.

---

## Reglas de accesibilidad

- [x] Focus visible y coherente.
- [x] Contraste AA.
- [x] Estados hover/focus/active/disabled.
- [x] Icon buttons con label accesible.
- [x] Tooltips solo complementan, no sustituyen labels.
- [x] Dialogs con focus trap por shadcn/Radix.
- [x] Sheet movil navegable con teclado por shadcn/Radix; se valida en Fase 05 al crear menu.
- [x] Reduced motion en componentes animados.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
rg "#[0-9A-Fa-f]{3,8}" src
```

Checks visuales:

- [x] Screenshot 390px.
- [x] Screenshot 430px.
- [x] Screenshot 768px.
- [x] Screenshot 1440px.
- [x] Focus visible con teclado.
- [x] Botones no full-width en desktop salvo justificacion.
- [x] Paleta no se ve como template beige/rosa generico.

---

## No avanzar si

- [x] Hay hex sueltos en componentes: verificado que no; solo quedan tokens globales y manifest.
- [x] Los botones base nacen full-width en desktop: verificado que no.
- [x] La UI depende de colores hardcodeados: verificado que no.
- [x] shadcn queda visualmente sin adaptar: verificado que no.

---

## Done cuando

- [x] Tokens editables existen.
- [x] Componentes base existen.
- [x] shadcn esta integrado sin mandar sobre la marca.
- [x] QA visual inicial aprobado.
- [x] Fase 04 marcada en `CHECKLIST-MAESTRA.md`.
