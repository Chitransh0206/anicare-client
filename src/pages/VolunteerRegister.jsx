import { useState } from 'react'
import axios from 'axios'

function VolunteerRegister() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', skills: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://anicare-server.onrender.com/api/volunteers', form)
      setMessage('Volunteer registered successfully! We will contact you soon.')
      setForm({ name: '', email: '', phone: '', city: '', skills: '' })
    } catch (err) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-green-50 py-16 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">Become a Volunteer</h2>
        <p className="text-center text-gray-500 mb-6">Join our network and help animals in your city</p>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <div className="flex flex-col gap-4">
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Skills (e.g. First Aid, Transport, Feeding)" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
          <button onClick={handleSubmit} className="bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800">Register as Volunteer</button>
        </div>
      </div>
    </div>
  )
}

export default VolunteerRegister