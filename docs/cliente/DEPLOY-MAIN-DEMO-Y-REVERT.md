# Runbook histórico — demo temporal del 20/06/2026

> **Documento archivado:** no usar para el despliegue definitivo. El plan vigente es
> `docs/cliente/PRODUCCION-HOSTINGER-2026-07-21.md`. Los SHA y las instrucciones de
> restauración de este documento pertenecen únicamente a la demo de junio.

## Procedimiento histórico

Objetivo: **hoy** publicar la web nueva en `main` (producción Hostinger) para enseñársela al
cliente y **mañana** devolver `main` exactamente al estado actual.

> Idea clave: no hace falta "entender" qué es el estado actual. Lo **fotografiamos en un tag**
> (`main-backup-pre-demo-2026-06-20`) y mañana restauramos ese tag. Volver es 100 % garantizado.

---

## Estado verificado (2026-06-20)

- **Remoto:** `origin` → `https://github.com/cejasweb95-spec/servicios-cejas.git`
- **Producción:** rama `main` en `origin` = commit **`91bbe8f`** (esto es lo que hoy está live).
- **Web nueva:** rama `develop` = commit **`4894e44`** (todas las mejoras visuales V4, QA pasada).
- **Respaldo creado (local):** tag `main-backup-pre-demo-2026-06-20` → `91bbe8f`.
  ⚠️ **Falta subirlo a `origin`** (el push pidió credenciales). Ver Paso 0.
- `main` está además en un **worktree** en `C:/servicios-cejas-main` (branch ocupada ahí).

> ⚠️ Comprobación pendiente: el commit `91bbe8f` no es obviamente una página "próximamente"
> (su mensaje es "Añadir i18n ES/EN…"). Aun así, restaurar este tag devuelve `main` a lo que
> haya hoy en producción. Si el "próximamente" lo sirve Hostinger por otra vía (página estática,
> dominio aparcado, etc.), confírmalo: en ese caso el push a `main` podría no cambiar lo que ve
> el cliente, o el "volver" tendría que hacerse también en el panel de Hostinger.

---

## Requisito previo: ¿cómo despliega Hostinger?

El resultado del `git push` depende de tu configuración:

- **Si Hostinger hace auto-deploy desde `main`** (Git en hPanel con auto-deploy o webhook):
  con el push basta; esperar a que reconstruya.
- **Si es deploy manual** (botón "Deploy" en hPanel, FTP, o build manual): tras el push hay que
  lanzar el deploy en Hostinger. Next.js requiere `npm install && npm run build` en el servidor
  (app Node) — un simple `git pull` no basta si no se reconstruye.

Sea cual sea, el push a `main` necesita **tus credenciales de GitHub** (Git Credential Manager).

---

## Paso 0 — Asegurar el respaldo en el remoto (una sola vez, hazlo YA)

```bash
cd C:/servicios-cejas
git fetch origin
# Re-crea el tag por si acaso y súbelo (este tag = estado actual de produccion):
git tag -f main-backup-pre-demo-2026-06-20 origin/main
git push origin main-backup-pre-demo-2026-06-20
```

Verifica que quedó en el remoto:

```bash
git ls-remote --tags origin | grep main-backup-pre-demo-2026-06-20
```

---

## Paso 1 — HOY: publicar la web nueva en `main`

Sobrescribe `main` con el commit de `develop` (lo que verá el cliente será exactamente `develop`):

```bash
cd C:/servicios-cejas
git fetch origin
# Protección: solo sobrescribe si main sigue en 91bbe8f
git push --force-with-lease=main:91bbe8f origin develop:main
```

Luego **despliega en Hostinger** según tu mecanismo (auto o manual, ver arriba).

Sincroniza el worktree local de main (opcional, para que no quede desfasado):

```bash
git -C C:/servicios-cejas-main fetch origin
git -C C:/servicios-cejas-main reset --hard origin/main
```

Comprueba la web del cliente (URL de producción) antes de la reunión.

---

## Paso 2 — MAÑANA: volver al estado "próximamente"

Restaura `main` exactamente al respaldo:

```bash
cd C:/servicios-cejas
git fetch origin
git push --force origin main-backup-pre-demo-2026-06-20:refs/heads/main
```

Vuelve a **desplegar en Hostinger** (auto o manual) para que producción sirva otra vez el estado
anterior. Sincroniza el worktree si quieres:

```bash
git -C C:/servicios-cejas-main fetch origin
git -C C:/servicios-cejas-main reset --hard origin/main
```

Verifica que `main` volvió a `91bbe8f`:

```bash
git ls-remote origin refs/heads/main   # debe mostrar 91bbe8f...
```

---

## Alternativa sin reescribir historial (más conservadora)

Si prefieres no usar `--force` sobre `main`, en lugar del Paso 2 puedes **revertir con un commit
nuevo** (no borra historial, pero deja el "deshacer" registrado):

```bash
# Mañana, deshaciendo el merge de demo con un commit de reversión:
cd C:/servicios-cejas-main
git fetch origin && git reset --hard origin/main
git revert --no-edit <sha-del-merge-o-rango>
git push origin main
```

El método con tag + `--force` (Paso 2) es más limpio para este caso "demo de un día".

---

## Recuperación ante errores

- Todo lo de producción está respaldado en el tag `main-backup-pre-demo-2026-06-20`.
- Historial local de movimientos: `git reflog` (y `git reflog show main`).
- Para forzar `main` a cualquier commit conocido:
  `git push --force origin <sha>:refs/heads/main`.
- El trabajo nuevo vive en `develop` (`4894e44`) y, tras el Paso 1, también en `main`.

---

## Checklist rápido

- [ ] Paso 0: tag de respaldo subido a `origin`.
- [ ] Paso 1: `develop` publicado en `main` + deploy Hostinger + web verificada.
- [ ] (Reunión con el cliente)
- [ ] Paso 2: `main` restaurado al tag + deploy Hostinger + verificado en `91bbe8f`.
