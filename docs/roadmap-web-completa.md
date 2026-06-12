# Roadmap — Web completa Cejas Internacionales

Guía maestra para pasar de la landing **Próximamente** (HTML estático) a la web definitiva con **Next.js**, **Sanity**, **Resend** y deploy en **Hostinger**.

Dominio: `https://cejasinternacionales.com`  
Repo: `cejasweb95-spec/servicios-cejas` · Rama: `main`

---

## Fase 0 — Ahora (landing Próximamente)

| Elemento | Estado | Tecnología |
|----------|--------|------------|
| Landing | ✅ Hecha | HTML + CSS + JS |
| Reservas | ✅ Activa | Solo WhatsApp (`js/config.js`) |
| SEO | ✅ Hecho | Meta, OG, JSON-LD, sitemap, robots |
| CMS | ⏸ Después | — |
| Emails | ⏸ Después | — |
| Framework JS | ❌ No hay | Sin `package.json` a propósito |

### Configuración editable hoy

Archivo `js/config.js`:

- `SITE_URL` → `https://cejasinternacionales.com`
- `WHATSAPP_NUMBER` → `34603804837`
- `WHATSAPP_MESSAGE` → mensaje prellenado
- `INSTAGRAM_URL` → cuando tengas perfil

---

## Error en Hostinger: "el marco no es compatible..."

### Qué significa

Hostinger **Git Deployment** está pensado para proyectos con **framework JavaScript** (Next.js, React, Vite, Astro, etc.). Busca un `package.json` y una estructura de build.

Tu proyecto actual es **HTML estático puro**:

```
servicios-cejas/
├── index.html      ← entrada
├── css/
├── js/
├── robots.txt
└── sitemap.xml
```

**No hay** `package.json` → Hostinger no detecta framework → muestra el aviso rojo y la lista de marcos compatibles.

### No es un error de tu código

La web está bien. El desajuste es: **modo de deploy de Hostinger** vs **tipo de proyecto estático**.

### Cómo publicar la landing estática en Hostinger

Elige **una** de estas opciones:

#### Opción A — Git con framework "Other" (recomendada si usas Git)

1. Hostinger → **Websites** → tu sitio → **Deployments** / **Git**
2. Framework: selecciona **Other** (u "Otro")
3. **Build command:** déjalo **vacío** (no hay build)
4. **Output directory / Publish directory:** `/` o `.` (raíz del repo)
5. Rama: `main`
6. Guarda y vuelve a desplegar

#### Opción B — Subida manual (rápida)

1. Hostinger → **File Manager** → `public_html`
2. Sube: `index.html`, carpeta `css/`, carpeta `js/`, `robots.txt`, `sitemap.xml`
3. No subas: `.env.local`, `.git`, `.agents/`

#### Opción C — FTP

Mismos archivos que la opción B vía cliente FTP de Hostinger.

### Cuando migres a Next.js

Ahí sí elegirás **Next.js** en Hostinger, con:

- Build command: `npm run build`
- Output: `out` (static export) o `.next` según configuración Hostinger
- Node version: 20+

---

## Fase 1 — Web completa (cuando decidas empezar)

### Stack recomendado

| Capa | Tecnología | Para qué |
|------|------------|----------|
| **Frontend** | Next.js 15 + TypeScript | SEO, páginas, rendimiento |
| **Estilos** | Tailwind CSS 4 + shadcn/ui | Diseño premium responsive |
| **Animaciones** | Framer Motion | Transiciones suaves |
| **CMS** | Sanity Studio v3 | Servicios, galería, blog, textos |
| **Emails** | Resend | Formulario contacto, avisos |
| **Reservas** | WhatsApp (fase 1) | Sin cambiar lo que ya funciona |
| **Hosting** | Hostinger + Git | Rama `main`, framework Next.js |

### Por qué Next.js en Hostinger

Hostinger **sí soporta Next.js** (aparece en su lista). Encaja con las skills ya instaladas y con crecimiento futuro (blog, galería, i18n).

### Arquitectura objetivo

```
servicios-cejas/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Home
│   ├── servicios/
│   ├── sobre/
│   ├── contacto/
│   └── blog/
├── components/
│   ├── ui/                      # shadcn
│   ├── sections/
│   └── whatsapp-button.tsx
├── lib/
│   ├── sanity.ts
│   ├── resend.ts
│   └── whatsapp.ts
├── sanity/
│   └── schemas/                 # servicio, galeria, post, pagina
├── public/
├── package.json
└── next.config.ts
```

---

## Fase 2 — Sanity CMS

### Qué gestionará la clienta sin tocar código

- Servicios (cejas, labios, mirada)
- Galería antes/después
- Textos de páginas
- Blog / consejos de cuidado
- Ciudades y fechas de jornadas (cuando las defináis)

### Schemas sugeridos

| Schema | Campos clave |
|--------|----------------|
| `servicio` | título, categoría, descripción, duración, imagen |
| `galeria` | antes, después, técnica, consentimiento |
| `post` | título, slug, cuerpo, imagen, SEO |
| `jornada` | ciudad, país, fechas, plazas (sin inventar si no hay datos) |
| `configuracion` | WhatsApp, Instagram, textos footer |

### Integración con Next.js

1. Crear proyecto en [sanity.io](https://sanity.io) (plan free suele bastar al inicio)
2. `npm create sanity@latest` en el repo
3. Cliente: `@sanity/client` + `next-sanity`
4. Webhook Sanity → Hostinger rebuild al publicar contenido

### Variables de entorno (`.env.local`)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

---

## Fase 3 — Resend (emails)

### Cuándo activarlo

Cuando quieras un **formulario de contacto** en la web (además de WhatsApp).

### Qué enviará

- Aviso a la especialista: "Nueva consulta desde la web"
- Opcional: confirmación automática a la clienta

### Integración

1. Cuenta en [resend.com](https://resend.com)
2. Verificar dominio `cejasinternacionales.com` (registros DNS en Hostinger)
3. API Route en Next.js: `app/api/contacto/route.ts`
4. Paquete: `resend`

### Variables de entorno

```env
RESEND_API_KEY=
CONTACT_EMAIL=info@cejasinternacionales.com
```

### Importante

- Resend **no sustituye** WhatsApp para reservas (de momento reservas = WhatsApp)
- Resend es para emails formales de contacto

---

## Skills instaladas — cuándo usar cada una

### Ya aplicadas en la landing HTML (9)

| Skill | Uso en fase 0 |
|-------|----------------|
| `seo` | Meta, canonical, JSON-LD, sitemap |
| `seo-audit` | Estructura H1–H3, keywords |
| `copywriting` | Textos y CTAs |
| `frontend-design` | Estética premium |
| `design-taste-frontend` | Criterio visual |
| `ui-ux-pro-max` | Paleta y jerarquía |
| `responsive-design` | Mobile-first |
| `web-design-guidelines` | HTML semántico |
| `accessibility` | Labels y roles básicos |

### Activar en la web Next.js (6 pendientes)

| Skill | Cuándo |
|-------|--------|
| `next-best-practices` | Al crear el proyecto Next.js |
| `vercel-react-best-practices` | Componentes y data fetching |
| `vercel-composition-patterns` | Arquitectura de componentes |
| `shadcn` | Botones, cards, formularios |
| `tailwind-design-system` | Tokens de marca |
| `impeccable` | Auditoría visual antes de lanzar |

### Restaurar skills en otro PC

```bash
cd C:\servicios-cejas
npx skills experimental_install -y
```

Lista completa: `docs/skills-instaladas.md`

---

## Plan de migración paso a paso

### Paso 1 — Preparar Next.js en el mismo repo (rama `develop`)

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false
```

Migrar diseño de `index.html` → componentes React.

### Paso 2 — Hostinger

- Framework: **Next.js**
- Build: `npm run build`
- Start / output según guía Hostinger para Next.js
- O export estático (`output: 'export'`) si Hostinger solo sirve archivos estáticos

### Paso 3 — Sanity

- Schemas de servicios y galería
- Sustituir chips estáticos por datos del CMS

### Paso 4 — Resend

- Formulario en `/contacto`
- Verificar dominio DNS

### Paso 5 — SEO y lanzamiento

- `generateMetadata()` en cada página
- Sitemap dinámico `app/sitemap.ts`
- Google Search Console
- Ejecutar skills `seo-audit` + `impeccable`

### Paso 6 — Merge a `main`

Push a `main` → Hostinger despliega automáticamente.

---

## Qué NO hacer (recordatorio)

| Evitar | Motivo |
|--------|--------|
| WordPress + Elementor | Lento, genérico |
| Backend propio de reservas | Complejo; WhatsApp basta por ahora |
| Inventar precios/fechas/ciudades | Solo datos reales |
| Subir `.env.local` a Git | Contiene tokens |

---

## Checklist antes de cada deploy

- [ ] `SITE_URL` y dominio en sitemap/robots correctos
- [ ] WhatsApp probado en móvil
- [ ] SSL activo en Hostinger
- [ ] `.env.local` no está en Git
- [ ] Build local pasa: `npm run build` (cuando haya Next.js)
- [ ] Framework correcto en Hostinger (Other = HTML / Next.js = web completa)

---

## Documentos relacionados

| Archivo | Contenido |
|---------|-----------|
| `docs/hostinger-deploy.md` | Deploy actual y troubleshooting |
| `docs/skills-instaladas.md` | Skills y comandos |
| `docs/stack-recomendado.md` | Decisiones técnicas resumidas |
| `docs/landing-proximamente-prompt.md` | Brief original de la landing |
| `js/config.js` | WhatsApp, dominio, Instagram |

---

## Resumen ejecutivo

1. **Hoy:** HTML estático + WhatsApp + SEO → Hostinger con framework **Other** o subida manual.
2. **Próximo:** Next.js en el mismo repo → Hostinger con framework **Next.js**.
3. **Después:** Sanity para contenido, Resend para emails de contacto.
4. **Siempre:** Reservas por WhatsApp hasta que decidáis otro sistema.
5. **Skills:** 9 ya usadas en HTML; 6 más cuando haya Next.js.
