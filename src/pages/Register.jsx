import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../services/api'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setMessage('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      await API.post('/api/auth/register', form)
      navigate('/login')
    } catch (err) {
      setMessage('Email already exists')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">🐾</span>
          <h2 className="text-3xl font-bold text-green-700 mt-3">Join ANIcare</h2>
          <p className="text-gray-500 mt-1">Create your account and start helping animals</p>
        </div>
        {message && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm text-center">
            {message}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
            <input
              className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Your full name"
              onChange={e => setForm({...form, name: e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <input
              className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="you@example.com"
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="••••••••"
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register