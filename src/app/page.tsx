import { HeroParallax } from "@/components/HeroParallax";
import { Section } from "@/components/Section";
import Link from "next/link";
import { NovedadesSidebar } from "@/components/NovedadesSidebar";
import { getVideos, type Video } from "@/lib/content";
import { FeaturedVideoCard } from "@/components/FeaturedVideoCard";
import { ContactForm } from "@/components/ContactForm";

export default async function Home() {
  let featuredVideo: Video | null = null;

  try {
    const videos = await getVideos();
    featuredVideo = videos[0] ?? null;
  } catch {
    featuredVideo = null;
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
                {featuredVideo ? (
                  <FeaturedVideoCard video={featuredVideo} />
                ) : (
                  <Card title="Videos" desc="Colección de videos." href="/videos" />
                )}
                <ContactForm />
              </div>
            </Section>
          </div>

          <NovedadesSidebar />
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
