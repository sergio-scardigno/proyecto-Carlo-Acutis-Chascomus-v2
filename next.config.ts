import type { NextConfig } from "next";

// Sin `images.remotePatterns`: todas las imagenes del sitio son locales (public/img).
// La unica imagen remota es la miniatura de YouTube en FeaturedVideoCard, que usa
// `unoptimized` y por eso no pasa por esa validacion.
const nextConfig: NextConfig = {};

export default nextConfig;
