import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig

