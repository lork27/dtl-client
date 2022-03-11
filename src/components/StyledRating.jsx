import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'

export const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#8f8f8f',
    },
    '& .MuiRating-iconHover': {
        color: '#741a31',
    },
})
