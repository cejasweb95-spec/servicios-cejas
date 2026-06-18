# Repaso general de documentación del cliente

Última actualización: 17/06/2026.

Objetivo: revisar de forma ordenada todo lo que tenemos actualmente de **Cejas Internacionales**, confirmar qué datos ya están listos para web y separar lo que todavía conviene aclarar con la clienta antes de implementación.

---

## 1. Estado ejecutivo

### Ya está suficientemente cerrado para web

| Área | Estado |
|---|---|
| Marca | Logo PNG transparente, paleta palo de rosa, tono premium/internacional |
| Identidad visual | Logo blanco/negro creado, tipografías recomendadas definidas |
| Bio / trayectoria | Bio completa, más de 5 años, cerca de 2.000 procedimientos, actividad Colombia/España/Suiza |
| Servicios | Catálogo por mercado, con precios EUR/CHF/COP |
| Contenido web de catálogos | Descripciones y notas finales transcritas para usar en la futura web |
| Duraciones de cita | Cerradas para todos los servicios del catálogo |
| Cursos / masterclass | Nombres, temarios, modalidades, precios, duración y PDFs descargables |
| Contacto | WhatsApp Colombia, WhatsApp España, email, Instagram, Facebook, TikTok |
| Legal / dirección | NIT y dirección física/legal de Cali |
| Ubicaciones | Cali como sede; Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra como jornadas |
| Fotos | Material definitivo disponible: catálogos, sesión profesional, cicatrizados, Instagram/WhatsApp |
| Estrategia web | No tienda online, CTA "Contacta conmigo", servicios por mercado |
| Arquitectura técnica | Hostinger previsto, V1 sin BD y estructura preparada para futura BD Supabase/admin |

### Sigue pendiente antes de publicar

| Pendiente | Por qué importa |
|---|---|
| FAQ final | No bloquea la planificación por decisión actual; dejar fuera u oculto salvo preguntas confirmadas |
| Condiciones de cursos | Faltan requisitos, cupos, fechas, ciudades, vigencia de precios y condiciones de reserva/certificado |
| Confirmación Suiza / CHF | PDF suizo + audio 17/06/2026: HidraLips y depilaciones no se ofrecen en Suiza; refuerzo de cejas híbridas confirmado a 150 CHF |
| Estado de jornadas | Cerrado: próximas jornadas por disponibilidad |
| Patrón de WhatsApp | Reserva/cita cerrada por WhatsApp; falta solo diseño visual del selector/botones |
| Selección final de fotos | Hay material suficiente, pero falta escoger hero, sobre mí, resultados, cursos y galería |

---

## 2. Fuentes documentales revisadas

| Fuente | Archivo / documento | Qué aporta |
|---|---|---|
| Catálogo España/Europa | `docs/cliente/catalogo-españa-eur.pdf` | Servicios, precios EUR, descripciones y duración del resultado |
| Catálogo Suiza | `docs/cliente/catalogo-suiza-chf.pdf` | Servicios y precios CHF; no coincide al 100% con España |
| Contenido transcrito de catálogos | `docs/cliente/catalogos-contenido-web-transcrito.md` | Textos descriptivos, notas finales y mensajes de valoración gratuita para web |
| Catálogo Colombia | `docs/cliente/catalogo-colombia-cop.pdf` | Servicios, precios COP, servicios exclusivos de Colombia, fotos y notas |
| Extracción de catálogos | `catalogos-servicios-precios.md` | Tabla limpia de servicios/precios por mercado |
| Extracción catálogo Suiza | `catalogo-suiza-chf.md` | Tabla limpia de precios CHF, páginas del PDF y pendientes específicos |
| Duraciones de cita | `duracion-sesiones.md` | Tiempo de agenda por servicio, extraído de audios/transcripciones |
| Resumen cruzado | `resumen-servicios-precios-duraciones.md` | Servicio + precio + mercado + duración de cita |
| Cursos | 5 PDFs en `assets-extraidos/formaciones-pdfs/originales/` | Cursos/masterclass, temarios, precios, modalidades y PDFs descargables |
| Cursos transcritos | `cursos-masterclass.md` | Resumen usable para web de formaciones |
| Contacto/legal | `contacto-datos-legales.md` | NIT, dirección, WhatsApp, email, redes, criterio legal |
| Marca | `identidad-marca.md` | Logo, paleta, estilo visual |
| Bio | `bio-xiomara.md` | Trayectoria y texto base de Xiomara |
| Fotos/assets | `assets-inventario.md`, `fotos-cicatrizados-y-sesion.md`, `fotos-instagram-inventario.md` | Material visual disponible y uso recomendado |
| Ubicaciones | `ubicaciones-jornadas.md` | Sede y ciudades para futuro mapa |
| FAQ | `preguntas-frecuentes.md`, `preguntas-pendientes.md` | Qué puede responderse ya y qué falta |
| Referencias web | `analisis-referencias-planteamiento-web.md` | Planteamiento inicial de arquitectura, diseño, mapa, frontend/backend y QA |
| Planificación web V2 | `planificacion-web-v2.md` | Plan maestro actualizado con UI por página, data model, descargas, WhatsApp, mercados y QA |
| Arquitectura técnica | `arquitectura-tecnica-hostinger-futura-db.md` | Framework recomendado, Hostinger, datos locales, futura BD Supabase/admin |
| Frontend UI/UX | `frontend-ui-ux-detalle.md` | Diseño por página, componentes, responsive, mapa, WhatsApp y animaciones |
| Frontend UI/UX V3 | `frontend-ui-ux-v3-profesional.md` | Reglas anti-IA, shadcn, Motion, detalle de secciones, galería/carrusel y checklist web |
| Skills/adaptación | `skills-auditoria-adaptacion.md` | Auditoría de skills instalados, skill local de guardrails, recomendaciones de skills faltantes |

---

## 3. Marca e identidad

### Confirmado

| Dato | Valor |
|---|---|
| Marca | Cejas Internacionales |
| Firma en logo | Xiomy Sanchez |
| Logo web | PNG transparente alta resolución `logo-oficial-sin-fondo.png` |
| Logo monocromo negro | `logo-oficial-negro-monocromo.png` |
| Logo monocromo blanco | `logo-oficial-blanco.png` |
| SVG/AI | No disponible; no se pedirá |
| Color principal | Palo de rosa clásico |
| Hex candidato principal | `#B76E79` |
| Color secundario/acento | Coral del logo `#EE5164` |
| Colores base | Palo de rosa, blanco y negro |
| Tipografía titulares | Marcellus |
| Tipografía cuerpo/UI | Manrope |
| Estilo | Premium, femenino, elegante, internacional, profesional |

### Criterio para implementación

- Usar el PNG transparente oficial en header/footer.
- Usar la versión blanca en fondos oscuros/fotos y la negra monocroma cuando convenga un look más sobrio.
- No bloquear la web por no tener SVG.
- No hacer una web completamente rosa; combinar palo de rosa con blanco, negro, fotografía real y contraste controlado.
- No usar tipografía manuscrita fuera del logo.

---

## 4. Identidad profesional / bio

### Confirmado

| Dato | Valor |
|---|---|
| Nombre completo | Xiomara Andrea Sánchez Noreña |
| Especialidad | Micropigmentación |
| Experiencia | Más de 5 años |
| Procedimientos | Cerca de 2.000 |
| Actividad | Colombia, España y Suiza |
| Sede física | Cali, Valle del Cauca, Colombia |
| Diferencial | Técnicas precisas, seguras, personalizadas y resultados naturales |
| Posicionamiento | Especialista + formadora + jornadas internacionales |

### Uso recomendado en web

- Home: destacar trayectoria internacional y resultados naturales.
- Sobre mí: usar bio completa reescrita con tono web.
- Confianza: combinar formación, certificados, cabina real y fotos profesionales.
- Mapa: reforzar sede en Colombia + jornadas en distintas ciudades.

### Pendiente

| Pendiente | Comentario |
|---|---|
| Confirmar si se puede publicar "cerca de 2.000 procedimientos" tal cual | Está en bio aportada; se puede usar, pero conviene aprobación final |

---

## 5. Contacto, datos legales y redes

### Confirmado

| Dato | Valor |
|---|---|
| Titular | Xiomara Andrea Sánchez Noreña |
| Marca comercial | Cejas Internacionales |
| NIT | 1.144.186.472-5 |
| Dirección legal/física | Calle 9 # 32 A 16, local 118, barrio El Templete, Cali, Valle del Cauca, Colombia |
| Celular Colombia | 3167742299 |
| WhatsApp Colombia | `573167742299` |
| WhatsApp España | `34603804837` |
| Email | contacto@cejasinternacionales.com |
| Instagram | https://instagram.com/cejasinternacionales |
| Facebook | https://www.facebook.com/share/1G425xaA7s/?mibextid=wwXIfr |
| TikTok | https://www.tiktok.com/@cejasinternacionales?_r=1&_t=ZS-97EwJJASFNc |

### Criterio web

- Footer y aviso legal: usar solo dirección de Cali.
- España: no presentar sede física fija.
- Contacto: permitir elegir WhatsApp Colombia y WhatsApp España.
- Para Europa/España: sugerir WhatsApp España.
- Para Colombia: sugerir WhatsApp Colombia.

### Pendiente

| Pendiente | Decisión necesaria |
|---|---|
| Interfaz de WhatsApp | Cita/reserva solo por WhatsApp. Pendiente solo diseño visual: selector de país, dos botones, modal o lógica por mercado |
| Política legal final | Aviso legal, privacidad y cookies según implementación final |

---

## 6. Ubicaciones y jornadas

### Confirmado

| País | Ciudad / ubicación | Tipo | Uso recomendado |
|---|---|---|---|
| Colombia | Cali, Valle del Cauca | Sede física | Sede principal, dirección legal, footer |
| Colombia | Restrepo, Valle del Cauca | Jornada | Ciudad de jornadas / disponibilidad |
| España | Madrid | Jornada | Ciudad de jornadas |
| España | Palma de Mallorca | Jornada | Ciudad de jornadas |
| España | Puerto de Sagunto, Valencia | Jornada | Ciudad de jornadas |
| Suiza | Ginebra | Jornada | Ciudad de jornadas |

### Criterio de comunicación

- Cali sí puede aparecer como sede física.
- Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra no deben aparecer como sedes fijas salvo confirmación expresa.
- En el mapa conviene distinguir visualmente "sede" y "jornadas".

### Pendiente

| Pendiente | Opciones |
|---|---|
| Estado de cada ciudad | Próxima jornada / jornada realizada / atención por disponibilidad |
| Fechas por ciudad | Mostrar calendario o solo presencia internacional |
| CTA por ciudad | WhatsApp Colombia, WhatsApp España o selector |

---

## 7. Servicios por mercado

### Decisión confirmada

Cada servicio se mostrará solo donde aplica.

| Mercado | Criterio |
|---|---|
| España / Europa | Mostrar servicios con precio EUR y disponibilidad real para España/Europa |
| Suiza | Mostrar servicios con precio CHF solo cuando aparecen en el PDF de Suiza o estén confirmados |
| Colombia | Mostrar servicios con precio COP, incluyendo servicios propios del estudio de Cali |

### Servicios disponibles en España/Europa, Suiza y Colombia

| Categoría | Servicios |
|---|---|
| Cejas | Laminado, sombreado en henna |
| Micropigmentación de cejas | Efecto polvo, efecto maquillaje, cejas híbridas/pelo a pelo, refuerzo cejas |
| Labios | Neutralización, Microlips, refuerzo Microlips |
| Mirada / ojos | Línea de ojos, relleno de pestañas, refuerzo línea de ojos |
| Pestañas | Lifting de pestañas |

### Servicios con matiz por mercado

| Servicio | Mercado |
|---|---|
| Depilación con cera / cuchilla | España/Europa + Colombia; confirmado por audio 17/06/2026: no se ofrece en Suiza |
| Depilación corporal | España/Europa + Colombia; confirmado por audio 17/06/2026: no se ofrece en Suiza |
| Corrección de cejas | España/Europa; sin precio Colombia ni Suiza en catálogo |
| HidraLips | España/Europa + Colombia; confirmado por audio 17/06/2026: no se ofrece en Suiza |
| Refuerzo cejas híbridas | España/Europa + Colombia + Suiza; en Suiza confirmado a 150 CHF por audio 17/06/2026 |
| Depilación media pierna | Colombia; sin precio España/Europa ni Suiza |

### Servicios solo Colombia

| Categoría | Servicios |
|---|---|
| Extensiones de pestañas | Set rímel, volumen ligero, wispy, volumen ruso 2D, mega volumen, volumen aura 2D, volumen aura 5D, volumen griego 3D, volumen griego 5D, por punto efecto volumen, por punto mega volumen |
| Uñas | Manicure tradicional, pedicure tradicional, manicure + pedicure, semipermanente, base rubber, dipping, press on, acrílico, retiros |
| Peinados y maquillaje | Maquillaje social, peinado social, trenzas |

### Pendiente

No quedan servicios pendientes de duración. En precio/disponibilidad, Suiza queda prácticamente cerrada: HidraLips y depilaciones no se ofrecen allí, y el refuerzo de cejas híbridas cuesta 150 CHF. Como matiz menor, corrección de cejas no aparece en el PDF CHF ni fue mencionada en el audio, así que se mantiene fuera de Suiza salvo confirmación posterior.

---

## 8. Servicios: precios y duraciones

### Estado general

| Área | Estado |
|---|---|
| Precios España/Europa | Confirmados desde catálogo EUR |
| Precios Suiza | Confirmados para servicios que aparecen en PDF CHF |
| Precios Colombia | Confirmados desde catálogo COP |
| Duración de cita | Confirmada para todos los servicios del catálogo |
| Duración del resultado | Confirmada para servicios que la indican en catálogo |
| Servicios con rango | Rango aceptado porque depende de diseño/decorado/estado inicial |

### Duraciones clave ya cerradas

| Servicio / familia | Duración de cita |
|---|---:|
| Micropigmentación de cejas | 2 horas |
| Corrección de cejas | 2 horas |
| Refuerzos / retoques de cejas, cejas híbridas, Microlips y línea de ojos | 30 minutos |
| Micropigmentación de labios / neutralización | 2 horas |
| HidraLips | 1 hora |
| Línea de ojos / eyeliner | 2 horas |
| Relleno de pestañas | 1 hora |
| Lifting de pestañas | 1 hora |
| Laminado de cejas | 1 hora |
| Sombreado en henna | 40 minutos |
| Depilación cejas/corporal | 20 minutos |
| Extensiones de pestañas | 15 min a 2 horas según set |
| Manicure tradicional | 1 hora |
| Pedicure tradicional | 1h a 1h 20min |
| Manicure + pedicure | 3 horas |
| Semipermanente / base rubber | 1 a 2 horas |
| Dipping | 2 horas |
| Press on | 2 a 3 horas |
| Acrílico esculpido / cubrimiento | 3h 30min |
| Retiros de uñas | 1 hora cada uno |
| Maquillaje social | 1h 30min |
| Peinado social | 30 min aprox. |
| Trenzas | 15 a 25 min aprox. |

### Precios CHF confirmados

| Servicio | Precio Suiza |
|---|---:|
| Sombreado en henna | 50 CHF |
| Laminado de cejas | 95 CHF |
| Lifting de pestañas | 75 CHF |
| Neutralización | 300 CHF |
| Microlips | 300 CHF |
| Efecto polvo | 260 CHF |
| Efecto maquillaje | 260 CHF |
| Cejas híbridas / pelo a pelo | 300 CHF |
| Línea de ojos / eyeliner | 200 CHF |
| Relleno de pestañas | 180 CHF |
| Refuerzo cejas | 150 CHF |
| Refuerzo cejas híbridas | 150 CHF |
| Refuerzo Microlips | 180 CHF |
| Refuerzo línea de ojos | 100 CHF |

### Criterio de publicación

- Mostrar duración exacta cuando esté cerrada.
- Mostrar "aprox." o rangos cuando dependa del diseño/decorado.
- Diferenciar siempre "duración de cita" de "duración del resultado".

---

## 9. Cursos y masterclass

### PDFs guardados para descarga futura

| Curso | PDF |
|---|---|
| Curso profesional de micropigmentación de cejas | `curso-micropigmentacion-cejas.pdf` |
| Curso profesional de micropigmentación y neutralización labial | `curso-micropigmentacion-labios.pdf` |
| Master Class Laminado de Cejas | `masterclass-laminado-cejas.pdf` |
| Master Class Lifting de Pestañas | `masterclass-lifting-pestanas.pdf` |
| Master Class Cejas en Henna | `masterclass-cejas-henna.pdf` |

### Cursos confirmados

| Curso | Duración | Modalidades | Certificación |
|---|---:|---|---|
| Micropigmentación de cejas | 3 días | Virtual, presencial, personalizado | Doble certificado |
| Micropigmentación y neutralización labial | 3 días | Virtual, presencial, personalizado | Doble certificado |
| Masterclass laminado de cejas | 1 día | Virtual, presencial | Certificado |
| Masterclass lifting de pestañas | 1 día | Virtual, presencial | Certificado |
| Masterclass cejas en henna | 1 día | Virtual, presencial | Certificado |

### Estructura de cursos profesionales

| Día | Contenido |
|---|---|
| Día 1 | Teoría |
| Día 2 | Práctica |
| Día 3 | Modelo real |

### Precios confirmados

Los precios están transcritos en `cursos-masterclass.md` para Colombia y España, con modalidades con kit/sin kit cuando el PDF lo especifica.

### Cuidado al publicar

- Los PDFs incluyen ejemplos/proyecciones de ingresos. No conviene publicarlos como promesa de resultados.
- Si se mencionan, deben ir con aclaración legal y tono orientativo.

### Pendiente

| Pendiente | Comentario |
|---|---|
| Requisitos previos | Si necesita experiencia previa, modelo, materiales, edad mínima, etc. |
| Cupos | Cupos por modalidad o ciudad |
| Fechas y ciudades | Para presenciales/jornadas |
| Vigencia de precios | Confirmar antes de publicar |
| Condiciones de reserva | Abono, cancelación, cambios, financiación |
| Certificados | Texto legal/alcance del certificado |
| Modalidad presencial | Confirmar si aplica en Colombia, España o solo donde haya jornada |

---

## 10. Fotos, video y assets

### Material disponible

| Bloque | Cantidad / estado | Uso recomendado |
|---|---|---|
| Logo | PNG transparente alta resolución | Header, footer, marca |
| Fotos extraídas de catálogos | 59 fotos | Galería, servicios, resultados |
| Fotos Instagram/WhatsApp | 19 fotos + 1 video | Resultados reales, prueba social, proceso |
| Cicatrizados | 8 fotos | Galería "resultados cicatrizados" |
| Sesión profesional | 14 fotos | Hero, sobre mí, internacional, confianza |
| Fotos clave de cabina/certificados | Varias | Confianza, estudio, bio |
| Panel sets pestañas | 1 imagen | Servicios de pestañas Colombia |
| Imágenes de cursos | Páginas extraídas + contact sheets | Apoyo visual de formaciones |

### Criterio confirmado

La clienta perdió los originales. Se trabajará con el material disponible actual como definitivo.

### Uso recomendado

- Hero: foto profesional de Xiomara, idealmente con concepto internacional.
- Sobre mí: retratos con uniforme/traje y cabina.
- Servicios: resultados reales limpios.
- Resultados: priorizar fotos sin overlays o recortarlas.
- Cursos: usar PDFs descargables y apoyo visual si se ve profesional.

### Pendiente

| Pendiente | Acción |
|---|---|
| Selección final de galería | Elegir mejores fotos por sección |
| Recorte/optimización | Limpiar capturas de stories y adaptar a web |
| Revisión del video | Decidir si se usa en hero/proceso |

---

## 11. Cuidados y contenido educativo

### Confirmado

Tenemos contenido para:

- Preparación antes de micropigmentación de cejas.
- Preparación antes de micropigmentación de labios.
- Cuidados después de micropigmentación de cejas.
- Cuidados después de micropigmentación de labios / Micro Lips.

### Uso recomendado

- Página `/cuidados`.
- Bloques resumidos dentro de servicios.
- FAQ de preparación/cicatrización.
- Posible PDF descargable simple para clientas.

### Pendiente

| Pendiente | Comentario |
|---|---|
| Cuidados para línea de ojos | No está documentado explícitamente |
| Cuidados para lifting/laminado/henna | No está documentado como servicio |
| Política de contraindicaciones | Falta respuesta de clienta |
| Embarazo/lactancia | Falta política clara |

---

## 12. FAQ: cobertura actual

### Se puede responder ya

| Pregunta | Estado |
|---|---|
| Qué es la micropigmentación | Respondible |
| Cuánto dura el resultado | Respondible por catálogo |
| Cuánto dura la cita | Respondible para todos los servicios |
| Cómo prepararse antes | Respondible para cejas/labios |
| Qué cuidados seguir después | Respondible para cejas/labios |
| Cuánto cuesta | Respondible por mercado |
| Si hay valoración gratuita | Sí, por foto sin maquillaje |
| Si corrige trabajos previos | Sí, al menos corrección de cejas; labios correctivos en formación/experiencia |
| Si es permanente | Explicar como semipermanente |
| Cómo reservar | WhatsApp Colombia/España |

### Falta respuesta final de la clienta

| Pregunta | Por qué importa |
|---|---|
| ¿Duele? ¿Usa anestesia tópica? | Objeción principal de clientas |
| ¿Material desechable / higiene? | Confianza y seguridad |
| ¿Embarazo o lactancia? | Política de seguridad |
| ¿Contraindicaciones? | Evita reservas no aptas |
| ¿Cada cuánto se hace el retoque? | Diferente de duración de cita; falta frecuencia recomendada |
| ¿Formas de pago? | Colombia: efectivo y tarjeta confirmados; formaciones con Sistecrédito/financiación según PDF. España/Suiza: resolver por WhatsApp si no se confirma |
| ¿Atiende a domicilio? | Evita confusión, sobre todo España/jornadas |
| ¿Cómo es la cita paso a paso? | No se trata como bloqueo por decisión actual |
| ¿Con cuánta antelación reservar? | Reserva por WhatsApp; no se trata como bloqueo por decisión actual |

---

## 13. Decisiones estratégicas cerradas

| Decisión | Estado |
|---|---|
| No tocar `main` hasta orden final | Confirmado |
| No tienda online | Confirmado |
| CTA principal | "Contacta conmigo" |
| Servicios por mercado | Cada servicio solo donde aplica |
| Mostrar precios | Sí, EUR, CHF y COP |
| Mapa futuro | Sí, elegante/animado con ubicaciones confirmadas |
| Color principal | Palo de rosa clásico |
| PDFs de cursos | Deben poder descargarse en la web |
| Fotos | Usar las disponibles; no pedir originales |

---

## 14. Riesgos / puntos de cuidado

| Riesgo | Mitigación |
|---|---|
| Confundir sede con jornada | Cali es sede; el resto son jornadas/disponibilidad |
| Confundir duración de cita con duración del resultado | Separar visualmente en UI y copy |
| Publicar ingresos de cursos como promesa | Evitarlo o usar disclaimer |
| Mostrar servicios de Colombia en España/Suiza | Filtrar por mercado |
| Publicar en Suiza servicios sin precio CHF | Mostrar solo servicios del PDF CHF o pedir confirmación |
| WhatsApp incorrecto por país | Selector claro o dos botones |
| Fotos comprimidas | Optimizar, recortar y no forzar tamaños excesivos |
| FAQ incompleto | Publicar solo respuestas confirmadas o dejar bloque pendiente oculto |
| Política legal Colombia + Espana/UE + Suiza | Preparar aviso legal, privacidad y cookies porque se usara GA4 con consentimiento |

---

## 15. Qué falta por aclarar, lista final

### Alta prioridad

1. Cursos/formaciones:
   - Requisitos.
   - Cupos.
   - Fechas.
   - Ciudades de presenciales.
   - Vigencia de precios.
   - Condiciones de reserva/cancelación.
   - Alcance legal del certificado.
2. Jornadas/mapa:
   - Cerrado: próximas jornadas por disponibilidad.
   - No mostrar fechas/calendario si no están confirmadas.
   - Preparar sistema para añadir fecha futura por ciudad o por curso.
3. WhatsApp:
   - Cita/reserva cerrada por WhatsApp.
   - Falta solo patrón visual final para Colombia/España.
4. Suiza / CHF:
   - Cerrado por audio 17/06/2026: HidraLips no se ofrece en Suiza.
   - Cerrado por audio 17/06/2026: depilaciones no se ofrecen en Suiza.
   - Cerrado por audio 17/06/2026: `Retouche sourcils 150 CHF` aplica también a cejas híbridas.
   - Pendiente menor: corrección de cejas no aparece en el PDF CHF ni fue mencionada en el audio; mantener fuera de Suiza salvo confirmación posterior.
5. FAQ:
   - No tratar como bloqueo. Si se publica más adelante, usar solo respuestas confirmadas.

### Media prioridad

6. Selección final de fotos por sección.
7. Si se usarán analytics, pixel o mapas externos.
8. Confirmar plan exacto de Hostinger para elegir deploy Node.js, estático o VPS.

---

## 16. Conclusión

La documentación del cliente ya es suficiente para construir una primera versión sólida de la web: marca, servicios, precios, duraciones, formaciones, contacto, sede, jornadas, fotos y estrategia están definidos.

Lo que queda no bloquea la estructura ni el diseño general, pero sí afecta a la publicación final de algunos bloques:

- Cursos con fechas/cupos/condiciones.
- Matiz menor de Suiza/CHF: corrección de cejas.
- Mapa con jornadas por disponibilidad.
- Interfaz visual de WhatsApp.
- Selección visual final.
- Plan exacto de Hostinger para deploy.

La recomendación es avanzar con arquitectura, diseño y estructura de datos usando todo lo confirmado, dejando esos bloques preparados para completar cuando lleguen las respuestas finales.
