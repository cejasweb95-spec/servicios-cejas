# QA artifacts — 26/06/2026

Logs de la ejecución QA completa. No commitear secretos ni `.env.local`.

| Archivo | Comando |
|---------|---------|
| `lint.log` | `npm run lint` |
| `typecheck.log` | `npm run typecheck` |
| `vitest.log` | `npm run test` |
| `build.log` | `npm run build` |
| `e2e.log` | `CI=true npm run test:e2e` |
| `links.log` | `npm run test:links` |
| `seo.log` | `npm run test:seo` |
| `summary.txt` | Códigos de salida por capa |

Informe humano: `docs/cliente/implementacion-fases/QA-RUN-2026-06-26.md`

Reporte HTML Playwright (local, regenerable): `../playwright-report/index.html`
