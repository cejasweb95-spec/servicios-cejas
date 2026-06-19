# Próxima sesión — Pase visual PREMIUM con Framer Motion

Brief de arranque para retomar en sesión fresca. Objetivo: impacto visual TOP/premium
en toda la web con motion, **sin romper** reglas de marca, SEO ni PageSpeed.

## Estado actual (rama `develop`, todo commiteado)
- App Next.js sana: `typecheck`, `lint` y `build` de producción en verde.
- Hero de la home: nueva foto de estudio (fondo cálido).
- Galería de resultados: 10 fotos reales con lightbox.
- **Mapa mundial punteado** (`/images/mapa/mapa-mundial-puntos.svg`) con marcadores en
  coordenadas geográficas REALES (equirectangular) + líneas guía para el cluster europeo.
  Está en `/jornadas` y en la **home**. Componente: `src/components/domain/event-map.tsx`.
- Footer con iconos de marca (WhatsApp, IG, FB, TikTok) — `src/components/icons/brand-icons.tsx`.
- Formaciones/cursos y certificaciones: upgrade de ChatGPT ya integrado.

## Qué hacer (página por página, con `nextjs-framer-motion-animations`)
1. **Home** — entrada en escena del hero (texto + foto), parallax sutil, reveals diferenciados por sección (no todas igual). Animar el mapa: puntos aparecen + líneas se dibujan (ya hay base con `pathLength`).
2. **Servicios / detalle** — stagger de tarjetas, microinteracción en precio/chips, hover premium.
3. **Formaciones / curso** — entrada de tarjetas + temario animado.
4. **Resultados** — reveal escalonado de la galería + pulir lightbox.
5. **Sobre Xiomara** — narrativa con reveals + foto de certificaciones.
6. **Jornadas** — pulir animación del mapa.
7. **Contacto** — opciones con microinteracción.
8. **Header/Footer** — microinteracciones.

## Reglas que NO romper (de `cejas-internacionales-guardrails`)
- `MotionConfig reducedMotion="user"`; respetar `prefers-reduced-motion`.
- Motion solo en Client Components hoja; no bloquear SSR; HTML crawlable para SEO.
- Animar opacity/transform; nada de layout-heavy. Mantener LCP/CLS sanos.
- Paleta palo de rosa/blanco/negro. Sin gradient text, orbs/blobs, ni hex crudos en componentes.
- **Sin** "repeated eyebrow labels" en cada sección (ya se revirtió ese intento).
- Seguir `docs/cliente/implementacion-fases/MOTION-ANIMACIONES-POR-PAGINA.md`.

## Decisiones pendientes del usuario
- **Header desktop**: no le gusta (8 ítems: Inicio, Servicios, Formaciones, Jornadas,
  Resultados, Sobre Xiomara, Contacto, Descargas). Definir cuáles agrupar/quitar
  (sugerencia: mover "Descargas" al footer; agrupar "Resultados/Sobre" si procede).

## Cómo verificar
- `npm run dev` (preview), revisar mobile-first + 390/768/1440.
- `npm run typecheck && npm run lint && npm run build` antes de cerrar.
- El repo es PÚBLICO: el usuario lo pondrá en privado antes de hacer `push`.
