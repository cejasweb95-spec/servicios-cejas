# Testing y QA profesional — Cejas Internacionales

Última actualización: 17/06/2026.

Objetivo: definir pruebas técnicas, visuales, responsive, SEO, accesibilidad y de usuario final para que la web funcione correctamente antes de publicar.

Complemento obligatorio: `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md` define la matriz senior completa: smoke, regression, E2E, visual regression, trace viewer, WAVE/axe, Core Web Vitals, Lighthouse, link checker, i18n QA, security headers y post-publicacion.

Complemento legal/analytics: `docs/cliente/legal-privacidad-cookies-ga4.md` define GA4 con banner de cookies, Consent Mode, paginas legales ES/EN, SEO multi-pais y reglas hover/focus.

---

## 1. Skills a usar

- `cejas-internacionales-guardrails`
- `cross-browser-device-qa`
- `user-flow-e2e-testing`
- `core-web-vitals-performance`
- `cejas-i18n-localization`
- `accessibility`
- `responsive-design`
- `web-design-guidelines`
- `playwright`
- `seo-audit`
- `seo`

---

## 2. Pruebas técnicas base

Cuando exista app:

```txt
npm run lint
npm run typecheck
npm run build
npm run test
```

Si se usa pnpm:

```txt
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

### Errores típicos a capturar

- Errores TypeScript.
- Errores ESLint.
- Errores de Next build.
- Server/client boundary mal puesto.
- Uso de `window`/`document` en Server Components.
- Metadata en Client Components.
- Imágenes sin dimensiones.
- Imports rotos.
- Rutas dinámicas sin slug.
- Links 404.
- PDF no encontrado.
- WhatsApp URL mal formada.
- Textos que desbordan en móvil.
- Map/dialog/lightbox sin focus management.

---

## 3. Playwright E2E

### Flujos obligatorios

1. Home carga sin errores.
2. CTA `Contacta conmigo` abre selector WhatsApp.
3. Selector permite Colombia y España/Europa/Suiza.
4. WhatsApp Colombia apunta a `573167742299`.
5. WhatsApp España apunta a `34603804837`.
6. Navegación a Servicios.
7. Cambiar mercado Colombia/España/Suiza.
8. Servicios no mezclan mercados.
9. Descargar PDF catálogo.
10. Abrir detalle de servicio.
11. Abrir resultados/lightbox y cerrar.
12. Abrir Jornadas.
13. Interactuar con mapa y lista.
14. Ver Cali como sede y resto como jornadas.
15. Abrir Formaciones.
16. Descargar PDF curso.
17. Abrir móvil drawer y cerrar.
18. Back/forward del navegador conserva estado razonable.
19. Cambiar idioma ES/EN conserva pagina equivalente.
20. No hay mezcla de idiomas en labels, CTAs, metadata o estados.
21. Banner cookies permite aceptar, rechazar y configurar.
22. GA4 no carga al rechazar cookies analiticas.
23. GA4 queda permitido al aceptar cookies analiticas.
24. Cambiar preferencias desde footer funciona.

### Browsers

- Chromium.
- Firefox.
- WebKit.

### Viewports

- 390x844.
- 430x932.
- 768x1024.
- 1024x768.
- 1440x900.
- 1920x1080.

---

## 4. Accesibilidad

### Automático

- axe-core si está disponible.
- Playwright accessibility checks.
- Lighthouse Accessibility.
- WAVE manual en paginas principales.

### Manual

- Navegar solo con teclado.
- Ver focus visible.
- Cerrar Dialog/Drawer con Escape.
- El foco vuelve al botón que abrió el modal.
- Mapa tiene lista textual equivalente.
- Imágenes tienen alt text.
- Botones icon-only tienen label.
- Reducir motion funciona.
- La revision manual complementa los escaneos automaticos; axe/Lighthouse/WAVE no sustituyen una prueba real de teclado y foco.
- Hover no es la unica via para ver o activar contenido; existe focus/tap/click equivalente.

---

## 5. Responsive real

Revisar:

- No horizontal overflow.
- Header no tapa contenido.
- CTA móvil no tapa botones importantes.
- Botones no ocupan ancho completo salvo justificación.
- Tablas pasan a cards/listas.
- Galería mantiene proporciones.
- Mapa no queda ilegible.
- Textos largos caben:
  - `Puerto de Sagunto, Valencia`
  - `Micropigmentación y neutralización labial`
  - `España / Europa / Suiza`

---

## 6. Core Web Vitals / Lighthouse

Páginas a auditar:

- `/`
- `/servicios`
- `/servicios/colombia`
- `/servicios/espana-europa`
- `/servicios/suiza`
- `/jornadas`
- `/formaciones`
- `/contacto`

Objetivos:

- Performance mobile: 95+ si el hosting/assets lo permiten.
- SEO: 100.
- Accessibility: 100 o justificar excepciones.
- Best Practices: 100.
- LCP < 2.5s.
- CLS < 0.1.
- INP < 200ms.
- Lighthouse CI/local si se configura en el scaffold.

---

## 7. SEO QA técnico

Revisar:

- `robots.txt`.
- `sitemap.xml`.
- Canonical URLs.
- Metadata única.
- Open Graph.
- Twitter image.
- Favicon/icon/apple icon.
- Manifest.
- H1 único.
- Headings jerárquicos.
- Schema válido.
- No `noindex` accidental.
- No rutas rotas.
- PDFs indexables/descargables según decisión.
- Alternates/hreflang ES/EN existen en paginas publicas.
- Sitemap contiene URLs localizadas.

Herramientas:

- Lighthouse.
- PageSpeed Insights.
- Rich Results Test.
- Schema.org Validator.
- Search Console tras producción.
- Screaming Frog gratis hasta 500 URLs.

---

## 8. Link checker / archivos

Comprobar:

- Enlaces internos.
- Enlaces externos a redes.
- PDF catálogos.
- PDF cursos.
- WhatsApp links.
- Google Maps Cali.
- OpenGraph image existe.
- `favicon.ico`, `icon.png`, `apple-icon.png`.

---

## 9. Mapa animado

El mapa debe probarse como componente crítico.

### Comportamiento

- Cali aparece como sede física.
- Restrepo, Madrid, Palma de Mallorca, Puerto de Sagunto y Ginebra aparecen como próximas jornadas por disponibilidad.
- Click/tap en ciudad abre panel.
- Panel muestra CTA correcto.
- Reduced motion elimina animaciones no esenciales.
- Lista textual permite acceder a lo mismo que el mapa.

### Animación

- Pins con entrada suave.
- Arcos sutiles desde Cali.
- Sin scroll-jacking.
- Sin animaciones infinitas molestas.

---

## 10. Pruebas de usuario final

Simular estos escenarios:

1. Clienta de Cali quiere saber precio y contactar.
2. Clienta de Madrid quiere saber si hay jornada.
3. Clienta de Ginebra quiere ver precios CHF.
4. Alumna quiere curso de micropigmentación de cejas.
5. Usuaria quiere descargar catálogo.
6. Usuaria quiere enviar valoración por foto.
7. Usuaria en móvil quiere volver atrás después de abrir un modal.
8. Usuaria con teclado navega hasta contacto.

Cada escenario debe terminar en una acción clara: WhatsApp, descarga o información encontrada.

## 12. QA bilingue ES/EN

Pruebas:

- Home `/es` y `/en`.
- Servicios por mercado en ambos idiomas.
- Detalle de servicio en ambos idiomas.
- Formaciones y detalle de curso en ambos idiomas.
- Jornadas/mapa en ambos idiomas.
- Contacto y descargas en ambos idiomas.
- WhatsApp templates en ES y EN.
- Metadata/OG en ES y EN.
- Language switcher en desktop y movil.
- Textos ingleses largos sin overflow.
- `lang` correcto en HTML.
