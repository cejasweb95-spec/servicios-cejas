# Fase 01 - Scaffold Next.js + i18n base

Estado: Completada

Objetivo: crear una app limpia con Next.js App Router, TypeScript, Tailwind CSS v4, estructura bilingue ES/EN y scripts de calidad desde el primer commit.

---

## Fuentes obligatorias

- `AGENTS.md`
- `PRODUCT.md`
- `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`
- `docs/cliente/i18n-es-en-plan.md`
- `docs/cliente/seo-desde-inicio-estrategia.md`
- `docs/cliente/testing-qa-profesional.md`
- `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `next-best-practices`
- `cejas-i18n-localization`
- `tailwind-design-system`
- `core-web-vitals-performance`

Uso: crear arquitectura Next sin acoplar UI a datos, con rutas localizadas y base preparada para SEO/performance.

---

## Dependencias previstas

- [x] `next`
- [x] `react`
- [x] `react-dom`
- [x] `typescript`
- [x] `tailwindcss`
- [x] `next-intl`
- [x] `zod`
- [x] `lucide-react`
- [x] `motion`
- [x] `class-variance-authority`
- [x] `clsx`
- [x] `tailwind-merge`
- [x] `@radix-ui/react-dialog`
- [x] `@radix-ui/react-tabs`
- [x] `@radix-ui/react-tooltip`
- [x] `@next/third-parties`
- [x] `vitest`
- [x] `@playwright/test`
- [x] `@axe-core/playwright`

Nota: shadcn se inicializa en la fase de sistema de diseno, despues de confirmar Tailwind, alias y estructura.

---

## Estructura minima a crear

```txt
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      not-found.tsx
    manifest.ts
    robots.ts
    sitemap.ts
  i18n/
    routing.ts
    navigation.ts
    request.ts
  messages/
    es.json
    en.json
  app/
    globals.css
```

---

## Checklist tecnica

- [x] Crear app limpia sin copiar artefactos compilados.
- [x] Configurar TypeScript estricto.
- [x] Configurar alias `@/*`.
- [x] Configurar Tailwind CSS v4.
- [x] Configurar `globals.css`.
- [x] Configurar ESLint.
- [x] Evaluar/activar `typedRoutes: true` si encaja con la estrategia de rutas localizadas.
- [x] Configurar scripts:
  - [x] `lint`
  - [x] `typecheck`
  - [x] `build`
  - [x] `dev`
  - [x] `test`
  - [x] `test:e2e`
  - [x] `test:a11y`
  - [x] `test:links`
  - [x] `test:visual`
- [x] Configurar `next-intl` para App Router.
- [x] Crear rutas `/es` y `/en`.
- [x] Redireccionar raiz al idioma por defecto o resolver segun plan i18n.
- [x] Crear layout con `lang` correcto.
- [x] Crear metadata base localizada.
- [x] Crear `robots.ts` y `sitemap.ts` aunque sean minimos.

---

## Checklist SEO/i18n desde scaffold

- [x] URL limpia por idioma.
- [x] `html lang="es"` en `/es`.
- [x] `html lang="en"` en `/en`.
- [x] `alternates.languages` preparado.
- [x] Canonical preparado.
- [x] No depender de cookies para mostrar idioma.
- [x] Contenido inicial server-rendered y rastreable.

---

## Checklist QA

- [x] `npm run lint` pasa.
- [x] `npm run typecheck` pasa.
- [x] `npm run build` pasa.
- [x] Dev server abre en `localhost:3000` o siguiente puerto libre.
- [x] `/es` abre.
- [x] `/en` abre.
- [x] No hay errores de consola en arranque.
- [x] No hay warnings graves de hidratacion.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run dev
```

Con navegador o Playwright:

- [x] Abrir `/es`.
- [x] Abrir `/en`.
- [x] Verificar `lang`.
- [x] Verificar title localizado.
- [x] Verificar que no hay horizontal overflow en 390px.

---

## Errores a evitar

- [ ] Crear solo una pagina en espanol.
- [ ] Meter textos reales hardcodeados dentro de componentes finales.
- [ ] Crear rutas sin estrategia de idioma.
- [ ] Instalar librerias decorativas innecesarias.
- [ ] Empezar por la home completa antes de datos/query layer.

---

## No avanzar si

- [ ] `/es` y `/en` no funcionan.
- [ ] Build falla.
- [ ] El idioma depende solo de estado client-side.
- [ ] No hay scripts de lint/typecheck/build.

---

## Done cuando

- [x] App limpia creada.
- [x] Rutas ES/EN funcionando.
- [x] Scripts base verdes.
- [x] Fase 01 marcada en `CHECKLIST-MAESTRA.md`.
