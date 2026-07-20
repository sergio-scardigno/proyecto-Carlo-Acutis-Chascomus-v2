import { HeroParallax } from "@/components/HeroParallax";
import { Section } from "@/components/Section";
import Link from "next/link";
import { NovedadesSidebar } from "@/components/NovedadesSidebar";
import { getVideos, getMisiones, getNovedades, type Video, type Novedad } from "@/lib/content";
import { FeaturedVideoCard } from "@/components/FeaturedVideoCard";
import { MisionesHomeCard } from "@/components/MisionesHomeCard";
import { FeatureCard } from "@/components/FeatureCard";
import { NovedadHomeCard } from "@/components/NovedadHomeCard";
import { ContactForm } from "@/components/ContactForm";
import { InstagramHomeSection } from "@/components/InstagramHomeSection";
import { HistoriaAcutis } from "@/components/HistoriaAcutis";
import {
  getInstagramProfile,
  getInstagramPostsPreview,
  type InstagramPost,
  type InstagramProfile,
} from "@/lib/instagram";

export default async function Home() {
  let featuredVideo: Video | null = null;
  let misionConVideo: Awaited<ReturnType<typeof getMisiones>>[number] | null = null;
  let ultimaNovedad: Novedad | null = null;
  let instagramProfile: InstagramProfile | null = null;
  let instagramPosts: InstagramPost[] = [];

  try {
    const videos = await getVideos();
    featuredVideo = videos[0] ?? null;
  } catch {
    featuredVideo = null;
  }

  try {
    const novedades = await getNovedades();
    ultimaNovedad = novedades[0] ?? null;
  } catch {
    ultimaNovedad = null;
  }

  try {
    const misiones = await getMisiones();
    misionConVideo = misiones.find((m) => m.youtubeEmbedUrl) ?? null;
  } catch {
    misionConVideo = null;
  }

  try {
    const [profile, posts] = await Promise.all([
      getInstagramProfile(),
      getInstagramPostsPreview(6),
    ]);
    instagramProfile = profile;
    instagramPosts = posts;
  } catch {
    instagramProfile = null;
    instagramPosts = [];
  }

  return (
    <main className="font-sans">
      <HeroParallax
        title="Misión San Carlo Acutis"
        subtitle="Bienvenidos a la web"
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
        <div className="page-content grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div>
            <HistoriaAcutis />

            <Section
              id="sobre"
              title="Sobre el proyecto"
              description="Inspirado en el Santo Carlo Acutis, compartimos recursos, devociones y contenidos que impulsan la vida de fe."
              background="subtle"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FeatureCard
                  title="Novena"
                  desc="Reza la novena al Santo Carlo Acutis: oración inicial, meditaciones diarias y oración final."
                  href="/novena"
                  image="/img/oracion/primer_dia.jpg"
                  imageAlt="Novena al Santo Carlo Acutis"
                  cta="Rezar la novena"
                  icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  }
                />
                {ultimaNovedad ? (
                  <NovedadHomeCard novedad={ultimaNovedad} />
                ) : (
                  <FeatureCard
                    title="Novedades"
                    desc="Artículos, noticias y reflexiones del proyecto."
                    href="/blog"
                    image="/img/chascomus/carlo-acutis-chascomus.jpg"
                    imageAlt="Novedades del proyecto"
                    cta="Ver novedades"
                    icon={
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                      </svg>
                    }
                  />
                )}
                <FeatureCard
                  title="Entronizaciones"
                  desc="Guía, testimonios e imágenes de las entronizaciones realizadas."
                  href="/entronizaciones"
                  image="/img/entronacion.jpg"
                  imageAlt="Entronizaciones del Santo Carlo Acutis"
                  cta="Ver entronizaciones"
                  icon={
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  }
                />
                {misionConVideo ? (
                  <MisionesHomeCard mission={misionConVideo} />
                ) : (
                  <FeatureCard
                    title="Misiones"
                    desc="Conoce nuestras misiones de evangelización en todo el país."
                    href="/misiones"
                    image="/img/chascomus/carlo-acutis-chascomus.jpg"
                    imageAlt="Misiones de evangelización"
                    cta="Ver misiones"
                    icon={
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M12 3.75c2.071 2.25 3.25 5.176 3.25 8.25S14.071 18 12 20.25c-2.071-2.25-3.25-5.176-3.25-8.25S9.929 6 12 3.75z" />
                      </svg>
                    }
                  />
                )}
              </div>
            </Section>

            {instagramProfile ? (
              <InstagramHomeSection profile={instagramProfile} posts={instagramPosts} />
            ) : null}
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
      className="surface-card surface-card-interactive block rounded-2xl p-6 hover:bg-primary-500/5 focus-visible:outline-primary-500"
    >
      <h3 className="text-lg font-semibold text-primary-700">{title}</h3>
      <p className="mt-2 text-sm text-primary-600">{desc}</p>
    </Link>
  );
}
