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
import { StyledRating } from '../components/StyledRating'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

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
        deletePortfolioImage,
        reviewStudent,
        reviewTutor,
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
    const [userScore, setUserScore] = useState(null)
    // const [bioEdit, setBioEdit] = useState(true)
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
    // console.log(userData.tutorInfo.accepted)
    return (
        <Container>
            <Grid container width={'100%'} m={4}>
                {/* this grid contains tutor card */}
                <Grid
                    item
                    sx={{
                        width: '350px',
                    }}
                >
                    <Card>
                        <CardContent>
                            <Avatar
                                alt="dtl-user-avatar"
                                src={userData.avatar}
                                sx={{ width: 200, height: 200, marginLeft: 6 }}
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
                    </Card>
                </Grid>
                {/* Grid with both, students and requests */}
                <Grid item ml={5}>
                    {/* grid with accepted students */}
                    <Grid item sx={{ width: '280px' }}>
                        <Typography variant="h6">Accepted Students</Typography>
                        {userData.tutorInfo?.accepted.length === 0
                            ? 'You have no students'
                            : userData.tutorInfo?.accepted.map(
                                  (student, index) => {
                                      //   console.log(index)
                                      return (
                                          <Card
                                              key={index}
                                              sx={{ display: 'flex', mb: 1 }}
                                          >
                                              <Avatar
                                                  src={student?.avatar}
                                                  alt="match-avatar"
                                                  variant="square"
                                                  component={RouterDomLink}
                                                  to={`/${student.userId}/profile`}
                                                  sx={{
                                                      width: 100,
                                                      height: 100,
                                                  }}
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
                                                      {student.scoreGiven ? (
                                                          <StyledRating
                                                              name="studen-reviewed"
                                                              value={
                                                                  student.scoreGiven
                                                              }
                                                              disabled
                                                          />
                                                      ) : (
                                                          <StyledRating
                                                              name="rate-student"
                                                              id="rate-student"
                                                              value={
                                                                  student.scoreGiven
                                                              }
                                                              onChange={(
                                                                  event
                                                              ) => {
                                                                  //   console.log(
                                                                  //       event.target
                                                                  //           .value
                                                                  //   )
                                                                  reviewStudent(
                                                                      {
                                                                          studentId:
                                                                              student.userId,
                                                                          review: parseInt(
                                                                              event
                                                                                  .target
                                                                                  .value
                                                                          ),
                                                                          index,
                                                                      }
                                                                  )
                                                              }}
                                                          />
                                                      )}
                                                  </CardContent>
                                              </Box>
                                          </Card>
                                      )
                                  }
                              )}
                    </Grid>

                    {/* grid with requests */}
                    <Grid item sx={{ width: '280px' }}>
                        <Typography variant="h6">Requests</Typography>
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
                </Grid>
                {/* grid with your tutors */}
                <Grid item sx={{ width: '280px', marginLeft: 4 }}>
                    <Typography variant="h6">Your tutors</Typography>
                    {userData.matches.length === 0
                        ? 'You have no tutors'
                        : userData.matches.map((match, index) => {
                              return (
                                  <Card
                                      key={index}
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
                                                                  event.target
                                                                      .value
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
                {/* this grid contains tutor images */}
                <Grid item p={5}>
                    <Typography>
                        You portfolio pictures - add more
                        <IconButton
                            onClick={() => {
                                document
                                    .getElementById('portfolioImage')
                                    .click()
                            }}
                            className="button"
                        >
                            <EditIcon color="primary" />
                        </IconButton>
                    </Typography>

                    <Grid id="gallery">
                        {userData.tutorInfo?.imgs?.length > 0 ? (
                            <Grid container>
                                {userData?.tutorInfo?.imgs.map((img, i) => {
                                    return (
                                        <Grid
                                            item
                                            key={i}
                                            xs={
                                                userData.tutorInfo?.imgs
                                                    .length > 1
                                                    ? 12
                                                    : 12
                                            }
                                            md={
                                                userData.tutorInfo?.imgs
                                                    .length > 1
                                                    ? 6
                                                    : 12
                                            }
                                            ld={
                                                userData.tutorInfo?.imgs
                                                    .length > 1
                                                    ? 4
                                                    : 12
                                            }
                                            position="relative"
                                        >
                                            <img
                                                key={i}
                                                src={img}
                                                style={{ width: '100%' }}
                                                display="block"
                                                // style={
                                                //     userData.tutorInfo?.imgs
                                                //         .length !== 1
                                                //         ? {
                                                //               height: '115px',
                                                //           }
                                                //         : { width: '100%' }
                                                // }
                                                // style={
                                                //     userData.tutorInfo?.imgs > 1
                                                //         ? { width: '100%' }
                                                //         : { width: '100%' }
                                                // }
                                            />

                                            <IconButton
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                }}
                                                onClick={() => {
                                                    deletePortfolioImage(
                                                        String(img)
                                                    )
                                                }}
                                                className="button"
                                            >
                                                <RemoveCircleOutlineIcon
                                                    fontSize="large"
                                                    color="primary"
                                                />
                                            </IconButton>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        ) : (
                            <p>This user has no portfolio images</p>
                        )}
                    </Grid>

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
            </Grid>
        </Container>
    )
}
