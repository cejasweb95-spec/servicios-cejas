# SEO keyword map y briefs V1

Ultima actualizacion: 18/06/2026.

Objetivo: dejar un mapa SEO operativo para implementar y auditar copy sin inventar datos. Este documento complementa `seo-desde-inicio-estrategia.md` y `implementacion-fases/SEO-SENIOR-WORKFLOW-SERP-AUDITORIA.md`.

Reglas:

- No crear sedes en Espana o Suiza.
- No crear variantes `es-CO`, `es-ES` o `es-CH` en V1.
- No usar FAQ sensible sin confirmacion.
- No publicar fechas/cupos/requisitos no confirmados.
- Los PDFs apoyan el contenido, no lo reemplazan.

---

## Mapa por pagina prioritaria

| Pagina | URL ES | URL EN | Keyword primaria | Secundarias | Intencion | Schema | Enlaces clave |
|---|---|---|---|---|---|---|---|
| Home | `/es` | `/en` | Cejas Internacionales | micropigmentacion Cali, jornadas internacionales, formaciones micropigmentacion | Marca + confianza + entrada por mercado | Organization, BeautySalon, WebSite, WebPage | Servicios, Jornadas, Formaciones, Resultados, Contacto |
| Servicios indice | `/es/servicios` | `/en/services` | servicios de micropigmentacion | servicios de belleza por pais, precios micropigmentacion | Elegir mercado correcto | WebPage, BreadcrumbList | Colombia, Espana/Europa, Suiza |
| Servicios Colombia | `/es/servicios/colombia` | `/en/services/colombia` | micropigmentacion cejas Cali | microblading Cali, cejas y pestanas Cali, diseno de cejas Cali | Ver servicios, precios COP y contactar sede Cali | WebPage, BreadcrumbList | Servicio detalle, Descargas, Contacto |
| Servicios Espana/Europa | `/es/servicios/espana-europa` | `/en/services/spain-europe` | micropigmentacion cejas Madrid | microblading Madrid, micropigmentacion labios Madrid, micropigmentacion Valencia | Consultar jornadas por disponibilidad sin sede fija | WebPage, BreadcrumbList | Jornadas, Contacto, Servicios detalle |
| Servicios Suiza | `/es/servicios/suiza` | `/en/services/switzerland` | micropigmentacion cejas Ginebra | eyebrow micropigmentation Geneva, permanent makeup brows Switzerland, micropigmentation Geneve | Ver servicios CHF y consultar jornada Ginebra | WebPage, BreadcrumbList | Jornadas, Contacto, Servicios detalle |
| Servicio detalle | `/es/servicios/[mercado]/[servicio]` | `/en/services/[market]/[service]` | servicio + mercado | precio, duracion de cita, duracion de resultado, valoracion por foto | Comparar tecnica, precio y duracion antes de WhatsApp | WebPage, Service, BreadcrumbList | Mercado, servicios relacionados, Contacto |
| Formaciones | `/es/formaciones` | `/en/professional-training` | cursos de micropigmentacion | masterclass cejas, curso micropigmentacion Colombia, brow training | Ver cursos, duracion, PDF y consultar fechas | WebPage, BreadcrumbList | Curso detalle, PDFs, WhatsApp |
| Curso detalle | `/es/formaciones/[curso]` | `/en/professional-training/[course]` | curso + nombre | kit, certificado, temario, modalidad, precio | Evaluar formacion e iniciar consulta por WhatsApp | WebPage, Course, BreadcrumbList | Formaciones, PDF, Contacto |
| Jornadas | `/es/jornadas` | `/en/appointments-by-city` | jornadas micropigmentacion | Cali, Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto, Ginebra | Resolver ubicacion, sede vs jornadas, disponibilidad | Organization, BeautySalon, WebPage, BreadcrumbList | Servicios por mercado, Contacto |
| Resultados | `/es/resultados` | `/en/results` | resultados micropigmentacion | resultados cejas, resultados labios, cicatrizados | Prueba visual y confianza | WebPage, ImageObject, BreadcrumbList | Servicio detalle, Contacto |
| Sobre Xiomara | `/es/sobre-xiomara` | `/en/about-xiomara` | Xiomara Cejas Internacionales | especialista micropigmentacion, formadora internacional | Autoridad, trayectoria y confianza | WebPage, BreadcrumbList | Formaciones, Resultados, Contacto |
| Cuidados | `/es/cuidados` | `/en/aftercare` | cuidados micropigmentacion | antes micropigmentacion cejas, despues micropigmentacion labios | Contenido informativo y reduccion de dudas | WebPage, BreadcrumbList | Servicios, Contacto |
| Contacto | `/es/contacto` | `/en/contact` | contacto Cejas Internacionales | WhatsApp Colombia, WhatsApp Espana, sede Cali | Conversion directa a WhatsApp/email/redes | WebPage, BreadcrumbList | Servicios, Jornadas, Formaciones |

---

## Briefs por bloque

### Servicios por mercado

- H1: debe incluir mercado visible.
- Contenido obligatorio: moneda, disponibilidad, WhatsApp correcto, PDF del catalogo una sola vez, servicios filtrados.
- No publicar: servicios de Colombia en Espana/Suiza, sede fuera de Cali, pagos no confirmados fuera de Colombia.
- Oportunidad SERP: competir con directorios mostrando precio, duracion y CTA directo sin obligar a registrarse.

### Servicio detalle

- H1: `[Servicio] en [mercado]`.
- Contenido obligatorio: descripcion real de catalogo, precio, duracion de cita, duracion de resultado si existe, mercado, CTA WhatsApp contextual.
- Schema: `Service` solo con precio confirmado del mercado actual.
- Oportunidad SERP: atacar long-tail de tecnica + ciudad/mercado + precio/duracion.

### Formaciones

- H1: cursos/masterclass profesionales.
- Contenido obligatorio: duracion, modalidad, certificado, temario, incluye, PDF, CTA fechas/cupos por WhatsApp.
- No publicar: fechas/cupos/requisitos no confirmados, promesas de ingresos.
- Oportunidad SERP: las academias posicionadas muestran kit, certificado, precio, WhatsApp y temario; Cejas Internacionales debe mantener todo eso en HTML rastreable.

### Jornadas

- H1: sede Cali + proximas jornadas por ciudad.
- Contenido obligatorio: Cali como sede fisica; Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra como jornadas por disponibilidad.
- No usar: `Event` schema sin fecha real.
- Oportunidad SERP: diferenciarse por claridad internacional sin crear oficinas falsas.

### Resultados

- H1: resultados reales.
- Contenido obligatorio: mosaico visible, alt util, lightbox accesible.
- Schema: `ImageObject` solo para imagenes reales seleccionadas.
- Oportunidad SERP: reforzar confianza y conversion, no depender de carrusel oculto.

### Contacto/legal

- H1: contacto claro.
- Contenido obligatorio: WhatsApp Colombia, WhatsApp Espana/Europa/Suiza, email oficial, redes, NIT, direccion Cali.
- No usar: formulario de reserva, sede Espana/Suiza, checkout.
- Conversion: toda cita/reserva se confirma por WhatsApp.
