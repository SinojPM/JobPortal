import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/slices/authSlice"
import jobSlice from "../services/slices/jobSlice"
import companySlice from "../services/slices/companySlice"

const store = configureStore({
    reducer:{
        authReducer:authSlice,
        jobReducer:jobSlice,
        companyReducer:companySlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store