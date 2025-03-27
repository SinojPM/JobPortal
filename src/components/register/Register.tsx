import "./register.css"
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core"
import { useAppDispatch, useAppSelector } from "../../redux/ReduxHooks";
import { postNewUserToDB, registerResponse, setIsNewUser, setUserData } from "../../services/slices/authSlice.js";
import { userType } from "../../utils/interfaces.js";
import { passwordRegex } from "../../utils/constants.js";
import { successNotifications } from "../../utils/mantineConfigs.js";


const Register = () => {
    const userType: userType = useAppSelector(state => state.authReducer.userType)
    const { isPending } = useAppSelector(state => state.authReducer.registerResponse)
    const dispatch = useAppDispatch()


    // function to post to db if no existing user
    const handleSubmit = async (valuesFromForm: { username: string, email: string, password: string }) => {
        const userData = { ...valuesFromForm, userType }
        dispatch(setUserData(userData))
        if (userData.email) {
            try {
                const result = await dispatch(registerResponse(userData.email))
                if (result.payload.length === 0) {
                    await dispatch(postNewUserToDB(userData))
                    dispatch(setIsNewUser(false))
                }
                else {
                    successNotifications("Please Login","User Already exists")
                }
            } catch (err) {
                console.log(err);
            }
        }
    }


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { username: '', email: '', password: "" },
        validate: {
            username: isNotEmpty("enter UserName"),
            email: isEmail('Invalid email'),
            password: (value) => (passwordRegex.test(value) ? null : 'Must have Atleast 1 uppercase,lowercase,special symboland Numeric values'),
        },
    });
    return (
        <form className="register-form" onSubmit={form.onSubmit((value) => handleSubmit(value))}>
            <TextInput label="Username" w={"100%"} radius={"md"} size="lg" {...form.getInputProps('username')} mt="md" placeholder="Username" />
            <TextInput label="Email" w={"100%"} radius={"md"} size="lg" {...form.getInputProps('email')} mt="md" placeholder="Email" />
            <PasswordInput label="Password" w={"100%"} radius={"md"} className="inputs" size="lg" {...form.getInputProps('password')} mt={"md"} placeholder="Password" />

            <Button loading={isPending ? true : false} loaderProps={{ type: 'dots' }} radius={"lg"} type="submit" mt="md" w={200} h={50}>
                Register
            </Button>
            <p>Already have an account? Please <a onClick={() => dispatch(setIsNewUser(false))}>Login</a></p>
        </form>
    )
}

export default Register