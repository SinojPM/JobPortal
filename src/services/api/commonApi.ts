import axios, { AxiosResponse } from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL
const baseUrl2 = import.meta.env.VITE_BASE_URL_2


export const axiosInstance = axios.create({
    baseURL:baseUrl,
    headers:{"Content-Type":"application/json"},
})

export const axiosInstance2 = axios.create({
    baseURL:baseUrl2,
    headers:{"Content-Type":"application/json"}
})

const handleResponse = async (response: AxiosResponse) => {
    if (response.status === 401) {
      return Promise.reject(response.data);
    }
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return response.data;
    }
    return Promise.reject(response.data);
  };

export const get = async(url:string)=>{
    try{
        const response:AxiosResponse =await axiosInstance.get(url)
       return await handleResponse(response)
    }catch(err:any){
        return await handleResponse(err.response)
    }
}

export const post = async<T>(url:string,reqBody:T)=>{
    try{
        const response:AxiosResponse = await axiosInstance.post(url,reqBody)
        return await handleResponse(response)
    }catch(err:any){
        return await handleResponse(err.response)
    }
}

export const get2 = async(url:string)=>{
    try{
        const response:AxiosResponse =await axiosInstance2.get(url)
       return await handleResponse(response)
    }catch(err:any){
        return await handleResponse(err.response)
    }
}

export const post2 = async<T>(url:string,reqBody:T)=>{
    try{
        const response:AxiosResponse = await axiosInstance2.post(url,reqBody)
        return await handleResponse(response)
    }catch(err:any){
        return await handleResponse(err.response)
    }
}

