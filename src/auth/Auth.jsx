import { createContext, useContext, useState } from 'react'
import { api, addAuthHeader, removeAuthHeader } from '../api'

addAuthHeader()

const AuthContext = createContext({
    userData: null,
    logIn: ({ email, password, onSuccess }) => {
        return {}
    },
    logOut: () => ({}),
    registerUser: ({
        username,
        email,
        password,
        confirmationPassword,
        onSuccess,
    }) => ({}),
    registerTutor: ({
        username,
        email,
        password,
        confirmationPassword,
        subject,
        onSuccess,
    }) => ({}),
    updateUserInfo: ({ location, bio, token }) => ({}),
    uploadImage: (image, token) => ({}),
})

export const AuthController = (props) => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('user'))
    )
    const [error, setError] = useState(null)

    //Log In function
    const logIn = async ({ email, password, onSuccess }) => {
        setError(null)
        const response = await api.post(
            '/users/login',
            { email, password },
            { validateStatus: () => true }
        )
        if (response.status === 200) {
            setUserData(response.data)
            console.log(userData)
            localStorage.setItem('user', JSON.stringify(response.data))
            addAuthHeader()
            if (onSuccess) {
                onSuccess()
            }
        }
        if (response.status === 400) {
            setError(response.data.error)
            console.log(error)
        }
    }

    // Register user function
    const registerUser = async ({
        username,
        email,
        password,
        confirmationPassword,
        onSuccess,
    }) => {
        setError(null)
        const response = await api.post(
            '/users/new',
            { username, email, password, confirmationPassword },
            { validateStatus: () => true }
        )
        // console.log(username, email, password, confirmationPassword)

        if (response.status === 201) {
            setUserData(response.data)
            console.log(userData)
            localStorage.setItem('user', JSON.stringify(response.data))
            addAuthHeader()
            if (onSuccess) {
                onSuccess()
            }
        }
        if (response.status === 400) {
            setError(response.data.error)
        }
    }

    // Register Tutor function
    const registerTutor = async ({
        username,
        email,
        password,
        confirmationPassword,
        subject,
        onSuccess,
    }) => {
        setError(null)
        const response = await api.post(
            '/tutors/new',
            { username, email, password, confirmationPassword, subject },
            { validateStatus: () => true }
        )
        // console.log(username, email, password, confirmationPassword, subject)

        if (response.status === 201) {
            setUserData(response.data)
            console.log(userData)
            localStorage.setItem('user', JSON.stringify(response.data))
            addAuthHeader()
            if (onSuccess) {
                onSuccess()
            }
        }
        if (response.status === 400) {
            setError(response.data.error)
        }
    }

    const logOut = () => {
        localStorage.removeItem('user')
        removeAuthHeader()
        setUserData(null)
    }

    const updateUserInfo = async ({ location, bio, token }) => {
        const response = await api.put(
            '/users/edit-profile',
            { location, bio },
            token
        )
        if (response.status === 200) {
            // console.log(response.data)
            setUserData(response.data)
            addAuthHeader()
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        if (response.status === 500) {
            console.log('error found')
            setError(response.data.error)
            console.error(error)
        }
    }

    const uploadImage = async (file, token) => {
        // console.log(file)
        // console.log(token)
        const response = await api.put('/users/image', file, token)
        if (response.status === 200) {
            userData.avatar = response.image
        }
        if (response.status === 500) {
            setError(response.data.error)
        }
    }
    return (
        <AuthContext.Provider
            value={{
                userData,
                logIn,
                error,
                logOut,
                registerUser,
                registerTutor,
                updateUserInfo,
                uploadImage,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
