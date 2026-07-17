# 11 — Validado sin cambios

## Propósito

Documentar lo que la cliente **revisó y aprobó** en la llamada del 12/07/2026 para que ningún agente lo «mejore» sin nuevo pedido explícito.

---

## Mapa «Dónde me encuentro»

> «¿Dónde me encuentro?… Es igual que la otra, sí.»

- **Acción:** ninguna.
- **Referencia:** `src/components/domain/event-map.tsx`, home `#jornadas`, `/jornadas`.

---

## Formaciones / cursos

> «A los cursos… la foto sí está correspondiendo.»

> Lifting de pestañas añadido — visto y OK (salvo laminado con foto cortada → [08](./08-curso-laminado-foto.md)).

- **Acción:** ninguna en listado de cursos; solo pulir curso laminado si aplica.

---

## Reseñas / opiniones

> «Estas calificaciones… la mayoría es de Cali porque la de [España] apenas se abrió.»

> Botón lleva a la reseña de Google correcta — explicado en llamada.

- **Acción:** ninguna en V1 (Opción A ya implementada).
- **Referencia:** `src/content/reviews.ts`, `src/components/domain/review-section.tsx`, home `#opiniones`.
- Cuando España tenga reseñas en GBP, copiarlas a `reviews.ts` con `profileId: "google-puerto-sagunto"`.

---

## SEO básico

> «¿Qué buscas en Google y me saliste? Buenísimo… me contenta con eso.»

- **Acción:** mantener; verificar `NEXT_PUBLIC_SITE_URL` antes de prod ([10](./10-qa-pre-publicacion-dominio.md)).
- SEO por servicio individual = backlog futuro.

---

## Valoración general

> «Por lo menos está la estructura y la base… lo más difícil ya está; después toque pulir y actualizar fotos.»

- **Acción:** no reestructurar la web; solo ejecutar MDs 01–09.

---

## Estado

- [x] Documentado como «no tocar» salvo nueva reunión
