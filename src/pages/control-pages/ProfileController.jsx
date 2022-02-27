import { useAuth } from '../../auth/Auth'
import { GuestPage } from '../GuestPage'
import { UserProfile } from '../UserProfile'

export const ProfileController = () => {
    const { userData } = useAuth()
    console.log(userData)
    return <div> {userData ? <UserProfile /> : <GuestPage />} </div>
}
