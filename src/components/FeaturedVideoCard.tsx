"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Video } from "@/lib/content";

type FeaturedVideoCardProps = {
  video: Video;
};

export function FeaturedVideoCard({ video }: FeaturedVideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <article className="surface-card rounded-2xl p-4 md:p-5">
        <div className="relative h-44 w-full overflow-hidden rounded-xl">
          <Image
            src={video.thumbnailUrl}
            alt={`Vista previa de ${video.titulo}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-primary-700">{video.titulo}</h3>
        <p className="mt-2 text-sm text-primary-600/85">
          {video.descripcion || "Video destacado de la comunidad."}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary-700"
          >
            Ver video
          </button>
          <Link
            href="/videos"
            className="rounded-full border border-primary-600/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-700 transition hover:bg-primary-500/10"
          >
            Ver todos los videos
          </Link>
        </div>
      </article>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="surface-card w-full max-w-4xl rounded-2xl p-4 md:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-base font-semibold text-primary-700 md:text-lg">{video.titulo}</h4>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-primary-600/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 transition hover:bg-primary-500/10"
              >
                Cerrar
              </button>
            </div>

            <div className="overflow-hidden rounded-xl">
              <iframe
                className="aspect-video w-full"
                src={video.youtubeEmbedUrl}
                title={`Video de YouTube: ${video.titulo}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
