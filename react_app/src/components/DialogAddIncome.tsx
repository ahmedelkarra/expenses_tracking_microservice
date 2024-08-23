import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Alert } from '@mui/material';
import IsChangeContext from '../helper/IsChangeContext';
import axiosExpense from '../utils/axiosExpense';


export default function DialogAddIncome() {
    const [valueInputs, setValueInputs] = React.useState({ title: "", price: 0, state: 'incomes' })
    const [successMessage, setSuccessMessage] = React.useState<string>('')
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const token = localStorage.getItem('token') || ''
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isChangeContext = React.useContext(IsChangeContext)
    if (!isChangeContext) {
        throw new Error('this must be as string')
    }
    const { setIsChange } = isChangeContext

    const hanldeSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        if (valueInputs.title && valueInputs.price) {
            try {
                const dataResponse = await axiosExpense.post(`/expense`, valueInputs, { headers: { Authorization: token } })
                const data = dataResponse.data as { message: string }
                setErrorMessage('')
                setSuccessMessage(data.message)
                setIsChange(true)
                setTimeout(() => {
                    setSuccessMessage('')
                    handleClose()
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
        <React.Fragment>
            <Button variant="contained" color="success" onClick={handleClickOpen}>
                <AddCircleIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                onSubmit={hanldeSubmit}
                component={'form'}
            >
                <DialogTitle>Add incomes form</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <TextField
                        required
                        id="name"
                        label="Title"
                        type="text"
                        variant="standard"
                        sx={{ width: { xs: '100%', sm: '450px' } }}
                        inputProps={{ maxLength: 50 }}
                        onChange={(e) => setValueInputs({ ...valueInputs, title: e.target.value })}
                    />
                    <TextField
                        required
                        id="name"
                        label="Price"
                        type="number"
                        variant="standard"
                        inputProps={{ min: 0 }}
                        sx={{ width: { xs: '100%', sm: '450px' } }}
                        onChange={(e) => setValueInputs({ ...valueInputs, price: Number(e.target.value) })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='error'>Cancel</Button>
                    <Button type="submit" variant='outlined' color='success'>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}