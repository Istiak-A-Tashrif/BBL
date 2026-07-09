import type { NextConfig } from "next";

const uploadAssetUrl = new URL(
  process.env.CMS_ASSET_BASE_URL ||
    (process.env.CMS_API_BASE_URL || "http://localhost:8000/api/v1").replace(/\/api\/v1\/?$/, ""),
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: uploadAssetUrl.protocol.replace(":", "") as "http" | "https",
        hostname: uploadAssetUrl.hostname,
        port: uploadAssetUrl.port,
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/bbl/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
