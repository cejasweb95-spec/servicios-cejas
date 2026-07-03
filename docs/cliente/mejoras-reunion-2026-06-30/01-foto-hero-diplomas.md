# 01 — Foto del hero: usar la foto con los diplomas

## Lo que dijo la cliente

> "Aquí esa foto me gusta, pero mira que por acá hay una más bonita, donde estoy con unos diplomas... Esta me gustaría de inicio. Porque la primera que está es la del mundo."

## Qué hacer

1. Recibir de la cliente la foto donde aparece con los diplomas (quedó en mandar captura de pantalla para identificarla y luego el archivo original si hace falta).
2. Optimizar el asset según `docs/cliente/` → pipeline de imágenes (WebP/AVIF, dimensiones estables, alt ES/EN).
3. Reemplazar la imagen actual del hero de la home (la foto "del mundo") por la de los diplomas.
4. Conservar la foto del mundo: se reutiliza en "Sobre mí" (ver mejora 02).
5. Actualizar alt text en español e inglés, y la imagen OG si el hero alimenta el Open Graph.

## Dependencias

- ⏳ Foto de los diplomas enviada por la cliente.
- Encadena con la mejora 02 (la foto del mundo pasa a "Sobre mí").

## QA

- [ ] Hero correcto en 390 / 430 / 768 / 1024 / 1440 / 1920.
- [ ] LCP sin regresión (imagen con `priority` y dimensiones estables).
- [ ] Alt ES y EN.
- [ ] Sin CLS al cargar.

## Estado

- [ ] Foto recibida
- [ ] Implementado
- [ ] QA pasado
