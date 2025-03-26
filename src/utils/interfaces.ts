import { JSX } from "react";


export type userType = "job seeker" | "employer"
export interface userTypeState{
    userType:"job seeker" | "employer";
    isNewUser:boolean;
    userDetails:registerDetails
    registerResponse:{
        isPending:boolean;
        response:registerDetails[] | []
    };
    loginDetails:loginDetails;
    loginResponse:{
        isPending:boolean,
        response:registerDetails[]|[],
    };
    auth:{
        isAuthenticated:boolean;
        userType:userType;
    }
}
export interface userDetails{
    username:     string;
    email:    string;
    password: string;
    userType:userType;
    id:string;
}
export interface registerDetails{
    username:string;
    email:string;
    password:string;
    userType:userType
}
export interface loginDetails{
    email:string;
    password:string;
    userType:userType
} 

export interface routeDetails{
    path:string;
    component:JSX.Element;
    allowedUsers:userType | "public" | "all";
}
