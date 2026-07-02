# SEO local y orgánico — Cejas Internacionales

Carpeta de trabajo para SEO **local** (Google Business Profile, Maps, NAP) y **orgánico** (web, metadata, schema, contenido). No sustituye los MDs maestros en `docs/cliente/seo-desde-inicio-estrategia.md` ni `implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`.

## Estado del repo (web)

| Área | Sede legal / schema | Operativa España |
|------|---------------------|------------------|
| Aviso legal, NIT, footer | Cali, Colombia | — |
| Google Business Profile | Ficha Cali (principal) | Ficha Puerto de Sagunto (nueva) |
| Web `locations.ts` | `physical_studio` Cali | Sagunto aún `journey_availability` — **pendiente alinear** cuando se confirme copy |

## Documentos en esta carpeta

| Archivo | Contenido |
|---------|-----------|
| [GOOGLE-MAPS-PUERTO-SAGUNTO.md](./GOOGLE-MAPS-PUERTO-SAGUNTO.md) | Proceso GBP Sagunto, datos NAP, verificación, convivencia con Oscar Nails |
| [IMAGENES-MARCA-COMPARTIR.md](./IMAGENES-MARCA-COMPARTIR.md) | Favicon, PWA, Open Graph, WhatsApp, redes — mapa de archivos |
| [CHECKLIST-SEO-LOCAL.md](./CHECKLIST-SEO-LOCAL.md) | Checklist operativo local + orgánico |

## Comandos útiles

```bash
npm run generate:brand-icons   # Regenerar favicon / PWA desde logo oficial
npm run test:seo               # Playwright SEO (metadata, OG, icons)
npm run test:seo:all           # Auditoría SEO ampliada
```

## Próximos trabajos sugeridos

1. Alinear web: Puerto de Sagunto como sede física España (copy ES/EN, mapa, legal informativo).
2. Reseñas GBP en ficha Sagunto (no mezclar con Cali).
3. LocalBusiness / segunda sede en schema solo con datos confirmados.
4. SERP keywords locales Valencia / Puerto de Sagunto (`seo-serp-research` skill).

## Referencias

- `docs/cliente/contacto-datos-legales.md` — NIT, WhatsApp, emails
- `docs/cliente/seo-desde-inicio-estrategia.md` — estrategia global
- `AGENTS.md` — reglas sede legal solo Cali (hasta cambio explícito en legales)
