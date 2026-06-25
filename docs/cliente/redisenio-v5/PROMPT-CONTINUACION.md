# Prompt de continuación (pegar en una sesión nueva en el otro PC)

Copia el bloque de abajo tal cual en un Claude Code nuevo, dentro del repo, tras hacer `git pull origin develop`.

---

```
Contexto: trabajo en el sitio de "Cejas Internacionales" (Xiomara), micropigmentación/belleza,
Next.js + TypeScript + Tailwind v4 + next-intl, bilingüe ES/EN. Rama de trabajo: develop
(NO tocar main; producción es main, Vercel despliega develop). Antes de empezar:
1) git pull origin develop   2) npm install   (las devDependencies suelen faltar en una máquina nueva).

Estamos en un rediseño "V5" pedido por la clienta tras revisar el sitio en Vercel: lo ve "muy
hecho por IA / plano / sin orden". Toda la evidencia, el plan y la dirección de diseño están en
docs/cliente/redisenio-v5/. LÉELOS EN ESTE ORDEN antes de tocar nada:
- README.md (estado y handoff)
- 05-qa-y-hallazgos-video.md (QA del sitio + lo que pidió la clienta, con minutos del vídeo)
- 06-plan-implementacion-por-fases.md (qué hacer y en qué orden; skills por fase; bloqueantes)
- 07-direccion-senior-y-qa-integral.md (dirección de diseño SENIOR, web entera incl. footer + QA)
- 00..04 (spec de detalle: dirección/motion, home/nav, páginas interiores, reglas, servicios)
También respeta AGENTS.md / CLAUDE.md (reglas del proyecto) y .agents/skills/ (guardrails,
i18n, copywriting, accessibility, frontend-design, impeccable, etc.).

YA HECHO Y VERIFICADO en develop (commits hasta 1946868):
- H1 confirmado de la clienta: "Micropigmentación Avanzada, Formación Profesional y Jornadas Internacionales".
- Menú reducido a 5 enlaces (Servicios, Dónde me encuentras, Formaciones, Resultados, Sobre Xiomara);
  "Jornadas" se renombró a "Dónde me encuentras"/"Where to find me" (URL /jornadas conservada).
- Quitada la miniatura con sombra del hero. Tono "rose" añadido a Section. H1 con tamaño móvil
  reducido + hyphens/break-words (sin scroll horizontal a 390+).
- Hardening SEO: src/config/site.ts cae a la URL de Vercel antes de localhost.

LO MÁS URGENTE (acción del dueño en Vercel, no código): definir NEXT_PUBLIC_SITE_URL =
https://servicios-cejas.vercel.app y redeploy. Hoy producción emite URLs localhost en
robots/sitemap/canonical/OG/JSON-LD (ver 05) → no indexable.

BLOQUEANTES DE CLIENTE (no inventar; pedir/esperar): foto de apertura del hero; datos+foto+
autorización del punto físico de España (además requiere visto bueno de Jeffrey por la regla
"dirección solo Cali"); archivos exactos de la foto de cursos y de los recortes; EN final del H1
(provisional: "Advanced Micropigmentation, Professional Training & International Appointments");
grafía del nombre (Xiomara Sánchez vs Xiomy Sanchez).

REGLAS CLAVE: reutilizar componentes existentes (split-feature, editorial-image-pair, page-hero,
service-list, result-mosaic, Section con tonos) — NO crear tarjetas nuevas ni rejillas uniformes
(el objetivo es que NO parezca IA). Color = ritmo con palo de rosa (tokens ya existen; sin hex
crudo). Datos desde la capa tipada (sin hardcode de precios/WhatsApp/traducciones). Solo WhatsApp,
sin formularios/reservas. Bilingüe ES/EN en el mismo cambio. Accesibilidad AA + reduced-motion.

TAREA AHORA: continúa el plan de 06 honrando la dirección senior de 07. Empieza por la Fase 1
(contenido/copy: aplicar intro canónica, quitar "disponibilidad" de mercados, asignar fotos a su
destino) y avanza a la Fase 2/3 (reorden de la home con ritmo tonal; mapa "Dónde me encuentras").
Verifica cada cambio levantando la app (npm run dev) y comprobando responsive 390/768/1440 y consola.
No marques nada como hecho sin verlo en el navegador.

Notas de herramientas: para transcribir audios/vídeo de la clienta (carpeta Downloads) usa
faster-whisper + PyAV (la API de Claude no acepta audio); ver README. Para capturar pantallas de
webs de referencia hace falta la extensión Claude-in-Chrome conectada (hoy no lo está).
```

---

**Por qué este prompt:** arranca en frío pero apunta a toda la documentación, deja claro qué está hecho/verificado, qué está bloqueado, las reglas anti-IA, y la primera tarea concreta. Así la sesión nueva entiende todo sin re-derivarlo.
