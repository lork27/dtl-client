import { Subject, SubjectOutlined } from '@mui/icons-material'
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
import { useSubjects } from '../hooks/use-fetch-subjects'
import { useAllTutors } from './../hooks/use-fetch-tutors'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

//This page will be the user landingpage it needs to looks something like this...
//https://cdn.discordapp.com/attachments/943515943760457738/943526139106820166/IMG_20220216_111546.jpg
export const LandingPage = () => {
    const { userData } = useAuth()
    const tutors = useAllTutors()
    const subjectsList = useSubjects()
    const subjectsObj = subjectsList.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
    }, {})
    const [shownSubject, setShownSubject] = React.useState(null)

    // console.log(subjectsList)
    // console.log(subjectsObj)
    return (
        <div>
            {userData.tutorInfo ? (
                <p> You are a Tutor </p>
            ) : (
                <p>You are not a Tutor</p>
            )}
            <Grid container>
                <Grid item xs={2}>
                    <List>
                        <ListItemButton onClick={() => setShownSubject(null)}>
                            <ListItemText>Show all</ListItemText>
                        </ListItemButton>
                        {subjectsList.map((subject) => {
                            return (
                                <ListItem disablePadding key={subject.id}>
                                    <ListItemButton
                                        onClick={() => {
                                            setShownSubject(subject.id)
                                        }}
                                    >
                                        <ListItemText
                                            primary={subject.subjectName}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>

                <Grid item xs={10}>
                    {/* End hero unit */}
                    <Grid container spacing={2}>
                        {tutors
                            .filter((tutor) => {
                                if (!shownSubject) {
                                    return true
                                }
                                return (
                                    tutor.tutorInfo?.subjects?.[0] ==
                                    shownSubject
                                )
                            })
                            .map((tutor) => {
                                return (
                                    <Grid
                                        item
                                        key={tutor.id}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                    >
                                        <Card
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={
                                                    subjectsObj[
                                                        tutor.tutorInfo.subjects
                                                    ]?.img
                                                }
                                                alt="subject-img"
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Grid container>
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        sx={{ marginRight: 8 }}
                                                        src={tutor.avatar}
                                                    />
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="h2"
                                                    >
                                                        {tutor.username}
                                                    </Typography>
                                                </Grid>
                                                <Typography mt={3}>
                                                    {tutor.bio
                                                        ? tutor.bio
                                                        : `Hey my name is ${
                                                              tutor.username
                                                          } and I teach ${
                                                              subjectsObj[
                                                                  tutor
                                                                      .tutorInfo
                                                                      .subjects
                                                              ]?.subjectName
                                                          }`}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    mt={5}
                                                >
                                                    {tutor.location
                                                        ? tutor.location
                                                        : 'no location provided'}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    component={RouterDomLink}
                                                    to={`${tutor.id}/profile`}
                                                >
                                                    View more
                                                </Button>
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        alert(
                                                            'Not yet implemented'
                                                        )
                                                    }
                                                >
                                                    Request match
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
