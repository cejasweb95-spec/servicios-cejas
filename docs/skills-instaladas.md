# Skills instaladas — Cejas Internacionales

Instaladas desde [skills.sh](https://skills.sh) el 12/06/2026.

## Ubicación

| Ámbito | Ruta |
|--------|------|
| **Global** (todos tus proyectos) | `C:\Users\JeffreyBolaños\.agents\skills\` |
| **Proyecto** (este repo) | `C:\servicios-cejas\.agents\skills\` |

## Skills por categoría

### Diseño premium y UI

| Skill | Installs | Uso |
|-------|----------|-----|
| [frontend-design](https://skills.sh/anthropics/skills/frontend-design) | 533K+ | Interfaces distintivas, producción real |
| [design-taste-frontend](https://skills.sh/leonxlnx/taste-skill/design-taste-frontend) | 138K+ | Criterio estético premium, anti-genérico |
| [ui-ux-pro-max](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) | 212K+ | Paletas, tipografía, componentes, stacks |
| [web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | 384K+ | Revisión UI, accesibilidad, guidelines |
| [shadcn](https://skills.sh/shadcn/ui/shadcn) | 186K+ | Componentes shadcn/ui + Tailwind |
| [tailwind-design-system](https://skills.sh/wshobson/agents/tailwind-design-system) | 47K+ | Tokens, variantes, design system |
| [impeccable](https://skills.sh/pbakaus/impeccable) | — | Auditoría visual y calidad final |

### Responsive y mobile-first

| Skill | Installs | Uso |
|-------|----------|-----|
| [responsive-design](https://skills.sh/wshobson/agents/responsive-design) | 12.8K+ | **Clave** — mobile-first, breakpoints, fluid type |

### Frontend / Next.js / React

| Skill | Installs | Uso |
|-------|----------|-----|
| [next-best-practices](https://skills.sh/vercel-labs/next-skills/next-best-practices) | 104K+ | App Router, metadata, RSC, convenciones |
| [vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | 469K+ | Rendimiento React/Next (70 reglas) |
| [vercel-composition-patterns](https://skills.sh/vercel-labs/agent-skills/vercel-composition-patterns) | — | Arquitectura de componentes escalable |

### SEO y copy

| Skill | Installs | Uso |
|-------|----------|-----|
| [seo-audit](https://skills.sh/coreyhaines31/marketingskills/seo-audit) | 134K+ | Auditoría SEO técnica y on-page |
| [seo](https://skills.sh/addyosmani/web-quality-skills/seo) | 25K+ | Meta tags, structured data, Core Web Vitals |
| [copywriting](https://skills.sh/coreyhaines31/marketingskills/copywriting) | 124K+ | Textos persuasivos para belleza premium |

### Accesibilidad

| Skill | Installs | Uso |
|-------|----------|-----|
| [accessibility](https://skills.sh/addyosmani/web-quality-skills/accessibility) | 27K+ | WCAG 2.1, contraste, teclado, screen readers |

## Comandos de reinstalación

```bash
# Una skill concreta (proyecto)
npx skills add anthropics/skills -s frontend-design -y --agent cursor

# Listar instaladas
npx skills ls
npx skills ls -g

# Actualizar
npx skills update -y
```

## Flujo recomendado al desarrollar

1. **Estructura** → `next-best-practices` + `tailwind-design-system` + `shadcn`
2. **Diseño** → `frontend-design` + `design-taste-frontend` + `ui-ux-pro-max`
3. **Responsive** → `responsive-design` (obligatorio en cada página)
4. **Textos** → `copywriting`
5. **SEO** → `seo` + `seo-audit` antes de publicar
6. **Calidad final** → `impeccable` + `accessibility` + `web-design-guidelines`
