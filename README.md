# Cejas Internacionales

Landing **Próximamente** — Next.js + React para micropigmentación estética internacional.

## Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- Hosting: **Hostinger** (Git → rama `main`, framework **Next.js**)

## Desarrollo local

```bash
npm install
npm run dev
```

http://localhost:3000

## Configuración

Copia `.env.example` a `.env.local` o edita las variables:

- `NEXT_PUBLIC_SITE_URL` — https://cejasinternacionales.com
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — 34603804837
- `NEXT_PUBLIC_INSTAGRAM_URL` — (opcional)

También puedes editar valores por defecto en `lib/config.ts`.

## Hostinger

Ver **`docs/hostinger-deploy.md`** — framework **Next.js**, build `npm run build`, start `npm start`.

## Documentación

- `docs/roadmap-web-completa.md` — Sanity, Resend, web completa
- `docs/hostinger-deploy.md` — Deploy en Hostinger
- `docs/skills-instaladas.md` — Agent skills
