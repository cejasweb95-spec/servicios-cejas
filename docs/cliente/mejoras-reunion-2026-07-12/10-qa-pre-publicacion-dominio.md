# 10 — QA pre-publicación y dominio principal

## Lo que dijo la cliente

> «¿Cuándo la quieres publicar en el dominio principal? Cuando ya tengas todo eso… cambiar esos detallitos… Xiomara Sánchez… estoy súper tranquila.»

> «Esta semana yo le hago eso… el miércoles la llamo… para darle la parte final.»

## Objetivo

Checklist de cierre antes de apuntar el dominio de producción definitivo y la llamada de validación con la clienta.

---

## Bloque A — Mejoras de esta reunión (obligatorio)

- [x] [01](./01-header-xiomara-sanchez.md) Apellido en header
- [x] [02](./02-quitar-rosewash-esquina-fotos.md) Sin rosa sobre fotos
- [x] [03](./03-cuchilla-sin-foto.md) Cuchilla sin imagen
- [x] [04](./04-centrado-fotos-servicios.md) + [09](./09-servicios-senalados-encuadre.md) Encuadres prioritarios
- [x] [07](./07-suiza-sin-repetir-retrato.md) Suiza sin repetición
- [x] [08](./08-curso-laminado-foto.md) Curso laminado
- [x] [06](./06-extensiones-collage-fallback.md) Extensiones aceptables

## Bloque B — Material de la clienta (si llega a tiempo)

- [ ] [05](./05-remapeo-fotos-cliente.md) Lote renombrado aplicado — **bloqueado, no llegó a 2026-07-16**

## Bloque C — Calidad técnica

- [x] `npm run lint` sin errores (4 warnings preexistentes, ninguno de esta sesión)
- [x] `npm run typecheck` sin errores
- [x] `npm run build` sin errores graves (2026-07-16)
- [ ] Tests E2E disponibles (`tests/e2e/`) — al menos smoke chromium
- [ ] `NEXT_PUBLIC_SITE_URL` en Vercel = dominio real (no `localhost`)
- [ ] `robots.txt` y `sitemap.xml` con URLs de producción
- [ ] Canonical / hreflang / OG correctos

## Bloque D — QA senior (matriz)

Seguir `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`:

- [ ] Smoke: Home ES/EN, servicios, WhatsApp, PDFs
- [ ] i18n: sin mezcla ES/EN en la misma página
- [ ] Responsive: 390, 430, 768, 1024, 1440
- [ ] A11y: foco visible, teclado, skip link
- [ ] Enlaces: WhatsApp, PDFs, redes, Google reseñas

## Bloque E — Llamada con la clienta (miércoles)

Preparar:

1. URL de preview (Vercel develop o staging).
2. Lista de cambios hechos vs pendientes (este README).
3. Capturas móvil de: header, 3 servicios corregidos, cuchilla sin foto, curso laminado.
4. Confirmar si el lote de fotos renombradas llegó o queda para después del go-live.

---

## SEO avanzado (fuera de scope inmediato)

La cliente aceptó que el SEO **por servicio concreto** (ranking «lifting cejas», «depilación», etc.) es **fase posterior**. No bloquear go-live por esto.

---

## Estado

- [ ] Bloque A completo
- [ ] Bloque C completo
- [ ] Bloque D smoke pasado
- [ ] Listo para llamada de cierre
- [ ] Dominio principal publicado (solo tras OK cliente + Jeffrey)
