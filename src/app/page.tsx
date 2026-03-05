import { HeroParallax } from "@/components/HeroParallax";
import { Section } from "@/components/Section";
import Link from "next/link";
import { getNovedades } from "@/lib/content";

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function Home() {
  let novedades: Awaited<ReturnType<typeof getNovedades>> = [];
  try {
    novedades = (await getNovedades()).slice(0, 4);
  } catch {
    novedades = [];
  }

  return (
    <main className="font-sans">
      <HeroParallax
        title="Proyecto Carlo Acutis"
        subtitle="Una página moderna con parallax multicapa, secciones claras y navegación simple."
        layers={[
          {
            src: "/parallax/catedral.png",
            speed: 0.12,
            opacity: 1,
            size: "cover",
            position: "center",
            className: "",
          },
          {
            src: "/parallax/arbustos.png",
            speed: 0.24,
            opacity: 1,
            size: "cover",
            position: "center 100%",
            className: "",
          },
          {
            src: "/parallax/carlos-acutis.png",
            speed: 0.38,
            opacity: 1,
            size: "contain",
            position: "55% 100%",
            className: "",
          },
        ]}
        mobileLayers={[
          {
            src: "/parallax/movil/catedral.png",
            speed: 0.18,
            opacity: 1,
            size: "cover",
            position: "center",
          },
          {
            src: "/parallax/movil/arbustos.png",
            speed: 0.35,
            opacity: 1,
            size: "cover",
            position: "center 95%",
          },
          {
            src: "/parallax/movil/carlos-acutis.png",
            speed: 0.55,
            opacity: 1,
            size: "cover",
            position: "center 98%",
          },
        ]}
        ctaText="Conocer más"
        scrollToId="sections"
      />
      <div id="sections" className="page-shell">
        <div className="page-content grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div>
            <Section
              id="sobre"
              title="Sobre el proyecto"
              description="Inspirado en el Beato Carlo Acutis, compartimos recursos, devociones y contenidos que impulsan la vida de fe."
              background="subtle"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card title="Novena" desc="Reza la novena de Carlo Acutis." href="/novena" />
                <Card title="Novedades" desc="Artículos y reflexiones." href="/blog" />
                <Card title="Entronizaciones" desc="Guía y testimonios." href="/entronizaciones" />
              </div>
            </Section>
            <Section
              title="Multimedia y contacto"
              description="Explora videos y ponte en contacto con nosotros."
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card title="Videos" desc="Colección de videos." href="/videos" />
                <Card title="Contacto" desc="Escríbenos para más información." href="/contacto" />
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface-card rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-primary-700">Últimas novedades</h2>
                <Link href="/blog" className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                  Ver todas
                </Link>
              </div>

              {novedades.length === 0 ? (
                <p className="mt-4 text-sm text-primary-600/80">
                  Pronto publicaremos nuevas novedades.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {novedades.map((item) => (
                    <Link
                      key={item.id}
                      href="/blog"
                      className="block rounded-xl border border-primary-600/15 bg-white/90 p-3 transition hover:bg-primary-500/5"
                    >
                      <p className="line-clamp-2 text-sm font-semibold text-primary-700">{item.titulo}</p>
                      {item.fecha ? (
                        <p className="mt-1 text-xs text-primary-600/70">{formatDate(item.fecha)}</p>
                      ) : null}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

type CardProps = { title: string; desc: string; href: string };
function Card({ title, desc, href }: CardProps) {
  return (
    <Link
      href={href}
      className="surface-card block rounded-2xl p-6 transition hover:-translate-y-0.5 hover:bg-primary-500/5 hover:shadow-lg hover:shadow-primary-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      <h3 className="text-lg font-semibold text-primary-700">{title}</h3>
      <p className="mt-2 text-sm text-primary-600/85">{desc}</p>
    </Link>
  );
}
