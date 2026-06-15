import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-12 pb-6 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">🐾 ANIcare</h2>
          <p className="text-green-300 text-sm leading-relaxed">
            Connecting animals in distress with volunteers, vets, and caring people across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/rescue" className="text-green-300 hover:text-white text-sm">Report an Animal</Link>
            <Link to="/volunteer" className="text-green-300 hover:text-white text-sm">Become a Volunteer</Link>
            <Link to="/vets" className="text-green-300 hover:text-white text-sm">Find a Vet</Link>
            <Link to="/donate" className="text-green-300 hover:text-white text-sm">Donate</Link>
          </div>
        </div>

        {/* Emergency */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Emergency</h3>
          <div className="flex flex-col gap-2">
            <p className="text-green-300 text-sm">🚨 Animal Helpline</p>
            <p className="text-white font-semibold">1800-123-4567</p>
            <p className="text-green-300 text-sm">📧 help@anicare.in</p>
            <p className="text-green-300 text-sm">Available 24/7</p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-green-300 hover:text-white text-sm">📘 Facebook</a>
            <a href="#" className="text-green-300 hover:text-white text-sm">📸 Instagram</a>
            <a href="#" className="text-green-300 hover:text-white text-sm">🐦 Twitter</a>
            <a href="#" className="text-green-300 hover:text-white text-sm">▶️ YouTube</a>
          </div>
        </div>

      </div>

      <div className="border-t border-green-700 pt-6 text-center">
        <p className="text-green-400 text-sm">© 2026 ANIcare. Made with ❤️ for animals across India.</p>
      </div>
    </footer>
  )
}

export default Footer