import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useGame } from '../lib/useGames.js'

export default function GamePlayPage() {
  const { slug } = useParams()
  const { game } = useGame(slug)
  const [fullscreen, setFullscreen] = useState(false)

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
            to={`/games/${slug}`}
            className="text-gray-400 hover:text-white font-bold text-sm transition-colors"
          >
            ← {game.title}
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
          src={game.play_url}
          title={game.title}
          className="w-full h-full border-0"
          style={{ minHeight: fullscreen ? undefined : 'calc(100vh - 48px)' }}
          allow="fullscreen; autoplay"
        />
      </div>
    </div>
  )
}
