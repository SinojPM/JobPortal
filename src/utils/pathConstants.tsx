import { routeDetails } from "./interfaces"
import Home from "../pages/home/Home"
import Auth from "../pages/Auth/Auth"
import UnAuthorized from "../pages/unauthorized/UnAuthorized"
import { Navigate } from "react-router-dom"
import FindJobs from "../pages/jobSeeker/findJobs/FindJobs"
import Companies from "../pages/jobSeeker/companies/Companies"
import Applications from "../pages/jobSeeker/applications/Applications"
import MyProfile from "../pages/jobSeeker/myprofile/MyProfile"

// page paths constants
export const pathConstants = {
  base:"/",
  login:"/login",
  home:"/home",
  jobs:"/job-seeker/find-jobs",
  unauthorized:"/unauthorized",
  companies:"/job-seeker/browse-companies",
  applications:"/job-seeker/applications",
  profile:"/job-seeker/profile",
}

//routes

export const routes:routeDetails[] = [
    {path:pathConstants.login , component:<Auth/> , allowedUsers:"public"},
    {path:pathConstants.home , component:<Home/> , allowedUsers:"employer"},
    {path:pathConstants.jobs , component:<FindJobs/> , allowedUsers:"jobSeeker"},
    {path:pathConstants.unauthorized , component:<UnAuthorized/> , allowedUsers:"all"},
    {path:pathConstants.base , component:<Navigate to={pathConstants.login}/> , allowedUsers:"public"},
    {path:pathConstants.companies , component:<Companies/> , allowedUsers:"jobSeeker"},
    {path:pathConstants.applications , component:<Applications/> , allowedUsers:"jobSeeker"},
    {path:pathConstants.profile , component:<MyProfile/> , allowedUsers:"jobSeeker"},
  ]

//api endpoints

export const apiEndPoints = {
  users:"/users",
  jobs:"/jobs"
}







