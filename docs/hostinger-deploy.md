# Publicar en Hostinger con Next.js

Dominio: `https://cejasinternacionales.com`  
Repo: `cejasweb95-spec/servicios-cejas` · Rama: `main`

---

## Configuración en Hostinger (Frontend web app)

1. **Websites** → **Add Website** → **Frontend web app**
2. **Connect GitHub** → autoriza y elige `cejasweb95-spec/servicios-cejas`
3. Configura así:

| Campo | Valor |
|-------|--------|
| **Framework** | **Next.js** |
| **Rama** | `main` |
| **Install command** | `npm install` |
| **Build command** | `npm run build` |
| **Start command** | `npm start` |
| **Node version** | 20.x (o la más reciente disponible) |

4. Variables de entorno (opcional, ya hay valores por defecto):

```
NEXT_PUBLIC_SITE_URL=https://cejasinternacionales.com
NEXT_PUBLIC_WHATSAPP_NUMBER=34603804837
```

5. Pulsa **Deploy** y activa **Auto-deployment**

---

## Desarrollo local

```bash
cd C:\servicios-cejas
npm install
npm run dev
```

Abre http://localhost:3000

Build de producción:

```bash
npm run build
npm start
```

---

## Después del deploy

1. Probar https://cejasinternacionales.com
2. Probar WhatsApp en móvil
3. Google Search Console → sitemap: `https://cejasinternacionales.com/sitemap.xml`
