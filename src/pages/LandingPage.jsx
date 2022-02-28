import { useAuth } from '../auth/Auth'

//This page will be the user landingpage it needs to looks something like this...
//https://cdn.discordapp.com/attachments/943515943760457738/943526139106820166/IMG_20220216_111546.jpg
export const LandingPage = () => {
    const { userData } = useAuth()
    console.log(userData)
    return (
        <div>
            <h1>
                This is the user landing page, you are already down to learn
            </h1>
            <p>
                Welcome <b>{userData.username}</b>
            </p>
            {userData.tutorInfo ? (
                <p> You are a Tutor </p>
            ) : (
                <p>You are not a Tutor</p>
            )}
        </div>
    )
}
