# Identidad de Marca — Cejas Internacionales

---

## Logo

Logotipo oficial: **"Cejas Internacionales"** con la firma **"Xiomy Sanchez"**.

Composición:
- **"Cejas"** → caligrafía manuscrita elegante (script), en negro.
- **"Internacionales"** → tipografía de palo seco / sans-serif condensada en mayúsculas, negro, con línea subrayada.
- **"Xiomy Sanchez"** → firma manuscrita en color palo de rosa, debajo a la derecha.

### Versiones del logo
| Versión | Estado |
|---|---|
| **Logo oficial PNG sin fondo (alta resolución, 2095×949)** | ✅ `assets-extraidos/logo-oficial-sin-fondo.png` ← **usar esta** |
| Logo vectorial (SVG/AI) | No disponible. No se pedirá; se usará el PNG transparente oficial. |
| Versión monocroma negra | ✅ `assets-extraidos/logo-oficial-negro-monocromo.png` |
| Versión monocroma blanca | ✅ `assets-extraidos/logo-oficial-blanco.png` |
| Previsualización interna de variantes | ✅ `assets-extraidos/logo-variantes-monocromo-preview.png` |

> El logo oficial es PNG transparente de alta resolución → sirve perfectamente para web. El SVG/AI deja de ser pendiente.

---

## Paleta de colores (oficial del cliente)

> "Palo de rosa, blanco y negro"

### Decisión actualizada

La clienta quiere que la paleta sea **palo de rosa, blanco y negro**. Esa debe ser la paleta visible de la web.

El coral `#EE5164` aparece en la firma del logo actual. Se respeta dentro del logo, pero **no se tratará como color principal ni secundario de la interfaz** salvo que se necesite un microdetalle directamente vinculado al asset del logo.

| Color | Rol | Hex candidato | Uso sugerido |
|---|---|---|---|
| **Palo de rosa clásico** | Principal | **`#B76E79`** | Botones principales, detalles de mapa, enlaces activos, llamadas visuales |
| **Palo de rosa profundo** | Contraste / hover | `#7F3F4A` | Hover, texto sobre fondos claros, acentos sobrios |
| **Rosa empolvado** | Fondo suave | `#E8C7CC` | Bandas suaves, fondos de módulos, estados calmados |
| **Coral del logo** | Solo asset/microdetalle | `#EE5164` | Respetar en el logo existente; no usar como paleta de interfaz |
| **Negro tinta** | Texto / contraste | `#1A1A1A` | Titulares, texto principal, navegación |
| **Blanco limpio** | Fondo base | `#FFFFFF` / `#FBF8F7` | Fondos y respiración visual |

> Nota de diseño: evitar que la web se vuelva solo rosa. El palo de rosa debe sentirse elegante y controlado, acompañado de blanco, negro, fotografía real y neutrales derivados para bordes/sombras.

### Sistema de tokens de color

La implementación debe usar tokens semánticos. Así, si en el futuro se cambia el palo de rosa o el contraste del negro, se actualiza en un único sitio y se aplica a botones, bordes, fondos, gradientes, focus rings y estados.

Regla: los componentes no deben usar hexadecimales sueltos. Deben usar tokens como `primary`, `primary-hover`, `surface`, `foreground`, `border`, `ring`, `gradient-brand` o equivalentes.

---

## Tipografía recomendada

Decisión actual para la propuesta web:

| Uso | Fuente | Motivo |
|---|---|---|
| Titulares / display | **Marcellus** | Elegante, limpia y femenina sin parecer plantilla editorial. Da presencia premium y encaja con belleza/micropigmentación. |
| Cuerpo / UI | **Manrope** | Muy legible para catálogo, precios, tablas, botones, filtros y textos largos. Moderna sin robar protagonismo al logo. |
| Script | Solo el logo | Evitar otra fuente manuscrita para no competir con "Cejas" y la firma "Xiomy Sanchez". |

> Implementación recomendada: `next/font/google`, cargando solo subsets/weights necesarios para evitar saltos visuales y peso innecesario.

---

## Estilo visual general

- **Estética:** premium, femenina, elegante, internacional.
- **Sensación:** lujo accesible, profesional, confiable.
- Coherente con el estilo "Minimalista Beige" de los catálogos: mucho espacio en blanco, fotografía grande, animaciones suaves.
- Paleta sobria (palo de rosa + blanco + negro) → transmite seriedad y elegancia, no recargado.
