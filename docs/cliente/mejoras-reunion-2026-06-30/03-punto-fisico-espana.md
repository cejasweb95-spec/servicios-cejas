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
   - España (Puerto de Sagunto, a confirmar) → segunda sede.
4. Elegir con la cliente la foto de portada del bloque de España.
5. Añadir el punto al mapa "dónde me encuentras" si aplica.
6. Contenido ES + EN a la vez.

## Restricciones importantes

- **No inventar la dirección**: hasta que la cliente la envíe, no publicar nada de España como dirección física/legal.
- La dirección **legal** del sitio sigue siendo solo Cali, Colombia (regla de proyecto). El punto de España es un punto de atención, no domicilio legal, salvo que Jeffrey decida lo contrario.
- Schema/LocalBusiness solo con datos confirmados.

## Dependencias

- ⏳ Dirección, nombre, teléfono y fotos del local de España.
- Relacionada con la mejora 05 (ficha en Google Business Profile) y la 09 (SEO local).

## QA

- [ ] Dos sedes visibles y bien diferenciadas, Cali marcada como principal.
- [ ] WhatsApp del bloque España apunta al número de España (`34603804837`).
- [ ] ES y EN completos.
- [ ] Schema válido (Rich Results Test) si se añade.

## Estado

- [ ] Datos recibidos
- [ ] Implementado
- [ ] QA pasado
