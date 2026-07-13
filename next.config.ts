import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/track",
        destination: "/tasks/index.html",
      },
    ];
  },
};

export default nextConfig;