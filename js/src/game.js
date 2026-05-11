import { words } from './words.js'

export const COLORS = ['#ed8099', '#4d65b4', '#fbb954', '#313638']

export function generateBoard() {
  const isTeamOneFirst = Math.random() < 0.5

  const tiles = [
    ...Array(isTeamOneFirst ? 9 : 8).fill(0),
    ...Array(isTeamOneFirst ? 8 : 9).fill(1),
    ...Array(7).fill(2),
    ...Array(1).fill(3),
  ]

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tiles[i], tiles[j]] = [tiles[j], tiles[i]]
  }

  // Pick 25 unique random words
  const pool = [...words]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const selectedWords = pool.slice(0, 25)

  return { tiles, isTeamOneFirst, words: selectedWords }
}
