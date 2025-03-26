import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks"
import { setIsAuthenticated } from "../../services/slices/authSlice"
import { Navigate, Outlet } from "react-router-dom"
import { userType } from "../../utils/interfaces"


const PrivateRoutes:React.FC<{role:userType}> = ({role}) => {
    const dispatch = useAppDispatch()
    const {isAuthenticated,userType} = useAppSelector(state=>state.authReducer.auth)
    useEffect(()=>{
        dispatch(setIsAuthenticated())    
    },[])

    return(
      isAuthenticated?
        userType===role?
        <Outlet/>
        :
        <Navigate to={"/unauthorized"}/>
        :<Navigate to={"/login"}/>
    )
    
}

export default PrivateRoutes