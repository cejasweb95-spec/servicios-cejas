# Product

## Register

brand

## Users

Clientas que buscan servicios de micropigmentacion, belleza de cejas, labios, pestanas, unas y peinados segun el mercado disponible. Tambien profesionales o alumnas interesadas en formaciones presenciales/masterclass de Cejas Internacionales.

Llegan con dudas de confianza, seguridad, resultado, precio, duracion, ubicacion de jornadas y forma de contacto. Necesitan entender rapidamente si el servicio aplica a su ciudad o pais, ver resultados reales, resolver objeciones y contactar por WhatsApp.

## Product Purpose

Presentar Cejas Internacionales como marca profesional, premium e internacional, con sede fisica en Cali y proximas jornadas por disponibilidad en Colombia, Espana y Suiza. La web debe organizar servicios por mercado, mostrar precios por moneda/region (EUR, CHF y COP), mostrar duraciones de cita y duraciones de resultado cuando existan, destacar trayectoria/formacion, ofrecer descarga de PDFs de catalogos y cursos, y conducir a contacto/reserva por WhatsApp Colombia o WhatsApp Espana.

No es una tienda online. No habra checkout ni formulario de reserva: la cita y la reserva se gestionan por WhatsApp. El objetivo principal es generar confianza y conversaciones cualificadas.

La web publica debe ser bilingue: espanol como idioma fuente e ingles internacional como segundo idioma. Toda pagina, metadata, CTA, mensaje de WhatsApp, alt text, schema y estado de UI debe existir en ambos idiomas desde el inicio.

La web ira alojada en Hostinger. La V1 sera informativa y sin base de datos, pero el contenido debe estructurarse con contratos de datos claros para poder migrar despues a CMS/BD/admin sin rehacer la interfaz.

La web usara Google Analytics 4 para medir trafico y conversiones, pero solo con banner de cookies, politica de cookies y Consent Mode. La analitica no debe cargarse antes de que la usuaria acepte cookies analiticas.

## Brand Personality

Elegante, profesional, cercana e internacional. La experiencia debe sentirse femenina y premium sin verse fria, generica ni recargada. El tono debe transmitir criterio tecnico, cuidado real, resultados visibles y seguridad.

## Anti-references

No debe parecer una tienda generica de belleza ni un catalogo saturado. No debe depender de beige plano, tarjetas repetidas sin jerarquia, textos vacios tipo plantilla o animaciones decorativas sin funcion. No se debe presentar sede fisica en Espana porque la sede confirmada esta en Cali.

## Design Principles

1. Mostrar antes que prometer: resultados reales, procesos, ubicaciones y datos verificables por encima de claims genericos.
2. Internacional con precision: diferenciar sede fisica, ciudades de jornadas y servicios por mercado sin mezclar disponibilidad.
3. Contacto sin friccion: el CTA principal es "Contacta conmigo" y debe resolver el numero correcto de WhatsApp de forma clara.
4. Premium practico: la web debe verse cuidada, pero tambien servir para comparar servicios, precios, duraciones y cursos.
5. Confianza clinica: higiene, cuidados, contraindicaciones y FAQ deben aparecer como parte de la experiencia, no como letra pequena.
6. Preparacion enterprise: servicios, precios, cursos, jornadas, descargas, WhatsApp y SEO deben vivir en modelos de datos reutilizables, no escritos a mano dentro de componentes.
7. Sistema de diseno editable: colores, bordes, focus, sombras y gradientes deben depender de tokens semanticos globales, no de hexadecimales sueltos.
8. Componentes reutilizables: botones, tablas, tarjetas, tabs, selectores, secciones y CTAs deben componerse desde componentes base.
9. Botones elegantes: ningun CTA debe ocupar todo el ancho de una tarjeta o seccion por defecto; ancho automatico salvo movil o caso justificado.
10. Bilingue desde origen: si se crea contenido o UI publica, se crea en espanol e ingles internacional en el mismo cambio.
11. Cumplimiento legal visible: aviso legal, privacidad y cookies deben existir en ES/EN, con titular/direccion de Cali y sin inventar sedes fuera de Colombia.

## Technical Direction

V1 recomendada: Next.js App Router, TypeScript, Tailwind CSS, Motion/Framer Motion, `next/font`, `next-intl`, datos locales tipados y PDFs publicos descargables.

Arquitectura futura: Supabase para base de datos, Auth y Storage. Si se crea panel admin, sera una zona `/admin` dentro de Next.js protegida con Supabase Auth. La UI debe consumir una capa de queries para poder cambiar el origen de datos sin redisenar componentes.

## Accessibility & Inclusion

Objetivo minimo: WCAG 2.2 AA. La web debe mantener contraste suficiente sobre palo de rosa y fondos claros, navegacion por teclado, textos alternativos utiles en imagenes de resultados, estados de foco visibles, soporte de `prefers-reduced-motion` para animaciones y una version textual accesible de cualquier mapa interactivo.

Hover no puede ser la unica forma de acceder a contenido. Todo hover debe tener equivalente por foco, tap o click, especialmente en menu, cards, mapa, galeria y banner de cookies.
