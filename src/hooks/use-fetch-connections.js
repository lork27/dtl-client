import { useEffect, useState } from 'react'
import { api } from '../api'

//This effect runs every 3 seconds, used for deployed enviroment
// export const UseConnections = () => {
//     const [connections, setConnections] = useState([])

//     useEffect(() => {
//         const interval = setInterval(() => {
//             api.get('/messages/allMatches').then((res) => {
//                 setConnections(Object.values(res.data))
//             })
//         }, 3000)
//         return () => clearInterval(interval)
//     }, [])
//     // console.log(connections)
//     return connections
// }

//This effect only runs once. Used only for developing enviroment
export const UseConnections = () => {
    const [connections, setConnections] = useState([])

    useEffect(() => {
        api.get('/messages/allMatches').then((res) => {
            setConnections(Object.values(res.data))
        })
    }, [])
    // console.log(connections)
    return connections
}
