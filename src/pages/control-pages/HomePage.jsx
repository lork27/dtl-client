import { useAuth } from '../../auth/Auth'
import { GuestPage } from '../GuestPage'
import { LandingPage } from '../LandingPage'
export const HomePage = () => {
    const { userData } = useAuth()
    console.log(userData)
    return <div>{userData ? <LandingPage /> : <GuestPage />}</div>
}

//This whole approach of using one individual controller for each time
// I need to protect a route is not scalable
// If we want to scale this project we should use this approach
// https://youtu.be/0x8Dap2EIVE
