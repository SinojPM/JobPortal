import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userType, userTypeState, registerDetails, loginDetails, userDetails, } from "../../utils/interfaces";
import {  createNewUserApi, getExistingUserApi, loginApi } from "../api/allApi";
import sign from "jwt-encode"
import { jwtDecode } from "jwt-decode";
import { errorNotification, successNotifications, warningNotifications } from "../../utils/mantineConfigs";
import { allowedUsers } from "../../utils/constants";


const initialState: userTypeState = {
    userType: allowedUsers.jobSeeker,
    isNewUser: false,
    userDetails: {
        username: "",
        email: "",
        password: "",
        userType: allowedUsers.employer,
    },
    registerResponse: {
        isPending: false,
        response: []
    },
    loginDetails: {
        email: "",
        password: "",
        userType: allowedUsers.employer,
    },
    loginResponse: {
        isPending: false,
        response: [],
    },
    auth:{
        isAuthenticated:false,
        userType:allowedUsers.employer,
        userDetails:{
            username:"",
            email:"",
            password:"",
            userType:allowedUsers.employer,
            id:"",
        }
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
        },
        setIsAuthenticated:(state)=>{
            const token = sessionStorage.getItem("token")
            if(token!==null){
                const decoded:userDetails = jwtDecode(token)
                state.auth.isAuthenticated = true
                state.auth.userType = decoded.userType
                state.auth.userDetails = decoded
                
            }else{
                state.auth.isAuthenticated = false
            }   
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
            const token = sign(response[0],"jobportal")
            sessionStorage.setItem("token",token)
            successNotifications("Success","Successfully Logged In")
            return response
        }
        else{ 
            warningNotifications("Try Again","Wrong Password")  
        }
    }catch(err){
        errorNotification("User not fount",`check your Email or are you ${valueFromForm.userType==allowedUsers.employer?"a Job Seeker?":"an employer?"}`)
        
    }
})

export const { setUserType, setIsNewUser, setUserData, setLoginDetails,setIsAuthenticated} = authSlice.actions
export default authSlice.reducer
