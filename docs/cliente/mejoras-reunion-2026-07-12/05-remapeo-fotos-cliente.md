# 05 — Re-mapeo servicio → foto (lote renombrado de la clienta)

## Lo que dijo la cliente

> «El relleno de pestañas… yo las intercalé. Espero yo que las vuelvo a mandar con el nombre que es.»

> «Si usted me especifica… yo para mí son todas pestañas, son todas cejas…»

> «En la línea de ojos… yo te mando la línea de ojos.»

## Análisis

- El mapeo masivo jul 2026 (`serviceMediaIds` en `media.ts`) es propenso a errores cuando los archivos no llevan el **id del servicio** en el nombre.
- La cliente reconoce que mezcló fotos; enviará lote **renombrado** con el nombre correcto de cada servicio.
- **No implementar** cambios de mapeo a ciegas hasta recibir ese lote.

## Qué hacer (cuando llegue el material)

1. Recibir carpeta o mensaje con formato acordado (ver abajo).
2. Por cada fila: validar que `id` existe en `src/content/services.ts`.
3. Sustituir backup en `docs/cliente/fotos-servicios-2026/{id}/`.
4. Re-procesar con `scripts/process-service-photos.mjs` (si sigue vigente) o pipeline de `docs/cliente/mejoras-reunion-2026-06-30/07-fotos-servicios-mapeo.md`.
5. Actualizar `serviceMediaIds` y `mediaAssets` en `media.ts`.
6. Ajustar `objectPosition` y alt ES/EN.
7. QA servicio por servicio (checklist del MD 07 de junio).

## Formato ideal del lote de la clienta

```
Servicio: Relleno de pestañas
id web: relleno-pestanas
Archivo: relleno-pestanas.jpg
Mercado: Todos
```

O archivos nombrados exactamente como el id: `relleno-pestanas.webp`, `linea-ojos.webp`, etc.

## Servicios con alta probabilidad de re-mapeo (según llamada)

| id web | Nota de la llamada |
|--------|-------------------|
| `relleno-pestanas` | Foto intercalada / cortada |
| `linea-ojos` | Enviará foto nueva |
| `lifting-pestanas` | Verificar vs curso laminado |
| Otros | Revisar cuando llegue la lista completa |

## Dependencias

- ⏳ **Bloqueada** hasta que la clienta envíe el lote renombrado.

## QA (al implementar)

- [ ] Cada `id` apunta al archivo correcto
- [ ] Misma foto no asignada a dos servicios distintos por error
- [ ] Detalle ES + EN de cada servicio cambiado
- [ ] Responsive 390 / 768 / 1024 / 1440
- [ ] Build + validators sin errores

## Estado

- [ ] Lote renombrado recibido de la clienta
- [ ] Mapeo cruzado con catálogo
- [ ] Assets procesados y subidos
- [ ] `media.ts` actualizado
- [ ] QA pasado
