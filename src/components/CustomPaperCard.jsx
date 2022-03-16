import { Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
export const CustomPaperCard = ({ customColor, headText, bodyText }) => {
    return (
        <Paper
            sx={{
                height: 140,
                width: 350,
                // backgroundColor: '#fff',
                backgroundColor: `#${customColor}`,
                padding: '20px',
                textAlign: 'center',
                // backgroundImage:
                //     'url(https://pbs.twimg.com/media/FJEQjL-XIAIqJSd.jpg)',
                // backgroundSize: 'cover',
                // boxShadow: 'inset 0 0 0 1000px rgba(0,55,0,.6)',
                marginRight: '10px',
                marginTop: '25px',
            }}
        >
            <Typography variant="h5" mb={1} color="text.secondary">
                {headText}
            </Typography>
            <Typography variant="overline" color="text.secondary">
                {bodyText}
            </Typography>
        </Paper>
    )
}
