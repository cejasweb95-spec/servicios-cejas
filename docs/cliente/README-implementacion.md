# README de implementacion - Cejas Internacionales

Este es el punto de entrada para empezar la implementacion real de la web.

---

## Orden de lectura

1. `AGENTS.md`
2. `PRODUCT.md`
3. `docs/cliente/implementacion-fases/README.md`
4. `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md`
5. `docs/cliente/implementacion-v1-plan-operativo.md`
6. `docs/cliente/implementacion-v1-checklist.md`
7. `docs/cliente/planificacion-web-v2.md`
8. `docs/cliente/i18n-es-en-plan.md`
9. `docs/cliente/frontend-ui-ux-v3-profesional.md`
10. `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`
11. `docs/cliente/seo-desde-inicio-estrategia.md`
12. `docs/cliente/testing-qa-profesional.md`
13. `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`
14. `docs/cliente/legal-privacidad-cookies-ga4.md`

---

## Como empezar

No empezar por construir toda la home.

La ejecucion detallada se lleva ahora por fases separadas en:

- `docs/cliente/implementacion-fases/README.md`
- `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md`

Primer sprint recomendado:

1. Crear app Next.js limpia.
2. Configurar i18n ES/EN.
3. Configurar tokens de diseno y fuentes.
4. Crear modelos de contenido con Zod.
5. Crear markets, WhatsApp targets y downloads.
6. Crear primera vertical slice:
   - `/es`
   - `/en`
   - `/es/servicios/colombia`
   - `/en/services/colombia`
   - `/es/descargas`
   - `/en/downloads`
7. Validar con lint/typecheck/build.

---

## Skills principales

Usar siempre:

- `cejas-internacionales-guardrails`

Segun tarea:

- i18n: `cejas-i18n-localization`
- Next.js: `next-best-practices`
- Tailwind/tokens: `tailwind-design-system`
- shadcn: `shadcn`
- UI/pulido: `impeccable`, `frontend-design`, `design-taste-frontend`
- Motion: `nextjs-framer-motion-animations`
- SEO: `seo-serp-research`, `schema-structured-data`, `seo`, `seo-audit`
- Performance: `core-web-vitals-performance`
- QA: `cross-browser-device-qa`, `user-flow-e2e-testing`, `playwright`, `accessibility`
- Legal/cookies/GA4: usar `docs/cliente/legal-privacidad-cookies-ga4.md` como fuente del proyecto

---

## Reglas que mas facil se olvidan

- No tocar `main`.
- No usar prototipos externos como fuente de verdad.
- No inventar precios, telefonos, anos, clientas, fechas o cupos.
- No mezclar servicios entre mercados.
- No mostrar HidraLips ni depilaciones en Suiza.
- No mostrar correccion de cejas en Suiza salvo confirmacion futura.
- No repetir el boton de descargar catalogo en cada servicio.
- Catalogos PDF: una vez por pagina de mercado + pagina descargas + footer.
- Cursos PDF: se permite un PDF por curso.
- Todo contenido publico debe existir en ES y EN.
- GA4 se usa con banner de cookies y Consent Mode; no cargar analitica antes de consentimiento.
- Aviso legal, privacidad y cookies son obligatorios en V1.
- Hover siempre tiene equivalente focus/tap/click.
- WhatsApp Colombia: `573167742299`.
- WhatsApp Espana/Europa/Suiza: `34603804837`.

---

## Documentos operativos

- Fases detalladas: `docs/cliente/implementacion-fases/`
- Checklist maestra: `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md`
- Plan: `docs/cliente/implementacion-v1-plan-operativo.md`
- Checklist: `docs/cliente/implementacion-v1-checklist.md`
- Reglas agentes: `docs/cliente/reglas-agentes-proyecto.md`
- Analisis prototipos: `docs/cliente/analisis-prototipos-stitch-figma-claude.md`
- QA senior: `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`
- Legal/cookies/GA4: `docs/cliente/legal-privacidad-cookies-ga4.md`
