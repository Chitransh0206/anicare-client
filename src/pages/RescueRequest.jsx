import { useState } from 'react'
import axios from 'axios'

function RescueRequest() {
  const [form, setForm] = useState({ animalType: '', description: '', location: '', imageUrl: '' })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://anicare-server.onrender.com/api/rescues', form)
      setMessage('Rescue request submitted successfully!')
      setForm({ animalType: '', description: '', location: '', imageUrl: '' })
    } catch (err) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-green-50 py-16 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">Report an Animal</h2>
        <p className="text-center text-gray-500 mb-6">Fill in the details and we'll send help immediately</p>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}
        <div className="flex flex-col gap-4">
          <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" value={form.animalType} onChange={e => setForm({...form, animalType: e.target.value})}>
            <option value="">Select Animal Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Cow">Cow</option>
            <option value="Other">Other</option>
          </select>
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Location (e.g. MG Road, Jaipur)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
          <textarea className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Describe the situation..." rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Image URL (optional)" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
          <button onClick={handleSubmit} className="bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800">Submit Rescue Request</button>
        </div>
      </div>
    </div>
  )
}

export default RescueRequest