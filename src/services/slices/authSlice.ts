import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userType, userTypeState, registerDetails, loginDetails } from "../../utils/interfaces";
import {  createNewUserApi, getExistingUserApi, loginApi } from "../api/allApi";

const initialState: userTypeState = {
    userType: "job seeker",
    isNewUser: false,
    userDetails: {
        username: "",
        email: "",
        password: "",
        userType: "employer",
    },
    registerResponse: {
        isPending: false,
        response: []
    },
    loginDetails: {
        email: "",
        password: "",
        userType: "employer",
    },
    loginResponse: {
        isPending: false,
        response: [],
    }
}
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUserType: (state, type: { payload: userType }) => {
            state.userType = type.payload
        },
        setIsNewUser: (state, isNewUser: { payload: boolean }) => {
            state.isNewUser = isNewUser.payload
        },
        setUserData: (state, dataFromForm: { payload: registerDetails }) => {
            state.userDetails = dataFromForm.payload
        },
        setLoginDetails: (state, dataFromForm: { payload: loginDetails }) => {
            state.loginDetails = dataFromForm.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerResponse.fulfilled, (state, Apiresult: { payload: registerDetails[] | [] }) => {
            state.registerResponse.response = Apiresult.payload
            state.registerResponse.isPending = false
        })
        builder.addCase(registerResponse.pending, (state) => {
            state.registerResponse.response = []
            state.registerResponse.isPending = true
        })
        builder.addCase(postNewUserToDB.pending, (state) => {
            state.registerResponse.isPending = true
        })
        builder.addCase(postNewUserToDB.fulfilled, (state, Apiresult: { payload: registerDetails[] | [] }) => {
            state.registerResponse.response = Apiresult.payload
            state.registerResponse.isPending = false
        })
        builder.addCase(loginResponse.fulfilled, (state, Apiresult: { payload: registerDetails[] | [] }) => {
            state.loginResponse.response = Apiresult.payload
            state.loginResponse.isPending = false
        })
        builder.addCase(loginResponse.pending, (state) => {
            state.loginResponse.isPending = true
        })
    }
})

//function will return the value if an existing user is present
export const registerResponse = createAsyncThunk("authSlice/registerResponse", async (email: string) => {
    try{
        const response = await getExistingUserApi(email)
        console.log(response);
        return response
    }catch(err){
         if(err==="Not found"){
            return []
         }else{
            console.log(err);
         }
    } 
})
//function used to register new user if there is no user is Present
export const postNewUserToDB = createAsyncThunk("authSlice/postNewUserToDB", async (valueFromForm: registerDetails) => {
    try{
        const response = await createNewUserApi(valueFromForm)
        console.log(response);
        return response
    }catch(err){
        return []
    }
})

//function for login and if user exists in db returns userData
export const loginResponse = createAsyncThunk("authSlice/loginResponse", async (valueFromForm: loginDetails) => {
    try{
        const response = await loginApi(valueFromForm)
        if(response[0].password===valueFromForm.password){
            sessionStorage.setItem("user",JSON.stringify(response[0]))
            alert("success")
            return response
        }else{
            alert("wrong password")
        }
    }catch(err){
        alert(`user not found ,check your Email or are you ${valueFromForm.userType=="employer"?"a Job Seeker?":"an employer?"}`)
        
    }
})

export const { setUserType, setIsNewUser, setUserData, setLoginDetails } = authSlice.actions
export default authSlice.reducer
