import { useAuth } from '../auth/Auth'

export const TutorProfile = () => {
    const { userData } = useAuth()
    return <div>Hola soy el Tutor {userData.username}</div>
}
