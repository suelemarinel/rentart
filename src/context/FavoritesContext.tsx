'use client'

import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from './AuthContext'

const STORAGE_KEY = 'rentart-favorites'

type FavoritesContextType = {
  favorites: string[]
  isFavorited: (id: string) => boolean
  toggleFavorite: (id: string) => void
  count: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

function readLocal(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function writeLocal(favorites: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // stockage indisponible — on ignore silencieusement
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [favorites, setFavorites] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)
  const mergedRef = useRef(false)

  // Hydratation initiale — visiteur anonyme
  useEffect(() => {
    setFavorites(readLocal())
    setHydrated(true)
  }, [])

  // Connexion détectée : fusionne localStorage + Firestore une seule fois, puis écoute Firestore en temps réel
  useEffect(() => {
    if (authLoading || !hydrated) return

    if (!user) {
      mergedRef.current = false
      setFavorites(readLocal())
      return
    }

    const ref = doc(db, 'favorites', user.uid)

    if (!mergedRef.current) {
      mergedRef.current = true
      ;(async () => {
        const snap = await getDoc(ref)
        const remote: string[] = snap.exists() ? (snap.data().artworkIds ?? []) : []
        const local = readLocal()
        const merged = Array.from(new Set([...remote, ...local]))
        await setDoc(ref, { artworkIds: merged }, { merge: true })
        writeLocal([])
      })()
    }

    const unsubscribe = onSnapshot(ref, snap => {
      setFavorites(snap.exists() ? (snap.data().artworkIds ?? []) : [])
    })

    return () => unsubscribe()
  }, [user, authLoading, hydrated])

  // Sauvegarde locale — visiteurs anonymes uniquement
  useEffect(() => {
    if (!hydrated || user) return
    writeLocal(favorites)
  }, [favorites, hydrated, user])

  const isFavorited = (id: string) => favorites.includes(id)

  const toggleFavorite = async (id: string) => {
    const next = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]

    setFavorites(next)

    if (user) {
      const ref = doc(db, 'favorites', user.uid)
      await setDoc(ref, { artworkIds: next }, { merge: true })
    }
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