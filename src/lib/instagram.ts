/**
 * Instagram data layer — lee desde Directus CMS.
 *
 * El scraper Python (scrapper-ig-carlos-acutis/scraper.py) sincroniza @sancarloacutischascomus
 * hacia las colecciones `instagram_profile` (singleton) y `instagram_posts` de Directus,
 * subiendo las imagenes a Directus Files para URLs estables.
 *
 * Next.js usa ISR (revalidate) para refrescar cada cierto tiempo sin redeploy.
 */

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramPost = {
  code: string;
  permalink: string;
  dateUtc: string;
  mediaType: InstagramMediaType;
  title: string;
  summary: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  playCount: number | null;
  thumbnailUrl: string;
  imageUrls: string[];
  embedUrl: string;
};

export type InstagramProfile = {
  username: string;
  fullName: string;
  biography: string;
  profileUrl: string;
  profilePicUrl: string;
  isVerified: boolean;
  followers: number;
  following: number;
  totalPosts: number;
};

export type InstagramData = {
  profile: InstagramProfile;
  availablePosts: number;
  generatedAt: string;
  posts: InstagramPost[];
};

// ── Config ─────────────────────────────────────────────────────────

const DIRECTUS_BASE_URL = process.env.DIRECTUS_BASE_URL ?? "";
const DIRECTUS_API_TOKEN = process.env.DIRECTUS_API_TOKEN ?? "";

const DIRECTUS_INSTAGRAM_PROFILE_ENDPOINT =
  process.env.DIRECTUS_INSTAGRAM_PROFILE_ENDPOINT ??
  "/items/instagram_profile?limit=1";

const DIRECTUS_INSTAGRAM_POSTS_ENDPOINT =
  process.env.DIRECTUS_INSTAGRAM_POSTS_ENDPOINT ??
  "/items/instagram_posts?fields=*&filter[status][_eq]=published&sort=-date_utc&limit=-1";

const INSTAGRAM_REVALIDATE_SECONDS = 300;

const DIRECTUS_ASSET_ID_RE = /\/assets\/([0-9a-f-]{36})/i;

// ── Fetch helpers ──────────────────────────────────────────────────

type DirectusResponse<T> = { data: T };

async function directusFetch<T>(endpoint: string): Promise<T> {
  if (!DIRECTUS_BASE_URL) {
    throw new Error("DIRECTUS_BASE_URL no configurada");
  }

  const url = `${DIRECTUS_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {};

  if (DIRECTUS_API_TOKEN) {
    headers["Authorization"] = `Bearer ${DIRECTUS_API_TOKEN}`;
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Directus API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── Mappers (Directus snake_case → camelCase) ──────────────────────

/** Usa el proxy local para assets de Directus (requieren token). */
function resolveInstagramMediaUrl(url: string): string {
  if (!url) return "";
  const match = url.match(DIRECTUS_ASSET_ID_RE);
  if (match?.[1]) {
    return `/api/directus-assets/${match[1]}`;
  }
  return url;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProfile(raw: any): InstagramProfile {
  return {
    username: raw.username ?? "",
    fullName: raw.full_name ?? "",
    biography: raw.biography ?? "",
    profileUrl: raw.profile_url ?? "",
    profilePicUrl: resolveInstagramMediaUrl(raw.profile_pic_url ?? ""),
    isVerified: Boolean(raw.is_verified),
    followers: raw.followers ?? 0,
    following: raw.following ?? 0,
    totalPosts: raw.total_posts ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(raw: any): InstagramPost {
  const imageUrls = Array.isArray(raw.image_urls)
    ? raw.image_urls.filter((url: unknown): url is string => typeof url === "string" && url.length > 0)
    : [];

  return {
    code: raw.code ?? "",
    permalink: raw.permalink ?? "",
    dateUtc: raw.date_utc ?? "",
    mediaType: (raw.media_type as InstagramMediaType) ?? "IMAGE",
    title: raw.title ?? "",
    summary: raw.summary ?? raw.title ?? "",
    caption: raw.caption ?? "",
    likeCount: raw.like_count ?? 0,
    commentCount: raw.comment_count ?? 0,
    playCount: raw.play_count ?? null,
    thumbnailUrl: resolveInstagramMediaUrl(raw.thumbnail_url || imageUrls[0] || ""),
    imageUrls: imageUrls.map(resolveInstagramMediaUrl),
    embedUrl: raw.embed_url ?? "",
  };
}

// ── Public API ─────────────────────────────────────────────────────

export async function getInstagramData(): Promise<InstagramData> {
  const [profileRes, postsRes] = await Promise.all([
    directusFetch<{ data: unknown[] }>(DIRECTUS_INSTAGRAM_PROFILE_ENDPOINT),
    directusFetch<{ data: unknown[] }>(DIRECTUS_INSTAGRAM_POSTS_ENDPOINT),
  ]);

  const profileRaw = Array.isArray(profileRes.data) ? profileRes.data[0] : null;
  const postsRaw = Array.isArray(postsRes.data) ? postsRes.data : [];

  const profile: InstagramProfile = profileRaw
    ? mapProfile(profileRaw)
    : {
        username: "sancarloacutischascomus",
        fullName: "",
        biography: "",
        profileUrl: "https://www.instagram.com/sancarloacutischascomus/",
        profilePicUrl: "",
        isVerified: false,
        followers: 0,
        following: 0,
        totalPosts: 0,
      };

  const posts: InstagramPost[] = postsRaw.map(mapPost);

  return {
    profile,
    availablePosts: posts.length,
    generatedAt: new Date().toISOString(),
    posts,
  };
}

export async function getInstagramProfile(): Promise<InstagramProfile> {
  const data = await getInstagramData();
  return data.profile;
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const data = await getInstagramData();
  return data.posts;
}

export async function getInstagramPostsPreview(limit = 6): Promise<InstagramPost[]> {
  const posts = await getInstagramPosts();
  return posts.slice(0, limit);
}
