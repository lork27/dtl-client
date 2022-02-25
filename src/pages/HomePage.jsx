import { useAuth } from '../auth/Auth'
import { GuestPage } from './GuestPage'
import { LandingPage } from './LandingPage'
export const HomePage = () => {
    const { userData } = useAuth()
    console.log(userData)
    return <div>{userData ? <LandingPage /> : <GuestPage />}</div>
}
