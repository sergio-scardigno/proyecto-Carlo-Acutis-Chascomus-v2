import type { NextConfig } from "next";

const directusBaseUrl = process.env.DIRECTUS_BASE_URL;
const directusUrl = directusBaseUrl ? new URL(directusBaseUrl) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: directusUrl
      ? [
          {
            protocol: directusUrl.protocol.replace(":", "") as "http" | "https",
            hostname: directusUrl.hostname,
            port: directusUrl.port || undefined,
            pathname: "/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
