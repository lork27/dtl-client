import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export const SmallInfoBox = ({ icon, value }) => {
    return (
        <>
            <Grid container sx={{ mb: 1 }}>
                <Grid item xs={1}>
                    {icon}
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="subtitle2">{value}</Typography>
                </Grid>
            </Grid>
        </>
    )
}
