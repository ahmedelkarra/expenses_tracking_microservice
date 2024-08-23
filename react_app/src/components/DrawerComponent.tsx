import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import IsChangeContext from '../helper/IsChangeContext';

export default function DrawerComponent({ isUser }: { isUser: boolean }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const isChangeContext = React.useContext(IsChangeContext)
    if (!isChangeContext) {
        throw new Error('this must be as string')
    }
    const { setIsChange } = isChangeContext

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsChange(true)
        navigate('/')
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding onClick={() => navigate('/')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                </ListItem>

                {isUser && <ListItem disablePadding onClick={() => navigate('/profile')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PermIdentityIcon />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItemButton>
                </ListItem>}

                {!isUser && <ListItem disablePadding onClick={() => navigate('/login')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText>Login</ListItemText>
                    </ListItemButton>
                </ListItem>}

                {!isUser && <ListItem disablePadding onClick={() => navigate('/register')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText>Register</ListItemText>
                    </ListItemButton>
                </ListItem>}

                <Divider />

                {isUser && <ListItem disablePadding onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>}

            </List>
        </Box>
    );

    return (
        <div>
            <Typography component={'div'} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <Button onClick={toggleDrawer(true)} sx={{ minWidth: '20px', minHeight: '20px' }}>
                    <MenuIcon sx={{ color: 'white' }} />
                </Button>
            </Typography>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
