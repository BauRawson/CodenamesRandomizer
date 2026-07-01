import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../lib/useGames.js'
import AuthModal from './AuthModal.jsx'

function LogoIcon() {
  return (
    <img src="/icon-96.png" alt="Michicho cat mascot" width="32" height="32" />
  )
}

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/games', label: 'Games' },
  { to: '/categories', label: 'Categories' },
]

export default function Navbar() {
  const user = useAuth()
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [menuOpen, setMenuOpen] = useState(false)

  function openAuth(mode) {
    setAuthMode(mode)
    setAuthOpen(true)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-black text-xl text-brand-navy flex-shrink-0">
            <LogoIcon />
            <span>michicho</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg font-bold text-sm transition-colors ${
                    isActive
                      ? 'bg-brand-peach text-brand-orange'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2 flex-1 max-w-xs">
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search games..."
              className="bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Auth */}
          <div className="ml-auto flex items-center gap-2 flex-shrink-0">
            {user ? (
              <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-white font-black text-sm">
                {user.email?.[0]?.toUpperCase() ?? '?'}
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuth('login')}
                  className="hidden md:block px-4 py-2 font-bold text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="px-4 py-2 font-bold text-sm bg-brand-orange text-white rounded-xl hover:bg-brand-orange-light transition-colors flex items-center gap-1"
                >
                  Sign up <span>🐾</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(o => !o)}>
            <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl font-bold text-sm ${
                    isActive ? 'bg-brand-peach text-brand-orange' : 'text-gray-700'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} onSwitch={setAuthMode} />
    </>
  )
}
