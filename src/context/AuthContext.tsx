'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth'
import { logEvent } from 'firebase/analytics'
import { auth, getAnalyticsInstance } from '@/lib/firebase'

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

async function track(eventName: string, params?: Record<string, unknown>) {
  const analytics = await getAnalyticsInstance()
  if (analytics) logEvent(analytics, eventName, params)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
    setUser(firebaseUser)
    setLoading(false)
  })
  return () => unsubscribe()
}, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
    track('login', { method: 'email' })
  }

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
    track('sign_up', { method: 'email' })
  }

  const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime
  track(isNewUser ? 'sign_up' : 'login', { method: 'google' })
}

  const logout = async () => {
    await signOut(auth)
    track('logout')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider')
  return ctx
}