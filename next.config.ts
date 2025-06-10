import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Long-term cache for static assets
        source: "/(.*)\\.(js|css|woff2|webp|jpg|png|svg|ico|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // No-cache for HTML and dynamic routes
        source: "/(.*)",
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate', // ✅ avoid 'no-store'
          },
        ],
      },
    ];
  },
  experimental: {
    optimizeCss: true,
    inlineCss: true
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ]
  }
};

export default nextConfig;
