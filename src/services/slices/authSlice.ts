import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userType, userTypeState, registerDetails, loginDetails } from "../../utils/interfaces";
import { existingUserApi, loginUserApi, registerUserApi } from "../api/allApi";
import { AxiosResponse } from "axios";

const initialState: userTypeState = {
    userType: "job seeker",
    isNewUser: false,
    userDetails: {},
    registerResponse: {
        isPending: false,
        isError: false,
        response: []
    },
    loginDetails: {},
    loginResponse: {
        isPending: false,
        response: [],
        isError: false
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
            console.log(state.userDetails);
        },
        setLoginDetails: (state, dataFromForm: { payload: loginDetails }) => {
            state.loginDetails = dataFromForm.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerResponse.fulfilled, (state, Apiresult: { payload: registerDetails[] | [] }) => {
            state.registerResponse.response = Apiresult.payload
            state.registerResponse.isError = false;
            state.registerResponse.isPending = false
        })
        builder.addCase(registerResponse.pending, (state) => {
            state.registerResponse.response = []
            state.registerResponse.isError = false;
            state.registerResponse.isPending = true
        })
        builder.addCase(registerResponse.rejected, (state) => {
            state.registerResponse.response = []
            state.registerResponse.isError = true;
            state.registerResponse.isPending = false;
        })
        builder.addCase(postNewUserToDB.pending, (state) => {
            state.registerResponse.isPending = true
        })
        builder.addCase(postNewUserToDB.fulfilled, (state, Apiresult: { payload: registerDetails[] | [] }) => {
            state.registerResponse.response = Apiresult.payload
            state.registerResponse.isPending = false
        })
        builder.addCase(postNewUserToDB.rejected, (state) => {
            state.registerResponse.isPending = false
            state.registerResponse.isError = true
        })
        builder.addCase(loginResponse.fulfilled,(state,Apiresult:{payload:registerDetails[] | []})=>{
            state.loginResponse.response = Apiresult.payload
            state.loginResponse.isPending = false
        })
        builder.addCase(loginResponse.pending,(state)=>{
            state.loginResponse.isPending = true
        })
        builder.addCase(loginResponse.rejected,(state)=>{
            state.loginResponse.isError = true
        })
    }
})

//function will return the value if an existing user is present
export const registerResponse = createAsyncThunk("authSlice/registerResponse", async (email: string) => {
    const response: AxiosResponse = await existingUserApi(email)
    if (response.status == 404) {
        console.log(response);
        return []
    } else if (response.status == 200) {
        console.log(response);
        return response.data
    }
})
//function used to register new user if there is no user is Present
export const postNewUserToDB = createAsyncThunk("authSlice/postNewUserToDB", async (valueFromForm: registerDetails) => {
    const response: AxiosResponse = await registerUserApi(valueFromForm)
    if (response.status === 201) {
        return [response.data]
    } else {
        return []
    }
})
//function for login and if user exists in db returns userData
export const loginResponse = createAsyncThunk("authSlice/loginResponse", async (valueFromForm: loginDetails) => {
    console.log(valueFromForm);
    const response: AxiosResponse = await loginUserApi(valueFromForm)
    if(response.status === 200){
        if(response.data[0].password===valueFromForm.password){
            sessionStorage.setItem("user",JSON.stringify(response.data[0]))
            alert(" success")
            return response.data
        }
        else{
            alert("Wrong passWord");
        }
    }else{
        alert("Check email or userType")
    }
})

export const { setUserType, setIsNewUser, setUserData, setLoginDetails } = authSlice.actions
export default authSlice.reducer
