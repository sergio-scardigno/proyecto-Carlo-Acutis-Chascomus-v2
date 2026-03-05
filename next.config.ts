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
    ],
  },
};

export default nextConfig;
