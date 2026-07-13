import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/track",
        destination: "/tasks/index.html",
      },
      {
        source: "/track/:path*",
        destination: "/tasks/:path*",
      },
    ];
  },
};

export default nextConfig;