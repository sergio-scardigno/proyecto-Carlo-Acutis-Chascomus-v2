// Contenido estatico del sitio. Se edita a mano; no hay CMS detras.
//
// Reglas:
//   - El `id` define el orden (mayor id = primero) y es la key de React. No reasignar.
//   - Las rutas de imagen son relativas a public/ y algunas tienen acentos y espacios:
//     copialas tal cual, los componentes ya hacen encodeURI.
//   - El `slug` es la URL publica y esta en el sitemap: cambiarlo rompe enlaces.
//     La novedad `entronizacion` se titula "Canonizacion" a proposito.
//

import type { NovedadInput } from "./types";

export const novedades: NovedadInput[] = [
  {
    id: 2,
    slug: "entronizacion",
    titulo: "Canonización",
    imagenes: [
      "/img/novedades/entronizacion/7.jpeg",
      "/img/novedades/entronizacion/6.jpeg",
      "/img/novedades/entronizacion/5.jpeg",
      "/img/novedades/entronizacion/4.jpeg",
      "/img/novedades/entronizacion/3.jpeg",
      "/img/novedades/entronizacion/1.jpeg",
      "/img/novedades/entronizacion/2.jpeg",
    ],
    youtubeUrl: "https://youtu.be/8_BNxrNO3rQ",
  },
  {
    id: 1,
    slug: "carlo-acutis-ya-es-santo",
    titulo: "¡Carlo Acutis ya es santo!",
    contenido: "La Iglesia Católica celebra el primer milenial canonizado. Un día histórico en la Plaza de San Pedro, donde el Papa León XIV presidió la ceremonia.",
    imagenes: [
      "/img/canonizacion/canonizacion-carlo.webp",
    ],
  },
];
