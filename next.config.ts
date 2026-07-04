import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/careers/apply/:id",
        destination: "/careers/apply?position=:id",
        permanent: false,
      },
    ];
  },
  images: {
    // Google user-content URLs often return 400 to Next.js's server-side optimizer fetch.
    // Load remote images via the browser instead (same as plain <img>).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
