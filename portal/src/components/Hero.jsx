import { Link } from 'react-router-dom'
import MascotSVG from './MascotSVG.jsx'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-cream via-brand-peach to-orange-100 rounded-3xl mx-4 md:mx-0 mb-10 px-8 py-10 md:py-14 flex items-center justify-between gap-8">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-brand-pink/10 rounded-full translate-y-1/2 pointer-events-none" />

      {/* Left content */}
      <div className="relative z-10 flex-1 min-w-0">
        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl text-brand-navy leading-tight">
          Play fun games.<br />
          <span className="text-brand-orange">Collect everything.</span>
        </h1>
        <p className="mt-4 text-gray-500 font-semibold text-base md:text-lg max-w-sm">
          From quick matches to epic adventures.<br />
          All in your browser. For free.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 bg-brand-orange text-white font-black px-7 py-3.5 rounded-2xl hover:bg-brand-orange-light transition-colors shadow-lg shadow-brand-orange/30 text-base"
          >
            Explore games →
          </Link>
          <Link
            to="/familia"
            className="inline-flex items-center gap-2 bg-white text-brand-navy font-black px-7 py-3.5 rounded-2xl hover:bg-gray-50 transition-colors border-2 border-gray-200 text-base"
          >
            🏠 Familia
          </Link>
        </div>
      </div>

      {/* Mascot */}
      <div className="relative z-10 flex-shrink-0 hidden sm:block">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-3xl scale-110" />
          <MascotSVG className="w-48 h-48 md:w-64 md:h-64 relative drop-shadow-xl" />
        </div>
      </div>

      {/* Sign-up card */}
      <div className="hidden lg:flex flex-col bg-white rounded-2xl shadow-xl p-5 w-60 flex-shrink-0 relative z-10">
        <p className="font-black text-brand-navy text-base mb-1">Save your progress!</p>
        <p className="text-gray-500 text-xs mb-4">Create a free account to earn rewards, unlock achievements and play anywhere.</p>
        <Link
          to="/signup"
          className="bg-brand-orange text-white font-black py-2.5 rounded-xl text-center text-sm hover:bg-brand-orange-light transition-colors"
        >
          Sign up for free 🐾
        </Link>
        <p className="text-center text-xs text-gray-400 mt-3">Already have an account? <Link to="/login" className="text-brand-orange font-bold">Log in</Link></p>
      </div>
    </div>
  )
}
