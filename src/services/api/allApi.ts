import commonApi from "./commonApi";
import { registerDetails } from "../../utils/interfaces";

const baseUrl = "https://67d7da1e9d5e3a10152c4234.mockapi.io/flycatch/api"

//api to get all users
export const getUsersApi=async()=>{
   return await commonApi("GET",`${baseUrl}/users`,"")
}


export const existingUserApi = async(email:string)=>{
    return await commonApi("GET",`${baseUrl}/users?email=${email}`,"")
}

export const registerUserApi = async(valueFromForm:registerDetails)=>{
    return await commonApi("POST",`${baseUrl}/users`,valueFromForm)
}