import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGame } from '../lib/useGames.js'

const GAME_EMOJIS = {
  'codigo-secreto': '🔐',
  trivia: '🧠',
  mimica: '🎭',
  'star-dash': '🚀',
}

export default function GameDetailPage() {
  const { slug } = useParams()
  const { game, loading } = useGame(slug)
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl animate-bounce">🐱</div>
      </div>
    )
  }

  if (!game) {
    return (
      <main className="max-w-7xl mx-auto py-20 px-4 text-center">
        <div className="text-5xl mb-4">😿</div>
        <h1 className="font-black text-3xl text-brand-navy mb-2">Game not found</h1>
        <Link to="/games" className="text-brand-orange font-bold hover:underline">← Back to games</Link>
      </main>
    )
  }

  const emoji = GAME_EMOJIS[game.slug] ?? '🎮'
  const isFamilyGame = game.category === 'family'

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-6">
        <Link to="/" className="hover:text-brand-orange">Home</Link>
        <span>›</span>
        <Link to="/games" className="hover:text-brand-orange">Games</Link>
        <span>›</span>
        <span className="text-brand-navy">{game.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: game preview + play */}
        <div className="lg:col-span-2">
          {/* Thumbnail / preview */}
          <div
            className="w-full rounded-3xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${game.color}cc, ${game.color})`,
              height: 360,
            }}
          >
            <span style={{ fontSize: 120 }}>{emoji}</span>
            {game.coming_soon && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                <span className="text-white font-black text-3xl">Coming Soon</span>
                <span className="text-white/70 font-semibold">Stay tuned! 🐾</span>
              </div>
            )}
            {!game.coming_soon && (
              <Link
                to={`/play/${game.slug}`}
                className="absolute bottom-6 right-6 bg-white text-brand-orange font-black px-6 py-3 rounded-2xl shadow-lg hover:bg-brand-peach transition-colors flex items-center gap-2 text-lg"
              >
                ▶ Play Now
              </Link>
            )}
          </div>

          {/* Play button (mobile) */}
          {!game.coming_soon && (
            <Link
              to={`/play/${game.slug}`}
              className="lg:hidden mt-4 w-full flex items-center justify-center gap-2 bg-brand-orange text-white font-black py-4 rounded-2xl text-lg shadow-lg shadow-brand-orange/30 hover:bg-brand-orange-light transition-colors"
            >
              ▶ Play Now
            </Link>
          )}

          {/* Description */}
          <div className="mt-6">
            <h2 className="font-black text-xl text-brand-navy mb-2">About this game</h2>
            <p className="text-gray-600 font-medium leading-relaxed">{game.description}</p>
            {isFamilyGame && (
              <p className="mt-3 text-gray-500 text-sm font-medium">
                🏠 This is a <strong>Familia</strong> game — designed for families and groups. Works on TV + mobile devices.
              </p>
            )}
          </div>

          {/* Tags */}
          {game.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {game.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 capitalize">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: info card */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h1 className="font-black text-2xl text-brand-navy mb-1">{game.title}</h1>
            <p className="text-brand-orange font-bold capitalize text-sm mb-4">{game.category}</p>

            {!game.coming_soon ? (
              <Link
                to={`/play/${game.slug}`}
                className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white font-black py-3.5 rounded-2xl shadow-lg shadow-brand-orange/30 hover:bg-brand-orange-light transition-colors"
              >
                ▶ Play Now
              </Link>
            ) : (
              <button disabled className="w-full bg-gray-200 text-gray-400 font-black py-3.5 rounded-2xl cursor-not-allowed">
                Coming Soon
              </button>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="bg-brand-cream rounded-xl p-3">
                <p className="font-black text-brand-navy text-lg">{game.player_count > 0 ? (game.player_count / 1000).toFixed(1) + 'K' : '—'}</p>
                <p className="text-gray-400 text-xs font-semibold">Players</p>
              </div>
              <div className="bg-brand-cream rounded-xl p-3">
                <p className="font-black text-brand-navy text-lg capitalize">{game.category}</p>
                <p className="text-gray-400 text-xs font-semibold">Category</p>
              </div>
            </div>
          </div>

          {/* Multiplayer callout for family games */}
          {isFamilyGame && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-5">
              <p className="font-black text-purple-800 mb-1">👥 Multiplayer</p>
              <p className="text-purple-600 text-sm font-medium">Play on a TV screen while friends use their phones as controllers!</p>
            </div>
          )}

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="font-black text-brand-navy text-sm mb-3">Features</p>
            <ul className="flex flex-col gap-2 text-sm text-gray-500 font-medium">
              <li>⚡ No download required</li>
              <li>📱 Works on all devices</li>
              {isFamilyGame && <li>🖥️ TV + phone controller</li>}
              <li>🆓 Completely free</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
