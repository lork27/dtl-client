import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'

export const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#7d4654',
    },
    '& .MuiRating-iconHover': {
        color: '#741a31',
    },
})
