import {Cart, CartLineInput, CartLineUpdateInput} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import axios from "axios";

export async function createCart(merchandiseId: string): Promise<Cart> {
    return await axios.put("/api/cart", { merchandiseId: merchandiseId }).then(res => res.data.data.cartCreate.cart)
}

export async function addCartLine(cartId: string, lines: CartLineInput[]): Promise<Cart> {
    return await axios.put(`/api/cart/lines/${cartId}`, { lines: lines })
        .then(res => res.data.data.cartLinesAdd.cart)
}

export async function updateCartLine(cartId: string, lines: CartLineUpdateInput[]): Promise<Cart> {
    return await axios.post(`/api/cart/lines/${cartId}`, { lines: lines })
        .then(res => res.data.data.cartLinesUpdate.cart)
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
    return await axios.patch(`/api/cart/lines/${cartId}`, { lineIds: lineIds })
        .then(res => res.data.data.cartLinesRemove.cart)
}

export async function getCartById(cardId: string): Promise<Cart> {
    return await axios.get(`/api/cart/${cardId}`)
        .then(res => res.data.data.cart)
}