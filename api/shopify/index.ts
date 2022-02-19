import Shopify from "@shopify/shopify-api";

const client = new Shopify.Clients.Storefront(process.env.SHOPIFY_DOMAIN!, process.env.SHOPIFY_ACCESS_TOKEN!);

export default client