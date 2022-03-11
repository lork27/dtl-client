import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useAuth } from '../auth/Auth'
import { Link } from 'react-router-dom'
import SvgIcon from '@mui/material/SvgIcon'
import logo from '../assets/DTL_Logo.png'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    )
}

export const Header = () => {
    const { userData, logOut } = useAuth()
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: userData?.tutorInfo ? '#741A31' : '#102841',
            }}
            elevation={0}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'flex' } }}
                    >
                        <IconButton component={Link} to="/">
                            <img src={logo} style={{ width: '50px' }} />
                        </IconButton>
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex' },
                        }}
                    ></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {/* This is for notifications*/}
                        {userData ? (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    onClick={() => {
                                        document
                                            .getElementById('linkprofile')
                                            .click()
                                    }}
                                >
                                    <Badge
                                        badgeContent={
                                            userData.tutorInfo
                                                ? userData.tutorInfo?.requests
                                                      .length
                                                : 0
                                        }
                                        color="success"
                                    >
                                        <Link
                                            to="/user/profile"
                                            id="linkprofile"
                                        ></Link>
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                {/* This is for Messages*/}
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    // for now it takes back to the landing page, but it will take you to message page
                                    component={Link}
                                    to="/user/messages"
                                >
                                    {/* // onClick={() => {
                                    //     document
                                    //         .getElementById('linkprofile')
                                    //         .click()
                                    // }}
                                // > */}
                                    <Badge
                                        // messages will be here
                                        badgeContent={
                                            userData.tutorInfo
                                                ? userData.tutorInfo?.requests
                                                      .length
                                                : 0
                                        }
                                        color="success"
                                    >
                                        <Link
                                            to="/user/profile"
                                            id="linkmessages"
                                        ></Link>
                                        <ChatBubbleIcon />
                                    </Badge>
                                </IconButton>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="User Avatar"
                                            src={userData.avatar}
                                        />
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
                                    <MenuItem
                                        component={Link}
                                        to="user/profile"
                                    >
                                        <Typography textAlign="center">
                                            Profile
                                        </Typography>
                                    </MenuItem>

                                    <MenuItem onClick={logOut}>
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link to="/auth/login">
                                <Button variant="contained">Login</Button>
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
