import React, { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Settings from '@mui/icons-material/Settings';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import '../MyCss/Navbar.css'
import { UseFirebaseAuth } from './UseFirebaseAuth';
import { MyContext } from './ContextProvider';

export default function NavDesktop(props) {

    const { userObj, setUserObj } = useContext(MyContext);
    const location = useLocation();

    // Access the current path from the location object
    const currentPath = location.pathname;
    // const pages = ['Products', 'Pricing', 'Blog'];
    const pages = [
        { page: 'home', path: '/' },
        { page: 'Profile', path: '/SignIn' },
        { page: 'Your Chats', path: '/contacts' },
        { page: 'Species identifier', path: '/speciesidentifier' },
        { page: 'Your Appointments', path: '/userAppointments' }
    ]
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const theme = createTheme({
        palette: {
            mode: 'dark'
        },
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { signOutUser } = UseFirebaseAuth();
    let navigate = useNavigate()
    const signOut = () => {
        setAnchorElUser(null);
        signOutUser()
        navigate('/signin')
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Box
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        >
                            <img className='navLogo' src="/logoaltt.png" alt="" />
                        </Box>
                        <Typography
                            variant="h6"
                            component={Link}
                            noWrap
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            VetRo
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        component={NavLink}
                                        to={page.path} key={page.page} onClick={handleCloseNavMenu}>
                                        <Typography
                                            textAlign="center">{page.page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        <Box
                            sx={{ display: { xs: 'flex', md: 'none' }, my: 2, mr: 1 }}
                        >
                            <img className='navLogo' src="/logoaltt.png" alt="" />
                        </Box>
                        <Typography
                            variant="h5"
                            component={Link}
                            noWrap
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            VetRo
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    variant={currentPath == page.path ? 'outlined' : ''}
                                    color='inherit'
                                    component={NavLink}
                                    to={page.path}
                                    key={page.page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={props.userName} src={props.userPFP || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&usqp=CAU"} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* menu items */}
                                {userObj ? (
                                    <div>
                                        <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', textDecoration: 'none' }} component={Link} to={'/SignIn'}>
                                            <Typography variant='overline'>Profile</Typography>
                                        </MenuItem>
                                        {/* <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', textDecoration: 'none' }} component={Link} to={'/'}>
                                            <Typography variant='overline' >Contact us</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', textDecoration: 'none' }} component={Link} to={'/'}>
                                            <Typography variant='overline'>About us</Typography>
                                        </MenuItem> */}
                                        {/* <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', textDecoration: 'none' }} component={Link} to={'/'}>
                                            <Typography variant='overline'>Settings</Typography>
                                        </MenuItem> */}
                                        <MenuItem onClick={signOut}>
                                            <Typography variant='overline' sx={{ color: 'inherit', textDecoration: 'none' }} >Log out</Typography>
                                        </MenuItem>
                                    </div>
                                ) : (
                                    <div>
                                        {/* <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', textDecoration: 'none' }} component={Link} to={'/'}>
                                            <Typography variant='overline' >Contact us</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', textDecoration: 'none' }} component={Link} to={'/'}>
                                            <Typography variant='overline'>About us</Typography>
                                        </MenuItem> */}
                                        <MenuItem onClick={handleCloseUserMenu} sx={{ color: 'inherit', textDecoration: 'none' }} component={Link} to={'/'}>
                                            <Typography variant='overline'>Settings</Typography>
                                        </MenuItem>
                                        <MenuItem component={Link} to={'/login'}>
                                            <Typography variant='overline' sx={{ color: 'inherit', textDecoration: 'none' }} >Login</Typography>
                                        </MenuItem>
                                    </div>
                                )
                                }


                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}
