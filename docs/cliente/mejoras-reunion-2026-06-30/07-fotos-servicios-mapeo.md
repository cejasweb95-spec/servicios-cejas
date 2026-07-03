# 07 — Fotos de servicios: mapeo definitivo servicio → foto

## Lo que se acordó

> Jeffrey: "Si quieres cambiar fotos, porque quizás tú tengas alguna mejor de algún servicio, me dices."
> Cliente: "Yo creo que te voy a mandar específicamente todos los servicios otra vez: el título, servicio tal, foto tal."
> (Contexto de la reunión anterior del 23/06: "hay algunos servicios que la foto no corresponde con lo que pusiste".)

## Qué hacer

1. Recibir de la cliente la lista completa: **título del servicio + foto correspondiente**, para todos los servicios.
2. Cruzar la lista con el catálogo actual de la capa de datos (servicios por mercado: COP/EUR/CHF).
3. Reemplazar cada foto en assets optimizados (WebP/AVIF) con nombres de archivo descriptivos.
4. Actualizar alt text ES/EN de cada servicio.
5. Verificar que ningún servicio quede con foto de otro servicio y que no se mezclen servicios entre mercados.

## Hallazgos previos (auditoría del 03/07/2026, mejora 08)

- `result-pestanas-01` (`public/images/resultados/result-pestanas-01.jpg`, fuente `es_pag7_1.jpg`) muestra **labios**, no pestañas, aunque su id sugiere pestañas. Corregir id/asignación cuando llegue la lista de la cliente.

## Dependencias

- ⏳ Lista servicio→foto de la cliente ("te voy a mandar específicamente todos los servicios otra vez").

## QA

- [ ] Cada tarjeta/detalle de servicio muestra su foto correcta en los tres mercados.
- [ ] Alt ES/EN por servicio.
- [ ] Revisión visual en 390 y 1440.

## Estado

- [ ] Lista recibida
- [ ] Implementado
- [ ] QA pasado
