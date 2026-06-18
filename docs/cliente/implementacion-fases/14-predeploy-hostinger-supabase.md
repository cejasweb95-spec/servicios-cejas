# Fase 14 - Predeploy Hostinger y ruta futura Supabase

Estado: Pendiente

Objetivo: dejar la web lista para publicar en Hostinger y documentar la ruta futura a Supabase/admin sin mezclar esa V2 con la V1 informativa.

---

## Fuentes obligatorias

- `docs/cliente/arquitectura-tecnica-hostinger-futura-db.md`
- `docs/cliente/seo-desde-inicio-estrategia.md`
- `docs/cliente/testing-qa-profesional.md`
- `docs/cliente/legal-privacidad-cookies-ga4.md`
- `docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md`
- `PRODUCT.md`

---

## Skills a usar

- `cejas-internacionales-guardrails`
- `next-best-practices`
- `core-web-vitals-performance`
- `seo-audit`
- `supabase-nextjs-admin`
- `cross-browser-device-qa`

Uso: preparar deploy real en Hostinger y dejar el diseno de datos compatible con Supabase futuro.

---

## Hostinger

- [ ] Confirmar tipo de plan Hostinger.
- [ ] Confirmar si soporta Node.js para Next SSR/standalone.
- [ ] Si no soporta Node, evaluar export estatico solo si no rompe requisitos.
- [ ] Definir output recomendado.
- [ ] Configurar variables de entorno si existen.
- [ ] Preparar build command.
- [ ] Preparar start command si aplica.
- [ ] Confirmar dominio.
- [ ] Confirmar HTTPS.
- [ ] Confirmar redirecciones www/no-www.
- [ ] Confirmar redirects idioma/base si aplica.

---

## Predeploy tecnico

- [ ] `npm run lint`.
- [ ] `npm run typecheck`.
- [ ] `npm run build`.
- [ ] `npm run test`.
- [ ] `npm run test:e2e`.
- [ ] Revisar `.env.example` si hay variables.
- [ ] Revisar que no se suben secretos.
- [ ] Revisar `robots` para produccion.
- [ ] Revisar `sitemap` con dominio final.
- [ ] Revisar metadata con dominio final.
- [ ] Revisar HTTPS y redireccion final.
- [ ] Revisar que no exista mixed content.
- [ ] Revisar cabeceras de seguridad: CSP viable, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y HSTS si aplica.
- [ ] Revisar que Search Console, canonical, sitemap y OG no apunten a localhost.
- [ ] Revisar que `NEXT_PUBLIC_GA_MEASUREMENT_ID` no falte si GA4 queda activo.
- [ ] Revisar que ningun token personal de GitHub se usa ni se publica desde `.env.local`.

---

## Search Console / Analytics

Tareas manuales del usuario:

- [ ] Crear propiedad en Google Search Console.
- [ ] Verificar dominio.
- [ ] Enviar sitemap.
- [ ] Crear GA4.
- [ ] Configurar Consent Mode.
- [ ] Publicar banner de cookies.
- [ ] Publicar aviso legal, privacidad y cookies.
- [ ] Conectar Search Console con GA4 si el usuario da acceso a ambas propiedades.
- [ ] Revisar indexacion despues del deploy.

Tareas que puede hacer el agente si el usuario da acceso:

- [ ] Guiar configuracion.
- [ ] Preparar tags/env.
- [ ] Validar que el script carga.
- [ ] Validar que GA4 solo carga tras aceptar cookies analiticas.
- [ ] Validar que no penaliza rendimiento.

---

## Ruta futura Supabase

No implementar admin en V1 salvo instruccion nueva. Dejar preparado:

- [ ] Query layer local.
- [ ] Tipos estables.
- [ ] IDs/slugs estables.
- [ ] Content models compatibles.
- [ ] `Provider` futuro: local/supabase.
- [ ] Downloads preparados para futuro Supabase Storage.
- [ ] Media preparada para futuro Storage/CDN.
- [ ] `/admin` reservado y no indexable cuando exista.

Tablas futuras probables:

- [ ] `markets`.
- [ ] `services`.
- [ ] `service_offers`.
- [ ] `service_categories`.
- [ ] `courses`.
- [ ] `course_modules`.
- [ ] `locations`.
- [ ] `events`.
- [ ] `downloads`.
- [ ] `media_assets`.
- [ ] `seo_entries`.
- [ ] `whatsapp_targets`.
- [ ] `translations` o columnas JSON localizadas.
- [ ] `site_settings`.

---

## QA produccion/staging

- [ ] Home ES carga.
- [ ] Home EN carga.
- [ ] Servicios por mercado cargan.
- [ ] Descargas funcionan.
- [ ] WhatsApp abre.
- [ ] Mapa funciona.
- [ ] Formaciones funcionan.
- [ ] Legal visible.
- [ ] Banner cookies funciona.
- [ ] Preferencias de cookies se pueden cambiar.
- [ ] Sitemap accesible.
- [ ] Robots accesible.
- [ ] PageSpeed en URL real.
- [ ] No errores 404 en assets.
- [ ] No errores de consola.

---

## No avanzar si

- [ ] El hosting no soporta el modo de build elegido.
- [ ] El dominio final no esta claro para canonical/sitemap.
- [ ] Hay secretos en repo.
- [ ] Build de produccion falla.
- [ ] SEO apunta a localhost.

---

## Done cuando

- [ ] Deploy plan cerrado.
- [ ] Build listo para Hostinger.
- [ ] Tareas manuales post-publicacion listadas.
- [ ] Supabase futuro documentado sin implementarlo aun.
- [ ] Fase 14 marcada en `CHECKLIST-MAESTRA.md`.
