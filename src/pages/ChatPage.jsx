import { useAuth } from '../auth/Auth'
import { Link as RouterDomLink } from 'react-router-dom'
import { UseConnections } from '../hooks/use-fetch-connections'
import { Grid, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import {
    OfflineStyledBadge,
    OnlineStyledBadge,
} from '../components/BadgeAvatar'

export const ChatPage = () => {
    const { userData } = useAuth()
    const connections = UseConnections()
    return (
        <Grid container>
            <Grid item>
                <Grid item sx={{ width: '280px', marginLeft: 4 }}>
                    {connections.length === 0
                        ? 'You have no connections!'
                        : connections.map((connection, index) => {
                              return (
                                  <Card
                                      key={index}
                                      sx={{ display: 'flex', mb: 1 }}
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
                                      {/* <Badge
                                          color="primary"
                                          badgeContent=""
                                          anchorOrigin={{
                                              vertical: 'center',
                                              horizontal: 'right',
                                          }}
                                      >
                                          <Avatar
                                              src={connection?.avatar}
                                              alt="match-avatar"
                                              variant="circle"
                                              //   component={RouterDomLink}
                                              //   to={`/${match.tutorId}/profile`}
                                              sx={{ widjth: 100, height: 100 }}
                                          />
                                      </Badge> */}

                                      <Box
                                          sx={{
                                              display: 'flex',
                                              flexDirection: 'column',
                                          }}
                                      >
                                          <CardContent
                                              sx={{ flex: '1 0 auto' }}
                                          >
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
            <Grid item sx={6}>
                <Typography>CHAT GOES HERE</Typography>
            </Grid>
        </Grid>
    )
}
