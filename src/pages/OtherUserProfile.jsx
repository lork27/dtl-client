import { useParams } from 'react-router-dom'
import { useAuth } from '../auth/Auth'
import { api } from '../api'
import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Container from '@mui/material/Container'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { SmallInfoBox } from '../components/SmallInfoBox'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import InfoIcon from '@mui/icons-material/Info'
import LinkIcon from '@mui/icons-material/Link'

export const OtherUserProfile = () => {
    const { userData } = useAuth()
    const { id } = useParams()
    const [userInfo, setUserinfo] = useState({})
    const getUserInfo = async (id) => {
        try {
            const response = await api.get(`/users/${id}`)
            if (response.status === 200) {
                setUserinfo(response.data)
            }
        } catch {
            console.log('not such user wihtin DTL database')
        }
    }

    useEffect(() => {
        getUserInfo(id)
    }, [])
    console.log('imgs length')
    console.log(userData.tutorInfo.imgs.length)
    console.log('after length')
    return (
        <Container sx={{ padding: 10 }}>
            <Grid container>
                <Grid id="userInfo" item xs={12} md={4}>
                    <Avatar
                        alt="profile-avatar"
                        src={userInfo?.avatar}
                        sx={{ width: 200, height: 200 }}
                    />
                    <Typography variant="h5" padding={3}>
                        {userInfo?.username}
                    </Typography>

                    <SmallInfoBox
                        icon={<AlternateEmailIcon />}
                        value={userInfo?.email}
                    />

                    <SmallInfoBox
                        icon={<LocationOnIcon />}
                        value={userInfo?.location}
                    />

                    <SmallInfoBox icon={<InfoIcon />} value={userInfo?.bio} />

                    {console.log(userInfo.tutorInfo?.urls.length)}
                    {userInfo.tutorInfo?.urls.length === 0 ? (
                        <SmallInfoBox icon={<LinkIcon />} value="No links" />
                    ) : (
                        userInfo.tutorInfo?.urls.map((url) => {
                            return (
                                <SmallInfoBox
                                    icon={<LinkIcon />}
                                    value={<a href={url}>{url}</a>}
                                />
                            )
                        })
                    )}
                </Grid>
                <Grid id="gallery" item xs={12} md={8}>
                    <Typography>Portfolio images</Typography>
                    {userInfo.tutorInfo?.imgs?.length > 0 ? (
                        <Grid container>
                            {userInfo?.tutorInfo?.imgs.map((img, i) => {
                                return (
                                    <Grid
                                        item
                                        xs={
                                            userInfo.tutorInfo?.imgs.length > 1
                                                ? 4
                                                : 12
                                        }
                                    >
                                        <img
                                            key={i}
                                            src={img}
                                            // style={
                                            //     userData.tutorInfo?.imgs
                                            //         .length > 1
                                            //         ? { width: '100%' }
                                            //         : { width: '50%' }
                                            // }
                                            style={{ width: '100%' }}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    ) : (
                        <p>This user has no portfolio images</p>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}
