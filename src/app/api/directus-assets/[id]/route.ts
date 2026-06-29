import { NextRequest } from "next/server";

const DIRECTUS_BASE_URL = process.env.DIRECTUS_BASE_URL ?? "";
const DIRECTUS_API_TOKEN = process.env.DIRECTUS_API_TOKEN ?? "";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!DIRECTUS_BASE_URL) {
    return new Response("DIRECTUS_BASE_URL no configurada.", { status: 500 });
  }

  if (!DIRECTUS_API_TOKEN) {
    return new Response("DIRECTUS_API_TOKEN no configurado para assets privados.", { status: 500 });
  }

  const assetUrl = `${DIRECTUS_BASE_URL}/assets/${encodeURIComponent(id)}`;

  const upstream = await fetch(assetUrl, {
    headers: {
      Authorization: `Bearer ${DIRECTUS_API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!upstream.ok) {
    const detail = await upstream.text();
    return new Response(detail || `Error al obtener asset ${id}`, { status: upstream.status });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
