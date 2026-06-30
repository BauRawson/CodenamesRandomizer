import { Link } from 'react-router-dom'

const GAME_EMOJIS = {
  'codigo-secreto': '🔐',
  trivia: '🧠',
  mimica: '🎭',
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n > 0 ? String(n) : null
}

export default function GameCard({ game, size = 'md' }) {
  const isLarge = size === 'lg'
  const w = isLarge ? 200 : 160
  const h = isLarge ? 160 : 120
  const emoji = GAME_EMOJIS[game.slug] ?? '🎮'
  const count = formatCount(game.player_count)

  return (
    <Link
      to={`/play/${game.slug}`}
      className="group block flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      style={{ width: w }}
    >
      {/* Thumbnail */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${game.color}cc, ${game.color})`,
          height: h,
        }}
      >
        {game.thumbnail_url ? (
          <img
            src={game.thumbnail_url}
            alt={game.title}
            width={w}
            height={h}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <span style={{ fontSize: isLarge ? 64 : 52 }}>{emoji}</span>
        )}
        {game.is_new && (
          <span className="absolute top-2 left-2 bg-brand-pink text-white text-xs font-bold px-2 py-0.5 rounded-full">
            NEW
          </span>
        )}
        {game.coming_soon && (
          <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            SOON
          </span>
        )}
        {count && (
          <span className="absolute bottom-2 right-2 bg-black/40 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span>👥</span> {count}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="font-bold text-brand-navy text-sm leading-tight truncate">{game.title}</p>
        <p className="text-xs text-gray-400 mt-0.5 capitalize">{game.category}</p>
      </div>
    </Link>
  )
}
