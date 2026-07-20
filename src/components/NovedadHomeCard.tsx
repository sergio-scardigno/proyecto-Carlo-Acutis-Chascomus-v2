import Link from "next/link";
import Image from "next/image";
import type { Novedad } from "@/lib/content";

type NovedadHomeCardProps = {
  novedad: Novedad;
};

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getShortExcerpt(novedad: Novedad, maxLength = 120) {
  const sourceText = (novedad.resumen || novedad.contenido || "").replace(/\s+/g, " ").trim();
  if (!sourceText) return "";
  if (sourceText.length <= maxLength) return sourceText;
  return `${sourceText.slice(0, maxLength)}...`;
}

export function NovedadHomeCard({ novedad }: NovedadHomeCardProps) {
  const href = novedad.slug ? `/blog/${novedad.slug}` : "/blog";
  const excerpt = getShortExcerpt(novedad);
  const fecha = formatDate(novedad.fecha);

  return (
    <Link
      href={href}
      className="surface-card surface-card-interactive group flex cursor-pointer flex-col overflow-hidden rounded-2xl hover:bg-primary-500/5 focus-visible:outline-primary-500"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary-500/5">
        {novedad.imagen ? (
          <Image
            src={encodeURI(novedad.imagen)}
            alt={novedad.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/img/logo/logo.webp"
              alt="Misión San Carlo Acutis"
              width={120}
              height={120}
              className="opacity-70"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-700/45 via-primary-700/5 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-600 shadow-sm shadow-primary-700/20 backdrop-blur">
          Última novedad
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-lg font-semibold text-primary-700 group-hover:text-primary-800">
          {novedad.titulo}
        </h3>
        {fecha ? (
          <div className="mt-1.5 flex items-center gap-1.5 text-primary-600/80">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] font-medium tracking-wide">{fecha}</span>
          </div>
        ) : null}
        {excerpt ? <p className="mt-2 flex-1 text-sm text-primary-600">{excerpt}</p> : <p className="mt-2 flex-1" />}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
          Leer más
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
