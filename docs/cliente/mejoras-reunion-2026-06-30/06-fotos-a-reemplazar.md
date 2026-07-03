# 06 — Reemplazo de fotos observadas en la llamada

## Lo que dijo la cliente

Foto con sombra:

> "Esta foto mira que no me gusta tanto, porque se le ve como una sombra atrás, en la pared... Entonces cambiarla por otra, yo te mando otra para que la puedas poner ahí."

Foto que hay que recentrar o cambiar:

> "Esta foto ahí es mucha, yo creo que hay que modificarla. Moverla como un poquito, o centrarla, o si no te mando otra... la que destaque el pro de mi servicio."

Foto de portada del bloque España:

> "Me dices la foto que quieres de portada de España... Y la de Suiza seguimos con esa, sí, igual."

## Qué hacer

1. Identificar en la web las dos fotos señaladas (la de la sombra en la pared y la que hay que recentrar). Nota: la transcripción es de una llamada con pantalla compartida, así que conviene confirmar con la cliente por WhatsApp cuáles son exactamente (mandarle capturas para validar).
2. Mientras llegan las fotos nuevas, probar el ajuste de encuadre (`object-position`/recorte) en la foto "que es mucha".
3. Al recibir las fotos nuevas: optimizar (WebP/AVIF, tamaños), reemplazar y actualizar alt ES/EN.
4. Portada de España: la elige la cliente junto con las fotos del local (mejora 03).
5. Suiza: **no cambiar** la foto actual (confirmada).

## Dependencias

- ⏳ Fotos nuevas de la cliente (quedó en mandar "todas las fotos" junto con la dirección de España).

## QA

- [ ] Fotos nuevas sin sombras/artefactos, bien encuadradas en móvil y desktop.
- [ ] Alt ES y EN actualizados.
- [ ] Sin regresión de peso de página (formatos y tamaños optimizados).

## Estado

- [ ] Fotos identificadas y confirmadas con la cliente
- [ ] Fotos nuevas recibidas
- [ ] Implementado
- [ ] QA pasado
