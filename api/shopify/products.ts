import client from "./index";
import {Connection} from "./connection";
import Product from "./models/Product";

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
    }).then(res => ((res.body as any).data.products as Connection<Product>).edges.map(e => e.node))
}