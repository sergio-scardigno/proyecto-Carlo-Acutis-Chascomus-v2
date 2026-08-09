// Contenido estatico del sitio. Se edita a mano; no hay CMS detras.
//
// Reglas:
//   - El `id` define el orden (mayor id = primero) y es la key de React. No reasignar.
//   - Las rutas de imagen son relativas a public/ y algunas tienen acentos y espacios:
//     copialas tal cual, los componentes ya hacen encodeURI.

import type { MisionInput } from "./types";

export const misiones: MisionInput[] = [
  {
    id: 6,
    titulo: "Cordoba - Arentina",
    texto: [
      "¡Laboulaye, Córdoba, se prepara para vivir un gran Pentecostés Joven 2026! 🔥",
      "Más de 300 jóvenes se reunirán para compartir la fe, la alegría y el encuentro con Jesús. Estará presente la Imagen Peregrina de San Carlo Acutis Chascomús Argentina, acompañando este hermoso momento de oración, adoración y fraternidad.",
      "Que San Carlo siga guiando a tantos jóvenes hacia la Eucaristía y que el Espíritu Santo encienda sus corazones con esperanza y amor.",
      "¡Nos vemos en Pentecostés Joven 2026! 🙏❤️\nImagen Peregrina de San Carlo Acutis Chascomús Argentina. 🇦🇷✨",
    ].join("\n\n"),
    fecha: "2026-07-14 17:25:17+00:00",
    imagenes: [
      "/img/misiones/cc-cordoba.png",
    ],
  },
  {
    // Link original (Instagram, hoy no se muestra): https://www.instagram.com/p/DYxWND6MlHX/
    id: 4,
    titulo: "Santiago del Estero",
    texto: [
      "Cada mirada, cada abrazo, cada oración y cada joven que se animó a acercarse fue una señal de que el Espíritu Santo sigue obrando y llamando fuerte.",
      "Tal vez muchos llegaron sin imaginar nada… pero estoy segura de que nadie se fue igual.",
      "Gracias jóvenes, por abrir el corazón.\nPorque ustedes son el presente de la Iglesia y porque San Carlo sigue eligiendo caminar entre ustedes. ❤️",
    ].join("\n\n"),
    fecha: "2026-07-10 14:05:57+00:00",
    imagenes: [
      "/img/misiones/cc-santiago-del-estero.png",
    ],
  },
  {
    // Link original (Instagram, hoy no se muestra): https://www.instagram.com/p/DaP_loMszIy/
    id: 3,
    titulo: "Formosa",
    texto: [
      "La imagen peregrina de San Carlo Acutis continúa llevando un mensaje de fe, esperanza y amor por la Eucaristía a cada rincón de nuestro país.",
      "En esta oportunidad llegó a la Parroquia San Roque, en Estanislao del Campo, Formosa, donde su presencia fue recibida con gran alegría por toda la comunidad.\nCada visita es una oportunidad para acercar corazones a Jesús, inspirados por el testimonio de este joven santo que sigue tocando vidas y despertando la fe en niños, jóvenes y adultos.",
      "Que San Carlo Acutis bendiga a toda la comunidad de San Roque y que su ejemplo continúe iluminando el camino de quienes buscan a Dios con un corazón sencillo y generoso.",
      "Imagen peregrina del Grupo San Carlo Acutis Chascomús Argentina 🇦🇷\n1 sem",
    ].join("\n\n"),
    fecha: "2026-07-10 14:04:05+00:00",
    imagenes: [
      "/img/misiones/cc-formosa.png",
    ],
  },
  {
    id: 2,
    titulo: "Mision Mendoza - Argentina",
    texto: "Parroquia Virgen Peregrina\nGodoy Cruz\n",
    fecha: "2026-04-24 21:19:58+00:00",
    youtubeUrl: "https://youtu.be/UY69XGxveX0",
  },
  {
    // Archivada en el CMS anterior; se conserva el texto pero no se publica.
    // Link original (Instagram): https://www.instagram.com/p/DZM5lPRMOd1/
    id: 5,
    titulo: "Córdoba",
    texto: [
      "¡Laboulaye, Córdoba, se prepara para vivir un gran Pentecostés Joven 2026! 🔥",
      "Más de 300 jóvenes se reunirán para compartir la fe, la alegría y el encuentro con Jesús. Estará presente la Imagen Peregrina de San Carlo Acutis Chascomús Argentina, acompañando este hermoso momento de oración, adoración y fraternidad.",
      "Que San Carlo siga guiando a tantos jóvenes hacia la Eucaristía y que el Espíritu Santo encienda sus corazones con esperanza y amor.",
      "¡Nos vemos en Pentecostés Joven 2026! 🙏❤️\nImagen Peregrina de San Carlo Acutis Chascomús Argentina. 🇦🇷✨",
    ].join("\n\n"),
    fecha: "2026-07-10 14:30:38+00:00",
    imagenes: [
      "/img/misiones/cc-cordoba.png",
    ],
    publicado: false,
  },
];
