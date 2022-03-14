import { Card, Grid } from '@mui/material'
import { useAuth } from '../auth/Auth'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

export const ChatMessagebox = ({ avatar, name, messages }) => {
    // console.log(messages)
    return (
        // <Grid container>
        //     {/* <Grid item sx={1}>
        //         <Avatar alt="connection-avatar" src={avatar}></Avatar>
        //         <Typography>{name}</Typography>
        //         {/* just do a loop of the messages list */}
        //     </Grid> */}
        <Grid item sx={10}>
            {/* I need to create a message component that renders ONE message, accepts the text and who wrote it 
                Depeding who wrote it style it differetly */}
            {messages?.map((message, i) => {
                return (
                    <MessageText
                        key={i}
                        message={message.text}
                        from={message.from}
                    />
                )
            })}
        </Grid>
    )
}

const MessageText = ({ message, from }) => {
    const { userData } = useAuth()
    // const username = useAuth().username
    return (
        <Card
            sx={
                from === userData.username
                    ? {
                          margin: 2,
                          bgcolor: '#1c3652',
                          border: 4,
                          borderColor: '#1c3652',
                      }
                    : {
                          margin: 2,
                          bgcolor: '#741a31',
                          border: 4,
                          borderColor: '#6e2739',
                      }
            }
        >
            <Typography my={1} mx={4}>
                {from}
            </Typography>
            <Typography my={1} mx={4}>
                {message}
            </Typography>
        </Card>
    )
}
