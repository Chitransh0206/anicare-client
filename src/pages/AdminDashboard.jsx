import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [volunteers, setVolunteers] = useState([])
  const [donations, setDonations] = useState([])
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, volunteersRes, donationsRes, usersRes] = await Promise.all([
        API.get('/api/admin/stats'),
        API.get('/api/admin/volunteers'),
        API.get('/api/admin/donations'),
        API.get('/api/admin/users')
      ])
      setStats(statsRes.data)
      setVolunteers(volunteersRes.data)
      setDonations(donationsRes.data)
      setUsers(usersRes.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const approveVolunteer = async (id) => {
    try {
      await API.put(`/api/admin/volunteers/${id}/approve`)
      setVolunteers(volunteers.map(v => v.id === id ? { ...v, approved: true } : v))
    } catch (err) {
      console.log(err)
    }
  }

  const makeAdmin = async (id) => {
    try {
      await API.put(`/api/admin/users/${id}/role`, { role: 'admin' })
      setUsers(users.map(u => u.id === id ? { ...u, role: 'admin' } : u))
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🐾</div>
        <p className="text-gray-500">Loading admin panel...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-green-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">🛡️ Admin Panel</h1>
          <p className="text-green-300 mt-1">Manage ANIcare — users, volunteers, donations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 flex gap-0 overflow-x-auto">
          {['overview', 'volunteers', 'donations', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold capitalize border-b-2 transition whitespace-nowrap ${
                activeTab === tab
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'overview' ? '📊 Overview' : tab === 'volunteers' ? '🙋 Volunteers' : tab === 'donations' ? '❤️ Donations' : '👥 Users'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                <h3 className="text-3xl font-bold text-green-700">{stats.users}</h3>
                <p className="text-gray-500 text-sm mt-1">Total Users</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                <h3 className="text-3xl font-bold text-blue-600">{stats.volunteers}</h3>
                <p className="text-gray-500 text-sm mt-1">Volunteers</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                <h3 className="text-3xl font-bold text-red-600">{stats.rescues}</h3>
                <p className="text-gray-500 text-sm mt-1">Rescues</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                <h3 className="text-3xl font-bold text-purple-600">{stats.vets}</h3>
                <p className="text-gray-500 text-sm mt-1">Vets</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <h3 className="text-3xl font-bold text-yellow-600">₹{stats.totalDonations}</h3>
                <p className="text-gray-500 text-sm mt-1">Total Donated</p>
              </div>
            </div>
          </div>
        )}

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Volunteers ({volunteers.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {volunteers.map(vol => (
                <div key={vol.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{vol.name}</h3>
                      <p className="text-gray-500 text-sm">📧 {vol.email}</p>
                      <p className="text-gray-500 text-sm">📞 {vol.phone}</p>
                      <p className="text-gray-500 text-sm">📍 {vol.city}</p>
                      <p className="text-gray-500 text-sm mt-1">🛠️ {vol.skills}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${vol.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-600'}`}>
                        {vol.approved ? '✅ Approved' : '⏳ Pending'}
                      </span>
                      {!vol.approved && (
                        <button
                          onClick={() => approveVolunteer(vol.id)}
                          className="bg-green-700 text-white px-4 py-1.5 rounded-xl text-xs font-semibold hover:bg-green-800 transition"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Donations ({donations.length})</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(don => (
                    <tr key={don.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{don.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{don.email}</td>
                      <td className="px-6 py-4 text-sm font-bold text-green-700">₹{don.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${don.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-600'}`}>
                          {don.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(don.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Users ({users.length})</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Role</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => makeAdmin(user.id)}
                            className="bg-purple-600 text-white px-3 py-1 rounded-xl text-xs font-semibold hover:bg-purple-700 transition"
                          >
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminDashboard