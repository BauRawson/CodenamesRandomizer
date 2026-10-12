import { MOCK_GAMES, getGameBySlug } from '../data/mockGames.js'

const isFamily = g => g.is_family || g.category === 'family'
const isListed = g => !isFamily(g) && !g.is_unlisted
const PUBLIC_GAMES = MOCK_GAMES.filter(isListed)

export function useGames() {
  return { games: PUBLIC_GAMES, loading: false }
}

export function useGame(slug) {
  return { game: getGameBySlug(slug), loading: false }
}
