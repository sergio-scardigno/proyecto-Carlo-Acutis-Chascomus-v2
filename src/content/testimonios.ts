// Contenido estatico del sitio. Se edita a mano; no hay CMS detras.
//
// Reglas:
//   - El `id` define el orden (mayor id = primero) y es la key de React. No reasignar.
//   - Las rutas de imagen son relativas a public/ y algunas tienen acentos y espacios:
//     copialas tal cual, los componentes ya hacen encodeURI.
//   - Sin `youtubeUrl` valido el video no se muestra: la home renderiza
//     videos[0] y da por hecho que tiene miniatura de YouTube.
//

import type { TestimonioInput } from "./types";

export const testimonios: TestimonioInput[] = [
  {
    id: 20,
    slug: "el-agradecimiento-de-la-mama-de-carlo-para-jeronimo-el-escultor",
    titulo: "El agradecimiento de la mamá de Carlo para Jerónimo el escultor.",
    descripcion: [
      "El emotivo mensaje de agradecimiento de Antonia Salzano al escultor Jerónimo Villalba nos llenó el corazón ❤️",
      "La mamá de Carlo destacó el enorme talento y amor con el que fue realizada la imagen de San Carlo Acutis que hoy ya toca miles de vidas.",
      "Además, nos obsequió reliquias de primer orden del lienzo que cubrió a Carlo, para que cada imagen peregrina pueda llevar una reliquia y recorrer toda la Argentina 🇦🇷",
      "Una misión de fe y evangelización que continúa de la mano del GRUPO SAN CARLO ACUTIS CHASCOMÚS ARGENTINA 🙏",
    ].join("\n\n"),
    youtubeUrl: "https://youtube.com/shorts/1i9uuLNHFeQ?is=m4maQXIFYstgeNnk",
  },
  {
    id: 19,
    slug: "testimonio-de-gabriela-duena-de-la-santeria-q-visitaba-carlo-en-asis",
    titulo: "Testimonio de Gabriela dueña de la Santería q visitaba Carlo en Asis",
    youtubeUrl: "https://youtube.com/shorts/ICDP8keRdw0?is=vUzxHBvccMurdGwQ",
  },
  {
    id: 17,
    slug: "imagen-peregrina-de-san-carlo-acutis-en-mendoza",
    titulo: "Imagen peregrina de SAN CARLO ACUTIS en Mendoza ",
    youtubeUrl: "https://youtube.com/shorts/rz8M9R912HU?si=fEZQpZ0TVrvjo87X",
  },
  {
    id: 16,
    slug: "bendicion-del-obispo-de-la-diocesis-de-chascomus",
    titulo: "BENDICIÓN DEL OBISPO DE LA DIÓCESIS DE CHASCOMÚS ",
    youtubeUrl: "https://youtube.com/shorts/r_G1EfLIj8I?si=YEISvTSudvV4NNM5",
  },
  {
    id: 15,
    slug: "testimonio-de-maria-de-la-ciudad-de-caseros",
    titulo: "Testimonio de María de la ciudad de Caseros ",
    youtubeUrl: "https://youtu.be/UDI6SyHlTpw?feature=shared",
  },
  {
    id: 13,
    slug: "padre-carlos",
    titulo: "PADRE CARLOS ",
    youtubeUrl: "https://youtube.com/shorts/NwNE3xAFNA4?si=fSxXBbOEt71p2ekh",
  },
  {
    id: 12,
    slug: "testimonio-de-angela-de-godoy-cruz-mendoza",
    titulo: "Testimonio de Ángela de Godoy Cruz MENDOZA ",
    youtubeUrl: "https://youtube.com/shorts/ts1kQY1-UGM?si=e5h3TgIpmn-ru4P2",
  },
  {
    id: 11,
    slug: "testimonio-11",
    youtubeUrl: "https://youtube.com/shorts/mHWklWti1Gg?si=dJ6AxC4rS4LoGXlT",
  },
  {
    id: 10,
    slug: "testimonio-10",
    youtubeUrl: "https://youtube.com/shorts/bN2A8Vlid6w?si=vsDKZlcgsXuP2rNk",
  },
  {
    id: 8,
    slug: "testimonio-8",
    youtubeUrl: "https://youtube.com/shorts/wlx3RX4NbwM?si=yYIhTdDHfd5a6Ult",
  },
  {
    id: 6,
    slug: "testimonio-6",
    youtubeUrl: "https://youtu.be/chyEFoL-AWY",
  },
];
