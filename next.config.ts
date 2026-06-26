import type { NextConfig } from "next";

const directusBaseUrl = process.env.DIRECTUS_BASE_URL;
const directusUrl = directusBaseUrl ? new URL(directusBaseUrl) : null;
const defaultDirectusHostname = "scardigno-directus.ndorzn.easypanel.host";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: defaultDirectusHostname,
        pathname: "/**",
      },
      ...(directusUrl
        ? [
            {
              protocol: directusUrl.protocol.replace(":", "") as "http" | "https",
              hostname: directusUrl.hostname,
              port: directusUrl.port || undefined,
              pathname: "/**",
            },
          ]
        : []),
      // Instagram CDN — para imagenes de posts sincronizados via scraper → Directus
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
