import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/slices/authSlice"
import jobSlice from "../services/slices/jobSlice"

const store = configureStore({
    reducer:{
        authReducer:authSlice,
        jobReducer:jobSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store