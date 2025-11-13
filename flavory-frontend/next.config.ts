import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // backend NestJS
      },
    ];
  },
  images: {
    domains: ['127.0.0.1', 'localhost'], // autoriser le backend pour next/image
  },
};

export default nextConfig;
