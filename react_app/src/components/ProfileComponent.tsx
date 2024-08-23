import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import axiosUser from "../utils/axiosUser";
import IsChangeContext from "../helper/IsChangeContext";
import UserInfoContext from "../helper/UserInfoContext";
import { useNavigate } from "react-router-dom";


interface IValueInputs {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    new_password: string;
    confirm_new_password: string;

}

function ProfileComponent() {
    const [valueInputs, setValueInputs] = useState<IValueInputs>({ first_name: "", last_name: "", username: "", email: "", password: "", new_password: "", confirm_new_password: "" })
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token') || ''

    const isChangeContext = useContext(IsChangeContext)
    if (!isChangeContext) {
        throw new Error('this must be as string')
    }
    const { setIsChange } = isChangeContext

    const userInfoContext = useContext(UserInfoContext)
    if (!userInfoContext) {
        throw new Error('this must be as string')
    }
    const { userInfo } = userInfoContext

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isEmail = re.test(valueInputs.email)
        if (valueInputs.first_name && valueInputs.last_name && isEmail && valueInputs.username && valueInputs.password && valueInputs.new_password === valueInputs.confirm_new_password) {
            try {
                const dataResponse = await axiosUser.put(`/me`, valueInputs, { headers: { Authorization: token } })
                const data = dataResponse.data as { message: string, token: string }
                setErrorMessage('')
                setSuccessMessage(data.message)
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
        } else if (valueInputs.new_password !== valueInputs.confirm_new_password) {
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

    const handleDelete = async () => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isEmail = re.test(valueInputs.email)
        if (valueInputs.first_name && valueInputs.last_name && isEmail && valueInputs.username && valueInputs.password) {
            try {
                const headers = { headers: { Authorization: token }, data: valueInputs }
                const dataResponse = await axiosUser.delete(`/me`, headers)
                const data = dataResponse.data as { message: string, token: string }
                setErrorMessage('')
                localStorage.removeItem('token')
                setSuccessMessage(data.message)
                setTimeout(() => {
                    setIsChange(true)
                    setSuccessMessage('')
                }, 3000)
            } catch (error) {
                const errorMessage = error as { response: { data: { message: string } } }
                setSuccessMessage('')
                setErrorMessage(errorMessage?.response?.data?.message || 'Something went wrong')
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            }
        } else if (valueInputs.new_password !== valueInputs.confirm_new_password) {
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



    useEffect(() => {
        setValueInputs({ ...valueInputs, first_name: userInfo?.first_name, last_name: userInfo?.last_name, username: userInfo?.username, email: userInfo?.email })
    }, [userInfo])
    return (
        <Typography component={'form'} onSubmit={handleSubmit} border={'1px solid gray'} minHeight={'40vh'} width={{ xs: '95%', md: '50%' }} margin={{ xs: '15px auto', md: '100px auto' }} borderRadius={'10px'} padding={'15px'}>
            <Grid container height={'100%'} spacing={2}>
                <Grid item xs={12}>
                    <Typography component={'h2'} variant="h5" textAlign={'center'} border={'1px solid gray'} borderRadius={'5px'} color={'gray'} padding={'3px'}>Profile Form</Typography>
                </Grid>
                <Grid item xs={12}>
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="First Name" type="text" onChange={(e) => setValueInputs({ ...valueInputs, first_name: e.target.value })} value={valueInputs?.first_name} fullWidth required />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Last Name" type="text" onChange={(e) => setValueInputs({ ...valueInputs, last_name: e.target.value })} value={valueInputs?.last_name} fullWidth required />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Username" type="text" onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })} value={valueInputs?.username} fullWidth required />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Email" type="email" onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })} value={valueInputs?.email} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="filled" label="Password" type="password" onChange={(e) => setValueInputs({ ...valueInputs, password: e.target.value })} fullWidth required />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Confirm Password" type="password" onChange={(e) => setValueInputs({ ...valueInputs, new_password: e.target.value })} fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="filled" label="Confirm Password" type="password" onChange={(e) => setValueInputs({ ...valueInputs, confirm_new_password: e.target.value })} fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="success" type="submit" fullWidth>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="error" type="button" fullWidth onClick={handleDelete}>DELETE</Button>
                </Grid>
            </Grid>
        </Typography>
    )
}

export default ProfileComponent