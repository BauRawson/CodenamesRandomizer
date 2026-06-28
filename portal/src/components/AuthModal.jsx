import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function AuthModal({ open, mode, onClose, onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (!supabase) {
      setError('Backend not configured yet. Add your Supabase credentials to enable auth.')
      setLoading(false)
      return
    }
    const fn = mode === 'login'
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password })
    const { error: err } = await fn
    setLoading(false)
    if (err) { setError(err.message); return }
    if (mode === 'signup') { setDone(true); return }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" onClick={onClose}>✕</button>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🐱</div>
          <h2 className="font-black text-2xl text-brand-navy">
            {mode === 'login' ? 'Welcome back!' : 'Create account'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'login' ? 'Log in to save your progress' : 'Join Michicho for free'}
          </p>
        </div>

        {done ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">📧</div>
            <p className="font-bold text-brand-navy">Check your email!</p>
            <p className="text-gray-500 text-sm mt-2">We sent you a confirmation link.</p>
          </div>
        ) : (
          <>
            {/* Google */}
            <button
              onClick={() => supabase?.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 font-bold text-gray-700 hover:bg-gray-50 transition-colors mb-4"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 font-medium outline-none focus:border-brand-orange transition-colors"
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 font-medium outline-none focus:border-brand-orange transition-colors"
              />
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-orange text-white font-black py-3 rounded-xl hover:bg-brand-orange-light transition-colors disabled:opacity-60"
              >
                {loading ? '...' : mode === 'login' ? 'Log in' : 'Sign up for free 🐾'}
              </button>
            </form>
          </>
        )}

        <p className="text-center text-sm text-gray-500 mt-5">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            className="text-brand-orange font-bold hover:underline"
            onClick={() => onSwitch(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}
