import { AppBar, Box, Typography } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


function FooterComponent() {
    return (
        <AppBar position="static" color='success' >
            <Box minHeight={'60px'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
                <Typography component={'a'} target='_blank' href='https://www.linkedin.com/in/ahmed-el-karra-ab4629249' sx={{ textDecoration: 'none', color: 'white' }}>
                    <LinkedInIcon sx={{ width: '30px', height: '30px' }} />
                </Typography>
                <Typography component={'a'} target='_blank' href='https://github.com/ahmedelkarra?tab=repositories' sx={{ textDecoration: 'none', color: 'white' }}>
                    <GitHubIcon sx={{ width: '30px', height: '30px' }} />
                </Typography>
            </Box>
        </AppBar>
    )
}

export default FooterComponent