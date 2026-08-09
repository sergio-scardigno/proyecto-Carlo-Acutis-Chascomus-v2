/**
 * Cliente de NocoDB (API v2). Lo usa unicamente la seccion de Instagram
 * (`@/lib/instagram`); el resto del contenido del sitio es estatico.
 *
 * La API v2 trabaja con IDs de tabla (`/api/v2/tables/{tableId}/records`), asi que
 * resolvemos el ID a partir del nombre de la tabla usando la API de metadatos y
 * cacheamos el mapa en memoria. En las variables de entorno se puede poner tanto
 * el nombre visible de la tabla como su ID.
 */

export type JsonObject = Record<string, unknown>;

const NOCODB_BASE_URL = (process.env.NOCODB_BASE_URL ?? "").replace(/\/+$/, "");
const NOCODB_API_TOKEN = process.env.NOCODB_API_TOKEN ?? "";
const NOCODB_BASE_ID = process.env.NOCODB_BASE_ID ?? "";
const NOCODB_BASE_NAME = process.env.NOCODB_BASE_NAME ?? "";

/** Tamanio maximo de pagina que acepta la API v2. */
const PAGE_SIZE = 1000;
const META_REVALIDATE_SECONDS = 3600;

const DEFAULT_REVALIDATE_SECONDS = 300;

export function isNocodbConfigured() {
  return Boolean(NOCODB_BASE_URL && NOCODB_API_TOKEN);
}

// ── HTTP ───────────────────────────────────────────────────────────

type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

async function nocodbFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  if (!NOCODB_BASE_URL) {
    throw new Error("Falta NOCODB_BASE_URL para consumir contenido de NocoDB.");
  }
  if (!NOCODB_API_TOKEN) {
    throw new Error("Falta NOCODB_API_TOKEN para consumir contenido de NocoDB.");
  }

  const { cache, revalidate = DEFAULT_REVALIDATE_SECONDS } = options;

  const response = await fetch(`${NOCODB_BASE_URL}${endpoint}`, {
    headers: {
      "xc-token": NOCODB_API_TOKEN,
      Accept: "application/json",
    },
    ...(cache ? { cache } : { next: { revalidate } }),
  });

  if (!response.ok) {
    throw new Error(`Error NocoDB ${response.status} en ${endpoint}: ${await response.text()}`);
  }

  return (await response.json()) as T;
}

// ── Resolucion de base y tablas ────────────────────────────────────

type MetaListResponse = { list?: Array<{ id?: string; title?: string; table_name?: string }> };

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

let baseIdPromise: Promise<string> | null = null;

async function resolveBaseId(): Promise<string> {
  if (NOCODB_BASE_ID) return NOCODB_BASE_ID;

  baseIdPromise ??= (async () => {
    const payload = await nocodbFetch<MetaListResponse>("/api/v2/meta/bases", {
      revalidate: META_REVALIDATE_SECONDS,
    });
    const bases = payload.list ?? [];

    if (bases.length === 0) {
      throw new Error("NocoDB no devolvio ninguna base para este token.");
    }

    if (NOCODB_BASE_NAME) {
      const wanted = normalizeKey(NOCODB_BASE_NAME);
      const match = bases.find((base) => normalizeKey(base.title ?? "") === wanted);
      if (!match?.id) {
        const disponibles = bases.map((base) => base.title ?? base.id).join(", ");
        throw new Error(`No existe la base "${NOCODB_BASE_NAME}" en NocoDB. Disponibles: ${disponibles}`);
      }
      return match.id;
    }

    const first = bases[0];
    if (!first?.id) {
      throw new Error("NocoDB devolvio una base sin id.");
    }
    return first.id;
  })().catch((error) => {
    baseIdPromise = null;
    throw error;
  });

  return baseIdPromise;
}

let tableMapPromise: Promise<Map<string, string>> | null = null;

async function resolveTableMap(): Promise<Map<string, string>> {
  tableMapPromise ??= (async () => {
    const baseId = await resolveBaseId();
    const payload = await nocodbFetch<MetaListResponse>(`/api/v2/meta/bases/${baseId}/tables`, {
      revalidate: META_REVALIDATE_SECONDS,
    });

    const map = new Map<string, string>();
    for (const table of payload.list ?? []) {
      if (!table.id) continue;
      if (table.title) map.set(normalizeKey(table.title), table.id);
      if (table.table_name) map.set(normalizeKey(table.table_name), table.id);
      map.set(table.id, table.id);
    }
    return map;
  })().catch((error) => {
    tableMapPromise = null;
    throw error;
  });

  return tableMapPromise;
}

/** Acepta el nombre visible de la tabla, su nombre fisico o directamente su ID. */
async function resolveTableId(tableRef: string): Promise<string> {
  const map = await resolveTableMap();
  const byName = map.get(normalizeKey(tableRef));
  if (byName) return byName;
  if (map.has(tableRef)) return tableRef;

  const disponibles = Array.from(new Set(map.values())).length;
  throw new Error(
    `No encontramos la tabla "${tableRef}" en la base de NocoDB (${disponibles} tablas visibles para este token).`,
  );
}

// ── Registros ──────────────────────────────────────────────────────

type RecordsResponse = {
  list?: unknown[];
  pageInfo?: { isLastPage?: boolean; totalRows?: number };
};

/**
 * Trae todos los registros de una tabla, normalizando las claves de cada fila.
 * No filtramos ni ordenamos del lado del servidor: los nombres de columna varian
 * segun como se haya cargado la base, asi que resolvemos eso en el mapeo.
 */
export async function listRecords(tableRef: string): Promise<JsonObject[]> {
  const tableId = await resolveTableId(tableRef);

  const rows: JsonObject[] = [];
  let offset = 0;

  for (;;) {
    const payload = await nocodbFetch<RecordsResponse>(
      `/api/v2/tables/${tableId}/records?limit=${PAGE_SIZE}&offset=${offset}`,
    );

    const page = Array.isArray(payload.list) ? payload.list : [];
    for (const row of page) {
      if (typeof row === "object" && row !== null) {
        rows.push(normalizeRecordKeys(row as JsonObject));
      }
    }

    if (payload.pageInfo?.isLastPage !== false || page.length === 0) break;
    offset += page.length;
  }

  return rows;
}

// ── Acceso tolerante a los campos ──────────────────────────────────

/**
 * Duplica cada clave en su forma normalizada (`Fecha de alta` → `fechadealta`)
 * para poder leer las filas sin depender de como se escribio la columna en NocoDB.
 */
function normalizeRecordKeys(raw: JsonObject): JsonObject {
  const result: JsonObject = { ...raw };

  for (const [key, value] of Object.entries(raw)) {
    const normalized = normalizeKey(key);
    if (!normalized || normalized === key) continue;
    const current = result[normalized];
    if (current === undefined || current === null || current === "") {
      result[normalized] = value;
    }
  }

  return result;
}

function toStringValue(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

/** Primer valor de texto no vacio entre varias claves candidatas. */
export function pickStringValue(record: JsonObject, keys: string[]) {
  for (const key of keys) {
    const value = toStringValue(record[key] ?? record[normalizeKey(key)]);
    if (value.trim()) return value;
  }
  return "";
}

export function pickValue(record: JsonObject, keys: string[]): unknown {
  for (const key of keys) {
    const value = record[key] ?? record[normalizeKey(key)];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

/** Los checkbox de NocoDB llegan como boolean, 1/0 o "true"/"false" segun el tipo de columna. */
export function toBooleanFlag(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return fallback;
    if (["true", "1", "si", "sí", "yes", "published", "active"].includes(normalized)) return true;
    if (["false", "0", "no", "draft", "archived"].includes(normalized)) return false;
  }
  return fallback;
}

export function getRecordId(record: JsonObject): number {
  const raw = pickValue(record, ["Id", "id", "ID", "ncRecordId"]);
  return Number(raw) || 0;
}

// ── Adjuntos ───────────────────────────────────────────────────────

/**
 * URL servible del primer adjunto de una celda.
 *
 * Preferimos `path`, que es estable y se sirve publico. Las miniaturas que
 * genera NocoDB (`card_cover`, `small`) pesan menos pero solo tienen ruta
 * firmada, que caduca en ~1 dia: si una pagina no revalida en ese lapso, la
 * imagen se rompe. Por eso el scraper sube la foto ya reducida y aca usamos la
 * ruta estable; las firmadas quedan como respaldo.
 *
 * Requiere que el proxy delante de NocoDB exponga `/download` y `/dltemp`,
 * ademas de `/api`.
 */
export function buildAttachmentUrl(cell: unknown): string {
  const first = Array.isArray(cell) ? cell[0] : cell;
  if (typeof first !== "object" || first === null) return "";

  const attachment = first as JsonObject;
  const candidates: unknown[] = [attachment.path, attachment.url];

  const thumbs = attachment.thumbnails;
  if (typeof thumbs === "object" && thumbs !== null) {
    const t = thumbs as JsonObject;
    for (const size of ["card_cover", "small"]) {
      const entry = t[size];
      if (typeof entry === "object" && entry !== null) {
        candidates.push((entry as JsonObject).signedPath);
      }
    }
  }

  candidates.push(attachment.signedPath, attachment.signedUrl);

  for (const candidate of candidates) {
    const value = toStringValue(candidate).trim();
    if (!value) continue;
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    if (NOCODB_BASE_URL) return `${NOCODB_BASE_URL}/${value.replace(/^\/+/, "")}`;
  }

  return "";
}

