import { Link } from 'react-router-dom'
import { VERSION } from '../version.js'

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-black text-xl mb-2">🐱 michicho</p>
          <p className="text-gray-400 text-sm">Play fun games online. No downloads. All free.</p>
        </div>
        <div>
          <p className="font-black text-sm mb-3 text-gray-300">Games</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link to="/games" className="hover:text-white transition-colors">All games</Link>
<Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
          </div>
        </div>
        <div>
          <p className="font-black text-sm mb-3 text-gray-300">Platform</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span>⚡ No downloads</span>
            <span>☁️ Play anywhere</span>
            <span>🏆 Earn achievements</span>
          </div>
        </div>
        <div>
          <p className="font-black text-sm mb-3 text-gray-300">Account</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link to="/login" className="hover:text-white transition-colors">Log in</Link>
            <Link to="/signup" className="hover:text-white transition-colors">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} Michicho. Made with 🧡 · v{VERSION}
      </div>
    </footer>
  )
}
