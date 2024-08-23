import { Box, Button, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"

function HaveToLoginComponent() {
    const navigate = useNavigate()
    return (
        <Typography component={'div'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} height={{ xs: '50dvh', md: '30dvh' }} border={'1px solid green'} margin={'50px auto'} width={{ xs: '95%', md: '50%' }} borderRadius={'10px'} textAlign={'center'} padding={'10px'}>
            <Typography component={'h2'} variant="h5" border={'1px solid green'} borderRadius={'5px'} padding={'10px'} color={green[800]}>
                You have to sign in first to see that page
            </Typography>
            <Box display={'flex'} gap={2}>
                <Button variant="contained" color="info" onClick={() => navigate('/register')}>Register</Button>
                <Button variant="contained" color="success" onClick={() => navigate('/login')}>Login</Button>
            </Box>
        </Typography>
    )
}

export default HaveToLoginComponent