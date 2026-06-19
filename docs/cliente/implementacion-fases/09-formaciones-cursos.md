# Fase 09 - Formaciones y cursos

Estado: Completa - implementada y validada; mejora visual aplicada el 19/06/2026.

Nota 19/06/2026: cada curso dispone de imagen real localizada mediante `imageId`; el listado separa formaciones profesionales de masterclasses y reutiliza `CourseCard`. Los detalles muestran imagen, datos rapidos, temario, precios, descarga y CTA. El schema `Course` incorpora la imagen confirmada.

Objetivo: publicar formaciones/cursos con contenido de PDFs, duraciones confirmadas, descargas por curso, CTA de WhatsApp para fechas/cupos y estructura preparada para futuras fechas o jornadas.

---

## Fuentes obligatorias

- `docs/cliente/cursos-masterclass.md`
- `docs/cliente/formaciones-certificaciones.md`
- `docs/cliente/assets-extraidos/formaciones-pdfs/originales/`
- `docs/cliente/ubicaciones-jornadas.md`
- `docs/cliente/i18n-es-en-plan.md`
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

Uso: convertir PDFs de formaciones en contenido web estructurado sin inventar fechas, cupos o requisitos.

---

## Rutas a implementar

- [x] `/es/formaciones`
- [x] `/en/professional-training`
- [x] Detalle curso micropigmentacion de cejas ES/EN.
- [x] Detalle curso micropigmentacion/neutralizacion labial ES/EN.
- [x] Detalle masterclass henna ES/EN.
- [x] Detalle masterclass laminado ES/EN.
- [x] Detalle masterclass lifting ES/EN.

---

## Cursos confirmados

- [x] Micropigmentacion de cejas.
- [x] Micropigmentacion y neutralizacion labial.
- [x] Laminado de cejas.
- [x] Lifting de pestanas.
- [x] Cejas en henna.

---

## Duraciones confirmadas

- [x] Micropigmentacion de cejas: 3 dias.
- [x] Micropigmentacion/neutralizacion labial: 3 dias.
- [x] Laminado: 1 dia.
- [x] Lifting: 1 dia.
- [x] Henna: 1 dia.

---

## Checklist contenido curso

- [x] Nombre ES/EN.
- [x] Resumen ES/EN.
- [x] Duracion.
- [x] Modalidad si esta confirmada.
- [x] Temario desde PDF.
- [x] Que incluye si esta confirmado.
- [x] Certificacion si esta confirmada.
- [x] Precio si esta confirmado en PDF.
- [x] PDF descargable asociado.
- [x] CTA WhatsApp para fechas/cupos.
- [x] No inventar requisitos.
- [x] No inventar cupos.
- [x] No inventar proxima fecha.
- [x] No prometer ingresos o resultados profesionales garantizados.

---

## Sistema futuro de fechas

Preparar datos para:

- [x] `courseId` existe en modelo de curso y descarga.
- [x] `market` existe en ofertas de curso.
- [ ] `city` queda para modelo futuro de fechas/jornadas de curso.
- [ ] `startDate` opcional queda para modelo futuro de fechas/jornadas de curso.
- [ ] `endDate` opcional queda para modelo futuro de fechas/jornadas de curso.
- [ ] `spots` opcional queda para modelo futuro de fechas/jornadas de curso.
- [ ] `status`: planned, available, sold-out, waitlist queda para modelo futuro de fechas/jornadas de curso.
- [x] CTA de consulta por WhatsApp si no hay fecha.

V1:

- [x] Mostrar `Consultar proxima fecha por WhatsApp`.
- [x] Mostrar ciudad/jornada solo si esta confirmada; en cursos no se publica ciudad concreta sin confirmacion.

---

## UI/UX

- [x] Listado de cursos escaneable.
- [x] Hero editorial con imagen real de Xiomara como formadora.
- [x] Formaciones profesionales y masterclasses diferenciadas visual y semanticamente.
- [x] Imagen real estable en cada `CourseCard` y detalle.
- [x] No carrusel como principal.
- [x] PDF por curso permitido.
- [x] Cards con CTA natural, no full-width desktop.
- [x] Detalle con temario claro.
- [x] Bloque de descarga no repetido innecesariamente.
- [x] Bloque de contacto no es fijo para no tapar contenido.
- [x] `CourseCard`, `CourseModuleList`, `CoursePriceList`, `DownloadButton` y `WhatsAppChooser` reutilizados.
- [x] No crear botones PDF locales por curso.

---

## Animaciones Motion

Fuente: `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`.

- [x] Stagger en `CourseCard` solo en listado visible.
- [x] Hover/tap sobrio en card y CTA.
- [x] Reveal de temario en detalle.
- [x] `AnimatePresence` no aplica porque no se usan accordions/panels en V1 de cursos.
- [x] Feedback visual al descargar PDF del curso mediante `DownloadButton`.
- [x] Bloque `Consultar proxima fecha` con entrada suave, sin countdown falso.
- [x] Reduced motion elimina desplazamientos y deja estado instantaneo.
- [x] Temario y contenido del PDF permanecen en HTML rastreable.

---

## Reutilizacion de componentes

- [x] `CourseCard` para listado.
- [x] `CourseModuleList` para temario.
- [x] `CoursePriceList` para precios/modalidades.
- [x] `DownloadButton` para PDF del curso.
- [x] `WhatsAppChooser` para fechas/cupos.
- [x] `ResponsiveDataList` para datos rapidos.
- [x] No crear layouts distintos para cada curso si comparten estructura.

---

## SEO/schema

- [x] H1 unico por pagina.
- [x] Metadata ES/EN.
- [x] Schema `Course` solo con datos confirmados.
- [x] No usar fechas fake en schema.
- [x] Breadcrumbs.
- [x] Contenido del PDF tambien visible en HTML cuando sea relevante.

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

Playwright:

- [x] Listado formaciones ES carga.
- [x] Listado formaciones EN carga.
- [x] Cada curso tiene PDF correcto.
- [x] Cada CTA abre WhatsApp.
- [x] No hay fecha/cupo inventado visible.
- [x] Mobile 390 sin solapes.
- [x] Cambio idioma mantiene curso equivalente.

Validacion ejecutada el 18/06/2026:

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run build`
- [x] `npm run test:links`
- [x] `npm run test:e2e` - 46 tests OK en desktop y mobile.

---

## No avanzar si

- [x] Validado: no falta PDF de un curso publicado.
- [x] Validado: no falta EN de un curso.
- [x] Validado: no hay fechas o cupos inventados.
- [x] Validado: la pagina no solo enlaza PDF, tambien ofrece contenido HTML rastreable.

---

## Done cuando

- [x] Formaciones ES/EN completas.
- [x] PDFs descargables funcionando.
- [x] CTA de fechas/cupos por WhatsApp listo.
- [x] Fase 09 marcada en `CHECKLIST-MAESTRA.md`.
