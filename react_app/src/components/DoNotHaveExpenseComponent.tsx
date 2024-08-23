import { Typography } from "@mui/material"
import { green } from "@mui/material/colors"

function DoNotHaveExpenseComponent() {
    return (
        <Typography component={'div'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} height={'30dvh'} border={'1px solid green'} margin={'50px auto'} width={'50%'} borderRadius={'10px'}>
            <Typography component={'h2'} variant="h5" border={'1px solid green'} borderRadius={'5px'} padding={'10px'} color={green[800]}>
                You don't have any expense to show
            </Typography>
        </Typography>
    )
}

export default DoNotHaveExpenseComponent