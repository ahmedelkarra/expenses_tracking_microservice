import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import { IExpensesInfo } from '../helper/ExpensesInfoContext';
import axiosExpense from '../utils/axiosExpense';
import IsChangeContext from '../helper/IsChangeContext';
import { Alert, Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';


export default function DialogTransactionOptions({ expensesInfo }: { expensesInfo: IExpensesInfo }) {
    const [valueInputs, setValueInputs] = React.useState<IExpensesInfo>({ id: "", title: "", price: 0, author: "", state: "", create_at: "" })
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
        if (valueInputs.id && valueInputs.title && valueInputs.price) {
            try {
                const dataResponse = await axiosExpense.put(`/expense/${valueInputs?.id}`, valueInputs, { headers: { Authorization: token } })
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

    const hanldeDelete = async () => {
        if (valueInputs.id) {
            try {
                const dataResponse = await axiosExpense.delete(`/expense/${valueInputs?.id}`, { headers: { Authorization: token } })
                const data = dataResponse.data as { message: string }
                setErrorMessage('')
                setSuccessMessage(data.message)
                setTimeout(() => {
                    setIsChange(true)
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

    React.useEffect(() => {
        setValueInputs({ ...valueInputs, id: expensesInfo?.id, title: expensesInfo?.title, price: expensesInfo?.price, state: expensesInfo?.state })
    }, [expensesInfo])
    return (
        <React.Fragment>
            <Button variant="text" onClick={handleClickOpen} color='inherit'>
                <SettingsIcon />
            </Button>
            <Dialog
                component={'form'}
                open={open}
                onClose={handleClose}
                onSubmit={hanldeSubmit}
            >
                <DialogTitle>Edit expense form</DialogTitle>
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
                        value={valueInputs?.title}
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
                        value={valueInputs?.price}
                        onChange={(e) => setValueInputs({ ...valueInputs, price: Number(e.target.value) })}
                    />
                    <RadioGroup name="use-radio-group">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <FormControlLabel value="incomes" control={<Radio color='success' />} label="Incomes" checked={valueInputs.state === 'incomes'} onClick={() => setValueInputs({ ...valueInputs, state: 'incomes' })} />
                            <FormControlLabel value="expenses" control={<Radio color='error' />} label="Expenses" checked={valueInputs.state === 'expenses'} onClick={() => setValueInputs({ ...valueInputs, state: 'expenses' })} />
                        </Box>
                    </RadioGroup>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onClick={handleClose} variant='contained' color='warning'>Cancel</Button>
                    <Button type="button" variant='contained' color='error' onClick={hanldeDelete}>Delete</Button>
                    <Button type="submit" variant='contained' color='success'>Edit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
