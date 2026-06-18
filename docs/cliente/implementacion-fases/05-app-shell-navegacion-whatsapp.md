# Fase 05 - App shell, navegacion, WhatsApp e i18n

Estado: En progreso - header, footer, selector de idioma y WhatsApp chooser base implementados el 18/06/2026.

Objetivo: crear la estructura global de la web: header, menu movil, footer, cambio de idioma, chooser de WhatsApp, rutas principales y estados de navegacion.

---

## Fuentes obligatorias

- `PRODUCT.md`
- `docs/cliente/contacto-datos-legales.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`
- `docs/cliente/i18n-es-en-plan.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/seo-desde-inicio-estrategia.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `shadcn`
- `accessibility`
- `responsive-design`
- `nextjs-framer-motion-animations`
- `user-flow-e2e-testing`

Uso: estructura global SSR, accesible y bilingue. Motion solo en microinteracciones client-side.

---

## Componentes a crear

```txt
src/components/layout/
  site-header.tsx          # creado
  site-footer.tsx          # creado
  mobile-nav.tsx           # creado
  locale-switcher.tsx      # creado
  cookie-preferences-link.tsx # creado como trigger base
  skip-link.tsx            # creado
src/components/domain/
  whatsapp-chooser.tsx     # creado
  cookie-consent-banner.tsx
src/lib/whatsapp/
  build-whatsapp-url.ts    # creado y ampliado
```

---

## Navegacion ES

- [x] Inicio
- [x] Servicios
- [x] Formaciones
- [x] Jornadas
- [x] Resultados
- [x] Sobre Xiomara
- [x] Contacto
- [x] Descargas

---

## Navegacion EN

- [x] Home
- [x] Services
- [x] Professional training
- [x] Appointments by city
- [x] Results
- [x] About Xiomara
- [x] Contact
- [x] Downloads

---

## Checklist header

- [x] Logo con alt localizado.
- [x] Nav desktop visible.
- [x] Menu movil con `Sheet`.
- [x] CTA `Contacta conmigo` / `Contact me`.
- [x] CTA abre `WhatsAppChooser` en contexto global.
- [x] Locale switcher conserva pagina equivalente si existe. (verificado: /es/servicios/colombia/laminado-cejas -> /en/services/colombia/brow-lamination)
- [x] Header no tapa contenido con anchors.
- [x] Header no ocupa demasiado en movil.

---

## Checklist footer

- [x] Nombre Cejas Internacionales.
- [x] Datos legales Cali.
- [x] NIT.
- [x] Email oficial.
- [x] WhatsApp Colombia.
- [x] WhatsApp Espana/Europa/Suiza.
- [x] Instagram.
- [x] Facebook.
- [x] TikTok.
- [x] Enlaces a descargas.
- [x] Enlaces legales.
- [ ] Enlace para cambiar preferencias de cookies.
- [x] No crear sedes en Espana ni Suiza.

---

## WhatsApp chooser

- [x] Opcion Colombia.
- [x] Opcion Espana / Europa / Suiza.
- [x] Texto ES.
- [x] Texto EN.
- [x] Mensaje prellenado por contexto.
- [x] Link `wa.me` codificado.
- [x] Dialog accesible.
- [x] Cierra con Escape.
- [x] Cierra con boton.
- [x] Focus vuelve al disparador.

Comportamiento por contexto:

- [x] Header/Home: chooser.
- [x] Pagina Colombia: Colombia destacado o directo Colombia.
- [x] Pagina Espana/Europa: directo Espana/Europa.
- [x] Pagina Suiza: directo Espana/Europa/Suiza.
- [ ] Curso: chooser salvo si se define mercado.
- [ ] Contacto: dos opciones visibles.

---

## Animaciones permitidas

- [x] Apertura/cierre de menu con Motion o CSS.
- [x] Apertura/cierre chooser con Motion/CSS de shadcn.
- [x] Hover/tap sutil en CTA.
- [x] Respeta `prefers-reduced-motion`.
- [x] No bloquea render SSR.
- [x] No carga Motion en componentes server sin necesidad.
- [x] Hover/tap/focus equivalentes en menu, footer, CTA y WhatsApp chooser. Banner cookies queda para subfase cookies.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright:

- [ ] Desktop: abrir menu principal.
- [x] Mobile 390: abrir/cerrar menu.
- [ ] Tab keyboard por header.
- [x] Abrir WhatsApp chooser.
- [x] Seleccionar Colombia.
- [x] Seleccionar Espana/Europa/Suiza.
- [x] Cambiar ES -> EN.
- [ ] Cambiar EN -> ES.
- [ ] Footer links no son 404.

---

## No avanzar si

- [ ] WhatsApp esta hardcodeado en varios componentes.
- [ ] Header o footer mezclan idiomas.
- [ ] Menu movil no es accesible.
- [ ] Se crea direccion de Espana/Suiza.

---

## Done cuando

- [ ] Shell global completo.
- [ ] WhatsApp centralizado.
- [ ] Navegacion ES/EN lista.
- [ ] QA de header/footer/menu/chooser pasa.
- [ ] Fase 05 marcada en `CHECKLIST-MAESTRA.md`.
