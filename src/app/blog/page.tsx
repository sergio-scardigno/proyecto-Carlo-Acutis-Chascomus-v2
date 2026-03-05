import { getNovedades } from "@/lib/content";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";
import Image from "next/image";

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

export default async function BlogPage() {
  let novedades: Awaited<ReturnType<typeof getNovedades>> = [];
  let hasError = false;

  try {
    novedades = await getNovedades();
  } catch {
    hasError = true;
  }

  return (
    <main className="page-shell">
      <div className="page-content">
        <PageHeader
          title="Novedades"
          description="Artículos, noticias y reflexiones relacionados con el proyecto."
        />

        <div className="mt-10">
          {hasError ? (
            <EmptyState message="No pudimos cargar las novedades en este momento." />
          ) : novedades.length === 0 ? (
            <EmptyState message="Aún no hay novedades publicadas." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {novedades.map((item) => (
                <SurfaceCard key={item.id}>
                  {item.imagen ? (
                    <div className="relative h-44 w-full overflow-hidden rounded-xl">
                      <Image
                        src={encodeURI(item.imagen)}
                        alt={item.titulo}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                  <h2 className="mt-4 text-xl font-semibold text-primary-700">{item.titulo}</h2>
                  {item.fecha ? (
                    <p className="mt-1 text-sm text-primary-600/80">{formatDate(item.fecha)}</p>
                  ) : null}
                  <p className="mt-3 text-sm text-primary-600/90">{item.resumen || item.contenido}</p>
                </SurfaceCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


