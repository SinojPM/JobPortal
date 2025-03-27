import { routeDetails } from "./interfaces"
import Home from "../pages/home/Home"
import Auth from "../pages/Auth/Auth"
import JobSeekerHome from "../pages/JobSeekerHome.tsx/JobSeekerHome"
import UnAuthorized from "../pages/UnAuthorized.tsx/UnAuthorized"
import { Navigate } from "react-router-dom"
// page paths constants
export const pathConstants = {
  base:"/",
  login:"/login",
  home:"/home",
  jobs:"/jobs",
  unauthorized:"/unauthorized"
}

//routes

export const routes:routeDetails[] = [
    {path:pathConstants.login , component:<Auth/> , allowedUsers:"public"},
    {path:pathConstants.home , component:<Home/> , allowedUsers:"employer"},
    {path:pathConstants.jobs , component:<JobSeekerHome/> , allowedUsers:"jobSeeker"},
    {path:pathConstants.unauthorized , component:<UnAuthorized/> , allowedUsers:"all"},
    {path:pathConstants.base , component:<Navigate to={pathConstants.login}/> , allowedUsers:"public"}
  ]

//api endpoints

export const apiEndPoints = {
  users:"/users"
}

