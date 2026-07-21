---
name: deploy-production-hostinger
description: Publica una rama de trabajo de Cejas Internacionales en la rama main y en Hostinger con compuertas completas de QA, respaldo, merge seguro, monitoreo por API, smoke test publico y retorno garantizado a la rama fuente. Usar cuando Jeffrey diga subir, desplegar, publicar, promover o llevar cambios a produccion, cejasinternacionales.com, Hostinger o main.
---

# Desplegar a produccion en Hostinger

Ejecutar una promocion verificable de una rama distinta de `main`. No declarar exito por un commit, push o build iniciado: exigir build Hostinger `completed` con Node 22 y smoke test desde Internet.

## 1. Confirmar autoridad y contexto

1. Exigir una peticion explicita de publicar en produccion. La peticion autoriza el merge y push a `main` solo para esta release.
2. Leer `AGENTS.md`, `docs/cliente/PRODUCCION-HOSTINGER-2026-07-21.md` y los documentos QA que exige el proyecto.
3. Mantener como rama fuente la rama activa. Cancelar si es `main`, detached HEAD o existe un merge/rebase incompleto.
4. Confirmar en hPanel: Next.js, Node `22.x`, raiz `./`, build `npm run build`, npm y salida `.next`. Si se acaba de cambiar Node, pulsar **Guardar y reimplementar** y esperar ese build antes de otra release.

## 2. Guardar la rama de trabajo

1. Inspeccionar `git status`, diff tracked y archivos nuevos.
2. Incluir todo el trabajo intencional de la funcionalidad; excluir `.env*`, tokens, `.next`, `node_modules`, `output`, informes, capturas QA temporales y artefactos generados.
3. No usar `git add -A` a ciegas. Si un archivo nuevo es ambiguo, conservarlo sin versionar y avisar; nunca borrarlo para limpiar el arbol.
4. Crear un commit descriptivo en la rama fuente.
5. Si `main` remoto no es ancestro de la rama fuente, integrarlo primero en la rama fuente, resolver conflictos, volver a guardar y empezar las pruebas desde cero.

La publicacion automatizada exige un arbol limpio para certificar exactamente el commit que se sube.

## 3. Ejecutar las compuertas

Ejecutar:

```powershell
npm run release:check
```

No omitir ni suavizar fallos. Incluye instalacion reproducible, lint, TypeScript, unitarias, enlaces, auditoria de dependencias runtime, build, E2E, accesibilidad, visual, cross-browser en serie para evitar saturacion, SEO completo y seis viewports responsive.

Si una compuerta falla, corregir en la rama fuente, crear un nuevo commit y repetir todas las compuertas. No tocar `main`.

## 4. Publicar

Mostrar primero el plan cuando sea util:

```powershell
npm run release:plan
```

Tras las compuertas aprobadas, ejecutar con un mensaje de merge claro:

```powershell
npm run release:production -- -ConfirmProduction -CommitMessage "release: publicar <resumen>"
```

El script debe:

- subir y verificar la rama fuente remota;
- esperar que Hostinger no tenga otro build activo;
- crear un tag remoto `production-backup-*` sobre el `main` anterior;
- volver a comprobar que `main` no cambio durante QA;
- crear un worktree temporal sin cambiar la rama activa;
- hacer merge `--no-ff` del commit probado y subir `main` sin force push;
- esperar un build Git nuevo con Node 22 mediante `HOSTINGER_API_TOKEN`;
- ejecutar HTTPS, redirecciones, cabeceras, ES/EN, sitemap, robots, canonical, SEO y responsive en el dominio publico;
- crear un tag `production-release-*` solo despues del smoke aprobado;
- dejar activa la rama fuente.

## 5. Persistir ante fallos

No parar en el primer fallo ni afirmar que la web esta lista.

- Fallo de codigo o build: leer el log saneado bajo `output/production-release`, corregir en la rama fuente, guardar, repetir QA y volver a publicar.
- Node distinto de 22: corregir hPanel, guardar y reimplementar; no aceptar un build 18/20/24 para esta aplicacion sin una nueva certificacion explicita.
- Build no creado: comprobar conexion GitHub, rama `main`, auto-deploy y estado de Hostinger. Usar despliegue por archivo mediante la API oficial solo como recuperacion y siempre desde el SHA remoto de `main`.
- Smoke publico fallido: proteger el trafico y aplicar la politica de rollback antes de seguir corrigiendo.
- `502/503/504` transitorio tras un redeploy: permitir los reintentos acotados del smoke; si agota la ventana, tratarlo como fallo de runtime y no como exito parcial.
- Bloqueo externo: continuar con diagnosticos seguros. Solo pedir intervencion cuando falten permisos, Hostinger este caido o exista una decision de negocio imposible de inferir.

Leer [failure-and-rollback.md](references/failure-and-rollback.md) antes de revertir o usar el fallback por archivo.

## 6. Seguridad y evidencia

- Leer tokens solo desde `.env.local`; nunca imprimirlos, copiarlos a comandos documentados ni versionarlos.
- Usar Git no interactivo y URLs autenticadas efimeras. No cambiar `origin` para guardar credenciales.
- No usar `git reset --hard`, force push ni borrar trabajo del usuario.
- Conservar evidencias ignoradas por Git bajo `output/release-qa` y `output/production-release`.
- Informar rama fuente, SHA fuente, SHA de produccion, tag de backup, tag de release, UUID/estado/Node de Hostinger, URL publica y resultados de smoke.

## Comandos auxiliares

```powershell
npm run release:smoke
npm run release:monitor -- -NotBeforeUtc "2026-01-01T00:00:00Z"
```

Usar `-PlanOnly` directamente en los scripts para validar el procedimiento sin mutar Git, Hostinger ni produccion.
