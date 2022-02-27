import FormControl from '@mui/material/FormControl'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Alert } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link as RouterDomLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/Auth'
import { useSubjects } from '../hooks/use-fetch-subjects'

//TODO, populate this with Luis's endpoint for subjects
const subjects = [
    { id: 1, subjectName: 'Salsa', img: null },
    { id: 2, subjectName: 'Crochet', img: null },
    { id: 3, subjectName: 'Programming', img: null },
    { id: 4, subjectName: 'Placeholder', img: null },
    { id: 5, subjectName: 'otro interes', img: null },
    { id: 6, subjectName: 'windows11', img: null },
    { id: 7, subjectName: 'lmao', img: null },
    { id: 8, subjectName: 'XD', img: null },
]

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

export function RegisterTutor() {
    const navigate = useNavigate()
    const { registerUser, error } = useAuth()
    const subjects = useSubjects()

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            username: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
            confirmationPassword: data.get('confirmPassword'),
            subjectId: data.get('subject-selector'),
        })
        //TODO: change this to call register tutor endpoint with the
        //Tutor's interest and all of that
        // registerUser({
        //     username: data.get('userName'),
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     confirmationPassword: data.get('confirmPassword'),
        //     subjectId: data.get('subject-selector'),
        //     onSuccess: () => {
        //         navigate('/')
        //     },
        // })
        // console.log(error)
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                        Tutor Sign up
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
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="subject-selector">
                                        Subjects
                                    </InputLabel>
                                    <Select
                                        sx={{ width: '100%' }}
                                        name="subject-selector"
                                        labelId="subject-selector-label"
                                        id="subject-selector"
                                        label="subject-selector"
                                        defaultValue=""
                                    >
                                        {subjects.map((subject) => {
                                            return (
                                                <MenuItem
                                                    key={subject.id}
                                                    value={subject.id}
                                                >
                                                    {subject.subjectName}
                                                </MenuItem>
                                            )
                                        })}
                                        {/* <MenuItem value={10}>Ten</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up as Tutor
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Link
                                    component={RouterDomLink}
                                    to="/register"
                                    variant="body2"
                                >
                                    You want to be a Student?
                                </Link>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Link
                                    component={RouterDomLink}
                                    to="/login"
                                    variant="body2"
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}
