import { Link } from 'react-router-dom'
import GameCard from './GameCard.jsx'

export default function GameSection({ title, icon, games, viewAllHref, cardSize = 'md' }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h2 className="font-black text-xl text-brand-navy flex items-center gap-2">
          {icon && <span>{icon}</span>} {title}
        </h2>
        {viewAllHref && (
          <Link to={viewAllHref} className="text-brand-orange font-bold text-sm hover:underline flex items-center gap-1">
            View all <span>→</span>
          </Link>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 md:px-0 pb-2 scrollbar-hide">
        {games.map(game => (
          <GameCard key={game.id} game={game} size={cardSize} />
        ))}
      </div>
    </section>
  )
}
