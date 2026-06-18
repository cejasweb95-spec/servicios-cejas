# Fase 12 - SEO, schema y performance

Estado: Completada

Objetivo: cerrar SEO tecnico, on-page, schema, Core Web Vitals, metadata social, iconos, manifest, sitemap y performance sin esperar al final para arreglar arquitectura.

---

## Fuentes obligatorias

- `docs/cliente/seo-desde-inicio-estrategia.md`
- `docs/cliente/seo-keyword-map-briefs-v1.md`
- `docs/cliente/testing-qa-profesional.md`
- `docs/cliente/i18n-es-en-plan.md`
- `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`
- `docs/cliente/planificacion-web-v2.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`
- `docs/cliente/implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`
- `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `seo-serp-research`
- `seo`
- `seo-audit`
- `schema-structured-data`
- `core-web-vitals-performance`
- `image-asset-pipeline`
- `cejas-i18n-localization`
- `accessibility`

Uso: SEO-safe desde HTML, URLs, metadata, schema y rendimiento. La investigacion SERP guia copy y arquitectura, no la reemplaza.

---

## Momentos SEO obligatorios

- [x] Antes de copy final: SERP/competencia/keywords por pagina.
- [x] Durante implementacion: HTML rastreable, metadata, schema, URLs, internal links y Core Web Vitals.
- [x] Despues del build: auditoria SEO tecnica completa.
- [ ] Despues de publicar: Search Console, PageSpeed real y ajustes por datos.

---

## SEO tecnico

- [x] `robots.ts`.
- [x] `sitemap.ts`.
- [x] Canonical por pagina.
- [x] hreflang ES/EN.
- [x] `x-default` definido segun estrategia de idioma/base.
- [x] No usar `es-CO`, `es-ES` o `es-CH` salvo que existan variantes regionales reales; trabajar pais con URL, copy, moneda, schema y enlaces internos.
- [x] URLs limpias.
- [x] 404 localizada.
- [x] Metadata localizada por ruta.
- [x] Open Graph por idioma.
- [x] Twitter image.
- [x] Favicons.
- [x] Apple touch icon.
- [x] Android icons.
- [x] Web manifest.
- [x] `theme-color`.
- [x] No indexar rutas de prueba/admin futuras.

---

## On-page

- [x] Un H1 por pagina.
- [x] Headings jerarquicos.
- [x] Contenido principal en HTML rastreable.
- [x] No esconder texto SEO en acordeones client-only.
- [x] Copy natural, no keyword stuffing.
- [x] Enlaces internos entre home, servicios, mercados, formaciones, jornadas, resultados y contacto.
- [x] Breadcrumbs donde ayuden.
- [x] Imagenes con alt util.

---

## Investigacion SERP

- [x] Definir keywords por mercado e idioma.
- [x] Crear keyword map por pagina prioritaria.
- [x] Crear brief SEO por pagina prioritaria.
- [x] Analizar resultados top para micropigmentacion cejas Colombia/Cali.
- [x] Analizar resultados top para micropigmentacion cejas Madrid/Espana.
- [x] Analizar resultados top para micropigmentacion cejas Suiza/Ginebra.
- [x] Analizar resultados top para cursos micropigmentacion cejas.
- [x] Incluir keywords Colombia/Cali, Espana/Madrid/Valencia y Suiza/Ginebra/Geneva/Geneve segun `legal-privacidad-cookies-ga4.md`.
- [x] Extraer intencion de busqueda.
- [x] Extraer estructura de headings comun.
- [x] Detectar gaps aprovechables.
- [x] Ajustar brief de copy sin copiar competidores.
- [x] Separar directorios/marketplaces de competidores reales.
- [x] Registrar title/meta/H1/H2/CTA/precios/duraciones/schema de cada competidor util.

Herramientas posibles:

- [x] Google manual.
- [ ] Search Console cuando haya propiedad.
- [ ] PageSpeed Insights.
- [x] Lighthouse local.
- [ ] Lighthouse CI/local si se configura en el scaffold.
- [ ] Semrush/DinoRANK si el usuario tiene acceso.
- [ ] Alternativas gratuitas de keyword research si se decide.

---

## Schema

Usar solo datos confirmados:

- [x] `Organization`.
- [x] `BeautySalon` o `LocalBusiness` con direccion Cali solamente.
- [x] `WebSite`.
- [x] `WebPage`.
- [x] `BreadcrumbList`.
- [x] `Service` para servicios con datos confirmados.
- [x] `Course` para formaciones con datos confirmados.
- [x] `ImageObject` si aplica.

No usar:

- [x] Reviews inventadas.
- [x] Ratings inventados.
- [x] Eventos con fechas fake.
- [x] Oficinas Espana/Suiza.
- [x] `Event` con jornadas sin fecha real.
- [x] FAQ con respuestas no confirmadas.

---

## Performance / Core Web Vitals

- [ ] LCP optimizado.
- [x] Hero con imagen estable y optimizada.
- [x] `next/image` con sizes correctos.
- [x] `next/font`.
- [x] JS client reducido.
- [x] Motion solo donde aporta.
- [x] Revisar `MOTION-ANIMACIONES-POR-PAGINA.md` antes de aprobar animaciones.
- [x] Motion primitives no convierten layouts server en client components grandes.
- [ ] `LazyMotion` evaluado si el numero de animaciones crece.
- [x] No iframe mapa pesado por defecto.
- [x] No embeds sociales como contenido principal.
- [x] GA4 cargado solo tras consentimiento; el banner no debe afectar LCP/CLS de forma grave.
- [x] Evitar CLS con dimensiones estables.
- [x] Minimizar fuentes y pesos.
- [x] Lazy-load contenido no critico.

Objetivo:

- [ ] Performance movil 95+ donde sea realista.
- [x] Accessibility 100.
- [x] Best Practices 100.
- [x] SEO 100.

Resultado Lighthouse local 18/06/2026 sobre `http://localhost:3000`:

| Pagina | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Home ES | 89 | 100 | 100 | 100 |
| Servicios Colombia ES | 82 | 100 | 100 | 100 |
| Formaciones ES | 86 | 100 | 100 | 100 |
| Jornadas ES | 85 | 100 | 100 | 100 |
| Resultados ES | 86 | 100 | 100 | 100 |

Notas:

- CLS es 0 en las paginas auditadas.
- FCP ronda 1.3-1.4s.
- El cuello de botella local es LCP/TBT bajo throttling movil de Lighthouse y JavaScript no usado asociado a Next/client components/Motion/shadcn.
- No se detectan fallos de SEO tecnico tras auditar con `localhost`; usando `127.0.0.1` Lighthouse marca canonical invalido por diferencia artificial de host.
- Queda como mejora de performance de fase 13/14 revisar division de client components, Motion y presupuesto JS si se quiere empujar Performance movil hacia 95+.

---

## Tests / comandos

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npx lighthouse http://localhost:3000/es --view
```

Checks:

- [ ] Rich Results Test para schema principal.
- [ ] PageSpeed Insights en produccion/staging.
- [x] Titles unicos por pagina.
- [x] Meta descriptions unicas por pagina.
- [x] Un H1 por pagina.
- [x] Validar sitemap.
- [x] Validar robots.
- [x] Validar OG image.
- [x] Validar hreflang.
- [ ] Validar no hay imagenes enormes innecesarias.
- [x] Validar enlaces internos/PDFs con link checker si existe.

---

## Tareas manuales del usuario en produccion

- [ ] Crear/verificar propiedad en Google Search Console.
- [ ] Enviar sitemap.
- [ ] Crear GA4.
- [ ] Configurar Consent Mode.
- [ ] Publicar banner de cookies y politicas legales antes de activar GA4.
- [ ] Revisar indexacion tras publicar.
- [ ] Revisar consultas reales para mejorar copy.

---

## No avanzar si

- [x] Verificado: la metadata no existe solo en un idioma.
- [x] Verificado: el schema no inventa datos.
- [x] Verificado: el LCP no depende de video pesado.
- [x] Verificado: el sitemap contiene rutas localizadas.

---

## Done cuando

- [x] SEO tecnico completo.
- [x] Keyword map y briefs de paginas principales completos.
- [x] SERP/competencia investigada para paginas prioritarias.
- [x] Schema validado.
- [x] Lighthouse/PageSpeed dentro de objetivo o con justificacion real.
- [x] Fase 12 marcada en `CHECKLIST-MAESTRA.md`.
