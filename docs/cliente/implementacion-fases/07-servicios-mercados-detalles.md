# Fase 07 - Servicios por mercado y detalles

Estado: Completa - implementada y validada el 18/06/2026.

Objetivo: completar las paginas de servicios para Colombia, Espana/Europa y Suiza, con filtros por mercado, detalle de servicios prioritarios, precios/duraciones correctos y sin mezcla de catalogos.

---

## Fuentes obligatorias

- `docs/cliente/catalogos-servicios-precios.md`
- `docs/cliente/catalogos-contenido-web-transcrito.md`
- `docs/cliente/resumen-servicios-precios-duraciones.md`
- `docs/cliente/duracion-sesiones.md`
- `docs/cliente/catalogo-suiza-chf.md`
- `docs/cliente/planificacion-web-v2.md`
- `docs/cliente/frontend-ui-ux-detalle.md`
- `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `copywriting`
- `seo`
- `schema-structured-data`
- `shadcn`
- `responsive-design`
- `accessibility`
- `user-flow-e2e-testing`
- `nextjs-framer-motion-animations`

Uso: construir paginas de servicios con contenido confirmado, copy localizado profesional y controles accesibles.

---

## Rutas a implementar

- [x] `/es/servicios`
- [x] `/en/services`
- [x] `/es/servicios/colombia`
- [x] `/en/services/colombia`
- [x] `/es/servicios/espana-europa`
- [x] `/en/services/spain-europe`
- [x] `/es/servicios/suiza`
- [x] `/en/services/switzerland`
- [x] Detalles ES/EN para servicios publicados por mercado.
- [x] Rutas cruzadas no prerenderizadas: `/en/servicios`, `/es/services`, `/en/descargas`, `/es/downloads`.

---

## Checklist mercado Colombia

- [x] COP.
- [x] WhatsApp Colombia.
- [x] Incluye servicios exclusivos de Colombia si estan en catalogo.
- [x] Puede incluir pestanas.
- [x] Puede incluir unas.
- [x] Puede incluir peinados/maquillaje si estan en catalogo.
- [x] Descarga catalogo Colombia una vez.
- [x] Direccion legal Cali disponible en contexto de sede/legal, sin crear sedes fuera de Colombia.

---

## Checklist mercado Espana/Europa

- [x] EUR.
- [x] WhatsApp Espana/Europa/Suiza.
- [x] No crear sede fisica.
- [x] Mostrar como jornadas/servicio por disponibilidad segun corresponda.
- [x] No incluir exclusivos Colombia si no aplican.
- [x] Descarga catalogo Espana/Europa una vez.

---

## Checklist mercado Suiza

- [x] CHF.
- [x] WhatsApp Espana/Europa/Suiza.
- [x] Ginebra como jornada por disponibilidad.
- [x] No crear sede fisica.
- [x] No mostrar HidraLips.
- [x] No mostrar depilaciones.
- [x] No mostrar correccion de cejas salvo confirmacion futura.
- [x] Refuerzo cejas hibridas 150 CHF si aplica segun doc.
- [x] Descarga catalogo Suiza una vez.

---

## Checklist tarjetas/listado

- [x] Nombre servicio.
- [x] Categoria.
- [x] Mercado.
- [x] Precio con moneda.
- [x] Duracion de cita.
- [x] Descripcion corta.
- [x] CTA WhatsApp contextual.
- [x] Link a detalle.
- [x] No boton PDF catalogo dentro de cards.
- [x] Layout estable con textos largos.
- [x] CTA natural, no full-width en desktop.
- [x] Card reutiliza `ServiceCard` o composiciones derivadas.
- [x] Precio/duracion reutilizan componentes de datos, no markup local.

---

## Checklist detalle de servicio

- [x] H1 con nombre del servicio y mercado/contexto.
- [x] Descripcion extendida tomada de documentos.
- [x] Precio/duracion visible.
- [x] Que incluye si esta confirmado; no se inventan bloques si el catalogo no lo trae.
- [x] Cuidados relacionados si existen; no se inventan cuidados no documentados.
- [x] CTA WhatsApp contextual.
- [x] Servicios relacionados del mismo mercado.
- [x] No claims sensibles sin confirmar.
- [x] Schema `Service` solo con datos confirmados.

---

## Animaciones Motion

Fuente: `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`.

- [x] Selector de mercado/filtros con `layoutId` para indicador activo.
- [x] Transicion por URL limpia al cambiar mercado, compatible con back/forward.
- [x] Stagger ligero por categorias, no por listas largas completas.
- [x] Hover/tap sobrio en `ServiceCard`.
- [x] Reveal de bloques en detalle de servicio.
- [x] CTA WhatsApp con microinteraccion consistente.
- [x] Reduced motion soportado por `MotionConfig reducedMotion="user"` y clases `motion-reduce`.
- [x] No ocultar precios, duraciones ni CTA hasta que termine una animacion.

---

## Reutilizacion de componentes

- [x] `MarketTabs` o `MarketSelector` para mercado.
- [x] `ServiceCard` para listados.
- [x] `ServicePriceBlock` para precio/moneda.
- [x] Duraciones reutilizadas con `ServicePriceBlock`, `formatDuration()` y `ResponsiveDataList`; `ServiceDurationList` dedicado queda como opcional futuro si aparece una tabla especifica de duraciones.
- [x] `ResponsiveDataList` en tablas/listas.
- [x] `WhatsAppCTA` para conversion.
- [x] No crear botones ni tablas locales dentro de paginas de servicio.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:links
npm run test:e2e
```

Tests recomendados:

- [x] Colombia solo COP.
- [x] Espana/Europa solo EUR.
- [x] Suiza solo CHF.
- [x] HidraLips no aparece en Suiza.
- [x] Depilaciones no aparecen en Suiza.
- [x] Correccion de cejas no aparece en Suiza.
- [x] Catalogo de cada mercado aparece una vez.
- [x] Cada CTA WhatsApp usa numero correcto.
- [x] Cambio idioma mantiene mercado equivalente.
- [x] Mobile 390/430 sin overflow.

Validacion ejecutada el 18/06/2026:

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run test`
- [x] `npm run test:links`
- [x] `npm run test:e2e` - 36 tests OK en desktop y mobile.

---

## No avanzar si

- [x] Validado: no falta precio o duracion en servicios publicados.
- [x] Validado: no se mezcla moneda/mercado.
- [x] Validado: no hay servicios publicados por intuicion, no por catalogo.
- [x] Validado: no falta version EN en las rutas creadas.

---

## Done cuando

- [x] Todos los mercados publicados correctamente.
- [x] Detalles prioritarios listos.
- [x] Tests de mercado pasan.
- [x] Fase 07 marcada en `CHECKLIST-MAESTRA.md`.
