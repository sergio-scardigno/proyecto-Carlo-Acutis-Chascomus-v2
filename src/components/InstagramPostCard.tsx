import Image from "next/image";
import type { InstagramPost } from "@/lib/instagram";

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, "")} mil`;
  }
  return value.toLocaleString("es-AR");
}

type InstagramPostCardProps = {
  post: InstagramPost;
  onOpen: (post: InstagramPost) => void;
};

export function InstagramPostCard({ post, onOpen }: InstagramPostCardProps) {
  const isVideo = post.mediaType === "VIDEO";
  const isCarousel = post.mediaType === "CAROUSEL_ALBUM" || post.imageUrls.length > 1;

  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      className="surface-card surface-card-interactive group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl p-0 text-left focus-visible:outline-primary-500"
    >
      {post.thumbnailUrl ? (
        <Image
          src={post.thumbnailUrl}
          alt={post.title || "Publicación de Instagram"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary-500/10 text-primary-600">
          <span className="text-sm">Sin imagen</span>
        </div>
      )}

      <div className="absolute right-2 top-2 flex gap-1.5">
        {isVideo ? (
          <span className="rounded-full bg-black/55 p-1.5 text-white backdrop-blur-sm">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : null}
        {isCarousel ? (
          <span className="rounded-full bg-black/55 p-1.5 text-white backdrop-blur-sm">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="7" y="3" width="14" height="14" rx="2" />
              <path d="M3 7v12a2 2 0 0 0 2 2h12" />
            </svg>
          </span>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex items-center gap-1 text-sm font-semibold text-white drop-shadow">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5.5 5 5.5c1.9 0 3.2 1.1 4 2.3.8-1.2 2.1-2.3 4-2.3 3 0 4.6 3.1 3 6.4C19.5 16.4 12 21 12 21z" />
          </svg>
          {formatCount(post.likeCount)}
        </span>
        {post.playCount ? (
          <span className="flex items-center gap-1 text-xs font-medium text-white/90 drop-shadow">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            {formatCount(post.playCount)}
          </span>
        ) : null}
      </div>
    </button>
  );
}
