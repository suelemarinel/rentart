'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

const STORAGE_KEY = 'rentart-favorites'

type FavoritesContextType = {
  favorites: string[]
  isFavorited: (id: string) => boolean
  toggleFavorite: (id: string) => void
  count: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Lecture initiale depuis localStorage — après le premier rendu pour éviter les erreurs d'hydratation SSR
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setFavorites(JSON.parse(stored))
    } catch {
      // localStorage indisponible (navigation privée, etc.) — on continue avec un état vide
    }
    setHydrated(true)
  }, [])

  // Sauvegarde à chaque changement, une fois l'hydratation initiale terminée
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // quota dépassé ou stockage désactivé — on ignore silencieusement
    }
  }, [favorites, hydrated])

  const isFavorited = (id: string) => favorites.includes(id)

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorited, toggleFavorite, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites doit être utilisé à l\'intérieur de FavoritesProvider')
  return ctx
}