// Contenido estatico del sitio. Se edita a mano; no hay CMS detras.
//
// Reglas:
//   - El `id` define el orden (mayor id = primero) y es la key de React. No reasignar.
//   - Las rutas de imagen son relativas a public/ y algunas tienen acentos y espacios:
//     copialas tal cual, los componentes ya hacen encodeURI.

import type { EntronizacionInput } from "./types";

export const entronizaciones: EntronizacionInput[] = [
  {
    id: 15,
    slug: "veronica-iglesia-de-lourdes",
    lugar: "Verónica - Iglesia de Lourdes",
    fecha: "2026-03-05 13:54:23+00:00",
    descripcion: "Una celebración con fe, esperanza y gratitud. Participaron los bomberos y el grupo Scout de la ciudad.",
    imagenes: [
      "/img/entronizaciones/Verónica Pinta Indio.jpg",
      "/img/entronizaciones/Verónica Pinta Indio2.jpg",
    ],
  },
  {
    id: 14,
    slug: "buenos-aires-uca-campus-puerto-madero",
    lugar: "Buenos Aires - UCA (Campus Puerto Madero)",
    fecha: "2026-03-05 13:54:01+00:00",
    descripcion: "La UCA inauguró el Oratorio \"Carlos Acutis\" en el Edif. Santo Tomás Moro, con misa previa en la Iglesia del Corazón de Jesús.",
    imagenes: [
      "/img/entronizaciones/Esas en la UCA Puerto Madero.jpg",
      "/img/entronizaciones/Esas en la UCA Puerto Madero2.jpg",
    ],
  },
  {
    id: 13,
    slug: "capital-federal-iglesia-del-santisimo-sacramento",
    lugar: "Capital Federal - Iglesia del Santísimo Sacramento",
    fecha: "2026-03-05 13:53:34+00:00",
    descripcion: "La entronización de Carlo Acutis fue una ceremonia muy emotiva y emocionante. La misa estuvo a cargo del padre Rafael Emilio Caceres Olave.",
    imagenes: [
      "/img/entronizaciones/santisimo-sacramento.jpg",
    ],
  },
  {
    id: 12,
    slug: "roque-perez-iglesia-de-roque-perez",
    lugar: "Roque Pérez - Iglesia de Roque Pérez",
    fecha: "2026-03-05 13:53:15+00:00",
    descripcion: "Momento inolvidable con la entronización del Beato Carlo Acutis. Una jornada cargada de fe y emoción.",
    imagenes: [
      "/img/entronizaciones/Roque Pérez Buenos Aires.jpg",
      "/img/entronizaciones/Roque Pérez Buenos Aires2.jpg",
    ],
  },
  {
    id: 11,
    slug: "dolores-merendero-san-juan-bautista",
    lugar: "Dolores - Merendero San Juan Bautista",
    fecha: "2026-03-05 13:52:52+00:00",
    descripcion: "Agradecimiento profundo por hacer posible esta hermosa entronización. Un momento de fe, amor y unión que quedará en el corazón de todos.",
    imagenes: [
      "/img/entronizaciones/Merendero SAN JUAN BAUTISTA DOLORES.jpg",
      "/img/entronizaciones/Merendero SAN JUAN BAUTISTA DOLORES2.jpg",
    ],
  },
  {
    id: 10,
    slug: "fibra-tv-chascomus",
    lugar: "FIBRA TV - Chascomús",
    fecha: "2026-03-05 13:52:29+00:00",
    descripcion: "Se entronizó la imagen de Carlo Acutis traída desde Asís, con bendición del Obispo Juan Ignacio Liebana y participación de Scouts y Bomberos.",
    imagenes: [
      "/img/entronizaciones/FIBRA TV CHASCOMUS.jpg",
    ],
  },
  {
    id: 9,
    slug: "castelli-parroquia-santa-rosa-de-lima",
    lugar: "Castelli - Parroquia Santa Rosa de Lima",
    fecha: "2026-03-05 13:52:12+00:00",
    descripcion: "Celebración de la entronización de Carlo Acutis en Castelli, presidida por el Padre Ezequiel. Incluyó el testimonio de Carlos Bonicalzi.",
    imagenes: [
      "/img/entronizaciones/CASTELLI.jpg",
    ],
  },
  {
    id: 8,
    slug: "general-guido-parroquia-nuestra-senora-de-la-merced",
    lugar: "General Guido - Parroquia Nuestra Señora de la Merced",
    fecha: "2026-03-05 13:51:49+00:00",
    descripcion: "La comunidad de General Guido recibió la imagen de Carlo Acutis con gran devoción. Presidida por Monseñor José María Baliña.",
    imagenes: [
      "/img/entronizaciones/Gral Guido.jpg",
    ],
  },
  {
    id: 7,
    slug: "labarden-parroquia-sagrado-corazon-de-jesus",
    lugar: "Labardén - Parroquia Sagrado Corazón de Jesús",
    fecha: "2026-03-05 13:51:30+00:00",
    descripcion: "Entronización de Carlo Acutis presidida por Monseñor José María Baliña, con un profundo espíritu de fe y emoción.",
    imagenes: [
      "/img/entronizaciones/Labarden.jpg",
    ],
  },
  {
    id: 6,
    slug: "las-armas-capilla-nuestra-senora-de-lujan",
    lugar: "Las Armas - Capilla Nuestra Señora de Luján",
    fecha: "2026-03-05 13:50:54+00:00",
    descripcion: "Compartimos la emotiva entronización de Carlo Acutis en Las Armas. La misa fue presidida por Monseñor José María Baliña.",
    imagenes: [
      "/img/entronizaciones/Las Armas.jpg",
      "/img/entronizaciones/Las Armas2.jpg",
    ],
  },
  {
    id: 5,
    slug: "chascomus-catedral-nuestra-senora-de-la-merced",
    lugar: "Chascomús - Catedral Nuestra Señora de la Merced",
    fecha: "2026-03-05 13:50:05+00:00",
    descripcion: "Entronización de Carlo Acutis en la Catedral de Chascomús, un momento de profunda fe y devoción para la comunidad.",
    imagenes: [
      "/img/entronizaciones/Catedral Nuestra Señora de la Merced CHASCOMUS.jpg",
    ],
  },
  {
    id: 4,
    slug: "basilica-de-lujan",
    lugar: "Basílica de Luján",
    fecha: "2026-03-05 13:49:26+00:00",
    descripcion: "Vivimos un acontecimiento trascendental en la historia de nuestra fe: la entronización de la imagen de Carlo Acutis en la Basílica de Nuestra Señora de Luján, el corazón espiritual de Argentina. Agradecemos al Padre Lucas García por su generosidad y compromiso.",
    imagenes: [
      "/img/entronizaciones/Basílica de Luján.jpg",
    ],
  },
  {
    id: 3,
    slug: "lezama",
    lugar: "Lezama",
    fecha: "2026-03-05 11:30:29+00:00",
    descripcion: [
      "Entronización de Carlo Acutis en Lezama, un momento de profunda fe y devoción para la comunidad.",
      "",
    ].join("\n\n"),
    imagenes: [
      "/img/entronizaciones/LEZAMA.jpg",
    ],
  },
  {
    id: 2,
    slug: "chascomus-nuestra-senora-de-lujan",
    lugar: "Chascomús - Nuestra Señora de Luján",
    fecha: "2026-03-05 10:36:53+00:00",
    descripcion: [
      "✨ El 8 de junio de 2025 a las 11 hs, en la Iglesia de Nuestra Señora de Luján de Chascomús, vivimos un momento verdaderamente extraordinario: la entronización de la imagen de Carlo Acutis.",
      "",
    ].join("\n\n"),
    imagenes: [
      "/img/entronizaciones/chascomus/entronizacion-iglesia-lujan-chascomus-3.webp",
      "/img/entronizaciones/chascomus/entronizacion-iglesia-lujan-chascomus-2.webp",
      "/img/entronizaciones/chascomus/entronizacion-iglesia-lujan-chascomus-4.webp",
      "/img/entronizaciones/chascomus/entronizacion-iglesia-lujan-chascomus-1.webp",
    ],
  },
];
