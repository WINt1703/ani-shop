/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_DOMAIN: "ani-shop-ua.myshopify.com",
    SHOPIFY_ACCESS_TOKEN: "4492ff534a5e9d1bb71daf9f152643dc",
  },
  images: {
    domains: ['assets.example.com'],
  },
}

module.exports = nextConfig
