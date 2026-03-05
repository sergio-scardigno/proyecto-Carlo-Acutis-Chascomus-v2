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

const CONTENT_SOURCE = process.env.CONTENT_SOURCE ?? (process.env.DIRECTUS_BASE_URL ? "directus" : "csv");
const DIRECTUS_BASE_URL = process.env.DIRECTUS_BASE_URL ?? "";
const DIRECTUS_API_TOKEN = process.env.DIRECTUS_API_TOKEN ?? "";
const DIRECTUS_NOVEDADES_ENDPOINT =
  process.env.DIRECTUS_NOVEDADES_ENDPOINT ??
  "/items/novedades?filter[status][_eq]=published&sort=-id";
const DIRECTUS_ENTRONIZACIONES_ENDPOINT =
  process.env.DIRECTUS_ENTRONIZACIONES_ENDPOINT ??
  "/items/entronizaciones?fields=*,imagenes.*&filter[status][_eq]=published&sort=-date_created";
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

function buildSlug(value: string, fallback: string) {
  if (value) return value;
  return fallback
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeNovedad(row: Record<string, string>): Novedad {
  return {
    id: Number(row.id) || 0,
    slug: row.slug ?? "",
    titulo: row.titulo ?? "",
    resumen: row.resumen ?? "",
    contenido: row.contenido ?? "",
    fecha: row.fecha ?? "",
    imagen: row.imagen ?? "",
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
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/") && DIRECTUS_BASE_URL) return `${DIRECTUS_BASE_URL}${url}`;
  return url;
}

function buildDirectusAssetUrl(assetId: string | number) {
  if (!assetId) return "";
  return DIRECTUS_BASE_URL ? `${DIRECTUS_BASE_URL}/assets/${encodeURIComponent(String(assetId))}` : "";
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

function readDataEntries(payload: JsonObject) {
  if (Array.isArray(payload)) return payload;
  return Array.isArray(payload.data) ? payload.data : [];
}

function extractImageUrls(raw: unknown): string[] {
  if (!raw) return [];
  const items = Array.isArray(raw) ? raw : [raw];

  return items
    .map((item) => {
      if (typeof item === "string") {
        if (item.startsWith("http://") || item.startsWith("https://") || item.startsWith("/")) {
          return normalizeCmsUrl(item);
        }
        return buildDirectusAssetUrl(item);
      }

      if (typeof item === "number") {
        return buildDirectusAssetUrl(item);
      }

      if (typeof item !== "object" || item === null) return "";
      const record = item as JsonObject;

      if (typeof record.url === "string") return normalizeCmsUrl(record.url);
      if (typeof record.imagen === "string") return normalizeCmsUrl(record.imagen);

      const directusFile = record.directus_files_id;
      if (typeof directusFile === "string" || typeof directusFile === "number") {
        return buildDirectusAssetUrl(directusFile);
      }

      if (typeof directusFile === "object" && directusFile !== null) {
        const directusFileRecord = directusFile as JsonObject;
        if (typeof directusFileRecord.url === "string") return normalizeCmsUrl(directusFileRecord.url);
        if (typeof directusFileRecord.id === "string" || typeof directusFileRecord.id === "number") {
          return buildDirectusAssetUrl(directusFileRecord.id);
        }
      }

      return "";
    })
    .filter(Boolean);
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
  const payload = await fetchDirectusJson(DIRECTUS_NOVEDADES_ENDPOINT);
  const entries = readDataEntries(payload);

  return entries.map((entry) => {
    const safeEntry = typeof entry === "object" && entry !== null ? (entry as JsonObject) : {};
    const imageUrl =
      extractImageUrls(safeEntry.imagen)[0] ??
      extractImageUrls(safeEntry.imagenes)[0] ??
      extractImageUrls(safeEntry.portada)[0] ??
      "";
    const titulo = toStringValue(safeEntry.titulo) || toStringValue(safeEntry.title);
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
    const publicado =
      typeof safeEntry.publicado === "boolean"
        ? safeEntry.publicado
        : toStringValue(safeEntry.status) === "published";

    return {
      id: Number(safeEntry.id ?? 0),
      slug,
      titulo,
      resumen,
      contenido,
      fecha,
      imagen: imageUrl,
      publicado,
    };
  }).filter((item) => item.publicado);
}

async function getEntronizacionesFromDirectus(): Promise<Entronizacion[]> {
  const payload = await fetchDirectusJson(DIRECTUS_ENTRONIZACIONES_ENDPOINT);
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

export async function getNovedades() {
  return getNovedadesFromDirectus();
}

export async function getEntronizaciones() {
  return getEntronizacionesFromDirectus();
}

