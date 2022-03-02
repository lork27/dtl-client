import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useSubjects } from '../hooks/use-fetch-subjects'
import { useAuth } from '../auth/Auth'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

export const StudentProfile = () => {
    const { userData } = useAuth()
    const theme = useTheme()
    const subjectsList = useSubjects()
    const subjectsObj = subjectsList.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
    }, {})

    const matches = [
        {
            tutorId: 2727,
            username: 'Pedro',
            avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/no-profile.png?alt=media',
            subjectId: 4,
        },
        {
            tutorId: 2020,
            username: 'manolo',
            avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/no-profile.png?alt=media',
            subjectId: 5,
        },
        {
            tutorId: 2334,
            username: 'Juanita',
            avatar: 'https://firebasestorage.googleapis.com/v0/b/dtl-mvp.appspot.com/o/no-profile.png?alt=media',
            subjectId: 2,
        },
    ]
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={userData.avatar}
                        alt="useravatar"
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Name: {userData.username}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                Email: {userData.email}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                Description:{' '}
                                {userData.bio
                                    ? userData.bio
                                    : `Placeholder bio, you should update it! Lorem ipsum sit amet this is a longer description test to check out how it looks like with more text`}
                                <Button variant="text">edit</Button>
                            </Typography>
                        </CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                pl: 1,
                                pb: 1,
                            }}
                        ></Box>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Grid container>
                    <Typography variant="h4">Latest matches</Typography>
                    {matches.map((match) => {
                        return (
                            <Card key={match.tutorId} sx={{ display: 'flex' }}>
                                <Avatar
                                    image={match.avatar}
                                    alt="match-avatar"
                                />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography
                                            component="div"
                                            variant="h6"
                                            color="text.secondary"
                                        >
                                            {match.username}
                                        </Typography>

                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                            component="div"
                                        >
                                            Subject:{' '}
                                            {
                                                subjectsObj[match.subjectId]
                                                    ?.subjectName
                                            }
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}
