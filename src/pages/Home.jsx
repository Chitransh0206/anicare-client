import { Link } from 'react-router-dom'

const rescueStories = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    animal: 'Dog',
    location: 'Jaipur, Rajasthan',
    status: 'Rescued',
    description: 'Injured stray dog found near highway, treated and rehomed.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    animal: 'Cat',
    location: 'Mumbai, Maharashtra',
    status: 'In Care',
    description: 'Malnourished kitten rescued from construction site.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
    animal: 'Bird',
    location: 'Delhi',
    status: 'Rescued',
    description: 'Injured bird with broken wing, now recovering well.'
  }
]

const volunteers = [
  {
    id: 1,
    name: 'Priya Sharma',
    city: 'Jaipur',
    rescues: 24,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    city: 'Mumbai',
    rescues: 18,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Anita Singh',
    city: 'Delhi',
    rescues: 31,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
]

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-green-900 text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1400&h=600&fit=crop"
          alt="Animals"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 py-24 px-6 text-center max-w-4xl mx-auto">
          <span className="bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-6 inline-block">
            🐾 India's Animal Rescue Network
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Every Animal Deserves <span className="text-green-400">Love & Care</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            ANIcare connects animals in distress with volunteers, vets, and caring people like you — across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rescue" className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition">
              🚨 Report an Animal
            </Link>
            <Link to="/donate" className="bg-white hover:bg-green-50 text-green-800 px-8 py-4 rounded-full text-lg font-semibold transition">
              ❤️ Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-700 text-white py-10 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">500+</h2>
            <p className="text-green-200 mt-1 text-sm">Animals Rescued</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">200+</h2>
            <p className="text-green-200 mt-1 text-sm">Active Volunteers</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">50+</h2>
            <p className="text-green-200 mt-1 text-sm">Partner Vets</p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">20+</h2>
            <p className="text-green-200 mt-1 text-sm">Cities Covered</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-600 font-semibold text-center mb-2">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">How ANIcare Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-green-50 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <span className="text-green-600 font-bold text-sm">STEP 1</span>
              <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2">Report</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Spot an animal in distress? Report it instantly with location and photo in under 2 minutes.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-green-50 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🙋</span>
              </div>
              <span className="text-green-600 font-bold text-sm">STEP 2</span>
              <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2">Connect</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Nearby volunteers and verified vets get notified instantly and respond quickly.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-green-50 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <span className="text-green-600 font-bold text-sm">STEP 3</span>
              <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2">Rescue</h3>
              <p className="text-gray-600 text-sm leading-relaxed">The animal gets the care it needs. Track the rescue status in real time.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Rescues */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-600 font-semibold text-center mb-2">Real Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Recent Rescues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rescueStories.map(story => (
              <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={story.image} alt={story.animal} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800">{story.animal}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{story.status}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-2">📍 {story.location}</p>
                  <p className="text-gray-600 text-sm">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/rescue" className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition">
              Report an Animal in Need
            </Link>
          </div>
        </div>
      </div>

      {/* Top Volunteers */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-green-600 font-semibold text-center mb-2">Our Heroes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Top Volunteers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {volunteers.map(vol => (
              <div key={vol.id} className="flex items-center gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                <img src={vol.image} alt={vol.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-gray-800">{vol.name}</h3>
                  <p className="text-gray-500 text-sm">📍 {vol.city}</p>
                  <p className="text-green-600 text-sm font-semibold mt-1">🐾 {vol.rescues} rescues</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/volunteer" className="border-2 border-green-700 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition">
              Join as Volunteer
            </Link>
          </div>
        </div>
      </div>

      {/* Donation CTA */}
      <div className="relative bg-green-900 text-white py-20 px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=1400&h=400&fit=crop"
          alt="Animals"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your ₹100 Can Save a Life</h2>
          <p className="text-green-200 mb-8 text-lg">Help us rescue, treat, and rehome animals across India.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate" className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition">
              Donate Now ❤️
            </Link>
            <Link to="/volunteer" className="bg-white hover:bg-green-50 text-green-800 px-8 py-4 rounded-full text-lg font-semibold transition">
              Volunteer with Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home