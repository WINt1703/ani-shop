import client from "./index";
import {Connection} from "./connection";

export interface Product {
    id: string,
    title: string,
    description: string,
    images: Connection<ProductImage>,
}

export interface ProductImage {
    altText: string,
    height: number,
    id: string,
    url: string,
    width: number,
}

export async function getProducts(count: number = 5): Promise<Array<Product>> {
    const QUERY = `{
    products (first: ${count}) {
      edges {
        node {
          id
          title
          description
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