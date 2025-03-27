import  { get ,post} from "./commonApi";
import { loginDetails, registerDetails } from "../../utils/interfaces";
import { apiEndPoints } from "../../utils/pathConstants";

//api to get an existing user
export const getExistingUserApi = async(email:string)=>{
    return await get(`${apiEndPoints.users}?email=${email}`)
}
//api to post new user to dB
export const createNewUserApi = async(reqBody:registerDetails)=>{
    return await post<registerDetails>(apiEndPoints.users,reqBody)
}

//api for login
export const loginApi = async(valueFromForm:loginDetails)=>{
    return await get(`${apiEndPoints.users}?email=${valueFromForm.email}&userType=${valueFromForm.userType}`)
}

