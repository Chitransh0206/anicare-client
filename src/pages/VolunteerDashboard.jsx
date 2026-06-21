import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../services/api'

function VolunteerDashboard() {
  const [user, setUser] = useState(null)
  const [rescues, setRescues] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
    if (!storedUser) {
      navigate('/login')
      return
    }
    setUser(storedUser)

    API.get('/api/rescues')
      .then(res => {
        setRescues(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const stats = {
    total: rescues.length,
    pending: rescues.filter(r => r.status === 'pending').length,
    inProgress: rescues.filter(r => r.status === 'in-progress').length,
    resolved: rescues.filter(r => r.status === 'resolved').length
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-green-700 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name}! 🐾</h1>
              <p className="text-green-200 mt-1">Volunteer Dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
            <p className="text-gray-500 text-sm mt-1">Total Cases</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-5 text-center shadow-sm border border-red-100">
            <h3 className="text-3xl font-bold text-red-600">{stats.pending}</h3>
            <p className="text-red-500 text-sm mt-1">Pending</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-5 text-center shadow-sm border border-yellow-100">
            <h3 className="text-3xl font-bold text-yellow-600">{stats.inProgress}</h3>
            <p className="text-yellow-500 text-sm mt-1">In Progress</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-5 text-center shadow-sm border border-green-100">
            <h3 className="text-3xl font-bold text-green-600">{stats.resolved}</h3>
            <p className="text-green-500 text-sm mt-1">Resolved</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/rescue" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
            <span className="text-3xl">🚨</span>
            <div>
              <h3 className="font-bold text-gray-800">Report Rescue</h3>
              <p className="text-gray-500 text-sm">Report an animal in distress</p>
            </div>
          </Link>
          <Link to="/vets" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
            <span className="text-3xl">👨‍⚕️</span>
            <div>
              <h3 className="font-bold text-gray-800">Find a Vet</h3>
              <p className="text-gray-500 text-sm">Connect with nearby vets</p>
            </div>
          </Link>
          <Link to="/donate" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center gap-4">
            <span className="text-3xl">❤️</span>
            <div>
              <h3 className="font-bold text-gray-800">Donate</h3>
              <p className="text-gray-500 text-sm">Support animal rescue</p>
            </div>
          </Link>
        </div>

        {/* Recent Rescues */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Rescue Cases</h2>
            <Link to="/feed" className="text-green-700 text-sm font-semibold hover:underline">View All →</Link>
          </div>

          {loading && (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🐾</div>
              <p className="text-gray-500">Loading cases...</p>
            </div>
          )}

          {!loading && rescues.length === 0 && (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500">No rescue cases yet.</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {rescues.slice(0, 5).map(rescue => (
              <Link to={`/rescue/${rescue.id}`} key={rescue.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {rescue.animalType === 'Dog' ? '🐕' : rescue.animalType === 'Cat' ? '🐈' : rescue.animalType === 'Bird' ? '🐦' : '🐾'}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">{rescue.animalType}</p>
                    <p className="text-gray-500 text-xs">📍 {rescue.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    rescue.status === 'pending' ? 'bg-red-100 text-red-600' :
                    rescue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {rescue.status}
                  </span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default VolunteerDashboard