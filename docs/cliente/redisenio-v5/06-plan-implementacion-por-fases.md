# Rediseño V5 — Plan de implementación por fases

## Cómo usar este plan

Hoja de ruta accionable. El **qué** y el **copy** están en los documentos de especificación
([00](00-auditoria-direccion-visual-y-motion.md), [01](01-home-y-navegacion.md),
[02](02-paginas-interiores-por-ruta.md), [03](03-reglas-implementacion-responsive-y-skills.md),
[04](04-servicios-detalle.md)); la **evidencia** está en [05](05-qa-y-hallazgos-video.md).
Aquí está el **orden de ejecución**. Un commit verificable por fase, en `develop`.

## Principios

- Evolucionar la base actual (Next.js, datos tipados, i18n, WhatsApp, mapa accesible), **no** rehacerla.
- Datos desde la capa tipada; cero hardcode en componentes visuales.
- Bilingüe ES/EN en el mismo cambio. Foto real antes que icono. Sin disponibilidad en la web.
- No empezar por animaciones/colores: primero jerarquía, copy y fotos correctas.

## Bloqueantes de cliente (resolver antes de las fases que los usan)

| # | Bloqueante | Bloquea |
|---|---|---|
| B1 | Foto de **apertura** del hero (la "de más abajo") | Fase 2 (hero) |
| B2 | Foto/dirección/comentarios y autorización del **punto físico España** | Fase 4 (España) |
| B3 | Archivo exacto de la **foto de cursos** y de los **recortes** señalados | Fases 2/5 |
| B4 | Lista final de **pines del mapa** y etiqueta de cada uno (¿Mallorca sustituye o suma?) | Fase 3 |
| B5 | Nombre público exacto: `Xiomara Sánchez` vs `Xiomy Sanchez` (logo) | Fases 1/2 |
| B6 | EN profesional del H1 (propuesta: *Advanced Micropigmentation, Professional Training & International Sessions* — pendiente de aprobar) | Fase 1 |

> Las fases sin bloqueante pueden empezar ya (Fase 0 y gran parte de la 1).

---

## Fase 0 — Config crítica (SEO en producción) · **sin bloqueantes**

- [ ] Definir `NEXT_PUBLIC_SITE_URL` en Vercel (prod + preview) y redeploy. Verificar `robots.txt` y `sitemap.xml` con dominio real.
- [ ] (Opcional) Fallback en [site.ts](../../../src/config/site.ts) a `VERCEL_PROJECT_PRODUCTION_URL`/`VERCEL_URL` antes de `localhost`; documentar en `.env.example`.
- **Aceptación:** canonical, hreflang, OG y las 304 URLs del sitemap apuntan a `https://servicios-cejas.vercel.app`. Validar sitemap en Search Console.

## Fase 1 — Contenido, copy y assets · *(B5, B6 para textos finales)*

- [ ] Cargar **H1 confirmado** ES en la home y su EN aprobado. Ref [01](01-home-y-navegacion.md) §1.
- [ ] Aplicar la **cadena canónica** del intro de Servicios (ya unificada en 01/02/04).
- [ ] Reescribir copy de mercados para **quitar "jornadas/disponibilidad"**. Ref [04](04-servicios-detalle.md) §1.3.
- [ ] Asignar destino a cada asset según el **inventario de fotos** ([05](05-qa-y-hallazgos-video.md)); marcar los bloqueados.
- [ ] Resolver fuente única de la **dirección** (site.ts vs perfil legal).
- **Aceptación:** sin texto de disponibilidad en mercados; H1 e intro en ES/EN; cada foto con destino o marcada como pendiente.

## Fase 2 — Header, navegación y home (reorden) · *(B1, B3)*

- [ ] Header: logo más presente; menú **7 → 5** enlaces (resto a footer). Ref [01](01-home-y-navegacion.md) §nav.
- [ ] Reordenar home: **apertura (identidad+retrato+bio) → mapa → servicios por país → puntos físicos → formaciones → resultados → valoración/CTA**.
- [ ] **Eliminar la miniatura con sombra** del hero ([page.tsx:192-201](../../../src/app/[locale]/page.tsx#L192)).
- [ ] Sustituir los **chips de 3 servicios** por muestra editorial.
- **Aceptación:** orden nuevo; sin miniatura superpuesta; una sola receta de sección rota en bloques con misión distinta; responsive 390–1920 sin scroll horizontal.

## Fase 3 — "Dónde me encuentras" (mapa) · *(B4)*

- [ ] Renombrar a `Dónde me encuentras` / `Where to find me` (conservar ruta; SEO con 301 si migra).
- [ ] Pines de ubicación (no numéricos); detalle (ciudad/país) al pulsar, junto al mapa.
- [ ] Quitar fechas/cupos/disponibilidad. Accesible por teclado + lista alternativa.
- **Aceptación:** selección por ratón/teclado/tap refleja el mismo estado; sin scroll horizontal; sin disponibilidad.

## Fase 4 — Servicios por país + Puntos físicos · *(B2 para España)*

- [ ] Índice `Servicios por país` + plantilla de mercado + detalle, con el **catálogo real** (49/22/14). Ref [04](04-servicios-detalle.md).
- [ ] **Puntos físicos:** Colombia (foto del estudio + dirección + comentarios). Layout listo para 2ª ficha (España) sin rediseño.
- [ ] Auditoría **foto→servicio**: ninguna foto de retrato/tablet representando un servicio concreto.
- **Aceptación:** filtrado por mercado correcto; precios desde el dato; España no se publica hasta B2.

## Fase 5 — Formaciones + Resultados · *(B3)*

- [ ] Formaciones tras puntos físicos, con la foto indicada; listado escalonado, no 5 cards clonadas. Ref [02](02-paginas-interiores-por-ruta.md) §7.
- [ ] Resultados: galería asimétrica; quitar/recortar la imagen con "manchita"; alt específico por tratamiento.
- **Aceptación:** sin promesas/badges inventados; lightbox accesible; fotos correctas.

## Fase 6 — Color (rosa) y movimiento

- [ ] Pase de palo de rosa: bandas, reglas, pines, estados activos, CTA (sin teñir textos ni bajar contraste). Ref [00](00-auditoria-direccion-visual-y-motion.md).
- [ ] Movimiento sobrio con `motion/react` + `prefers-reduced-motion`; nada de Animate.css.
- **Aceptación:** la página deja de sentirse "blanca y plana" manteniendo WCAG AA; sin animaciones automáticas infinitas.

## Fase 7 — SEO, A11y, responsive y QA (gate de release)

- [ ] `lint`, `typecheck`, build y pruebas en verde.
- [ ] Responsive 390/430/768/1024/1440/1920 (`scrollWidth === clientWidth`).
- [ ] A11y: foco visible, orden de encabezados, contraste, nombres accesibles, reduced motion.
- [ ] SEO: títulos, metadescripciones, canonical, sitemap, hreflang, JSON-LD, enlaces internos (post-Fase 0).
- [ ] E2E: idioma, WhatsApp, mercado, mapa, PDFs, menú móvil, lightbox. Ref [03](03-reglas-implementacion-responsive-y-skills.md) y QA-SENIOR.
- **Aceptación:** criterios de [03](03-reglas-implementacion-responsive-y-skills.md) cumplidos; Lighthouse móvil objetivo.

---

## Orden de commits sugerido

1. `fix(seo): NEXT_PUBLIC_SITE_URL en producción` (Fase 0).
2. `content: H1, intro canónico y copy sin disponibilidad` (Fase 1).
3. `feat(home): reorden, header 5 enlaces, quitar miniatura` (Fase 2).
4. `feat(map): Dónde me encuentras` (Fase 3).
5. `feat(servicios): catálogo por país + puntos físicos` (Fase 4).
6. `feat(formaciones+resultados)` (Fase 5).
7. `style(color+motion)` (Fase 6).
8. `chore(qa): a11y/seo/responsive gate` (Fase 7).

> No iniciar Fase 2 hasta cerrar B1/B5; el resto de bloqueantes solo frena su fase concreta. Fases 0 y 1 pueden arrancar de inmediato.
