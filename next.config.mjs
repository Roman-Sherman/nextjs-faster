/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/_next/image", // Match the path for Next.js image requests
        headers: [
          {
            key: "Cache-Control",
            value: "public, immutable, max-age=31536000", // Mark as immutable and set long caching
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bevgyjm5apuichhj.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/insights/vitals.js",
        destination:
          "https://cdn.vercel-insights.com/v1/speed-insights/script.js",
      },
      {
        source: "/insights/events.js",
        destination: "https://cdn.vercel-insights.com/v1/script.js",
      },
      {
        source: "/hfi/events/:slug*",
        destination: "https://vitals.vercel-insights.com/v1/:slug*",
      },
      {
        source: "/hfi/vitals/:slug*",
        destination: "https://vitals.vercel-insights.com/v2/:slug*",
      },
    ];
  },
};

export default nextConfig;
