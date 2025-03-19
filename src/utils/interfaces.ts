export type userType = "job seeker" | "employer"
export interface userTypeState{
    userType:"job seeker" | "employer";
    isNewUser:boolean;
    userDetails:userDetails | {}
}
export interface userDetails{
    name:     string;
    email:    string;
    password: string;
    id:       string;
}
export interface registerDetails{
    username:string;
    email:string;
    password:string;
    userType:userType
}