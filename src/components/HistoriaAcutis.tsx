import { Section } from "@/components/Section";

const hitos = [
  { fecha: "3 de mayo de 1991", texto: "Nace en Londres, en una familia italiana. Pocos meses después se muda a Milán." },
  { fecha: "12 de octubre de 2006", texto: "Muere en Monza a los 15 años, a causa de una leucemia fulminante." },
  { fecha: "5 de julio de 2018", texto: "El Papa Francisco lo declara Venerable, al reconocer sus virtudes heroicas." },
  { fecha: "10 de octubre de 2020", texto: "Es beatificado en Asís, donde descansa su cuerpo en el Santuario del Despojo." },
  { fecha: "7 de septiembre de 2025", texto: "El Papa León XIV lo canoniza en Roma: es el primer santo de la generación millennial." },
];

const milagros = [
  {
    titulo: "Primer milagro — Matheus (Brasil, 2013)",
    texto:
      "Un niño brasileño de 4 años padecía una malformación grave del páncreas que le impedía alimentarse. Su familia y su parroquia rezaron pidiendo la intercesión de Carlo y tocaron una reliquia suya. La curación fue inmediata y completa, sin explicación médica. Este milagro abrió el camino a su beatificación.",
  },
  {
    titulo: "Segundo milagro — Valeria (Costa Rica, 2022)",
    texto:
      "Una joven costarricense sufrió un traumatismo de cráneo muy grave tras un accidente en bicicleta en Florencia. Su mamá peregrinó hasta la tumba de Carlo en Asís para pedir por ella. Ese mismo día Valeria comenzó a respirar sola y se recuperó por completo. Este milagro fue reconocido en 2024 y permitió su canonización.",
  },
];

export function HistoriaAcutis() {
  return (
    <Section
      id="historia"
      title="¿Quién fue San Carlo Acutis?"
      description="Un adolescente común que hizo de la Eucaristía el centro de su vida y usó internet para acercar a Dios a los demás."
    >
      <div className="mx-auto max-w-2xl">
        <div className="space-y-4 text-base leading-relaxed text-primary-700 md:text-lg">
          <p>
            Carlo Acutis nació en Londres en 1991 y creció en Milán. Era un chico como
            cualquier otro: jugaba a la pelota, tenía amigos, le encantaban las computadoras
            y los videojuegos. Lo que lo hacía distinto era su amor por la Eucaristía. Desde
            su Primera Comunión, a los 7 años, fue a Misa todos los días.
          </p>
          <p>
            Con la programación que aprendió solo, creó un sitio web donde catalogó los
            milagros eucarísticos de todo el mundo. Quería que quienes veían esa muestra
            descubrieran que Jesús está realmente presente en la Hostia. También ayudaba a
            los pobres de su barrio y acompañaba a sus compañeros que sufrían.
          </p>
          <p>
            En octubre de 2006 le diagnosticaron una leucemia fulminante. Ofreció su
            sufrimiento por el Papa y por la Iglesia, y murió el 12 de octubre, a los 15
            años. Hoy su cuerpo descansa en Asís, vestido con jeans y zapatillas, tal como
            él pidió.
          </p>
        </div>

        <blockquote className="mt-8 border-l-4 border-primary-500/40 pl-4 text-lg font-medium italic text-primary-700 md:text-xl">
          “La Eucaristía es mi autopista al Cielo.”
          <footer className="mt-2 text-sm font-normal not-italic text-primary-600">
            San Carlo Acutis
          </footer>
        </blockquote>

        <h3 className="mt-10 text-xl font-semibold text-primary-700 md:text-2xl">
          Los dos milagros reconocidos
        </h3>
        <div className="mt-5 space-y-5">
          {milagros.map((m) => (
            <div key={m.titulo} className="surface-card rounded-2xl p-5">
              <h4 className="text-base font-semibold text-primary-700 md:text-lg">
                {m.titulo}
              </h4>
              <p className="mt-2 text-base leading-relaxed text-primary-600">{m.texto}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-xl font-semibold text-primary-700 md:text-2xl">
          Fechas clave
        </h3>
        <ul className="mt-5 space-y-4 border-l-2 border-primary-500/20 pl-5">
          {hitos.map((h) => (
            <li key={h.fecha} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[26px] top-2 h-2.5 w-2.5 rounded-full bg-primary-500"
              />
              <p className="text-sm font-semibold text-primary-700">{h.fecha}</p>
              <p className="mt-1 text-base leading-relaxed text-primary-600">{h.texto}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-base leading-relaxed text-primary-600">
          Fecha litúrgica: <strong className="text-primary-700">12 de octubre</strong>, y es
          reconocido como patrono de internet y de los jóvenes.
        </p>
      </div>
    </Section>
  );
}
