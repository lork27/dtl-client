import React from 'react'
import ReactDOM from 'react-dom'
import App, { LoginRoutes } from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthController } from './auth/Auth'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import red from '@mui/material/colors/red'

const DTLTheme = createTheme({
    palette: {
        primary: red,
        mode: 'dark',
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={DTLTheme}>
            <CssBaseline />
            <AuthController>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App />} />
                        <Route path="auth/*" element={<LoginRoutes />} />
                    </Routes>
                </BrowserRouter>
            </AuthController>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
