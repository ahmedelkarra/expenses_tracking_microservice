import { Grid } from "@mui/material"
import ExpenseAdd from "./ExpenseAdd";
import ExpenseIncomesAdd from "./ExpenseIncomesAdd";


function ExpenseOptions({ isUser }: { isUser: boolean }) {
    return (
        <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
            {isUser && <ExpenseAdd />}
            {isUser && <ExpenseIncomesAdd />}
        </Grid>
    )
}

export default ExpenseOptions