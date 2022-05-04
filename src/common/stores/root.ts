import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../../modules/shopify/slices/cart"

export default configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
    reducer: {
        cart: cartReducer,
    }
})