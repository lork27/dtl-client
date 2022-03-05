import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link as RouterDomLink } from 'react-router-dom'
import { useAuth } from '../auth/Auth'

// import { useSubjects } from '../hooks/use-fetch-subjects'
//This is the page that will show when no user is logged in
//It will look kinda like this...
//https://cdn.discordapp.com/attachments/943515943760457738/943520909011091496/IMG_20220216_105449.jpg

// const tutors = {
//     'luis.IG6NY2XVIuUbUGJxAXFSXQrNArF2': {
//         updatedAt: {
//             _seconds: 1646078062,
//             _nanoseconds: 461000000,
//         },
//         bio: null,
//         createdAt: {
//             _seconds: 1646076490,
//             _nanoseconds: 400000000,
//         },
//         username: 'luis',
//         tutorInfo: {
//             urls: [
//                 'https://github.com/luisobregon21',
//                 'https://www.linkedin.com/in/luis-o-45951b126/',
//             ],
//         },
//         location: null,
//         id: 'IG6NY2XVIuUbUGJxAXFSXQrNArF2',
//         avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/10065674723.JPG?alt=media',
//         email: 'tutor@gmail.com',
//     },
//     "shey.cNl3bMEpXMTcCvBbxaey4UfdtS73": {
//         "updatedAt": {
//             "_seconds": 1646091885,
//             "_nanoseconds": 257000000
//         },
//         "createdAt": {
//             "_seconds": 1646091885,
//             "_nanoseconds": 257000000
//         },
//         "username": "shey",
//         "email": "email@prueba.com",
//         "location": null,
//         "id": "cNl3bMEpXMTcCvBbxaey4UfdtS73",
//         "avatar": "https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/no-profile.png?alt=media",
//         "tutorInfo": {
//             "subjects": [
//                 "4"
//             ],
//             "urls": [],
//             "imgs": [
//                 "https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/no-picture.jpg?alt=media"
//             ]
//         },
//         "bio": null
//     }
// }

const tutorsInfo = [
    {
        username: 'Paco Alcantara',
        bio: "Hi, I'm a software engineer with over 10 years of experience...",
        id: 1,
        interestID: [2],
        location: 'Bayamon, Puerto Rico',
        avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    },
    {
        username: 'Roberto Mauricio',
        bio: "I've teached Guitar to over a 100 people, I've played on 3 bands etc etc",
        id: 2,
        interestID: [1],
        location: 'San Juan, Puerto Rico',
        avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    },

    {
        username: 'Manolo Del Mar',
        bio: 'Soy maestro de arte graduado del Instituto de Arte de Chicago, he tenido más de 12...',
        id: 3,
        interestID: [3],
        location: 'San Juan, Puerto Rico',
        avatar: 'https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg',
    },
]

export const GuestPage = () => {
    // when drop down implemented, uncomment this
    // const subjects = useSubjects()
    const { userData } = useAuth()
    return (
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
                                        <Button size="small">View more</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </main>
    )
}
