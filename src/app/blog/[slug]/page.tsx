import { notFound } from "next/navigation";
import { getNovedades } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";
import { ImageLightboxGallery } from "@/components/ImageLightboxGallery";

export const revalidate = 300;

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let novedades: Awaited<ReturnType<typeof getNovedades>> = [];
  try {
    novedades = await getNovedades();
  } catch {
    novedades = [];
  }

  const novedad = novedades.find((item) => item.slug === slug);
  if (!novedad) notFound();
  const imageUrls = novedad.imagenes.length > 0 ? novedad.imagenes : novedad.imagen ? [novedad.imagen] : [];
  const displayTitle = novedad.titulo?.trim() ? novedad.titulo : "Novedad";

  return (
    <main className="page-shell">
      <div className="page-content">
        <PageHeader
          title={displayTitle}
          description={novedad.resumen || "Novedad completa"}
        />

        <SurfaceCard className="mt-8">
          {imageUrls.length > 0 ? (
            <ImageLightboxGallery images={imageUrls} title={displayTitle} />
          ) : null}

          {novedad.fecha ? (
            <p className="mt-4 text-sm text-primary-600/80">{formatDate(novedad.fecha)}</p>
          ) : null}

          <article className="mt-4 whitespace-pre-line text-base leading-relaxed text-primary-700/95">
            {novedad.contenido || novedad.resumen}
          </article>

          {novedad.youtubeEmbedUrl ? (
            <div className="mt-6 overflow-hidden rounded-xl">
              <iframe
                className="aspect-video w-full"
                src={novedad.youtubeEmbedUrl}
                title={`Video de YouTube: ${novedad.titulo}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : null}
        </SurfaceCard>
      </div>
    </main>
  );
}
