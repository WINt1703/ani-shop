import client from "./index";
import {Cart, CartLineInput, CartLineUpdateInput} from "@shopify/hydrogen/dist/esnext/graphql/types/types";

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
    cart {
        ${CART_FIELDS}
    }
  }
}`

    return await client.query({
        data: QUERY,
    }).then(res => (res.body as any))
}

export async function addCartLine(cartId: string, lines: CartLineInput[]) {
    const variables = {
        cartId: `gid://shopify/Cart/${cartId}`,
        lines: lines,
    }

    const QUERY = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ${CART_FIELDS}
    }
    userErrors {
      field
      message
    }
  }
}`

    return await client.query({
        data: {
            query: QUERY,
            variables: variables,
        },
    }).then(res => res.body)
}

export async function getCartById(cardId: string) {
    const QUERY = `
        {
            cart(id: "gid://shopify/Cart/${cardId}") {
                ${CART_FIELDS}
            }
        }`

    return await client.query({
        data: QUERY,
    }).then(res => res.body)
}

export async function updateCartLine(cartId: string, lines: CartLineUpdateInput[]) {
    const variables = {
        cartId: `gid://shopify/Cart/${cartId}`,
        lines: lines,
    }

    const QUERY = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ${CART_FIELDS}
    }
    userErrors {
      field
      message
    }
  }
}`

    return await client.query({
        data: {
            query: QUERY,
            variables: variables,
        },
    }).then(res => res.body)
}

export async function removeCartLines(cartId: string, lineIds: Array<string>) {
    const variables = {
        cartId: `gid://shopify/Cart/${cartId}`,
        lineIds: lineIds,
    }

    const QUERY = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ${CART_FIELDS}
    }
    userErrors {
      field
      message
    }
  }
}`

    return await client.query({
        data: {
            query: QUERY,
            variables: variables,
        },
    }).then(res => res.body)
}

 const CART_FIELDS = `    
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id   
                image {
                 src
                 altText
                }     
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
`