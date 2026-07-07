# 11 — Redes sociales: confirmar y enlazar las tres

## Lo que se habló

> Jeffrey: "Y las redes sociales también: TikTok, Instagram y las tres que usted me diga al final."
> Cliente: "Ah, sí, las tres."

## Qué hacer

1. Confirmar con la cliente las **tres** redes y sus URLs exactas (TikTok e Instagram mencionadas; falta confirmar la tercera —posiblemente Facebook— y qué perfil usar si hay varios por país).
2. Modelar los enlaces en la capa de datos (no hardcodear URLs en componentes).
3. Mostrar los iconos/enlaces en el footer (y donde el diseño lo prevea), con `aria-label` ES/EN y `rel="noopener"`.
4. Verificar que los enlaces abren el perfil correcto en móvil (deep link a la app cuando aplique es un plus, no un requisito).

## Implementación parcial (07/07/2026)

- Las tres redes ya están en `social-links.ts`: Instagram, Facebook, TikTok.
- URLs canónicas actualizadas (Facebook `profile.php?id=…`, TikTok sin parámetros de tracking).
- Coherentes con `docs/cliente/seo-local-organico/GOOGLE-MAPS-PUERTO-SAGUNTO.md`.

## Dependencias

- ⏳ Confirmación explícita de la cliente de que estas son las tres URLs definitivas.

## QA

- [x] Tres enlaces funcionan y apuntan a perfiles canónicos.
- [x] Accesibles por teclado, con foco visible y `aria-label` en ambos idiomas.
- [x] Presentes en ES y EN.

## Estado

- [x] URLs actualizadas en datos
- [x] Implementado en footer
- [ ] Confirmación final de la cliente
- [x] QA pasado
