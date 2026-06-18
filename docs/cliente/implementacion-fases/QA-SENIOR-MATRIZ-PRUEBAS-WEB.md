# QA senior - matriz de pruebas web

Ultima actualizacion: 17/06/2026.

Objetivo: convertir las practicas senior de QA web en una matriz aplicable a Cejas Internacionales. Este documento complementa `testing-qa-profesional.md` y se usa en las fases 00, 01, 12, 13 y 14.

---

## 1. Vocabulario senior aplicado al proyecto

| Termino | Que significa | Como aplica aqui |
|---|---|---|
| Smoke test | Prueba rapida de que lo critico abre y no rompe | Home ES/EN, servicios, WhatsApp, PDFs, mapa, build |
| Regression test | Evita que algo que ya funcionaba se rompa | Mercado Colombia/Espana/Suiza, i18n, descargas, CTA |
| E2E | Prueba de flujo completo como usuaria real | De home a WhatsApp, de servicio a descarga, de curso a PDF |
| VRT / visual regression | Compara capturas contra un baseline | Home, servicios, formaciones, jornadas/mapa, contacto |
| Trace viewer | Reproduccion visual de un fallo E2E | Usar en Playwright cuando falle un flujo |
| a11y | Accesibilidad | WCAG 2.2 AA, teclado, foco, contraste, reduced motion |
| WAVE analysis | Analisis manual con WAVE de WebAIM | Complementa axe/Lighthouse porque requiere evaluacion humana |
| axe analysis | Escaneo automatizado con axe-core | Playwright + axe para errores tecnicos comunes |
| CWV | Core Web Vitals | LCP, INP y CLS desde diseno y build |
| LCP | Largest Contentful Paint | Hero/imagen principal de cada pagina critica |
| INP | Interaction to Next Paint | Menus, tabs, mapa, dialogs, lightbox, WhatsApp chooser |
| CLS | Cumulative Layout Shift | Imagenes con medidas, Motion sin saltos, fuentes estables |
| LHCI | Lighthouse CI | Auditoria repetible de rendimiento, SEO, a11y y best practices |
| SEO QA | Validacion tecnica SEO | HTML rastreable, metadata, schema, sitemap, robots, hreflang |
| i18n/l10n QA | QA bilingue y localizacion | ES/EN sin mezclar idiomas, rutas equivalentes, textos profesionales |
| Link checker | Verificacion de enlaces | PDFs, redes, WhatsApp, sitemap, assets, links internos |
| Security headers | Cabeceras basicas de seguridad | HTTPS, CSP viable, HSTS, Referrer-Policy, Permissions-Policy |
| RUM | Real User Monitoring | Medicion real post-publicacion si se configura GA4/PageSpeed/CrUX |
| Synthetic monitoring | Pruebas programadas desde entorno controlado | Lighthouse/Playwright local o CI |
| Consent Mode | Senales de consentimiento para etiquetas Google | GA4 no carga analitica hasta aceptar cookies analiticas |

Nota: si alguien dice "WA analysis", en este contexto probablemente se refiere a **WAVE analysis**. Si dice "FLX" hablando de performance, probablemente se refiere a **CLS**.

---

## 2. Fuentes tecnicas oficiales de referencia

- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Playwright trace viewer: https://playwright.dev/docs/trace-viewer
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- Google Chrome Lighthouse: https://developer.chrome.com/docs/lighthouse/overview
- Web Vitals: https://web.dev/articles/vitals
- Google Search Central SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WebAIM WAVE: https://wave.webaim.org/
- Deque axe-core: https://www.deque.com/axe/core-documentation/
- Next.js metadata, robots, sitemap, image and typed routes:
  - https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
  - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
  - https://nextjs.org/docs/app/api-reference/components/image
  - https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes
- OWASP HTTP Headers Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html

---

## 3. Matriz por capa

### 3.1 Calidad estatica / compilacion

- [ ] TypeScript estricto.
- [ ] ESLint sin errores.
- [ ] `next build` sin warnings graves.
- [ ] `typedRoutes` evaluado/activado si encaja con la estructura.
- [ ] No raw hex en componentes visuales.
- [ ] No imports directos desde `src/content` en componentes visuales.
- [ ] No textos publicos hardcodeados fuera del sistema i18n/contenido.
- [ ] No codigo fuente dentro de `.next`, `dist`, `node_modules` u outputs.
- [ ] No tokens personales de GitHub ni secretos desde `.env.local` en codigo, docs o Actions.

### 3.2 Tests unitarios de datos y utilidades

- [ ] Zod valida servicios, mercados, cursos, eventos, descargas, ubicaciones, SEO y WhatsApp.
- [ ] Cada entrada publica tiene ES y EN.
- [ ] `getServicesByMarket()` filtra correctamente.
- [ ] `getCourses()` devuelve cursos con PDF cuando aplica.
- [ ] `getDownloads()` devuelve catalogos una sola vez por mercado.
- [ ] `buildWhatsAppUrl()` genera numero y mensaje correcto por mercado/idioma.
- [ ] Formateo de moneda COP/EUR/CHF probado.
- [ ] Duraciones y precios no se mezclan entre mercados.

### 3.3 Tests de integracion

- [ ] Paginas consumen query layer, no arrays locales duplicados.
- [ ] Market tabs/filters actualizan contenido sin mezclar mercados.
- [ ] Language switcher lleva a la pagina equivalente.
- [ ] Metadata localizada se genera desde datos centrales.
- [ ] `sitemap` incluye URLs localizadas.
- [ ] `robots` apunta al sitemap correcto cuando exista dominio final.

### 3.4 E2E con Playwright

- [ ] Home ES -> WhatsApp chooser -> Colombia.
- [ ] Home EN -> WhatsApp chooser -> Spain/Europe/Switzerland.
- [ ] Servicios -> Colombia -> descargar catalogo Colombia.
- [ ] Servicios -> Espana/Europa -> descargar catalogo Espana/Europa.
- [ ] Servicios -> Suiza -> descargar catalogo Suiza.
- [ ] Detalle de servicio -> CTA correcto.
- [ ] Formaciones -> curso -> PDF -> WhatsApp.
- [ ] Jornadas/mapa -> pin/lista -> CTA.
- [ ] Resultados/lightbox -> abrir/cerrar -> foco vuelve.
- [ ] Menu movil -> abrir/cerrar -> navegar.
- [ ] Back/forward conserva estado razonable.

### 3.5 Visual regression

- [ ] Crear baseline solo cuando el diseno este estable.
- [ ] V1 usa visual regression local; CI se evalua despues.
- [ ] Capturar Home desktop/mobile.
- [ ] Capturar Servicios por mercado.
- [ ] Capturar Formaciones.
- [ ] Capturar Jornadas/mapa.
- [ ] Capturar Contacto.
- [ ] Usar el mismo entorno para generar y comparar snapshots.
- [ ] Enmascarar elementos dinamicos si existieran.

### 3.6 Accesibilidad

- [ ] Playwright + `@axe-core/playwright`.
- [ ] Lighthouse Accessibility.
- [ ] WAVE manual en paginas principales.
- [ ] Teclado completo.
- [ ] Foco visible.
- [ ] Skip link.
- [ ] Dialogs/drawers con focus trap.
- [ ] Labels en botones icon-only.
- [ ] Contraste WCAG AA.
- [ ] `prefers-reduced-motion`.
- [ ] Mapa con lista textual equivalente.
- [ ] No informacion solo por color, hover o animacion.
- [ ] Hovers con equivalente focus-visible, tap o click.

### 3.7 Performance / Core Web Vitals

- [ ] LCP < 2.5s donde sea realista.
- [ ] INP <= 200ms donde sea realista.
- [ ] CLS <= 0.1.
- [ ] Lighthouse mobile 95+ en Performance si assets/hosting lo permiten.
- [ ] Lighthouse SEO/A11y/Best Practices 100.
- [ ] Imagen LCP con `next/image`, dimensiones y prioridad controlada.
- [ ] Fuentes con `next/font`.
- [ ] Motion en componentes pequenos de cliente.
- [ ] Sin mapa iframe pesado como primer render.
- [ ] PDFs enlazados, no embebidos como contenido principal.

### 3.8 SEO QA

- [ ] SERP/competencia investigada antes de redactar copy final.
- [ ] Keyword map por pagina.
- [ ] Title y description localizados.
- [ ] Un H1 por pagina.
- [ ] Headings jerarquicos.
- [ ] Canonical.
- [ ] hreflang ES/EN.
- [ ] Sitemap.
- [ ] Robots.
- [ ] Schema solo con datos confirmados.
- [ ] Open Graph/Twitter images.
- [ ] Alt text localizado.
- [ ] Enlazado interno entre servicios, mercados, formaciones, jornadas y contacto.
- [ ] Contenido critico en HTML rastreable, no solo en imagen/PDF/modal.

### 3.9 Seguridad y buenas practicas

- [ ] HTTPS en produccion.
- [ ] Sin secretos en repo.
- [ ] Sin mixed content.
- [ ] `rel="noopener noreferrer"` en externos cuando aplique.
- [ ] CSP viable sin romper assets.
- [ ] `X-Content-Type-Options: nosniff`.
- [ ] `Referrer-Policy`.
- [ ] `Permissions-Policy`.
- [ ] HSTS cuando HTTPS y dominio esten estables.
- [ ] No endpoints innecesarios en V1.

### 3.10 Links, descargas y assets

- [ ] Links internos sin 404.
- [ ] WhatsApp Colombia correcto.
- [ ] WhatsApp Espana/Europa/Suiza correcto.
- [ ] Email correcto.
- [ ] Redes sociales correctas.
- [ ] PDFs de catalogo descargan.
- [ ] PDFs de cursos descargan.
- [ ] Favicons/iconos/manifest existen.
- [ ] OG images existen y pesan razonablemente.

### 3.11 i18n/l10n

- [ ] `/es` y `/en`.
- [ ] Rutas equivalentes.
- [ ] No mezcla de idiomas en paginas publicas.
- [ ] Metadata ES/EN.
- [ ] OG ES/EN.
- [ ] Alt text ES/EN.
- [ ] WhatsApp templates ES/EN.
- [ ] Schema ES/EN cuando aplique.
- [ ] Ingles internacional profesional.
- [ ] Textos largos en ingles sin overflow.

### 3.12 Post-publicacion

- [ ] Google Search Console configurado.
- [ ] Sitemap enviado.
- [ ] Indexacion revisada.
- [ ] GA4 activo con banner, politica de cookies y Consent Mode.
- [ ] Rechazar cookies mantiene GA4 desactivado.
- [ ] PageSpeed sobre URL real.
- [ ] Consultas reales revisadas para ajustar copy/SEO.
- [ ] Errores 404 revisados.

---

## 4. Scripts recomendados

Cuando exista app, evaluar estos scripts:

```json
{
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "build": "next build",
  "test": "vitest run",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:trace": "playwright test --trace on",
  "test:a11y": "playwright test tests/a11y",
  "test:visual": "playwright test tests/visual",
  "test:links": "node scripts/check-links.mjs",
  "test:seo": "node scripts/check-seo.mjs",
  "lighthouse": "lhci autorun"
}
```

Los nombres pueden cambiar segun el scaffold real, pero las capas no deben desaparecer.

---

## 5. Criterio de cierre por pagina

Ninguna pagina publica se considera terminada si no cumple:

- [ ] ES y EN.
- [ ] Metadata, canonical y hreflang.
- [ ] H1 unico.
- [ ] Contenido critico en HTML.
- [ ] Responsive 390, 430, 768, 1024, 1440, 1920.
- [ ] Teclado y foco visibles.
- [ ] Reduced motion respetado.
- [ ] WhatsApp correcto.
- [ ] PDFs correctos si aplica.
- [ ] Mercado correcto si aplica.
- [ ] Sin overflow horizontal.
- [ ] Sin errores de consola.
- [ ] Sin links rotos.
- [ ] Lighthouse/axe/WAVE revisados segun criticidad.
