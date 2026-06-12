import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">🐾 ANIcare</Link>
      <div className="flex gap-6">
        <Link to="/rescue" className="hover:text-green-200">Report Rescue</Link>
        <Link to="/volunteer" className="hover:text-green-200">Volunteer</Link>
        <Link to="/vets" className="hover:text-green-200">Vets</Link>
        <Link to="/donate" className="hover:text-green-200">Donate</Link>
        <Link to="/login" className="hover:text-green-200">Login</Link>
        <Link to="/register" className="bg-white text-green-700 px-4 py-1 rounded-full font-semibold hover:bg-green-100">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar