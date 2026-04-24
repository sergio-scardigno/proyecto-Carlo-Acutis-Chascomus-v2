import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseCsv } from "@/lib/csv";

export type Novedad = {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  fecha: string;
  imagen: string;
  imagenes: string[];
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  publicado: boolean;
};

export type Entronizacion = {
  id: number;
  slug: string;
  lugar: string;
  fecha: string;
  descripcion: string;
  imagenes: string[];
  destacada: boolean;
};

export type Video = {
  id: number;
  titulo: string;
  descripcion: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  thumbnailUrl: string;
  publicado: boolean;
};

export type Testimonio = {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  thumbnailUrl: string;
  publicado: boolean;
};

export type Mision = {
  id: number;
  titulo: string;
  texto: string;
  imagenes: string[];
  fecha: string;
  publicado: boolean;
};

const CONTENT_SOURCE = process.env.CONTENT_SOURCE ?? (process.env.DIRECTUS_BASE_URL ? "directus" : "csv");
const DIRECTUS_BASE_URL = process.env.DIRECTUS_BASE_URL ?? "";
const DIRECTUS_API_TOKEN = process.env.DIRECTUS_API_TOKEN ?? "";
const DIRECTUS_NOVEDADES_ENDPOINT =
  process.env.DIRECTUS_NOVEDADES_ENDPOINT ??
  "/items/novedades?fields=*,imagenes.*&filter[status][_eq]=published&sort=-id";
const DIRECTUS_ENTRONIZACIONES_ENDPOINT =
  process.env.DIRECTUS_ENTRONIZACIONES_ENDPOINT ??
  "/items/entronizaciones?fields=*,imagenes.*&filter[status][_eq]=published&sort=-id";
const DIRECTUS_VIDEOS_ENDPOINT =
  process.env.DIRECTUS_VIDEOS_ENDPOINT ??
  "/items/videos?filter[status][_eq]=published&sort=-id";
const DIRECTUS_TESTIMONIOS_ENDPOINT =
  process.env.DIRECTUS_TESTIMONIOS_ENDPOINT ??
  "/items/testimonios?filter[status][_eq]=published&sort=-id";
const DIRECTUS_MISIONES_ENDPOINT =
  process.env.DIRECTUS_MISIONES_ENDPOINT ??
  "/items/misiones?fields=*,imagenes.*&filter[status][_eq]=published&sort=-id";
const DIRECTUS_NOVEDADES_FALLBACK_ENDPOINT =
  "/items/novedades?fields=*,imagenes.*&filter[status][_eq]=published&sort=-id";
const DIRECTUS_ENTRONIZACIONES_FALLBACK_ENDPOINT =
  "/items/entronizaciones?fields=*,imagenes.*&filter[status][_eq]=published&sort=-id";
const DIRECTUS_VIDEOS_FALLBACK_ENDPOINT = "/items/videos?filter[status][_eq]=published&sort=-id";
const DIRECTUS_TESTIMONIOS_FALLBACK_ENDPOINT = "/items/testimonios?filter[status][_eq]=published&sort=-id";
const DIRECTUS_MISIONES_FALLBACK_ENDPOINT =
  "/items/misiones?fields=*,imagenes.*&filter[status][_eq]=published&sort=-id";
type JsonObject = Record<string, unknown>;

async function readProjectCsv(relativePath: string) {
  const absolutePath = path.join(process.cwd(), relativePath);
  const raw = await readFile(absolutePath, "utf8");
  return parseCsv(raw);
}

function toBoolean(value: string) {
  return value.toLowerCase() === "true";
}

function splitImages(value: string) {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toStringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function splitMultiValueString(value: string) {
  const normalized = value.trim();
  if (!normalized) return [];

  if (normalized.startsWith("[") && normalized.endsWith("]")) {
    try {
      const parsed = JSON.parse(normalized);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) =>
            typeof item === "string" || typeof item === "number" ? String(item).trim() : "",
          )
          .filter(Boolean);
      }
    } catch {
      // Si no es JSON válido, seguimos con la división por separadores.
    }
  }

  const candidates = normalized
    .split(/[\n|;,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return candidates.length > 1 ? candidates : [normalized];
}

/** Títulos visibles distintos al del CMS para slugs concretos (la URL no cambia). */
function displayTitleForNovedadSlug(slug: string, titulo: string) {
  if (slug === "entronizacion") return "Canonización";
  return titulo;
}

function buildSlug(value: string, fallback: string) {
  if (value) return value;
  return fallback
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pickStringValue(record: JsonObject, keys: string[]) {
  for (const key of keys) {
    const value = toStringValue(record[key]);
    if (value) return value;
  }
  return "";
}

function extractYoutubeVideoId(url: string) {
  if (!url) return "";

  const cleanUrl = url.trim();
  if (!cleanUrl) return "";

  const fallbackMatch = cleanUrl.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
  if (fallbackMatch?.[1]) return fallbackMatch[1];

  try {
    const parsedUrl = new URL(cleanUrl);
    const host = parsedUrl.hostname.toLowerCase().replace(/^www\./, "");

    if (host === "youtu.be") {
      const candidate = parsedUrl.pathname.split("/").filter(Boolean)[0] ?? "";
      return candidate;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") ?? "";
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.replace("/embed/", "").split("/")[0] ?? "";
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.replace("/shorts/", "").split("/")[0] ?? "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

function extractIframeSrc(value: string) {
  const match = value.match(/src=["']([^"']+)["']/i);
  return match?.[1]?.trim() ?? "";
}

function normalizePotentialYoutubeValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed.includes("<iframe")) {
    const iframeSrc = extractIframeSrc(trimmed);
    if (!iframeSrc) return "";
    return extractYoutubeVideoId(iframeSrc) ? iframeSrc : "";
  }

  return extractYoutubeVideoId(trimmed) ? trimmed : "";
}

function buildYoutubeEmbedUrl(videoId: string) {
  return videoId ? `https://www.youtube.com/embed/${encodeURIComponent(videoId)}` : "";
}

function buildYoutubeThumbnailUrl(videoId: string) {
  return videoId ? `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg` : "";
}

function normalizeNovedad(row: Record<string, string>): Novedad {
  const youtubeUrl = row.youtube_url ?? row.youtubeUrl ?? row.url_video ?? "";
  const videoId = extractYoutubeVideoId(youtubeUrl);
  const imagenes = splitImages(row.imagenes ?? row.imagen ?? "");
  const slug = row.slug ?? "";
  const titulo = displayTitleForNovedadSlug(slug, row.titulo ?? "");

  return {
    id: Number(row.id) || 0,
    slug,
    titulo,
    resumen: row.resumen ?? "",
    contenido: row.contenido ?? "",
    fecha: row.fecha ?? "",
    imagen: row.imagen ?? imagenes[0] ?? "",
    imagenes,
    youtubeUrl,
    youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
    publicado: toBoolean(row.publicado ?? "false"),
  };
}

function normalizeEntronizacion(row: Record<string, string>): Entronizacion {
  return {
    id: Number(row.id) || 0,
    slug: row.slug ?? "",
    lugar: row.lugar ?? "",
    fecha: row.fecha ?? "",
    descripcion: row.descripcion ?? "",
    imagenes: splitImages(row.imagenes ?? ""),
    destacada: toBoolean(row.destacada ?? "false"),
  };
}

function normalizeCmsUrl(url: string) {
  if (!url) return "";
  const normalized = url.trim();
  if (!normalized) return "";
  if (normalized.startsWith("http://") || normalized.startsWith("https://")) return normalized;
  if (normalized.startsWith("/") && DIRECTUS_BASE_URL) return `${DIRECTUS_BASE_URL}${normalized}`;
  return normalized;
}

function buildDirectusAssetUrl(assetId: string | number) {
  if (!assetId) return "";
  return DIRECTUS_BASE_URL ? `${DIRECTUS_BASE_URL}/assets/${encodeURIComponent(String(assetId))}` : "";
}

function isUsableImageUrl(url: string) {
  if (!url) return false;
  const normalized = url.trim();
  if (!normalized) return false;
  // Evita URLs incompletas tipo /assets/? que rompen la portada.
  if (normalized.endsWith("/assets/?") || normalized.endsWith("/assets/")) return false;
  return true;
}

async function fetchDirectusJson(endpoint: string) {
  if (!DIRECTUS_BASE_URL) {
    throw new Error("Falta DIRECTUS_BASE_URL para consumir contenido de Directus.");
  }

  const response = await fetch(`${DIRECTUS_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(DIRECTUS_API_TOKEN ? { Authorization: `Bearer ${DIRECTUS_API_TOKEN}` } : {}),
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Error Directus ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as JsonObject;
}

async function fetchDirectusJsonNoCache(endpoint: string) {
  if (!DIRECTUS_BASE_URL) {
    throw new Error("Falta DIRECTUS_BASE_URL para consumir contenido de Directus.");
  }

  const response = await fetch(`${DIRECTUS_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(DIRECTUS_API_TOKEN ? { Authorization: `Bearer ${DIRECTUS_API_TOKEN}` } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error Directus ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as JsonObject;
}

function isForbiddenSortFieldError(error: unknown) {
  return (
    error instanceof Error &&
    error.message.includes("Error Directus 403") &&
    error.message.toLowerCase().includes("access field")
  );
}

async function fetchDirectusJsonWithDateFallback(primaryEndpoint: string, fallbackEndpoint: string) {
  try {
    return await fetchDirectusJson(primaryEndpoint);
  } catch (error) {
    if (primaryEndpoint !== fallbackEndpoint && isForbiddenSortFieldError(error)) {
      return fetchDirectusJson(fallbackEndpoint);
    }
    throw error;
  }
}

function readDataEntries(payload: JsonObject) {
  if (Array.isArray(payload)) return payload;
  return Array.isArray(payload.data) ? payload.data : [];
}

function extractImageUrls(raw: unknown): string[] {
  if (!raw) return [];
  const items = Array.isArray(raw) ? raw : [raw];

  return items
    .flatMap((item) => {
      if (typeof item === "string") {
        return splitMultiValueString(item)
          .map((part) => {
            if (part.startsWith("http://") || part.startsWith("https://") || part.startsWith("/")) {
              return normalizeCmsUrl(part);
            }
            return buildDirectusAssetUrl(part);
          })
          .filter(Boolean);
      }

      if (typeof item === "number") {
        return [buildDirectusAssetUrl(item)];
      }

      if (typeof item !== "object" || item === null) return [];
      const record = item as JsonObject;

      const directStringCandidates = [
        record.url,
        record.imagen,
        record.imagen_url,
        record.thumbnail,
        record.src,
        record.path,
      ]
        .filter((value): value is string => typeof value === "string")
        .flatMap((value) => splitMultiValueString(value))
        .map((value) => normalizeCmsUrl(value))
        .filter(Boolean);
      if (directStringCandidates.length > 0) return directStringCandidates;

      const directusFile = record.directus_files_id;
      if (typeof directusFile === "string" || typeof directusFile === "number") {
        return [buildDirectusAssetUrl(directusFile)];
      }

      if (typeof directusFile === "object" && directusFile !== null) {
        const directusFileRecord = directusFile as JsonObject;
        if (typeof directusFileRecord.url === "string") return [normalizeCmsUrl(directusFileRecord.url)];
        if (typeof directusFileRecord.id === "string" || typeof directusFileRecord.id === "number") {
          return [buildDirectusAssetUrl(directusFileRecord.id)];
        }
      }

      const imageLikeKeys = [
        "imagenes_id",
        "imagen_id",
        "file",
        "file_id",
        "files_id",
        "asset",
        "asset_id",
      ];

      for (const key of imageLikeKeys) {
        const value = record[key];
        if (typeof value === "string" || typeof value === "number") {
          return [buildDirectusAssetUrl(value)];
        }
        if (typeof value === "object" && value !== null) {
          const nested = value as JsonObject;
          if (typeof nested.url === "string") return [normalizeCmsUrl(nested.url)];
          if (typeof nested.id === "string" || typeof nested.id === "number") {
            return [buildDirectusAssetUrl(nested.id)];
          }
        }
      }

      return [];
    })
    .filter(isUsableImageUrl);
}

function extractYoutubeUrl(raw: unknown): string {
  if (!raw) return "";
  if (typeof raw === "string") return normalizePotentialYoutubeValue(raw);

  if (Array.isArray(raw)) {
    for (const item of raw) {
      const candidate = extractYoutubeUrl(item);
      if (candidate) return candidate;
    }
    return "";
  }

  if (typeof raw !== "object") return "";
  const record = raw as JsonObject;

  const directKeys = [
    "youtubeUrl",
    "youtube_url",
    "youtube",
    "youtubeVideoUrl",
    "youtube_video_url",
    "urlYoutube",
    "url_youtube",
    "videoUrl",
    "video_url",
    "url_video",
    "embed",
    "embedUrl",
    "youtubeEmbedUrl",
    "youtube_embed_url",
  ];

  for (const key of directKeys) {
    const value = record[key];
    if (typeof value === "string") {
      const normalized = normalizePotentialYoutubeValue(value);
      if (normalized) return normalized;
    }
  }

  const genericKeys = ["url", "link", "enlace", "href"];
  for (const key of genericKeys) {
    const value = record[key];
    if (typeof value === "string") {
      const normalized = normalizePotentialYoutubeValue(value);
      if (normalized) return normalized;
    }
  }

  const nestedKeys = ["video", "youtubeVideo", "media", "contenido", "content"];
  for (const key of nestedKeys) {
    const value = record[key];
    const nestedCandidate = extractYoutubeUrl(value);
    if (nestedCandidate) return nestedCandidate;
  }

  return "";
}

async function getNovedadesFromCsv(): Promise<Novedad[]> {
  const rows = await readProjectCsv("data/novedades.csv");
  return rows.map(normalizeNovedad).filter((item) => item.publicado);
}

async function getEntronizacionesFromCsv(): Promise<Entronizacion[]> {
  const rows = await readProjectCsv("data/entronizaciones.csv");
  return rows.map(normalizeEntronizacion);
}

async function getNovedadesFromDirectus(): Promise<Novedad[]> {
  const payload = await fetchDirectusJsonWithDateFallback(
    DIRECTUS_NOVEDADES_ENDPOINT,
    DIRECTUS_NOVEDADES_FALLBACK_ENDPOINT,
  );
  const entries = readDataEntries(payload);

  return entries.map((entry) => {
    const safeEntry = typeof entry === "object" && entry !== null ? (entry as JsonObject) : {};
    const entryId = Number(safeEntry.id ?? 0);
    const coverImage = extractImageUrls(safeEntry.imagen)[0] ?? "";
    const galleryImages = extractImageUrls(safeEntry.imagenes);
    const galleryImage = galleryImages[0] ?? "";
    const portadaImage = extractImageUrls(safeEntry.portada)[0] ?? "";
    const imageUrls = Array.from(new Set([coverImage, ...galleryImages, portadaImage].filter(Boolean)));
    const imageUrl = imageUrls[0] ?? galleryImage;
    const titulo =
      toStringValue(safeEntry.titulo) ||
      toStringValue(safeEntry.title) ||
      toStringValue(safeEntry.nombre) ||
      `Novedad ${entryId || "sin título"}`;
    const resumen = toStringValue(safeEntry.resumen) || toStringValue(safeEntry.excerpt);
    const contenido =
      toStringValue(safeEntry.contenido) ||
      toStringValue(safeEntry.content) ||
      toStringValue(safeEntry.texto);
    const fecha =
      toStringValue(safeEntry.fecha) ||
      toStringValue(safeEntry.date_created) ||
      toStringValue(safeEntry.date_updated);
    const slug = buildSlug(toStringValue(safeEntry.slug), titulo || contenido || `novedad-${safeEntry.id ?? 0}`);
    const tituloVisible = displayTitleForNovedadSlug(slug, titulo);
    const youtubeUrl =
      extractYoutubeUrl(safeEntry) ||
      pickStringValue(safeEntry, [
        "youtubeUrl",
        "youtube_url",
        "youtube",
        "youtubeVideoUrl",
        "youtube_video_url",
        "urlYoutube",
        "url_youtube",
        "videoUrl",
        "video_url",
        "url_video",
      ]);
    const videoId = extractYoutubeVideoId(youtubeUrl);
    const publicado =
      typeof safeEntry.publicado === "boolean"
        ? safeEntry.publicado
        : toStringValue(safeEntry.status) === "published";

    return {
      id: entryId,
      slug,
      titulo: tituloVisible,
      resumen,
      contenido,
      fecha,
      imagen: imageUrl,
      imagenes: imageUrls,
      youtubeUrl,
      youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
      publicado,
    };
  }).filter((item) => item.publicado);
}

async function getEntronizacionesFromDirectus(): Promise<Entronizacion[]> {
  const payload = await fetchDirectusJsonWithDateFallback(
    DIRECTUS_ENTRONIZACIONES_ENDPOINT,
    DIRECTUS_ENTRONIZACIONES_FALLBACK_ENDPOINT,
  );
  const entries = readDataEntries(payload);

  return entries.map((entry) => {
    const safeEntry = typeof entry === "object" && entry !== null ? (entry as JsonObject) : {};
    const lugar = toStringValue(safeEntry.lugar) || toStringValue(safeEntry.titulo);
    const descripcion =
      toStringValue(safeEntry.descripcion) ||
      toStringValue(safeEntry.texto) ||
      toStringValue(safeEntry.contenido);
    const fecha = toStringValue(safeEntry.fecha) || toStringValue(safeEntry.date_created);
    const imagenes = extractImageUrls(safeEntry.imagenes);
    const slug = buildSlug(toStringValue(safeEntry.slug), lugar || `entronizacion-${safeEntry.id ?? 0}`);

    return {
      id: Number(safeEntry.id ?? 0),
      slug,
      lugar,
      fecha,
      descripcion,
      imagenes,
      destacada:
        typeof safeEntry.destacada === "boolean"
          ? safeEntry.destacada
          : toStringValue(safeEntry.status) === "published",
    };
  });
}

async function getVideosFromDirectus(): Promise<Video[]> {
  const payload = await fetchDirectusVideosPayload();
  const entries = readDataEntries(payload);

  return entries
    .map((entry) => {
      const safeEntry = typeof entry === "object" && entry !== null ? (entry as JsonObject) : {};
      const titulo = pickStringValue(safeEntry, ["titulo", "title", "nombre"]);
      const descripcion = pickStringValue(safeEntry, ["descripcion", "texto", "resumen", "content"]);
      const youtubeUrl =
        extractYoutubeUrl(safeEntry) ||
        pickStringValue(safeEntry, [
          "youtubeUrl",
          "youtube_url",
          "enlaceYoutube",
          "enlace_youtube",
          "enlace",
          "url",
        ]);
      const videoId = extractYoutubeVideoId(youtubeUrl);
      const status = toStringValue(safeEntry.status).toLowerCase();
      const publicado =
        typeof safeEntry.publicado === "boolean"
          ? safeEntry.publicado
          : status
            ? status === "published"
            : true;

      return {
        id: Number(safeEntry.id ?? 0),
        titulo,
        descripcion,
        youtubeUrl,
        youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
        thumbnailUrl: buildYoutubeThumbnailUrl(videoId),
        publicado,
      };
    })
    .filter((item) => item.publicado && item.youtubeEmbedUrl);
}

async function getTestimoniosFromDirectus(): Promise<Testimonio[]> {
  const payload = await fetchDirectusTestimoniosPayload();
  const entries = readDataEntries(payload);

  return entries
    .map((entry) => {
      const safeEntry = typeof entry === "object" && entry !== null ? (entry as JsonObject) : {};
      const titulo = pickStringValue(safeEntry, ["titulo", "title", "nombre"]);
      const descripcion = pickStringValue(safeEntry, ["descripcion", "texto", "resumen", "content"]);
      const youtubeUrl =
        extractYoutubeUrl(safeEntry) ||
        pickStringValue(safeEntry, [
          "youtubeUrl",
          "youtube_url",
          "enlaceYoutube",
          "enlace_youtube",
          "enlace",
          "url",
          "url_video",
          "videoUrl",
          "video_url",
        ]);
      const videoId = extractYoutubeVideoId(youtubeUrl);
      const status = toStringValue(safeEntry.status).toLowerCase();
      const publicado =
        typeof safeEntry.publicado === "boolean"
          ? safeEntry.publicado
          : status
            ? status === "published"
            : true;

      return {
        id: Number(safeEntry.id ?? 0),
        slug: buildSlug(toStringValue(safeEntry.slug), titulo || `testimonio-${safeEntry.id ?? 0}`),
        titulo,
        descripcion,
        youtubeUrl,
        youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
        thumbnailUrl: buildYoutubeThumbnailUrl(videoId),
        publicado,
      };
    })
    .filter((item) => item.publicado && item.youtubeEmbedUrl);
}

async function getMisionesFromDirectus(): Promise<Mision[]> {
  const payload = await fetchDirectusMisionesPayload();
  const entries = readDataEntries(payload);

  return entries
    .map((entry) => {
      const safeEntry = typeof entry === "object" && entry !== null ? (entry as JsonObject) : {};
      const titulo = pickStringValue(safeEntry, ["titulo", "title", "nombre"]);
      const texto = pickStringValue(safeEntry, ["texto", "descripcion", "contenido", "content"]);
      const imagenes = extractImageUrls(safeEntry.imagenes);
      const fecha = pickStringValue(safeEntry, ["date_created", "fecha", "date_updated"]);
      const status = toStringValue(safeEntry.status).toLowerCase();
      const publicado =
        typeof safeEntry.publicado === "boolean"
          ? safeEntry.publicado
          : status
            ? status === "published" || status === "active"
            : true;

      return {
        id: Number(safeEntry.id ?? 0),
        titulo,
        texto,
        imagenes,
        fecha,
        publicado,
      };
    })
    .filter((item) => item.publicado && (item.titulo || item.texto));
}

async function fetchDirectusTestimoniosPayload() {
  const candidates = Array.from(
    new Set([
      DIRECTUS_TESTIMONIOS_ENDPOINT,
      DIRECTUS_TESTIMONIOS_FALLBACK_ENDPOINT,
      "/items/testimonios?sort=-id",
      "/items/testimonios",
    ]),
  );

  let firstSuccessPayload: JsonObject | null = null;
  let lastError: unknown = null;

  for (const endpoint of candidates) {
    try {
      const payload = await fetchDirectusJsonNoCache(endpoint);
      firstSuccessPayload ??= payload;
      if (readDataEntries(payload).length > 0) return payload;
    } catch (error) {
      lastError = error;
    }
  }

  if (firstSuccessPayload) return firstSuccessPayload;
  throw lastError ?? new Error("No pudimos obtener testimonios desde Directus.");
}

async function fetchDirectusVideosPayload() {
  const candidates = Array.from(
    new Set([
      DIRECTUS_VIDEOS_ENDPOINT,
      DIRECTUS_VIDEOS_FALLBACK_ENDPOINT,
      "/items/videos?sort=-id",
      "/items/videos",
    ]),
  );

  let firstSuccessPayload: JsonObject | null = null;
  let lastError: unknown = null;

  for (const endpoint of candidates) {
    try {
      const payload = await fetchDirectusJson(endpoint);
      firstSuccessPayload ??= payload;
      if (readDataEntries(payload).length > 0) return payload;
    } catch (error) {
      lastError = error;
    }
  }

  if (firstSuccessPayload) return firstSuccessPayload;
  throw lastError ?? new Error("No pudimos obtener videos desde Directus.");
}

async function fetchDirectusMisionesPayload() {
  const candidates = Array.from(
    new Set([
      DIRECTUS_MISIONES_ENDPOINT,
      DIRECTUS_MISIONES_FALLBACK_ENDPOINT,
      "/items/misiones?sort=-id",
      "/items/misiones",
    ]),
  );

  let firstSuccessPayload: JsonObject | null = null;
  let lastError: unknown = null;

  for (const endpoint of candidates) {
    try {
      const payload = await fetchDirectusJson(endpoint);
      firstSuccessPayload ??= payload;
      if (readDataEntries(payload).length > 0) return payload;
    } catch (error) {
      lastError = error;
    }
  }

  if (firstSuccessPayload) return firstSuccessPayload;
  throw lastError ?? new Error("No pudimos obtener misiones desde Directus.");
}

export async function getNovedades() {
  return CONTENT_SOURCE === "csv" ? getNovedadesFromCsv() : getNovedadesFromDirectus();
}

export async function getEntronizaciones() {
  return CONTENT_SOURCE === "csv" ? getEntronizacionesFromCsv() : getEntronizacionesFromDirectus();
}

export async function getVideos() {
  if (CONTENT_SOURCE === "csv") return [];
  return getVideosFromDirectus();
}

export async function getTestimonios() {
  if (CONTENT_SOURCE === "csv") return [];
  return getTestimoniosFromDirectus();
}

export async function getMisiones() {
  if (CONTENT_SOURCE === "csv" && !DIRECTUS_BASE_URL) return [];
  return getMisionesFromDirectus();
}

