import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userType, userTypeState,registerDetails } from "../../utils/interfaces";

const initialState:userTypeState = {
    userType:"job seeker",
    isNewUser:false,
    userDetails:{},
}








const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        setUserType:(state,type:{payload:userType})=>{
            state.userType = type.payload
        },
        setIsNewUser:(state,isNewUser:{payload:boolean})=>{
            state.isNewUser = isNewUser.payload
        },
        setUserData:(state,dataFromForm:{payload:registerDetails})=>{
            state.userDetails = dataFromForm.payload
            console.log(state.userDetails);
            
        }
    },
})
export const {setUserType,setIsNewUser,setUserData} = authSlice.actions
export default authSlice.reducer
