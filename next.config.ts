import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/redirect/:slug",
        destination: "/r/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
