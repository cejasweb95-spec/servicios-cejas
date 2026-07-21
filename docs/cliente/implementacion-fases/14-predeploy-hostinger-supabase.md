# Fase 14 - Predeploy Hostinger y ruta futura Supabase

Estado: Completada el 21/07/2026.

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

- [x] Confirmar tipo de plan Hostinger: Business activo.
- [x] Confirmar si soporta Node.js para Next SSR/standalone: Next.js administrado compatible.
- [x] Si no soporta Node, evaluar export estatico solo si no rompe requisitos: no aplica; Node esta soportado.
- [x] Definir output recomendado: `.next` administrado por Hostinger.
- [x] Configurar variables de entorno si existen: no hay variables publicas obligatorias para V1.
- [x] Preparar build command: `npm run build`.
- [x] Preparar start command si aplica: Next.js administrado / `npm run start`.
- [x] Confirmar dominio: `cejasinternacionales.com`.
- [x] Confirmar HTTPS.
- [x] Confirmar redirecciones www/no-www: `www` -> apex con HTTP 308 y conserva ruta/query.
- [x] Confirmar redirects idioma/base si aplica.

---

## Predeploy tecnico

- [x] `npm run lint`: 0 errores; 4 avisos no bloqueantes.
- [x] `npm run typecheck`.
- [x] `npm run build`: 220 paginas generadas.
- [x] `npm run test`: 33/33.
- [x] `npm run test:e2e`: matriz aprobada; timeouts cross-browser repetidos en serie y aprobados.
- [x] Revisar `.env.example` si hay variables.
- [x] Revisar que no se suben secretos.
- [x] Revisar `robots` para produccion.
- [x] Revisar `sitemap` con dominio final.
- [x] Revisar metadata con dominio final.
- [x] Revisar HTTPS y redireccion final en configuracion local; falta repetir en dominio real.
- [x] Revisar que no exista mixed content en las pruebas automatizadas.
- [x] Revisar cabeceras de seguridad: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, framing y HSTS.
- [x] Revisar que Search Console, canonical, sitemap y OG no apunten a localhost.
- [x] Confirmar que GA4 queda inactivo mientras no exista un `NEXT_PUBLIC_GA_MEASUREMENT_ID` autorizado.
- [x] Revisar que ningun token personal de GitHub se usa ni se publica desde `.env.local`.

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

- [x] Query layer local.
- [x] Tipos estables.
- [x] IDs/slugs estables.
- [x] Content models compatibles.
- [x] `Provider` futuro local/Supabase documentado sin implementarlo en V1.
- [x] Downloads preparados para futuro Supabase Storage.
- [x] Media preparada para futuro Storage/CDN.
- [x] `/admin` reservado y no indexable cuando exista.

Tablas futuras probables:

- [x] `markets`.
- [x] `services`.
- [x] `service_offers`.
- [x] `service_categories`.
- [x] `courses`.
- [x] `course_modules`.
- [x] `locations`.
- [x] `events`.
- [x] `downloads`.
- [x] `media_assets`.
- [x] `seo_entries`.
- [x] `whatsapp_targets`.
- [x] `translations` o columnas JSON localizadas.
- [x] `site_settings`.

---

## QA produccion/staging

- [x] Home ES carga.
- [x] Home EN carga.
- [x] Servicios por mercado cargan.
- [x] Descargas y PDF funcionan.
- [x] WhatsApp abre con los numeros correctos.
- [x] Mapa funciona.
- [x] Formaciones funcionan.
- [x] Legal visible.
- [x] Banner cookies funciona.
- [x] Preferencias de cookies se pueden cambiar.
- [x] Sitemap accesible.
- [x] Robots accesible.
- [x] Lighthouse en URL real: 82/100/100/100 en movil.
- [x] No errores 404 en assets esenciales.
- [x] No errores de consola en el smoke final.

---

## No avanzar si

- [ ] El hosting no soporta el modo de build elegido.
- [ ] El dominio final no esta claro para canonical/sitemap.
- [ ] Hay secretos en repo.
- [ ] Build de produccion falla.
- [ ] SEO apunta a localhost.

---

## Done cuando

- [x] Deploy plan cerrado en `docs/cliente/PRODUCCION-HOSTINGER-2026-07-21.md`.
- [x] Build listo para Hostinger.
- [x] Tareas manuales post-publicacion listadas.
- [x] Supabase futuro documentado sin implementarlo aun.
- [x] Fase 14 marcada en `CHECKLIST-MAESTRA.md`.

Resultado productivo: `docs/cliente/PRODUCCION-HOSTINGER-2026-07-21.md`.

Pendiente operativo no bloqueante: cambiar en hPanel el runtime persistido del autodeploy Git de Node 18 a Node 22. El release final ya esta publicado con Node 22 mediante la API oficial.
