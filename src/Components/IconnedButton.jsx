import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
export default function IconnedButton(props) {
    const location = useLocation();

    // Access the current path from the location object
    const currentPath = location.pathname;


    const theme = createTheme({
        palette: {
            mode: 'dark'
        },
    });
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    // ['Profile', 'Chat', 'Species identifier', 'Your Appointments']
    const navItemsArr = [
        { itemName: 'Profile', icon: <AccountCircleIcon />, path: '/SignIn' },
        { itemName: 'Chat', icon: <ChatIcon />, path: '/contacts' },
        { itemName: 'Species identifier', icon: <PetsIcon />, path: '/speciesidentifier' },
        { itemName: 'Your Appointments', icon: <CalendarMonthIcon />, path: '/userAppointments' }
    ]
    const secondItemsArr = [{
        itemName: 'settings', icon: <SettingsIcon />
    },
    { itemName: 'contact us', icon: <HelpIcon /> },
    { itemName: 'about us', icon: <InfoIcon /> }]
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {navItemsArr.map((item, index) => (
                    <ListItem
                        selected={currentPath == item.path}
                        component={Link}
                        to={item.path}
                        key={item.itemName}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.itemName} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {secondItemsArr.map((item, index) => (
                    <ListItem key={item.itemName} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.itemName} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    // deleted packages
    // "@mantine/carousel": "^7.9.0",
    // "@mantine/charts": "^7.9.0",
    // "@mantine/core": "^7.9.0",
    // "@mantine/dates": "^7.9.0",
    // "@mantine/form": "^7.9.0",
    // "@mantine/hooks": "^7.9.0",
    // "@mantine/modals": "^7.9.0",
    // "@mantine/notifications": "^7.9.0",
    // "@mantine/nprogress": "^7.9.0",
    // "@mantine/spotlight": "^7.9.0",
    return (
        <div>
            <ThemeProvider theme={theme}>
                <div className="nav-link" onClick={toggleDrawer(true)}><img className='navPFP' src={props.userPFP || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&usqp=CAU"} alt="pfp" /></div>
                <SwipeableDrawer disableSwipeToOpen={false} anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}>
                    {DrawerList}

                </SwipeableDrawer >
            </ThemeProvider>
        </div>
    )
}
