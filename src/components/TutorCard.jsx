import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/Auth'

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
            </CardActions>
        </Card>
    )
}
