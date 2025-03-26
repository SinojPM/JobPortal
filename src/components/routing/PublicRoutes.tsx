import { Navigate, Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks"
import { setIsAuthenticated } from "../../services/slices/authSlice"
import { useEffect } from "react"




const PublicRoutes = () => {
    const dispatch = useAppDispatch()
    const {isAuthenticated,userType} = useAppSelector(state=>state.authReducer.auth)
    useEffect(()=>{
        dispatch(setIsAuthenticated())
    },[])
  return (
    isAuthenticated?<Navigate to={userType==="job seeker"?"/jobs":"/home"}/>:<Outlet/>
  )
}

export default PublicRoutes