import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 95],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
