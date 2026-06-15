import { useState } from 'react'
import axios from 'axios'

function Donate() {
  const [form, setForm] = useState({ name: '', email: '', amount: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleDonate = async () => {
    if (!form.name || !form.email || !form.amount) {
      setMessage('Please fill all fields')
      return
    }
    setLoading(true)
    const loaded = await loadRazorpay()
    if (!loaded) {
      setMessage('Razorpay failed to load.')
      setLoading(false)
      return
    }
    try {
      const orderRes = await axios.post('https://anicare-server.onrender.com/api/donations/create-order', {
        amount: parseFloat(form.amount)
      })
      const options = {
        key: 'rzp_test_T0BS61WTswH6GU',
        amount: orderRes.data.amount,
        currency: 'INR',
        name: 'ANIcare',
        description: 'Donation for Animal Rescue',
        order_id: orderRes.data.id,
        handler: async (response) => {
          try {
            await axios.post('https://anicare-server.onrender.com/api/donations/verify', {
              ...response,
              name: form.name,
              email: form.email,
              amount: parseFloat(form.amount)
            })
            setMessage('Thank you for your donation! 🐾')
            setForm({ name: '', email: '', amount: '' })
          } catch (err) {
            setMessage('Payment verification failed.')
          }
        },
        prefill: { name: form.name, email: form.email },
        theme: { color: '#15803d' }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setMessage('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-green-50 py-16 px-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-2 text-center">Donate to ANIcare</h2>
        <p className="text-center text-gray-500 mb-6">Your donation helps rescue and treat animals in need</p>
        {message && <p className="text-center text-green-600 mb-4 font-semibold">{message}</p>}
        <div className="flex flex-col gap-4">
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input type="number" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
          <div className="grid grid-cols-4 gap-2">
            {[100, 500, 1000, 2000].map(amt => (
              <button key={amt} onClick={() => setForm({...form, amount: amt})} className="border-2 border-green-600 text-green-700 py-2 rounded-lg font-semibold hover:bg-green-50 text-sm">₹{amt}</button>
            ))}
          </div>
          <button onClick={handleDonate} disabled={loading} className="bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 disabled:opacity-50">
            {loading ? 'Processing...' : 'Donate Now 🐾'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Donate