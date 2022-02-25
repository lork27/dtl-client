import axios from 'axios'

const URL =
    process.env.NODE_ENV === 'production'
        ? 'https://us-central1-dtl-mvp.cloudfunctions.net/api/'
        : 'http://localhost:5000/dtl-mvp/us-central1/api/'

export const api = axios.create({
    baseURL: URL,
})

export const addAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

export const removeAuthHeader = () => {
    delete api.defaults.headers.common['Authorization']
}
