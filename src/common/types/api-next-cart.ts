import {
    Cart,
    CartCreatePayload,
    CartLineInput,
    CartLinesAddPayload, CartLinesRemovePayload, CartLinesUpdatePayload,
    CartLineUpdateInput
} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import {AxiosResponse} from "axios";

export interface CreateCartData {
    merchandiseId: string,
}

export interface CreateCartResponse extends AxiosResponse<{ data: { cartCreate: CartCreatePayload } }> { }


export interface AddCartLineData {
    lines: CartLineInput[],
}

export interface AddCartLineResponse extends AxiosResponse<{ data: { cartLinesAdd: CartLinesAddPayload } }> { }


export interface UpdateCartLineData {
    lines: CartLineUpdateInput[],
}

export interface UpdateCartLineResponse extends AxiosResponse<{ data: { cartLinesUpdate: CartLinesUpdatePayload } }> { }


export interface RemoveCartLineData {
    lineIds: string[],
}

export interface RemoveCartLineResponse extends AxiosResponse<{ data: { cartLinesRemove: CartLinesRemovePayload } }> { }


export interface GetCartByIdResponse extends AxiosResponse<{ cart: Cart }> { }