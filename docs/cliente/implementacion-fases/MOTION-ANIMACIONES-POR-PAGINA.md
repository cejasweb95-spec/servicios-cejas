# Motion / Framer Motion por pagina

Ultima actualizacion: 17/06/2026.

Objetivo: definir donde se usara Motion for React / Framer Motion en la web, con criterio premium, accesible y SEO-safe. Este documento complementa las fases de implementacion.

---

## Regla base

- Usar `nextjs-framer-motion-animations` siempre que se implemente Motion.
- Preferir el paquete moderno `motion` con imports desde `motion/react`.
- Si el proyecto final ya trae `framer-motion`, mantener consistencia o migrar conscientemente.
- Mantener Motion en componentes cliente pequenos.
- Mantener datos y contenido SEO en Server Components/HTML rastreable.
- Animar transform y opacity, no dimensiones criticas.
- Usar `MotionConfig reducedMotion="user"`.
- Usar `useReducedMotion()` cuando una animacion tenga version alternativa.
- No animar todas las secciones igual.
- No usar scroll-jacking, parallax pesado ni efectos que tapen contenido.

---

## Motion primitives recomendados

Crear una capa pequena reutilizable:

```txt
src/components/motion/
  motion-provider.tsx
  reveal.tsx
  stagger-list.tsx
  motion-button.tsx
  motion-panel.tsx
  animated-presence-shell.tsx
  use-reduced-motion-safe.ts
```

Uso previsto:

- `Reveal`: entradas suaves de secciones.
- `StaggerList`: listas cortas de servicios/cursos/descargas.
- `MotionButton`: hover/tap/focus consistente.
- `MotionPanel`: dialog, drawer, lightbox, WhatsApp chooser.
- `layoutId`: indicadores activos de filtros/tabs/mercados.
- `AnimatePresence`: chooser, lightbox, mobile nav, panels.

---

## Motion budget

| Tipo | Duracion | Movimiento |
|---|---:|---|
| Hover/tap CTA | 0.12s - 0.20s | scale max 1.02, y -1/2px |
| Reveal seccion | 0.20s - 0.35s | opacity + y 8/18px |
| Stagger lista corta | 0.03s - 0.07s delay item | max 6-8 items visibles |
| Dialog/drawer/lightbox | 0.18s - 0.28s | opacity + scale/y pequeno |
| Indicador tabs/mercado | spring suave | `layoutId` |
| Mapa rutas/pins | 0.4s - 0.8s | solo decorativo, fallback estatico |

---

## Matriz por pagina

| Pagina/seccion | Motion recomendado | No hacer |
|---|---|---|
| Home hero | Reveal suave de texto y CTA; imagen sin zoom agresivo; entrada del selector de mercado | No bloquear LCP, no animar H1 desde cero si crea CLS |
| Home selector mercado | `layoutId` para indicador activo; hover/tap en opciones | No esconder servicios detras de animacion client-only |
| Home servicios destacados | Stagger ligero en cards/lista visible | No carrusel principal |
| Home resultados teaser | Hover leve en imagen; transicion a galeria si aplica | No zoom fuerte ni blur pesado |
| Home formaciones teaser | Reveal + CTA hover/tap | No inventar fechas con animaciones de countdown |
| Servicios index | Transicion suave entre filtros/mercados con `layoutId` | No rehacer toda la lista con animaciones largas |
| Servicios mercado | Stagger controlado de categorias y servicios; hover sobrio en `ServiceCard` | No animar cada card con efectos distintos |
| Servicio detalle | Reveal de bloques; entrada de CTA sticky si existe sin tapar contenido | No ocultar precio/duracion hasta que termine la animacion |
| Descargas | Stagger corto en `DownloadCard`; feedback de descarga | No repetir PDF por servicio |
| Formaciones index | Stagger en cursos; hover de `CourseCard`; indicador activo si hay filtros | No carrusel como principal |
| Formacion detalle | Reveal de temario; `AnimatePresence` en accordions/panels si se usan | No esconder temario SEO en client-only |
| Fechas/cupos futuros | `layoutId` para tabs ciudad/estado; microfeedback en CTA | No publicar countdown o fecha falsa |
| Jornadas/mapa | Pins, rutas y popovers con Motion; fallback lista accesible | No usar mapa pesado que perjudique LCP/INP |
| Resultados | Lightbox con `AnimatePresence`; hover leve en mosaico | No autoplay/carousel principal |
| Sobre Xiomara | Reveal editorial de bio y certificaciones; timeline suave | No animar cada linea de texto |
| Cuidados | Reveal por bloques; accordion solo si SEO-safe | No esconder recomendaciones importantes tras JS |
| Contacto | Dialog/chooser y hover/tap de opciones WhatsApp | No convertir contacto en formulario |
| Cookies | Banner con entrada discreta; preferencias en dialog accesible | No empujar contenido, ocultar rechazo o crear dark patterns |
| Legal | Minimo o sin Motion | No animaciones decorativas |

---

## Matriz por fase

| Fase | Uso de Motion |
|---|---|
| 04 Sistema de diseno | Crear primitives/tokens de motion y reglas de uso |
| 05 App shell | Mobile nav, WhatsApp chooser, focus/exit states |
| 06 Vertical slice | ServiceCard, DownloadCard y MarketDownloadBanner con microinteracciones |
| 07 Servicios | Filtros/mercados con `layoutId`, stagger ligero y detalles |
| 08 Home | Hero, mercado, servicios destacados, resultados, formaciones |
| 09 Formaciones | Cards, temario, descarga PDF, CTA fechas/cupos |
| 10 Jornadas/mapa | Implementado: pins, rutas, lista accesible y fallback reduced motion probado |
| 11 Resultados/Sobre/Cuidados/Contacto/Legal | Lightbox, bio/timeline, bloques de cuidados, chooser/contact options, banner cookies minimo |
| 12 SEO/performance | Auditar bundle, LCP, CLS, reduced motion |
| 13 QA | Probar reduced motion, keyboard, dialogs, lightbox y responsive |

---

## QA obligatorio

- [x] `prefers-reduced-motion` reduce o elimina animaciones no esenciales en Jornadas/mapa.
- [x] No hay contenido SEO que solo exista en cliente en las paginas implementadas hasta ahora.
- [x] No hay CLS por animacion detectado en smoke/E2E de paginas implementadas hasta ahora.
- [x] No hay scroll-jacking.
- [x] Dialogs/lightbox devuelven foco al trigger en Resultados y WhatsApp chooser probado.
- [ ] Listas largas no hacen stagger excesivo.
- [ ] Motion no se importa en Server Components salvo patron compatible justificado.
- [x] `npm run build` pasa.
- [x] Playwright verifica menu movil, WhatsApp chooser, filtros, descargas y mapa; lightbox queda pendiente hasta Resultados final.
