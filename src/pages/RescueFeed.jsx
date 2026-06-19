import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'

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

function RescueFeed() {
  const [rescues, setRescues] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    API.get('/api/rescues')
      .then(res => {
        setRescues(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? rescues : rescues.filter(r => r.status === filter)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-green-600 font-semibold mb-1">Live Updates</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Rescue Feed</h2>
          <p className="text-gray-500 mt-2">All active and recent animal rescue cases</p>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap justify-center">
          {['all', 'pending', 'in-progress', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                filter === f
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
              }`}
            >
              {f === 'all' ? '🐾 All' : f === 'pending' ? '🚨 Pending' : f === 'in-progress' ? '🔄 In Progress' : '✅ Resolved'}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-gray-500">Loading rescue cases...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No rescue cases found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(rescue => (
            <Link to={`/rescue/${rescue.id}`} key={rescue.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 border border-gray-100 block">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{animalEmojis[rescue.animalType] || '🐾'}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{rescue.animalType}</h3>
                    <p className="text-gray-500 text-sm">📍 {rescue.location}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[rescue.status] || 'bg-gray-100 text-gray-600'}`}>
                  {rescue.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{rescue.description}</p>
              {rescue.imageUrl && (
                <img src={rescue.imageUrl} alt={rescue.animalType} className="w-full h-40 object-cover rounded-xl mb-4" />
              )}
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-xs">
                  🕐 {new Date(rescue.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <span className="text-green-600 text-xs font-semibold">Case #{rescue.id}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RescueFeed