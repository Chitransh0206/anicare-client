import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-green-700 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🐾 ANIcare</Link>
        
        {/* Hamburger button - mobile only */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/rescue" className="hover:text-green-200">Report Rescue</Link>
          <Link to="/volunteer" className="hover:text-green-200">Volunteer</Link>
          <Link to="/vets" className="hover:text-green-200">Vets</Link>
          <Link to="/donate" className="hover:text-green-200">Donate</Link>
          <Link to="/login" className="hover:text-green-200">Login</Link>
          <Link to="/register" className="bg-white text-green-700 px-4 py-1 rounded-full font-semibold hover:bg-green-100">Register</Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4">
          <Link to="/rescue" onClick={() => setIsOpen(false)} className="hover:text-green-200">Report Rescue</Link>
          <Link to="/volunteer" onClick={() => setIsOpen(false)} className="hover:text-green-200">Volunteer</Link>
          <Link to="/vets" onClick={() => setIsOpen(false)} className="hover:text-green-200">Vets</Link>
          <Link to="/donate" onClick={() => setIsOpen(false)} className="hover:text-green-200">Donate</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-green-200">Login</Link>
          <Link to="/register" onClick={() => setIsOpen(false)} className="bg-white text-green-700 px-4 py-1 rounded-full font-semibold text-center hover:bg-green-100">Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar