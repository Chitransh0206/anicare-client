import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RescueRequest from './pages/RescueRequest'
import VolunteerRegister from './pages/VolunteerRegister'
import Donate from './pages/Donate'
import VetDirectory from './pages/VetDirectory'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rescue" element={<RescueRequest />} />
        <Route path="/volunteer" element={<VolunteerRegister />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/vets" element={<VetDirectory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App