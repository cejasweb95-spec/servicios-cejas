# Checklist SEO local y orgánico

## Google Business Profile

- [ ] Cali: ficha verificada y completa
- [ ] Sagunto: verificación completada
- [ ] NAP idéntico en GBP, web, Instagram, Facebook (por país)
- [ ] Fotos: interior + fachada Sagunto
- [ ] Reseñas por sede (ES → ficha Sagunto)
- [ ] Publicaciones GBP Sagunto (inauguración, servicios)

## Web — orgánico

- [ ] `NEXT_PUBLIC_SITE_URL` = dominio producción (OG absolutas)
- [ ] Favicon / icon / apple-icon desde logo oficial
- [ ] OG 1200×630 con logo visible
- [ ] Canonical + hreflang en todas las rutas públicas
- [ ] Sitemap y robots OK
- [ ] Un H1 por página
- [ ] Pendiente: copy Sagunto sede fija (hoy «jornada» en `locations.ts`)

## Schema

- [ ] BeautySalon / Organization: solo Cali confirmado
- [ ] Segunda sede en schema solo cuando legal + GBP estén alineados

## Tests

```bash
npm run test:seo
npm run test:seo:all
npm run build
```

## Herramientas externas

- Google Search Console (propiedad dominio)
- Facebook Sharing Debugger (cache OG)
- PageSpeed / Lighthouse (post-deploy)
