# Cejas Internacionales

Landing page de **Próximamente** para micropigmentación estética internacional.

## Estado actual

Página estática publicada en la rama `main`.

## Configuración antes de publicar

Edita `js/config.js`:

- `SITE_URL` — tu dominio en Hostinger (ej. `https://cejasinternacionales.com`)
- `WHATSAPP_NUMBER` — número sin espacios (ej. `34603804837`)
- `WHATSAPP_MESSAGE` — mensaje prellenado de WhatsApp
- `INSTAGRAM_URL` — cuando tengas perfil (opcional)

También actualiza `robots.txt` y `sitemap.xml` con tu dominio real.

## Hosting

Hostinger conectado a GitHub, rama `main`. Ver `docs/hostinger-deploy.md`.

## Vista local

Abre `index.html` en el navegador o sirve la carpeta con un servidor estático.

## Documentación

- `docs/landing-proximamente-prompt.md` — Brief original de la landing
- `docs/stack-recomendado.md` — Stack para la web completa (Next.js + Sanity)
- `docs/skills-instaladas.md` — Skills de skills.sh instaladas en el proyecto

## Skills del agente

15 skills instaladas (diseño, responsive, SEO, Next.js). Restaurar en otro PC:

```bash
npx skills experimental_install -y
```
