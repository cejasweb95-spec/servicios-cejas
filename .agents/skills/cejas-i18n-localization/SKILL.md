---
name: cejas-i18n-localization
description: Project-specific Spanish and international English localization workflow for Cejas Internacionales. Use when adding pages, copy, routes, metadata, SEO, schema, WhatsApp messages, alt text, UI labels, validation messages, or locale switching for the bilingual website.
---

# Cejas i18n Localization

Use after `cejas-internacionales-guardrails`.

## Locale Decision

- Source locale: Spanish (`es`).
- Secondary locale: international English (`en`).
- Spanish content comes from the client documentation.
- English must be professionally localized, not literal machine translation.

## Required Scope

Every public user-facing item must exist in both languages:

- Routes and navigation labels.
- Page headings, body copy, CTAs, badges, tabs and filters.
- Service/course descriptions.
- WhatsApp message templates.
- Metadata, Open Graph text, Twitter/social text.
- Alt text and accessible labels.
- Schema/JSON-LD text fields.
- Error, loading, empty, success and unavailable states.
- PDF/download labels and descriptions.

## Tone

Spanish:

- Claro, cercano, profesional, femenino, premium sin exagerar.
- Preferir datos reales sobre frases genéricas.

English:

- International, polished, concise and natural.
- Avoid word-for-word translation.
- Keep beauty/micropigmentation terminology understandable for a broad international audience.

## Technical Rules

- Prefer locale-prefixed routes: `/es/...` and `/en/...`.
- Keep `es` as default/source locale unless the user changes this.
- Use one content model with localized fields, not separate duplicated data files per language where that would diverge.
- Do not hardcode strings in components. Use translation/content dictionaries or typed localized content.
- Use locale-aware metadata and alternate links/hreflang.
- Keep language switcher accessible, visible, and stable across responsive layouts.
- Switching language should preserve the equivalent page when possible.
- Do not rely only on cookies or browser language for SEO-critical content.

## SEO Rules

- Each locale page must have its own title and description.
- Use `alternates.languages` or equivalent hreflang output.
- Keep canonical URLs locale-aware.
- Sitemap must include localized URLs.
- The visible language of each page must be consistent.

## QA

Test:

- `/es` and `/en` home.
- Locale switcher on mobile and desktop.
- Equivalent route switching for services, courses, jornadas, contact and downloads.
- Metadata for both languages.
- WhatsApp templates in both languages.
- No mixed-language UI.
- No text overflow caused by longer English labels.
