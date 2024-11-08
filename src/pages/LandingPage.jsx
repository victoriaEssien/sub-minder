
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { Hero, SignUp, Login, Dashboard } from "../index"
import Navbar from "../components/Navbar"



function LandingPage() {
  return (
    <div>
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <Navbar />
                            <Hero />
                        </>
                    }>
                    </Route>
                    
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/kdrama/:id" element={<KdramaDetailPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
                    {/* <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                    <Route path="/my-cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                    <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} />
                    <Route path="/description" element={<ProtectedRoute><ProductDescription /></ProtectedRoute>} />
                    <Route path="/my-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/fashion-items" element={<ProtectedRoute><FashionItems /></ProtectedRoute>} /> */}
                </Routes>
            </div>
        </Router>
    </div>
  )
}

export default LandingPage