import { useForm,isEmail } from "@mantine/form";
import "./login.css"
import { TextInput,PasswordInput,Button } from "@mantine/core"
import { useAppDispatch } from "../../redux/ReduxHooks";
import {setIsNewUser} from "../../services/slices/authSlice.ts"

const Login = () => {
    const dispatch = useAppDispatch()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '' ,password: ""},
        validate: {
            email: isEmail('Invalid email'),
            password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(value) ? null : 'Must have Atleast 1 uppercase,lowercase,special symboland Numeric values'),

        },
    });
  return (
    <form className="login-form" onSubmit={form.onSubmit((value)=>console.log(value))}>
            <TextInput label="email" w={"100%"} radius={"md"} size="xl" {...form.getInputProps('email')} mt="md" placeholder="Email" />
            <PasswordInput label="Password" w={"100%"} radius={"md"} className="inputs" size="xl" {...form.getInputProps('password')} mt={"md"} placeholder="Password" />
            
            <Button radius={"lg"} type="submit" mt="md" w={200} h={50}>
                Login
            </Button>
            <p>Dont have an account? Please <a onClick={()=>dispatch(setIsNewUser(false))}>Register</a></p>
        </form>
  )
}

export default Login