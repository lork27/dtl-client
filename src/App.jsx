import { Header } from './layout/Header'
import { Routes, Route } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { RegisterTutor } from './pages/RegisterPageTutor'
function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register-tutor" element={<RegisterTutor />} />

                {/* <Route path="/guest" element={<GuestPage />} /> */}
            </Routes>
        </div>
    )
}

export default App
