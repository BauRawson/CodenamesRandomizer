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
