# Fase 08 - Home editorial y conversion

Estado: Completa - implementada y validada; pase premium aplicado el 19/06/2026.

Nota 19/06/2026: hero con entrada escalonada y parallax sutil, mapa mundial interactivo integrado, contenido critico visible sin JS, header desktop depurado y selector de idioma mejorado. Inicio se resuelve con el logo y Descargas permanece en movil/footer para reducir ruido visual en desktop.

Objetivo: construir una home elegante, comercial y rastreable, que comunique Cejas Internacionales, Xiomara, mercados, servicios, jornadas, resultados, formaciones y contacto sin convertirse en una landing generica.

---

## Fuentes obligatorias

- `docs/cliente/planificacion-web-v2.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/frontend-ui-ux-detalle.md`
- `docs/cliente/bio-xiomara.md`
- `docs/cliente/assets-inventario.md`
- `docs/cliente/ubicaciones-jornadas.md`
- `docs/cliente/analisis-referencias-planteamiento-web.md`
- `docs/cliente/analisis-prototipos-stitch-figma-claude.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `copywriting`
- `frontend-design`
- `impeccable`
- `design-taste-frontend`
- `cejas-i18n-localization`
- `nextjs-framer-motion-animations`
- `responsive-design`
- `seo`
- `core-web-vitals-performance`

Uso: crear una home con criterio editorial, SEO-safe, imagen real, motion sobrio y CTA claro.

---

## Secciones previstas

- [x] Hero con imagen real.
- [x] Selector/entrada por mercado.
- [x] Servicios destacados.
- [x] Valoracion gratuita por foto si esta documentada.
- [x] Jornadas/mapa teaser.
- [x] Resultados teaser.
- [x] Sobre Xiomara teaser.
- [x] Formaciones teaser.
- [x] Descargas o catalogos como bloque secundario.
- [x] CTA final `Contacta conmigo`.

---

## Hero

- [x] H1 con marca/oferta literal, no frase generica.
- [x] Copy secundario claro y localizado.
- [x] Imagen real de Xiomara o trabajo real.
- [x] CTA principal `Contacta conmigo`.
- [x] CTA secundario a servicios.
- [x] Sin card gigante envolviendo el hero.
- [x] Sin imagen stock.
- [x] Sin gradiente abstracto como protagonista.
- [x] Dejar ver indicio de siguiente seccion en desktop y movil.
- [x] LCP optimizado con `next/image`, dimensiones estables y `priority` solo en imagen hero.

---

## Selector de mercado

- [x] Colombia.
- [x] Espana/Europa.
- [x] Suiza.
- [x] Explicar con microcopy que los servicios cambian por mercado.
- [x] Link a pagina de mercado.
- [x] Moneda visible.
- [x] No mezclar servicios en home.

---

## Servicios destacados

- [x] Mostrar pocos servicios prioritarios.
- [x] No usar carrusel como principal.
- [x] Usar layout editorial o lista rica.
- [x] Link a servicios.
- [x] CTA WhatsApp contextual o chooser.
- [x] No mostrar todos los catalogos en home.

---

## Resultados teaser

- [x] Imagenes reales.
- [x] No prometer resultados garantizados.
- [x] Link a resultados no creado hasta que exista la ruta de fase 11; se evita link roto.
- [x] Grid simple porque lightbox pertenece a fase 11.
- [x] No usar antes/despues con claims sensibles sin confirmacion.

---

## Formaciones teaser

- [x] Mostrar que hay cursos.
- [x] Cursos principales.
- [x] Duracion resumida.
- [x] CTA `Consultar proxima fecha` o equivalente.
- [x] No inventar fechas/cupos.
- [x] Link a formaciones conectado tras completar la ruta de fase 09; se usan PDFs y WhatsApp sin links rotos.

---

## Animaciones

- [x] Reveals sutiles por seccion.
- [x] Stagger ligero en listas cortas.
- [x] Hover/tap en CTA y cards.
- [x] No animar contenido critico de forma que desaparezca para SEO.
- [x] Respeta reduced motion.
- [x] Motion aislado en componentes client.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:links
npm run test:e2e
```

Checks:

- [x] H1 unico.
- [x] LCP no penalizado por imagen pesada.
- [x] Home en ES.
- [x] Home en EN.
- [x] CTA abre WhatsApp chooser.
- [x] Links de mercado funcionan.
- [x] Mobile 390 sin solapes.
- [x] Desktop 1440 validado visualmente; 1920 queda pendiente para matriz final.
- [x] Reduced motion conserva contenido.

Validacion ejecutada el 18/06/2026:

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run build`
- [x] `npm run test:links`
- [x] `npm run test:e2e` - 36 tests OK en desktop y mobile.
- [x] Playwright visual smoke en 1440 y 390: sin overflow, un H1, imagen hero cargada.
- [x] Playwright reduced motion smoke en 390: sin overflow y dialog WhatsApp visible.

---

## No avanzar si

- [x] Validado: hero no parece stock/template y usa foto real.
- [x] Validado: la home no mezcla datos de mercados.
- [x] Validado: la home no depende de animacion para mostrar contenido.
- [x] Validado: no falta version EN.

---

## Done cuando

- [x] Home completa ES/EN.
- [x] Conversion y SEO basico validados.
- [x] QA responsive inicial aprobado.
- [x] Fase 08 marcada en `CHECKLIST-MAESTRA.md`.
