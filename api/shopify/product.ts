import client from "./index";
import Product from "../../interfaces/product";

export async function getProductById(id: string): Promise<Product> {
    const QUERY = `{
            product(id: "gid://shopify/Product/${id}") {
              id
              title
              description
              variants(first: 1) {
                edges {
                  node {
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
               }
               images(first: 5) {
                edges {
                 node {
                    url
                    altText
                 }
                }
              }
            }
        }`

    return await client.query({
        data: QUERY,
    }).then(res => (res.body as any).data.product as Product)
}