import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/mockGames.js'

export default function CategoryGrid() {
  return (
    <section className="mb-10 px-4 md:px-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-xl text-gray-900">Browse by category</h2>
        <Link to="/categories" className="text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors flex items-center gap-1">
          See all →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            to={`/categories/${cat.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full font-bold text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all"
          >
            <span>{cat.icon}</span>
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
