# 09 — Servicios señalados en la llamada (encuadre y mapeo)

## Resumen

Lista consolidada de servicios que la cliente mencionó **explícitamente** en la revisión del 12/07. Usar como checklist de QA visual prioritario junto con [04](./04-centrado-fotos-servicios.md) y [05](./05-remapeo-fotos-cliente.md).

---

## Tabla de seguimiento

| id web | Nombre | Problema en llamada | Acción | Depende de cliente |
|--------|--------|---------------------|--------|-------------------|
| `depilacion-cejas-cuchilla` | Depilación cejas con cuchilla | Quitar foto; solo texto | [MD 03](./03-cuchilla-sin-foto.md) | No |
| `neutralizacion-labios` | Neutralización labial | Centrar labio completo | `object-position` o re-crop | No |
| `relleno-pestanas` | Relleno de pestañas | Foto equivocada / cortada | Re-mapeo + encuadre | Sí (lote renombrado) |
| `linea-ojos` | Línea de ojos | Foto incorrecta; enviará nueva | Re-mapeo cuando llegue archivo | Sí |
| `efecto-polvo` | Efecto polvo / cicatrizado | Casi no se ve el resultado | Acercar ceja; quitar texto inferior | No |
| `lifting-pestanas` | Lifting de pestañas (servicio) | Posible confusión con curso | Verificar asset vs curso | Parcial |
| `laminado-cejas` | Laminado (servicio) | — | Verificar si distinto del curso | No |
| Sets extensiones (×9) | Extensiones CO | Collage 9 vs 11 | [MD 06](./06-extensiones-collage-fallback.md) | Opcional |
| `hidralips-una-sesion` | HidraLips | Calidad / screenshot | Recorte UI en export | No |

---

## Foto con mancha negra en pared

> «A esa foto le borré ese cosito negro en el fondo de la pared… quedó mejor.»

- Relacionado con mejora **06** de reunión 30/06 (`mejoras-reunion-2026-06-30/06-fotos-a-reemplazar.md`).
- Si la clienta ya pasó archivo corregido, verificar que está en `public/` y actualizar `media.ts`.
- Si no, pedir confirmación de **qué pantalla** era (captura).
- **2026-07-16:** ya aplicado antes de esta sesión — commit `afe1f09` «Actualiza la foto retocada del panel de resultados en pared». Nada pendiente.

---

## Procedimiento QA por servicio

Para cada fila de la tabla:

1. Abrir detalle ES en **390 px** de ancho.
2. Comprobar: sujeto visible, sin rosewash encima, alt correcto.
3. Repetir EN y 1024 px.
4. Marcar ✅ en esta tabla al cerrar.

---

## Estado

| Servicio | ES 390 | EN 390 | Desktop | Notas |
|----------|--------|--------|---------|-------|
| cuchilla | ✅ | ✅ | ✅ | Sin foto (MD 03) |
| neutralización | ✅ | ✅ | ✅ | Re-export centrado en labios, sin logo/texto |
| relleno pestañas | ✅ | ✅ | ✅ | Intercambio 16/07 (Jeffrey): ahora usa el macro de pestañas densas que estaba en línea de ojos (`linea-ojos-original.png`) |
| línea ojos | ✅ | ✅ | ✅ | Intercambio 16/07 (Jeffrey): ahora usa el antes/después vertical con los dos ojos (`01-antes-despues-linea-pestanas.png`), verificado con test chromium |
| efecto polvo | ✅ | ✅ | ✅ | Re-export rotado y acercado a la ceja, sin banda de texto |
| lifting pestañas | ✅ | ✅ | ✅ | Asset de servicio distinto del curso (verificado) |
| extensiones | ✅ | ✅ | ✅ | Panel completo para los 11 (MD 06) |
| hidralips | ✅ | ✅ | ✅ | Mejor recorte posible del screenshot; calidad limitada por la fuente — pedir foto original |
