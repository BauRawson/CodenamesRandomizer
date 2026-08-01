import { useParams, Link } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useGame } from '../lib/useGames.js'

function AdOverlay({ onDone }) {
  const [countdown, setCountdown] = useState(5)
  const canSkip = countdown <= 0

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(n => {
        if (n <= 1) { clearInterval(t); return 0 }
        return n - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="absolute inset-0 z-10 bg-black/95 flex flex-col items-center justify-center gap-5">
      <span className="absolute top-3 right-4 text-xs text-gray-500 font-medium tracking-widest uppercase">Advertisement</span>

      {/* Ad slot — swap this div for a real ad unit later */}
      <div className="w-full max-w-xl mx-6 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
        <p className="text-gray-600 font-black text-xl tracking-widest">AD SPACE</p>
      </div>

      <button
        onClick={canSkip ? onDone : undefined}
        className="px-8 py-2.5 rounded-full font-black text-sm transition-all"
        style={{
          background: canSkip ? '#FF6B35' : '#222',
          color: canSkip ? '#fff' : '#555',
          cursor: canSkip ? 'pointer' : 'default',
        }}
      >
        {canSkip ? 'Continue →' : `Skip in ${countdown}s`}
      </button>
    </div>
  )
}

function trackEvent(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
}

export default function GamePlayPage() {
  const { slug } = useParams()
  const { game } = useGame(slug)
  const [fullscreen, setFullscreen] = useState(false)
  const [adVisible, setAdVisible] = useState(false)
  const iframeRef = useRef(null)
  const startTime = useRef(Date.now())

  const dismissAd = useCallback(() => {
    setAdVisible(false)
    iframeRef.current?.contentWindow?.postMessage({ type: 'michi_ad_done' }, '*')
  }, [])

  useEffect(() => {
    if (!game) return
    startTime.current = Date.now()
    trackEvent('game_start', { game_slug: game.slug, game_title: game.title, game_category: game.category })
    return () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000)
      trackEvent('game_end', { game_slug: game.slug, game_title: game.title, seconds_played: seconds })
    }
  }, [game?.slug])

  useEffect(() => {
    function handleMessage(e) {
      if (!e.data || typeof e.data !== 'object') return
      const { type, event, data, id } = e.data
      switch (type) {
        case 'michi_ad':
          setAdVisible(true)
          break
        case 'michi_track':
          if (typeof window.gtag === 'function') window.gtag('event', event, data ?? {})
          console.log('[Michi] track:', event, data)
          break
        case 'michi_achievement':
          console.log('[Michi] achievement:', id)
          break
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😿</div>
          <p className="font-black text-brand-navy text-xl">Game not found</p>
          <Link to="/games" className="text-brand-orange font-bold hover:underline mt-2 block">← Back</Link>
        </div>
      </div>
    )
  }

  if (game.coming_soon) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-7xl mb-6">🚧</div>
          <h1 className="font-black text-4xl text-brand-navy mb-3">{game.title}</h1>
          <p className="text-gray-500 font-semibold text-lg mb-8">This game is coming soon. Stay tuned! 🐾</p>
          <Link to={`/games/${slug}`} className="bg-brand-orange text-white font-black px-8 py-3.5 rounded-2xl hover:bg-brand-orange-light transition-colors shadow-lg shadow-brand-orange/30">
            ← Go back
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col ${fullscreen ? 'fixed inset-0 z-50 bg-black' : 'min-h-screen bg-brand-navy'}`}>
      {/* Toolbar */}
      <div className={`flex items-center justify-between px-4 py-2 ${fullscreen ? 'bg-black/80' : 'bg-brand-navy'}`}>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-gray-400 hover:text-white font-bold text-sm transition-colors"
          >
            ← Home
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFullscreen(f => !f)}
            className="text-gray-400 hover:text-white font-bold text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
          >
            {fullscreen ? '⊡ Exit fullscreen' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>

      {/* Game iframe */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={game.play_url}
          title={game.title}
          className="w-full h-full border-0"
          style={{ minHeight: fullscreen ? undefined : 'calc(100vh - 48px)' }}
          allow="fullscreen; autoplay"
        />
        {adVisible && <AdOverlay onDone={dismissAd} />}
      </div>
    </div>
  )
}
