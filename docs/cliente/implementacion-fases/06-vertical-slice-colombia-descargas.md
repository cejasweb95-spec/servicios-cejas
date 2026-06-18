# Fase 06 - Vertical slice Colombia + Descargas

Estado: Completa - implementada y validada el 18/06/2026.

Objetivo: construir el primer corte completo con datos reales: home minima, pagina Colombia, pagina Downloads/Descargas, PDF Colombia, WhatsApp Colombia, SEO ES/EN y QA responsive.

---

## Fuentes obligatorias

- `docs/cliente/catalogos-servicios-precios.md`
- `docs/cliente/catalogos-contenido-web-transcrito.md`
- `docs/cliente/resumen-servicios-precios-duraciones.md`
- `docs/cliente/duracion-sesiones.md`
- `docs/cliente/contacto-datos-legales.md`
- `docs/cliente/assets-inventario.md`
- `docs/cliente/i18n-es-en-plan.md`
- `docs/cliente/testing-qa-profesional.md`
- `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `shadcn`
- `responsive-design`
- `accessibility`
- `seo`
- `schema-structured-data`
- `user-flow-e2e-testing`
- `nextjs-framer-motion-animations`

Uso: este corte valida arquitectura, datos, UI, descargas, WhatsApp, i18n y SEO antes de escalar toda la web.

---

## Rutas a implementar

- [x] `/es`
- [x] `/en`
- [x] `/es/servicios/colombia`
- [x] `/en/services/colombia`
- [x] `/es/descargas`
- [x] `/en/downloads`

---

## Componentes a crear/usar

- [x] `PageHero`
- [x] `MarketDownloadBanner`
- [x] `ServiceList`
- [x] `ServiceCard`
- [x] `ServicePriceBlock`
- [x] `DownloadCard`
- [x] `WhatsAppChooser` o CTA directo Colombia segun contexto
- [x] `ResponsiveDataList` no requerido en este corte; las listas usan cards reutilizables.

Regla: no crear versiones locales de botones, cards o downloads dentro de esta pagina. Usar los componentes reutilizables.

---

## Checklist Colombia

- [x] Servicios Colombia salen de `getServicesByMarket("colombia", locale)`.
- [x] Precios en COP.
- [x] Duracion de cita visible cuando exista.
- [x] Duracion de resultado diferenciada si se muestra.
- [x] Categorias claras.
- [x] CTA WhatsApp usa Colombia.
- [x] No hay precios EUR/CHF en las tarjetas de servicios Colombia.
- [x] No hay texto de sede Espana/Suiza.
- [x] El catalogo Colombia PDF aparece una vez cerca del intro de mercado.
- [x] `ServiceCard` no tiene boton de descarga de catalogo.

---

## Checklist Descargas

- [x] Lista catalogo Colombia.
- [x] Lista catalogo Espana/Europa si ya esta registrado.
- [x] Lista catalogo Suiza si ya esta registrado.
- [x] Lista PDFs de cursos si ya estan registrados.
- [x] Cada download tiene title ES/EN.
- [x] Cada download tiene descripcion ES/EN.
- [x] Cada download tiene tipo.
- [x] Cada download tiene mercado o curso asociado cuando aplique.
- [x] Cada link descarga/abre PDF real.

---

## Checklist SEO

- [x] H1 unico en `/es/servicios/colombia`.
- [x] H1 unico en `/en/services/colombia`.
- [x] Metadata ES.
- [x] Metadata EN.
- [x] Canonical ES/EN.
- [x] hreflang ES/EN.
- [x] Breadcrumbs si aplica.
- [x] Schema solo con datos confirmados: `BreadcrumbList`.
- [x] Contenido rastreable en HTML.

---

## Checklist UI/UX

- [x] No usar carrusel para servicios.
- [x] Servicios faciles de escanear.
- [x] Precio/duracion no compiten con descripcion.
- [x] CTA no full-width en desktop salvo layout justificado.
- [x] Boton PDF una sola vez y visualmente claro.
- [x] En movil, CTAs se apilan sin solaparse.
- [x] El contenido no parece plantilla generica.
- [x] `ServiceCard`, `DownloadCard`, `ButtonLink` y `DownloadButton` reutilizados.

---

## Animaciones Motion

Fuente: `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`.

- [x] `MarketDownloadBanner` con reveal suave y feedback hover/tap.
- [x] `ServiceCard` con hover sobrio, no salto exagerado.
- [x] `ServiceList` con stagger limitado y sin ocultar contenido critico.
- [x] `DownloadCard` con microfeedback de descarga.
- [x] Respetar reduced motion via `MotionConfig reducedMotion="user"` y `motion-reduce`.
- [x] No animar precio/duracion de forma que aparezcan tarde o generen CLS.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright:

- [x] `/es/servicios/colombia` carga 200.
- [x] `/en/services/colombia` carga 200.
- [x] El PDF Colombia aparece exactamente una vez en la pagina de mercado.
- [x] Ningun `ServiceCard` contiene link de catalogo.
- [x] WhatsApp Colombia contiene `573167742299`.
- [x] `/es/descargas` lista catalogo Colombia.
- [x] `/en/downloads` lista catalogo Colombia en ingles.
- [x] Mobile 390 sin overflow horizontal.

---

## No avanzar si

- [x] Verificado: Colombia sale de query layer.
- [x] Verificado: PDF Colombia no se repite por servicio.
- [x] Verificado: existe version EN.
- [x] Verificado: WhatsApp usa el numero correcto.
- [x] Verificado: build pasa.

---

## Done cuando

- [x] Vertical slice completa.
- [x] QA responsive y E2E basico pasa.
- [x] Las reglas criticas quedan probadas antes de escalar.
- [x] Fase 06 marcada en `CHECKLIST-MAESTRA.md`.

---

## Validacion ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- `npm run test:links`

Notas:

- El PDF Colombia se prueba con count exacto `1`.
- Las tarjetas de servicio se prueban para que no contengan enlace al catalogo.
- El schema `BreadcrumbList` se valida desde Playwright leyendo JSON-LD.
- Se ajusto Motion para no usar `opacity: 0` en contenido critico, evitando falsos y reales problemas de contraste en axe.
