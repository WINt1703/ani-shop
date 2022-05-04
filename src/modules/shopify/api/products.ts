import client from "./index";
import {Product, ProductConnection} from "@shopify/hydrogen/dist/esnext/graphql/types/types";

export async function getProducts(count: number = 5): Promise<Array<Product>> {
    const QUERY = `{
    products (first: ${count}) {
      edges {
        node {
          id
          title        
          description
          variants(first: 1) {
           edges {
             node {
               id
               priceV2 {
                 amount
                 currencyCode
               }
             }
           }
          } 
          images(first: 1) {
            edges {
             node {
                url
                altText
             }
            }
          }    
        }
      }
    }
  }`

    return await client.query({
        data: QUERY,
    }).then(res => ((res.body as any).data.products as ProductConnection).edges.map(e => e.node))
}