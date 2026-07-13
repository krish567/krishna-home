import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/track",
        destination: "/tasks/index.html",
      },
      {
        source: "/track/sw.js",
        destination: "/tasks/sw.js",
      },
      {
        source: "/track/manifest.webmanifest",
        destination: "/tasks/manifest.webmanifest",
      },
      {
        source: "/track/icon-192.png",
        destination: "/tasks/icon-192.png",
      },
      {
        source: "/track/icon-512.png",
        destination: "/tasks/icon-512.png",
      },
    ];
  },
};

export default nextConfig;