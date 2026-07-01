import { useState } from 'react'
import { useGames } from '../lib/useGames.js'
import { CATEGORIES } from '../data/mockGames.js'
import GameCard from '../components/GameCard.jsx'

export default function GamesPage() {
  const { games, loading } = useGames()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = games.filter(g => {
    const matchCat = activeCategory === 'all' || g.category === activeCategory
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="font-black text-3xl text-gray-900 mb-6">All Games</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍  Search games..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 font-medium text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-900 transition-colors w-full md:max-w-xs bg-white"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full font-bold text-sm border transition-all ${activeCategory === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full font-bold text-sm border transition-all flex items-center gap-1 ${activeCategory === cat.slug ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900'}`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Loading games...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🐱</div>
          <p className="font-black text-gray-900 text-xl">No games found</p>
          <p className="text-gray-400 mt-2">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(game => (
            <GameCard key={game.id} game={game} size="md" />
          ))}
        </div>
      )}
    </main>
  )
}
