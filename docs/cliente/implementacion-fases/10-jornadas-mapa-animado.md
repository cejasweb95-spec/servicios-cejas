# Fase 10 - Jornadas y mapa animado

Estado: Completada

Nota de cierre 18/06/2026: implementada pagina bilingue `/es/jornadas` y `/en/appointments-by-city` con mapa editorial animado, lista accesible, CTAs por ciudad y schema sin eventos ficticios ni sedes fuera de Cali.

Mejora visual 19/06/2026: el mapa usa un recurso mundial optimizado mediante `next/image`, numeros de referencia sin etiquetas superpuestas y una lista HTML equivalente. En movil, el mapa se desplaza dentro de su propia region sin provocar overflow horizontal de pagina.

Objetivo: construir una pagina y seccion de mapa elegante, llamativa y accesible para mostrar sede fisica en Cali y proximas jornadas por disponibilidad en Colombia, Espana y Suiza.

---

## Fuentes obligatorias

- `docs/cliente/ubicaciones-jornadas.md`
- `docs/cliente/contacto-datos-legales.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/frontend-ui-ux-detalle.md`
- `docs/cliente/analisis-referencias-planteamiento-web.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `nextjs-framer-motion-animations`
- `responsive-design`
- `accessibility`
- `frontend-design`
- `impeccable`
- `user-flow-e2e-testing`
- `core-web-vitals-performance`

Uso: mapa editorial animado, no mapa pesado innecesario. La lista accesible es obligatoria.

---

## Ubicaciones confirmadas

- [x] Cali, Valle del Cauca, Colombia: sede fisica.
- [x] Restrepo, Valle del Cauca, Colombia: proxima jornada por disponibilidad.
- [x] Madrid, Espana: proxima jornada por disponibilidad.
- [x] Palma de Mallorca, Espana: proxima jornada por disponibilidad.
- [x] Puerto de Sagunto, Valencia, Espana: proxima jornada por disponibilidad.
- [x] Ginebra, Suiza: proxima jornada por disponibilidad.

---

## Modelo de datos

- [x] `id`.
- [x] `name`.
- [x] `country`.
- [x] `region`.
- [x] `market`.
- [x] `type`: sede-fisica | jornada-disponibilidad.
- [x] `coordinates` aproximadas si se usan en mapa.
- [x] `whatsappTarget`.
- [x] `localizedLabel`.
- [x] `localizedDescription`.

---

## Componente mapa

- [x] `EventMap`.
- [x] `EventMapPin`.
- [x] `EventRouteLine`.
- [x] `EventLocationList`.
- [x] `EventLocationCard`.
- [x] Fallback textual/lista accesible equivalente al mapa.
- [x] No depender solo de color para estado.
- [x] Pins con labels accesibles.
- [x] Interaccion por click/tap/keyboard.
- [x] Tooltip/popover accesible si aplica: no se uso tooltip/popover; detalle visible y lista accesible.

---

## Direccion visual

- [x] Mapa propio/editorial, no iframe pesado por defecto.
- [x] Trazos sutiles entre Cali y ciudades.
- [x] Palo de rosa como acento.
- [x] Blanco/negro como estructura.
- [x] Movimiento sutil de rutas/pins.
- [x] En mobile, lista accesible y mapa usable.
- [x] No usar globo 3D pesado si penaliza rendimiento.
- [x] No tapar contenido con pins.

---

## Animaciones

- [x] Aparicion progresiva de pins.
- [x] Lineas con stroke animado.
- [x] Hover/tap en ubicacion.
- [x] Reduced motion: mapa estatico/probado.
- [x] Animacion no necesaria para entender informacion.
- [x] Motion en componente client aislado.

---

## CTA

- [x] Cali -> WhatsApp Colombia.
- [x] Restrepo -> WhatsApp Colombia.
- [x] Madrid -> WhatsApp Espana/Europa/Suiza.
- [x] Palma de Mallorca -> WhatsApp Espana/Europa/Suiza.
- [x] Puerto de Sagunto -> WhatsApp Espana/Europa/Suiza.
- [x] Ginebra -> WhatsApp Espana/Europa/Suiza.
- [x] Texto no promete fecha exacta.

---

## SEO/schema

- [x] Pagina `Jornadas` ES/EN con contenido HTML rastreable.
- [x] H1 unico.
- [x] Metadata localizada.
- [x] Schema solo para Organizacion/LocalBusiness con Cali como direccion confirmada.
- [x] No crear LocalBusiness para Madrid/Palma/Puerto de Sagunto/Ginebra.
- [x] Las jornadas sin fecha no se publican como `Event` con fecha fake.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright:

- [x] Abrir `/es/jornadas`.
- [x] Abrir `/en/appointments-by-city`.
- [x] Interactuar con cada pin.
- [x] Interactuar con cada elemento de lista.
- [x] Teclado: Tab/Enter/Escape.
- [x] Reduced motion no anima.
- [x] Mobile 390 usable.
- [x] Desktop 1920 no queda desproporcionado.

---

## No avanzar si

- [ ] El mapa crea sedes no confirmadas.
- [ ] Se publican fechas inventadas.
- [ ] La informacion solo existe dentro de canvas/SVG no accesible.
- [ ] El mapa penaliza gravemente LCP/INP.

---

## Done cuando

- [x] Mapa y lista accesible listos.
- [x] Jornadas ES/EN publicadas.
- [x] CTA por ciudad correcto.
- [x] Fase 10 marcada en `CHECKLIST-MAESTRA.md`.
