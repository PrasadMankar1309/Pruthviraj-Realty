/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // ESLint runs through `npm run lint`; Next 14's built-in runner is incompatible with ESLint 10.
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig