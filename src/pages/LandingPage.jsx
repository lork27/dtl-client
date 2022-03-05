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
import { TutorCard } from '../components/TutorCard'

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
            <Grid container>
                <Grid item xs={2}>
                    <List>
                        <ListItemButton onClick={() => setShownSubject(null)}>
                            <ListItemText>Show all</ListItemText>
                        </ListItemButton>
                        {subjectsList.map((subject) => {
                            return (
                                <ListItem
                                    disablePadding
                                    key={subject.id}
                                    selected={subject.id === shownSubject}
                                >
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

                <Grid item xs={10} padding={2}>
                    {/* End hero unit */}
                    <Grid container spacing={2} alignItems="stretch">
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
                                        <TutorCard
                                            avatar={tutor.avatar}
                                            name={tutor.username}
                                            location={tutor.location}
                                            subjectImage={
                                                subjectsObj[
                                                    tutor.tutorInfo.subjects
                                                ]?.img
                                            }
                                            bio={tutor.bio}
                                            id={tutor.id}
                                        />
                                    </Grid>
                                )
                            })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
