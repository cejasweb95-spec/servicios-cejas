# Fase 13 - QA cross-browser, accesibilidad y E2E

Estado: Completada

Objetivo: ejecutar pruebas de usuario final, responsive, accesibilidad, enlaces, descargas, WhatsApp, mapa, i18n, SEO y build antes de dar la web por terminada.

---

## Fuentes obligatorias

- `docs/cliente/testing-qa-profesional.md`
- `docs/cliente/seo-desde-inicio-estrategia.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`
- `docs/cliente/i18n-es-en-plan.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`
- `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md`
- `docs/cliente/implementacion-fases/COMPONENTES-REUTILIZABLES-SISTEMA.md`
- `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `cross-browser-device-qa`
- `user-flow-e2e-testing`
- `playwright`
- `accessibility`
- `core-web-vitals-performance`
- `seo-audit`
- `responsive-design`
- `nextjs-framer-motion-animations`

Uso: probar como usuaria real, no solo compilar.

---

## Comandos obligatorios

```bash
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

Si existe script:

```bash
npm run test:a11y
npm run test:links
npm run test:visual
npm run test:lighthouse
```

### Ejecucion local 18/06/2026

- [x] `npm run lint` pasa.
- [x] `npm run typecheck` pasa.
- [x] `npm run build` pasa.
- [x] `npm run test` pasa: 10 tests.
- [x] `npm run test:e2e` pasa: 140 tests.
- [x] `npm run test:crossbrowser` pasa: 31 tests ejecutados y 9 skips esperados de reduced-motion fuera del proyecto dedicado.
- [x] `npm run test:a11y` pasa: 52 tests con axe sin issues serios.
- [x] `npm run test:seo` pasa: 38 tests.
- [x] `npm run test:visual` pasa: 10 capturas smoke locales.
- [x] `npm run test:links` pasa: 36 rutas locales revisadas.
- [x] `npm run test:lighthouse` ejecutado; el script actual documenta que PageSpeed/Lighthouse final queda para pantallas finales/URL real. Lighthouse local detallado vive en fase 12.

Incidencias encontradas y corregidas:

- [x] Header desktop provocaba overflow a 1024px; se cambio el breakpoint desktop a `xl`.
- [x] El menu movil quedaba abierto tras navegar; `MobileNav` y `LocaleSwitcher` ahora cierran el Sheet al navegar.
- [x] Se agregaron cabeceras basicas: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`.
- [x] Firefox/WebKit de Playwright instalados localmente para ejecutar la matriz real.

---

## Configuracion Playwright recomendada

- [x] Trace en CI/local para fallos: `trace: "on-first-retry"` o equivalente.
- [x] Screenshots/videos en fallos cuando ayuden a depurar.
- [x] HTML report generado para E2E.
- [ ] Visual regression con baseline solo cuando el diseno este estable.
- [x] Visual regression en local para V1; CI queda como mejora futura.
- [x] `@axe-core/playwright` para escaneos a11y automatizados.
- [x] Tests separados por smoke, E2E critico, a11y, SEO, cross-browser y visual cuando el tamano del suite lo justifique.

Nota: la regresion visual con baseline queda pendiente hasta cerrar el diseno visual. En esta fase se dejaron capturas smoke locales revisables.

---

## Matriz responsive

- [x] 390px mobile.
- [x] 430px mobile.
- [x] 768px tablet.
- [x] 1024px laptop/tablet.
- [x] 1440px desktop.
- [x] 1920px wide desktop.

En cada viewport:

- [x] No overflow horizontal.
- [x] Header usable.
- [x] CTA visible sin tapar contenido.
- [x] Textos no se salen.
- [x] Cards/listas no saltan raro.
- [x] Imagenes no se deforman.
- [x] Mapa/lista usable.
- [x] Animaciones no provocan saltos de layout.

---

## Cross-browser

- [x] Chromium.
- [x] Firefox.
- [x] WebKit.
- [x] Android Chrome emulado con Playwright.
- [x] iOS Safari / WebKit emulado con Playwright.

---

## Flujos E2E

- [x] Usuario abre home ES.
- [x] Cambia a EN.
- [x] Vuelve a ES.
- [x] Abre menu movil.
- [x] Cierra menu movil.
- [x] Abre servicios.
- [x] Cambia mercado Colombia.
- [x] Cambia mercado Espana/Europa.
- [x] Cambia mercado Suiza.
- [x] Abre detalle de servicio.
- [x] Abre WhatsApp chooser.
- [x] Contacta por Colombia.
- [x] Contacta por Espana/Europa/Suiza.
- [x] Descarga catalogo Colombia.
- [x] Descarga catalogo Espana/Europa.
- [x] Descarga catalogo Suiza.
- [x] Abre formaciones.
- [x] Interactua con animaciones de cards/formaciones sin perder foco.
- [x] Descarga PDF de curso.
- [x] Abre mapa/jornadas.
- [x] Interactua con pin/lista.
- [x] Abre resultados/lightbox si existe.
- [x] Cierra lightbox y recupera foco.
- [x] Usa back/forward.
- [x] Acepta cookies analiticas y verifica que GA4 queda permitido.
- [x] Rechaza cookies analiticas y verifica que GA4 no carga.
- [x] Configura preferencias de cookies y cambia la decision desde footer.

---

## Accesibilidad

- [x] Navegacion por teclado completa.
- [x] Focus visible.
- [x] Skip link.
- [x] Dialogs con focus trap.
- [x] Menu movil accesible.
- [x] Labels en icon buttons.
- [x] Alt text util.
- [x] Contraste AA validado por axe/Lighthouse local.
- [x] Reduced motion.
- [x] Reduced motion probado en home, servicios, formaciones, mapa, resultados y contacto.
- [x] No contenido solo por hover.
- [x] No informacion solo por color.
- [x] Axe sin issues criticos.
- [ ] WAVE manual revisado en home, servicios, formaciones, jornadas y contacto.
- [x] axe automatizado ejecutado donde existan componentes interactivos.

Nota: WAVE manual queda pendiente para una URL accesible desde navegador/herramienta externa o revision manual con extension. Localmente se cubrio con axe, teclado, foco y Playwright.

---

## QA de datos

- [x] Colombia usa COP y WhatsApp Colombia.
- [x] Espana/Europa usa EUR y WhatsApp Espana.
- [x] Suiza usa CHF y WhatsApp Espana.
- [x] Suiza no muestra HidraLips.
- [x] Suiza no muestra depilaciones.
- [x] Suiza no muestra correccion de cejas.
- [x] Catalogo por mercado aparece una vez por pagina de mercado.
- [x] PDFs de cursos aparecen por curso.
- [x] Direccion legal solo Cali.
- [x] No hay formulario de reserva.
- [x] No hay ecommerce.

---

## QA SEO

- [x] Un H1 por pagina.
- [x] Metadata ES/EN.
- [x] Canonical.
- [x] hreflang.
- [x] Sitemap.
- [x] Robots.
- [x] Schema validado.
- [x] OG images.
- [x] Contenido rastreable.
- [x] No links rotos.
- [x] Aviso legal, privacidad y cookies indexables segun implementacion actual.

---

## QA performance

- [x] Lighthouse mobile.
- [x] Lighthouse desktop.
- [ ] PageSpeed staging/produccion si hay URL.
- [x] LCP revisado.
- [x] CLS revisado.
- [x] INP revisado.
- [x] Bundle JS revisado.
- [x] Imagenes grandes revisadas.
- [x] Lighthouse CI/local ejecutado o documentado con razon si no aplica.

Nota: Lighthouse local se ejecuto en fase 12 sobre paginas principales; PageSpeed con datos reales queda para staging/produccion.

---

## QA visual regression

- [ ] Baseline Home desktop/mobile.
- [ ] Baseline Servicios Colombia.
- [ ] Baseline Servicios Espana/Europa.
- [ ] Baseline Servicios Suiza.
- [ ] Baseline Formaciones.
- [ ] Baseline Jornadas/mapa.
- [ ] Baseline Contacto.
- [ ] Baseline Legal/Cookies si el diseno del banner afecta layouts principales.
- [x] Capturas smoke locales generadas para Home, Servicios Colombia, Formaciones, Jornadas y Contacto en desktop/movil.
- [x] Capturas revisadas en el mismo entorno donde se generaron.
- [ ] Elementos dinamicos enmascarados si existieran.

---

## QA seguridad / best practices

- [x] No secretos en repo.
- [x] No mixed content.
- [x] Links externos con atributos seguros cuando aplique.
- [x] Cabeceras revisadas: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`.
- [ ] CSP viable validada con dominio final, Hostinger y GA4.
- [ ] HSTS definido cuando el dominio y HTTPS esten estables.
- [x] No endpoints innecesarios para una V1 informativa.

---

## QA de componentes reutilizables

- [x] No hay botones ad hoc fuera de componentes permitidos.
- [x] No hay tabs/filtros manuales duplicados.
- [x] No hay tablas/listas ad hoc para servicios/cursos/descargas.
- [x] No hay cards duplicadas con estructuras casi iguales.
- [x] No hay imports directos desde `src/content` en componentes visuales.
- [x] No hay raw hex en componentes.
- [x] No hay `w-full` en CTAs desktop salvo justificacion.
- [x] No hay props booleanas acumulativas en componentes de dominio.
- [x] ES/EN usan los mismos componentes y no layouts divergentes.

---

## No avanzar si

- [x] Build pasa.
- [x] No hay errores de consola en flujos principales.
- [x] WhatsApp usa numero correcto.
- [x] No hay links PDF rotos.
- [x] Mobile 390 no tiene overflow grave.
- [x] A11y no tiene issue critico/serio en axe.

---

## Done cuando

- [x] Todos los comandos obligatorios pasan.
- [x] Matriz responsive validada.
- [x] Flujos E2E pasan.
- [x] Lighthouse/PageSpeed revisado segun alcance local; PageSpeed real queda para produccion.
- [x] Fase 13 marcada en `CHECKLIST-MAESTRA.md`.
