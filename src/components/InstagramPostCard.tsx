import Image from "next/image";
import type { InstagramPost } from "@/lib/instagram";

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, "")} mil`;
  }
  return value.toLocaleString("es-AR");
}

function formatPostDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getPostPreviewText(post: InstagramPost) {
  const text = (post.summary || post.title || post.caption || "").trim();
  if (!text) return "";
  const firstLine = text.split("\n").find((line) => line.trim())?.trim() ?? text;
  return firstLine;
}

type InstagramPostCardProps = {
  post: InstagramPost;
  onOpen: (post: InstagramPost) => void;
};

export function InstagramPostCard({ post, onOpen }: InstagramPostCardProps) {
  const isVideo = post.mediaType === "VIDEO";
  const isCarousel = post.mediaType === "CAROUSEL_ALBUM" || post.imageUrls.length > 1;
  const previewText = getPostPreviewText(post);
  const formattedDate = formatPostDate(post.dateUtc);

  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      className="surface-card surface-card-interactive group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl p-0 text-left focus-visible:outline-primary-500"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {post.thumbnailUrl ? (
          <Image
            src={post.thumbnailUrl}
            alt={previewText || "Publicación de Instagram"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized={post.thumbnailUrl.startsWith("/api/directus-assets/")}
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
      </div>

      <div className="flex flex-col gap-2 border-t border-primary-500/10 bg-white/90 p-3 sm:p-3.5">
        {previewText ? (
          <p className="line-clamp-2 text-sm leading-snug text-primary-700">{previewText}</p>
        ) : (
          <p className="text-sm italic text-primary-600/60">Ver publicación en Instagram</p>
        )}

        <div className="flex items-center justify-between gap-2 text-xs text-primary-600/75">
          {formattedDate ? (
            <time dateTime={post.dateUtc} className="font-medium">
              {formattedDate}
            </time>
          ) : (
            <span />
          )}
          <span className="flex shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-1" aria-label={`${post.likeCount} me gusta`}>
              <svg className="h-3.5 w-3.5 text-primary-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5.5 5 5.5c1.9 0 3.2 1.1 4 2.3.8-1.2 2.1-2.3 4-2.3 3 0 4.6 3.1 3 6.4C19.5 16.4 12 21 12 21z" />
              </svg>
              {formatCount(post.likeCount)}
            </span>
            {post.commentCount > 0 ? (
              <span className="inline-flex items-center gap-1" aria-label={`${post.commentCount} comentarios`}>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
                {formatCount(post.commentCount)}
              </span>
            ) : null}
          </span>
        </div>
      </div>
    </button>
  );
}
