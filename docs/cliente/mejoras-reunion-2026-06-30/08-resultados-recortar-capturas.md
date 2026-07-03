# 08 — Galería de resultados: recortar las capturas de Instagram

## Lo que dijo la cliente

> "Está bien, solo faltaría recortarlo, o sea, esas [fotos] que están como muy largas, recortarlas."
> "Solamente recortar las escritas, para que no parezca captura."
> "Y cualquiera que quiera añadir como nueva, cuando yo quiera te digo 'coloqué esta nueva que me quedó perfecta para la web'."

## Qué hacer

1. Auditar la galería de resultados actual e identificar las imágenes que:
   - Son muy alargadas (proporción de captura de móvil).
   - Tienen texto/overlays de Instagram (interfaz, stickers, texto escrito).
2. Recortar esas imágenes para quedarse solo con el resultado (antes/después), sin restos de interfaz ni texto, con proporciones consistentes en la galería.
3. Reexportar optimizadas (WebP/AVIF) y sustituir los assets.
4. Mantener el resto de fotos aprobadas tal cual ("está bien").
5. Dejar el flujo listo para añadir nuevas fotos de resultados cuando la cliente las envíe (datos tipados, no hardcode).

## Dependencias

- Ninguna: se puede hacer ya con los assets existentes.

## QA

- [x] Ninguna imagen de la galería muestra interfaz de Instagram ni texto de captura.
- [x] Proporciones consistentes, sin CLS en el lightbox/galería (dimensiones actualizadas en `src/content/media.ts`).
- [x] Peso de imágenes optimizado (JPEG calidad 88, todas < 210 KB).
- [x] Alt ES/EN conservados.

## Estado

- [x] Auditoría hecha
- [x] Recortes aplicados
- [x] QA pasado

## Resultado de la aplicación (03/07/2026)

Auditadas las 15 imágenes de `public/images/resultados/`. Recortadas 6 con el script `scripts/crop-resultados-2026-07-03.ps1` (los originales siguen en `docs/cliente/assets-extraidos/`):

| Imagen | Qué se quitó | Nuevo tamaño |
|--------|--------------|--------------|
| `result-cejas-01` | Badge "1/8" y texto inferior de la publicación | 1000×1015 |
| `result-cejas-02` | Texto de story "Tono baja 40%..." | 1000×1555 |
| `result-cejas-06` | Captura completa de iPhone: barra de estado, caja de texto y tira de miniaturas | 903×1320 |
| `result-cicatrizado-cejas` | Barra de estado, miniaturas y caption; se conservó el círculo "Antes" (contenido antes/después) | 870×1285 |
| `result-mirada-02` | Sticker "Palma de Mallorca" y emojis; se conservó la mitad inferior (resultado después) | 1000×908 |
| `result-labios-02` | Línea azul superior e icono de mute de vídeo | 1000×1080 |

Las 9 restantes estaban limpias (los watermarks del logo de Cejas Internacionales se conservan por ser marca propia). Verificado en navegador (`/es/resultados`) y con E2E (`vertical-slice` + `foundation`, 19/19 en chromium-desktop), lint y typecheck.

Hallazgo para la mejora 07: `result-pestanas-01` (fuente `es_pag7_1.jpg`) muestra labios, no pestañas; su alt ya dice "micropigmentación labial". Incluirla en el mapeo definitivo servicio→foto.
