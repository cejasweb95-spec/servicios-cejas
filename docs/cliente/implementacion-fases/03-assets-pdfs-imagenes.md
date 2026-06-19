# Fase 03 - Assets, PDFs e imagenes

Estado: Completada para V1 - PDFs, media real y derivados web preparados y conectados.

Nota de cierre 19/06/2026: se prepararon derivados reales para Home, Resultados, Formaciones, detalles de curso, Sobre Xiomara/certificaciones y mapa editorial. Los originales se conservan intactos y todos los recursos publicos quedan registrados en datos localizados.

Objetivo: preparar catalogos, PDFs de cursos, logos, imagenes reales, video y metadatos visuales para que la web use activos reales optimizados sin romper rendimiento ni SEO.

---

## Fuentes obligatorias

- `docs/cliente/assets-inventario.md`
- `docs/cliente/fotos-instagram-inventario.md`
- `docs/cliente/fotos-cicatrizados-y-sesion.md`
- `docs/cliente/catalogo-colombia-cop.pdf`
- `docs/cliente/catalogo-españa-eur.pdf`
- `docs/cliente/catalogo-suiza-chf.pdf`
- `docs/cliente/assets-extraidos/formaciones-pdfs/originales/`
- `docs/cliente/identidad-marca.md`
- `docs/cliente/frontend-ui-ux-v3-profesional.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `image-asset-pipeline`
- `core-web-vitals-performance`
- `cejas-i18n-localization`
- `pdf:pdf` si hay que inspeccionar/renderizar PDFs

Uso: copiar y preparar assets sin destruir originales; optimizar derivados para web; crear alt text ES/EN.

---

## Estructura publica recomendada

```txt
public/
  descargas/
    catalogos/
      catalogo-colombia-cejas-internacionales.pdf
      catalogo-espana-europa-cejas-internacionales.pdf
      catalogo-suiza-cejas-internacionales.pdf
    formaciones/
      curso-micropigmentacion-cejas.pdf
      curso-micropigmentacion-labios.pdf
      masterclass-cejas-henna.pdf
      masterclass-laminado-cejas.pdf
      masterclass-lifting-pestanas.pdf
  images/
    brand/
    xiomara/
    resultados/
    servicios/
    formaciones/
    jornadas/
    social/
```

---

## Checklist PDFs catalogos

- [x] Copiar catalogo Colombia a `public/descargas/catalogos/`.
- [x] Copiar catalogo Espana/Europa a `public/descargas/catalogos/`.
- [x] Copiar catalogo Suiza a `public/descargas/catalogos/`.
- [x] Renombrar con slugs ASCII y descriptivos.
- [x] Registrar cada PDF en `src/content/downloads.ts`.
- [x] Cada PDF tiene title ES/EN.
- [x] Cada PDF tiene description ES/EN.
- [x] Cada PDF tiene market cuando aplica.
- [x] Cada PDF tiene file size si se quiere mostrar.
- [x] Confirmar links descargan y no abren 404.

Regla critica:

- [x] Catalogo de mercado aparece una vez en pagina de mercado.
- [x] Catalogo de mercado aparece en `/descargas`.
- [ ] Catalogo de mercado puede aparecer en footer como enlace secundario.
- [x] Catalogo de mercado no aparece dentro de cada `ServiceCard`.

---

## Checklist PDFs formaciones

- [x] Copiar PDF curso micropigmentacion de cejas.
- [x] Copiar PDF curso micropigmentacion/neutralizacion labial.
- [x] Copiar PDF masterclass henna.
- [x] Copiar PDF masterclass laminado.
- [x] Copiar PDF masterclass lifting.
- [x] Registrar cada PDF en `downloads.ts`.
- [x] Asociar cada PDF con su `courseId`.
- [x] Permitir descarga por `CourseCard`.
- [x] Permitir descarga en pagina detalle del curso.
- [x] Permitir descarga en pagina `/descargas`.

---

## Checklist logos

- [x] Logo PNG sin fondo preservado.
- [x] Logo blanco monocromo disponible.
- [x] Logo negro monocromo disponible.
- [x] No exigir SVG/AI a la clienta.
- [ ] Usar logo blanco sobre fondos oscuros.
- [x] Usar logo negro o original segun contraste. (header y footer usan el logo original sobre fondo claro)
- [x] Coral del logo no se convierte en color UI. (UI usa --primary #b76e79; coral solo en el asset del logo)

---

## Checklist imagenes

- [x] Seleccionar hero real con Xiomara o trabajo real.
- [x] Seleccionar imagen para Sobre Xiomara.
- [x] Seleccionar imagenes base de resultados por categoria.
- [x] Seleccionar imagenes base de formaciones/certificados si aplica.
- [ ] Seleccionar miniaturas para servicios prioritarios.
- [ ] Crear derivados WebP/AVIF cuando se implemente optimizacion.
- [x] Mantener dimensiones estables.
- [x] Definir `sizes` de `next/image`.
- [x] Crear alt text ES/EN no generico.
- [x] Evitar fotos repetidas sin proposito.
- [x] Evitar stock o imagenes atmosfericas genericas.

---

## Checklist video

- [ ] Identificar si el video aporta valor real.
- [ ] Si se usa, cargar diferido.
- [ ] No usar video como LCP principal en movil.
- [ ] Incluir poster optimizado.
- [ ] Respetar reduced motion/autoplay con cuidado.

---

## Tests / comandos

```bash
rg --files public
npm run build
```

Tests recomendados:

- [x] Link check de todos los PDFs.
- [ ] Test Playwright de descarga catalogo Colombia.
- [ ] Test Playwright de descarga catalogo Espana/Europa.
- [ ] Test Playwright de descarga catalogo Suiza.
- [ ] Test Playwright de descarga de cada curso.
- [ ] Lighthouse no detecta imagenes sin dimensiones.
- [ ] No hay imagen hero rota en 390px, 430px, 768px, 1440px.

---

## No avanzar si

- [ ] Hay PDFs referenciados pero no copiados.
- [ ] Hay imagenes sin alt ES/EN.
- [ ] El hero depende de imagen stock.
- [ ] Se repite catalogo de mercado dentro de cada servicio.

---

## Done cuando

- [x] PDFs y media estan en `public/`.
- [x] Downloads y media estan registrados en datos.
- [x] Links y assets pasan QA basico.
- [x] Fase 03 marcada en `CHECKLIST-MAESTRA.md`.
