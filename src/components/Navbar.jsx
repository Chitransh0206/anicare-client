import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-green-700 text-white px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-bold">🐾 ANIcare</Link>

        {/* Hamburger button - mobile only */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/rescue" className="hover:text-green-200 text-sm font-medium">Report Rescue</Link>
          <Link to="/volunteer" className="hover:text-green-200 text-sm font-medium">Volunteer</Link>
          <Link to="/vets" className="hover:text-green-200 text-sm font-medium">Vets</Link>
          <Link to="/donate" className="hover:text-green-200 text-sm font-medium">Donate</Link>
          <Link to="/feed" className="hover:text-green-200 text-sm font-medium">Rescue Feed</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-green-200 text-sm">👋 {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hover:text-green-200 text-sm font-medium">Login</Link>
              <Link to="/register" className="bg-white text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-100 transition">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-2 border-t border-green-600 pt-4">
          <Link to="/rescue" onClick={() => setIsOpen(false)} className="hover:text-green-200 text-sm">Report Rescue</Link>
          <Link to="/volunteer" onClick={() => setIsOpen(false)} className="hover:text-green-200 text-sm">Volunteer</Link>
          <Link to="/vets" onClick={() => setIsOpen(false)} className="hover:text-green-200 text-sm">Vets</Link>
          <Link to="/donate" onClick={() => setIsOpen(false)} className="hover:text-green-200 text-sm">Donate</Link>
          <Link to="/feed" className="hover:text-green-200 text-sm font-medium">Rescue Feed</Link>
          {user ? (
            <>
              <span className="text-green-200 text-sm">👋 {user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-green-200 text-sm">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="bg-white text-green-700 px-4 py-2 rounded-full text-sm font-semibold text-center">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar