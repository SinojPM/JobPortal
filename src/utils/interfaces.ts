

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
}
export interface userDetails{
    name:     string;
    email:    string;
    password: string;
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
