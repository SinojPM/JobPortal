import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks"
import { setIsAuthenticated } from "../../services/slices/authSlice"
import { Navigate, Outlet } from "react-router-dom"
import { userType } from "../../utils/interfaces"
import { pathConstants } from "../../utils/pathConstants"


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
        <Navigate to={pathConstants.unauthorized}/>
        :<Navigate to={pathConstants.login}/>
    )
    
}

export default PrivateRoutes