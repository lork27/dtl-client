import { useParams } from 'react-router-dom'
import { useAuth } from '../auth/Auth'
import { api } from '../api'
import { useEffect, useState } from 'react'
import { Avatar, Grid } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

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
    return (
        <>
            <Grid id="container">
                <Grid id="userInfo" item xs={6}>
                    <Avatar
                        alt="profile-avatar"
                        src={userInfo?.avatar}
                        sx={{ width: 200, height: 200 }}
                    />
                    <p>User: {userInfo?.username}</p>
                    <p>email: {userInfo?.email}</p>
                    <p>Location: {userInfo?.location}</p>
                    <p>description: {userInfo?.bio}</p>
                    {console.log(userInfo.tutorInfo?.urls.length)}
                    {userInfo.tutorInfo?.urls.length === 0
                        ? "This users doesn't have links"
                        : userInfo.tutorInfo?.urls.map((url) => {
                              return <p>{url}</p>
                          })}
                </Grid>
                <Grid id="gallery" item xs={6}>
                    {userInfo?.tutorInfo?.imgs.map((img, i) => {
                        return <img key={i} src={img} />
                    })}
                </Grid>
            </Grid>
        </>
    )
}
