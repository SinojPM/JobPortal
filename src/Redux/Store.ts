import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/slices/authSlice"

const store = configureStore({
    reducer:{
        authReducer:authSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store