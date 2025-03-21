import  { get ,post} from "./commonApi";
import { loginDetails, registerDetails } from "../../utils/interfaces";
//api to get an existing user
export const getExistingUserApi = async(email:string)=>{
    return await get(`/users?email=${email}`)
}
//api to post new user to dB
export const createNewUserApi = async(reqBody:registerDetails)=>{
    return await post<registerDetails>(`/users`,reqBody)
}

//api for login
export const loginApi = async(valueFromForm:loginDetails)=>{
    return await get(`/users?email=${valueFromForm.email}&userType=${valueFromForm.userType}`)
}

