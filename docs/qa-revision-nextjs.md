# QA Revisión — Landing Next.js (post-migración)

Revisión aplicando skills: `seo`, `seo-audit`, `accessibility`, `responsive-design`, `next-best-practices`, `web-design-guidelines`, `copywriting`.

Fecha: junio 2026

## Skills aplicadas en esta revisión

| Skill | Resultado | Acción |
|-------|-----------|--------|
| **seo** | ✅ Title ~58 chars, description ~130 chars, canonical, OG, JSON-LD | Añadido `knowsAbout` en schema |
| **seo-audit** | ✅ 1 H1, jerarquía H2/H3, sitemap/robots dinámicos | OK |
| **accessibility** | ⚠️ Mejorado | Skip link, focus-visible, reveal sin JS, touch 44px |
| **responsive-design** | ✅ Mobile-first, breakpoints, botón flotante | OK |
| **next-best-practices** | ⚠️ Mejorado | `viewport` export, `not-found.tsx`, `next/font` |
| **frontend-design** | ✅ Estética premium conservada | OK |
| **copywriting** | ✅ CTAs claros, tono premium | OK |

## Correcciones aplicadas

1. **Reveal sin JavaScript** — contenido visible si JS falla (`html.no-js`)
2. **Skip link** — "Saltar al contenido principal"
3. **Focus visible** — outline dorado en teclado
4. **Touch targets** — mínimo 44px en iconos y botones
5. **scroll-padding-top** — anclas no quedan bajo header sticky
6. **viewport export** — Next.js 15 (theme-color)
7. **not-found.tsx** — página 404 con estilo de marca
8. **JSON-LD** — `knowsAbout` con servicios clave

## Pendiente (futuro, no bloqueante)

| Item | Skill | Motivo |
|------|-------|--------|
| OG image (`opengraph-image`) | seo | Falta imagen de marca |
| `error.tsx` | next-best-practices | Opcional en landing simple |
| Tailwind + shadcn | tailwind-design-system | Fase web completa |
| Auditoría WCAG formal | accessibility | Requiere herramienta automatizada |
| `impeccable` script | impeccable | Auditoría visual en navegador |

## Comandos de verificación

```bash
npm run build
npm run dev
```
