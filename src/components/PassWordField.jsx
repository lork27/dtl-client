import { Password } from '@mui/icons-material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'

export const CustomPassword = ({ props }) => {
    const [visibility, setVisibility] = useState(false)
    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={visibility ? 'text' : 'Password'}
                id="password"
                autoComplete="current-password"
            />
            <InputAdornment position="end">
                <IconButton
                    onClick={() => {
                        setVisibility(!true)
                    }}
                ></IconButton>
            </InputAdornment>
        </>
    )
}
