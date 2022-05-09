/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: isProd ? 'cloudinary' : undefined,
    path: isProd ? "https://wint1703.github.io/ani-shop/" : undefined,
    domains: ['cdn.shopify.com'],
  },
  assetPrefix: isProd ? "/ani-shop/" : "",
}

module.exports = nextConfig
