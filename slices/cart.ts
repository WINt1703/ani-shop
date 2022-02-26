import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cart, Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import {createCart, addCartLine} from "../api/next/cart";

const slice = createSlice({
    name: "cart",
    initialState: null,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase<any, PayloadAction<Cart>>(addProduct.fulfilled, (state, action) => action.payload as any)
    }
})

export const addProduct = createAsyncThunk(
    "cart/addProduct",
    async (product: Product, thunkAPI) => {
        const cart  = cartSelector(thunkAPI.getState())

        if (cart) {
            return await addCartLine(cart.id, [
                ...cart.lines.edges.map(e => ({ merchandiseId: e.node.merchandise.id })),
                {
                    merchandiseId: product.variants.edges[0].node.id
                }
            ])
        }

        return await createCart(product.variants.edges[0].node.id)
    }
)

export const cartSelector = (state: any): Cart | null => state.cart

export default slice.reducer