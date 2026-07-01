---
name: cejas-internacionales-guardrails
description: Project-specific guardrails for Cejas Internacionales in C:\servicios-cejas. Use whenever designing, building, refactoring, reviewing, animating, optimizing, testing, adding content, adding SEO, using shadcn/ui, Motion/Framer Motion, Tailwind, Supabase, responsive layouts, accessibility, or frontend architecture for this website. Loads the project's MD decisions first so generic skills do not override brand, UX, content, SEO, WhatsApp, market, color, or anti-AI rules.
---

# Cejas Internacionales Guardrails

Use this skill as the project adapter before applying generic frontend, UI/UX, responsive, accessibility, SEO, shadcn, Motion, Next.js, Supabase, testing, or copywriting skills.

## Required Context

Read these first for any frontend/design/build task:

1. `PRODUCT.md`
2. `docs/cliente/implementacion-fases/README.md` when implementing
3. `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md` when implementing
4. `docs/cliente/planificacion-web-v2.md`
5. `docs/cliente/frontend-ui-ux-v3-profesional.md`
6. `docs/cliente/frontend-ui-ux-detalle.md`
7. `docs/cliente/identidad-marca.md`
8. `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`
9. `docs/cliente/i18n-es-en-plan.md`

Then read task-specific docs:

- Implementation phase: the matching MD under `docs/cliente/implementacion-fases/`; update checkboxes as work advances.
- Services/prices/durations: `docs/cliente/resumen-servicios-precios-duraciones.md`, `catalogos-servicios-precios.md`, `catalogos-contenido-web-transcrito.md`, `duracion-sesiones.md`
- Courses/formations: `docs/cliente/cursos-masterclass.md`
- Locations/map/jornadas: `docs/cliente/ubicaciones-jornadas.md`
- Contact/legal: `docs/cliente/contacto-datos-legales.md`
- Legal/cookies/GA4: `docs/cliente/legal-privacidad-cookies-ga4.md`
- Assets/images/PDFs: `docs/cliente/assets-inventario.md`, `fotos-cicatrizados-y-sesion.md`, `fotos-instagram-inventario.md`
- Bio/authority: `docs/cliente/bio-xiomara.md`, `formaciones-certificaciones.md`
- i18n/localization: also read `docs/cliente/i18n-es-en-plan.md` and use `cejas-i18n-localization`.
- SEO/performance/publication: also read `docs/cliente/seo-desde-inicio-estrategia.md` and `docs/cliente/implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`; use `seo-serp-research`, `schema-structured-data`, `core-web-vitals-performance`, `seo`, and `seo-audit`.
- QA/testing: also read `docs/cliente/testing-qa-profesional.md` and `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`; use `cross-browser-device-qa`, `user-flow-e2e-testing`, `playwright`, `accessibility`, `core-web-vitals-performance`, `seo-audit`, and Browser plugin where applicable.
- Motion/animation: also read `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md` and use `nextjs-framer-motion-animations`.
- Component architecture/reuse: also read `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md` and use `vercel-composition-patterns`, `tailwind-design-system`, and `shadcn`.

## Non-Negotiables

- Do not touch `main` unless the user explicitly says so.
- Current working branch is `develop`.
- No online store, checkout, cart, or booking form in V1.
- CTA principal: `Contacta conmigo`.
- Reservation/contact is by WhatsApp only.
- GA4 is allowed only with cookie banner, cookie policy and Consent Mode.
- Analytics must not load before analytics consent.
- WhatsApp Colombia: `573167742299`.
- WhatsApp España: `34603804837`.
- Physical/legal address only Cali, Colombia.
- Markets must not be mixed: each service only where it applies.
- Future database is Supabase, not Payload/Sanity.
- Hostinger hosts the website; Supabase hosts future data/auth/storage.
- V1 has local typed data; future `/admin` may use Supabase.
- Public website is bilingual: Spanish (`es`) and international English (`en`).
- Every new public page, component text, metadata, schema text, alt text, and WhatsApp template must be created in both languages.
- Legal notice, privacy policy and cookie policy must exist in Spanish and English before production.

## Brand Rules

- Visible palette: palo de rosa, white, black.
- Primary token: `#B76E79`.
- Do not promote coral `#EE5164` as UI palette; it belongs to the logo asset unless specifically justified.
- Use semantic tokens for color, borders, focus, shadows, and gradients. No raw hex values inside components.
- Typography: Marcellus for display/headings, Manrope for body/UI.
- Script typography only inside the logo.
- Use real imagery. Do not replace real photos with decorative SVG scenes.

## Anti-AI UI Rules

- Button base must be `inline-flex` / natural width. Use `w-full` only for mobile or justified layouts.
- No cards inside cards.
- No entire page sections as floating cards.
- No identical card grids across the whole site.
- No gradient text.
- No orbs, blobs, bokeh, decorative striped backgrounds, or generic abstract backgrounds.
- No oversized border radius on cards. Target 8-12px.
- No repeated tiny uppercase eyebrow labels.
- No numbered section labels unless the content is an actual sequence.
- No carousel as primary content for services, courses, or results. Use visible lists/mosaics; carousel is only acceptable inside a lightbox or secondary rail.
- Hover is only enhancement. Every hover state must have focus-visible and tap/click equivalent.

## Skill Orchestration

Use this adapter plus the relevant generic skills:

- New frontend/build: `frontend-ui-engineering`, `next-best-practices`, `tailwind-design-system`, `shadcn`, `responsive-design`, `accessibility`.
- SEO from the first build: `seo-serp-research`, `schema-structured-data`, `core-web-vitals-performance`, `seo`, `seo-audit`.
- Visual direction/polish: `impeccable`, `frontend-design`, `design-taste-frontend`, then enforce this skill's MD decisions.
- Motion/animation: `nextjs-framer-motion-animations` preferred over older generic `framer-motion-animator`; use Motion only in small client boundaries.
- Component APIs: `vercel-composition-patterns`, `vercel-react-best-practices`.
- Supabase future/admin: `supabase-nextjs-admin`.
- Browser/device validation: `cross-browser-device-qa`, `user-flow-e2e-testing`, `playwright`, and Browser plugin.
- Images/assets: `image-asset-pipeline`.
- Accessibility: `accessibility` plus Playwright/axe when available; manual keyboard checks still required.
- PDFs/assets: use PDF/document skills only when manipulating PDFs; do not re-extract if existing MDs already contain the content.
- i18n/localization: use `cejas-i18n-localization` whenever adding or editing public-facing text, routes, metadata, schema, alt text, WhatsApp templates, or UI states.

## shadcn Rules

Use shadcn/ui as accessible source components, not as final visual identity.

Prefer: `Button`, `Badge`, `Tabs`, `ToggleGroup`, `Dialog`, `Drawer`, `Sheet`, `Alert`, `Separator`, `Tooltip`, `Accordion`, `Table`, `Skeleton`.

Avoid or limit:

- `Carousel` as main content.
- `Sidebar` on public site.
- `Calendar` until real dates exist.
- `Chart` unless future admin needs it.

Use variants and tokens. `className` is for layout, not repainting components.

## Component Reuse Rules

- Follow `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`.
- Reuse shared `Button`, `ButtonLink`, `WhatsAppCTA`, `DownloadButton`, `MarketTabs`, `ResponsiveDataList`, `ServiceCard`, `CourseCard`, `DownloadCard`, `ResultTile`, `ContactOption`, `Dialog/Sheet` wrappers, and motion primitives.
- Do not create ad hoc buttons, tabs, tables, cards, CTAs or dialogs inside page files.
- Avoid boolean prop proliferation; use variants, explicit composition, or compound components.
- `className` is for layout exceptions, not local restyling of brand colors, typography, shadows, radii, or button behavior.

## Motion Rules

- Follow `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md` for page-by-page animation decisions.
- Prefer `motion/react` for new work.
- Use `MotionConfig reducedMotion="user"`.
- Keep Motion in leaf Client Components.
- Animate opacity and transforms; avoid layout-heavy effects.
- Use `AnimatePresence` for WhatsApp chooser, lightbox, drawer/panel.
- Use `layoutId` for market/tabs indicators.
- Do not animate every section the same way.

## Responsive / Device Rules

- Mobile-first. Most visitors will use mobile.
- Validate at 390, 430, 768, 1024, 1440, and 1920 widths.
- Ensure 44x44px minimum touch targets.
- Map must have textual accessible fallback/list.
- Services tables must become cards/data lists on mobile.
- Use `next/image` with stable dimensions to avoid CLS.
- Test Chromium, Firefox, and WebKit. Use real-device testing later if possible.

## SEO-Safe From Start

- Do not postpone SEO to the end.
- Follow `docs/cliente/implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md` for SERP research, keyword map, page briefs, audits, and post-publication tasks.
- Build crawlable HTML for core content.
- Keep one H1 per page and logical headings.
- Use clean URLs by market, service, course, and jornada.
- Add metadata scaffolding early.
- Prepare `sitemap.ts`, `robots.ts`, canonical URLs, Open Graph, icons, and manifest.
- Use schema only when data is confirmed.
- Keep Core Web Vitals in the design budget, not as a late optimization.
- For Colombia/Espana/Suiza SEO, target countries through market URLs, content, currency, schema and internal links; do not invent offices or regional hreflang variants without real localized variants.

## Legal / Analytics Rules

- Follow `docs/cliente/legal-privacidad-cookies-ga4.md`.
- Public legal pages required: `/es/aviso-legal`, `/en/legal-notice`, `/es/privacidad`, `/en/privacy`, `/es/cookies`, `/en/cookies`.
- Cookie banner must offer accept, reject and configure.
- Analytics category is off by default and activates only after consent.
- Do not send PII to GA4: no names, phones, emails, photos, health data or WhatsApp message text.
- Never commit or log tokens from `.env.local`. Agents may read `GIT_ACCESS_TOKEN` / `VERCEL_TOKEN` only in the shell for non-interactive `git push` (`npm run git:push`) or Vercel deploy (`npm run vercel:deploy`). Do not embed tokens in source, docs, or GitHub Actions — use GitHub Secrets for CI later.
- Visual regression starts local for V1; CI is future optional once baselines are stable.

## QA Senior Rules

- Follow `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`.
- Treat "WA analysis" as WAVE analysis unless the user clarifies otherwise.
- Treat "FLX" as likely CLS when the conversation is about performance/layout stability.
- Use smoke, regression, E2E, a11y, responsive, link, SEO, performance and security checks in the phase where they belong.
- Add visual regression after the UI is stable, not while the layout is still being designed.
- Use Playwright trace viewer/screenshots/videos to debug failures instead of guessing.
- Use WAVE/axe/Lighthouse as support tools; still perform manual keyboard, focus, responsive and content checks.

## Completion Criteria

Before finalizing any implementation:

1. Confirm no project MD decision was contradicted.
2. Confirm no generated/build folders were used as source.
3. Run available lint/build/tests.
4. Use browser/Playwright screenshots for key responsive views.
5. Check keyboard navigation and reduced motion.
6. For public pages, keep SEO-readable content in HTML, not hidden behind client-only UI.
