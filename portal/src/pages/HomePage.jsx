import GameSection from '../components/GameSection.jsx'
import CategoryGrid from '../components/CategoryGrid.jsx'
import { useGames } from '../lib/useGames.js'

export default function HomePage() {
  const { games } = useGames()

  const featured = games.filter(g => g.is_featured)
  const newest = games.filter(g => g.is_new || g.coming_soon)

  return (
    <main className="max-w-7xl mx-auto py-6">

      <GameSection
        title="Trending games"
        icon="🔥"
        games={featured.length ? featured : games.slice(0, 4)}
        viewAllHref="/games"
        cardSize="lg"
      />

      {newest.length > 0 && (
        <GameSection
          title="New games"
          icon="✨"
          games={newest}
          viewAllHref="/games"
          cardSize="md"
        />
      )}

      <CategoryGrid />

      {/* Features strip */}
      <section className="mx-4 md:mx-0 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '⚡', title: 'No downloads', desc: 'Play instantly in your browser.' },
          { icon: '☁️', title: 'Play anywhere', desc: 'On any device, anytime.' },
          { icon: '🏆', title: 'Earn achievements', desc: 'Collect, compete, be the best.' },
          { icon: '👥', title: 'Play with friends', desc: 'Multiplayer games & more!' },
        ].map(f => (
          <div key={f.title} className="bg-white rounded-2xl p-5 flex flex-col gap-2 border border-gray-100 shadow-sm">
            <span className="text-2xl">{f.icon}</span>
            <p className="font-black text-brand-navy text-sm">{f.title}</p>
            <p className="text-gray-400 text-xs">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
