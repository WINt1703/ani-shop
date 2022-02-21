import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../slices/cart"

export default configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
    reducer: {
        cart: cartReducer,
    }
})