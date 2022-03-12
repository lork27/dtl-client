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
import EditIcon from '@mui/icons-material/Edit'

import { Link as RouterDomLink } from 'react-router-dom'
import { StyledRating } from '../components/StyledRating'

export const StudentProfile = () => {
    const { userData, updateUserInfo, error, uploadImage, reviewTutor } =
        useAuth()
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

    const handleSubmit = (event) => {
        //TODO I need to make it so the user can actually DELETE their bio, not just update it
        //right now if the user send and empty bio the old one get written
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const bio = data.get('bio').length > 0 ? data.get('bio') : userData.bio
        const location =
            data.get('location').length > 0
                ? data.get('location')
                : userData.location
        updateUserInfo({
            bio,
            location,
        })
        if (!bioEdit) {
            setBioEdit(true)
        }
    }
    // console.log(bioEdit)
    return (
        <Grid
            container
            sx={{
                mt: 2,
                mx: 8,
                display: 'flex',
                // flexDirection: 'column',
            }}
        >
            {/* {console.log('inside return of profile')}
            {console.log(userData.token)} */}
            <Grid mr={3}>
                <Card>
                    <Grid>
                        <CardContent sx={{ width: 300 }}>
                            <Avatar
                                alt="dtl-user-avatar"
                                src={userData.avatar}
                                sx={{ width: 250, height: 250 }}
                            />
                            <IconButton
                                onClick={() => {
                                    document
                                        .getElementById('imageInput')
                                        .click()
                                }}
                                className="button"
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                            <input
                                type="file"
                                multiple
                                id="imageInput"
                                accept="image/*"
                                hidden="hidden"
                                onChange={(e) => {
                                    uploadImage(e.target.files[0])
                                }}
                            />
                            <Typography component="div" variant="h5">
                                Name: {userData.username}
                            </Typography>
                            <StyledRating
                                name="read-only"
                                value={userData.score ? userData.score : null}
                                readOnly
                            />

                            {bioEdit ? (
                                <>
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
                                            : `Placeholder bio, you should update it!`}
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
                                            label={
                                                userData.bio
                                                    ? userData.bio
                                                    : 'Enter your new bio'
                                            }
                                            multiline
                                            name="bio"
                                            rows={4}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label={
                                                userData.location
                                                    ? userData.location
                                                    : 'Enter your location'
                                            }
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
                    </Grid>
                </Card>
            </Grid>
            <Grid item sx={{ width: '280px', marginLeft: 4 }}>
                <Typography variant="h6">Your tutors</Typography>
                {userData.matches.length === 0
                    ? 'You have no tutors'
                    : userData.matches.map((match, index) => {
                          return (
                              <Card key={index} sx={{ display: 'flex', mb: 1 }}>
                                  <Avatar
                                      src={match?.avatar}
                                      alt="match-avatar"
                                      variant="square"
                                      component={RouterDomLink}
                                      to={`/${match.tutorId}/profile`}
                                      sx={{ width: 100, height: 100 }}
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

                                          {match.scoreGiven ? (
                                              <StyledRating
                                                  name="match-reviewed"
                                                  value={match.scoreGiven}
                                                  disabled
                                              />
                                          ) : (
                                              <StyledRating
                                                  name="rate-match"
                                                  id="rate-match"
                                                  value={match.scoreGiven}
                                                  onChange={(event) => {
                                                      //   console.log(
                                                      //       event.target
                                                      //           .value
                                                      //   )
                                                      reviewTutor({
                                                          tutorId:
                                                              match.tutorId,
                                                          review: parseInt(
                                                              event.target.value
                                                          ),
                                                          index,
                                                      })
                                                  }}
                                              />
                                          )}
                                      </CardContent>
                                  </Box>
                              </Card>
                          )
                      })}
            </Grid>

            {/* {error && <Alert severity="error">{error}</Alert>} */}
        </Grid>
    )
}
