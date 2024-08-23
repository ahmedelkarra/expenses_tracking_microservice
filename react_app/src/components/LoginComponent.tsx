import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import IsChangeContext from "../helper/IsChangeContext";
import axiosUser from "../utils/axiosUser";
import { useNavigate } from "react-router-dom";


interface IValueInputs {
    emailOrUsername: string;
    password: string;
}

function LoginComponent() {
    const [valueInputs, setValueInputs] = useState<IValueInputs>({ emailOrUsername: "", password: "" })
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()


    const isChangeContext = useContext(IsChangeContext)
    if (!isChangeContext) {
        throw new Error('this must be as string')
    }
    const { setIsChange } = isChangeContext


    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        if (valueInputs.emailOrUsername && valueInputs.password) {
            try {
                const dataResponse = await axiosUser.post(`/login`, valueInputs)
                const data = dataResponse.data as { message: string, token: string }
                setErrorMessage('')
                setSuccessMessage(data.message)
                localStorage.setItem('token', data.token)
                setTimeout(() => {
                    setIsChange(true)
                    setSuccessMessage('')
                    navigate('/')
                }, 3000)
            } catch (error) {
                const errorMessage = error as { response: { data: { message: string } } }
                setSuccessMessage('')
                setErrorMessage(errorMessage?.response?.data?.message || 'Something went wrong')
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            }
        } else {
            setSuccessMessage('')
            setErrorMessage('All inputs are reqired')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }

    return (
        <Grid container gap={'5px'}>
            <Typography onSubmit={handleSubmit} component={'form'} border={'1px solid gray'} minHeight={'30vh'} width={{ xs: '95%', md: '50%' }} margin={{ xs: '15px auto', md: '100px auto' }} borderRadius={'10px'} padding={'15px'}>
                <Grid margin={'10px 0'}>
                    <Typography component={'h2'} variant="h5" textAlign={'center'} border={'1px solid gray'} borderRadius={'5px'} color={'gray'} padding={'3px'}>Login Form</Typography>
                </Grid>
                <Grid>
                    {successMessage && <Alert severity="success" sx={{ textTransform: 'capitalize' }}>{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </Grid>
                <Grid margin={'10px 0'}>
                    <TextField variant="filled" label="Email / username" type="text" onChange={(e) => setValueInputs({ ...valueInputs, emailOrUsername: e.target.value })} required fullWidth />
                </Grid>
                <Grid margin={'10px 0'}>
                    <TextField variant="filled" label="Password" type="password" onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })} required fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="success" fullWidth type="submit">Submit</Button>
                </Grid>
            </Typography>
        </Grid>
    )
}

export default LoginComponent