import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MOCK_GAMES } from '../data/mockGames.js'

// Web3Forms relays submissions to the inbox tied to this key, so the
// destination address never appears in the page. The key is safe to publish.
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

const TOPICS = ['Bug or crash', 'Purchases / restore', 'Ads', 'Feedback or idea', 'Other']

export default function SupportPage() {
  const [params] = useSearchParams()
  const preselected = MOCK_GAMES.find(g => g.slug === params.get('game'))
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    const title = preselected ? `${preselected.title} Support | Michicho` : 'Support | Michicho'
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = `Need help with ${preselected ? preselected.title : 'a Michicho game'}? Send us a message and we'll get back to you by email.`
  }, [preselected])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    if (form.get('botcheck')) return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[Support] ${form.get('game')} – ${form.get('topic')}`,
          from_name: 'Michicho Support Form',
          name: form.get('name') || 'Anonymous',
          email: form.get('email'),
          game: form.get('game'),
          topic: form.get('topic'),
          device: form.get('device'),
          message: form.get('message'),
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setStatus('sent')
      e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  const input = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900'
  const label = 'block font-black text-sm text-gray-700 mb-1.5'

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="font-black text-3xl md:text-4xl text-gray-900 mb-2">
        {preselected ? `${preselected.title} Support` : 'Support'}
      </h1>
      <p className="text-gray-500 font-semibold mb-8">
        Found a bug, lost a purchase, or have an idea? Send us a message and we'll reply by email,
        usually within 2 business days.
      </p>

      {status === 'sent' ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
          <p className="text-4xl mb-3">🐾</p>
          <p className="font-black text-xl text-gray-900 mb-2">Message sent!</p>
          <p className="text-gray-500 font-semibold mb-6">Thanks for reaching out. We'll get back to you soon.</p>
          <button
            onClick={() => setStatus('idle')}
            className="bg-gray-900 text-white font-black px-6 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 md:p-8 border border-gray-100 shadow-sm flex flex-col gap-5">
          {/* Honeypot: real users never see or fill this */}
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label htmlFor="game" className={label}>Game</label>
            <select id="game" name="game" required defaultValue={preselected?.title ?? ''} className={input}>
              <option value="" disabled>Choose a game…</option>
              {MOCK_GAMES.filter(g => !g.coming_soon).map(g => (
                <option key={g.slug} value={g.title}>{g.title}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="topic" className={label}>Topic</label>
            <select id="topic" name="topic" required defaultValue="" className={input}>
              <option value="" disabled>What's it about?</option>
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={label}>Name <span className="text-gray-400 font-semibold">(optional)</span></label>
              <input id="name" name="name" type="text" autoComplete="name" className={input} />
            </div>
            <div>
              <label htmlFor="email" className={label}>Your email</label>
              <input id="email" name="email" type="email" required autoComplete="email" className={input} />
            </div>
          </div>

          <div>
            <label htmlFor="device" className={label}>Device & OS version <span className="text-gray-400 font-semibold">(optional)</span></label>
            <input id="device" name="device" type="text" placeholder="e.g. iPhone 15, iOS 19.1" className={input} />
          </div>

          <div>
            <label htmlFor="message" className={label}>Message</label>
            <textarea id="message" name="message" required rows={6} placeholder="Tell us what happened…" className={input} />
          </div>

          {status === 'error' && (
            <p className="text-red-600 font-bold text-sm">Something went wrong sending your message. Please try again in a moment.</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-gray-900 text-white font-black py-3 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </main>
  )
}
