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
import { Link, useNavigate } from 'react-router-dom'
import SvgIcon from '@mui/material/SvgIcon'
import logo from '../assets/DTL_Logo.png'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    )
}

export const Header = () => {
    const navigate = useNavigate()
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
                        {userData ? (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="chat link"
                                    color="inherit"
                                    onClick={() => {
                                        console.log('chat icon clicked')
                                        document
                                            .getElementById('linkchat')
                                            .click()
                                    }}
                                >
                                    <ChatIcon color="alert"></ChatIcon>

                                    <Link
                                        to="/connections/chat"
                                        id="linkchat"
                                    ></Link>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    sx={{ marginRight: 2 }}
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

                                    <MenuItem
                                        onClick={() => {
                                            logOut({
                                                onSuccess: () => {
                                                    navigate('/')
                                                },
                                            })
                                        }}
                                    >
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
