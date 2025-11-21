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
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**', // autorise tous les chemins
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**', // autorise tous les chemins
      },
    ],
  },
};

export default nextConfig;
