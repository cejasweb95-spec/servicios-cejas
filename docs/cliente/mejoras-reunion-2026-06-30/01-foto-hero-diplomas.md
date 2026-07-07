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

- Encadena con la mejora 02 (la foto del mundo pasa a "Sobre mí").

## Implementación (03/07/2026)

- Hero home: `xiomara-sesion-profesional-07` → `/images/xiomara/xiomara-hero-home.jpg` (mismo material que `xiomara-certificaciones-estudio`).
- Foto del mundo preservada en asset `xiomara-retrato-mundo` → `/images/xiomara/xiomara-retrato-mundo.jpg` (pendiente de usar en mejora 02).
- Alt ES/EN del hero actualizado; encuadre `object-[center_28%]` en `HomeHero`.

## QA

- [x] Hero correcto en 390 / 430 / 768 / 1024 / 1440 / 1920.
- [x] LCP sin regresión (imagen con `priority` y dimensiones estables).
- [x] Alt ES y EN.
- [x] Sin CLS al cargar.

## Estado

- [x] Foto recibida (asset existente `07` confirmado por Jeffrey)
- [x] Implementado
- [x] QA pasado
