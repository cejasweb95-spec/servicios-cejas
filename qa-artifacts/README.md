# QA artifacts — 26/06/2026

Logs de la ejecución QA completa. No commitear secretos ni `.env.local`.

| Archivo | Comando |
|---------|---------|
| `lint.log` / `lint.txt` | `npm run lint` |
| `typecheck.log` / `typecheck.txt` | `npm run typecheck` |
| `vitest.log` / `vitest.txt` | `npm run test` |
| `build.log` / `build.txt` | `npm run build` |
| `e2e.log` / `e2e.txt` | `CI=true npm run test:e2e` |
| `links.log` / `links.txt` | `npm run test:links` |
| `seo.log` / `seo.txt` | `npm run test:seo` |
| `summary.txt` | Códigos de salida por capa |

Los `.log` son locales (gitignore `*.log`); los `.txt` están en el repo para historial remoto.

Informe humano: `docs/cliente/implementacion-fases/QA-RUN-2026-06-26.md`

Reporte HTML Playwright (local, regenerable): `../playwright-report/index.html`
