import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Cart from "./models/Cart";
import Product from "../../api/shopify/models/Product";

function getInitialState(): Cart {
    return {
        products: [],
        productCount: 0,
        totalSum: 0,
    }
}

const slice = createSlice({
    name: "cart",
    initialState: getInitialState(),
    reducers: {
        addProduct: (state, dispatch: PayloadAction<Product>) => {
            const productCart = state.products.find(p => p.product.id === dispatch.payload.id)
            const newProducts = state.products.filter(p => p.product.id !== productCart?.product.id)

            if (productCart)
                newProducts.push({
                    count: productCart.count + 1,
                    sum: productCart.sum + dispatch.payload.variants.edges[0].node.priceV2.amount,
                    product: dispatch.payload,
                })

            return {
                totalSum: state.totalSum + dispatch.payload.variants.edges[0].node.priceV2.amount,
                productCount: state.productCount + 1,
                products: newProducts,
            }
        }
    },
})

export const { addProduct } = slice.actions

export const cartSelector = (state: any) => state.cart

export default slice.reducer