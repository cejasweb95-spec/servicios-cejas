# Legal, privacidad, cookies y GA4

Ultima actualizacion: 17/06/2026.

Objetivo: definir como se implementaran las paginas legales, privacidad, cookies, consentimiento y analitica para Cejas Internacionales sin mezclar sedes ni inventar datos.

> Nota importante: este documento es una guia tecnica y de contenido para implementar la web. No sustituye una revision juridica profesional. Antes de publicar textos legales definitivos, conviene que la clienta o su asesor legal revise el contenido final.

---

## 1. Decision cerrada

- Se usara **Google Analytics 4** para medir trafico y conversiones.
- GA4 se cargara solo con consentimiento valido mediante **banner de cookies + Consent Mode**.
- Visual regression empieza **local**, no en CI. CI queda como mejora futura cuando el diseno y el repositorio esten estables.
- Las paginas legales son obligatorias en V1 porque habra GA4/cookies y usuarios de Colombia, Espana/UE y Suiza.
- La titular/responsable visible de la web es la persona/datos de Colombia ya confirmados.
- La direccion legal/fisica publicada es solo Cali, Colombia.
- No se publican oficinas en Espana ni Suiza.

---

## 2. Marco de cumplimiento a considerar

La web tiene titular en Colombia y se dirige tambien a personas en Espana/UE y Suiza. Por eso la politica debe cubrir, como minimo:

| Zona | Por que importa | Enfoque web |
|---|---|---|
| Colombia | Titular/datos fiscales y sede fisica estan en Colombia | Incluir politica de tratamiento de datos personales y derechos de habeas data |
| Espana/UE | La web capta usuarias de Espana y usa GA4/cookies | Banner de consentimiento, politica de privacidad/cookies y derechos RGPD |
| Suiza | Hay jornadas y precios CHF para Ginebra | Transparencia sobre tratamiento de datos para usuarias de Suiza |

Fuentes oficiales usadas como referencia:

- Colombia - Ley 1581 de 2012: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981
- Colombia - Decreto 1377 de 2013: https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646
- SIC - Politica de tratamiento basada en Ley 1581: https://sedeelectronica.sic.gov.co/politica-de-tratamiento-de-datos-personales
- Espana - LSSI Ley 34/2002: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- Espana - LOPDGDD Ley Organica 3/2018: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- AEPD - Guia de cookies: https://www.aepd.es/guias/guia-cookies.pdf
- AEPD - Cookies analiticas: https://www.aepd.es/guias/guia-cookies-analiticas-externas.pdf
- Google Consent Mode: https://developers.google.com/tag-platform/security/guides/consent
- Google Analytics cookies: https://support.google.com/analytics/answer/11397207
- Suiza - Federal Act on Data Protection: https://www.fedlex.admin.ch/eli/cc/2022/491/en

---

## 3. Paginas legales publicas

### 3.1 Aviso legal

Rutas:

- `/es/aviso-legal`
- `/en/legal-notice`

Contenido minimo:

- Titular: Xiomara Andrea Sanchez Norena.
- Marca comercial: Cejas Internacionales.
- NIT: `1.144.186.472-5`.
- Direccion: Calle 9 # 32 A 16, local 118, barrio El Templete, Cali, Valle del Cauca, Colombia.
- Email: `contacto@cejasinternacionales.com`.
- WhatsApp Colombia y WhatsApp Espana/Europa/Suiza.
- Finalidad del sitio: web informativa de servicios, jornadas, formaciones y contacto por WhatsApp.
- Aclaracion: no hay tienda online, checkout, carrito ni reserva propia.
- Aclaracion: Espana y Suiza son jornadas por disponibilidad, no sedes fisicas.
- Propiedad intelectual: marca, textos, imagenes, logos, PDFs y contenidos.
- Enlaces externos: WhatsApp, Instagram, Facebook, TikTok, Google/Maps si se usa.
- Limitacion razonable: la informacion puede actualizarse y las reservas/precios/disponibilidad se confirman por WhatsApp.

No incluir:

- Sede en Espana o Suiza.
- Empresa espanola si no existe.
- Representante legal adicional no confirmado.
- Condiciones de compra, devoluciones o checkout, porque no hay ecommerce.

### 3.2 Politica de privacidad / tratamiento de datos

Rutas:

- `/es/privacidad`
- `/en/privacy`

Contenido minimo:

- Responsable del tratamiento: titular de Colombia confirmada.
- Datos que pueden tratarse:
  - datos que la usuaria envie voluntariamente por WhatsApp,
  - email si escribe al correo,
  - datos tecnicos de navegacion del hosting,
  - datos analiticos de GA4 solo si acepta cookies,
  - eventos no sensibles: clics en WhatsApp, descargas PDF, cambio de idioma, seleccion de mercado.
- Finalidades:
  - responder consultas,
  - gestionar citas/reservas por WhatsApp,
  - facilitar descargas,
  - medir rendimiento de la web,
  - mejorar contenido/SEO/UX,
  - cumplir obligaciones legales.
- Bases/legitimacion a revisar legalmente:
  - consentimiento para GA4/cookies no tecnicas,
  - solicitud/contacto voluntario por WhatsApp o email,
  - interes legitimo para seguridad tecnica del sitio,
  - cumplimiento legal cuando aplique.
- Destinatarios/proveedores:
  - Hostinger o proveedor de hosting,
  - Google Analytics si hay consentimiento,
  - WhatsApp/Meta cuando la usuaria abre WhatsApp,
  - redes sociales si la usuaria hace clic,
  - Supabase solo en V2 futura si se implementa.
- Transferencias internacionales:
  - mencionar que algunos proveedores pueden tratar datos fuera de Colombia/UE/Suiza segun sus condiciones.
- Conservacion:
  - solo durante el tiempo necesario para la finalidad o cumplimiento legal.
- Derechos:
  - Colombia: conocer, actualizar, rectificar, suprimir y revocar autorizacion cuando proceda.
  - UE/Espana: acceso, rectificacion, supresion, oposicion, limitacion, portabilidad y reclamacion ante autoridad competente cuando aplique.
  - Suiza: derechos de acceso, rectificacion/supresion u otros previstos por normativa aplicable cuando proceda.
- Canal de ejercicio de derechos:
  - `contacto@cejasinternacionales.com`.
- Menores:
  - la web no esta dirigida a menores.

No publicar:

- Formularios si la decision sigue siendo WhatsApp only.
- Datos de salud/contraindicaciones como politica oficial sin confirmacion.
- Promesas de resultados, ingresos por formaciones o efectos garantizados.

### 3.3 Politica de cookies

Rutas:

- `/es/cookies`
- `/en/cookies`

Contenido minimo:

- Que son cookies/tecnologias similares.
- Categorias:
  - necesarias/tecnicas,
  - analiticas,
  - preferencias si se guardan preferencias no tecnicas,
  - marketing solo si se activa en el futuro.
- Tabla de cookies real tras implementacion:
  - nombre,
  - proveedor,
  - finalidad,
  - duracion,
  - categoria.
- GA4:
  - solo se activa si la usuaria acepta analiticas.
  - no usar Google Ads/remarketing en V1 salvo decision nueva.
- Como aceptar, rechazar, configurar o retirar consentimiento.
- Enlace permanente en footer a cambiar preferencias.

No hacer:

- Cargar GA4 antes del consentimiento.
- Boton "Aceptar" visualmente dominante frente a "Rechazar".
- Preseleccionar analiticas.
- Usar scroll/navegacion como consentimiento.
- Ocultar el boton de rechazar.

---

## 4. Banner de cookies y Consent Mode

Patron recomendado:

- Primera capa visible:
  - texto corto,
  - `Aceptar`,
  - `Rechazar`,
  - `Configurar`,
  - enlace a politica de cookies.
- Segunda capa/configuracion:
  - necesarias siempre activas,
  - analiticas desactivadas por defecto,
  - marketing desactivado/no disponible en V1,
  - guardar preferencias.
- Consent Mode:
  - estado por defecto: analytics denied.
  - al aceptar analiticas: analytics granted.
  - no activar Ads/remarketing en V1.
- El banner debe existir en ES y EN.
- Debe ser accesible: foco, teclado, Escape si es dialog, lectura por screen reader, sin bloqueo visual agresivo.

Eventos GA4 permitidos en V1:

| Evento | Cuándo se dispara | Datos permitidos |
|---|---|---|
| `whatsapp_click` | Click en WhatsApp | mercado, origen, idioma, destino Colombia/Espana |
| `catalog_download` | Descarga catalogo | mercado, idioma |
| `course_pdf_download` | Descarga PDF curso | curso, idioma |
| `market_select` | Cambio de mercado | mercado, idioma |
| `language_switch` | Cambio ES/EN | origen, destino |
| `map_location_select` | Click/tap en ciudad | ciudad, pais, tipo |
| `course_interest` | CTA curso por WhatsApp | curso, idioma |

No enviar a GA4:

- nombres,
- telefonos,
- email,
- fotos,
- mensajes escritos por usuarias,
- datos de salud,
- informacion sensible.

Variables recomendadas:

```txt
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=
```

No usar ni subir tokens personales de GitHub en codigo, `.env.example`, docs publicas o GitHub Actions. Si en el futuro GitHub Actions necesita secretos, se deben crear como **GitHub Secrets** en el repositorio, no leerlos desde `.env.local` ni commitearlos.

---

## 5. Visual regression

Decision actual:

- V1 empieza con visual regression **local**.
- CI queda para mas adelante, cuando:
  - la UI este estable,
  - existan baselines aceptados,
  - el repo tenga pipeline,
  - no genere falsos positivos innecesarios.

Aplicacion:

- Crear snapshots con Playwright despues de cerrar diseno base.
- Probar Home, servicios por mercado, formaciones, jornadas/mapa, contacto/legal.
- Mantener snapshots en el mismo entorno para evitar diferencias por sistema operativo/fuentes.
- No bloquear implementacion temprana por snapshots mientras el diseno aun cambia.

---

## 6. SEO Colombia, Espana y Suiza

### 6.1 Enfoque correcto

La web debe posicionar por pais/mercado sin inventar sedes:

- Colombia: sede fisica en Cali, servicios COP, direccion legal, WhatsApp Colombia.
- Espana/Europa: jornadas por disponibilidad, servicios EUR, WhatsApp Espana.
- Suiza: Ginebra por disponibilidad, servicios CHF, WhatsApp Espana/Europa/Suiza.

Google distingue sitios multilingues y multirregionales. Para este proyecto:

- Las paginas de mercado son paginas diferentes, no simples traducciones:
  - `/es/servicios/colombia`
  - `/es/servicios/espana-europa`
  - `/es/servicios/suiza`
- Cada una tendra version EN equivalente:
  - `/en/services/colombia`
  - `/en/services/spain-europe`
  - `/en/services/switzerland`
- `hreflang` se usa entre ES/EN de la misma pagina equivalente.
- No crear `es-CO`, `es-ES`, `es-CH` hasta tener una estrategia de variantes regionales separadas. Por ahora el pais se trabaja con URL, contenido, title, H1, schema, moneda y enlaces internos.

Fuentes SEO oficiales:

- Google multiregional/multilingual sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google localized versions/hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions

### 6.2 Keywords por mercado

Colombia/Cali:

- micropigmentacion cejas Cali
- micropigmentacion labios Cali
- microblading Cali
- cejas y pestanas Cali
- cursos micropigmentacion Cali
- masterclass cejas Colombia

Espana:

- micropigmentacion cejas Madrid
- microblading Madrid
- micropigmentacion labios Madrid
- micropigmentacion cejas Valencia
- micropigmentacion Puerto de Sagunto
- curso micropigmentacion cejas Espana

Suiza/Ginebra:

- micropigmentacion cejas Ginebra
- microblading Ginebra
- micropigmentation eyebrows Geneva
- permanent makeup eyebrows Geneva
- micropigmentation sourcils Geneve
- maquillage permanent sourcils Geneve

Nota: para Suiza/Ginebra el frances puede tener valor SEO real. V1 sera ES/EN como ya se decidio; una pagina FR futura podria mejorar Ginebra, pero no se crea sin aprobacion.

### 6.3 Schema SEO

- Home: `Organization`, `WebSite`, `WebPage`.
- Cali/contacto: `BeautySalon` o `LocalBusiness` solo con direccion de Cali.
- Servicios: `Service` con ofertas por mercado si los datos estan confirmados.
- Cursos: `Course`.
- Jornadas: no usar `Event` con fecha si no hay fecha real. Usar contenido visible "proximas jornadas por disponibilidad".
- No usar `LocalBusiness` para Espana/Suiza porque no hay oficina.
- No usar reviews/ratings inventados.

### 6.4 Search Console y SEO local

Manual recomendado:

- Verificar dominio en Google Search Console.
- Enviar sitemap.
- Crear/optimizar Google Business Profile solo para Cali si la clienta lo tiene o lo quiere crear.
- No crear perfiles de negocio en Espana/Suiza sin sede real.
- Revisar consultas reales por pais tras publicar.

---

## 7. Hovers, foco y comportamiento de UI

Reglas:

- Hover es solo mejora visual, nunca la unica forma de acceder a informacion.
- Todo hover debe tener equivalente `focus-visible` y tap/click.
- El menu no debe depender de hover para abrirse en movil.
- Estados obligatorios: default, hover, focus-visible, active/current, disabled/loading cuando aplique.
- En menu desktop:
  - subrayado o cambio sobrio con token `primary-hover`,
  - indicador de pagina activa,
  - foco visible por teclado.
- En cards:
  - hover leve en borde/sombra/imagen,
  - sin saltos de layout,
  - CTA visible sin depender de hover.
- En botones:
  - ancho natural `inline-flex`,
  - `w-full` solo en movil o caso justificado,
  - no ocupar toda la tarjeta en desktop sin necesidad.
- En mapa:
  - pin hover/tap/focus abre detalle,
  - lista accesible equivalente.
- En legal/cookies:
  - sin animaciones decorativas,
  - lectura clara,
  - acciones de consentimiento con foco visible.

---

## 8. QA especifico

- [ ] Aviso legal ES/EN creado.
- [ ] Privacidad ES/EN creada.
- [ ] Cookies ES/EN creada.
- [ ] Banner cookies ES/EN creado.
- [ ] GA4 no carga antes de consentimiento.
- [ ] Rechazar mantiene GA4 desactivado.
- [ ] Aceptar activa GA4/analytics.
- [ ] Configurar permite activar/desactivar analiticas.
- [ ] Enlace "Cambiar preferencias" funciona desde footer.
- [ ] Eventos GA4 no envian PII.
- [ ] WhatsApp, PDFs, mercado, idioma y mapa se miden solo si hay consentimiento.
- [ ] SEO de Colombia, Espana y Suiza usa URLs y contenido separados.
- [ ] Schema no inventa oficinas, reviews, eventos ni fechas.
- [ ] Hovers tienen foco/tap equivalente.
- [ ] Visual regression local preparado despues del diseno estable.

