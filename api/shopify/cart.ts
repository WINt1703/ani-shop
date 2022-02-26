import client from "./index";
import {Cart} from "@shopify/hydrogen";
import {CartLineInput} from "@shopify/hydrogen/dist/esnext/graphql/types/types";

export async function createCart(merchandiseId: string): Promise<Cart> {
    const QUERY = `
    mutation {
  cartCreate(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "${merchandiseId}"
        }
      ]
      attributes: { key: "cart_attribute", value: "This is a cart attribute" }
    }
  ) {
    ${CART_FIELDS}
  }
}`

    return await client.query({
        data: QUERY,
    }).then(res => (res.body as any))
}

export async function addCartLine(cartId: string, lines: CartLineInput[]) {
    const QUERY = `mutation cartLinesAdd {
  cartLinesAdd(cartId: "${cartId}", lines: [${lines.map(l => `{ merchandiseId: "${l.merchandiseId}" },`)}]) {
    ${CART_FIELDS}
    userErrors {
      field
      message
    }
  }
}`

    console.log(QUERY)
    return await client.query({
        data: QUERY,
    }).then(res => res.body)
}

const CART_FIELDS = `
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
                product {
                 id
                 title
                 description
                 images(first: 5) {
                  edges {
                   node {
                    url
                    altText
                   }
                  }
                 }
                }
                 priceV2 {
                  amount
                  currencyCode
                 }
              }
            }
          }
        }
      }
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
`