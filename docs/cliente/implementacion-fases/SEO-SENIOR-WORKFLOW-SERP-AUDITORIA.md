# SEO senior - SERP, keywords, auditoria y post-publicacion

Ultima actualizacion: 17/06/2026.

Objetivo: definir como se trabajara el SEO de Cejas Internacionales de forma senior: investigacion real de competencia en Google, keywords por mercado/idioma, briefs de pagina, implementacion SEO-safe, auditoria despues del build y seguimiento tras publicar.

---

## Principio

SEO no se hace solo al final.

Se trabaja en 4 momentos:

1. **Antes de escribir copy final:** investigar SERP, competencia, keywords e intencion.
2. **Durante la implementacion:** arquitectura, HTML, URLs, metadata, schema, enlaces internos y Core Web Vitals.
3. **Despues del build:** auditoria tecnica, Lighthouse, rich results, enlaces, sitemap, hreflang, indexabilidad.
4. **Despues de publicar:** Search Console, PageSpeed real, consultas reales, ajustes de copy y enlazado interno.

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `seo-serp-research`
- `seo`
- `seo-audit`
- `schema-structured-data`
- `core-web-vitals-performance`
- `cejas-i18n-localization`
- `copywriting`

Regla: cualquier investigacion SERP debe hacerse con resultados actuales. Las SERPs cambian, asi que no se asume que una investigacion antigua sigue siendo valida.

Fuente complementaria para GA4, cookies, consentimiento y SEO multi-pais: `docs/cliente/legal-privacidad-cookies-ga4.md`.

---

## Fase A - Investigacion SERP antes de cada bloque de copy

Antes de cerrar textos de una pagina importante, investigar:

- [ ] Google top 10 organico.
- [ ] Resultados locales/map pack si aparecen.
- [ ] Directorios/marketplaces.
- [ ] Clinicas/estudios/salones.
- [ ] Academias/formaciones.
- [ ] Blogs/guias informativas.
- [ ] Preguntas relacionadas.
- [ ] Titulos SEO usados.
- [ ] H1/H2/H3 usados.
- [ ] Secciones que aparecen repetidamente.
- [ ] Tratamiento de precios.
- [ ] Tratamiento de duraciones.
- [ ] CTAs usados.
- [ ] Schema visible o probable.
- [ ] Elementos de confianza.
- [ ] Gaps que podemos cubrir con datos confirmados.

No copiar textos. Se extrae estructura, intencion y vocabulario, no redaccion.

---

## Plantilla de analisis de competidor

Por cada resultado util:

```txt
Query:
Pais/ciudad:
Idioma:
URL:
Tipo: directorio | estudio | clinica | academia | blog | marketplace
Title:
Meta description:
H1:
H2 principales:
Intencion:
Servicios/curso que ataca:
Precio visible:
Duracion visible:
CTA:
Schema detectado:
Elementos de confianza:
Debilidades:
Oportunidad para Cejas Internacionales:
No copiar / riesgo:
```

---

## Fase B - Mapa inicial de keywords

Este mapa es punto de partida. Se valida con busquedas actuales antes de escribir copy final.

### Colombia / Cali

- `micropigmentacion cejas Cali`
- `microblading Cali`
- `micropigmentacion labios Cali`
- `cejas y pestanas Cali`
- `diseno de cejas Cali`
- `curso micropigmentacion cejas Cali`
- `curso micropigmentacion cejas Colombia`
- `masterclass cejas henna Colombia`
- `lifting de pestanas Cali`
- `laminado de cejas Cali`

### Espana / jornadas

- `micropigmentacion cejas Madrid`
- `microblading cejas Madrid`
- `micropigmentacion labios Madrid`
- `micropigmentacion cejas Valencia`
- `micropigmentacion cejas Palma de Mallorca`
- `micropigmentacion Puerto de Sagunto`
- `curso micropigmentacion cejas Espana`

### Suiza / Ginebra

- `micropigmentacion cejas Ginebra`
- `microblading Ginebra`
- `eyebrow micropigmentation Geneva`
- `permanent makeup brows Geneva`
- `micropigmentation sourcils Geneve`
- `maquillage permanent sourcils Geneve`

Nota: la web publica V1 es ES/EN. Las queries francesas de Ginebra sirven para entender competencia local, no para crear paginas en frances salvo decision futura.

### Ingles internacional

- `eyebrow micropigmentation`
- `powder brows`
- `PMU brows`
- `lip blush`
- `permanent makeup lips`
- `eyebrow micropigmentation training`
- `professional brow training`
- `brow lamination course`
- `lash lift course`

Regla: usar terminologia inglesa natural, no traduccion literal de "formaciones" como "formations".

---

## Fase C - Keyword map por pagina

Cada pagina importante debe tener:

- [ ] Keyword primaria.
- [ ] Keywords secundarias.
- [ ] Intencion de busqueda.
- [ ] Title SEO ES/EN.
- [ ] Meta description ES/EN.
- [ ] H1 ES/EN.
- [ ] H2/H3 recomendados.
- [ ] URL ES/EN.
- [ ] Enlaces internos entrantes.
- [ ] Enlaces internos salientes.
- [ ] Schema propuesto.
- [ ] Imagen principal y alt ES/EN.
- [ ] CTA principal.
- [ ] Restricciones de contenido.

Paginas prioritarias:

- [ ] Home.
- [ ] Servicios.
- [ ] Servicios Colombia.
- [ ] Servicios Espana/Europa.
- [ ] Servicios Suiza.
- [ ] Detalles de servicios principales.
- [ ] Formaciones.
- [ ] Detalles de cursos.
- [ ] Jornadas.
- [ ] Resultados.
- [ ] Sobre Xiomara.
- [ ] Cuidados.
- [ ] Contacto.

---

## Fase D - Brief SEO por pagina

Antes de implementar una pagina principal, crear o actualizar un brief con:

```txt
Pagina:
Locale:
Mercado:
Objetivo SEO:
Objetivo conversion:
Keyword primaria:
Keywords secundarias:
Intencion:
Competidores analizados:
Estructura H1/H2/H3:
Contenido obligatorio desde docs cliente:
Datos que NO se pueden inventar:
CTA:
Schema:
Internal links:
Assets/imagenes:
PDFs:
Notas i18n:
Notas performance:
Checklist final:
```

El brief puede vivir en datos SEO (`src/content/seo.ts`) y/o en un MD de trabajo si hace falta.

---

## Fase E - Implementacion SEO-safe

Durante la implementacion:

- [ ] HTML rastreable.
- [ ] Un H1 por pagina.
- [ ] Jerarquia H2/H3 logica.
- [ ] URLs localizadas `/es/...` y `/en/...`.
- [ ] Canonical por pagina.
- [ ] hreflang ES/EN reciproco.
- [ ] Metadata unica por pagina.
- [ ] Open Graph unico por pagina importante.
- [ ] Sitemap con rutas localizadas.
- [ ] Robots permite publico y bloquea futuro `/admin`.
- [ ] Schema solo con datos confirmados.
- [ ] Breadcrumbs en paginas internas.
- [ ] Alt text ES/EN.
- [ ] PDFs como apoyo, no sustituyen contenido HTML.
- [ ] Mapa con lista HTML accesible.
- [ ] Servicios y precios visibles en HTML.
- [ ] No esconder contenido critico en carousels, modales o JS client-only.

---

## Fase F - Auditoria SEO despues del build

Antes de decir "SEO listo":

- [ ] `npm run build`.
- [ ] Lighthouse Home ES.
- [ ] Lighthouse Home EN.
- [ ] Lighthouse Servicios Colombia.
- [ ] Lighthouse Servicios Espana/Europa.
- [ ] Lighthouse Servicios Suiza.
- [ ] Lighthouse Formaciones.
- [ ] Lighthouse Jornadas.
- [ ] Revisar titles duplicados.
- [ ] Revisar meta descriptions duplicadas.
- [ ] Revisar H1 duplicados/multiples.
- [ ] Revisar canonical.
- [ ] Revisar hreflang.
- [ ] Revisar sitemap.
- [ ] Revisar robots.
- [ ] Revisar schema con Rich Results Test / Schema Validator.
- [ ] Revisar enlaces internos.
- [ ] Revisar links PDF.
- [ ] Revisar 404.
- [ ] Revisar noindex accidental.
- [ ] Revisar Core Web Vitals.
- [ ] Revisar mobile 390/430.

---

## Fase G - Post-publicacion

Tareas manuales o con acceso del usuario:

- [ ] Verificar dominio en Google Search Console.
- [ ] Enviar sitemap.
- [ ] Solicitar indexacion de Home y paginas principales.
- [ ] Revisar cobertura/indexacion.
- [ ] Configurar GA4 con banner de cookies y Consent Mode.
- [ ] Configurar conversiones: WhatsApp Colombia, WhatsApp Espana, descargas PDF.
- [ ] Conectar GA4 con Search Console.
- [ ] Revisar PageSpeed Insights en URL real.
- [ ] Revisar queries reales tras indexacion.
- [ ] Ajustar titles/metas/copy segun datos reales.
- [ ] Revisar Bing Webmaster Tools si se quiere cobertura adicional.
- [ ] Usar Ahrefs Webmaster Tools o Screaming Frog si se desea auditoria externa gratuita.

---

## Entregables SEO

- [ ] Keyword map por pagina.
- [ ] Tabla de competidores/SERP investigados.
- [ ] Brief SEO por pagina prioritaria.
- [ ] Metadata ES/EN implementada.
- [ ] Schema JSON-LD implementado y validado.
- [ ] Sitemap/robots/hreflang/canonical implementados.
- [ ] Reporte de Lighthouse/PageSpeed.
- [ ] Reporte de enlaces rotos/PDFs.
- [ ] Checklist post-publicacion para Search Console/GA4.

---

## Criterio senior

SEO no es llenar la pagina de keywords. Para esta web, el criterio es:

- responder mejor que competidores usando datos reales;
- mostrar precio, duracion y mercado de forma clara;
- destacar sede Cali y jornadas sin inventar oficinas;
- convertir a WhatsApp;
- mantener contenido rastreable;
- cargar rapido en movil;
- usar schema solo con informacion confirmada;
- medir y mejorar tras publicar.
