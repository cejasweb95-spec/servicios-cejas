# Implementacion V1 - checklist operativo

Ultima actualizacion: 17/06/2026.

Checklist de control para empezar y avanzar la implementacion sin saltarse decisiones del proyecto.

Nota: esta checklist queda como resumen. La checklist accionable por fase esta en `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md` y los MD individuales de `docs/cliente/implementacion-fases/`.

---

## 0. Antes de escribir codigo

- [ ] Estoy en rama `develop`.
- [ ] `main` no se toca.
- [ ] No voy a editar `.next`, `node_modules`, `dist` ni artefactos generados.
- [ ] He leido `AGENTS.md`.
- [ ] He leido `PRODUCT.md`.
- [ ] He leido `planificacion-web-v2.md`.
- [ ] He leido `i18n-es-en-plan.md`.
- [ ] He leido `frontend-ui-ux-v3-profesional.md`.
- [ ] He leido `arquitectura-tecnica-hostinger-futura-db.md`.
- [ ] He leido `seo-desde-inicio-estrategia.md`.
- [ ] He leido `testing-qa-profesional.md`.

---

## 1. Scaffold

- [ ] Crear app Next.js limpia.
- [ ] TypeScript activo.
- [ ] Tailwind CSS v4 activo.
- [ ] Alias `@/*` configurado.
- [ ] ESLint configurado.
- [ ] Scripts definidos:
  - [ ] `lint`
  - [ ] `typecheck`
  - [ ] `build`
  - [ ] `test`
  - [ ] `test:e2e`
- [ ] App corre en `localhost:3000` o siguiente puerto libre.
- [ ] URL local reportada.

---

## 2. i18n ES/EN

- [ ] Rutas `/es` y `/en`.
- [ ] `next-intl` configurado.
- [ ] `messages/es.json`.
- [ ] `messages/en.json`.
- [ ] `LocaleSwitcher`.
- [ ] `lang` correcto por idioma.
- [ ] Metadata ES.
- [ ] Metadata EN.
- [ ] Language switch conserva pagina equivalente.
- [ ] No hay pagina publica solo en un idioma.

---

## 3. Datos y validacion

- [ ] Zod schemas.
- [ ] `markets.ts`.
- [ ] `whatsapp-targets.ts`.
- [ ] `downloads.ts`.
- [ ] `services.ts`.
- [ ] `courses.ts`.
- [ ] `locations.ts`.
- [ ] `events.ts`.
- [ ] `media.ts`.
- [ ] `seo.ts`.
- [ ] `queries.ts`.
- [ ] Validacion falla si falta:
  - [ ] slug
  - [ ] idioma ES/EN
  - [ ] precio requerido
  - [ ] moneda
  - [ ] WhatsApp target
  - [ ] PDF path

---

## 4. Descargas PDF

- [ ] Catalogo Colombia copiado a `public/descargas/catalogos/`.
- [ ] Catalogo Espana copiado a `public/descargas/catalogos/`.
- [ ] Catalogo Suiza copiado a `public/descargas/catalogos/`.
- [ ] PDFs de cursos copiados a `public/descargas/formaciones/`.
- [ ] Links funcionan.
- [ ] Pagina `/descargas` lista todos.
- [ ] Cada pagina de mercado muestra su catalogo una sola vez.
- [ ] `ServiceCard` no tiene boton de descargar catalogo.
- [ ] `CourseCard` si puede tener descarga de su PDF propio.

---

## 5. WhatsApp

- [ ] Colombia usa `573167742299`.
- [ ] Espana/Europa/Suiza usa `34603804837`.
- [ ] No hay telefonos falsos tipo `573000000000`.
- [ ] `buildWhatsAppUrl()` centralizado.
- [ ] Mensajes ES.
- [ ] Mensajes EN.
- [ ] Header/Home abre chooser.
- [ ] Colombia apunta a Colombia.
- [ ] Espana apunta a Espana.
- [ ] Suiza apunta a Espana.
- [ ] Contacto muestra ambos.

---

## 6. Servicios por mercado

- [ ] Colombia muestra COP.
- [ ] Espana/Europa muestra EUR.
- [ ] Suiza muestra CHF.
- [ ] Colombia incluye exclusivos: pestanas, unas, peinados/maquillaje.
- [ ] Espana no muestra exclusivos Colombia.
- [ ] Suiza no muestra HidraLips.
- [ ] Suiza no muestra depilaciones.
- [ ] Suiza no muestra correccion de cejas salvo confirmacion futura.
- [ ] Cada servicio muestra duracion de cita real.
- [ ] Si muestra duracion de resultado, queda diferenciada de la cita.
- [ ] No hay precios inventados.

---

## 7. UI base

- [ ] Tokens palo de rosa/blanco/negro.
- [ ] No raw hex en componentes.
- [ ] Marcellus headings.
- [ ] Manrope body/UI.
- [ ] Button base `inline-flex`.
- [ ] No botones full-width por defecto.
- [ ] No cards dentro de cards.
- [ ] No carousel como contenido principal.
- [ ] Touch targets 44px.
- [ ] Foco visible.

---

## 8. Paginas V1

- [ ] Home ES/EN.
- [ ] Servicios ES/EN.
- [ ] Servicios Colombia ES/EN.
- [ ] Servicios Espana/Europa ES/EN.
- [ ] Servicios Suiza ES/EN.
- [ ] Detalles de servicio prioritarios ES/EN.
- [ ] Resultados ES/EN.
- [ ] Jornadas ES/EN.
- [ ] Formaciones ES/EN.
- [ ] Detalle de formacion ES/EN.
- [ ] Cuidados ES/EN.
- [ ] Contacto ES/EN.
- [ ] Descargas ES/EN.
- [ ] Legal ES/EN.

---

## 9. Jornadas/mapa

- [ ] Cali marcado como sede fisica.
- [ ] Restrepo marcado como jornada por disponibilidad.
- [ ] Madrid marcado como jornada por disponibilidad.
- [ ] Palma de Mallorca marcado como jornada por disponibilidad.
- [ ] Puerto de Sagunto marcado como jornada por disponibilidad.
- [ ] Ginebra marcado como jornada por disponibilidad.
- [ ] Lista textual accesible.
- [ ] Reduced motion.
- [ ] CTA WhatsApp correcto por ubicacion.

---

## 10. SEO desde inicio

- [ ] H1 unico por pagina.
- [ ] Headings jerarquicos.
- [ ] Metadata ES/EN.
- [ ] Canonical por idioma.
- [ ] hreflang/alternates.
- [ ] `robots.ts`.
- [ ] `sitemap.ts`.
- [ ] Open Graph.
- [ ] Twitter image.
- [ ] Schema solo con datos confirmados.
- [ ] URLs limpias.
- [ ] Contenido rastreable en HTML.

---

## 11. QA

- [ ] `npm run lint`.
- [ ] `npm run typecheck`.
- [ ] `npm run build`.
- [ ] `npm run test`.
- [ ] Playwright desktop.
- [ ] Playwright mobile 390.
- [ ] Playwright tablet 768.
- [ ] WhatsApp links.
- [ ] PDF links.
- [ ] Language switcher.
- [ ] Market filters.
- [ ] Mapa/lista.
- [ ] Mobile nav.
- [ ] Back/forward.
- [ ] Lighthouse/PageSpeed.
- [ ] Keyboard navigation.
- [ ] No horizontal overflow.
- [ ] Banner cookies aceptar/rechazar/configurar.
- [ ] GA4 no carga antes de aceptar analiticas.
- [ ] Hover con focus/tap/click equivalente.
- [ ] Visual regression local cuando el diseno este estable.

---

## 12. Bloqueadores reales antes de publicar

- [ ] Fechas/cupos/requisitos de cursos si se quieren publicar.
- [ ] Pagos Espana/Suiza si se quieren publicar.
- [ ] Seleccion final de fotos.
- [ ] FAQ sensible si se decide publicar.
- [ ] Textos legales finales: aviso legal, privacidad y cookies ES/EN revisados antes de publicar.
