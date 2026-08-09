/**
 * Instagram data layer — lee desde NocoDB.
 *
 * Es la unica seccion dinamica del sitio: el resto del contenido es estatico.
 * El scraper sincroniza @sancarloacutischascomus hacia las tablas
 * `instagram_profile` e `instagram_posts`.
 *
 * Las miniaturas se guardan como adjunto en NocoDB (columna `thumbnail`), porque
 * las URLs del CDN de Instagram caducan. La foto completa la sigue sirviendo el
 * embed de Instagram dentro del modal (ver `InstagramEmbedModal`).
 */

import {
  buildAttachmentUrl,
  getRecordId,
  isNocodbConfigured,
  listRecords,
  pickStringValue,
  pickValue,
  toBooleanFlag,
  type JsonObject,
} from "@/lib/nocodb";

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
  /** Miniatura alojada en NocoDB. Vacia si el scraper todavia no la subio. */
  thumbnailUrl: string;
  embedUrl: string;
};

export type InstagramProfile = {
  username: string;
  fullName: string;
  biography: string;
  profileUrl: string;
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

const TABLE_PROFILE = process.env.NOCODB_TABLE_INSTAGRAM_PROFILE ?? "instagram_profile";
const TABLE_POSTS = process.env.NOCODB_TABLE_INSTAGRAM_POSTS ?? "instagram_posts";

const DEFAULT_USERNAME = "sancarloacutischascomus";

const FALLBACK_PROFILE: InstagramProfile = {
  username: DEFAULT_USERNAME,
  fullName: "",
  biography: "",
  profileUrl: `https://www.instagram.com/${DEFAULT_USERNAME}/`,
  isVerified: false,
  followers: 0,
  following: 0,
  totalPosts: 0,
};

// ── Mappers (NocoDB → camelCase) ───────────────────────────────────

function toNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function mapProfile(record: JsonObject): InstagramProfile {
  const username = pickStringValue(record, ["username", "user_name"]) || DEFAULT_USERNAME;

  return {
    username,
    fullName: pickStringValue(record, ["full_name", "fullname", "nombre"]),
    biography: pickStringValue(record, ["biography", "bio"]),
    profileUrl:
      pickStringValue(record, ["profile_url", "profileurl"]) ||
      `https://www.instagram.com/${username}/`,
    isVerified: toBooleanFlag(pickValue(record, ["is_verified", "verified"]), false),
    followers: toNumber(pickValue(record, ["followers"])),
    following: toNumber(pickValue(record, ["following"])),
    totalPosts: toNumber(pickValue(record, ["total_posts", "posts_count"])),
  };
}

function mapPost(record: JsonObject): InstagramPost {
  const code = pickStringValue(record, ["code", "shortcode"]);
  const title = pickStringValue(record, ["title", "titulo"]);
  const playCountRaw = pickValue(record, ["play_count"]);

  return {
    code,
    permalink:
      pickStringValue(record, ["permalink", "url"]) ||
      (code ? `https://www.instagram.com/p/${code}/` : ""),
    dateUtc: pickStringValue(record, ["date_utc", "date", "fecha"]),
    mediaType: (pickStringValue(record, ["media_type"]) || "IMAGE") as InstagramMediaType,
    title,
    summary: pickStringValue(record, ["summary", "resumen"]) || title,
    caption: pickStringValue(record, ["caption", "texto"]),
    likeCount: toNumber(pickValue(record, ["like_count", "likes"])),
    commentCount: toNumber(pickValue(record, ["comment_count", "comments"])),
    playCount: playCountRaw === undefined ? null : toNumber(playCountRaw),
    thumbnailUrl: buildAttachmentUrl(pickValue(record, ["thumbnail", "imagen"])),
    embedUrl:
      pickStringValue(record, ["embed_url"]) ||
      (code ? `https://www.instagram.com/p/${code}/embed` : ""),
  };
}

/**
 * La tabla de perfil acumula un snapshot por corrida del scraper, asi que nos
 * quedamos con el mas reciente en vez de con la primera fila.
 */
function pickLatestProfile(rows: JsonObject[]): JsonObject | undefined {
  return rows.reduce<JsonObject | undefined>((latest, row) => {
    if (!latest) return row;
    const current = pickStringValue(row, ["updated_at", "date_updated", "date_created"]);
    const best = pickStringValue(latest, ["updated_at", "date_updated", "date_created"]);
    if (current && best) return current > best ? row : latest;
    return getRecordId(row) > getRecordId(latest) ? row : latest;
  }, undefined);
}

function isPublished(record: JsonObject): boolean {
  const status = pickStringValue(record, ["status", "estado"]).toLowerCase();
  if (status) return status === "published" || status === "active";
  return toBooleanFlag(pickValue(record, ["publicado", "published"]), true);
}

// ── Public API ─────────────────────────────────────────────────────

const EMPTY_DATA: InstagramData = {
  profile: FALLBACK_PROFILE,
  availablePosts: 0,
  generatedAt: "",
  posts: [],
};

export async function getInstagramData(): Promise<InstagramData> {
  // Sin credenciales no hay nada que traer: un clone limpio no deberia romper el build.
  if (!isNocodbConfigured()) {
    return { ...EMPTY_DATA, generatedAt: new Date().toISOString() };
  }

  const [profileRows, postRows] = await Promise.all([
    listRecords(TABLE_PROFILE),
    listRecords(TABLE_POSTS),
  ]);

  const latestProfile = pickLatestProfile(profileRows);
  const profile = latestProfile ? mapProfile(latestProfile) : FALLBACK_PROFILE;

  const posts = postRows
    .filter(isPublished)
    .map(mapPost)
    .filter((post) => post.code)
    .sort((a, b) => (a.dateUtc < b.dateUtc ? 1 : a.dateUtc > b.dateUtc ? -1 : 0));

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
