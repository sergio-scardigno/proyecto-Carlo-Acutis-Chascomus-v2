"use client";

import { useEffect } from "react";
import type { InstagramPost } from "@/lib/instagram";

type InstagramEmbedModalProps = {
  post: InstagramPost | null;
  onClose: () => void;
};

export function InstagramEmbedModal({ post, onClose }: InstagramEmbedModalProps) {
  useEffect(() => {
    if (!post) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 cursor-pointer p-2 text-white/70 transition-colors hover:text-white"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        <span className="sr-only">Cerrar</span>
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="flex w-full max-w-[400px] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Es el unico lugar del sitio donde se ve la foto del post. */}
        <iframe
          key={post.code}
          src={post.embedUrl}
          title={post.title || "Publicación de Instagram"}
          className="h-[720px] max-h-[85vh] w-full rounded-2xl border-0 bg-white"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <a
          href={post.permalink}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-white"
        >
          Ver en Instagram
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5m0-5L10 14M5 7v12h12" />
          </svg>
        </a>
      </div>
    </div>
  );
}
