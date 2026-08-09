// Contenido estatico del sitio. Se edita a mano; no hay CMS detras.
//
// Reglas:
//   - El `id` define el orden (mayor id = primero) y es la key de React. No reasignar.
//   - Las rutas de imagen son relativas a public/ y algunas tienen acentos y espacios:
//     copialas tal cual, los componentes ya hacen encodeURI.
//   - Sin `youtubeUrl` valido el video no se muestra: la home renderiza
//     videos[0] y da por hecho que tiene miniatura de YouTube.
//

import type { VideoInput } from "./types";

export const videos: VideoInput[] = [
  {
    id: 10,
    titulo: "Palabras de la madre Carlo Acutis, Antonia Salzano",
    youtubeUrl: "https://youtu.be/ZaZE-DcYM7Q",
  },
  {
    id: 9,
    titulo: "Palabras de la madre Carlo Acutis, Antonia Salzano",
    youtubeUrl: "https://youtube.com/shorts/eoPGvm5w5jA?feature=share",
  },
  {
    id: 8,
    titulo: "Palabras de la madre Carlo Acutis, Antonia Salzano",
    youtubeUrl: "https://youtube.com/shorts/qlrRNz4obOE?feature=share",
  },
  {
    id: 7,
    titulo: "Saludos de Antonia, la Madre de Carlo Acutis",
    youtubeUrl: "https://youtu.be/m6Ou6Sxyq5o",
  },
  {
    id: 6,
    titulo: "La mia autostrada per il Cielo",
    descripcion: "Este contenido ha sido elaborado por un tercero, recopilando fragmentos de video del documental 'La mia autostrada per il Cielo' y varias imágenes disponibles en la página oficial de Carlo.",
    youtubeUrl: "https://youtu.be/mr2pfZZREOg",
  },
  {
    id: 5,
    titulo: "Conoce a Carlos Acutis",
    youtubeUrl: "https://youtu.be/9UHes5e8gU4",
  },
  {
    id: 3,
    titulo: "Entronización de Carlo Acutis en Fibra TV y Catedral de Chascomús",
    youtubeUrl: "https://youtu.be/dH65bOVBegk",
  },
  {
    id: 2,
    titulo: "Entronización Basílica del Santísimo Sacramento - CABA",
    youtubeUrl: "https://youtu.be/PZYsdxbZRFU",
  },
  {
    id: 1,
    titulo: "Quien fue Carlo Acutis?",
    youtubeUrl: "https://www.youtube.com/watch?v=3IQF38Icrgw",
  },
];
