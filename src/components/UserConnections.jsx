import { useAuth } from '../auth/Auth'
import { Grid, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import {
    OfflineStyledBadge,
    OnlineStyledBadge,
} from '../components/BadgeAvatar'

export const UserConnections = ({
    connections,
    id,
    setChat,
    getAllMessages,
}) => {
    // console.log(connections)
    // console.log(id)
    return (
        <Grid item>
            <Grid item sx={{ width: '280px', marginLeft: 4 }}>
                {connections.length === 0
                    ? 'You have no connections!'
                    : connections.map((connection) => {
                          return (
                              <Card
                                  key={connection.id}
                                  sx={{ display: 'flex', mb: 1 }}
                                  onClick={() => {
                                      console.log(
                                          `I'm ${id} and I clicked on ${connection.id} to check our chats`
                                      )
                                      setChat({
                                          id: connection.id,
                                          name: connection.username,
                                          avatar: connection.avatar,
                                      })

                                      getAllMessages({ user2: connection.id })
                                  }}
                              >
                                  {connection?.isOnline ? (
                                      <OnlineStyledBadge
                                          overlap="circular"
                                          anchorOrigin={{
                                              vertical: 'bottom',
                                              horizontal: 'right',
                                          }}
                                          variant="dot"
                                      >
                                          <Avatar
                                              src={connection?.avatar}
                                              alt="match-avatar"
                                              variant="circle"
                                              //   component={RouterDomLink}
                                              //   to={`/${match.tutorId}/profile`}
                                              sx={{
                                                  width: 75,
                                                  height: 75,
                                              }}
                                          />
                                      </OnlineStyledBadge>
                                  ) : (
                                      <OfflineStyledBadge
                                          overlap="circular"
                                          anchorOrigin={{
                                              vertical: 'bottom',
                                              horizontal: 'right',
                                          }}
                                          variant="dot"
                                      >
                                          <Avatar
                                              src={connection?.avatar}
                                              alt="match-avatar"
                                              variant="circle"
                                              //   component={RouterDomLink}
                                              //   to={`/${match.tutorId}/profile`}
                                              sx={{
                                                  width: 75,
                                                  height: 75,
                                              }}
                                          />
                                      </OfflineStyledBadge>
                                  )}
                                  <Box
                                      sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                      }}
                                  >
                                      <CardContent sx={{ flex: '1 0 auto' }}>
                                          <Typography
                                              component="div"
                                              variant="h6"
                                              color="text.secondary"
                                          >
                                              {connection.username}
                                          </Typography>
                                      </CardContent>
                                  </Box>
                              </Card>
                          )
                      })}
            </Grid>
        </Grid>
    )
}
