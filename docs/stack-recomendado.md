# Stack recomendado — Cejas Internacionales

Documento de arquitectura para la web completa (más allá de la landing "Próximamente").

## Recomendación principal

### Fase actual: HTML estático + Hostinger

| Capa | Tecnología | Estado |
|------|------------|--------|
| **Landing** | HTML + CSS + JS | ✅ Activa (Próximamente) |
| **Reservas** | WhatsApp | ✅ Activa |
| **Hosting** | Hostinger + Git (`main`) | ✅ Configurado |
| **SEO** | Meta tags + JSON-LD + sitemap | ✅ Implementado |

### Fase futura (cuando toque)

| Capa | Tecnología | Estado |
|------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | Pendiente |
| **CMS** | Sanity Studio v3 | Pendiente |
| **Emails** | Resend | Pendiente |

### Por qué Next.js y no Astro para esta marca

- La landing actual ya funciona en HTML estático → se migra a Next sin problema.
- Next.js + shadcn es el ecosistema con **más skills instaladas** en tu entorno (SEO, responsive, diseño premium).
- Cuando la web crezca (blog, galería, formularios, i18n), Next escala mejor que mantener Astro + React islands.
- Vercel y Next están hechos para ir juntos → menos fricción en deploy.

### Backend: qué sí y qué no

| Necesidad | Solución |
|-----------|----------|
| Contenido (textos, fotos, servicios) | **Sanity CMS** |
| Reservas / agenda | **Fresha**, **Acuity** o **Treatwell** (widget embebido) |
| WhatsApp | Enlace `wa.me` + mensaje prellenado (ya implementado) |
| Formulario contacto | Resend + API Route en Next (opcional) |
| Pagos online | Solo si venden productos → Stripe más adelante |

**No construir** un sistema de reservas desde cero en 1 mes.

---

## Stack alternativo (máximo rendimiento SEO)

**Astro 5 + Sanity + Tailwind + Cloudflare Pages**

- Ideal si la prioridad #1 es Core Web Vitals perfectos con mínimo JavaScript.
- Menos skills específicas en tu entorno actual.
- Mejor para sitios muy estáticos; más trabajo si luego quieres app-like features.

---

## Qué evitar

| Opción | Motivo |
|--------|--------|
| WordPress + Elementor | Lento, genérico, no transmite marca premium |
| SPA pura (React/Vite sin SSR) | SEO débil, mala primera carga en móvil |
| Backend propio para reservas | Caro, lento de desarrollar, difícil de mantener |
| Wix / Squarespace | Poco control de diseño premium y SEO técnico |

---

## Arquitectura sugerida

```
cejas-internacionales/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Home, servicios, contacto
│   ├── blog/               # Artículos desde Sanity
│   └── reservas/           # Embed Fresha/Acuity
├── components/             # UI reutilizable (shadcn)
├── lib/                    # Sanity client, utils WhatsApp
├── sanity/                 # Schema CMS (servicios, galería)
└── public/                 # Assets estáticos
```

### Flujo de contenido

1. La especialista sube fotos/servicios en **Sanity Studio**.
2. Webhook → **Vercel** recompila la página afectada.
3. Imágenes servidas optimizadas (WebP/AVIF) vía `next/image` o CDN Sanity.

---

## Plan de migración (cuando toque)

1. Crear repo `cejas-internacionales` con `create-next-app` + Tailwind + TypeScript.
2. Migrar landing "Próximamente" a componentes React.
3. Conectar Sanity para servicios y galería.
4. Añadir páginas: Servicios, Sobre mí, Contacto, Reservas.
5. Configurar dominio + Vercel + Google Search Console.

---

## Skills instaladas para este proyecto

Ver `docs/skills-instaladas.md`.
