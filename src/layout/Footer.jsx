import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useNavigate, Link as RouterDomLink } from 'react-router-dom'
export const Footer = () => {
    return (
        <Box marginTop={15}>
            <Typography variant="body2" align="center" color="text.secondary">
                Web App developed by{' '}
                <Link href="https://github.com/luisobregon21" color="inherit">
                    Luis Obregon
                </Link>{' '}
                and{' '}
                <Link href="https://github.com/lork27" color="inherit">
                    Guillermo Lorca
                </Link>{' '}
                <Link component={RouterDomLink} to="/about-us" color="inherit">
                    About Us
                </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link component={RouterDomLink} color="inherit" to="/">
                    DTL
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}

// function Copyright(props) {
//     return (
//         <Typography
//             variant="body2"
//             color="text.secondary"
//             align="center"
//             {...props}
//         >
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     )
// }
