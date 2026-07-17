# Prompt para Claude Code — Mejoras reunión 12/07/2026

Copia el bloque de abajo **tal cual** en una sesión nueva de Claude Code, dentro del repo, tras `git pull origin develop` y `npm install`.

---

```
Contexto: sitio "Cejas Internacionales" (Xiomara) — Next.js App Router, TypeScript,
Tailwind v4, next-intl, bilingüe ES/EN. Rama: develop (NO tocar main).

TAREA: implementar el pulido final pedido por la clienta en la reunión del 12/07/2026.
Toda la spec está en docs/cliente/mejoras-reunion-2026-07-12/. LÉELOS EN ESTE ORDEN:

1) README.md — índice y orden de trabajo
2) 01-header-xiomara-sanchez.md
3) 02-quitar-rosewash-esquina-fotos.md
4) 03-cuchilla-sin-foto.md
5) 04-centrado-fotos-servicios.md
6) 09-servicios-senalados-encuadre.md (checklist visual prioritario)
7) 07-suiza-sin-repetir-retrato.md
8) 08-curso-laminado-foto.md
9) 06-extensiones-collage-fallback.md
10) 10-qa-pre-publicacion-dominio.md (checklist de cierre)

NO implementar 05-remapeo-fotos-cliente.md hasta que Jeffrey pase el lote renombrado
de la clienta (bloqueante). Si no ha llegado, saltar y documentar en README.

También lee (reglas, no reimplementar desde cero):
- AGENTS.md / CLAUDE.md
- docs/cliente/mejoras-reunion-2026-06-30/README.md (mejoras previas ya hechas)
- docs/cliente/mejoras-reunion-2026-06-30/07-fotos-servicios-mapeo.md (pipeline fotos)
- docs/cliente/implementacion-fases/QA-SENIOR-MATRIZ-PRUEBAS-WEB.md
- 11-validado-sin-cambios.md — NO tocar mapa, reseñas, SEO básico, estructura

ESTADO ACTUAL DEL CÓDIGO (jul 2026):
- Fotos por servicio ya implementadas: serviceMediaIds en src/content/media.ts +
  getServiceMediaAsset() en queries; 26 WebP en public/images/servicios/
- depilacion-cejas-cuchilla REUTILIZA foto de cera → la clienta pide SIN foto (MD 03)
- Header: headerByline = "by Xiomara" incluso en ES → falta "Xiomara Sánchez" (MD 01)
- PageHero usa RoseWash accent="corner" → tapa fotos en detalle servicio (MD 02)
- 11 servicios extensiones CO vs collage 9 celdas (MD 06)
- Reseñas Opción A en home #opiniones — validado, no cambiar (MD 11)

ORDEN DE IMPLEMENTACIÓN (hacer en serie, marcar checkboxes en cada MD):

Fase A — Rápido, sin material cliente
  01 Header apellido ES/EN
  03 Cuchilla sin imagen
  02 Quitar rose corner sobre fotos en detalle servicio + curso laminado

Fase B — Encuadre (navegador obligatorio)
  04 + 09 Añadir objectPosition por asset en media.ts; aplicar en service-detail-page
  Prioridad: neutralizacion-labios, relleno-pestanas, linea-ojos, efecto-polvo,
  hidralips-*, lifting-pestanas
  08 Curso Master Class laminado — encuadre + rosewash
  07 Suiza — evitar repetir retrato mercado-suiza en detalle de servicios

Fase C — Extensiones
  06 Mejorar recortes o usar sets-pestanas-panel temporalmente para los 11 CO

Fase D — QA
  10 lint, typecheck, build, smoke E2E si hay
  Verificar 390 / 768 / 1024 en al menos 5 URLs de la tabla MD 09
  Actualizar checkboxes en README.md y en cada MD tocado

REGLAS OBLIGATORIAS:
- V1 informativa: solo WhatsApp, sin formularios de reserva
- Todo cambio público: ES + EN a la vez (messages + content l(es,en))
- Sin hex crudos; tokens semánticos
- No mezclar servicios entre mercados
- No inventar reseñas, direcciones ni oficinas
- WhatsApp CO 573167742299 / EU 34603804837
- Componentes consumen query layer; no hardcode en UI
- No marcar hecho sin verlo en navegador (npm run dev → localhost:3000)
- Git push: npm run git:push (nunca git push origin a secas)
- No commitear .env.local ni tokens

ARCHIVOS CLAVE:
- src/messages/es.json, en.json — headerByline
- src/components/primitives/page-hero.tsx, rose-wash.tsx
- src/content/media.ts — serviceMediaIds, mediaAssets
- src/lib/content/queries.ts — getServiceMediaAsset
- src/app/[locale]/_pages/service-detail-page.tsx
- src/app/[locale]/_pages/market-services-page.tsx
- Página detalle curso en app/[locale]/formaciones/ o _pages

CRITERIO DE ÉXITO:
- Cliente puede revisar el miércoles con los "detallitos" cerrados
- Lista para dominio principal tras OK (MD 10)
- README de mejoras-reunion-2026-07-12 con estados actualizados

EMPIEZA AHORA por Fase A (01 → 03 → 02). Tras cada MD, verifica en navegador antes de seguir.
```

---

## Notas para Jeffrey

- Si pegas esto en **Cursor** u otro agente, el bloque entre comillas es el prompt útil.
- El MD **05** queda explícitamente bloqueado hasta el lote de fotos renombradas.
- Tras la sesión, revisa `README.md` de la carpeta para ver qué quedó ⬜ / ✅.
