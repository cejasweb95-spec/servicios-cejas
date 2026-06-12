# Publicar en Hostinger (rama main)

## Requisitos

- Repositorio GitHub: `cejasweb95-spec/servicios-cejas`
- Rama: `main`
- Hostinger con Git deployment activado

## Antes del primer deploy

1. Dominio configurado: `https://cejasinternacionales.com`
2. Opcional: `INSTAGRAM_URL` en `js/config.js` cuando tengas el perfil

## En Hostinger

1. **Websites** → tu dominio → **Git**
2. Conecta el repositorio de GitHub
3. Rama: `main`
4. Directorio de publicación: raíz `/` (donde está `index.html`)
5. Deploy automático en cada push a `main`

## Reservas

Solo WhatsApp por ahora. El botón abre chat con mensaje prellenado.

## Después del deploy

1. Activa SSL (HTTPS) en Hostinger
2. Registra el sitio en [Google Search Console](https://search.google.com/search-console)
3. Envía el sitemap: `https://tudominio.com/sitemap.xml`

## Pendiente para más adelante

- Sanity CMS (contenido editable)
- Resend (emails de contacto)
- Web completa con Next.js (opcional)
