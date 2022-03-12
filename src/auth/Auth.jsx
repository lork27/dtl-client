import { createContext, useContext, useState } from 'react'
import { api, addAuthHeader, removeAuthHeader } from '../api'

addAuthHeader()
const setLocalData = (userData) => {
    const localData = JSON.parse(localStorage.getItem('user'))
    localStorage.setItem('user', JSON.stringify({ ...localData, ...userData }))
}
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
    updateUserInfo: ({ location, bio }) => ({}),
    uploadImage: (image) => ({}),
    sendMatchRequest: ({ tutorId }) => ({}),
    acceptMatchRequest: ({ studentId }) => ({}),
    denyMatchRequest: ({ studentId }) => ({}),
    updateTutorUrls: ({ urls }) => ({}),
    uploadPortfolioImage: (image) => ({}),
    deletePortfolioImage: (file) => ({}),
    reviewStudent: ({ studentId, review, index }) => ({}),
    reviewTutor: ({ tutorId, review, index }) => ({}),
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
            setLocalData(response.data)
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
            setLocalData(response.data)
            addAuthHeader()
            if (onSuccess) {
                onSuccess()
            }
        }
        if (response.status === 400) {
            setError(response.data.message)
            console.log(response.data.message)
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
            setLocalData(response.data)
            addAuthHeader()
            if (onSuccess) {
                onSuccess()
            }
        }
        if (response.status === 400) {
            setError(response.data.message)
        }
    }

    const logOut = async ({ onSuccess }) => {
        //TODO !!!!!IMPORTANT
        //I need to send put method to the backend to tell it that the user is now offline
        const response = await api.put('users/logout')
        if (response.status === 200) {
            localStorage.removeItem('user')
            removeAuthHeader()
            setUserData(null)
            if (onSuccess) {
                onSuccess()
            }
        }
    }

    const updateUserInfo = async ({ location, bio }) => {
        if (userData.bio === bio && userData.location === location) {
            console.log('info not updated')
            return
        }
        const response = await api.put('/users/edit-profile', { location, bio })
        if (response.status === 200) {
            // console.log(response.data)
            setUserData(response.data)
            setLocalData(response.data)
        }
        if (response.status === 500) {
            console.log('error found')
            setError(response.data.error)
            console.error(error)
        }
    }

    const uploadImage = async (file) => {
        // console.log(file)
        // console.log(token)
        const formData = new FormData()
        formData.append('image', file, file.name)
        const response = await api.put('/users/image', formData)
        if (response.status === 200) {
            // console.log(userData.avatar)
            // userData.avatar = response.data.image
            userData.avatar = response.data.image
            setUserData({ ...userData })
            setLocalData(userData)
            // console.log(response.data.image)
        }
        if (response.status === 500) {
            setError(response.data.error)
        }
    }
    const sendMatchRequest = async ({ tutorId }) => {
        if (tutorId === userData.id) {
            console.log('Cannot match with yourself')
            return
        }
        console.log(`Trying to match user ${userData.id} with tutor ${tutorId}`)
        const response = await api.put('/users/request', { tutorId })
        if (response.status === 200) {
            alert('request sent')
        }
    }

    const acceptMatchRequest = async ({ studentId }) => {
        // console.log(`trying to accept ${studentId} as a student`)
        const response = await api.put('/tutors/acceptRequest', { studentId })
        if (response.status === 200) {
            console.log('Student accepted')
            userData.tutorInfo.accepted = response.data.accepted
            userData.tutorInfo.requests = response.data.requests
            setUserData({ ...userData })
            setLocalData(userData)
        }
        // console.error(response.error)
    }
    const denyMatchRequest = async ({ studentId }) => {
        console.log(`trying to accept ${studentId} as a student`)
        const response = await api.put('/tutors/denyRequest', { studentId })
        if (response.status === 200) {
            console.log('Student deny')
            userData.tutorInfo.requests = response.data.requests
            setUserData({ ...userData })
            setLocalData(userData)
        }
        // console.error(response.error)
    }

    const updateTutorUrls = async ({ urls }) => {
        console.log(urls)
        if (
            userData.tutorInfo.urls[0] === urls[0] &&
            userData.tutorInfo.urls[1] === urls[1]
        ) {
            console.log('urls not updated')
            return
        }
        const response = await api.put('/tutors/edit-profile', { urls })
        if (response.status === 200) {
            console.log('URLs updated!')
            userData.tutorInfo.urls = response.data.urls
            setUserData({ ...userData })
            setLocalData(userData)
        } else {
            alert("Couldn't upload URLs")
        }
    }

    const uploadPortfolioImage = async (file) => {
        if (userData.tutorInfo.imgs.length > 5) {
            alert(
                'Cannot upload more than 6 pictures, please delete an old one if you want to upload more'
            )
            return
        }
        const formData = new FormData()
        formData.append('image', file, file.name)
        const response = await api.put('/tutors/image', formData)
        if (response.status === 200) {
            // console.log(userData.avatar)
            // userData.avatar = response.data.image
            userData.tutorInfo.imgs = response.data.imgs
            setUserData({ ...userData })
            setLocalData(userData)
            // console.log(response.data.image)
        }
        if (response.status === 500) {
            setError(response.data.error)
        }
    }
    const reviewStudent = async ({ studentId, review, index }) => {
        console.log({ studentId, review })
        const response = await api.put('/tutors/reviewStudent', {
            studentId,
            review,
        })
        if (response.status === 200) {
            userData.tutorInfo.accepted[index].reviewed = true
            userData.tutorInfo.accepted[index].scoreGiven = review
            setUserData({ ...userData })
            setLocalData(userData)
        }
        if (response.status === 400) {
            alert('you already reviewed this student!')
            console.log('you already reviewed this student!')
        }
    }

    const reviewTutor = async ({ tutorId, review, index }) => {
        console.log({ tutorId, review })
        const response = await api.put('/tutors/reviewTutor', {
            tutorId,
            review,
        })
        if (response.status === 200) {
            userData.matches[index].reviewed = true
            userData.matches[index].scoreGiven = review
            setUserData({ ...userData })
            setLocalData(userData)
        }
        if (response.status === 400) {
            alert('you already reviewed this student!')
            console.log('you already reviewed this student!')
        }
    }

    const deletePortfolioImage = async (url) => {
        console.log(url)
        const response = await api.delete('/tutors/deleteImage', {
            data: { url },
        })
        // const response = await api.delete('/tutors/deleteImage', { url })
        if (response.status === 200) {
            userData.tutorInfo.imgs = response.data.imgs
            setUserData({ ...userData })
            setLocalData(userData)
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
                sendMatchRequest,
                acceptMatchRequest,
                denyMatchRequest,
                updateTutorUrls,
                uploadPortfolioImage,
                reviewStudent,
                reviewTutor,
                deletePortfolioImage,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
