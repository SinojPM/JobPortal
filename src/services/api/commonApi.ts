import axios from "axios";

const commonApi= async<T> (httpmethod:string,url:string,reqBody:T)=>{
    const reqConfig = {
        method:httpmethod,
        url,
        data:reqBody,
        headers:{"Content-Type":"application/json"},
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch((err)=>{
        return err
    })
}

export default commonApi