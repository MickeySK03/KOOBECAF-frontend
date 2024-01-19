import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
import chatSlice from "./slices/chatSlice";
import paymentSlice from "./slices/paymentSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        category: categorySlice,
        chat: chatSlice,
        payment: paymentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
