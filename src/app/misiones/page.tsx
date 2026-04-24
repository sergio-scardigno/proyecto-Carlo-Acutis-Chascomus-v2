import { EmptyState } from "@/components/EmptyState";
import { ImageGallery } from "@/components/ImageGallery";
import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";
import { getMisiones } from "@/lib/content";

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

export default async function MisionesPage() {
  let misiones: Awaited<ReturnType<typeof getMisiones>> = [];
  let hasError = false;

  try {
    misiones = await getMisiones();
  } catch {
    hasError = true;
  }

  return (
    <main className="page-shell">
      <div className="page-content">
        <PageHeader
          title="Misiones"
          description="Un camino vivo de evangelizacion que recorre el pais llevando fe, consuelo y esperanza."
        />

        <SurfaceCard className="mt-10">
          <div className="space-y-4 text-primary-700/90">
            <p>
              Las misiones que realizamos con las replicas de San Carlo Acutis Chascomus Argentina son un
              camino vivo de evangelizacion que recorre todo el pais, llevando su presencia y su mensaje a
              cada rincon donde mas se necesita.
            </p>
            <p>
              Son imagenes peregrinas que no solo visitan lugares, sino que llegan al corazon de las
              personas: a las familias, a los enfermos, a los jovenes, a quienes buscan fe, consuelo y
              esperanza. Cada replica es un puente que une a la gente con Dios, recordando que la santidad
              es posible hoy, en lo cotidiano.
            </p>
            <p>
              Nuestra mision no es material ni economica, es espiritual: sembrar fe, despertar el amor por
              la Eucaristia y acompanar a cada persona en su encuentro con Dios, tal como San Carlo lo hacia.
            </p>
            <p className="font-semibold text-primary-700">
              Porque donde llega Carlo... algo en el alma se enciende.
            </p>
          </div>
        </SurfaceCard>

        <div className="mt-10">
          {hasError ? (
            <EmptyState message="No pudimos cargar las misiones en este momento." />
          ) : misiones.length === 0 ? (
            <EmptyState message="Aun no hay misiones publicadas." />
          ) : (
            <div className="space-y-8">
              {misiones.map((item) => (
              <SurfaceCard key={item.id}>
                <h2 className="text-xl font-semibold text-primary-700">{item.titulo}</h2>
                {item.fecha ? (
                  <p className="mt-1 text-sm text-primary-600/80">{formatDate(item.fecha)}</p>
                ) : null}
                {item.texto ? <p className="mt-3 text-primary-600/90">{item.texto}</p> : null}
                {item.imagenes.length > 0 ? (
                  <ImageGallery images={item.imagenes} lugar={item.titulo} slug={`mision-${item.id}`} />
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
