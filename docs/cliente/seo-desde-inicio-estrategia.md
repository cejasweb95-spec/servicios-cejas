# SEO desde el inicio — estrategia, SERP research y tareas manuales

Última actualización: 17/06/2026.

Este documento mueve SEO a fase inicial. La estrategia SEO final seguirá refinándose antes de publicar, pero la arquitectura, UI, copy y performance deben nacer SEO-safe desde el primer commit de frontend.

---

## 1. Decisión

SEO no se deja para el final.

Desde la primera implementación:

- URLs limpias.
- Contenido principal renderizado en HTML.
- H1 único por página.
- Jerarquía H2/H3 correcta.
- Metadata preparada por ruta.
- `sitemap.ts`.
- `robots.ts`.
- Canonical URLs.
- `opengraph-image`.
- `twitter-image`.
- Iconos y manifest.
- Imágenes con alt text, dimensiones estables y formatos modernos.
- Core Web Vitals como requisito de diseño.
- Schema preparado desde datos confirmados.
- GA4 preparado con banner de cookies y Consent Mode; no cargar analitica antes del consentimiento.

---

## 2. Estrategia SERP antes de escribir copy final

Antes de cerrar textos SEO de cada página, ejecutar `seo-serp-research`.

Objetivo: analizar páginas que ya aparecen arriba y detectar qué estructura, intención y contenido espera Google.

### Queries iniciales

#### Colombia / Cali

- `micropigmentación cejas Cali`
- `microblading Cali`
- `micropigmentación labios Cali`
- `cejas y pestañas Cali`
- `curso micropigmentación cejas Colombia`
- `curso micropigmentación cejas Cali`

#### España / jornadas

- `micropigmentación cejas Madrid`
- `microblading cejas Madrid`
- `micropigmentación labios Madrid`
- `micropigmentación cejas Valencia`
- `curso micropigmentación cejas España`

#### Suiza / Ginebra

- `micropigmentación cejas Ginebra`
- `microblading Ginebra`
- `micropigmentation sourcils Genève`
- `maquillage permanent sourcils Genève`
- `micropigmentation eyebrows Geneva`
- `permanent makeup eyebrows Geneva`

#### Marca / intención directa

- `Cejas Internacionales`
- `Xiomy Sanchez cejas`
- `Xiomara Sánchez micropigmentación`

---

## 3. Primer snapshot de SERP investigado

Investigación inicial con búsquedas web del 17/06/2026.

### Patrones encontrados

| Tipo de resultado | Ejemplos | Qué aprenden |
|---|---|---|
| Marketplaces/directorios | AgendaPro, Fresha, Treatwell, Wallapop | Ganan por páginas locales, precio, duración, reseñas, disponibilidad. |
| Clínicas/centros locales | Clínica Reabel, MicroStetic, Biuti Cali | Ganan con páginas específicas, precio, duración, FAQ, higiene, cita. |
| Academias/cursos | Glamurosas, Inlash Academy, Phi Academy, Natural Fashion, Mar Díaz | Ganan con temario, modalidad, duración, kit, certificado, plazas/cupos, WhatsApp. |
| Blogs/guías | Rejuvelook precios | Ganan con guías informativas de precios y comparativas. |

### Observaciones útiles

- Los resultados fuertes muestran **precio y duración** pronto.
- Las páginas locales incluyen palabras de ciudad: Cali, Madrid, Las Rozas, etc.
- Las academias detallan **temario, días, kit, certificado, modelo real, acompañamiento**.
- Los marketplaces compiten por disponibilidad/reserva, pero nuestra web puede competir con marca, confianza, PDFs y WhatsApp directo.
- Las páginas de España suelen trabajar mucho `microblading`, `micropigmentación de cejas`, `precio`, `duración`, `retoque`.
- Las páginas de formación usan mucho `curso`, `masterclass`, `presencial`, `kit`, `certificado`, `modelo real`, `cupos`.

### Snapshot SERP actualizado 18/06/2026

Búsquedas revisadas: `micropigmentación cejas Cali precios duración`, `micropigmentación cejas Madrid precio duración`, `micropigmentación cejas Ginebra Geneva eyebrow micropigmentation` y `curso micropigmentación cejas Colombia presencial certificado kit`.

Hallazgos:

- Madrid tiene competidores y directorios fuertes que muestran precio y tiempo de forma muy visible. Ejemplos útiles: Clínica Reabel habla de 90-120 minutos y resultado de 9 meses a 2 años; MicroStetic muestra micropigmentación de cejas pelo a pelo a 290 EUR y duración 2-3 años; Treatwell lista servicios locales con precio desde y duración; Rejuvelook compite con guía de rangos de precios.
- Colombia/Cali muestra oportunidades en cursos y contenido educativo. Inlash Academy, Glamurosas y Politel destacan kit, certificado, WhatsApp, precio y temario. Esto confirma que las páginas de formaciones de Cejas Internacionales deben mantener PDF descargable, temario HTML, duración, certificado, kit/modalidad y CTA a WhatsApp.
- Ginebra/Geneva devuelve resultados menos directos y más mezclados con Instagram, páginas no locales o términos en inglés/francés. Oportunidad: crear una página Suiza/Ginebra clara, con precios CHF, términos `Ginebra`, `Geneva` y `Switzerland`, y aclaración de jornadas por disponibilidad sin inventar sede.
- Los marketplaces ganan por disponibilidad, ratings y filtros; Cejas Internacionales no debe competir copiando esa estructura, sino con datos confirmados: precios COP/EUR/CHF, duraciones de cita, duraciones de resultado cuando existan, sede Cali, jornadas, PDFs y WhatsApp directo.

URLs útiles detectadas:

- https://www.clinicareabel.com/tratamiento-estetica-microblading-cejas/
- https://microstetic.es/micropigmentacion-precios-madrid/
- https://www.treatwell.es/establecimientos/tratamiento-microblading/oferta-tipo-local/en-madrid-es/
- https://rejuvelook.com/blog/precios-micropigmentacion-cejas/
- https://inlashacademy.com/curso-micropigmentacion-de-cejas-presencial/
- https://glamurosasesteticafacial.com/cali/curso-micropigmentacion-cejas-y-labios/
- https://politel.edu.co/micropigmentacion-de-labios-y-cejas/

---

## 4. Estrategia contra competidores

No vamos a copiar textos. Vamos a superar la estructura con datos reales.

### Ventajas propias de Cejas Internacionales

- Catálogos reales por mercado.
- Precios COP/EUR/CHF confirmados.
- Duraciones de cita confirmadas.
- PDFs descargables.
- Sede física real en Cali.
- Jornadas internacionales por disponibilidad.
- Fotos/resultados reales.
- Formaciones con temario y duración desde PDFs.
- WhatsApp Colombia y España.
- Valoración gratuita por foto.

### Cómo convertir eso en SEO

| Página | Estrategia |
|---|---|
| Home | Marca + micropigmentación + sede Cali + jornadas internacionales. |
| `/servicios/colombia` | Página local para servicios en Cali/Colombia con precios COP y sede. |
| `/servicios/espana-europa` | Jornada/servicios en España sin inventar sede. |
| `/servicios/suiza` | Servicios CHF y Ginebra por disponibilidad. |
| Servicio detalle | Precio, duración, resultado, descripción real, cuidados relacionados, CTA. |
| `/formaciones` | Cursos/masterclass con PDFs, duración, certificado, kit/modalidad. |
| Curso detalle | Temario completo, estructura por días, PDF, WhatsApp, futuras fechas. |
| `/jornadas` | Cali sede + ciudades de jornadas; mapa + lista accesible. |
| `/cuidados` | Contenido informativo, útil y rastreable. |

---

## 5. Herramientas SEO

### Gratuitas o con plan útil gratis

| Herramienta | Uso |
|---|---|
| Google Search Console | Indexación, sitemaps, consultas reales, errores, rendimiento. |
| Google Analytics 4 | Medición de tráfico y conversiones solo con consentimiento/cookies. |
| PageSpeed Insights | Core Web Vitals y Lighthouse público. |
| Lighthouse local | Auditoría durante desarrollo. |
| Rich Results Test | Validación de schema. |
| Schema.org Validator | Validación JSON-LD. |
| Ahrefs Webmaster Tools | Auditoría/site explorer gratis al verificar propiedad. |
| Ahrefs Free Tools | Keyword generator y checks puntuales. |
| Screaming Frog SEO Spider | Crawl gratis hasta 500 URLs. |
| Semrush Free Keyword Tool | Ideas limitadas de keywords e intención. |

### DinoRANK / Semrush

- **DinoRANK**: suite SEO de pago; útil si se compra, pero no es una skill ni repo gratuito estable.
- **Semrush**: tiene herramientas/free trial/uso limitado; útil para investigación, no debe ser dependencia del proyecto.
- Recomendación: usar herramientas gratuitas primero. Si el cliente invierte, Semrush/Ahrefs/DinoRANK pueden complementar con tracking de keywords.

---

## 6. Qué debe hacer el usuario manualmente

Cuando la web esté en producción:

1. Crear/verificar propiedad en **Google Search Console**.
2. Enviar `https://dominio.com/sitemap.xml`.
3. Revisar que `robots.txt` permite indexar páginas públicas.
4. Solicitar indexación de Home y páginas principales.
5. Crear **Google Analytics 4** para medir tráfico/conversiones.
6. Crear eventos de conversión:
   - Click WhatsApp Colombia.
   - Click WhatsApp España.
   - Descarga catálogo Colombia.
   - Descarga catálogo España.
   - Descarga catálogo Suiza.
   - Descarga PDF curso.
7. Configurar banner de cookies + Consent Mode antes de activar GA4 en producción.
8. Conectar Search Console con GA4.
9. Crear/verificar **Bing Webmaster Tools** si se quiere cobertura adicional.
10. Crear Ahrefs Webmaster Tools gratis si se quiere auditoría externa gratuita.
11. Pasar Screaming Frog gratis después de publicar para detectar enlaces rotos/metas.

### SEO multi-pais

- Colombia se trabaja como sede real: Cali, direccion, COP, WhatsApp Colombia y schema local solo para Cali.
- Espana se trabaja como jornadas por disponibilidad: Madrid, Palma de Mallorca y Puerto de Sagunto - Valencia, sin oficina fija.
- Suiza se trabaja como Ginebra por disponibilidad y precios CHF, sin oficina fija.
- Las paginas de mercado no son duplicados: cada una tendra contenido, moneda, CTA y contexto propio.
- `hreflang` conecta ES/EN de la misma pagina. No crear `es-CO`, `es-ES` o `es-CH` hasta tener variantes regionales reales.
- Para Ginebra conviene incluir terminos "Geneva" y "Geneve" en contexto natural. Una version francesa futura podria mejorar SEO en Suiza, pero V1 queda ES/EN.

### Qué puedo hacer yo si me das acceso

Con acceso a cuentas/claves o MCP correspondiente puedo ayudar a:

- Revisar Search Console.
- Revisar GA4.
- Comprobar sitemap.
- Revisar PageSpeed.
- Revisar errores de cobertura/indexación.
- Preparar eventos recomendados.

Sin acceso, puedo dejar todo el código preparado, pero la verificación de propiedad de Google normalmente la tiene que hacer el dueño del dominio/hosting.

---

## 7. SEO-safe en UI

El diseño debe respetar:

- No poner textos importantes solo dentro de imágenes.
- No ocultar servicios detrás de carousels.
- No depender de JS para que exista contenido principal.
- No meter todo en modales.
- Los PDFs son apoyo, no sustituyen contenido HTML.
- El mapa debe tener lista HTML de ubicaciones.
- Las galerías deben tener alt text y captions útiles.

---

## 8. Schema inicial recomendado

| Página | Schema |
|---|---|
| Home | `Organization`, `WebSite`, `WebPage` |
| Contacto / Cali | `LocalBusiness` o `BeautySalon` solo con dirección de Cali |
| Servicios | `Service`, `BreadcrumbList` |
| Servicio detalle | `Service`, `BreadcrumbList`, `ImageObject` si aplica |
| Formaciones | `Course`, `BreadcrumbList` |
| Curso detalle | `Course`, `BreadcrumbList` |
| FAQ | `FAQPage` solo si se publica FAQ confirmado |
| Resultados | `ImageObject` solo en imágenes seleccionadas |

---

## 9. Integración con skills

Para SEO desde el inicio usar:

1. `cejas-internacionales-guardrails`
2. `seo-serp-research`
3. `schema-structured-data`
4. `core-web-vitals-performance`
5. `next-best-practices`
6. `seo`
7. `seo-audit`

---

## 10. Fuentes consultadas

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google multi-regional/multilingual sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google localized versions / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Consent Mode: https://developers.google.com/tag-platform/security/guides/consent
- PageSpeed Insights: https://pagespeed.web.dev/
- Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Ahrefs Webmaster Tools: https://ahrefs.com/webmaster-tools
- Ahrefs Free SEO Tools: https://ahrefs.com/free-seo-tools
- Semrush pricing/free trial: https://www.semrush.com/pricing/seo-ai-search/
- Semrush Free Keyword Tool: https://www.semrush.com/analytics/keywordmagic/
- DinoRANK: https://dinorank.com/
- Screaming Frog SEO Spider: https://www.screamingfrog.co.uk/seo-spider/
- AgendaPro micropigmentación Cali: https://agendapro.com/mp/co/micropigmentacion-cali
- Fresha microblading Cali: https://www.fresha.com/lp/es/tt/microblading/co-cali
- Treatwell microblading Madrid: https://www.treatwell.es/establecimientos/tratamiento-microblading/oferta-tipo-local/en-madrid-es/
- Clínica Reabel microblading Madrid: https://www.clinicareabel.com/tratamiento-estetica-microblading-cejas/
- MicroStetic precios Madrid: https://microstetic.es/micropigmentacion-precios-madrid/
- Glamurosas curso Cali: https://glamurosasesteticafacial.com/cali/curso-micropigmentacion-cejas-y-labios/
- Inlash Academy curso micropigmentación: https://inlashacademy.com/curso-micropigmentacion-de-cejas-presencial/
- Phi Academy cursos: https://www.phi-academy.com/es-es/cursos
- Natural Fashion curso micropigmentación: https://www.naturalfashion.com.co/adwords/ads-curso-micropigmentacion.html
