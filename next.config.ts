import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/**',
      },
    ],
  },
  output: 'standalone',
   compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
