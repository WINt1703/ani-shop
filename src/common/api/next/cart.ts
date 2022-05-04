import {Cart, CartLineInput, CartLineUpdateInput} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import axios from "axios";
import {
    AddCartLineData,
    AddCartLineResponse,
    CreateCartData,
    CreateCartResponse, GetCartByIdResponse, RemoveCartLineData, RemoveCartLineResponse,
    UpdateCartLineData, UpdateCartLineResponse
} from "../../types/api-next-cart";

export async function createCart(merchandiseId: string): Promise<Cart> {
    return await axios.put<any, CreateCartResponse, CreateCartData>("/api/cart", { merchandiseId: merchandiseId })
        .then(res => res.data.data.cartCreate.cart!)
}

export async function addCartLine(cartId: string, lines: CartLineInput[]): Promise<Cart> {
    return await axios.put<any, AddCartLineResponse, AddCartLineData>(`/api/cart/lines/${cartId}`, { lines: lines })
        .then(res => res.data.data.cartLinesAdd.cart!)
}

export async function updateCartLine(cartId: string, lines: CartLineUpdateInput[]): Promise<Cart> {
    return await axios.post<any, UpdateCartLineResponse, UpdateCartLineData>(`/api/cart/lines/${cartId}`, { lines: lines })
        .then(res => res.data.data.cartLinesUpdate.cart!)
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
    return await axios.patch<any, RemoveCartLineResponse, RemoveCartLineData>(`/api/cart/lines/${cartId}`, { lineIds: lineIds })
        .then(res => res.data.data.cartLinesRemove.cart!)
}

export async function getCartById(cardId: string): Promise<Cart> {
    return await axios.get<GetCartByIdResponse>(`/api/cart/${cardId}`)
        .then(res => res.data.data.cart)
}