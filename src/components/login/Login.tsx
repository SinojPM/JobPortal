import { useForm,isEmail } from "@mantine/form";
import "./login.css"
import { TextInput,PasswordInput,Button } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks";
import {loginResponse, setIsNewUser} from "../../services/slices/authSlice.ts"
import { userType } from "../../utils/interfaces.ts";
import { useNavigate } from "react-router-dom";
import { allowedUsers, passwordRegex } from "../../utils/constants.ts";
import { pathConstants } from "../../utils/pathConstants.tsx";

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userType:userType = useAppSelector(state=>state.authReducer.userType)
    const {isPending} = useAppSelector(state=>state.authReducer.loginResponse)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '' ,password: ""},
        validate: {
            email: isEmail('Invalid email'),
            password: (value) => (passwordRegex.test(value) ? null : 'Must have Atleast 1 uppercase,lowercase,special symboland Numeric values'),
        },
    });

    const handleSubmit = async(valuesFromForm:{email:string,password:string})=>{
        const userData = {...valuesFromForm,userType}
        if(userData.email&&userData.userType&&userData.password){
            try{
                const result = await dispatch(loginResponse(userData))
                if (result?.payload?.length>0) {
                    if(result.payload[0].userType==allowedUsers.employer){
                        navigate(pathConstants.home)
                        
                    }else if(result.payload[0].userType==allowedUsers.jobSeeker){
                            navigate(pathConstants.jobs)
                    }
                    
                }
                
            }catch(err){
                console.log(err);
            }
        }
    }
  return (
    <form className="login-form" onSubmit={form.onSubmit((value)=>handleSubmit(value))}>
            <TextInput label="email" w={"100%"} radius={"md"} size="lg" {...form.getInputProps('email')} mt="md" placeholder="Email" />
            <PasswordInput label="Password" w={"100%"} radius={"md"} className="inputs" size="lg" {...form.getInputProps('password')} mt={"md"} placeholder="Password" />
            
            <Button loading={isPending?true:false} loaderProps={{ type: 'dots' }} radius={"lg"} type="submit" mt="md" w={200} h={50}>
                Login
            </Button>
            <p>Dont have an account? Please <a onClick={()=>dispatch(setIsNewUser(true))}>Register</a></p>
        </form>
  )
}

export default Login