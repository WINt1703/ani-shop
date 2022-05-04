import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cart} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import {removeCookies} from "cookies-next";
import RootStore from "../../../common/types/rootStore";

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

export const cartSelector = (state: RootStore): Cart | null => state.cart

export default slice.reducer