# Fase 11 - Resultados, Sobre, Cuidados, Contacto y Legal

Estado: Completada para V1; revision legal profesional externa pendiente antes de produccion.

Nota 19/06/2026: Resultados dispone de mosaico y lightbox accesible; Sobre Xiomara incorpora composicion editorial con una imagen real de certificaciones; Contacto, Cuidados y las paginas legales estan publicadas en ES/EN. Los componentes especificos que no aportaban reutilizacion real se resolvieron mediante primitives compartidos existentes.

Objetivo: completar las paginas de confianza y soporte: galeria real, historia de Xiomara, cuidados, contacto, descargas legales y textos legales basicos segun funcionalidades reales.

---

## Fuentes obligatorias

- `docs/cliente/bio-xiomara.md`
- `docs/cliente/formaciones-certificaciones.md`
- `docs/cliente/fotos-cicatrizados-y-sesion.md`
- `docs/cliente/fotos-instagram-inventario.md`
- `docs/cliente/cuidados-micropigmentacion.md`
- `docs/cliente/contacto-datos-legales.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`
- `docs/cliente/assets-inventario.md`
- `docs/cliente/planificacion-web-v2.md`
- `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cejas-i18n-localization`
- `copywriting`
- `image-asset-pipeline`
- `shadcn`
- `accessibility`
- `responsive-design`
- `seo`
- `schema-structured-data`
- `user-flow-e2e-testing`
- `nextjs-framer-motion-animations`

Uso: reforzar confianza con contenido real, sin claims no confirmados y con accesibilidad fuerte.

---

## Rutas

- [x] `/es/resultados`
- [x] `/en/results`
- [x] `/es/sobre-xiomara`
- [x] `/en/about-xiomara`
- [x] `/es/cuidados`
- [x] `/en/aftercare`
- [x] `/es/contacto`
- [x] `/en/contact`
- [x] `/es/aviso-legal`
- [x] `/en/legal-notice`
- [x] `/es/privacidad`
- [x] `/en/privacy`
- [x] `/es/cookies`
- [x] `/en/cookies`

---

## Resultados

- [x] Usar fotos reales disponibles.
- [ ] Agrupar por cejas, labios, mirada u otra categoria real.
- [x] Usar `next/image`.
- [x] Alt ES/EN.
- [x] Lightbox accesible si se implementa.
- [x] No carrusel como principal.
- [x] No prometer resultados garantizados.
- [x] No manipular imagenes de forma enganosa.
- [x] No depender de Instagram embebido para contenido principal.

---

## Sobre Xiomara

- [x] Bio real.
- [x] Trayectoria internacional.
- [x] Sede en Colombia.
- [x] Jornadas por disponibilidad.
- [x] Certificaciones/formacion.
- [x] Imagen real.
- [x] CTA contacto.
- [x] No inventar anos, cifras o premios.

---

## Cuidados

- [x] Cuidados antes/despues de cejas si estan confirmados.
- [x] Cuidados antes/despues de labios si estan confirmados.
- [x] Redaccion clara, no medica.
- [x] Aviso de resolver dudas por WhatsApp.
- [x] No publicar contraindicaciones no confirmadas como si fueran politica oficial.

---

## Contacto

- [x] WhatsApp Colombia visible.
- [x] WhatsApp Espana/Europa/Suiza visible.
- [x] Email oficial visible.
- [x] Redes visibles.
- [x] Direccion Cali visible.
- [x] NIT visible si aplica.
- [x] No formulario de reserva.
- [x] No crear oficina fuera de Cali.
- [x] CTA con mensaje contextual.
- [ ] `ContactOption` y `WhatsAppCTA` reutilizados.

---

## Legal

- [x] Aviso legal con datos confirmados.
- [x] Privacidad segun `legal-privacidad-cookies-ga4.md`.
- [x] Cookies obligatorias porque se usara GA4 con consentimiento.
- [x] Banner de cookies ES/EN con aceptar, rechazar y configurar.
- [x] Consent Mode: GA4 no carga antes de consentimiento.
- [x] No inventar representante legal adicional.
- [x] No usar direccion Espana/Suiza.
- [ ] La clienta/asesor legal debe revisar textos legales finales antes de publicar.

---

## Animaciones Motion

Fuente: `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`.

- [x] Resultados: hover leve en mosaico.
- [x] Resultados: lightbox con `AnimatePresence` si se implementa.
- [x] Resultados: foco vuelve al thumbnail al cerrar lightbox.
- [x] Sobre Xiomara: reveal editorial de bio/certificaciones.
- [x] Cuidados: reveal por bloques; accordion solo si mantiene SEO-safe.
- [x] Contacto: microinteraccion en opciones WhatsApp y redes.
- [x] Legal: minimo o sin Motion.
- [x] Cookie banner: comportamiento sobrio, sin dark patterns y con foco visible.
- [ ] Reduced motion probado en galeria, bio, cuidados y contacto.

---

## Reutilizacion de componentes

- [x] `ResultTile` para mosaico.
- [x] `ResultLightbox` si hay lightbox.
- [ ] `CertificationItem` para certificaciones.
- [ ] `ContactOption` para WhatsApp/email/redes.
- [ ] `WhatsAppCTA` para contacto.
- [x] `Section` y `PageHero` para estructura comun.
- [x] No crear componentes visuales aislados para cada pagina si el patron ya existe.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright:

- [x] Galeria abre/cierra si hay lightbox.
- [x] Teclado funciona en lightbox.
- [x] Contacto WhatsApp Colombia correcto.
- [x] Contacto WhatsApp Espana correcto.
- [x] Email link correcto.
- [x] Redes abren URLs correctas.
- [x] Banner cookies permite aceptar, rechazar y configurar.
- [x] Enlace de cambiar preferencias funciona.
- [x] GA4 no se dispara al rechazar cookies analiticas.
- [x] GA4 no envia datos personales identificables.
- [x] Imagenes no rotas en paginas cubiertas por smoke/a11y.
- [x] Mobile 390 sin overflow en flujos principales creados hasta ahora.

---

## No avanzar si

- [ ] Faltan alt text.
- [ ] Se inventan datos legales.
- [ ] Hay formulario de reserva.
- [ ] Hay claims sensibles no confirmados.

---

## Done cuando

- [x] Paginas de confianza completas ES/EN.
- [x] Contacto y legal correctos a nivel tecnico y de datos confirmados.
- [x] QA de imagenes/interacciones pasa.
- [x] Fase 11 marcada en `CHECKLIST-MAESTRA.md`.
