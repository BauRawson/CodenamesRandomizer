import { useState, useEffect } from 'react'
import { supabase } from './supabase.js'
import { MOCK_GAMES, getGameBySlug as mockGetBySlug } from '../data/mockGames.js'

const PUBLIC_MOCK = MOCK_GAMES.filter(g => !g.is_family)

export function useGames() {
  const [games, setGames] = useState(PUBLIC_MOCK)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!supabase) return
    setLoading(true)
    supabase.from('games').select('*').order('player_count', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data?.length) setGames(data.filter(g => !g.is_family))
        setLoading(false)
      })
  }, [])

  return { games, loading }
}

export function useGame(slug) {
  const [game, setGame] = useState(() => mockGetBySlug(slug))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!supabase || !slug) return
    setLoading(true)
    supabase.from('games').select('*').eq('slug', slug).single()
      .then(({ data, error }) => {
        if (!error && data) setGame(data)
        setLoading(false)
      })
  }, [slug])

  return { game, loading }
}

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return user
}
