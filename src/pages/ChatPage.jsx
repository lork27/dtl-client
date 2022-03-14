import { Grid, TextField, Typography } from '@mui/material'
import { useAuth } from '../auth/Auth'
import { UserConnections } from '../components/UserConnections'
import { UseConnections } from '../hooks/use-fetch-connections'
import { ChatMessagebox } from '../components/ChatMessageBox'
import { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import { api } from '../api'

export const ChatPage = () => {
    const { userData } = useAuth()
    let connections = UseConnections()
    const [chat, setChat] = useState()
    const [chatfield, setChatField] = useState('type here to start')
    const [conversation, setConversation] = useState([])

    const sendMessage = async ({ user2, text }) => {
        const response = await api.post('/messages/sendMessage', {
            user2,
            text,
        })
        if (response.status === 201) {
            console.log(response.data)
        }
        // const response = await.
    }

    const getAllMessages = async ({ user2 }) => {
        console.log(user2)
        const response = await api.get('/messages/allMessages', {
            params: {
                user2,
            },
        })
        if (response.status === 200) {
            setConversation(response.data)
        }
    }
    // console.log(connections)
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const user2 = chat.id
        const text = data.get('message')
        sendMessage({ user2, text })
        getAllMessages({ user2 })
        console.log(conversation)
    }
    return (
        <Grid container m={5}>
            <Grid item sx={3}>
                <Typography variant="h5">Your connections</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                    height="400px" // fixed the height
                    width="105%"
                    style={{
                        border: '1px solid black',
                        overflow: 'hidden',
                        overflowY: 'scroll',
                    }}
                >
                    <UserConnections
                        connections={connections}
                        id={userData.id}
                        setChat={setChat}
                        getAllMessages={getAllMessages}
                        sx={{ cursor: 'pointer' }}
                    />
                </Box>
            </Grid>
            <Grid item ml={12} sx={8}>
                {/* chat component here */}
                {chat ? (
                    <Box
                        mb={2}
                        display="flex"
                        flexDirection="column"
                        height="400px" // fixed the height
                        width="600px"
                        style={{
                            border: '1px solid black',
                            overflow: 'hidden',
                            overflowY: 'scroll',
                            flexDirection: 'column-reverse',
                        }}
                    >
                        <ChatMessagebox
                            name={chat.name}
                            messages={conversation}
                            avatar={chat.avatar}
                        />
                    </Box>
                ) : (
                    'Select an user to see your chat history with them'
                )}
                {console.log(chat)}
                {chat ? (
                    <>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                id="message"
                                label={chatfield}
                                name="message"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                id="chatfield"
                                sx={{ mt: 2, ml: 1 }}
                                onClick={() => {
                                    setChatField('')
                                }}
                            >
                                send
                            </Button>
                        </Box>
                    </>
                ) : (
                    ''
                )}
            </Grid>
        </Grid>
    )
}
