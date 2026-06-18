# Reglas para Codex, Cursor y Claude Code

Ultima actualizacion: 17/06/2026.

Objetivo: que este proyecto se comporte igual en Codex, Cursor AI y Claude Code, sin tener que repetir manualmente todas las reglas en cada conversacion.

---

## 1. Decision recomendada

Usar tres capas:

| Herramienta | Archivo | Funcion |
|---|---|---|
| Codex y agentes compatibles | `AGENTS.md` | Fuente principal de reglas compartidas |
| Claude Code | `CLAUDE.md` | Importa `AGENTS.md` y puede anadir notas propias de Claude |
| Cursor AI | `.cursor/rules/cejas-internacionales.mdc` | Regla always-on que apunta a `AGENTS.md` y resume lo critico |
| Codex skills | `.agents/skills/*` | Workflows especializados que se cargan solo cuando hacen falta |

Recomendacion: **`AGENTS.md` es la regla base compartida**. No conviene meter todo en `CLAUDE.md`, porque Cursor y Codex no dependen de ese archivo. Claude Code puede importar `AGENTS.md`, asi evitamos duplicar.

---

## 2. Que va en reglas globales

Las reglas globales deben ser cortas, verificables y aplicables siempre:

- No tocar `main`.
- No editar artefactos generados.
- V1 sin tienda, sin checkout, sin reserva propia.
- WhatsApp como canal unico de cita/reserva.
- Direccion fisica/legal solo Cali.
- Servicios por mercado, sin mezclar disponibilidad.
- Web bilingue ES/EN desde origen.
- SEO desde arquitectura.
- Paleta, tipografia y reglas anti-IA.
- Stack recomendado.
- QA minimo antes de cerrar.

---

## 3. Que NO debe ir en reglas globales

No meter todo el contenido de catalogos en `AGENTS.md`, porque lo vuelve pesado y menos efectivo.

Debe quedarse en MDs especializados:

- Servicios/precios/duraciones.
- Cursos.
- PDFs.
- Bio.
- Fotos.
- Referencias.
- SEO SERP detallado.
- QA detallado.

La regla global solo debe decir que se lean esos MDs cuando aplique.

---

## 4. Reglas nuevas recomendadas para este proyecto

Ya quedaron aplicadas:

1. **Bilingue obligatorio:** cada pagina, metadata, CTA, alt text, schema, WhatsApp template y estado de UI en ES y EN.
2. **Traduccion profesional:** ingles internacional localizado, no literal.
3. **Rutas localizadas:** `/es/...` y `/en/...`, con cambio de idioma conservando pagina equivalente.
4. **i18n SEO:** canonical por idioma, alternates/hreflang y sitemap localizado.
5. **No hardcodear textos publicos:** usar contenido localizado o diccionarios.
6. **No hardcodear datos de negocio:** precios, mercados, telefonos, ubicaciones y PDFs vienen de modelos/queries.
7. **Localhost:** usar puerto 3000 si esta libre; si no, siguiente disponible y reportar URL.
8. **Dev server:** no decir que esta listo hasta abrir/verificar en navegador o Playwright.
9. **QA usuario final:** probar WhatsApp, PDFs, mapa, idioma, responsive, back/forward y mobile drawer.
10. **Prompt temporal:** archivos `temp` son exploracion, no fuente de verdad.
11. **Implementacion por fases:** usar `docs/cliente/implementacion-fases/` y marcar checkboxes a medida que se avance.
12. **QA senior:** aplicar `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md` para smoke, regression, E2E, visual regression, trace viewer, WAVE/axe, Lighthouse, links, i18n y security headers.
13. **Legal/cookies/GA4:** aplicar `docs/cliente/legal-privacidad-cookies-ga4.md`; GA4 solo tras consentimiento, aviso legal/privacidad/cookies en ES/EN.
14. **Hover accesible:** ningun hover puede ser la unica forma de ver o activar contenido; siempre focus/tap/click equivalente.

---

## 5. Skills locales nuevas o relevantes

| Skill | Uso |
|---|---|
| `cejas-internacionales-guardrails` | Adaptador principal del proyecto |
| `cejas-i18n-localization` | ES/EN, traduccion profesional, rutas, metadata y QA bilingue |
| `seo-serp-research` | SERPs, competidores, keywords y briefs |
| `schema-structured-data` | JSON-LD sin inventar datos |
| `core-web-vitals-performance` | Lighthouse/PageSpeed/Core Web Vitals |
| `cross-browser-device-qa` | iOS/Android/Desktop/browser QA |
| `user-flow-e2e-testing` | Playwright y flujos reales |
| `accessibility` | WCAG, teclado, foco, WAVE/axe y reduced motion |
| `image-asset-pipeline` | Imagenes, OG, favicon, alt text |
| `supabase-nextjs-admin` | Futuro admin/BD Supabase |

---

## 6. Regla operativa para futuras sesiones

Cuando se pida crear o modificar frontend:

1. Leer `AGENTS.md`.
2. Activar `cejas-internacionales-guardrails`.
3. Leer la fase correspondiente en `docs/cliente/implementacion-fases/`.
4. Si hay texto publico, activar `cejas-i18n-localization`.
5. Si hay SEO o copy, revisar `seo-desde-inicio-estrategia.md`.
6. Si hay UI responsive, aplicar `frontend-ui-ux-v3-profesional.md`.
7. Si hay implementacion, validar con lint/typecheck/build y Playwright cuando exista app.
8. Si hay QA o cierre de fase, revisar `QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`.
9. Si hay analytics, cookies, privacidad o paginas legales, revisar `legal-privacidad-cookies-ga4.md`.
