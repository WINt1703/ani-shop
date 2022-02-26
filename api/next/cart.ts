import {Cart, CartLineInput} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import axios from "axios";

export async function createCart(merchandiseId: string): Promise<Cart> {
    return await axios.put("/api/cart", { merchandiseId: merchandiseId }).then(res => res.data.data.cartCreate.cart)
}

export async function addCartLine(cartId: string, lines: CartLineInput[]): Promise<Cart> {
    return await axios.post("/api/cart", { cartId: cartId, lines: lines })
        .then(res => res.data.data.cartLinesAdd.cart)
}