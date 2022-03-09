import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { useAuth } from '../auth/Auth'
import { TutorCard } from '../components/TutorCard'
import { useSubjects } from '../hooks/use-fetch-subjects'
import { useAllTutors } from './../hooks/use-fetch-tutors'

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
                <Grid item xs={3} sm={3} md={2} ld={1}>
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

                <Grid item xs={8} sm={9} md={10} ld={11} padding={1}>
                    {/* End hero unit */}
                    <Grid container spacing={3} alignItems="stretch">
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
                                        xl={3}
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
                                            subjectName={
                                                subjectsObj[
                                                    tutor.tutorInfo.subjects
                                                ]?.subjectName
                                            }
                                            userId={userData.id}
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
