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

/**
 * El texto es el contenido de la card: la foto solo aparece en el embed del modal.
 * Por eso priorizamos el caption completo y no la primera linea del resumen.
 */
function getPostPreviewText(post: InstagramPost) {
  const text = (post.caption || post.summary || post.title || "").trim();
  return text.replace(/\n{2,}/g, "\n");
}

const PlayIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CarouselIcon = () => (
  <svg
    className="h-3.5 w-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <rect x="7" y="3" width="14" height="14" rx="2" />
    <path d="M3 7v12a2 2 0 0 0 2 2h12" />
  </svg>
);

const PhotoIcon = () => (
  <svg
    className="h-3.5 w-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="8.5" cy="10" r="1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 16-5-5-4.5 5-2-2L3 19" />
  </svg>
);

/** El chip de tipo es lo unico que distingue una card de otra de un vistazo. */
function mediaBadge(mediaType: InstagramPost["mediaType"]) {
  if (mediaType === "VIDEO") {
    return { label: "Reel", icon: <PlayIcon />, className: "bg-accent-500/12 text-accent-500" };
  }
  if (mediaType === "CAROUSEL_ALBUM") {
    return {
      label: "Carrusel",
      icon: <CarouselIcon />,
      className: "bg-primary-500/12 text-primary-600",
    };
  }
  return { label: "Foto", icon: <PhotoIcon />, className: "bg-primary-500/8 text-primary-600/80" };
}

type InstagramPostCardProps = {
  post: InstagramPost;
  onOpen: (post: InstagramPost) => void;
};

export function InstagramPostCard({ post, onOpen }: InstagramPostCardProps) {
  const previewText = getPostPreviewText(post);
  const formattedDate = formatPostDate(post.dateUtc);
  const badge = mediaBadge(post.mediaType);
  const showPlays = post.mediaType === "VIDEO" && (post.playCount ?? 0) > 0;
  // Sin miniatura (post todavia no sincronizado) la card cae a solo texto, que
  // se sostiene sola en vez de dejar un hueco gris.
  const hasImage = Boolean(post.thumbnailUrl);

  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      aria-label={
        formattedDate
          ? `Abrir publicación de Instagram del ${formattedDate}`
          : "Abrir publicación de Instagram"
      }
      className={`surface-card surface-card-interactive group flex h-full w-full cursor-pointer flex-col rounded-2xl text-left focus-visible:outline-primary-500 ${
        hasImage ? "gap-0 overflow-hidden p-0" : "gap-3 p-5"
      }`}
    >
      {hasImage ? (
        <div className="relative aspect-square w-full overflow-hidden bg-primary-500/10">
          <Image
            src={post.thumbnailUrl}
            alt={previewText.slice(0, 120) || "Publicación de Instagram"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          <span
            className={`absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${badge.className}`}
          >
            {badge.icon}
            {badge.label}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}
          >
            {badge.icon}
            {badge.label}
          </span>
          {formattedDate ? (
            <time dateTime={post.dateUtc} className="text-xs font-medium text-primary-600/70">
              {formattedDate}
            </time>
          ) : null}
        </div>
      )}

      <div className={hasImage ? "flex flex-1 flex-col gap-2 p-4" : "contents"}>
        {previewText ? (
          <p
            className={`text-primary-700 whitespace-pre-line ${
              hasImage
                ? "line-clamp-2 text-sm leading-snug"
                : "line-clamp-5 border-l-2 border-primary-500/25 pl-3 text-[15px] leading-relaxed"
            }`}
          >
            {previewText}
          </p>
        ) : (
          <p
            className={`italic text-primary-600/60 ${
              hasImage ? "text-sm" : "border-l-2 border-primary-500/15 pl-3 text-[15px]"
            }`}
          >
            Ver publicación en Instagram
          </p>
        )}

        {hasImage && formattedDate ? (
          <time dateTime={post.dateUtc} className="text-xs font-medium text-primary-600/70">
            {formattedDate}
          </time>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-primary-500/10 pt-3 text-xs text-primary-600/75">
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
          {showPlays ? (
            <span className="inline-flex items-center gap-1" aria-label={`${post.playCount} reproducciones`}>
              <PlayIcon />
              {formatCount(post.playCount ?? 0)}
            </span>
          ) : null}
        </span>

        <span className="inline-flex shrink-0 items-center gap-1 font-medium text-primary-600">
          Ver publicación
          <svg
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
          </svg>
        </span>
        </div>
      </div>
    </button>
  );
}
