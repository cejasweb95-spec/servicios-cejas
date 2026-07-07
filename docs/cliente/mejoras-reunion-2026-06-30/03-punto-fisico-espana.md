# 03 — Nuevo punto físico en España

## Lo que dijo la cliente

> "España ya voy a tener punto físico... Ya sería mandarte la dirección. Y las fotos, ¿cierto?"
> "Como solo hay un punto físico y ahora va a haber dos, entonces yo ya lo organizo."
> "La sede principal... la que has trabajado más [Cali] se puede poner de principal y luego esta [España] cuando vaya creciendo."
> Sobre el letrero: "el letrero es interno, porque la cabina está dentro de otro negocio".

## Qué hacer

1. Recibir de la cliente: **nombre del local, dirección completa, teléfono, fotos** (la cabina está dentro de otro negocio; las fotos serán del interior).
2. Modelar el segundo punto físico en la capa de datos (locations), no hardcodear en componentes.
3. Reestructurar la sección de punto físico (home y/o página de ubicaciones) para soportar **dos sedes**:
   - Cali, Colombia → **sede principal**.
   - España (Puerto de Sagunto) → segunda sede.
4. Elegir con la cliente la foto de portada del bloque de España.
5. Añadir el punto al mapa "dónde me encuentras" si aplica.
6. Contenido ES + EN a la vez.

## Restricciones importantes

- La dirección **legal** del sitio sigue siendo solo Cali, Colombia. Puerto de Sagunto es punto de atención, no domicilio legal.
- Schema/LocalBusiness solo con datos confirmados.

## Opciones evaluadas

| Opción | Enfoque | Decisión |
|--------|---------|----------|
| A | Solo cambiar `type` en datos; UI mínima | Descartada: no cubre bloque home de dos sedes |
| B | `physical_studio` + `studioRole` + `mediaId` en `locations.ts`; home y mapa dinámicos | **Aplicada** |
| C | Página `/espana` dedicada | Descartada: duplica mapa y jornadas |

## Implementación (03/07/2026)

- `locations.ts`: Puerto de Sagunto → `physical_studio`, `studioRole: secondary`, dirección Carrer Catalunya 24.
- `events.ts`: eliminado de jornadas por disponibilidad.
- Fotos en `public/images/estudio/puerto-sagunto/` (portada + interiores).
- Home `#punto-fisico`: grid con Cali (principal) y Puerto de Sagunto.
- Copy ES/EN + mercado España actualizados en mapa, jornadas, sobre mí y meta.
- JSON-LD: dos nodos `BeautySalon` (Cali + Puerto de Sagunto).

## QA

- [x] Dos sedes visibles y bien diferenciadas, Cali marcada como principal.
- [x] WhatsApp del bloque España apunta al número de España (`34603804837`).
- [x] ES y EN completos.
- [x] Schema con dos sedes físicas confirmadas.

## Estado

- [x] Datos recibidos
- [x] Implementado
- [x] QA pasado
