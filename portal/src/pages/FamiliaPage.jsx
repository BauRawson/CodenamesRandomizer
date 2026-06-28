import { Link } from 'react-router-dom'
import { getFamilyGames } from '../data/mockGames.js'
import GameCard from '../components/GameCard.jsx'

export default function FamiliaPage() {
  const familyGames = getFamilyGames()

  return (
    <main className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl px-8 py-12 mb-10 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 text-[120px] leading-none select-none flex flex-wrap gap-4 overflow-hidden pointer-events-none">
          🏠🎮🃏🎭🧠
        </div>
        <div className="relative z-10">
          <p className="text-5xl mb-4">🏠</p>
          <h1 className="font-black text-4xl md:text-5xl mb-3">Familia</h1>
          <p className="text-purple-200 font-semibold text-lg max-w-xl mx-auto">
            Juegos para toda la familia. Diseñados para jugar juntos en casa,
            con un televisor y los celulares como controles.
          </p>
        </div>
      </div>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="font-black text-2xl text-brand-navy mb-5">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: '1', icon: '📺', title: 'Abre en el televisor', desc: 'Entra a michicho.com desde el navegador del TV o Chrome Cast.' },
            { step: '2', icon: '📱', title: 'Escanea desde el celular', desc: 'Los jugadores abren el juego en su celular y se conectan con un código.' },
            { step: '3', icon: '🎮', title: '¡A jugar!', desc: 'El TV muestra el tablero y los celulares son los controles. ¡Sin descargar nada!' },
          ].map(s => (
            <div key={s.step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-black text-purple-600 flex-shrink-0">
                {s.step}
              </div>
              <div>
                <p className="font-black text-brand-navy mb-1">{s.icon} {s.title}</p>
                <p className="text-gray-500 text-sm font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Games grid */}
      <section>
        <h2 className="font-black text-2xl text-brand-navy mb-5">Juegos disponibles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {familyGames.map(game => (
            <div key={game.id} className="flex flex-col gap-3">
              <GameCard game={game} size="lg" />
              {!game.coming_soon && (
                <Link
                  to={`/play/${game.slug}`}
                  className="text-center bg-brand-orange text-white font-black py-2.5 rounded-xl hover:bg-brand-orange-light transition-colors text-sm shadow-md shadow-brand-orange/20"
                >
                  ▶ Jugar
                </Link>
              )}
            </div>
          ))}

          {/* Mapa — color-only board for physical Codenames */}
          <div className="flex flex-col gap-3">
            <a
              href="/play/codigo-secreto.html?mode=mapa"
              className="group block flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              style={{ width: 200 }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AEDcc, #7C3AED)', height: 160 }}
              >
                <span style={{ fontSize: 64 }}>🗺️</span>
              </div>
              <div className="p-3">
                <p className="font-bold text-brand-navy text-sm leading-tight truncate">Mapa</p>
                <p className="text-xs text-gray-400 mt-0.5">herramienta</p>
              </div>
            </a>
            <a
              href="/play/codigo-secreto.html?mode=mapa"
              className="text-center bg-brand-orange text-white font-black py-2.5 rounded-xl hover:bg-brand-orange-light transition-colors text-sm shadow-md shadow-brand-orange/20"
            >
              ▶ Abrir
            </a>
          </div>
        </div>
      </section>

      {/* Tech note */}
      <div className="mt-8 bg-brand-cream rounded-2xl p-6 border border-brand-peach">
        <p className="font-black text-brand-navy mb-1">🔧 Tecnología</p>
        <p className="text-gray-500 text-sm font-medium">
          Los juegos Familia usan WebRTC para conectar dispositivos en tiempo real sin servidores.
          Todos los datos viajan directamente entre tus dispositivos. Sin registro necesario para jugar.
        </p>
      </div>
    </main>
  )
}
