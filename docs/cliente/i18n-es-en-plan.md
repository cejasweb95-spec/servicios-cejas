# i18n ES/EN - plan bilingue para Cejas Internacionales

Ultima actualizacion: 17/06/2026.

Este documento incorpora el requisito nuevo: la web publica debe existir en **espanol** y en **ingles internacional**.

---

## 1. Decision principal

La web sera bilingue desde la arquitectura, no traducida al final.

| Tema | Decision |
|---|---|
| Idioma fuente | Espanol (`es`) |
| Segundo idioma | Ingles internacional (`en`) |
| Tipo de traduccion | Localizacion profesional, no traduccion literal |
| URLs recomendadas | `/es/...` y `/en/...` |
| SEO internacional | URLs por idioma + alternates/hreflang + sitemap localizado |
| Implementacion recomendada | Next.js App Router + `next-intl` |
| Contenido futuro | Toda pagina nueva debe nacer en ES y EN |

---

## 2. Por que no traducir al final

Traducir al final suele romper:

- SEO: titles, descriptions, slugs, canonicals, schema y sitemap quedan incompletos.
- UI: textos ingleses suelen ser mas largos y pueden romper botones, cards o tabs.
- Accesibilidad: `aria-label`, alt text, errores y estados vacios se quedan en un solo idioma.
- Consistencia: se actualiza un servicio en espanol y se olvida el ingles.
- Conversion: el copy en ingles no puede sonar a Google Translate.

Por eso, cada dato publico debe tener campo localizado desde V1.

---

## 3. Alcance obligatorio de traduccion

Debe existir en ES y EN:

- Navegacion.
- Rutas y slugs.
- H1/H2/H3.
- Copy de paginas.
- CTAs.
- Servicios, descripciones, notas y duraciones visibles.
- Formaciones, temarios, inclusiones y avisos.
- Mensajes de WhatsApp prellenados.
- Alt text de imagenes.
- Labels accesibles.
- Estados de carga, vacio, error y no disponible.
- Metadata SEO.
- Open Graph / Twitter/social share text.
- Schema JSON-LD.
- Descargas/PDF labels.
- Mensajes legales visibles.
- Banner de cookies, configuracion de consentimiento y enlace para cambiar preferencias.
- Aviso legal, privacidad y cookies.
- Nombres/descripciones de eventos GA4 solo para documentacion interna; no enviar datos personales.

Los PDFs pueden estar en el idioma original si solo existen asi, pero la ficha web que los presenta debe estar traducida.

---

## 4. Enfoque tecnico recomendado

### Opcion recomendada: `next-intl`

Motivos:

- Funciona bien con Next.js App Router.
- Soporta Server Components.
- Permite metadata localizada.
- Permite pathnames localizados.
- Tiene formateo de fechas, numeros y monedas.
- Evita hardcodear strings dentro de componentes.

Estructura sugerida:

```txt
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      servicios/
      formaciones/
      jornadas/
      contacto/
  i18n/
    routing.ts
    navigation.ts
    request.ts
  messages/
    es.json
    en.json
  content/
    services.ts
    courses.ts
    locations.ts
    downloads.ts
```

### Modelo de contenido localizado

Ejemplo:

```ts
type Locale = "es" | "en";

type LocalizedString = Record<Locale, string>;

type Service = {
  slug: Record<Locale, string>;
  name: LocalizedString;
  description: LocalizedString;
  notes?: Record<Locale, string[]>;
  seo: {
    title: LocalizedString;
    description: LocalizedString;
  };
};
```

Regla: los datos estructurados como precio, moneda, duracion, WhatsApp, ubicacion y coordenadas no se duplican por idioma. Solo se localiza texto.

---

## 5. URLs recomendadas

Usar subcarpetas:

```txt
/es
/en
/es/servicios
/en/services
/es/servicios/colombia
/en/services/colombia
/es/formaciones
/en/trainings
/es/jornadas
/en/appointments-by-city
/es/contacto
/en/contact
```

Notas:

- Los slugs ingleses deben sonar naturales, no traducidos palabra por palabra.
- Para servicios, se puede localizar el slug si aporta SEO.
- El selector de idioma debe conservar la pagina equivalente cuando exista.
- Si una pagina aun no tiene equivalente, debe llevar al home del idioma elegido.

---

## 6. SEO internacional

Requisitos:

- `lang="es"` y `lang="en"` en el HTML correspondiente.
- `alternates.languages` / hreflang para pares ES/EN.
- Canonical por idioma.
- Para paginas de mercado, usar hreflang entre versiones equivalentes ES/EN; no crear variantes regionales `es-CO`, `es-ES` o `es-CH` salvo estrategia futura real.
- Sitemap con URLs localizadas.
- Metadata propia por idioma.
- Schema con texto localizado y datos consistentes.
- No mezclar navegacion inglesa con contenido espanol o al reves.

Importante: Google recomienda URLs distintas por idioma y enlaces para cambiar idioma. No conviene depender solo de cookies o deteccion del navegador.

---

## 7. Criterio de traduccion profesional

No traducir literalmente frases de belleza. Localizar intencion.

Ejemplos de criterio:

| Espanol | Ingles recomendado | Evitar |
|---|---|---|
| Contacta conmigo | Contact me | Contact with me |
| Jornadas por disponibilidad | Appointments by availability | Journeys by availability |
| Valoracion gratuita por foto | Free photo assessment | Free valuation by photo |
| Sede fisica en Cali | Studio based in Cali | Physical headquarters in Cali |
| Formaciones | Professional training | Formations |

En ingles internacional, usar un tono claro, sobrio y premium. Evitar claims exagerados como "transform your beauty" si no aportan dato real.

---

## 8. UI/UX bilingue

Reglas:

- El selector de idioma debe ser visible pero discreto.
- En desktop puede ir en header como `ES | EN` o menu compacto.
- En movil debe aparecer dentro del `Sheet` y/o en el footer.
- El cambio de idioma no debe cerrar al usuario en una pagina sin equivalente.
- Los botones deben soportar textos mas largos en ingles sin forzar `w-full`.
- Probar tabs y cards con textos largos.
- Evitar abreviaturas confusas.

---

## 9. QA bilingue

Pruebas obligatorias:

- Home ES y EN.
- Servicios ES y EN.
- Mercado Colombia/Espana/Suiza en ambos idiomas.
- Formaciones ES y EN.
- Jornadas/mapa ES y EN.
- Contacto ES y EN.
- Descargas ES y EN.
- Aviso legal, privacidad y cookies ES y EN.
- Banner cookies ES y EN.
- Preferencias cookies ES y EN.
- WhatsApp templates ES y EN.
- Metadata ES y EN.
- Language switcher en desktop y movil.
- No hay mezcla accidental de idiomas.
- No hay overflow por textos ingleses largos.

---

## 10. Skills a usar

Cuando se trabaje en i18n:

1. `cejas-internacionales-guardrails`
2. `cejas-i18n-localization`
3. `copywriting`
4. `seo`
5. `seo-audit`
6. `schema-structured-data`
7. `responsive-design`
8. `accessibility`

---

## 11. Dudas abiertas

No bloquean la arquitectura:

| Duda | Decision provisional |
|---|---|
| Dominio principal en `/es` o redireccion automatica | Usar `/es` como fuente y selector visible |
| Nivel de localizacion de slugs de servicios | Localizar slugs importantes para SEO |
| PDFs traducidos | No necesario en V1 si no existen; traducir las fichas web |
| Ingles de terminos tecnicos | Crear glosario durante implementacion |

---

## 12. Recomendacion final

Implementar i18n desde el primer commit de frontend con `next-intl`, rutas `/es` y `/en`, datos localizados tipados y QA bilingue.

La regla operativa es simple: **si se crea una pagina, componente o contenido visible, se crea en espanol e ingles en el mismo cambio**.
