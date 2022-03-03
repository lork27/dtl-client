import { useState } from 'react'
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
import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const StudentProfile = () => {
    const { userData, updateUserInfo, error } = useAuth()
    const [value, setValue] = useState('Controlled')
    const theme = useTheme()
    const subjectsList = useSubjects()
    const subjectsObj = subjectsList.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
    }, {})

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const [bioEdit, setBioEdit] = useState(true)
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

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const token = userData.token

        console.log({
            bio: data.get('bio'),
            location: data.get('location'),
            token: token,
        })
        if (!bioEdit) {
            setBioEdit(true)
        }
    }
    // console.log(bioEdit)
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6}>
                <Card sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 300 }}
                        image={userData.avatar}
                        alt="useravatar"
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            {bioEdit ? (
                                <>
                                    <Typography component="div" variant="h5">
                                        Name: {userData.username}
                                    </Typography>

                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        component="div"
                                        mt={2}
                                    >
                                        Email: {userData.email}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        component="div"
                                        mt={2}
                                    >
                                        Description:{' '}
                                        {userData.bio
                                            ? userData.bio
                                            : `Placeholder bio, you should update it! Lorem ipsum sit amet this is a longer description test to check out how it looks like with more text`}
                                    </Typography>
                                    <Typography color="text.secondary" mt={2}>
                                        Location: {userData.location}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': {
                                                m: 1,
                                                width: '25ch',
                                            },
                                        }}
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Enter your new bio"
                                            multiline
                                            name="bio"
                                            rows={4}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Enter your location"
                                            variant="outlined"
                                            name="location"
                                        />

                                        <Button variant="text" type="submit">
                                            send
                                        </Button>
                                    </Box>
                                </>
                            )}

                            <Button
                                variant="text"
                                type="submit"
                                onClick={() => {
                                    setBioEdit(!bioEdit)
                                }}
                            >
                                {bioEdit ? 'edit my info' : ''}
                            </Button>
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
