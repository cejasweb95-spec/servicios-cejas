# Analisis de prototipos - AI Studio, Figma y Claude Design

Ultima actualizacion: 17/06/2026.

Este documento analiza los tres prototipos generados a partir del prompt temporal. Son referencias exploratorias, no fuente de verdad.

Fuentes revisadas:

- Google AI Studio: `https://aistudio.google.com/apps/4e250f28-7501-4393-9c0d-dce9c688a134?...`
- Figma Site: `https://expand-dish-31590699.figma.site/`
- Claude Design: `https://3caafde0-beda-4a00-b52e-13896ffdfe78.claudeusercontent.com/...`

Capturas guardadas para revision interna:

- `docs/cliente/prototipos-analisis/figma-site-desktop.png`
- `docs/cliente/prototipos-analisis/figma-site-mobile.png`
- `docs/cliente/prototipos-analisis/claude-design-desktop.png`
- `docs/cliente/prototipos-analisis/claude-design-mobile.png`
- `docs/cliente/prototipos-analisis/google-aistudio-desktop.png`
- `docs/cliente/prototipos-analisis/dom-extract.json`

---

## 1. Resultado de acceso

| Prototipo | Estado |
|---|---|
| Google AI Studio | No se pudo analizar: redirige a login de Google. Hace falta export publico, captura o HTML. |
| Figma Site | Accesible con navegador JS. Se capturo desktop/mobile y DOM. |
| Claude Design | Accesible. Se capturo desktop/mobile y DOM. |

---

## 2. Veredicto rapido

| Prototipo | Valor como inspiracion | Riesgo si se copia |
|---|---:|---:|
| Figma Site | Bajo/medio | Alto |
| Claude Design | Medio/alto visualmente | Muy alto en datos |
| Google AI Studio | No evaluable | No evaluable |

Decision: **no usar ninguno como base de implementacion**. Solo extraer ideas visuales puntuales.

La futura web debe construirse desde nuestra planificacion, datos reales, assets reales, i18n ES/EN, SEO-safe HTML, tests y modelo preparado para Supabase.

---

## 3. Figma Site

### Lo que acierta

- Hero con foto realista y primera impresion clara.
- Navegacion simple.
- CTA principal visible.
- Mercado Colombia / Espana-Europa / Suiza visible.
- Tiene secciones basicas: servicios, valoracion, sobre Xiomara, formacion, ubicaciones, footer.
- Responsive movil no se rompe de forma grave.

### Fallos graves

1. **No usa datos reales de catalogo.**
   - Servicios muy genericos: `Microblading de Cejas`, `Cejas Powder`, `Neutralizacion y Color de Labios`.
   - No respeta nombres y estructura real del catalogo: efecto polvo, efecto maquillaje, cejas hibridas, correccion, neutralizacion, Microlips, etc.

2. **Mezcla mercados.**
   - Cada servicio aparece como `3 mercados`.
   - Eso contradice la regla cerrada: cada servicio solo donde aplica.
   - Suiza no debe mostrar HidraLips ni depilaciones, y Figma no modela esa diferencia.

3. **No muestra precios.**
   - Faltan COP, EUR y CHF.
   - Para esta web los precios por mercado son contenido central, no opcional.

4. **Duraciones genericas.**
   - Usa `2-3h` para todo.
   - Tenemos duraciones reales por servicio en `duracion-sesiones.md`.

5. **Metricas inventadas.**
   - `10+ anos`, `500+ clientas`.
   - No deben publicarse si no estan confirmadas. En nuestros MDs se maneja con cuidado `5+ anos` y cerca de 2.000 procedimientos solo si se aprueba.

6. **Imagenes de stock.**
   - Usa Unsplash.
   - La web real debe usar fotos reales del proyecto, aunque haya que optimizarlas.

7. **Bilingue incompleto.**
   - Muestra `ES`, pero no hay ingles real ni selector funcional ES/EN.
   - Rutas son `/services`, `/training`, etc., no `/es/...` y `/en/...`.

8. **SEO tecnico flojo como base.**
   - Figma publica con JS fuerte; la lectura sin JS devuelve "This site requires JavaScript".
   - Para produccion necesitamos contenido HTML rastreable.

9. **Footer incompleto.**
   - No incluye NIT, email oficial, WhatsApp Colombia/Espana, Facebook, TikTok ni aviso legal real.

10. **Mapa insuficiente.**
   - Es una tarjeta de ubicaciones, no un mapa editorial animado.

### Que se puede rescatar

- La idea del hero full-bleed con foto de procedimiento.
- La claridad del CTA.
- La seccion de valoracion gratuita como bloque propio.
- La simplicidad visual, pero con mas precision y menos plantilla.

---

## 4. Claude Design

### Lo que acierta

- Es el que mejor entiende la estructura premium/editorial.
- La composicion es mas fuerte que Figma:
  - market strip,
  - lista por mercado,
  - bloque oscuro de valoracion,
  - mapa/lista,
  - galeria editorial,
  - formaciones,
  - contacto por zonas.
- Los botones tienen ancho natural, no ocupan toda la tarjeta.
- El responsive movil es usable.
- La frase `Trabajo de precision, por mercado` funciona bien como direccion conceptual.
- El bloque `Estudio en Cali, jornadas...` va en la direccion correcta.

### Fallos graves

1. **Precios inventados y muy incorrectos.**

Ejemplos del prototipo:

| Servicio prototipo | Precio prototipo | Dato real documentado |
|---|---:|---:|
| Cejas pelo a pelo | $650.000 COP | No aparece asi en catalogo. Cejas hibridas: $400.000 COP |
| Cejas efecto polvo | $680.000 COP | $350.000 COP |
| Labios + neutralizacion | $780.000 COP | Neutralizacion/Microlips: $420.000 COP |
| Lifting de pestanas | $95.000 COP | $85.000 COP |
| Laminado de cejas | $85.000 COP | $80.000 COP |

Regla para implementacion: ningun precio puede salir de copy libre. Todo debe venir del modelo de datos validado.

2. **WhatsApp falsos.**

El DOM incluye:

- `573000000000`
- `34600000000`
- `41000000000`

Datos reales:

- Colombia: `573167742299`
- Espana/Europa/Suiza: `34603804837`
- No hay numero propio de Suiza.

3. **Cursos con datos incorrectos.**

| Curso | Prototipo | Dato real |
|---|---|---|
| Micropigmentacion de labios y neutralizacion | 2 dias | 3 dias |
| Lifting de pestanas | presencial | virtual y presencial |
| Cejas con henna | online | virtual y presencial |

4. **Metricas inventadas.**

- `+12 anos`
- `+300 alumnas`

No estan confirmadas asi. No publicar.

5. **Lenguaje potencialmente delicado.**

- Usa `estandar clinico`.
- Puede sonar bien, pero no debe usarse si no tenemos politica clara de higiene/material/contraindicaciones.

6. **Bilingue superficial.**

- Muestra `ES EN`, pero no hay rutas `/es` y `/en`.
- Los links son anchors de una sola pagina.
- No hay contenido ingles real ni metadata localizada.

7. **SEO insuficiente como arquitectura.**

- Es una landing one-page.
- Para nuestra web necesitamos paginas reales: servicios, mercados, detalles, formaciones, jornadas, descargas, contacto.

8. **Imagenes placeholder.**

- Visualmente bonito, pero no hay fotos reales.
- No sirve para evaluar calidad real con nuestro material.

9. **Numeracion excesiva de secciones.**

- Usa `01`, `02`, `03` en casi todo.
- Nuestra regla anti-IA dice evitar numerar secciones salvo secuencias reales.

10. **No cubre catalogo completo.**

- Solo muestra 5 servicios destacados.
- Como home puede valer, pero no sustituye paginas de catalogo por mercado.

### Que se puede rescatar

- Direccion editorial premium.
- Market strip Colombia / Espana-Europa / Suiza.
- Lista de servicios densa con precio/duracion/CTA.
- Bloque oscuro de valoracion fotografica gratuita.
- Mapa + lista accesible.
- Contacto por zonas.
- Footer oscuro sobrio.
- Ritmo visual de secciones amplias, no todo en cards.

---

## 5. Google AI Studio

No se pudo analizar porque la URL abre login de Google.

Para revisarlo hace falta una de estas opciones:

- export HTML publico,
- captura desktop/mobile,
- link publico sin login,
- zip del prototipo,
- video corto navegando.

Mientras no se pueda abrir, no debe influir en decisiones.

---

## 6. Riesgos que debemos bloquear en nuestra implementacion

1. **Datos inventados**
   - precios,
   - anos de experiencia,
   - numero de clientas/alumnas,
   - duraciones,
   - modalidades,
   - cupos,
   - fechas,
   - telefonos.

2. **Mercados mezclados**
   - Colombia tiene servicios que no aplican a Espana/Suiza.
   - Suiza tiene catalogo CHF propio y no incluye HidraLips ni depilaciones.

3. **i18n falso**
   - No basta con un boton ES/EN.
   - Deben existir rutas, metadata, copy, alt text, schema y WhatsApp templates en ambos idiomas.

4. **SEO de landing**
   - Una sola pagina con anchors no sirve para todo el SEO que necesitamos.
   - Deben existir paginas indexables por intencion.

5. **Stock/placeholder**
   - Prohibido usar stock como si fuera Xiomara o resultado real.
   - Si falta una imagen, se usa placeholder editorial propio solo durante desarrollo, no produccion.

6. **WhatsApp incorrecto**
   - Debe venir de `whatsapp_targets`, no escrito a mano.

7. **Botones y cards genericos**
   - Evitar que el prototipo de Figma nos lleve a cards repetidas.
   - Rescatar mas la densidad editorial de Claude, pero con datos reales.

8. **Mapa pobre**
   - Figma no resuelve el mapa.
   - Claude se acerca, pero falta animacion real, coordenadas reales y fallback textual completo.

---

## 7. Decision recomendada

No copiar ninguno.

Usar como inspiracion:

- De Figma: hero con foto real y claridad simple.
- De Claude: estructura editorial, market strip, bloque oscuro de valoracion, mapa/lista, contacto por zonas y ritmo visual.

Descartar:

- Todos los precios.
- Todos los telefonos.
- Metricas inventadas.
- Stock photos.
- Rutas one-page.
- i18n superficial.
- Copy sensible no confirmado.

La implementacion real debe ser superior porque se hara con:

- datos reales desde MDs,
- modelos tipados,
- i18n ES/EN real,
- SEO desde rutas,
- WhatsApp correcto,
- PDFs reales,
- fotos reales,
- responsive probado,
- Lighthouse/PageSpeed,
- Playwright,
- futura migracion a Supabase preparada.

