

export type userType = "job seeker" | "employer"
export interface userTypeState{
    userType:"job seeker" | "employer";
    isNewUser:boolean;
    userDetails:userDetails | {}
    registerResponse:{
        isPending:boolean;
        isError:boolean;
        response:registerDetails[] | []
    };
    loginDetails:loginDetails| {};
    loginResponse:{
        isPending:boolean,
        response:registerDetails[]|[],
        isError:boolean,
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
