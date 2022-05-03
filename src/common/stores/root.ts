import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../../module/shopify/slices/cart"

export default configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
    reducer: {
        cart: cartReducer,
    }
})