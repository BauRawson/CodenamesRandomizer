export const CATEGORIES = [
  { slug: 'action', label: 'Action', icon: '⚔️' },
  { slug: 'adventure', label: 'Adventure', icon: '🗺️' },
  { slug: 'puzzle', label: 'Puzzle', icon: '🧩' },
  { slug: 'rpg', label: 'RPG', icon: '🛡️' },
  { slug: 'strategy', label: 'Strategy', icon: '♟️' },
  { slug: 'idle', label: 'Idle', icon: '⏱️' },
  { slug: 'multiplayer', label: 'Multiplayer', icon: '👥' },
  { slug: 'racing', label: 'Racing', icon: '🏎️' },
  { slug: 'sports', label: 'Sports', icon: '⚽' },
  { slug: 'words', label: 'Words', icon: '🔤' },
  { slug: 'casual', label: 'Casual', icon: '🎲' },
  { slug: 'meme', label: 'Meme', icon: '😂' },
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
    id: 'pop-pop',
    slug: 'pop-pop',
    title: 'POP POP!',
    description: 'A voxel shooter where a cannon-toting pig pops colourful blocks that make up pictures — a duck, a football, a present and hundreds more. Clear each model before it wins, grab power-ups, and earn coins as you go.',
    how_to_play: 'Tap or click to aim and fire at the voxel blocks. Destroy every block of the model to finish the level. Collect coins and spend them on power-ups for the tougher levels.',
    category: 'action',
    thumbnail_url: '/thumbnails/pop-pop.webp',
    play_url: '/play/pop-pop/embed/index.html',
    is_featured: true,
    is_new: true,
    player_count: 0,
    tags: ['shooter', 'voxel', 'casual', 'arcade'],
    color: '#EA580C',
  },
  {
    id: 'where-kitty',
    slug: 'where-kitty',
    title: 'Where Kitty?',
    description: 'A cosy hidden-object game where you search richly illustrated worlds — from jurassic jungles to amusement parks and the ocean floor — to find every cat hiding in the scene. Zoom, pan and tap to rescue them all.',
    how_to_play: 'Drag to pan and pinch or scroll to zoom. Tap or click a hidden cat to find it. Find every cat in a level to complete it and unlock the next world.',
    category: 'puzzle',
    thumbnail_url: '/thumbnails/where-kitty.webp',
    play_url: '/play/where-kitty/embed/index.html',
    is_featured: true,
    is_new: true,
    player_count: 0,
    tags: ['puzzle', 'hidden-object', 'casual', 'cats'],
    color: '#F75F3E',
  },
  {
    id: 'ricochet-dungeon',
    slug: 'ricochet-dungeon',
    title: 'Ricochet Dungeon',
    description: 'An idle dungeon crawler where fantasy heroes bounce around the arena on their own, smashing slimes and monsters for gold. Spend it on new heroes and upgrades, and push through ever-tougher waves.',
    how_to_play: 'Heroes move and fight automatically. Tap or hold the upgrade buttons in the shop to buy more heroes and permanent upgrades. Your progress saves automatically.',
    category: 'idle',
    thumbnail_url: '/thumbnails/ricochet-dungeon.webp',
    play_url: '/play/ricochet-dungeon/embed/index.html',
    is_new: true,
    player_count: 0,
    tags: ['idle', 'incremental', 'rpg', 'casual'],
    color: '#7C3AED',
  },
  // Unlisted — no card, not in any listing/sitemap, reachable only via direct /play/:slug link
  {
    id: 'unlisted-tower-defense',
    slug: 'tower-defense',
    title: 'Tower Defense',
    description: 'Defold-built tower defense game.',
    category: 'strategy',
    thumbnail_url: null,
    play_url: '/play/tower-defense/embed/index.html',
    is_unlisted: true,
    player_count: 0,
    tags: ['strategy', 'tower-defense'],
    color: '#334155',
  },
  {
    id: 'anulo-mufa',
    slug: 'anulo-mufa',
    title: 'AnuloMufa',
    description: 'A Counter-Strike 1.6-style FPS where you gun down cardboard cutouts of Argentina\'s most legendary "mufa" (jinx) icons — Mick Jagger, Carlos Menem, and El Colorado Liberman.',
    how_to_play: 'Hold TAB in-game to see the full controls. Move with WASD, aim and shoot with the mouse, and reload before the clock runs out — rack up the highest score before time\'s up.',
    category: 'meme',
    thumbnail_url: '/thumbnails/anulo-mufa.webp',
    play_url: '/play/anulo-mufa/embed/index.html',
    is_new: true,
    player_count: 0,
    tags: ['fps', 'shooter', 'meme', 'arcade'],
    color: '#1E3A8A',
  },
  {
    id: 'unlisted-dream-room',
    slug: 'dream-room',
    title: 'Dream Room',
    description: 'Unity test build.',
    category: 'action',
    thumbnail_url: null,
    play_url: '/play/dream-room/embed/index.html',
    is_unlisted: true,
    player_count: 0,
    tags: ['debug'],
    color: '#334155',
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
