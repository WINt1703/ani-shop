import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cart, CartLineInput, CartLineUpdateInput, Product} from "@shopify/hydrogen/dist/esnext/graphql/types/types";
import {createCart, addCartLine, getCartById, updateCartLine} from "../api/next/cart";
import {getCookie, removeCookies, setCookies} from "cookies-next";

const slice = createSlice({
    name: "cart",
    initialState: null,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase<any, PayloadAction<Cart | null>>(addProduct.fulfilled, (state, action) => {
            if (action.payload)
                setCookies("cart", action.payload.id.split("/").slice(-1)[0])
            else
                removeCookies("cart")

            return action.payload as any
        })
        builder.addCase(initialCart.fulfilled, (state, action) => action.payload as any)
        builder.addCase(updateProduct.fulfilled, (state, action) => action.payload as any)
    }
})

export const addProduct = createAsyncThunk(
    "cart/addProduct",
    async (product: Product, thunkAPI) => {
        const cart  = cartSelector(thunkAPI.getState())

        if (cart) {
            const cartId = cart.id.split("/").slice(-1)[0]
            const lines: CartLineInput[] = cart.lines.edges.map<CartLineInput>(e => ({
                merchandiseId: e.node.merchandise.id,
                quantity: e.node.quantity,
                sellingPlanId: e.node.sellingPlanAllocation?.sellingPlan.id,
            }))

            return await addCartLine(cartId, [
                ...lines,
                {
                    merchandiseId: product.variants.edges[0].node.id,
                }
            ])
        }

        return await createCart(product.variants.edges[0].node.id)
    }
)

export const updateProduct = createAsyncThunk(
    "cart/updateProduct",
    async (line: { product: Product, quantity: number }, thunkAPI) => {
        const cart  = cartSelector(thunkAPI.getState())

        if (cart?.lines.edges.some(e => e.node.merchandise.product.id === line.product.id)) {
            const cartId = cart.id.split("/").slice(-1)[0]
            const lines: CartLineUpdateInput[] = cart.lines.edges.filter(e => e.node.merchandise.product.id === line.product.id)
                                                           .map<CartLineUpdateInput>(e => ({
                id: e.node.id,
                quantity: e.node.quantity,
            }))

            const selectedNode = cart.lines.edges.filter(e => e.node.merchandise.product.id === line.product.id)[0].node

            return await updateCartLine(cartId, [
                ...lines,
                {
                    merchandiseId: selectedNode.merchandise.id,
                    id: selectedNode.id,
                    quantity: selectedNode.quantity + line.quantity,
                }
            ])
        }

        return await createCart(line.product.variants.edges[0].node.id)
    }
)

export const initialCart = createAsyncThunk(
    "cart/initialCart",
    async (thunkAPI) => {
        const cookie = getCookie("cart")

        if (cookie)
            return await getCartById(cookie as string)

        return null
    }
)

export const cartSelector = (state: any): Cart | null => state.cart

export default slice.reducer