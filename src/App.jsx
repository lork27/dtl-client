import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Routes, Route } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage'
import { HomePage } from './pages/control-pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { RegisterTutor } from './pages/RegisterPageTutor'
import { ProfileController } from './pages/control-pages/ProfileController'
import { OtherUserProfile } from './pages/OtherUserProfile'
import { ChatPage } from './pages/ChatPage'
import { AboutUs } from './pages/AboutUs'

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register-tutor" element={<RegisterTutor />} /> */}
                <Route path="/user/profile" element={<ProfileController />} />
                <Route path="/:id/profile" element={<OtherUserProfile />} />
                <Route path="/connections/chat" element={<ChatPage />} />
                <Route path="/about-us" element={<AboutUs />} />

                {/* <Route path="/guest" element={<GuestPage />} /> */}
            </Routes>
            <Footer />
        </div>
    )
}

export function LoginRoutes() {
    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register-tutor" element={<RegisterTutor />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
