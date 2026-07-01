# Cejas Internacionales - Agent Rules

These are the shared project rules for Codex, Cursor, Claude Code, and other coding agents.

## Required Context

Before design, frontend, content, SEO, testing, architecture, or implementation work, read:

- `PRODUCT.md`
- `docs/cliente/implementacion-fases/README.md`
- `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md`
- `docs/cliente/planificacion-web-v2.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/frontend-ui-ux-detalle.md`
- `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`
- `docs/cliente/i18n-es-en-plan.md`
- `docs/cliente/seo-desde-inicio-estrategia.md`
- `docs/cliente/testing-qa-profesional.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`

When implementing animations or animated UI, also read:

- `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`

When creating or modifying reusable UI/components, also read:

- `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`

When creating or auditing SEO/copy/metadata/schema, also read:

- `docs/cliente/implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`

When creating or auditing QA/testing/release readiness, also read:

- `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`

For task-specific content, use the matching MDs under `docs/cliente/` instead of inventing data.

For implementation, use the phase MDs under `docs/cliente/implementacion-fases/`. Work one phase at a time and update its checkboxes as progress is made.

## Branch And Source Rules

- Do not touch `main` unless Jeffrey explicitly says so.
- Work on `develop` unless instructed otherwise.
- Do not edit generated artifacts as source: `.next`, `node_modules`, `dist`, build outputs, or `tsconfig.tsbuildinfo`.

## Git And Remote Operations (agents)

Agents run in **non-interactive** shells. Never use plain `git push origin …` and wait for Credential Manager or a browser login.

When pushing or fetching to GitHub:

1. Read `GIT_ACCESS_TOKEN` and `GIT_REPO_URL` from `.env.local` (never commit, log, or paste tokens in chat, docs, or source).
2. Push with an authenticated HTTPS URL: `https://x-access-token:TOKEN@github.com/…/repo.git`.
3. Prefer `npm run git:push` (`scripts/git-push-remote.ps1`) so the pattern stays consistent.
4. If diagnosing auth failures, set `GIT_TERMINAL_PROMPT=0` and `GCM_INTERACTIVE=never` so Git fails fast instead of hanging.

For Vercel CLI deploys, use `VERCEL_TOKEN` from `.env.local` and prefer `npm run vercel:deploy`. See `.cursor/rules/git-github-noninteractive.mdc`.
- When frontend work starts, create or use a clean source app; do not rebuild from compiled output.
- Preserve user/client documentation and assets. Do not delete PDFs, images, transcripts, or MDs unless explicitly requested.

## Product Rules

- The site is for Cejas Internacionales / Xiomara.
- V1 is informative only: no online store, no checkout, no cart, no booking form.
- Main CTA: `Contacta conmigo`.
- Appointment and reservation flow is WhatsApp only.
- WhatsApp Colombia: `573167742299`.
- WhatsApp Spain/Europe/Switzerland: `34603804837`.
- Physical/legal address is only Cali, Colombia. Do not create Spain or Switzerland offices.
- Services must be filtered by market. Do not show services in markets where they do not apply.
- Colombia, Spain/Europe, and Switzerland have different currencies/content: COP, EUR, CHF.
- Future database/admin is Supabase, not Payload/Sanity. V1 uses typed local data and a query layer.
- Hosting target is Hostinger; future data/auth/storage target is Supabase.

## Language And Localization

- The public website must be bilingual: Spanish and international English.
- Spanish is the source language for client-provided content.
- English must be professionally localized, not literal machine translation.
- Every public page, metadata entry, Open Graph image text, navigation label, CTA, alt text, schema text, WhatsApp template, validation/error state, and empty state must exist in both languages.
- Do not mix Spanish and English on the same public page, except brand names, addresses, legal IDs, course/service names that intentionally remain branded, and WhatsApp contact labels when useful.
- Use locale-specific URLs and SEO alternates/hreflang. Do not rely only on cookies or client-side language switching.
- If a new page/component/content model is added, add the ES and EN content at the same time.

## Brand And UI Rules

- Visible palette: palo de rosa, white, black.
- Primary token: `#B76E79`.
- Coral `#EE5164` belongs to the logo asset, not the UI palette.
- Use semantic tokens for colors, borders, shadows, focus, and gradients. No raw hex values in components.
- Typography: Marcellus for display/headings; Manrope for body/UI.
- Use real client imagery. Avoid stock-like or decorative abstract hero art.
- No generic beige/pink template look, gradient text, decorative orbs/blobs/bokeh, or repeated card grids.
- Button base must be natural width (`inline-flex`). Use full width only on mobile or when the layout truly requires it.
- No cards inside cards. Do not make full page sections look like floating cards.
- No carousel as the primary way to show services, courses, or results.

## SEO, Performance, Accessibility

- SEO starts at architecture, not at the end.
- SEO has three active passes: SERP/keyword research before copy, SEO-safe implementation during build, and audit/post-publication review after build.
- Public content must be crawlable HTML with one H1 per page and logical headings.
- Prepare metadata, canonical URLs, sitemap, robots, Open Graph, icons, manifest, and schema early.
- Use schema only for confirmed data. Do not invent reviews, ratings, medical claims, offices, FAQ answers, payment methods, dates, or cupos.
- Target WCAG 2.2 AA, visible focus, keyboard navigation, useful alt text, and `prefers-reduced-motion`.
- Use `next/image` with stable dimensions and `next/font` for fonts.
- Keep Motion/Framer Motion in small client components and respect reduced motion.
- PageSpeed/Lighthouse goals: mobile Performance 95+ where realistic; SEO/A11y/Best Practices 100.
- GA4 is allowed only with cookie banner, cookie policy and Consent Mode. Analytics must not load before analytics consent.
- Legal notice, privacy policy and cookie policy must exist in Spanish and English before production.

## Architecture Rules

- Recommended stack: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui where useful, Motion for React, Zod, local typed content.
- Components must consume query functions such as `getServicesByMarket()`, `getCourses()`, `getEvents()`, and `getDownloads()`.
- Do not hardcode prices, cities, WhatsApp numbers, translations, or PDF paths inside visual components.
- Reuse shared components for buttons, tabs, tables/lists, cards, CTAs, dialogs and domain UI. Do not reinvent them per page.
- Hover is only an enhancement. Every hover interaction must have keyboard focus and tap/click equivalents.
- Model services, markets, courses, locations, events, downloads, media, SEO entries, WhatsApp targets, and translations as structured data.
- Keep the UI ready for a future Supabase provider swap.

## Localhost And QA

- When running a dev server, use `localhost:3000` if free; otherwise use the next available port and report the URL.
- Do not assume a server is healthy until the page opens in browser or Playwright.
- Before saying implementation is done, run available lint, typecheck, build, and focused tests.
- Apply senior QA from `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`: smoke, regression, E2E, visual regression where stable, trace viewer on failures, WAVE/axe, Lighthouse/Core Web Vitals, link checks, i18n QA and security headers.
- Use Playwright/browser checks for key flows: language switcher, WhatsApp chooser, market filtering, PDFs, map, mobile menu, lightbox, back/forward, and responsive views.
- Test responsive at least 390, 430, 768, 1024, 1440, and 1920 widths.

## Temporary Design Prompts

- Files explicitly marked `temp` are for exploration only. They are not source of truth and must not override the project MDs above.
