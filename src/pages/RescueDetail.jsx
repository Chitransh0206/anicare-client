import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import API from '../services/api'

const statusSteps = ['pending', 'in-progress', 'resolved']

const statusColors = {
  pending: 'bg-red-100 text-red-600',
  'in-progress': 'bg-yellow-100 text-yellow-600',
  resolved: 'bg-green-100 text-green-700'
}

const animalEmojis = {
  Dog: '🐕',
  Cat: '🐈',
  Bird: '🐦',
  Cow: '🐄',
  Other: '🐾'
}

function RescueDetail() {
  const { id } = useParams()
  const [rescue, setRescue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.get(`/api/rescues/${id}`)
      .then(res => {
        setRescue(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Rescue case not found.')
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🐾</div>
        <p className="text-gray-500">Loading rescue details...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">😔</div>
        <p className="text-gray-500">{error}</p>
        <Link to="/feed" className="mt-4 inline-block bg-green-700 text-white px-6 py-2 rounded-full">
          Back to Feed
        </Link>
      </div>
    </div>
  )

  const currentStep = statusSteps.indexOf(rescue.status)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <Link to="/feed" className="inline-flex items-center gap-2 text-green-700 font-semibold mb-6 hover:underline">
          ← Back to Rescue Feed
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{animalEmojis[rescue.animalType] || '🐾'}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{rescue.animalType} in Distress</h1>
                <p className="text-gray-500 mt-1">📍 {rescue.location}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[rescue.status] || 'bg-gray-100 text-gray-600'}`}>
              {rescue.status}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{rescue.description}</p>

          {rescue.imageUrl && (
            <img
              src={rescue.imageUrl}
              alt={rescue.animalType}
              className="w-full h-64 object-cover rounded-xl mt-4"
            />
          )}

          <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
            <span>Case #{rescue.id}</span>
            <span>🕐 {new Date(rescue.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}</span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Rescue Timeline</h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
            {statusSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  index <= currentStep
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {index <= currentStep ? '✓' : index + 1}
                </div>
                <p className={`mt-2 text-xs font-semibold capitalize ${index <= currentStep ? 'text-green-600' : 'text-gray-400'}`}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <h3 className="font-bold text-green-800 mb-2">🙋 Want to Help?</h3>
            <p className="text-green-700 text-sm mb-4">Join our volunteer network and respond to cases like this.</p>
            <Link to="/volunteer" className="bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition inline-block">
              Become a Volunteer
            </Link>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-2">👨‍⚕️ Need a Vet?</h3>
            <p className="text-blue-700 text-sm mb-4">Find verified vets near you who can help with this case.</p>
            <Link to="/vets" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition inline-block">
              Find a Vet
            </Link>
          </div>
        </div>

        {/* Donate CTA */}
        <div className="bg-green-700 text-white rounded-2xl p-6 text-center">
          <h3 className="font-bold text-xl mb-2">Help Fund This Rescue ❤️</h3>
          <p className="text-green-200 text-sm mb-4">Your donation directly helps rescue and treat animals in need.</p>
          <Link to="/donate" className="bg-white text-green-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition inline-block">
            Donate Now
          </Link>
        </div>

      </div>
    </div>
  )
}

export default RescueDetail