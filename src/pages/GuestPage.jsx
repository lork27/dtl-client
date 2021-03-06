import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { grid } from '@mui/system'
import * as React from 'react'
import { Link as RouterDomLink } from 'react-router-dom'
import logo from '../assets/DTL_Logo.png'
import wordcloud from '../assets/wordcloud.png'
import { useAuth } from '../auth/Auth'
import { TutorCard } from '../components/TutorCard'
import { CustomPaperCard } from '../components/CustomPaperCard'

const tutorsInfo = [
    {
        username: 'Louis Allen',
        bio: "Have you tried learning programming by yourself and failed? So did I! With me your'll learn how to learn!",
        id: 1,
        subjectName: 'Programming',
        subjectImage: 'https://pbs.twimg.com/media/FJEQjL-XIAIqJSd.jpg',
        location: 'Bayamon, Puerto Rico',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/jurica-koletic-7YVZYZeITc8-unsplash.jpg?alt=media&token=a85cd85a-4644-4e72-bf41-383d98a069aa',
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
        avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/girl2.jpg?alt=media&token=186e6000-2ffa-4f59-aefc-b366152d5707',
        score: 5,
    },

    {
        username: 'Joseph Joestar',
        bio: "I'll teach you a new way of thinking, design thinking will help you develop the next billion dollar idea",
        id: 3,
        subjectName: 'Programming',
        location: 'New York City, USA',
        subjectImage:
            'https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/man4.jpg?alt=media&token=129f2b9b-911a-4ba5-980a-c309fa315106',
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
            {/* middle container that explains the app in three steps */}
            <Typography
                variant="h4"
                style={{ textAlign: 'center' }}
                color="text.secondary"
            >
                How it works?
            </Typography>
            <Grid container justifyContent={'center'}>
                <CustomPaperCard
                    customColor="741a31"
                    headText="Connect"
                    bodyText="Find someone with a shared interest"
                />

                <CustomPaperCard
                    customColor="1f1f1f"
                    headText="Teach"
                    bodyText="Become someone's Tutor and teach your interest"
                />
                <CustomPaperCard
                    customColor="102841"
                    headText="Learn"
                    bodyText="Or be someone's Student and learn a new interest!"
                />
            </Grid>

            {/* container with example tutors */}
            <Container sx={{ py: 8 }}>
                <Typography
                    variant="h6"
                    style={{ textAlign: 'center' }}
                    color="text.secondary"
                >
                    Some of the cool tutors you'll be able to meet at DTL
                </Typography>
                <Grid container spacing={3} alignItems="stretch" mt={1}>
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
            <Grid container justifyContent={'center'}>
                <Grid item padding={4} width="100%">
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        textAlign={'center'}
                    >
                        The subjects we have right now @DTL
                    </Typography>
                </Grid>
                <Grid item>
                    <img src={wordcloud} style={{ height: '400px' }} />
                </Grid>

                <Grid item padding={4} width="100%">
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        textAlign={'center'}
                    >
                        More are coming soon based on user feedback!
                    </Typography>
                </Grid>
            </Grid>
        </main>
    )
}
