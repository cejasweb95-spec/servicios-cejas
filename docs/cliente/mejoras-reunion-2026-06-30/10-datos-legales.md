# 10 — Datos legales (aviso legal / titular)

## Lo que se habló

> Jeffrey: "Los datos legales que hay que poner: la información de la persona que hace la web, la dirección, sigo con lo de la cédula..."
> Cliente: "Sí. Vale, combinemos datos."
> "La principal seguimos con Colombia."

## Datos confirmados en web (auditoría 07/07/2026)

Fuente de verdad en código: `src/content/legal-profile.ts`  
Cruce con documentación interna: `docs/cliente/contacto-datos-legales.md`, `docs/cliente/legal-privacidad-cookies-ga4.md`

| Campo | Valor publicado | Dónde aparece |
|-------|-----------------|---------------|
| Titular | Xiomara Andrea Sánchez Noreña | Footer, aviso legal, privacidad, cookies, contacto |
| Marca comercial | Cejas Internacionales | Footer, páginas legales, schema |
| Identificación fiscal (NIT Colombia) | 1.144.186.472-5 | Footer, sidebar legal, schema `taxID` |
| Dirección **legal** | Calle 9 # 32 A 16, local 118, barrio El Templete, Cali, Valle del Cauca, Colombia | Footer, aviso legal, contacto, schema Cali |
| Email | contacto@cejasinternacionales.com | Footer, contacto, páginas legales |
| Teléfono Colombia | +57 316 774 2299 (`573167742299`) | WhatsApp targets, páginas legales |
| Teléfono España | +34 603 80 48 37 (`34603804837`) | WhatsApp targets, páginas legales |

### Nota sobre «cédula»

En Colombia, para persona natural con actividad económica, el identificador fiscal publicado en aviso legal es el **NIT** (`1.144.186.472-5`), no un número de cédula en texto libre. Coincide con la documentación del cliente y no hay placeholders tipo `XXX` o `PENDIENTE`.

### Sedes físicas vs dirección legal

- **Dirección legal:** solo Cali (correcto en aviso legal, footer y `legal-profile.note`).
- **Sedes físicas operativas:** Cali + Puerto de Sagunto (se explica en el bloque «Sedes y jornadas» del aviso legal; no sustituye la dirección legal).

## Páginas legales

| Página | ES | EN | Estado |
|--------|----|----|--------|
| Aviso legal | `/es/aviso-legal` | `/en/legal-notice` | Publicada |
| Privacidad | `/es/privacidad` | `/en/privacy` | Publicada |
| Cookies | `/es/cookies` | `/en/cookies` | Publicada |

Contenido en `src/messages/es.json` y `en.json` (`LegalNoticePage`, `PrivacyPage`, `CookiesPage`).  
`src/content/legal-pages.ts` → `status: "published"`.

Los textos incluyen nota de revisión jurídica editorial en aviso legal y privacidad (`reviewNote`); los **datos del titular** ya están confirmados y publicados.

## Validación realizada

- [x] `legal-profile.ts` coherente con docs cliente (nombre, NIT, dirección Cali, email).
- [x] Sin placeholders en páginas legales ni footer.
- [x] ES + EN en las tres páginas y enlaces en footer (`legalNavigation`).
- [x] Aviso legal distingue dirección legal (Cali) y sede física España (Puerto de Sagunto).
- [x] Cookies: GA4 solo con consentimiento; enlace «Cambiar preferencias» en footer.
- [x] E2E Chromium: `tests/e2e/legal-cookies.spec.ts` comprueba titular, NIT, email y Cali en aviso legal.

## Pendiente fuera de alcance MD 10

- Revisión por abogado del **texto** legal (redacción), si la clienta lo solicita más adelante.
- Actualizar `docs/cliente/contacto-datos-legales.md` (aún dice «no hay sede física en España» — desactualizado respecto a MD 03; no afecta la web).

## QA

- [x] Aviso legal, privacidad y cookies sin placeholders de datos, en ES y EN.
- [x] Dirección legal solo Cali, Colombia.
- [x] Enlaces legales accesibles desde el footer en ambos idiomas.
- [x] Playwright Chromium (legal + cookies).

## Estado

- [x] Datos recibidos y validados (los actuales en repo)
- [x] Páginas actualizadas
- [x] QA pasado
