import { useState, useEffect } from 'react'
import API from '../services/api'

function VetDirectory() {
  const [vets, setVets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterAvailable, setFilterAvailable] = useState('all')

  useEffect(() => {
    API.get('/api/vets')
      .then(res => {
        setVets(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = vets.filter(vet => {
    const matchSearch = vet.name.toLowerCase().includes(search.toLowerCase()) ||
      vet.city.toLowerCase().includes(search.toLowerCase()) ||
      (vet.specialization && vet.specialization.toLowerCase().includes(search.toLowerCase()))
    const matchAvailable = filterAvailable === 'all' ? true : filterAvailable === 'available' ? vet.available : !vet.available
    return matchSearch && matchAvailable
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white py-14 px-6 text-center">
        <p className="text-green-300 font-semibold mb-2">Verified Professionals</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Find a Vet Near You</h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto">
          Connect with verified veterinarians across India for immediate animal care
        </p>
      </div>

      <div className="bg-white shadow-sm py-6 px-6 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-sm"
            placeholder="Search by name, city, or specialization..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {['all', 'available', 'unavailable'].map(f => (
              <button
                key={f}
                onClick={() => setFilterAvailable(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  filterAvailable === f
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'All' : f === 'available' ? 'Available' : 'Unavailable'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-green-700">{vets.length}</h3>
            <p className="text-gray-500 text-sm">Total Vets</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-green-700">{vets.filter(v => v.available).length}</h3>
            <p className="text-gray-500 text-sm">Available Now</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-green-700">{[...new Set(vets.map(v => v.city))].length}</h3>
            <p className="text-gray-500 text-sm">Cities Covered</p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-gray-500">Loading vets...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No vets found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(vet => (
            <div key={vet.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {vet.image ? (
                      <img src={vet.image} alt={vet.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">👨‍⚕️</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800 text-lg">Dr. {vet.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${vet.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {vet.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    {vet.specialization && (
                      <p className="text-green-600 text-sm font-medium mt-0.5">🩺 {vet.specialization}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">📍 {vet.city}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {vet.experience && (
                    <div className="bg-gray-50 rounded-xl px-3 py-2">
                      <p className="text-xs text-gray-400">Experience</p>
                      <p className="text-sm font-semibold text-gray-700">{vet.experience} years</p>
                    </div>
                  )}
                  {vet.timing && (
                    <div className="bg-gray-50 rounded-xl px-3 py-2">
                      <p className="text-xs text-gray-400">Timing</p>
                      <p className="text-sm font-semibold text-gray-700">{vet.timing}</p>
                    </div>
                  )}
                  {vet.address && (
                    <div className="bg-gray-50 rounded-xl px-3 py-2 col-span-2">
                      <p className="text-xs text-gray-400">Address</p>
                      <p className="text-sm font-semibold text-gray-700">{vet.address}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-3">
                  <a href={`tel:${vet.phone}`} className="flex-1 bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold text-center hover:bg-green-800 transition">
                    📞 Call Now
                  </a>
                  <a href={`mailto:${vet.email}`} className="flex-1 border-2 border-green-700 text-green-700 py-2.5 rounded-xl text-sm font-semibold text-center hover:bg-green-50 transition">
                    ✉️ Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VetDirectory