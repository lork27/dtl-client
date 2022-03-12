import { useEffect, useState } from 'react'
import { api } from '../api'

export const UseConnections = () => {
    const [connections, setConnections] = useState([])

    // useEffect(() => {
    //     const unsub = () => {
    //         api.get('/messages/allMatches').then((res) => {
    //             setConnections(Object.values(res.data))
    //         })
    //     }
    //     return () => unsub()
    // }, [])
    useEffect(() => {
        api.get('/messages/allMatches').then((res) => {
            setConnections(Object.values(res.data))
        })
        // console.log(subjects)
    }, [])
    console.log(connections)
    return connections
}
