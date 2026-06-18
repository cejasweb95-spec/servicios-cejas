# Skills — auditoría, adaptación al proyecto y recomendaciones

Última actualización: 17/06/2026.

Objetivo: analizar los skills instalados, evitar que se usen de forma genérica y definir cómo deben trabajar sobre la documentación real de Cejas Internacionales.

---

## 1. Decisión principal

No conviene modificar todos los skills genéricos. Eso los haría menos reutilizables para futuros proyectos.

La solución aplicada es crear una skill local de proyecto:

```txt
.agents/skills/cejas-internacionales-guardrails/SKILL.md
```

Esta skill funciona como capa de adaptación. Cuando se trabaje en esta web, primero carga los MD del proyecto y después permite usar skills genéricos como `shadcn`, `responsive-design`, `seo`, `accessibility`, `next-best-practices`, etc., pero sin romper las decisiones ya tomadas.

---

## 2. Skill local creada

### `cejas-internacionales-guardrails`

Uso:

- Diseño UI/UX.
- Frontend.
- shadcn/ui.
- Motion/Framer Motion.
- Responsive.
- Accesibilidad.
- SEO.
- Supabase.
- Testing.
- Copy.

Obliga a respetar:

- `PRODUCT.md`.
- `planificacion-web-v2.md`.
- `frontend-ui-ux-v3-profesional.md`.
- `frontend-ui-ux-detalle.md`.
- `identidad-marca.md`.
- `arquitectura-tecnica-hostinger-futura-db.md`.
- Contenido real de servicios, cursos, jornadas, contacto y assets.

Puntos que protege:

- No tocar `main`.
- Paleta visible: palo de rosa, blanco y negro.
- No tienda online.
- CTA `Contacta conmigo`.
- WhatsApp como canal principal.
- Supabase futuro.
- Hostinger para hosting.
- Reglas anti-IA.
- No botones full-width por defecto.
- No carrusel como contenido principal.
- No mezclar servicios por mercado.

---

## 3. Skills instalados y utilidad real

### Frontend / diseño

| Skill | Estado | Cómo usarla aquí |
|---|---|---|
| `cejas-internacionales-guardrails` | Nueva / clave | Primera skill de contexto del proyecto. |
| `impeccable` | Muy útil | Pulido visual, UX, anti-slop. Debe respetar la V3 UI/UX. |
| `frontend-design` | Útil | Dirección visual y decisiones estéticas. No debe inventar paleta fuera de palo de rosa/blanco/negro. |
| `design-taste-frontend` | Útil | Evitar diseño templated. Usar junto a reglas anti-IA locales. |
| `ui-ux-pro-max` | Potente pero genérica | Solo como apoyo de patrones; no aceptar paletas/estilos que contradigan la marca. |
| `copywriting` | Útil | Copy web y CTA. Debe usar datos reales, no frases genéricas. |
| `cejas-i18n-localization` | Nueva / clave | Localizacion ES/EN profesional, rutas, metadata, WhatsApp, alt text y QA bilingue. |

### Framework / componentes

| Skill | Estado | Cómo usarla aquí |
|---|---|---|
| `next-best-practices` | Imprescindible | App Router, metadata, image/font optimization, server/client boundaries. |
| `shadcn` | Imprescindible | Base accesible/componible. No estética final. |
| `tailwind-design-system` | Imprescindible | Tokens globales, Tailwind v4, paleta editable. |
| `vercel-composition-patterns` | Muy útil | Evitar componentes con booleanos infinitos. |
| `vercel-react-best-practices` | Muy útil | Performance React/Next, evitar JS innecesario. |
| `frontend-ui-engineering` | Muy útil | Construcción real de UI production-ready. |

### Animación

| Skill | Estado | Cómo usarla aquí |
|---|---|---|
| `nextjs-framer-motion-animations` | Preferida | Motion en Next con límites server/client y reduced motion. |
| `framer-motion-animator` | Secundaria | Más genérica; usar solo si hace falta una idea de animación concreta. |

Recomendación: usar **Motion for React** con límites claros, no animaciones pesadas ni scroll-jacking.

### Responsive / accesibilidad / QA

| Skill | Estado | Cómo usarla aquí |
|---|---|---|
| `responsive-design` | Imprescindible | Mobile-first, container queries, touch targets, viewport real. |
| `accessibility` | Imprescindible | WCAG 2.2 AA, teclado, contraste, alt text, reduced motion. |
| `web-design-guidelines` | Útil | Revisión final de interfaz. |
| `playwright` | Imprescindible en QA | Capturas, navegación, mobile emulation, Chromium/Firefox/WebKit. |
| `browser:control-in-app-browser` | Útil | Verificar localhost en Codex Browser. |

### SEO

| Skill | Estado | Cómo usarla aquí |
|---|---|---|
| `seo-serp-research` | Nueva / clave | Investigar SERPs, competidores, intención, headings y gaps antes de escribir copy final. |
| `seo` | Imprescindible desde V1 | Metadata, sitemap, robots, canonical, internal linking y SEO on-page. |
| `seo-audit` | QA antes de publicar | Auditar technical SEO, indexabilidad, international/local SEO y errores de publicación. |
| `schema-structured-data` | Nueva / clave | JSON-LD para Organization, BeautySalon/LocalBusiness Cali, Service, Course y BreadcrumbList. |
| `core-web-vitals-performance` | Nueva / clave | Lighthouse, PageSpeed, LCP, INP, CLS, imágenes, fuentes y bundle. |

SEO no se debe dejar para “maquillar” al final. Aunque la estrategia final se haga después, la UI debe nacer SEO-safe: contenido HTML rastreable, imágenes estables, URLs limpias, metadata preparada.

### Otros útiles

| Skill | Estado | Uso |
|---|---|---|
| `pdf:pdf` | Ya disponible | PDFs de catálogos/cursos, extracción/verificación. |
| `documents:documents` | Ya disponible | Si se crean documentos para cliente. |
| `spreadsheets:spreadsheets` | Ya disponible | Si se crea matriz de servicios/precios. |
| `imagegen` | Opcional | Solo si falta algún asset visual generado; preferir fotos reales. |
| `security-best-practices` | Futuro admin | Cuando haya Supabase/admin/auth. |

---

## 4. Skills nuevas instaladas/aplicadas al proyecto

Se han creado skills locales específicas para Cejas Internacionales. No sustituyen a las genéricas; las enfocan sobre este proyecto.

| Skill local | Estado | Para qué se usa |
|---|---|---|
| `seo-serp-research` | Instalada | Investigación de SERPs, competidores, herramientas tipo DinoRANK/Semrush, briefs de contenido y gaps SEO. |
| `core-web-vitals-performance` | Instalada | Lighthouse/PageSpeed, LCP, INP, CLS, imágenes, fuentes, Motion y presupuesto de JS. |
| `schema-structured-data` | Instalada | JSON-LD correcto sin inventar sedes, reviews, FAQ sensible ni datos no confirmados. |
| `cross-browser-device-qa` | Instalada | QA en Chromium, Firefox, WebKit, iOS/Android, viewports y errores responsive. |
| `user-flow-e2e-testing` | Instalada | Pruebas Playwright de navegación, WhatsApp, filtros, PDFs, lightbox, mapa y back/forward. |
| `image-asset-pipeline` | Instalada | Selección, recorte, WebP/AVIF, alt text, OG images, favicons y previews. |
| `supabase-nextjs-admin` | Instalada | Ruta futura Supabase + `/admin`: tablas, Auth, Storage, RLS y migración desde datos locales. |
| `cejas-i18n-localization` | Instalada | Bilingue ES/EN desde origen: textos, rutas, metadata, schema, QA y traduccion profesional. |

### Capacidades que quedan como herramientas externas, no skills locales

| Herramienta | Uso recomendado |
|---|---|
| Google Search Console | Verificar dominio, enviar sitemap, revisar indexación y Core Web Vitals reales. |
| Google Analytics 4 | Medir clics de WhatsApp, descargas PDF y navegación principal si se decide usar analítica. |
| PageSpeed Insights | Medición pública de rendimiento y Core Web Vitals. |
| Screaming Frog free | Rastreo de links, titles, metas, canonicals y errores hasta 500 URLs. |
| Ahrefs Webmaster Tools | Auditoría gratuita si se verifica propiedad del dominio. |
| Semrush free/trial | Investigación limitada de keywords y competidores si hay cuenta. |
| DinoRANK | Buena opción en español si se contrata; no asumir como gratuito. |

No instalo herramientas SaaS como si fueran dependencias del repo. Se documentan como proceso porque requieren cuenta, dominio, pago o verificación de propiedad.

---

## 5. Superpowers

### Qué es

Superpowers (`obra/Superpowers`) es un framework/plugin de skills para Claude Code orientado a workflows con planificación, subagentes, revisión y skills estructuradas. Hay repos relacionados como `superpowers-marketplace` y `superpowers-skills`.

### Qué aporta

- Flujo más disciplinado para tareas complejas.
- Skills y recursos para Claude Code.
- Marketplace y skills comunitarias.
- Enfoque de planificación/revisión con subagentes.

### Riesgo para este proyecto

- Está muy orientado a Claude Code; el soporte en Codex existe por comunidad/ports, pero no lo consideraría base crítica del proyecto.
- Puede añadir mucha complejidad y cambiar el flujo de trabajo.
- Para Cejas Internacionales ya tenemos un buen sistema: MDs + skill local + skills específicas.

### Recomendación

No instalar Superpowers ahora dentro de este proyecto. Si se quiere probar, hacerlo en un repo/scratch separado. Para esta web, el equivalente práctico ya queda cubierto por:

- `cejas-internacionales-guardrails`.
- `impeccable`.
- `next-best-practices`.
- `shadcn`.
- `responsive-design`.
- `accessibility`.
- `seo-audit`.
- `playwright`.

---

## 6. Motion / Framer Motion skills externos

Existen skills/repo externos como:

- `freshtechbro/claudedesignskills` con skill de Motion/Framer.
- `secondsky/claude-skills/motion` listado en Tessl.
- Repos de skills con `motion`, `lottie`, `react-three-fiber`, etc.

Pero en este proyecto ya tenemos:

- `nextjs-framer-motion-animations`.
- `framer-motion-animator`.

Recomendación: usar primero `nextjs-framer-motion-animations`, porque está específicamente orientada a Next.js App Router, server/client boundaries, reduced motion, LazyMotion y performance.

No instalar otra skill de Motion salvo que encontremos una necesidad concreta no cubierta.

---

## 7. Responsive profesional moderno

Para este proyecto, responsive no significa “que no se rompa”. Significa que móvil sea la experiencia principal.

### Reglas

- Mobile-first.
- Touch targets mínimo 44x44px.
- Sticky/floating CTA de WhatsApp móvil.
- Header móvil con `Sheet`.
- Servicios como cards/datalist en móvil, tabla solo desktop.
- Mapa con lista textual accesible.
- Galería en mosaico ligero, no carrusel obligatorio.
- Imágenes con dimensiones estables para evitar CLS.
- Pruebas en 390, 430, 768, 1024, 1440, 1920.
- Playwright en Chromium, Firefox, WebKit.
- Revisión manual posterior en iPhone Safari y Android Chrome si hay acceso real.

### Skills a combinar

1. `cejas-internacionales-guardrails`
2. `responsive-design`
3. `accessibility`
4. `playwright`
5. `web-design-guidelines`

---

## 8. SEO profesional top

SEO final se hará al final, pero desde el diseño hay que proteger:

- Contenido real en HTML, no todo client-only.
- H1 único por página.
- Headings jerárquicos.
- URLs limpias por servicio/mercado/curso.
- Metadata por ruta.
- `sitemap.ts`.
- `robots.ts`.
- `opengraph-image`.
- `twitter-image`.
- `manifest.ts`.
- `favicon.ico`, `icon.png`, `apple-icon.png`.
- `next/image`, tamaños estables, alt text.
- Core Web Vitals: LCP, INP, CLS.
- Local/international SEO sin inventar sedes.
- Schema futuro: Organization, LocalBusiness/BeautySalon si aplica, Service, Course, BreadcrumbList, FAQ solo si confirmado.

### Skills a combinar

1. `cejas-internacionales-guardrails`
2. `seo-serp-research`
3. `schema-structured-data`
4. `core-web-vitals-performance`
5. `seo-audit`
6. `seo`
7. `next-best-practices`
8. `vercel-react-best-practices`

---

## 9. Flujo recomendado por fase

### Fase frontend base

Skills:

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `next-best-practices`
- `tailwind-design-system`
- `shadcn`
- `vercel-composition-patterns`
- `responsive-design`

### Fase diseño visual

Skills:

- `cejas-internacionales-guardrails`
- `impeccable`
- `frontend-design`
- `design-taste-frontend`

### Fase animaciones

Skills:

- `cejas-internacionales-guardrails`
- `nextjs-framer-motion-animations`
- `vercel-react-best-practices`

### Fase QA responsive/accesibilidad

Skills:

- `cejas-internacionales-guardrails`
- `responsive-design`
- `accessibility`
- `playwright`
- `web-design-guidelines`

### Fase SEO desde inicio + auditoria final

Skills:

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `seo-serp-research`
- `schema-structured-data`
- `core-web-vitals-performance`
- `seo-audit`
- `seo`
- `next-best-practices`

---

## 10. Fuentes investigadas

- Superpowers: https://github.com/obra/Superpowers
- Superpowers Marketplace: https://github.com/obra/superpowers-marketplace
- Superpowers Skills: https://github.com/obra/superpowers-skills
- Porting Skills/Superpowers to Codex: https://blog.fsck.com/2025/10/27/skills-for-openai-codex/
- Motion docs: https://motion.dev/docs/react
- Motion LazyMotion: https://motion.dev/docs/react-lazy-motion
- Motion accessibility: https://motion.dev/docs/react-accessibility
- shadcn/ui components: https://ui.shadcn.com/docs/components
- Playwright browsers: https://playwright.dev/docs/browsers
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- Playwright emulation: https://playwright.dev/docs/emulation
- BrowserStack real-device/cross-browser testing: https://www.browserstack.com/
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- web.dev Web Vitals: https://web.dev/articles/vitals
- MDN Responsive Design: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- axe-core: https://github.com/dequelabs/axe-core
- Web Quality Skills: https://github.com/addyosmani/web-quality-skills
