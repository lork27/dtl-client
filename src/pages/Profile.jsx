import { useAuth } from '../auth/Auth'
import { TutorProfile } from './TutorProfile'
import { StudentProfile } from './StudentProfile'

export const Profile = () => {
    const { userData } = useAuth()
    return (
        <div>{userData.tutorInfo ? <TutorProfile /> : <StudentProfile />}</div>
    )
}
