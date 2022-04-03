import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cart} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import {removeCookies} from "cookies-next";

function getInitialState(): Cart | null {
    return null
}

const slice = createSlice({
    name: "cart",
    initialState: getInitialState(),
    reducers: {
        clearCart: state => {
            removeCookies("cart")
            return null
        },
        setCart: (state, action: PayloadAction<Cart>) => action.payload,
    }
})

export const {clearCart, setCart} = slice.actions

export const cartSelector = (state: any): Cart | null => state.cart

export default slice.reducer