import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useUser } from '../context/AuthContext';
import CommentIcon from '@mui/icons-material/Comment';
import { Button, Menu, MenuItem, Theme, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';


export default function Header() {
    const { user } = useUser();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const logout = async () => {
        await Auth.signOut();
        //router.push('/');
        setAnchorEl(null);      // ?
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={() => router.push('/')}
                        sx={{ mr: 2 }}
                    >
                        <CommentIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Darkdit
                    </Typography>
                    {user && (
                        <div>
                            {/* <IconButton color="inherit">
                                <AddIcon />
                            </IconButton> */}
                            <Button variant="outlined" onClick={() => router.push('/createPost')}>create post</Button>
                            <IconButton
                                size="large"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => logout()}>log out</MenuItem>
                            </Menu>

                        </div>
                    )}
                    {!user && (
                        <>
                            <Button variant="outlined" onClick={() => router.push('/signin')}>login</Button>
                            <Button variant="outlined" onClick={() => router.push('/SignUp')}>sign up</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}