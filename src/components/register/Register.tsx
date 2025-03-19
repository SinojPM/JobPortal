import "./register.css"
import { useForm,isEmail, isNotEmpty } from "@mantine/form";
import { TextInput,PasswordInput,Button } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks";
import {  setIsNewUser,setUserData } from "../../services/slices/authSlice.js";
import { userType } from "../../utils/interfaces.js";


const Register = () => {
    const userType:userType = useAppSelector(state=>state.authReducer.userType)
    const dispatch = useAppDispatch()



    const handleSubmit = (valuesFromForm:{username:string,email:string,password:string})=>{
        const userData = {...valuesFromForm,userType}
        dispatch(setUserData(userData))
    }

    const form = useForm({
            mode: 'uncontrolled',
            initialValues: { username:'',email: '' ,password: ""},
            validate: {
                username:isNotEmpty("enter UserName"),
                email: isEmail('Invalid email'),
                password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(value) ? null : 'Must have Atleast 1 uppercase,lowercase,special symboland Numeric values'),
            },
        });
    return (
        <form className="register-form" onSubmit={form.onSubmit((value) => handleSubmit(value))}>
            <TextInput label="Username" w={"100%"} radius={"md"} size="xl" {...form.getInputProps('username')} mt="md" placeholder="Username" />
            <TextInput label="Email" w={"100%"} radius={"md"} size="xl" {...form.getInputProps('email')} mt="md" placeholder="Email" />
            <PasswordInput label="Password" w={"100%"} radius={"md"} className="inputs" size="xl" {...form.getInputProps('password')} mt={"md"} placeholder="Password" />

            <Button radius={"lg"} type="submit" mt="md" w={200} h={50}>
                Register
            </Button>
            <p>Already have an account? Please <a onClick={()=>dispatch(setIsNewUser(true))}>Login</a></p>
        </form>
    )
}

export default Register