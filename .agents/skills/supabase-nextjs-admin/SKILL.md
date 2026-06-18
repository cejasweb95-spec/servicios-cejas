---
name: supabase-nextjs-admin
description: Supabase plus Next.js future admin workflow for Cejas Internacionales. Use when planning or implementing Supabase Postgres, Auth, Storage, Row Level Security, migrations, admin pages, service/course/event tables, or server-side Supabase clients.
---

# Supabase Next.js Admin

Use after `cejas-internacionales-guardrails`.

## Scope

V1 has no database. Future V2 uses:

- Supabase Postgres for data.
- Supabase Auth for `/admin`.
- Supabase Storage for PDFs/images.
- Row Level Security for private edits.
- Next.js Server Components, Server Actions, or Route Handlers for secure access.

## Data Entities

Mirror the project docs:

- `markets`
- `service_categories`
- `services`
- `service_market_offers`
- `courses`
- `course_modules`
- `course_offers`
- `locations`
- `events`
- `downloads`
- `media_assets`
- `whatsapp_targets`
- `seo_entries`
- `site_settings`

## Rules

- Never expose service-role keys to the client.
- Public site can read published rows only.
- Admin routes require auth.
- Storage buckets separate public assets from private/admin uploads.
- Keep local data provider interface so migration does not rewrite UI.
- Add RLS policies before admin is considered production-ready.

## Migration Strategy

1. Keep V1 local typed data.
2. Define Supabase schema matching local types.
3. Write seed/migration scripts.
4. Swap `lib/content/*` provider from local files to Supabase queries.
5. Build `/admin` only when the client needs editing.

