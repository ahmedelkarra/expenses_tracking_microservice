import { AppBar, Box, Typography } from "@mui/material"
import DialogTransactionOptions from "./DialogTransactionOptions";
import { IExpensesInfo } from "../helper/ExpensesInfoContext";


function TransactionEach({ expensesInfo }: { expensesInfo: IExpensesInfo }) {

    return (
        <Box margin={'10px 0'} padding={1} sx={{ transform: 'scale(1)', transitionDuration: '200ms', ":hover": { transform: 'scale(1.006)' } }}>
            <AppBar position="static" color={expensesInfo?.state == "incomes" ? 'success' : 'error'} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1, borderRadius: '5px', gap: '5px' }} >
                <Typography component={'h2'}>{expensesInfo?.title}</Typography>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>
                    <Box>
                        <Typography component={'h3'}>${expensesInfo?.price}</Typography>
                        <Typography component={'h3'}>{expensesInfo?.create_at}</Typography>
                    </Box>
                    <DialogTransactionOptions expensesInfo={expensesInfo} />
                </Box>
            </AppBar>
        </Box>
    )
}

export default TransactionEach