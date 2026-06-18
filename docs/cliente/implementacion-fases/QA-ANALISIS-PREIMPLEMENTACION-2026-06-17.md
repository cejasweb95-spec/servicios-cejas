# QA analisis preimplementacion - 17/06/2026

Estado: Completado como auditoria documental inicial.

Objetivo: revisar todo lo documentado antes de empezar codigo y confirmar si falta algun bloqueo, aclaracion o recomendacion tecnica.

---

## 1. Resultado ejecutivo

El proyecto esta listo para empezar implementacion por fases en `develop`, empezando por Fase 00 y Fase 01. No veo un bloqueo de contenido que impida crear arquitectura, datos tipados, i18n, sistema de diseno y primer vertical slice.

Lo que no debe hacerse todavia:

- Tocar `main`.
- Empezar por una home completa sin query layer.
- Copiar prototipos de Google Stitch/Figma/Claude como fuente.
- Publicar FAQ final, fechas/cupos o pagos no confirmados.
- Crear tienda, checkout, carrito o formulario de reserva.

---

## 2. Lo que ya esta fuerte

- Datos de negocio principales: marca, CTA, WhatsApp, direccion legal, NIT, email, redes y mercados.
- Servicios separados por Colombia, Espana/Europa y Suiza.
- Monedas separadas: COP, EUR, CHF.
- Duraciones de servicios y formaciones documentadas.
- PDFs de catalogos y cursos preservados.
- Regla de descarga de catalogo: una vez por mercado, no por cada servicio.
- Formaciones con CTA a WhatsApp y opcion futura de fechas/cupos.
- Jornadas por disponibilidad: Cali, Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto - Valencia y Ginebra.
- V1 informativa, preparada para Supabase futuro.
- Bilingue ES/EN desde el inicio.
- UI con palo de rosa, blanco y negro, tokens semanticos y componentes reutilizables.
- Motion/Framer Motion planificado por pagina.
- SEO desde arquitectura, no al final.

---

## 3. Lo que he reforzado antes de implementar

- Matriz QA senior con smoke, regression, E2E, visual regression, trace viewer, WAVE, axe, Lighthouse, Core Web Vitals, link checker, i18n QA, security headers y post-publicacion.
- Criterio claro para entender que "WA analysis" probablemente es WAVE analysis.
- Criterio claro para entender que "FLX" probablemente era CLS si se hablaba de performance.
- Playwright no solo para flujos: tambien para screenshots, trace viewer, accesibilidad y responsive.
- Lighthouse/PageSpeed no solo al final: se considera desde imagenes, fuentes, Motion, mapa, bundle y estructura.
- SEO con tres pasadas: SERP/keyword antes de copy, implementacion SEO-safe durante build y auditoria/post-publicacion.
- Seguridad basica web para V1 informativa: HTTPS, no secretos, headers, no mixed content, externos seguros.
- GA4 queda decidido con banner de cookies, politica de cookies y Consent Mode.
- Visual regression queda decidido como local en V1; CI se evaluara mas adelante.

---

## 4. Recomendacion de arranque

Orden recomendado real:

1. Fase 00: marcar auditoria documental y confirmar rama.
2. Fase 01: crear scaffold limpio Next.js + i18n + scripts + `typedRoutes` si encaja.
3. Fase 02: modelar datos con Zod y query layer.
4. Fase 03: organizar assets, PDFs, imagenes, favicons y OG.
5. Fase 04: sistema de diseno, tokens, shadcn y componentes base.
6. Fase 06: vertical slice Colombia con descarga PDF una sola vez.

No recomiendo empezar por la home final. La home debe salir despues de que existan datos, tokens, componentes, i18n y pruebas base.

---

## 5. Pruebas que deben existir desde temprano

- Unit tests para datos, filtros, monedas, duraciones y WhatsApp.
- Integration tests para query layer y metadata.
- E2E smoke para `/es`, `/en`, WhatsApp chooser y descargas.
- Accessibility checks con axe cuando haya componentes interactivos.
- Visual regression solo cuando el diseno ya este estable.
- Lighthouse local desde que haya una home representativa.
- Link checker cuando entren PDFs, redes y sitemap.

---

## 6. Dudas no bloqueantes

Estas preguntas no impiden empezar, pero conviene cerrarlas antes de deploy:

- Dominio final para canonical, sitemap, Search Console y OG.
- Plan exacto de Hostinger para decidir SSR/standalone/export.
- Textos legales finales deben revisarse antes de publicar porque habra GA4/cookies.
- Visual regression CI queda como mejora futura, no bloqueo de V1.
- Si habra al menos una prueba manual en iPhone/Android real antes de publicar.

---

## 7. Veredicto

Se puede empezar implementacion. La base documental es suficiente. La prioridad ahora es ejecutar con disciplina: fases, checklists, query layer, i18n, SEO-safe HTML, componentes reutilizables, Motion controlado y QA senior desde el scaffold.
