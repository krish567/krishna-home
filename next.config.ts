import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/track",
        destination: "/tasks.html",
      },
    ];
  },
};

export default nextConfig;