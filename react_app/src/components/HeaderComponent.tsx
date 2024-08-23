import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerComponent from './DrawerComponent';
import { useContext } from 'react';
import IsUserContext from '../helper/IsUserContext';
import { Link } from 'react-router-dom';

export default function HeaderComponent() {
    const isUserContext = useContext(IsUserContext)
    if (!isUserContext) {
        throw new Error('this must be as boolean')
    }
    const { isUser } = isUserContext
    return (
        <Box>
            <AppBar position="static" color='success'>
                <Toolbar variant="dense">
                    <DrawerComponent isUser={isUser} />
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" color="white" component="h2">
                            Expense Ease
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
