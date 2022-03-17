import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/Auth'
import { styled } from '@mui/material/styles'
import guillermoImg from '../assets/yo.jpeg'
import luisImg from '../assets/Luis.jpeg'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
// import { StyledRating } from './StyledRating'
import { Container, Grid } from '@mui/material'
export const AboutUs = () => {
    return (
        <Container>
            <Grid container width={'100%'} justifyContent={'center'} p={5}>
                <Typography variant="h3" style={{ textAlign: 'center' }}>
                    Meet the developers behind DTL
                </Typography>
            </Grid>
            <Grid container justifyContent={'center'}>
                <Grid item mt={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            maxWidth="50%"
                            image={luisImg}
                        />
                        <CardHeader title="Luis Obregon" />
                        <CardContent sx={{ minHeight: 300, maxWidth: 400 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                Hi everyone! My name is Luis Obregon, a
                                passionate young adult looking for opportunities
                                to learn and grow in a work setting environment.
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={6}
                            >
                                I've just graduated from my foundation year at
                                Holberton School in which I learned Low-level
                                programming, Algorithms, Higher-level
                                programming, System engineering and DevOps. I
                                currently work as a Student Tutor at Holberton
                                School
                            </Typography>

                            <IconButton href="https://www.linkedin.com/in/luis-o-45951b126/">
                                <LinkedInIcon fontSize="large" />
                            </IconButton>

                            <IconButton href="https://github.com/luisobregon21">
                                <GitHubIcon fontSize="large" />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item width={'50px'}></Grid>
                <Grid item mt={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            width="50%"
                            image={guillermoImg}
                        />
                        <CardHeader title="Guillermo Lorca" />
                        <CardContent sx={{ minHeight: 300, maxWidth: 400 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                I've just graduated from my foundations year
                                Holberton School Puerto Rico and I also worked
                                as a Student Tutor there.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                I have a burning passion about anything related
                                to computing, space exploration and VR/AR. I
                                love solving problems, learning everyday and
                                working with others.
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={2.3}
                            >
                                Right now I'm looking for employement
                                opportunities that allows me to keep learning
                                and growing as a software developer
                            </Typography>

                            <IconButton href="https://www.linkedin.com/in/guillermo-lorca-lamadrid-a875abab/">
                                <LinkedInIcon fontSize="large" />
                            </IconButton>

                            <IconButton href="https://github.com/lork27">
                                <GitHubIcon fontSize="large" />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
