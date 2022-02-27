import { useAuth } from '../auth/Auth'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link as RouterDomLink } from 'react-router-dom'
import { DropDown } from '../components/DropDown'
import Avatar from '@mui/material/Avatar'

import { useSubjects } from '../hooks/use-fetch-subjects'
//This is the page that will show when no user is logged in
//It will look kinda like this...
//https://cdn.discordapp.com/attachments/943515943760457738/943520909011091496/IMG_20220216_105449.jpg

const tutorsCards = [1, 2, 3]

const tutorsInfo = [
    {
        username: 'Paco Alcantara',
        bio: "Hi, I'm a software engineer with over 10 years of experience...",
        interestID: [2],
        avatar: null,
        location: 'Bayamon, Puerto Rico',
        avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    },
    {
        username: 'Roberto Mauricio',
        bio: "I've teached Guitar to over a 100 people, I've played on 3 bands etc etc",
        interestID: [1],
        avatar: null,
        location: 'San Juan, Puerto Rico',
        avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    },

    {
        username: 'Manolo Del Mar',
        bio: 'Soy maestro de arte graduado del Instituto de Arte de Chicago, he tenido más de 12...',
        interestID: [3],
        avatar: null,
        location: 'San Juan, Puerto Rico',
        avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    },
]

const theme = createTheme()
export const GuestPage = () => {
    const subjects = useSubjects()
    const { userData } = useAuth()
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            DTL?
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            The social network that connects people that want to
                            teach and learn
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Link component={RouterDomLink} to="/register">
                                <Button variant="contained">
                                    Become a Student
                                </Button>
                            </Link>
                            <Link
                                component={RouterDomLink}
                                to="/register-tutor"
                            >
                                <Button variant="contained">
                                    Become a Tutor
                                </Button>
                            </Link>
                        </Stack>
                    </Container>
                    {/* TODO Center this DropDown with the subjects */}
                    {/* <Grid item xs={10} sm={5} md={5} elevation={1}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <DropDown
                                label="Subjects"
                                id="subject"
                                items={subjects.map((subject) => {
                                    return {
                                        ...subject,
                                        name: subject.subjectName,
                                    }
                                })}
                            />
                        </Box>
                    </Grid> */}
                </Box>

                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={2}>
                        {tutorsInfo.map((tutor) => {
                            return (
                                <Grid item key={tutor.id} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image="https://source.unsplash.com/random"
                                            alt="random"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={tutor.avatar}
                                            />
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                            >
                                                {tutor.username}
                                            </Typography>
                                            <Typography>{tutor.bio}</Typography>
                                            <Typography
                                                color="text.secondary"
                                                mt={2}
                                            >
                                                {tutor.location}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">
                                                View more
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    )
}
