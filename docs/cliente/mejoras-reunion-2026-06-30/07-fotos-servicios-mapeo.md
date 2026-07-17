# 07 — Fotos de servicios: seguimiento, QA e implementación

**Objetivo:** cuando Jeffrey termine de pasarme la lista de servicios + archivos de foto, subirlos a la web con el diseño responsive correcto.

**Estado:** ✅ fotos recibidas en repo (backup) · ⏳ implementación web pendiente

---

## Cómo vamos a trabajar (flujo contigo)

1. **Tú me escribes** el nombre del servicio (como lo dice la cliente) y adjuntas la foto (o carpeta).
2. **Yo cruzo** con el catálogo en `src/content/services.ts` y marco ✅ en la tabla de abajo.
3. Cuando la lista esté **completa por mercado**, implemento en bloque:
   - registro del asset en `src/content/media.ts`
   - enlace **servicio → foto** (hoy no existe; ver plan técnico)
   - alt ES/EN por servicio
   - QA visual 390 / 768 / 1440
4. **Refuerzos:** no piden foto propia (reutilizan la de su categoría o la del servicio principal).
5. **Uñas y peinados/maquillaje:** no añadiremos foto (decisión jul 2026).
6. **Extensiones de pestañas (Colombia):** collage 3×3 → 9 recortes + 2 por punto con fallback (ver QA extensiones).

### Formato ideal cuando me pases fotos

```
Servicio: Laminado de cejas
Mercado: España (o Todos / Colombia / Suiza)
Archivo: laminado-cejas.jpg
Notas: (opcional) misma foto para ES y CO
```

Puedes mandar en lote: «aquí van 5 servicios» + archivos nombrados igual que el id del servicio si quieres (`laminado-cejas.jpg`, `efecto-polvo.jpg`, etc.).

---

## Reglas de cobertura por mercado

| Regla | Detalle |
|-------|---------|
| Refuerzos | Sin foto específica |
| Uñas (13) | Sin foto |
| Peinados y maquillaje (3) | Sin foto |
| Depilación de piernas | = **Depilación de media pierna** (solo Colombia) |
| Extensiones pestañas (11) | **1 foto** para todos |
| Resto con foto propia | ~40 servicios entre CO / ES / CH |

---

## ¿Está completa la lista de la cliente?

### España/Europa — ✅ nombres completos (18 servicios con foto)

Todos pasados. Falta solo recibir/subir los archivos.

### Suiza — ✅ nombres completos (10 servicios con foto)

Todos pasados. Falta solo recibir/subir los archivos.

### Colombia — ✅ nombres completos (con exclusiones acordadas)

| Bloque | ¿Foto? | Estado lista |
|--------|--------|--------------|
| Servicios compartidos con ES/CH + depilaciones + media pierna | Sí, individual | ✅ pasados |
| Extensiones de pestañas (11) | Sí, collage 3×3 + fallback por punto | ✅ recibido · ver QA extensiones |
| Uñas (13) | No | ✅ excluido |
| Peinados y maquillaje (3) | No | ✅ excluido |
| Refuerzos (4) | No | ✅ excluido |

**Colombia:** ✅ lista completa de fotos (incl. collage extensiones; ver QA por punto).

---

## QA — extensiones de pestañas (11 servicios, collage 3×3)

### Qué trae la foto

Collage **«SETS De pestañas»** con **9 círculos** (3×3). Cada uno es un set distinto con etiqueta rosa.

| Celda | Etiqueta en foto | id web | ¿En PDF Colombia? |
|-------|------------------|--------|-------------------|
| 1,1 | Rímel | `set-rimel` | ✅ Extensiones |
| 1,2 | volumen ligero | `volumen-ligero` | ✅ |
| 1,3 | wispy | `wispy` | ✅ |
| 2,1 | Volumen ruso | `volumen-ruso-2d` | ✅ |
| 2,2 | Mega volumen | `mega-volumen` | ✅ |
| 2,3 | Volumen aura 2D | `volumen-aura-2d` | ✅ |
| 3,1 | volumen aura 5D | `volumen-aura-5d` | ✅ |
| 3,2 | volumen griego 3D | `volumen-griego-3d` | ✅ |
| 3,3 | volumen **inglés** 5D | `volumen-griego-5d` | ✅ (nombre correcto en catálogo) |

**No están en el collage (2 servicios):**

| id web | Nombre | Dónde está en PDF / docs |
|--------|--------|---------------------------|
| `por-punto-efecto-volumen` | Por punto efecto volumen | Sección **Pestañas** (no «Extensiones») — grupos 8–10 días, 15 min |
| `por-punto-mega-volumen` | Por punto mega volumen | Igual — técnica distinta a los sets |

Fuente: `docs/cliente/catalogos-contenido-web-transcrito.md`, `catalogos-servicios-precios.md`, `duracion-sesiones.md`.

### Error de etiqueta ya cerrado

La celda 3,3 dice **«volumen inglés 5D»** en el material gráfico, pero la clienta confirmó que el nombre correcto es **`volumen-griego-5d`** (transcripción de audio confundió «inglés» con «griego»). Ver `catalogos-servicios-precios.md`.

### Plan de implementación recomendado

1. **Maestro:** `docs/cliente/fotos-servicios-2026/extensiones-pestanas/00-collage-sets-3x3-maestro.png`
2. **Recorte:** generar 9 JPG/WebP cuadrados (solo círculo del ojo, sin etiqueta rosa) → `public/images/servicios/extensiones/{id}.webp`
3. **`mediaId` por servicio** en los 9 sets (dejan de compartir una sola imagen genérica).
4. **Por punto (2):** no hay foto en collage ni en PDF visual. Opciones:
   - **A (recomendada):** reutilizar recorte de set parecido — `por-punto-efecto-volumen` ← `volumen-ruso-2d`; `por-punto-mega-volumen` ← `mega-volumen`
   - **B:** una sola imagen genérica compartida solo para esos dos
   - **C:** pedir a la clienta 1–2 fotos de «punto a punto» (opcional; no bloquea)
5. **Marco detalle:** crop circular o 4:3 centrado en el ojo; alt ES/EN por servicio con nombre del set.

### QA visual al implementar

- [ ] 9 recortes alineados con etiqueta correcta (especialmente 3,3 = griego 5D)
- [ ] Sin texto rosa «SETS De pestañas» en hero de detalle
- [ ] Por punto: imagen coherente con densidad (efecto &lt; mega)
- [ ] Solo visible en mercado Colombia
- [ ] Responsive 390 / 768 / 1024 / 1440

---

## QA — cómo están las fotos HOY en la web

### Hallazgo principal

Hoy **no hay foto por servicio**. Hay foto por **categoría**:

| Categoría | Imagen actual | Dónde se ve |
|-----------|---------------|-------------|
| Cejas | `result-cejas-01.jpg` | Detalle de servicio (hero lateral) |
| Micropigmentación cejas | `result-cejas-03.jpg` | Detalle |
| Labios | `result-labios-01.jpg` | Detalle |
| Mirada y pestañas | `result-mirada-01.jpg` | Detalle |
| Extensiones pestañas | `sets-pestanas-panel.jpg` | Detalle |
| Depilación corporal | **ninguna** | Detalle sin imagen |
| Uñas | **ninguna** | Detalle sin imagen |
| Peinados y maquillaje | **ninguna** | Detalle sin imagen |

**Consecuencia:** servicios distintos de la misma categoría comparten la misma foto. Ej.: *Efecto polvo*, *Efecto maquillaje* y *Cejas híbridas* muestran todas `result-cejas-03.jpg`.

### Dónde aparece la imagen (UI)

| Vista | ¿Tiene foto por servicio? |
|-------|---------------------------|
| Listado `/servicios/[mercado]` | ❌ No (solo texto, precio, duración) |
| Tarjeta `ServiceCard` | ❌ No |
| **Detalle** `/servicios/[mercado]/[servicio]` | ✅ Sí (hero lateral) |
| Home «servicios destacados» | ❌ No (solo mercado + texto) |
| Hero del listado por mercado | Par de imágenes **del mercado** (no del servicio) |

### Marco / diseño actual (detalle de servicio)

La foto va **dentro de un marco**:

```tsx
// aspect-[4/3] · rounded-2xl · border border-primary/15 · object-cover
<div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/15 bg-surface">
  <Image className="h-full w-full object-cover" sizes="(min-width: 1024px) 34vw, 92vw" />
</div>
```

| Propiedad | Valor |
|-----------|-------|
| Relación de aspecto contenedor | **4:3** (horizontal) |
| Recorte | `object-cover` (recorta si la foto es vertical) |
| Borde | `border-primary/15`, esquinas `rounded-2xl` |
| Responsive | móvil ~92vw · desktop ~34vw del hero |
| Lista de servicios | sin thumbnail |

### Problemas conocidos (auditoría previa)

| Asset | Problema |
|-------|----------|
| `result-pestanas-01.jpg` | Muestra **labios**, no pestañas (id incorrecto) |
| Varias categorías | Misma foto para servicios diferentes |
| Depilaciones | Sin imagen en detalle |
| Alt genérico | Alt de categoría, no del servicio concreto |

---

## Plan técnico — cómo lo haré cuando lleguen las fotos

### Fase 1 — Datos (obligatorio)

1. Añadir campo opcional `mediaId` en cada servicio (`serviceSchema` en `schema.ts`).
2. Registrar cada foto en `mediaAssets` (`media.ts`):
   - `public/images/servicios/{service-id}.jpg` (o `.webp`)
   - `width` / `height` reales
   - `alt` ES + EN **específico del servicio**
3. Nueva query `getServiceMediaAsset(serviceId, locale)`:
   - si el servicio tiene `mediaId` → esa foto
   - si no → fallback categoría (refuerzos, transición)
   - si categoría sin foto → `null` (uñas, peinados, depilación)
4. Actualizar `service-detail-page.tsx` para usar la query nueva.
5. Extensiones: los 11 servicios apuntan al **mismo** `mediaId`.

### Fase 2 — Assets

Por cada foto que pases:

1. Guardar original en `docs/cliente/fotos-servicios-2026/` (backup cliente).
2. Exportar optimizada a `public/images/servicios/`.
3. Objetivo: **mín. 1200 px en el lado largo**, JPG calidad ~85 o WebP.
4. **Encuadre recomendado 4:3** antes de subir → menos recorte feo en móvil.
5. Si la cliente manda vertical 3:4, centrar rostro/resultado; el marco recortará laterales.

### Fase 3 — QA antes de dar por hecho

- [ ] Detalle ES + EN de **cada servicio con foto**
- [ ] Misma foto no asignada a otro servicio por error
- [ ] Alt describe el **servicio**, no otro genérico
- [ ] Responsive 390 / 768 / 1024 / 1440 — marco 4:3 sin saltos CLS
- [ ] Schema JSON-LD del servicio usa la imagen correcta
- [ ] Refuerzos sin foto propia (fallback OK)
- [ ] Uñas / peinados: detalle sin imagen rota (OK vacío)
- [ ] Extensiones CO: los 11 muestran la misma foto
- [ ] Lighthouse: peso razonable por imagen

### Fase 4 — Opcional (no en V1 salvo que pidas)

- Thumbnail pequeño en listado de servicios (cambio de diseño).
- Foto distinta por mercado para el mismo servicio (hoy una foto global por servicio).

---

## Checklist servicio → foto (implementación)

**Leyenda:** ⬜ pendiente archivo · ✅ foto recibida · 🚫 sin foto · 🔁 compartida

### Cejas

| id | Nombre | ES | CO | CH | Foto |
|----|--------|----|----|-----|------|
| laminado-cejas | Laminado de cejas | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| sombreado-henna | Sombreado en henna | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| depilacion-cejas-cera | Depilación cejas con cera | ✅ | ✅ | — | ✅ recibida · ver nota |
| depilacion-cejas-cuchilla | Depilación cejas con cuchilla | ✅ | ✅ | — | ⚠️ reutiliza cera · ver nota |

### Micropigmentación cejas

| id | Nombre | ES | CO | CH | Foto |
|----|--------|----|----|-----|------|
| efecto-polvo | Efecto polvo | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| efecto-maquillaje | Efecto maquillaje | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| cejas-hibridas | Cejas híbridas | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| correccion-cejas | Corrección de cejas | ✅ | — | — | ✅ recibida · ver nota |
| refuerzo-cejas | Refuerzo cejas | ✅ | ✅ | ✅ | 🚫 |
| refuerzo-cejas-hibridas | Refuerzo cejas híbridas | ✅ | ✅ | ✅ | 🚫 |

### Labios

| id | Nombre | ES | CO | CH | Foto |
|----|--------|----|----|-----|------|
| neutralizacion-labios | Neutralización | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| microlips | Microlips | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| hidralips-tres-sesiones | HidraLips (3 sesiones) | ✅ | ✅ | — | ✅ compartida · ver nota |
| hidralips-una-sesion | HidraLips (1 sesión) | ✅ | ✅ | — | ✅ recibida · ver nota |
| refuerzo-microlips | Refuerzo Microlips | ✅ | ✅ | ✅ | 🚫 |

### Mirada y pestañas

| id | Nombre | ES | CO | CH | Foto |
|----|--------|----|----|-----|------|
| linea-ojos | Línea de ojos | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| relleno-pestanas | Relleno de pestañas | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| lifting-pestanas | Lifting de pestañas | ✅ | ✅ | ✅ | ✅ recibida · ver nota |
| refuerzo-linea-ojos | Refuerzo línea de ojos | ✅ | ✅ | ✅ | 🚫 |

### Depilación corporal

| id | Nombre | ES | CO | CH | Foto |
|----|--------|----|----|-----|------|
| depilacion-axilas | Depilación de axilas | ✅ | ✅ | — | ✅ recibida · ver nota |
| depilacion-bigote-bozo | Depilación bigote / bozo | ✅ | ✅ | — | ✅ recibida · ver nota |
| depilacion-nariz | Depilación de nariz | ✅ | ✅ | — | ✅ recibida · ver nota |
| depilacion-media-pierna | Depilación de media pierna | — | ✅ | — | ✅ recibida · ver nota |

### Extensiones de pestañas (Colombia) — collage 3×3 + fallback por punto

| id | Nombre | Foto |
|----|--------|------|
| set-rimel | Set rímel | ✅ celda 1,1 · recorte collage |
| volumen-ligero | Volumen ligero | ✅ celda 1,2 |
| wispy | Wispy | ✅ celda 1,3 |
| volumen-ruso-2d | Volumen ruso 2D | ✅ celda 2,1 |
| mega-volumen | Mega volumen | ✅ celda 2,2 |
| volumen-aura-2d | Volumen aura 2D | ✅ celda 2,3 |
| volumen-aura-5d | Volumen aura 5D | ✅ celda 3,1 |
| volumen-griego-3d | Volumen griego 3D | ✅ celda 3,2 |
| volumen-griego-5d | Volumen griego 5D | ✅ celda 3,3 (etiqueta foto: «inglés 5D») |
| por-punto-efecto-volumen | Por punto efecto volumen | 🔁 fallback → recorte `volumen-ruso-2d` |
| por-punto-mega-volumen | Por punto mega volumen | 🔁 fallback → recorte `mega-volumen` |

### Uñas + peinados — 🚫 sin foto

16 servicios (`manicure-*`, `pedicure-*`, `acrilico-*`, `retiro-*`, `maquillaje-social`, `peinado-social`, `trenzas`, etc.): sin imagen en detalle.

---

## Resumen ejecutivo

| Mercado | Lista de nombres | Archivos foto |
|---------|------------------|---------------|
| **España** | ✅ Completa | ✅ backup en repo |
| **Suiza** | ✅ Completa | ✅ backup en repo |
| **Colombia** | ✅ Completa | ✅ backup en repo (incl. extensiones) |

\*Excluye uñas, peinados y refuerzos.

**Cuando me pases fotos:** dímelo en chat («sube estas fotos») o adjunta carpeta; yo sigo este MD, implemento Fase 1–3 y te confirmo con capturas/QA.

### Registro de fotos recibidas

| Fecha | Servicio | id web | Archivo elegido | Backup |
|-------|----------|--------|-----------------|--------|
| 2026-07-09 | Micropigmentación efecto maquillaje | `efecto-maquillaje` | `(2).jpeg` del lote 15:23 — collage con texto «Micropigmentacion efecto maquillaje» + logo Cejas Internacionales | `docs/cliente/fotos-servicios-2026/efecto-maquillaje/` |
| 2026-07-09 | Lifting de pestañas | `lifting-pestanas` | `01-duracion-dos-meses.png` — close-up pestañas + texto «Duración hasta dos meses» | `docs/cliente/fotos-servicios-2026/lifting-pestanas/` |
| 2026-07-09 | Micropigmentación labial | `microlips` | `03-closeup-logo-cejas.png` — close-up labios + logo Cejas Internacionales | `docs/cliente/fotos-servicios-2026/microlips/` |
| 2026-07-09 | Cejas en henna | `sombreado-henna` | `01-closeup-logo-cejas.png` — retrato close-up cejas henna + logo | `docs/cliente/fotos-servicios-2026/sombreado-henna/` |
| 2026-07-09 | Neutralización labial | `neutralizacion-labios` | `13.56.56.jpeg` — close-up resultado + copy labios oscuros/manchados | `docs/cliente/fotos-servicios-2026/neutralizacion-labios/` |
| 2026-07-09 | Depilación de piernas | `depilacion-media-pierna` | `01-aplicacion-cera-pierna.png` — aplicación de cera en pierna (solo CO) | `docs/cliente/fotos-servicios-2026/depilacion-media-pierna/` |
| 2026-07-09 | Depilación de cejas | `depilacion-cejas-cera` | `01-aplicacion-cera-cejas.png` — aplicación de cera en ceja | `docs/cliente/fotos-servicios-2026/depilacion-cejas-cera/` |
| 2026-07-09 | Depilación de nariz | `depilacion-nariz` | `01-depilacion-nariz-cera.png` — depilación nasal con cera | `docs/cliente/fotos-servicios-2026/depilacion-nariz/` |
| 2026-07-09 | Depilación de bigote | `depilacion-bigote-bozo` | `01-depilacion-bigote-cera.png` — cera en labio superior | `docs/cliente/fotos-servicios-2026/depilacion-bigote-bozo/` |
| 2026-07-09 | Hidratación de labios | `hidralips-una-sesion` + `hidralips-tres-sesiones` | `01-antes-despues-1a-sesion-screenshot.png` — misma foto para 1 y 3 sesiones | `docs/cliente/fotos-servicios-2026/hidralips/` |
| 2026-07-09 | Laminado de cejas | `laminado-cejas` | `02-closeup-resultado-fondo-oscuro.png` — cejas laminadas + logo | `docs/cliente/fotos-servicios-2026/laminado-cejas/` |
| 2026-07-09 | Micropigmentación híbrida | `cejas-hibridas` | `13.59.04 (1).jpeg` — antes/después pelo a pelo + sombreado | `docs/cliente/fotos-servicios-2026/cejas-hibridas/` |
| 2026-07-09 | Depilación de axilas | `depilacion-axilas` | `01-aplicacion-cera-axilas.png` — aplicación de cera en axila | `docs/cliente/fotos-servicios-2026/depilacion-axilas/` |
| 2026-07-09 | Micropigmentación efecto polvo | `efecto-polvo` | `02-cicatrizado-rubias-texto.png` — ceja cicatrizada efecto polvo + logo | `docs/cliente/fotos-servicios-2026/efecto-polvo/` |
| 2026-07-09 | Línea de ojos | `linea-ojos` | `01-closeup-linea-superior.png` — delineado superior en línea de pestañas | `docs/cliente/fotos-servicios-2026/linea-ojos/` |
| 2026-07-09 | Relleno de pestañas | `relleno-pestanas` | `03-antes-despues-horizontal.png` — antes/después lado a lado; elegida sobre vertical (sin UI móvil) | `docs/cliente/fotos-servicios-2026/relleno-pestanas/` |
| 2026-07-09 | Corrección de cejas | `correccion-cejas` | `01-antes-despues-correccion-cejas.png` — cejas viejas desvaídas vs corrección rediseñada | `docs/cliente/fotos-servicios-2026/correccion-cejas/` |
| 2026-07-09 | Extensiones de pestañas (11) | 9 sets + 2 por punto | `00-collage-sets-3x3-maestro.png` — grid 3×3; ver QA extensiones | `docs/cliente/fotos-servicios-2026/extensiones-pestanas/` |

**Nota lote 2026-07-09 (efecto maquillaje):** la carpeta traía 5 fotos. La `(2)` es la más clara para este servicio. Las otras podrían servir después (p. ej. `(1)` cejas + neutralización labios, `(3)`/`(4)`/`(5)` resultados similares).

**Nota lote 2026-07-09 (lifting pestañas):** 3 fotos. Elegida la del close-up con «Duración hasta dos meses» (encaja con el copy del servicio). Reserva: `03-antes-despues.png` (muy buena, pero el collage vertical recorta peor en marco 4:3). Descartada para web: screenshot Instagram con UI (`02`).

**Nota lote 2026-07-09 (microlips):** 3 fotos. Elegida la del close-up único con guantes + logo Cejas Internacionales (mejor para marco 4:3). Reserva: collages `01` y `02` (útiles para redes; en web recortan peor).

**Nota lote 2026-07-09 (sombreado henna):** 2 fotos. Elegida la del retrato close-up con logo (mejor para marco 4:3). Reserva: collage «Sombreado en henna» + Cali (`02`).

**Nota lote 2026-07-09 (neutralización labial):** 6 jpeg en carpeta + 2 collages en chat. Elegida la del close-up de resultado (`13.56.56.jpeg`) — encaja con el servicio y recorta mejor en 4:3. Reserva: collages antes/después con texto «Neutralización» (`collage-neutralizacion-texto.png`).

**Nota 2026-07-09 (depilación piernas):** 1 foto. Aplicación de cera en pierna — encaja con **Depilación de media pierna** (`depilacion-media-pierna`, solo Colombia).

**Nota 2026-07-09 (depilación cejas):** 1 foto. Muestra **cera** → asignada a `depilacion-cejas-cera`. Para `depilacion-cejas-cuchilla` reutilizamos de momento la misma (cliente pasó un solo ítem); ideal pedir foto con cuchilla si quieren diferenciarlas en web.

**Nota 2026-07-12 (decisión clienta):** cuchilla = 🚫 **sin foto** (solo texto), en todos los mercados. `serviceMediaIds["depilacion-cejas-cuchilla"] = null` (sin fallback a categoría). Ver `docs/cliente/mejoras-reunion-2026-07-12/03-cuchilla-sin-foto.md`.

**Nota 2026-07-09 (depilación nariz):** 1 foto. Depilación nasal con cera — clara y profesional, buena para marco 4:3.

**Nota 2026-07-09 (depilación bigote):** 1 foto. Cera en labio superior — encaja con `depilacion-bigote-bozo` (ES/CO).

**Nota 2026-07-09 (hidratación labios):** 1 foto. Antes/después «1ª sesión HidraLips» — asignada a `hidralips-una-sesion` y reutilizada en `hidralips-tres-sesiones`. Es **screenshot de galería** (barra móvil + miniaturas): al subir a web habrá que **recortar** solo la parte del antes/después.

**Nota 2026-07-09 (laminado cejas):** 3 fotos. Elegida la del resultado con **fondo oscuro** (cejas peinadas hacia arriba, logo visible). Reserva: collage antes/después «Laminado + henna + depilación» (`03`) — describe bien el servicio completo pero recorta peor en 4:3.

**Nota 2026-07-09 (cejas híbridas):** 3 fotos (todas collages antes/después). Elegida `(1).jpeg` — se ve bien la técnica híbrida (pelo a pelo + sombreado) + logo. Al subir a web valorar **recorte** al panel «después» para marco 4:3.

**Nota 2026-07-09 (depilación axilas):** 1 foto. Aplicación de cera en axila — clara y profesional (ES/CO).

**Nota 2026-07-09 (efecto polvo):** 2 fotos. Elegida la del **cicatrizado** con sombreado suave + logo (`02`) — mejor resultado para web. Reserva: vista invertida recién hecho (`01`). Al subir, valorar recorte del texto inferior si estorba en 4:3.

**Nota 2026-07-09 (línea de ojos):** 1 foto. Close-up del delineado superior en la línea de pestañas — muy claro para el servicio (ES/CO/CH).

**Nota 2026-07-09 (relleno de pestañas):** 3 fotos en lote. **Elegida:** `03` horizontal (después a la izquierda, antes a la derecha) — sin barra de estado ni texto «Valencia». Reservas: `01` vertical ojo marrón; `02` vertical con UI móvil + ubicación. Al implementar, valorar recorte al panel «después» si el marco 4:3 pide una sola toma (ES/CO/CH).

**Nota 2026-07-09 (corrección de cejas):** 1 foto. Antes/después vertical: arriba cejas previas desvaídas (tono violáceo), abajo corrección rediseñada + logo. Panel «después» incluye guante y dedo señalando — al implementar, valorar recorte si estorba en 4:3. **Solo ES/Europa.**

**Nota 2026-07-09 (extensiones):** Collage con **9 sets** (no 11). Faltan en imagen los 2 **por punto** del PDF (sección Pestañas, no Extensiones). Celda 3,3 etiquetada «inglés 5D» = **`volumen-griego-5d`** (confirmado clienta). Al implementar: recortar 9 círculos; por punto reutiliza recorte de set similar (ver QA extensiones).

---

## QA implementación — servicio por servicio (simulación completa)

**Objetivo:** que cada foto quede **perfecta** dentro del marco actual del detalle (`aspect-[4/3]`, `rounded-2xl`, `border-primary/15`, `object-cover`, `sizes="(min-width: 1024px) 34vw, 92vw"`).

### Pipeline global (cómo lo haría en bloque)

```text
docs/cliente/fotos-servicios-2026/{id}/   ← original cliente (backup, no tocar)
        ↓
   Preproceso manual o script (recorte UI, panel «después», grid 3×3)
        ↓
   Export WebP 1600×1200 px (4:3) · calidad ~85 · sin metadata GPS
        ↓
   public/images/servicios/{id}.webp
        ↓
   media.ts + mediaId en services.ts + alt ES/EN
        ↓
   QA Playwright / MCP: 390 · 768 · 1024 · 1440 · ES + EN
```

**Reglas de oro**

| Regla | Detalle |
|-------|---------|
| Marco web | Siempre **4:3 horizontal** en detalle (no cambiar el componente en V1) |
| Fuente vertical | Pre-exportar a **4:3** centrando el sujeto; no confiar solo en `object-cover` |
| Fuente horizontal A/D | **Un solo panel** (casi siempre «después»); nunca dejar dos ojos partidos en el marco |
| Screenshot móvil | Recortar **antes** de exportar: sin barra de estado, sin miniaturas, sin bordes negros |
| Texto embebido | Quitar bandas de copy si compiten con el H1; logo Cejas Internacionales **sí** puede quedar |
| Peso | Objetivo &lt; 180 KB por WebP; LCP del hero lateral |
| `object-position` | Solo en CSS si el export no basta; preferir crop en archivo |

**Simulación responsive (mismo asset, distinto viewport)**

| Ancho | Ancho imagen | Comportamiento |
|-------|--------------|----------------|
| 390 | ~92vw (~359 px) | Marco alto ~269 px; cualquier recorte mal hecho se nota aquí primero |
| 768 | ~92vw (~706 px) | Hero apilado; imagen encima del bloque de datos |
| 1024+ | ~34vw (~350–490 px) | Hero en columna lateral; menos altura visible |

**Tipos de tratamiento**

| Código | Significado |
|--------|-------------|
| **T1** | Close-up nativo → recorte suave a 4:3 |
| **T2** | Screenshot → eliminar UI móvil → 4:3 |
| **T3** | Antes/después **vertical** → panel «después» → 4:3 |
| **T4** | Antes/después **horizontal** → mitad «después» → 4:3 |
| **T5** | Collage / texto → recorte manual al resultado |
| **T6** | Grid 3×3 → celda individual → 4:3 |
| **T7** | Reutiliza otro asset |

---

### Cejas

| id | Tratamiento | Orientación origen | Acción de preproceso | Export 4:3 | Responsive / riesgo |
|----|-------------|-------------------|----------------------|------------|---------------------|
| `laminado-cejas` | **T1** | Vertical | Centrar cejas + logo; recortar laterales vacíos | 1600×1200, sujeto ~60% alto | ✅ Móvil OK. Fondo oscuro ayuda al marco |
| `sombreado-henna` | **T1** | Vertical retrato | Centrar cejas; evitar cortar frente | 1600×1200, `object-center` | ✅ Buena en 390 |
| `depilacion-cejas-cera` | **T1** | Horizontal procedimiento | Encuadrar ceja + cera; quitar exceso de mejilla | 1600×1200 | ✅ Acción clara en móvil |
| `depilacion-cejas-cuchilla` | **T7** | — | Mismo export que `depilacion-cejas-cera` hasta foto cuchilla | idem cera | ⚠️ Copy dice cuchilla; imagen muestra cera |

---

### Micropigmentación cejas

| id | Tratamiento | Orientación origen | Acción de preproceso | Export 4:3 | Responsive / riesgo |
|----|-------------|-------------------|----------------------|------------|---------------------|
| `efecto-polvo` | **T5** | Vertical + texto inferior | Recortar banda de texto; foco ceja cicatrizada + logo | 1600×1200, ceja en tercio superior | ⚠️ Verificar que no se corte logo en 390 |
| `efecto-maquillaje` | **T5** | Collage vertical | Recortar al panel de resultado; quitar titular «Micropigmentación…» si estorba | 1600×1200 | ⚠️ Requiere recorte fino manual |
| `cejas-hibridas` | **T3** | Collage vertical A/D | **Solo panel «después»** (híbrido + logo); descartar «antes» | 1600×1200 desde panel inferior | ✅ Mejor que dejar collage entero |
| `correccion-cejas` | **T3** | Vertical A/D | **Solo panel «después»**; recortar guante/dedo señalando del borde inferior | 1600×1200 | ⚠️ ES only; revisar que ceja no quede miniatura |

---

### Labios

| id | Tratamiento | Orientación origen | Acción de preproceso | Export 4:3 | Responsive / riesgo |
|----|-------------|-------------------|----------------------|------------|---------------------|
| `neutralizacion-labios` | **T1** | Vertical close-up | Centrar labios; mantener copy lateral solo si no tapa boca | 1600×1200 | ✅ Muy estable |
| `microlips` | **T1** | Vertical close-up | Centrar labios + logo; guantes OK como contexto | 1600×1200 | ✅ |
| `hidralips-una-sesion` | **T2+T4** | **Screenshot** horizontal | 1) Quitar barra estado + tira miniaturas · 2) Quedarse con par A/D central · 3) Mitad **después** (labios tratados) · 4) Export 4:3 | 1600×1200 | 🔴 Crítico en 390 — probar primero aquí |
| `hidralips-tres-sesiones` | **T7** | — | Mismo WebP que `hidralips-una-sesion` | idem | OK (misma foto acordada) |

---

### Mirada y pestañas

| id | Tratamiento | Orientación origen | Acción de preproceso | Export 4:3 | Responsive / riesgo |
|----|-------------|-------------------|----------------------|------------|---------------------|
| `linea-ojos` | **T1** | Horizontal ojo | Ojo centrado; línea de pestañas en tercio superior (`object-[center_42%]`) | 1600×1200 | ✅ Horizontal nativa = ideal para marco |
| `relleno-pestanas` | **T4** | Horizontal A/D | Mitad **izquierda = después** → recuadro cuadrado del ojo → canvas 4:3 | 1600×1200 | ✅ No usar vertical con UI Valencia |
| `lifting-pestanas` | **T5** | Vertical close-up | Mantener pestañas; texto «Duración hasta dos meses» — recortar si duplica copy de página | 1600×1200 | ✅ Reserva `03` vertical A/D solo si recortamos panel después |

---

### Depilación corporal

| id | Tratamiento | Orientación origen | Acción de preproceso | Export 4:3 | Responsive / riesgo |
|----|-------------|-------------------|----------------------|------------|---------------------|
| `depilacion-axilas` | **T1** | Cuadrada / vertical | Centrar axila + mano con cera | 1600×1200 | ✅ |
| `depilacion-bigote-bozo` | **T1** | Close-up labio | Centrar bigote; poco margen superior | 1600×1200 | ✅ |
| `depilacion-nariz` | **T1** | Close-up nariz | Centrar fosa / aplicación cera | 1600×1200 | ✅ |
| `depilacion-media-pierna` | **T1** | Vertical pierna | Centrar zona media pierna + cera; evitar cortar rodilla | 1600×1200 | ✅ CO only |

---

### Extensiones de pestañas (Colombia)

| id | Tratamiento | Celda / origen | Acción | Export | Notas |
|----|-------------|----------------|--------|--------|-------|
| `set-rimel` … `volumen-griego-5d` (9) | **T6** | Collage 3×3 | Recortar círculo del ojo **sin** etiqueta rosa; reencuadrar 4:3 sobre el ojo | `{id}.webp` 1600×1200 | Celda 3,3 = griego 5D aunque diga «inglés» |
| `por-punto-efecto-volumen` | **T7** | — | Copiar export de `volumen-ruso-2d` | idem ruso | Técnica distinta; aceptable hasta foto propia |
| `por-punto-mega-volumen` | **T7** | — | Copiar export de `mega-volumen` | idem mega | idem |

---

### Sin foto (confirmado)

Refuerzos (4), uñas (13), peinados/maquillaje (3): detalle **sin** bloque imagen; no placeholder roto.

---

### Orden de implementación sugerido (menor riesgo → mayor)

1. **T1 listos:** línea ojos, microlips, neutralización, depilaciones, laminado, sombreado henna  
2. **T4/T3:** relleno pestañas, cejas híbridas, corrección cejas  
3. **T5:** efecto polvo, efecto maquillaje, lifting  
4. **T2:** HidraLips (el más delicado)  
5. **T6:** 9 extensiones + fallback por punto  
6. **T7:** cuchilla, hidralips 3 sesiones  

---

### Checklist QA por servicio (al terminar cada export)

- [ ] Archivo exactamente **4:3** (no depender de recorte agresivo en CSS)
- [ ] Sujeto principal visible al **100% en 390 px** de ancho
- [ ] Sin UI de móvil, bordes negros ni miniaturas de galería
- [ ] Sin dos mitades antes/después visibles a la vez
- [ ] Alt ES y EN nombran el **servicio concreto**
- [ ] JSON-LD `Service` apunta al `publicPath` nuevo
- [ ] Mismo servicio en ES/EN/CO/CH muestra **la misma** foto (salvo servicios solo-CO)
- [ ] Lighthouse: imagen &lt; 180 KB si es posible

---

## Estado implementación

- [x] Lista de servicios cruzada con catálogo (jul 2026)
- [x] Reglas: refuerzos / uñas / peinados / extensiones
- [x] QA diseño actual documentado
- [x] Fotos recibidas en repo (`docs/cliente/fotos-servicios-2026/`)
- [x] QA implementación servicio por servicio documentado
- [x] `mediaId` por servicio en datos (`serviceMediaIds` en `src/content/media.ts` + `getServiceMediaAsset` en queries; validado en `validators.ts`)
- [x] Assets en `public/images/servicios/` (26 WebP, 8–98 KB, recortes ~4:3 vía `scripts/process-service-photos.mjs`)
- [x] Fotos de reserva añadidas a la galería de resultados (9 assets `gallery` en `public/images/resultados/`)
- [x] QA visual pasado (build OK, lint/typecheck OK, capturas 390/1440 en detalle HidraLips, relleno, corrección, set 5D y resultados)

### Notas de la implementación (2026-07-10)

- Cuchilla reutiliza el WebP de cera; HidraLips 1 y 3 sesiones comparten foto; por punto reutilizan ruso 2D / mega volumen; refuerzos híbridas/microlips/línea de ojos apuntan a la foto del servicio principal; el resto de refuerzos y uñas/peinados usan el fallback de categoría existente.
- Los 9 sets de extensiones se recortaron del collage 3×3 (celda 128×96 reescalada a 576×432); calidad limitada por el original — si la clienta pasa fotos individuales, basta reemplazar el WebP.
- Reservas en galería: lifting A/D, laminado collage + close-up, microlips grid + dúo, neutralización A/D, henna collage, efecto polvo procedimiento, relleno A/D vertical.
