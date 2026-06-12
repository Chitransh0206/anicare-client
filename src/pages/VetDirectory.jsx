import { useState, useEffect } from 'react'
import axios from 'axios'

function VetDirectory() {
  const [vets, setVets] = useState([])

  useEffect(() => {
    axios.get('https://anicare-server-production.up.railway.app/api/vets')
      .then(res => setVets(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="min-h-screen bg-green-50 py-16 px-8">
      <h2 className="text-3xl font-bold text-green-800 mb-2 text-center">Vet Directory</h2>
      <p className="text-center text-gray-500 mb-10">Find verified vets near you</p>
      {vets.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No vets listed yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {vets.map(vet => (
            <div key={vet.id} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-green-700">{vet.name}</h3>
              <p className="text-gray-500 mt-1">{vet.city}</p>
              <p className="text-gray-500">{vet.phone}</p>
              <span className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${vet.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {vet.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VetDirectory