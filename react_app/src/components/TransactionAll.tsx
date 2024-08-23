import { Box, Grid, TextField, Typography } from "@mui/material"
import TransactionEach from "./TransactionEach"
import { useState } from "react"
import { IExpensesInfo } from "../helper/ExpensesInfoContext"
import DoNotHaveExpenseComponent from "./DoNotHaveExpenseComponent"
import HaveToLoginComponent from "./HaveToLoginComponent"


function TransactionAll({ expensesInfo, isUser }: { expensesInfo: IExpensesInfo[], isUser: boolean }) {
    const [searchValue, setSearchValue] = useState<string>('')
    const filterExpensesInfo = expensesInfo?.filter((ele) => ele?.title?.includes(searchValue))
    return (
        <Grid item xs={12} margin={'10px'} padding={2}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} margin={'5px 0'}>
                <Typography component={'h2'} variant="h6" margin={'10px 0'}>Transactions</Typography>
                <TextField type="search" label={'Search'} sx={{ borderRadius: '5px', width: { xs: '40%', md: '25%' } }} variant="standard" onChange={(e) => setSearchValue(e.target.value)} disabled={!isUser || expensesInfo.length === 0} />
            </Box>
            {isUser && expensesInfo.length === 0 ?
                <DoNotHaveExpenseComponent />
                :
                <Box maxHeight={'45dvh'} sx={{ overflowY: "auto", overflowX: "hidden" }}>
                    {filterExpensesInfo?.map((ele) => {
                        return (
                            <TransactionEach key={ele?.id} expensesInfo={ele} />
                        )
                    })}
                </Box>
            }
            {!isUser && <HaveToLoginComponent />}
        </Grid>
    )
}

export default TransactionAll