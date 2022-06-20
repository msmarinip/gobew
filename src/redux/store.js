import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { clientReducer } from "./reducer";
// import { adminReducer } from "../admin/redux/reducer";

export const store = configureStore({
    reducer: {
        clientReducer,
        // adminReducer
    },
    devTools: true,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
})
