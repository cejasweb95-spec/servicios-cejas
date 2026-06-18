# Fase 00 - QA y auditoria preimplementacion

Estado: Completada

Objetivo: confirmar que la base del proyecto, la documentacion y los activos estan listos antes de crear codigo fuente. Esta fase evita construir sobre datos incompletos o reglas antiguas.

---

## Fuentes obligatorias

- `AGENTS.md`
- `PRODUCT.md`
- `docs/cliente/README-implementacion.md`
- `docs/cliente/implementacion-v1-plan-operativo.md`
- `docs/cliente/implementacion-v1-checklist.md`
- `docs/cliente/repaso-general-documentacion-cliente.md`
- `docs/cliente/estado-checklist.md`
- `docs/cliente/planificacion-web-v2.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/frontend-ui-ux-detalle.md`
- `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`
- `docs/cliente/i18n-es-en-plan.md`
- `docs/cliente/seo-desde-inicio-estrategia.md`
- `docs/cliente/testing-qa-profesional.md`
- `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`
- `docs/cliente/implementacion-fases/QA-ANALISIS-PREIMPLEMENTACION-2026-06-17.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `seo-audit`
- `cross-browser-device-qa`
- `user-flow-e2e-testing`

Uso: no se implementa UI aqui. Se usan para auditar que las reglas, i18n, SEO y QA estan contemplados antes del scaffold.

---

## Checklist de repo

- [x] Confirmar rama `develop` con `git branch --show-current`.
- [x] Confirmar que `main` no se toca.
- [x] Revisar `git status --short` y separar cambios propios de cambios existentes.
- [x] Confirmar que no se editan `.next`, `node_modules`, `dist`, build outputs ni `tsconfig.tsbuildinfo`.
- [x] Confirmar si existe o no app fuente (`package.json`, `src/`, `app/`).
- [x] Confirmar que la implementacion empezara desde app limpia si no hay fuente real.

---

## Checklist de documentacion fuente

- [x] Confirmar que existe `PRODUCT.md`.
- [x] Confirmar que existe `planificacion-web-v2.md`.
- [x] Confirmar que existe `frontend-ui-ux-v3-profesional.md`.
- [x] Confirmar que existe `frontend-ui-ux-detalle.md`.
- [x] Confirmar que existe `arquitectura-tecnica-hostinger-futura-db.md`.
- [x] Confirmar que existe `i18n-es-en-plan.md`.
- [x] Confirmar que existe `seo-desde-inicio-estrategia.md`.
- [x] Confirmar que existe `testing-qa-profesional.md`.
- [x] Confirmar que existe `QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`.
- [x] Confirmar que el analisis preimplementacion no deja bloqueos criticos.
- [x] Confirmar que los prototipos externos estan marcados como referencia temporal, no fuente de verdad.

---

## Checklist de contenido confirmado

- [x] Bio / Sobre Xiomara localizado como contenido base.
- [x] Certificaciones y trayectoria documentadas.
- [x] Catalogos Colombia, Espana/Europa y Suiza disponibles.
- [x] Precios COP, EUR y CHF separados por mercado.
- [x] Duraciones de citas cerradas para servicios del catalogo.
- [x] Duraciones de cursos confirmadas.
- [x] PDFs de formaciones identificados.
- [x] Direccion legal Cali confirmada.
- [x] NIT `1.144.186.472-5` documentado.
- [x] Email `contacto@cejasinternacionales.com` documentado.
- [x] WhatsApp Colombia `573167742299` documentado.
- [x] WhatsApp Espana/Europa/Suiza `34603804837` documentado.
- [x] Redes sociales documentadas.
- [x] Fotos reales disponibles documentadas.

---

## Checklist de decisiones cerradas

- [x] No tienda online en V1.
- [x] No checkout.
- [x] No carrito.
- [x] No formulario de reserva.
- [x] Reserva solo por WhatsApp.
- [x] CTA principal `Contacta conmigo`.
- [x] Servicios filtrados por mercado.
- [x] Cali es la unica sede fisica/legal.
- [x] Jornadas fuera de Cali son por disponibilidad.
- [x] FAQ final no bloquea implementacion.
- [x] Ingles internacional obligatorio desde el inicio.

---

## Checklist de riesgos detectados

- [x] Evitar mezclar servicios Colombia en Espana/Europa.
- [x] Evitar mostrar HidraLips en Suiza.
- [x] Evitar mostrar depilaciones en Suiza.
- [x] Evitar mostrar correccion de cejas en Suiza salvo confirmacion futura.
- [x] Evitar duplicar botones de descarga PDF de catalogo en cada servicio.
- [x] Evitar inventar fechas/cupos/requisitos de cursos.
- [x] Evitar inventar oficinas en Espana o Suiza.
- [x] Evitar claims medicos, higienicos o de dolor sin confirmacion.
- [x] Evitar traducir literalmente al ingles.

---

## Tests / comandos

```bash
git branch --show-current
git status --short
rg --files
rg "TODO|pendiente|confirmar|bloqueo" docs/cliente
```

Si ya existe app fuente:

```bash
npm run lint
npm run typecheck
npm run build
```

---

## Criterios de aceptacion

- [x] Se puede explicar que datos estan confirmados y cuales quedan como no publicables.
- [x] Se confirma que la implementacion empezara en `develop`.
- [x] Se confirma que no hay dependencia de prototipos externos.
- [x] Se confirma que la matriz QA senior queda incorporada antes del scaffold.
- [x] Se confirma que las fases siguientes tienen informacion suficiente para empezar.

---

## No avanzar si

- [ ] La rama no es `develop`.
- [ ] Alguien pide tocar `main` sin instruccion explicita.
- [ ] Falta alguno de los MD obligatorios.
- [ ] No esta claro si la app existente es fuente real o artefacto compilado.

---

## Done cuando

- [x] Esta fase queda marcada como `Completada`.
- [x] `CHECKLIST-MAESTRA.md` marca la Fase 00 como terminada.
- [x] Se puede empezar la Fase 01 sin dudas criticas.
