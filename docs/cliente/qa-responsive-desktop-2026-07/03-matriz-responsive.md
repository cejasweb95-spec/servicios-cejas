# 03 — Matriz de validación responsive

## Anchos a validar (px)

| Ancho | Dispositivo objetivo |
|---|---|
| 390 | iPhone estándar |
| 430 | iPhone Pro Max |
| 768 | iPad vertical / tablet |
| 834 | iPad Air vertical |
| 1024 | iPad horizontal / laptop pequeña |
| 1280 | laptop |
| 1440 | desktop |
| 1536 | desktop grande |
| 1920 | desktop full HD |

## Criterios por ancho

- **Móvil (390/430):** 1 columna, sin overflow, encabezados legibles, imágenes a ancho completo con tope de altura, botones tap ≥ 44px.
- **Tablet (768/834):** transición a 2 columnas donde aplique, sin overflow, sin elementos apretados.
- **iPad H / laptop (1024):** rejillas 2–3 columnas, encabezados equilibrados.
- **Desktop (1280–1920):** encabezados centrados/equilibrados, sin hueco muerto grande a la derecha, container centrado, imágenes de detalle con tope de altura.

## Checks automatizados (Playwright/Chromium)

Para cada página × ancho:
1. `scrollWidth - clientWidth === 0` (sin overflow).
2. Asimetría de márgenes del container < 24px.
3. Encabezados centrados: `|offL - rightGap| < 40px` en anchos ≥ 1280 (tras el fix).
4. Capturas de control en 1920 / 1024 / 390 de home, formaciones, servicios, contacto, descargas.

## Estado de validación

| Página | 390 | 430 | 768 | 834 | 1024 | 1280 | 1440 | 1536 | 1920 |
|---|---|---|---|---|---|---|---|---|---|
| home | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| servicios | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| mercado | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| detalle servicio | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| formaciones | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| detalle curso | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| sobre-xiomara | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| contacto | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| jornadas | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| cuidados | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| resultados | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| descargas | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| sede sagunto | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
