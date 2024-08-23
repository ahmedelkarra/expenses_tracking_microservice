import { Grid } from "@mui/material"
import TotalPricesComponent from "./TotalPricesComponent"
import ExpenseOptions from "./ExpenseOptions"
import TransactionAll from "./TransactionAll"
import { useContext } from "react"
import ExpensesInfoContext from "../helper/ExpensesInfoContext"
import IsUserContext from "../helper/IsUserContext"


function MainHomeComponent() {
    const expenseContext = useContext(ExpensesInfoContext)
    if (!expenseContext) {
        throw new Error('this must be as IExpensesInfo[]')
    }
    const { expensesInfo } = expenseContext

    const isUserContext = useContext(IsUserContext)
    if (!isUserContext) {
        throw new Error('this must be as string')
    }
    const { isUser } = isUserContext
    return (
        <Grid container gap={1} margin={'50px auto 0 auto'}>
            <TotalPricesComponent expensesInfo={expensesInfo} />
            <ExpenseOptions isUser={isUser} />
            <TransactionAll isUser={isUser} expensesInfo={expensesInfo} />
        </Grid>
    )
}

export default MainHomeComponent