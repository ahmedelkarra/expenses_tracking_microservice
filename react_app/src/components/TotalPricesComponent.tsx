import { Grid, Typography } from "@mui/material"
import { green, red } from '@mui/material/colors';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IExpensesInfo } from "../helper/ExpensesInfoContext";
import { useEffect, useState } from "react";


function TotalPricesComponent({ expensesInfo }: { expensesInfo: IExpensesInfo[] }) {
    const [incomes, setIncomes] = useState<number>(0)
    const [expenses, setExpenses] = useState<number>(0)
    const [totalBalance, setTotalBalance] = useState<number>(0)

    useEffect(() => {
        let newIncomes = 0
        let newExpenses = 0

        expensesInfo?.forEach((ele) => {
            if (ele.state === 'incomes') {
                newIncomes += ele.price;
            } else if (ele.state === 'expenses') {
                newExpenses += ele.price;
            }
        });

        setIncomes(newIncomes);
        setExpenses(newExpenses);
        setTotalBalance(newIncomes - newExpenses)
    }, [expensesInfo])
    return (
        <Grid container border={'1px solid white'} borderRadius={'10px'} minHeight={'20vh'} width={{ xs: '95%', md: '60%' }} margin={'0px auto'} padding={'15px'} bgcolor={green[400]}>
            <Grid item xs={12}>
                <Typography component={'h2'} color={'white'} padding={'3px'} textAlign={'center'} fontWeight={700} fontSize={'20px'}>Total Balance</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography component={'h3'} color={'white'} padding={'3px'} textAlign={'center'} fontWeight={700} fontSize={'20px'}>${totalBalance}</Typography>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                <Typography component={'div'} color={'white'} display={'flex'} alignItems={'center'} gap={2}>
                    <KeyboardArrowUpIcon sx={{ border: '1px solid', borderRadius: '50%' }} />
                    <Typography component={'div'}>
                        <Typography fontWeight={'700'} component={'h2'}>Incomes</Typography>
                        <Typography fontWeight={'700'} component={'h2'}>${incomes}</Typography>
                    </Typography>
                </Typography>

                <Typography component={'div'} color={'white'} display={'flex'} alignItems={'center'} gap={2}>
                    <KeyboardArrowDownIcon sx={{ border: '1px solid', borderRadius: '50%', color: red[500] }} />
                    <Typography component={'div'}>
                        <Typography fontWeight={'700'} component={'h2'}>Expenses</Typography>
                        <Typography fontWeight={'700'} component={'h2'}>-${expenses}</Typography>
                    </Typography>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default TotalPricesComponent