/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
  },
  assetPrefix: isProd ? "/ani-shop/" : "",
}

module.exports = nextConfig
