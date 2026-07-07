# 02 — Sobre mí: sustituir la foto con fondo raro por la del mundo

## Lo que dijo la cliente

> "Aquí hice como que 'sobre mí', esta foto no sé por qué se ve así como con el fondo raro."
> "Ahí sabes qué puedes poner: la del mundo, la que vas a quitar del inicio." — "En 'sobre Xiomara' coloco la foto del mundo que quitamos de la home. Sí."

## Qué hacer

1. Localizar en la página "Sobre mí" / "Sobre Xiomara" la foto que se ve con el fondo raro.
2. Sustituirla por la foto del mundo que actualmente está en el hero de la home (se libera al aplicar la mejora 01).
3. Revisar recorte/encuadre para el contenedor de "Sobre mí" (proporción distinta al hero).
4. Actualizar alt text ES/EN.

## Dependencias

- Depende de la mejora 01 (la foto del mundo sale del hero). ✅ Completada.

## Implementación (03/07/2026)

- Retrato del `PageHero` en Sobre Xiomara: `xiomara-retrato-mundo` (`/images/xiomara/xiomara-retrato-mundo.jpg`).
- Encuadre `object-[center_22%]` en contenedor 4:5.
- Contacto sigue con `xiomara-retrato-rosa` (fuera del alcance explícito de la cliente).

## QA

- [x] La foto con fondo raro ya no aparece en Sobre Xiomara.
- [x] Encuadre correcto en móvil y desktop.
- [x] Alt ES y EN (asset `xiomara-retrato-mundo`).

## Estado

- [x] Implementado
- [x] QA pasado
