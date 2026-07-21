# Plan de producción senior — Hostinger y cejasinternacionales.com

Fecha de ejecución: 21/07/2026

Responsable técnico: agente Codex con autorización de Jeffrey

Rama fuente: `develop`

Rama de producción: `main`

Dominio canónico: `https://cejasinternacionales.com`

## 1. Objetivo y condición de éxito

Publicar en el dominio principal exactamente el código validado de `develop`, mantener `main` como fuente de producción y no cerrar el cambio hasta demostrar desde Internet que:

- Hostinger terminó un build con Node.js compatible.
- La portada nueva sustituyó a la página anterior de “Próximamente”.
- HTTPS, canonical, sitemap, robots y alternates ES/EN usan el dominio final.
- `www` redirige permanentemente al dominio sin `www`.
- Los flujos críticos funcionan en la URL real.
- Existe un punto de restauración remoto anterior al cambio.

## 2. Topología verificada antes del cambio

- Repositorio remoto: GitHub, sin credenciales incrustadas en la URL documentada.
- Hostinger: plan Business activo con soporte para aplicaciones Node.js.
- Sitio: `cejasinternacionales.com`, vhost habilitado y conectado a una aplicación Next.js.
- Rama productiva configurada: `main`.
- `origin/main` inicial: `3289fa66ed4cf91e0ad3cbecdfad9efefb35256e`.
- `develop` no tiene divergencia inversa: `main` aporta 0 commits exclusivos y `develop` aporta 30 antes del commit de preparación. La promoción puede ser fast-forward.
- Producción inicial: HTTP 200, HTTPS activo, pero todavía sirve la web anterior.
- Último build Hostinger anterior: falló porque usó Node.js 18.20.8; Next.js 16 exige Node.js 20.9 o superior y otras dependencias exigen 20.19 o superior.

## 3. Cambios de endurecimiento incluidos

- Declaración de runtime `node >=20.19.0` en `package.json` y lockfile.
- Next.js actualizado al último parche estable validado (`16.2.11`).
- `shadcn` movido a dependencias de desarrollo: no forma parte del paquete runtime.
- URL de producción segura por defecto: `https://cejasinternacionales.com` cuando no exista una variable explícita.
- Redirección permanente de `www.cejasinternacionales.com` a apex, conservando ruta y query.
- Cabecera HSTS de un año, además de las cabeceras de seguridad existentes.
- Metadatos demasiado largos corregidos en ES/EN.
- Corrección responsive de la tabla de cookies.
- Objetivos táctiles del mapa elevados a 44 × 44 px.

## 4. Estrategia de riesgo y rollback

### Antes de publicar

1. Volver a consultar `origin/main` con autenticación no interactiva.
2. Abortarlo todo si ya no coincide con `3289fa66ed4cf91e0ad3cbecdfad9efefb35256e`.
3. Crear y subir el tag inmutable `production-backup-2026-07-21` apuntando a ese SHA.
4. Confirmar el tag con `ls-remote` antes de modificar `main`.

### Rollback de código

Promover de nuevo el tag de respaldo a `refs/heads/main` con lease contra el SHA publicado, reconstruir en Hostinger y repetir el smoke test. No se elimina historial, no se borra el tag y no se usa un `reset --hard` sobre el workspace de trabajo.

### Rollback operativo

Se activa si ocurre cualquiera de estos eventos:

- build Hostinger fallido sin corrección segura inmediata;
- portada o rutas críticas con 5xx;
- canonical/sitemap apuntando a localhost o a otro dominio;
- assets esenciales rotos;
- WhatsApp, selector de idioma o navegación principal inutilizables;
- errores de consola generalizados o regresión responsive bloqueante.

## 5. Compuertas previas obligatorias

No se promueve `main` hasta que queden registradas como aprobadas:

- instalación reproducible desde lockfile;
- lint sin errores;
- TypeScript sin errores;
- pruebas unitarias;
- build de producción;
- rastreo SEO de todas las URLs públicas;
- E2E de escritorio y móvil;
- axe automatizado;
- Chromium, Firefox, WebKit, Android emulado e iOS/WebKit;
- 390, 430, 768, 1024, 1440 y 1920 px;
- cabeceras, redirección `www`, canonical y ausencia de localhost;
- auditoría de dependencias runtime sin vulnerabilidades altas o críticas;
- comprobación de que `.env.local` y los tokens no están versionados.

Evidencia local final previa al despliegue:

- Lint: 0 errores; 4 avisos no bloqueantes preexistentes.
- TypeScript: aprobado.
- Unitarias: 33/33 aprobadas.
- Build: 220 páginas generadas con Next.js 16.2.11.
- SEO: 212 URLs, 0 errores y 0 avisos de longitud.
- E2E: 208 pruebas iniciales aprobadas; las 4 expectativas de títulos actualizadas se repitieron dentro de un archivo de 8 pruebas, 8/8 aprobadas.
- Mapa tras ajuste táctil: 18/18 pruebas aprobadas.
- Cross-browser: 29 aprobadas, 9 omisiones esperadas; los 2 timeouts por saturación aprobaron al repetirse en serie.
- Responsive final: 1.272 renderizados, 0 incidencias.
- Lighthouse local de escritorio: Performance 98, Accessibility 100, Best Practices 100, LCP 1,1 s, CLS 0 y TBT 30 ms. SEO local marca 92 únicamente porque el canonical correcto apunta al dominio público y no al origen localhost de la auditoría.
- Dependencias runtime: 0 altas, 0 críticas. Permanece un aviso moderado transitivo de PostCSS incluido por Next estable; la web no procesa CSS aportado por usuarios y no se adopta una versión canary ni el downgrade incorrecto sugerido por npm.

## 6. Procedimiento de publicación

1. Confirmar árbol limpio salvo los directorios QA no versionados propiedad del usuario.
2. Crear un único commit de preparación en `develop`.
3. Subir `develop` mediante el script autenticado del proyecto.
4. Volver a leer `origin/main`; si cambió, abortar y revisar.
5. Crear y subir `production-backup-2026-07-21` en el SHA anterior.
6. Promover `develop` a `main` mediante fast-forward explícito.
7. Vigilar la API de builds de Hostinger hasta estado terminal.
8. Si el autodeploy conserva Node 18 o no se dispara, enviar el mismo commit como archivo a la API de build especificando Node 22, `npm`, script `build` y output `.next`.
9. No considerar terminado el paso por un mero push: esperar build completado y comprobar el sitio desde fuera.

Configuración productiva recomendada en Hostinger:

- Node.js: 22 LTS.
- Package manager: npm.
- Instalación: `npm ci` cuando la plataforma lo permita.
- Build: `npm run build`.
- Tipo de aplicación: Next.js.
- Output: `.next`.
- Inicio: modo administrado de Next.js de Hostinger / `npm run start` cuando solicite comando explícito.
- Dominio primario: `cejasinternacionales.com`.

## 7. Verificación posterior desde Internet

Comprobar en la URL pública, sin usar el servidor local:

1. `http://cejasinternacionales.com` redirige a HTTPS.
2. `https://www.cejasinternacionales.com/<ruta>` redirige a apex conservando la ruta.
3. La home nueva aparece y no contiene el H1 de “Próximamente”.
4. `/es` y `/en` cargan y cambian entre equivalentes.
5. Servicios de Colombia, España/Europa y Suiza respetan mercados y monedas.
6. WhatsApp abre el número correspondiente al mercado.
7. Formaciones, PDFs, resultados, lightbox, mapa y menú móvil funcionan.
8. Aviso legal, privacidad, cookies y preferencias están disponibles en ES/EN.
9. Analytics no carga antes de consentimiento.
10. `/robots.txt`, `/sitemap.xml`, manifest, iconos y Open Graph responden.
11. Canonical, hreflang y schema contienen el dominio final y datos confirmados.
12. HSTS, nosniff, referrer policy, permissions policy y protección de framing están presentes.
13. No hay 404 esenciales, mixed content ni errores de consola.
14. Ejecutar nuevamente los rastreos de enlaces y SEO contra producción.

## 8. Observación y cierre

Durante los primeros 30 minutos:

- comprobar 5xx y reinicios en Hostinger;
- revisar dos veces la portada y las rutas críticas;
- conservar el tag de rollback;
- registrar SHA final, UUID y estado del build, hora de verificación y cualquier excepción.

Después del despliegue, quedan como tareas manuales no bloqueantes: verificar Google Search Console, enviar el sitemap, crear/conectar GA4 si el cliente lo autoriza y revisar indexación. GA4 no debe configurarse con un identificador inventado.

## 9. Resultado real

- SHA funcional publicado: `a725f51f5c45ef8b359fff8439be6645768b8bf1`.
- Rama remota: `main` promovida por fast-forward desde `develop`.
- Respaldo remoto: `production-backup-2026-07-21` -> `3289fa66ed4cf91e0ad3cbecdfad9efefb35256e`.
- Build Hostinger final: `019f867c-7c15-71e3-97bd-5f2931e590cc`, estado `completed`, Node 22, fuente archive.
- Autodeploy Git: se dispara correctamente, pero la configuración persistida de Hostinger todavía intenta Node 18 y falla antes del build. Se usó el mecanismo oficial de archivo con Node 22. Debe cambiarse el runtime conectado a Git a Node 22 en hPanel antes del próximo release.
- Verificación pública: portada nueva visible, HTTPS y `www` correctos, 212 URLs SEO sin errores, smoke funcional de 12 rutas, mercados, PDF, WhatsApp, cookies, idioma y consola aprobado.
- Lighthouse móvil real: Performance 82, Accessibility 100, Best Practices 100, SEO 100; LCP 3,6 s, CLS 0.
- Hora de cierre técnico: 21/07/2026 23:05 CEST.
- Rollback requerido: no.
