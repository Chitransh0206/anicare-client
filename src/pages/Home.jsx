import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-green-50 py-20 text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-4">
          Every Animal Deserves Help 🐾
        </h1>
        <p className="text-xl text-green-600 mb-8 max-w-2xl mx-auto">
          ANIcare connects animals in distress with volunteers, vets, and caring people like you.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/rescue" className="bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800">
            Report an Animal
          </Link>
          <Link to="/donate" className="bg-white text-green-700 border-2 border-green-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-50">
            Donate Now
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-8 px-20 py-16 bg-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-700">500+</h2>
          <p className="text-gray-600 mt-2">Animals Rescued</p>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-700">200+</h2>
          <p className="text-gray-600 mt-2">Active Volunteers</p>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-700">50+</h2>
          <p className="text-gray-600 mt-2">Partner Vets</p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-green-50 py-16 px-20">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">How It Works</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl text-center shadow-sm">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">Report</h3>
            <p className="text-gray-600">Spot an animal in distress? Report it instantly with location and photo.</p>
          </div>
          <div className="bg-white p-8 rounded-xl text-center shadow-sm">
            <div className="text-4xl mb-4">🙋</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">Connect</h3>
            <p className="text-gray-600">Nearby volunteers and vets get notified and respond quickly.</p>
          </div>
          <div className="bg-white p-8 rounded-xl text-center shadow-sm">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">Rescue</h3>
            <p className="text-gray-600">Animal gets the care it needs. Track the rescue in real time.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to Make a Difference?</h2>
        <p className="text-green-200 mb-8 text-lg">Join our volunteer network and help animals in your city.</p>
        <Link to="/volunteer" className="bg-white text-green-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100">
          Become a Volunteer
        </Link>
      </div>
    </div>
  )
}

export default Home