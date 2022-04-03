/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_DOMAIN: "hydrogen-preview.myshopify.com",
    SHOPIFY_ACCESS_TOKEN: "3b580e70970c4528da70c98e097c2fa0",
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
}

module.exports = nextConfig
