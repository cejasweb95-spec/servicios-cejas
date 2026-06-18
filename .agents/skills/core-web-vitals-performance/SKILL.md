---
name: core-web-vitals-performance
description: Core Web Vitals and Lighthouse performance workflow for Cejas Internacionales. Use when optimizing or auditing LCP, INP, CLS, PageSpeed, Lighthouse, image/font performance, JavaScript weight, Next.js rendering, mobile speed, or SEO-safe performance.
---

# Core Web Vitals Performance

Use after `cejas-internacionales-guardrails`.

## Targets

- Lighthouse Performance: aim 95+ on mobile where realistic.
- SEO/A11y/Best Practices: aim 100.
- LCP: under 2.5s.
- CLS: under 0.1.
- INP: under 200ms.

## Project Rules

- Use `next/image` for public images.
- Hero image must have stable dimensions, correct `sizes`, and `priority` only if it is LCP.
- Do not lazy-load the LCP image.
- Lazy-load below-fold galleries/results.
- Use `next/font` for Marcellus and Manrope.
- Keep Motion in small Client Components.
- Avoid heavy carousel libraries; use shadcn Dialog + Motion for lightbox.
- PDFs must be downloads, not embedded heavy viewers in initial page.
- Map must be custom SVG/React, not a heavy iframe on Home.

## Audit Workflow

1. Run local build.
2. Run Lighthouse/PageSpeed on Home, Servicios, Servicio detail, Formaciones, Jornadas.
3. Check LCP element.
4. Check CLS sources.
5. Check JS bundle and client components.
6. Check image sizes and formats.
7. Check fonts and render-blocking assets.
8. Re-test mobile first.

## Typical Fixes

- Convert oversized JPG/PNG to WebP/AVIF.
- Add explicit dimensions/aspect ratios.
- Use static server-rendered content where possible.
- Replace client filters with server-rendered defaults plus progressive enhancement.
- Split interactive parts into leaf components.
- Remove unused animation libraries/effects.

