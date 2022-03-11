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
import CheckIcon from '@mui/icons-material/Check'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import { width } from '@mui/system'

export const TutorProfile = () => {
    const {
        userData,
        updateUserInfo,
        error,
        uploadImage,
        acceptMatchRequest,
        denyMatchRequest,
        updateTutorUrls,
        uploadPortfolioImage,
    } = useAuth()
    const [value, setValue] = useState('Controlled')
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
        const url1 =
            data.get('url1').length > 0
                ? data.get('url1')
                : userData.tutorInfo.urls[0]
        const url2 =
            data.get('url2').length > 0
                ? data.get('url2')
                : userData.tutorInfo.urls[1]
        updateUserInfo({
            bio,
            location,
        })
        updateTutorUrls({ urls: [url1, url2] })

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
                // display: 'flex',
                // flexDirection: 'column',
            }}
        >
            {/* this grid contains tutor card */}
            <Grid md={3} lg={3} xl={2}>
                <Card>
                    <Grid>
                        <CardContent sx={{ width: '100%' }}>
                            <Avatar
                                alt="dtl-user-avatar"
                                src={userData.avatar}
                                sx={{ width: 200, height: 200 }}
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
                                    uploadImage(
                                        e.target.files[0],
                                        userData.token
                                    )
                                }}
                            />
                            <Typography component="div" variant="h5">
                                Name: {userData.username}
                            </Typography>

                            <Typography
                                component="div"
                                variant="subtitle1"
                                color="text.secondary"
                                mt={2}
                            >
                                Skill:{' '}
                                {
                                    subjectsObj[userData.tutorInfo.subjects]
                                        ?.subjectName
                                }
                            </Typography>

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
                                        URL:{' '}
                                        {userData.tutorInfo.urls[0] ? (
                                            <Link
                                                href={
                                                    userData.tutorInfo.urls[0]
                                                }
                                            >
                                                {userData.tutorInfo.urls[0]}
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                    </Typography>

                                    <Typography color="text.secondary" mt={2}>
                                        URL:{' '}
                                        {userData.tutorInfo.urls[1] ? (
                                            <Link
                                                href={
                                                    userData.tutorInfo.urls[1]
                                                }
                                            >
                                                {userData.tutorInfo.urls[1]}
                                            </Link>
                                        ) : (
                                            ''
                                        )}
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
                                                userData.tutorInfo.urls[0]
                                                    ? userData.tutorInfo.urls[0]
                                                    : 'Portfolio URL'
                                            }
                                            variant="outlined"
                                            name="url1"
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            label={
                                                userData.tutorInfo.urls[1]
                                                    ? userData.tutorInfo.urls[1]
                                                    : 'Portfolio URL'
                                            }
                                            variant="outlined"
                                            name="url2"
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

            {/* this grid contains users pillars */}
            <Grid item xs={12} md={6} lg={6} xl={8} sx={{ marginLeft: 4 }}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography>Accepted Students</Typography>
                        {userData.tutorInfo?.accepted.length === 0
                            ? 'You have no students'
                            : userData.tutorInfo?.accepted.map((student) => {
                                  return (
                                      <Card
                                          key={student.userId}
                                          sx={{ display: 'flex', mb: 1 }}
                                      >
                                          <Avatar
                                              src={student?.avatar}
                                              alt="match-avatar"
                                              variant="square"
                                              component={RouterDomLink}
                                              to={`/${student.userId}/profile`}
                                              sx={{ width: 100, height: 100 }}
                                          />

                                          <Box
                                              sx={{
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                              }}
                                          >
                                              <CardContent
                                              //   sx={{ flex: '1 0 auto' }}
                                              >
                                                  <Typography
                                                      component="div"
                                                      variant="h6"
                                                      color="text.secondary"
                                                  >
                                                      {student.username}
                                                  </Typography>
                                              </CardContent>
                                          </Box>
                                      </Card>
                                  )
                              })}
                    </Grid>

                    <Grid item xs={3} ml={1}>
                        <Typography>Requests</Typography>
                        {userData.tutorInfo.requests.length === 0
                            ? 'No new requests to show'
                            : userData.tutorInfo.requests.map((request) => {
                                  return (
                                      <Card
                                          key={request.userId}
                                          sx={{ display: 'flex', mb: 1 }}
                                      >
                                          <Avatar
                                              src={request?.avatar}
                                              alt="match-avatar"
                                              variant="square"
                                              component={RouterDomLink}
                                              to={`/${request.userId}/profile`}
                                              sx={{ width: 100, height: 100 }}
                                          />

                                          <Box
                                              sx={{
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                              }}
                                          >
                                              <CardContent
                                                  sx={{ flex: '1 0 auto' }}
                                              >
                                                  <Typography
                                                      component="div"
                                                      variant="h6"
                                                      color="text.secondary"
                                                  >
                                                      {request.username}
                                                  </Typography>
                                                  <CheckIcon
                                                      onClick={() => {
                                                          acceptMatchRequest({
                                                              studentId:
                                                                  request.userId,
                                                          })
                                                      }}
                                                  ></CheckIcon>

                                                  <DoDisturbIcon
                                                      onClick={() => {
                                                          denyMatchRequest({
                                                              studentId:
                                                                  request.userId,
                                                          })
                                                      }}
                                                  ></DoDisturbIcon>
                                              </CardContent>
                                          </Box>
                                      </Card>
                                  )
                              })}
                    </Grid>

                    <Grid item xs={3} ml={1}>
                        <Typography>Your tutors</Typography>
                        {userData.matches.length === 0
                            ? 'You have no tutors'
                            : userData.matches.map((match) => {
                                  return (
                                      <Card
                                          key={match.userId}
                                          sx={{ display: 'flex', mb: 1 }}
                                      >
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
                                              <CardContent
                                                  sx={{ flex: '1 0 auto' }}
                                              >
                                                  <Typography
                                                      component="div"
                                                      variant="h6"
                                                      color="text.secondary"
                                                  >
                                                      {match.username}
                                                  </Typography>
                                              </CardContent>
                                          </Box>
                                      </Card>
                                  )
                              })}
                    </Grid>
                </Grid>
            </Grid>

            {/* this grid contains tutor images */}
            <Grid item xs={12} md={12} lg={4} mt={2}>
                <Grid id="gallery">
                    {userData.tutorInfo?.imgs?.length > 0 ? (
                        <Grid container>
                            {userData?.tutorInfo?.imgs.map((img, i) => {
                                return (
                                    <Grid
                                        item
                                        xs={
                                            userData.tutorInfo?.imgs.length > 1
                                                ? 4
                                                : 12
                                        }
                                    >
                                        <img
                                            key={i}
                                            src={img}
                                            style={
                                                userData.tutorInfo?.imgs
                                                    .length > 1
                                                    ? {
                                                          height: '115px',
                                                      }
                                                    : { width: '100%' }
                                            }
                                            // style={
                                            //     userData.tutorInfo?.imgs > 1
                                            //         ? { width: '100%' }
                                            //         : { width: '100%' }
                                            // }
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    ) : (
                        <p>This user has no portfolio images</p>
                    )}
                </Grid>

                <IconButton
                    onClick={() => {
                        document.getElementById('portfolioImage').click()
                    }}
                    className="button"
                >
                    <EditIcon color="primary" />
                </IconButton>

                <input
                    type="file"
                    multiple
                    id="portfolioImage"
                    accept="image/*"
                    hidden="hidden"
                    onChange={(e) => {
                        uploadPortfolioImage(e.target.files[0])
                    }}
                />
            </Grid>

            {/* {error && <Alert severity="error">{error}</Alert>} */}
        </Grid>
    )
}
