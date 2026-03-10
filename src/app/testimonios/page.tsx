import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";
import { getTestimonios } from "@/lib/content";

export const revalidate = 300;

export default async function TestimoniosPage() {
  let testimonios: Awaited<ReturnType<typeof getTestimonios>> = [];
  let hasError = false;

  try {
    testimonios = await getTestimonios();
  } catch {
    hasError = true;
  }

  return (
    <main className="page-shell">
      <div className="page-content">
        <PageHeader
          title="Testimonios"
          description="Historias de vida y fe sobre el impacto de San Carlo Acutis."
        />

        <div className="mt-10">
          {hasError ? (
            <EmptyState message="No pudimos cargar los testimonios en este momento." />
          ) : testimonios.length === 0 ? (
            <EmptyState message="Aún no hay testimonios cargados." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {testimonios.map((item) => (
                <SurfaceCard key={item.id}>
                  <h2 className="text-xl font-semibold text-primary-700">{item.titulo}</h2>
                  <p className="mt-3 text-sm text-primary-600/90">{item.descripcion}</p>

                  <div className="mt-4 overflow-hidden rounded-xl">
                    <iframe
                      className="aspect-video w-full"
                      src={item.youtubeEmbedUrl}
                      title={`Testimonio en YouTube: ${item.titulo}`}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </SurfaceCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
