import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://couriersync.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
