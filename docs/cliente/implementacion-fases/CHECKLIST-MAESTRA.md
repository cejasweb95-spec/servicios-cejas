# Checklist maestra de implementacion V1

Ultima actualizacion: 21/07/2026.

Esta checklist resume las fases. El detalle operativo vive en cada MD de `docs/cliente/implementacion-fases/`.

---

## Estado global

- [x] 00 - QA y auditoria preimplementacion.
- [x] 01 - Scaffold Next.js + i18n.
- [x] 02 - Modelado de datos + query layer.
- [x] 03 - Assets, PDFs e imagenes.
- [x] 04 - Sistema de diseno, shadcn y tokens.
- [x] 05 - App shell, navegacion, WhatsApp e i18n.
- [x] 06 - Vertical slice Colombia + Descargas.
- [x] 07 - Servicios por mercado y detalles.
- [x] 08 - Home editorial y conversion.
- [x] 09 - Formaciones y cursos.
- [x] 10 - Jornadas y mapa animado.
- [x] 11 - Resultados, Sobre, Cuidados, Contacto y Legal.
- [x] 12 - SEO, schema y performance.
- [x] 13 - QA cross-browser, accesibilidad y E2E.
- [ ] 14 - Predeploy Hostinger y ruta futura Supabase.

---

## QA transversal obligatorio

- [x] Rama actual verificada: `develop`.
- [x] `main` no tocada.
- [x] No hay edits en artefactos generados.
- [x] Cada pagina publica creada hasta ahora tiene ES y EN.
- [x] Paridad profunda ES/EN, placeholders y rutas equivalentes verificados por tests unitarios.
- [x] Cada pagina publica creada hasta ahora tiene metadata localizada.
- [x] Cada pagina publica creada hasta ahora tiene un solo H1.
- [x] Cada imagen publica tiene dimensiones estables y alt localizado.
- [x] Cada CTA WhatsApp sale de datos centralizados.
- [x] Cada servicio creado hasta ahora sale de query layer, no de arrays directos en componentes visuales.
- [x] Cada mercado lista solo servicios permitidos.
- [x] PDFs de catalogos no se repiten dentro de cada servicio.
- [x] Componentes reutilizables base siguen `COMPONENTES-REUTILIZABLES-SISTEMA.md`.
- [x] Botones, tabs, tablas/listas, cards y CTAs no se reinventan por pagina creada hasta ahora.
- [x] Motion planificado segun `MOTION-ANIMACIONES-POR-PAGINA.md`.
- [x] `prefers-reduced-motion` probado en mapa/jornadas y flujos animados principales creados hasta ahora.
- [x] SEO senior sigue `SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`.
- [x] QA senior sigue `QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`.
- [x] WAVE/axe, visual regression, trace viewer, Lighthouse, link checker y security headers considerados en la fase correcta.
- [x] Legal/cookies/GA4 siguen `legal-privacidad-cookies-ga4.md`.
- [x] GA4 no carga antes de consentimiento.
- [x] Aviso legal, privacidad y cookies existen en ES/EN.
- [x] Hover nunca es la unica forma de acceder a informacion; foco/tap/click equivalente probado.
- [x] Paginas principales tienen keyword map, metadata, schema y auditoria final.
- [x] Formularios de reserva, carrito, checkout y tienda no existen en V1.
- [x] Lighthouse objetivo: SEO/A11y/Best Practices 100; Performance movil local post-pase premium 83-86 con justificacion y mejora posterior documentada.

---

## Matriz minima de validacion final

- [x] Desktop 1920px.
- [x] Desktop 1440px.
- [x] Laptop/tablet 1024px.
- [x] Tablet 768px.
- [x] Mobile 430px.
- [x] Mobile 390px.
- [x] Auditoria automatizada integral: 212 URLs x 390/430/768/1024/1440/1920 sin incidencias.
- [x] Chromium.
- [x] Firefox.
- [x] WebKit/Safari.
- [x] Android Chrome real o emulado.
- [x] iOS Safari real o WebKit emulado.
- [x] Navegacion con teclado.
- [x] `prefers-reduced-motion`.
- [x] Links PDF.
- [x] WhatsApp chooser y enlaces directos.
- [x] Cambio ES/EN.
- [x] Mapa/lista de jornadas.
- [x] Menu movil.
- [x] Back/forward del navegador.
- [x] Banner cookies aceptar/rechazar/configurar.
- [x] Cambio de preferencias cookies desde footer.
- [x] GA4 activo solo tras aceptar analiticas.
- [ ] WAVE manual en paginas principales.
- [x] axe automatizado sin issues criticos.
- [ ] Visual regression estable en paginas clave cuando el diseno este cerrado.
- [x] Trace viewer disponible para fallos E2E.
- [x] Security headers revisados antes de publicar.

---

## Bloqueos conocidos que no impiden V1

- [ ] Fechas/cupos/requisitos concretos de cursos: mostrar CTA `Consultar por WhatsApp`.
- [ ] Fechas exactas de jornadas: mostrar `Proximas jornadas por disponibilidad`.
- [ ] Pagos Espana/Suiza: no publicar metodos concretos sin confirmacion.
- [ ] FAQ final: no usar como base de arquitectura; solo publicar si hay respuestas confirmadas.
