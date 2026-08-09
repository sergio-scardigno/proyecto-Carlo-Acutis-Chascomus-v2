/**
 * Contenido del sitio.
 *
 * Los datos son estaticos y viven en `src/content/`: no hay CMS ni red de por medio.
 * Este modulo solo deriva los campos calculados (portada, URLs de YouTube) y aplica
 * el orden y los filtros de publicacion.
 *
 * Las funciones siguen siendo `async` porque las paginas las consumen con `await`.
 */

import { entronizaciones as entronizacionesData } from "@/content/entronizaciones";
import { misiones as misionesData } from "@/content/misiones";
import { novedades as novedadesData } from "@/content/novedades";
import { testimonios as testimoniosData } from "@/content/testimonios";
import { videos as videosData } from "@/content/videos";
import type {
  EntronizacionInput,
  MisionInput,
  NovedadInput,
  TestimonioInput,
  VideoInput,
} from "@/content/types";

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
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  thumbnailUrl: string;
  fecha: string;
  publicado: boolean;
};

// ── Derivacion de YouTube ──────────────────────────────────────────

/** Acepta youtu.be, /watch?v=, /embed/ y /shorts/. */
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
      return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? "";
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

function buildYoutubeEmbedUrl(videoId: string) {
  return videoId ? `https://www.youtube.com/embed/${encodeURIComponent(videoId)}` : "";
}

function buildYoutubeThumbnailUrl(videoId: string) {
  return videoId ? `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg` : "";
}

// ── Helpers ────────────────────────────────────────────────────────

/** Los listados van del id mas alto al mas bajo; la home toma el primero. */
function sortByIdDesc<T extends { id: number }>(items: T[]) {
  return [...items].sort((a, b) => b.id - a.id);
}

function normalizeNovedad(entry: NovedadInput): Novedad {
  const imagenes = entry.imagenes ?? [];
  const videoId = extractYoutubeVideoId(entry.youtubeUrl ?? "");

  return {
    id: entry.id,
    slug: entry.slug,
    titulo: entry.titulo,
    resumen: entry.resumen ?? "",
    contenido: entry.contenido ?? "",
    fecha: entry.fecha ?? "",
    imagen: imagenes[0] ?? "",
    imagenes,
    youtubeUrl: entry.youtubeUrl ?? "",
    youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
    publicado: entry.publicado ?? true,
  };
}

function normalizeEntronizacion(entry: EntronizacionInput): Entronizacion {
  return {
    id: entry.id,
    slug: entry.slug,
    lugar: entry.lugar,
    fecha: entry.fecha ?? "",
    descripcion: entry.descripcion ?? "",
    imagenes: entry.imagenes ?? [],
    destacada: entry.destacada ?? true,
  };
}

function normalizeVideo(entry: VideoInput): Video {
  const videoId = extractYoutubeVideoId(entry.youtubeUrl);

  return {
    id: entry.id,
    titulo: entry.titulo,
    descripcion: entry.descripcion ?? "",
    youtubeUrl: entry.youtubeUrl,
    youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
    thumbnailUrl: buildYoutubeThumbnailUrl(videoId),
    publicado: entry.publicado ?? true,
  };
}

function normalizeTestimonio(entry: TestimonioInput): Testimonio {
  const videoId = extractYoutubeVideoId(entry.youtubeUrl);

  return {
    id: entry.id,
    slug: entry.slug,
    titulo: entry.titulo ?? "",
    descripcion: entry.descripcion ?? "",
    youtubeUrl: entry.youtubeUrl,
    youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
    thumbnailUrl: buildYoutubeThumbnailUrl(videoId),
    publicado: entry.publicado ?? true,
  };
}

function normalizeMision(entry: MisionInput): Mision {
  const videoId = extractYoutubeVideoId(entry.youtubeUrl ?? "");

  return {
    id: entry.id,
    titulo: entry.titulo,
    texto: entry.texto ?? "",
    imagenes: entry.imagenes ?? [],
    youtubeUrl: entry.youtubeUrl ?? "",
    youtubeEmbedUrl: buildYoutubeEmbedUrl(videoId),
    thumbnailUrl: buildYoutubeThumbnailUrl(videoId),
    fecha: entry.fecha ?? "",
    publicado: entry.publicado ?? true,
  };
}

// ── API publica ────────────────────────────────────────────────────

export async function getNovedades(): Promise<Novedad[]> {
  return sortByIdDesc(novedadesData.map(normalizeNovedad).filter((item) => item.publicado));
}

export async function getEntronizaciones(): Promise<Entronizacion[]> {
  return sortByIdDesc(
    entronizacionesData
      .filter((entry) => entry.publicado ?? true)
      .map(normalizeEntronizacion),
  );
}

/**
 * El filtro por `youtubeEmbedUrl` no es cosmetico: la home renderiza `videos[0]`
 * dando por hecho que tiene miniatura de YouTube.
 */
export async function getVideos(): Promise<Video[]> {
  return sortByIdDesc(
    videosData.map(normalizeVideo).filter((item) => item.publicado && item.youtubeEmbedUrl),
  );
}

export async function getTestimonios(): Promise<Testimonio[]> {
  return sortByIdDesc(
    testimoniosData
      .map(normalizeTestimonio)
      .filter((item) => item.publicado && item.youtubeEmbedUrl),
  );
}

export async function getMisiones(): Promise<Mision[]> {
  return sortByIdDesc(
    misionesData
      .map(normalizeMision)
      .filter((item) => item.publicado && (item.titulo || item.texto)),
  );
}
