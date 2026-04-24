import Link from "next/link";
import type { Mision } from "@/lib/content";

type MisionesHomeCardProps = {
  mission: Mision;
};

export function MisionesHomeCard({ mission }: MisionesHomeCardProps) {
  return (
    <article className="surface-card block rounded-2xl p-6 transition hover:-translate-y-0.5 hover:bg-primary-500/5 hover:shadow-lg hover:shadow-primary-500/20">
      <h3 className="text-lg font-semibold text-primary-700">
        <Link
          href="/misiones"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Misiones
        </Link>
      </h3>
      <p className="mt-2 text-sm text-primary-600/85">
        Conoce nuestras misiones de evangelización en todo el país.
      </p>
      {mission.titulo ? (
        <p className="mt-3 text-sm font-medium text-primary-700/90">{mission.titulo}</p>
      ) : null}
      {mission.youtubeEmbedUrl ? (
        <div className="mt-4 overflow-hidden rounded-xl">
          <iframe
            className="aspect-video w-full"
            src={mission.youtubeEmbedUrl}
            title={`Misión en YouTube: ${mission.titulo || "Misiones"}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : null}
      <Link
        href="/misiones"
        className="mt-4 inline-flex text-sm font-semibold text-primary-600 underline-offset-4 transition hover:text-primary-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        Ver todas las misiones
      </Link>
    </article>
  );
}
