import { JSX } from "react";


export type userType = "jobSeeker" | "employer"
export interface userTypeState{
    userType:"jobSeeker" | "employer";
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
    allowedUsers:allowedUsers
}
export type allowedUsers = userType | "public" | "all";

export interface AllallowedUsers{
    jobSeeker:"jobSeeker";
    employer:"employer";
    public:"public";
    all:"all";
}
