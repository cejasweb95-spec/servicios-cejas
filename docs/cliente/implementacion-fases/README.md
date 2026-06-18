# Implementacion por fases - Cejas Internacionales

Ultima actualizacion: 17/06/2026.

Este directorio convierte la planificacion general en fases ejecutables. La idea es que Codex, Cursor AI o Claude Code puedan avanzar fase por fase sin saltarse datos, diseno, SEO, i18n, accesibilidad, rendimiento, descargas, WhatsApp, mapa ni reglas de mercado.

---

## Como se usa

1. Antes de tocar codigo, leer `AGENTS.md`, `PRODUCT.md` y esta carpeta.
2. Abrir `CHECKLIST-MAESTRA.md` para ver el estado global.
3. Trabajar solo una fase activa a la vez.
4. En cada fase:
   - leer "Fuentes obligatorias",
   - activar las skills indicadas,
   - completar la checklist tecnica,
   - completar la checklist de contenido,
   - completar la checklist UI/UX,
   - ejecutar los tests definidos,
   - marcar con `[x]` lo terminado.
5. No marcar una fase como cerrada si queda una duda bloqueante en su seccion "No avanzar si".

---

## Regla de progreso

Usar estos estados dentro de cada MD:

```md
Estado: Pendiente
Estado: En progreso
Estado: Bloqueada
Estado: QA pendiente
Estado: Completada
```

Cuando una tarea se termine, cambiar:

```md
- [ ] Tarea pendiente.
```

por:

```md
- [x] Tarea terminada.
```

Si una tarea queda bloqueada, no se borra. Se anota debajo:

```md
- [ ] Tarea bloqueada.
  Bloqueo: falta confirmacion de la clienta.
```

---

## Orden recomendado

1. `00-qa-auditoria-preimplementacion.md`
2. `01-scaffold-next-i18n.md`
3. `02-modelado-datos-query-layer.md`
4. `03-assets-pdfs-imagenes.md`
5. `04-design-system-shadcn-tokens.md`
6. `05-app-shell-navegacion-whatsapp.md`
7. `06-vertical-slice-colombia-descargas.md`
8. `07-servicios-mercados-detalles.md`
9. `08-home-editorial-conversion.md`
10. `09-formaciones-cursos.md`
11. `10-jornadas-mapa-animado.md`
12. `11-resultados-sobre-cuidados-contacto-legal.md`
13. `12-seo-schema-performance.md`
14. `13-qa-crossbrowser-accesibilidad-e2e.md`
15. `14-predeploy-hostinger-supabase.md`

Documento transversal:

- `MOTION-ANIMACIONES-POR-PAGINA.md` define como usar Motion/Framer Motion por pagina, fase, componente y QA.
- `COMPONENTES-REUTILIZABLES-SISTEMA.md` define reutilizacion de botones, tabs, tablas/listas, cards, dialogs, CTAs y componentes de dominio.
- `SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md` define investigacion SERP/competencia, keyword map, briefs por pagina, auditoria final y tareas post-publicacion.
- `QA-SENIOR-MATRIZ-PRUEBAS-WEB.md` define smoke, regression, E2E, visual regression, trace viewer, WAVE/axe, Lighthouse CI, security headers, link checks, i18n QA y RUM.
- `QA-ANALISIS-PREIMPLEMENTACION-2026-06-17.md` resume el estado previo a codigo, recomendaciones y dudas no bloqueantes.
- `../legal-privacidad-cookies-ga4.md` define aviso legal, privacidad, cookies, GA4 con Consent Mode, SEO multi-pais y reglas hover/focus.

---

## Skills base

Todas las fases empiezan con:

- `cejas-internacionales-guardrails`

Luego se agregan skills por necesidad. La skill de Cejas manda sobre skills genericas: si una skill generica recomienda algo que contradice los MD del proyecto, prevalecen `AGENTS.md`, `PRODUCT.md` y los documentos de `docs/cliente/`.

---

## Fuente de verdad

No usar prototipos externos, memoria o intuicion para datos de negocio. Usar:

- `PRODUCT.md`
- `docs/cliente/repaso-general-documentacion-cliente.md`
- `docs/cliente/catalogos-servicios-precios.md`
- `docs/cliente/catalogos-contenido-web-transcrito.md`
- `docs/cliente/resumen-servicios-precios-duraciones.md`
- `docs/cliente/cursos-masterclass.md`
- `docs/cliente/contacto-datos-legales.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`
- `docs/cliente/ubicaciones-jornadas.md`
- `docs/cliente/assets-inventario.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/frontend-ui-ux-detalle.md`
- `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`
- `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`
- `docs/cliente/implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`
- `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`
- `docs/cliente/seo-desde-inicio-estrategia.md`
- `docs/cliente/testing-qa-profesional.md`

---

## Reglas criticas que se verifican en varias fases

- No tocar `main`.
- Trabajar en `develop` salvo instruccion nueva.
- No editar `.next`, `node_modules`, `dist`, outputs ni artefactos compilados.
- V1 es informativa: no tienda, no checkout, no carrito, no formulario de reserva.
- CTA principal: `Contacta conmigo`.
- Cita y reserva solo por WhatsApp.
- Colombia: `573167742299`.
- Espana/Europa/Suiza: `34603804837`.
- Direccion fisica/legal solo Cali, Colombia.
- Servicios filtrados por mercado.
- COP, EUR y CHF no se mezclan.
- Catalogo PDF de mercado se muestra una vez por pagina de mercado, no en cada servicio.
- PDF de curso si puede aparecer en cada curso.
- Publico bilingue ES/EN desde el primer commit de pagina.
- SEO en arquitectura, no como maquillaje final.
- Botones naturales `inline-flex`; no full-width salvo movil o caso real.
- No cards dentro de cards.
- No carrusel como forma principal de mostrar servicios/cursos/resultados.
- Reutilizar componentes; no crear botones, tabs, tablas, cards o CTAs ad hoc por pagina.
- Motion pequeno, accesible y respetando `prefers-reduced-motion`.
- Motion planificado segun `MOTION-ANIMACIONES-POR-PAGINA.md`.
- SEO trabajado antes, durante y despues de implementar segun `SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`.
- QA senior aplicado segun `QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`.
- GA4 solo con banner de cookies, politica de cookies y Consent Mode.
- Aviso legal, privacidad y cookies en ES/EN son obligatorios en V1.
- Hover siempre con equivalente focus/tap/click.
- Visual regression local en V1; CI queda para fase futura si se decide.
- La web debe estar preparada para futura migracion a Supabase sin reescribir UI.
