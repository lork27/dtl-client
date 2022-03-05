import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Alert } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link as RouterDomLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/Auth'

const theme = createTheme()

export function RegisterPage() {
    const navigate = useNavigate()
    const { registerUser, error } = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            username: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
            confirmationPassword: data.get('confirmPassword'),
        })
        registerUser({
            username: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
            confirmationPassword: data.get('confirmPassword'),
            onSuccess: () => {
                navigate('/')
            },
        })
        console.log(error)
        // register(
        //   data.get("username"),
        //   data.get("email"),
        //   data.get("password"),
        //   data.get("confirmPassword"),
        //   () => {
        //     navigate("/");
        //   }
        // );
    }
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Student Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userName"
                                required
                                fullWidth
                                id="userName"
                                label="user Name"
                                autoFocus
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="Confirm Password"
                            />
                        </Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up as Student
                    </Button>

                    <Grid container justifyContent="center">
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Link
                                component={RouterDomLink}
                                to="/auth/register-tutor"
                                variant="body2"
                            >
                                You want to be a Tutor?
                            </Link>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Link
                                component={RouterDomLink}
                                to="/auth/login"
                                variant="body2"
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
    )
}
