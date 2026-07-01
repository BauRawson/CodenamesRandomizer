import { useParams, Link } from 'react-router-dom'
import { CATEGORIES } from '../data/mockGames.js'
import { useGames } from '../lib/useGames.js'
import GameCard from '../components/GameCard.jsx'

export default function CategoriesPage() {
  const { slug } = useParams()
  const { games } = useGames()

  if (slug) {
    const cat = CATEGORIES.find(c => c.slug === slug)
    const catGames = games.filter(g => g.category === slug)
    return (
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-6">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/categories" className="hover:text-gray-900 transition-colors">Categories</Link>
          <span>›</span>
          <span className="text-gray-700">{cat?.label ?? slug}</span>
        </div>
        <h1 className="font-black text-3xl text-gray-900 mb-6">
          {cat?.icon} {cat?.label ?? slug}
        </h1>
        {catGames.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🐱</div>
            <p className="font-black text-gray-900 text-xl">No games yet in this category</p>
            <p className="text-gray-400 mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {catGames.map(g => <GameCard key={g.id} game={g} />)}
          </div>
        )}
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="font-black text-3xl text-gray-900 mb-8">Browse Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {CATEGORIES.map(cat => {
          const count = games.filter(g => g.category === cat.slug).length
          return (
            <Link
              key={cat.slug}
              to={`/categories/${cat.slug}`}
              className="bg-white border border-gray-100 hover:border-gray-900 rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-sm transition-all group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <p className="font-black text-gray-900 text-center">{cat.label}</p>
              <p className="text-gray-400 text-sm font-semibold">{count} game{count !== 1 ? 's' : ''}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
