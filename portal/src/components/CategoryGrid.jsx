import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/mockGames.js'

export default function CategoryGrid() {
  return (
    <section className="mb-10 px-4 md:px-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-xl text-brand-navy">Browse by category</h2>
        <Link to="/categories" className="text-brand-orange font-bold text-sm hover:underline flex items-center gap-1">
          See all →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            to={`/categories/${cat.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-100 rounded-full font-bold text-sm text-gray-700 hover:border-brand-orange hover:text-brand-orange transition-all hover:shadow-sm"
          >
            <span>{cat.icon}</span>
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
