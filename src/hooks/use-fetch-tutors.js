import { useEffect, useState } from 'react'
import { api } from '../api'

export const useAllTutors = () => {
    const [tutors, setTutors] = useState([
        // { id: 1, subjectName: 'Salsa', img: null },
        // { id: 2, subjectName: 'Crochet', img: null },
        // { id: 3, subjectName: 'Programming', img: null },
        // { id: 4, subjectName: 'Placeholder', img: null },
        // { id: 5, subjectName: 'otro interes', img: null },
        // { id: 6, subjectName: 'windows11', img: null },
        // { id: 7, subjectName: 'lmao', img: null },
        // { id: 8, subjectName: 'XD', img: null },
    ])

    useEffect(() => {
        api.get('/tutors/allTutors').then((res) => {
            setTutors(Object.values(res.data))
        })
        // console.log(tutors)
    }, [])

    return tutors
}
