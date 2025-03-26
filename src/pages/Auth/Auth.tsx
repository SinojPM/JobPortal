import "./auth.css"
import authImg from "/assets/design-7b051895-a4ce-4319-b607-11f9ae6a2e9c 1.svg"
import group307 from "/assets/Auth/Group 307.svg"
import Logo2 from "/assets/Logo 2.svg"
import Login from "../../components/login/Login"
import Register from "../../components/register/Register"
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks"
import { setUserType } from "../../services/slices/authSlice"

const Auth = () => {
    const dispatch = useAppDispatch()
    const typeOfUser = useAppSelector((state) => state.authReducer.userType)
    const isNewUser = useAppSelector((state) => state.authReducer.isNewUser)
    return (
        <div className="auth-container">
            <img src={Logo2} alt="" className="auth-logo" />
            <div className="auth-left-sec">
                <img className="auth-left-sec-man" src={authImg} alt="" />
                <div className="auth-left-hired">
                    <img className="auth-img" src={group307} alt="" />
                    <h4>100K+</h4>
                    <p>People got hired</p>
                </div>
                
            </div>
            <div className="auth-right-sec">
                <div className="auth-user-buttons">
                    <button onClick={() => dispatch(setUserType("job seeker"))} className={`auth-user-btn ${typeOfUser === "job seeker" && "active"}`}>
                        Job Seeker
                    </button>
                    <button onClick={() => dispatch(setUserType("employer"))} className={`auth-user-btn ${typeOfUser === "employer" && "active"}`}>
                        Employer
                    </button>
                </div>
                <h1>{
                    isNewUser?
                        "Welcome Back, Dude"
                        :
                        "Get More Opportunities"
                }</h1>
                <p>{isNewUser?"SignUp":"SignIn"} with Email</p>
                <div className="auth-form-container">
                    {
                        isNewUser ?
                            <Register />
                            :
                            <Login />
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Auth