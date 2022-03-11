import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link as RouterDomLink } from 'react-router-dom'
import logo from '../assets/DTL_Logo.png'
import { useAuth } from '../auth/Auth'
import { TutorCard } from '../components/TutorCard'

const tutorsInfo = [
    {
        username: 'Louis Allen',
        bio: "Have you tried learning programming by yourself and failed? So did I! With me your'll learn how to learn!",
        id: 1,
        subjectName: 'Programming',
        subjectImage: 'https://pbs.twimg.com/media/FJEQjL-XIAIqJSd.jpg',
        location: 'Bayamon, Puerto Rico',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/137792353.jpg?alt=media',
        score: 4,
    },
    {
        username: 'Maria Aponte',
        bio: "I've always said that learning anything starts with the fundamentals and teaching the student how to take advantage of their time practicing...",
        id: 2,
        subjectName: 'Programming',
        subjectImage:
            'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        location: 'Arecibo, Puerto Rico',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/78010173127.jpg?alt=media',
        score: 5,
    },

    {
        username: 'Joseph Joestar',
        bio: "I'll teach you a new way of thinking, design thinking will help you develop the next billion dollar idea",
        id: 3,
        subjectName: 'Programming',
        location: 'New York City, United States',
        subjectImage:
            'https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/69993751660.jpg?alt=media',
        score: 3,
    },
]

export const GuestPage = () => {
    // when drop down implemented, uncomment this
    // const subjects = useSubjects()
    const { userData } = useAuth()
    return (
        <main>
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
                        variant="h1"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        <img src={logo} style={{ height: '100px' }} />
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

                    <Typography
                        variant="subtitle"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        Are you Down To Learn?
                    </Typography>

                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Link component={RouterDomLink} to="/auth/register">
                            <Button variant="contained">
                                Become a Student
                            </Button>
                        </Link>
                        <Link
                            component={RouterDomLink}
                            to="/auth/register-tutor"
                        >
                            <Button variant="contained">Become a Tutor</Button>
                        </Link>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ py: 8 }}>
                <Grid container spacing={3} alignItems="stretch">
                    {tutorsInfo.map((tutor) => {
                        return (
                            <Grid
                                item
                                key={tutor.id}
                                xs={12}
                                sm={6}
                                md={4}
                                xl={4}
                            >
                                <TutorCard
                                    avatar={tutor.avatar}
                                    name={tutor.username}
                                    location={tutor.location}
                                    subjectImage={tutor?.subjectImage}
                                    bio={tutor.bio}
                                    id={null}
                                    subjectName={tutor.subjectName}
                                    userId={null}
                                    score={tutor.score}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </main>
    )
}
