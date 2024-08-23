import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import axiosUser from "../utils/axiosUser";
import { useNavigate } from "react-router-dom";
import IsChangeContext from "../helper/IsChangeContext";


interface IValueInputs {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

function RegisterComponent() {
    const [valueInputs, setValueInputs] = useState<IValueInputs>({ first_name: "", last_name: "", username: "", email: "", password: "", confirm_password: "" })
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()

    const isChangeContext = useContext(IsChangeContext)
    if (!isChangeContext) {
        throw new Error('this must be as string')
    }
    const { setIsChange } = isChangeContext

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isEmail = re.test(valueInputs.email)
        if (valueInputs.first_name && valueInputs.last_name && isEmail && valueInputs.username && valueInputs.password && valueInputs.password === valueInputs.confirm_password) {
            try {
                const dataResponse = await axiosUser.post(`/register`, valueInputs)
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
        } else if (valueInputs.password !== valueInputs.confirm_password) {
            setSuccessMessage('')
            setErrorMessage('Your password not match')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        } else if (!isEmail) {
            setSuccessMessage('')
            setErrorMessage('Please enter a valid email')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        } else {
            setSuccessMessage('')
            setErrorMessage('All inputs are reqired')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }

    return (
        <Typography component={'form'} onSubmit={handleSubmit} border={'1px solid gray'} minHeight={'40vh'} width={{ xs: '95%', md: '50%' }} margin={{ xs: '15px auto', md: '100px auto' }} borderRadius={'10px'} padding={'15px'}>
            <Grid container height={'100%'} spacing={2}>
                <Grid item xs={12}>
                    <Typography component={'h2'} variant="h5" textAlign={'center'} border={'1px solid gray'} borderRadius={'5px'} color={'gray'} padding={'3px'}>Regsiter Form</Typography>
                </Grid>
                <Grid item xs={12}>
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="First Name" type="text" onChange={(e) => setValueInputs({ ...valueInputs, first_name: e.target.value })} fullWidth required />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Last Name" type="text" onChange={(e) => setValueInputs({ ...valueInputs, last_name: e.target.value })} fullWidth required />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Username" type="text" onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })} fullWidth required />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Email" type="email" onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="filled" label="Password" type="password" onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="filled" label="Confirm Password" type="password" onChange={(e) => setValueInputs({ ...valueInputs, confirm_password: e.target.value })} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="success" fullWidth type="submit">Submit</Button>
                </Grid>
            </Grid>
        </Typography>
    )
}

export default RegisterComponent
