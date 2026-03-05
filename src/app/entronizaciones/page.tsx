import { getEntronizaciones } from "@/lib/content";
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

export default async function EntronizacionesPage() {
  let entronizaciones: Awaited<ReturnType<typeof getEntronizaciones>> = [];
  let hasError = false;

  try {
    entronizaciones = await getEntronizaciones();
  } catch {
    hasError = true;
  }

  return (
    <main className="page-shell">
      <div className="page-content">
        <PageHeader
          title="Entronizaciones"
          description="Información, guía práctica y testimonios sobre entronizaciones."
        />

        <div className="mt-10">
          {hasError ? (
            <EmptyState message="No pudimos cargar las entronizaciones en este momento." />
          ) : entronizaciones.length === 0 ? (
            <EmptyState message="Aún no hay entronizaciones cargadas." />
          ) : (
            <div className="space-y-8">
              {entronizaciones.map((item) => (
                <SurfaceCard key={item.id}>
                  <h2 className="text-xl font-semibold text-primary-700">{item.lugar}</h2>
                  {item.fecha ? (
                    <p className="mt-1 text-sm text-primary-600/80">{formatDate(item.fecha)}</p>
                  ) : null}
                  <p className="mt-3 text-primary-600/90">{item.descripcion}</p>

                  {item.imagenes.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {item.imagenes.map((imagePath) => (
                        <div
                          key={`${item.slug}-${imagePath}`}
                          className="relative h-48 w-full overflow-hidden rounded-xl"
                        >
                          <Image
                            src={encodeURI(imagePath)}
                            alt={`Entronización en ${item.lugar}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </SurfaceCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


