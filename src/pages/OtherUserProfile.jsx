import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import InfoIcon from '@mui/icons-material/Info'
import LinkIcon from '@mui/icons-material/Link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../auth/Auth'
import { SmallInfoBox } from '../components/SmallInfoBox'
import { StyledRating } from '../components/StyledRating'
import Link from '@mui/material/Link'

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
            return <h3>'not such user wihtin DTL database'</h3>
        }
    }

    useEffect(() => {
        getUserInfo(id)
    }, [])
    // console.log('imgs length')
    // console.log(userData.tutorInfo.imgs.length)
    // console.log('after length')
    console.log(userInfo.score)
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
                    <Typography mb={1}>
                        Reviews as a Student:
                        <StyledRating
                            name="read-only"
                            value={parseInt(userInfo.score)}
                            readOnly
                        />
                    </Typography>
                    {userInfo.tutorInfo ? (
                        <Typography mb={4}>
                            Reviews as a Tutor:
                            <StyledRating
                                name="read-only"
                                value={parseInt(userInfo.tutorInfo.score)}
                                readOnly
                            />
                        </Typography>
                    ) : (
                        ''
                    )}

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
                        userInfo.tutorInfo?.urls.map((url, i) => {
                            return (
                                <SmallInfoBox
                                    key={i}
                                    icon={<LinkIcon />}
                                    value={<Link href={url}>{url}</Link>}
                                />
                            )
                        })
                    )}
                </Grid>
                {userInfo.tutorInfo ? (
                    <Grid id="gallery" item xs={12} md={8}>
                        {userInfo.tutorInfo?.imgs?.length > 0 ? (
                            <>
                                <Typography>Portfolio images</Typography>
                                <Grid container>
                                    {userInfo?.tutorInfo?.imgs.map((img, i) => {
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
                            </>
                        ) : (
                            <p>This user has no portfolio images</p>
                        )}
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
        </Container>
    )
}
