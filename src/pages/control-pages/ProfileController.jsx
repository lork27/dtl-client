import { useAuth } from '../../auth/Auth'
import { GuestPage } from '../GuestPage'
import { Profile } from '../Profile'

export const ProfileController = () => {
    const { userData } = useAuth()
    console.log(userData)
    return <div> {userData ? <Profile /> : <GuestPage />} </div>
}
