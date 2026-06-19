import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import RescueRequest from './pages/RescueRequest'
import VolunteerRegister from './pages/VolunteerRegister'
import Donate from './pages/Donate'
import VetDirectory from './pages/VetDirectory'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RescueFeed from './pages/RescueFeed'
import RescueDetail from './pages/RescueDetail'

function ScrollToTop() {
  const { pathname } = window.location
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rescue" element={<RescueRequest />} />
            <Route path="/volunteer" element={<VolunteerRegister />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/vets" element={<VetDirectory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={<RescueFeed />} />
            <Route path="/rescue/:id" element={<RescueDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App