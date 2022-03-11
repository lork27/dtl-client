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
import { StyledRating } from './StyledRating'

const truncate = (input, max = 150) =>
    input.length > max ? `${input.substring(0, max)}...` : input

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export function TutorCard({
    avatar,
    name,
    bio,
    location,
    subjectImage,
    id,
    subjectName,
    userId,
    score,
}) {
    const [expanded, setExpanded] = React.useState(false)
    const { sendMatchRequest } = useAuth()

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={<Avatar alt={name} src={avatar} />}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={location}
            />
            <CardMedia component="img" height="194" image={subjectImage} />
            <CardContent sx={{ minHeight: 110 }}>
                <Typography variant="body2" color="text.secondary">
                    {bio
                        ? truncate(bio)
                        : `Hey I'm ${name} and I teach ${subjectName}`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="request-match"
                    onClick={() => {
                        id
                            ? sendMatchRequest({ tutorId: id })
                            : document.getElementById('profileLink').click()
                        // alert(
                        //     `tutor ID I want to match ${id}... Current user id: ${userId}`
                        // )
                    }}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    aria-label="share"
                    component={Link}
                    to={id ? `/${id}/profile` : `/auth/register`}
                    id="profileLink"
                >
                    <ContentPasteSearchIcon />
                </IconButton>
                <StyledRating name="read-only" value={score} readOnly />
            </CardActions>
        </Card>
    )
}
