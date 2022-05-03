import {Cart, Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import {addCartLine, createCart, getCartById, updateCartLine, removeCartLines} from "../api/next/cart"
import {getCookie, setCookies} from "cookies-next";

export async function updateLineOrCreateCart(line: { product: Product, quantity: number }, cart: Cart | null): Promise<Cart> {
    if (cart?.lines.edges.some(e => e.node.merchandise.product.id === line.product.id)) {
        const cartId = cart.id.split("/").slice(-1)[0]
        const selectedNode = cart.lines.edges.filter(e => e.node.merchandise.product.id === line.product.id)[0].node

        return await updateCartLine(cartId, [{
            merchandiseId: selectedNode.merchandise.id,
            id: selectedNode.id,
            quantity: selectedNode.quantity + line.quantity,
        }])
    }

    const newCart = await createCart(line.product.variants.edges[0].node.id)

    setCookies("cart", newCart.id.split("/").slice(-1)[0])

    return newCart
}

export async function addProductOrCreateCart(product: Product, cart: Cart | null): Promise<Cart> {
    if (cart) {
        const cartId = cart.id.split("/").slice(-1)[0]

        return await addCartLine(cartId, [{
            merchandiseId: product.variants.edges[0].node.id,
        }])
    }
    const newCart = await createCart(product.variants.edges[0].node.id)

    setCookies("cart", newCart.id.split("/").slice(-1)[0])

    return newCart
}

export async function getSavedCart(): Promise<Cart | null> {
    const cookie = getCookie("cart")

    if (cookie)
        return await getCartById(cookie as string)

    return null
}

export async function purgeCartLines(cart: Cart, lineIds: string[]) {
    const cartId = cart.id.split("/").slice(-1)[0]

    return await removeCartLines(cartId, lineIds)
}