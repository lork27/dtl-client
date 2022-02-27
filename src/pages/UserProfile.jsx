import { useAuth } from '../auth/Auth'

export const UserProfile = () => {
    const { userData } = useAuth()
    return (
        <div>
            On this page I, <b>{userData.username}</b> will be able to edit my
            bio, avatar and location User info:
            {userData.email}
        </div>
    )
}
