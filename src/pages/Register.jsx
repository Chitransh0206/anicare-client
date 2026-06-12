import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://anicare-server.onrender.com/api/auth/register', form)
      setMessage('Registered successfully! Please login.')
    } catch (err) {
      setMessage('Email already exists')
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Register</h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <div className="flex flex-col gap-4">
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} />
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
          <input type="password" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
          <button onClick={handleSubmit} className="bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800">Register</button>
        </div>
        <p className="text-center text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-green-700 font-semibold">Login</Link></p>
      </div>
    </div>
  )
}

export default Register