import { useEffect, useState } from 'react'
import { api } from '../api'

export const UseConnections = () => {
    const [connections, setConnections] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            api.get('/messages/allMatches').then((res) => {
                setConnections(Object.values(res.data))
            })
        }, 100000000)
        return () => clearInterval(interval)
    }, [])
    // console.log(connections)
    return connections
}
