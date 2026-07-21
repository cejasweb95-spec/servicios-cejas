# Fallos, recuperacion y rollback

## Indice

1. Principios
2. Matriz de decision
3. Rollback sin reescribir historial
4. Fallback de Hostinger por archivo
5. Condicion final de exito

## 1. Principios

- Preferir fix-forward cuando el build fallo antes de sustituir la version activa y la correccion es pequena, segura y comprobable.
- Aplicar rollback cuando un build completado deja 5xx, rompe rutas/CTA/idiomas, publica datos incorrectos o falla una compuerta critica en Internet.
- No mover `main` con force push. Crear commits que preserven historia.
- No restaurar solo Git: vigilar tambien el build de rollback y comprobar el dominio.
- No reutilizar evidencia QA de otro SHA.

## 2. Matriz de decision

| Evento | Trafico | Accion inmediata |
| --- | --- | --- |
| QA local falla | Sin cambio | Corregir en rama fuente y repetir todo |
| Push de rama fuente falla | Sin cambio | Corregir autenticacion/red; no tocar main |
| `main` cambia durante QA | Sin cambio | Cancelar, integrar el main nuevo y repetir |
| Build Hostinger falla | Normalmente queda la version anterior | Guardar logs, decidir fix-forward; no declarar exito |
| Build usa Node distinto de 22 | No certificado | Corregir hPanel y reimplementar |
| Build completa pero smoke falla | Posible impacto | Rollback inmediato y verificado |
| API no responde pero la web parece sana | Estado desconocido | Reintentar API; no afirmar exito solo por HTTP 200 |
| Dominio/SSL/DNS falla | Impacto externo | No cambiar codigo a ciegas; diagnosticar proveedor |

## 3. Rollback sin reescribir historial

La release crea `production-backup-*` antes del merge y registra el SHA del merge en `output/production-release/release-*.json`.

1. Confirmar que `origin/main` sigue apuntando al merge fallido. Si otra persona lo cambio, detenerse.
2. Crear un worktree temporal desde ese `origin/main`.
3. Revertir el merge con `git revert -m 1 <sha-del-merge>` y un mensaje de rollback.
4. Subir el nuevo commit a `main` sin force push.
5. Vigilar un build Git nuevo con Node 22.
6. Repetir el smoke publico completo.
7. Crear un tag `production-rollback-*` solo después de recuperar el servicio.
8. Corregir la rama fuente; no dar por perdido su trabajo.

Usar directamente el tag de backup como contenido de `main` solo si no existe un merge revertible, y aun asi crear un commit de restauracion en lugar de reescribir la rama.

## 4. Fallback de Hostinger por archivo

Usarlo solo si la integracion Git no crea builds y el acceso por API funciona.

1. Obtener el SHA actual de `main` directamente del remoto autenticado.
2. Crear el archivo con `git archive` desde ese SHA, nunca desde el working tree.
3. Incluir `package.json`, lockfile, configuracion, `src` y `public`; excluir `.env*`, `.git`, `node_modules`, `.next`, docs, tests, outputs e informes.
4. Confirmar que el archivo no supera 50 MB.
5. Usar el endpoint oficial `POST /api/hosting/v1/accounts/{username}/websites/{domain}/nodejs/builds/from-archive` o el flujo de archivo vigente en el OpenAPI de Hostinger.
6. Forzar Node 22, npm, script `build` y salida `.next` cuando la API lo permita.
7. Vigilar el UUID hasta `completed`, conservar logs y repetir el smoke.

No convertir el fallback en la ruta normal: arreglar despues la integracion Git para que `main` vuelva a ser la fuente operativa.

## 5. Condicion final de exito

La release solo esta lista cuando coinciden estas pruebas:

- rama fuente remota = SHA probado;
- `main` remoto = SHA del merge registrado;
- build nuevo de Hostinger = `completed`, Node 22 y fuente esperada;
- dominio HTTPS y redirecciones correctos;
- home nueva, ES/EN, sitemap, robots y canonical correctos;
- SEO y responsive publicos aprobados;
- rama local activa igual a la rama fuente;
- backup y evidencia disponibles.
