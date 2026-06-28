export const CATEGORIES = [
  { slug: 'action', label: 'Action', icon: '⚔️' },
  { slug: 'adventure', label: 'Adventure', icon: '🗺️' },
  { slug: 'puzzle', label: 'Puzzle', icon: '🧩' },
  { slug: 'rpg', label: 'RPG', icon: '🛡️' },
  { slug: 'strategy', label: 'Strategy', icon: '♟️' },
  { slug: 'idle', label: 'Idle', icon: '⏱️' },
  { slug: 'multiplayer', label: 'Multiplayer', icon: '👥' },
  { slug: 'racing', label: 'Racing', icon: '🏎️' },
]

export const MOCK_GAMES = [
  {
    id: '1',
    slug: 'codigo-secreto',
    title: 'Código Secreto',
    description: 'El clásico juego de palabras clave para toda la familia. Un jugador da pistas de una sola palabra para que su equipo adivine las palabras correctas en el tablero.',
    category: 'family',
    thumbnail_url: null,
    play_url: '/play/codigo-secreto.html',
    is_featured: true,
    is_new: false,
    is_family: true,
    player_count: 1240,
    tags: ['family', 'words', 'multiplayer', 'tv'],
    color: '#7C3AED',
  },
  {
    id: '2',
    slug: 'trivia',
    title: 'Trivia',
    description: '¿Cuánto sabes? Pon a prueba tus conocimientos en esta divertida trivia para jugar en familia o con amigos.',
    category: 'family',
    thumbnail_url: null,
    play_url: '/play/trivia.html',
    is_featured: true,
    is_new: false,
    is_family: true,
    player_count: 980,
    tags: ['family', 'trivia', 'multiplayer', 'tv'],
    color: '#0891B2',
  },
  {
    id: '3',
    slug: 'mimica',
    title: 'Mímica',
    description: 'Adivina la palabra con solo mímica. ¡Sin hablar! El juego perfecto para romper el hielo en cualquier reunión.',
    category: 'family',
    thumbnail_url: null,
    play_url: '/play/mimica.html',
    is_featured: true,
    is_new: false,
    is_family: true,
    player_count: 760,
    tags: ['family', 'acting', 'multiplayer', 'party'],
    color: '#059669',
  },
  {
    id: '4',
    slug: 'star-dash',
    title: 'Star Dash',
    description: 'Race through the galaxy collecting stars and dodging asteroids. How far can you go?',
    category: 'action',
    thumbnail_url: null,
    play_url: '/play/star-dash/',
    is_featured: false,
    is_new: true,
    player_count: 0,
    tags: ['action', 'arcade', 'coming-soon'],
    color: '#DC2626',
    coming_soon: true,
  },
]

export function getGameBySlug(slug) {
  return MOCK_GAMES.find(g => g.slug === slug) ?? null
}

export function getGamesByCategory(category) {
  return MOCK_GAMES.filter(g => g.category === category)
}

export function getFamilyGames() {
  return MOCK_GAMES.filter(g => g.category === 'family')
}

export function getFeaturedGames() {
  return MOCK_GAMES.filter(g => g.is_featured)
}

export function getNewGames() {
  return MOCK_GAMES.filter(g => g.is_new)
}
