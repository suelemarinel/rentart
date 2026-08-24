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
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { logEvent } from 'firebase/analytics'
import { auth, db, getAnalyticsInstance } from '@/lib/firebase'

type AuthContextType = {
  user: User | null
  loading: boolean
  profileComplete: boolean | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, phone: string) => Promise<void>
  loginWithGoogle: () => Promise<{ isNewUser: boolean }>
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
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Écoute en temps réel le profil Firestore de la personne connectée
  useEffect(() => {
    if (!user) {
      setProfileComplete(null)
      return
    }
    const ref = doc(db, 'users', user.uid)
    const unsubscribe = onSnapshot(ref, snap => {
      const phone = snap.exists() ? snap.data().phone : null
      setProfileComplete(!!phone)
    })
    return () => unsubscribe()
  }, [user])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
    track('login', { method: 'email' })
  }

  const signup = async (email: string, password: string, phone: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', credential.user.uid), {
      email,
      phone,
      createdAt: serverTimestamp(),
    })
    track('sign_up', { method: 'email' })
  }

  const loginWithGoogle = async (): Promise<{ isNewUser: boolean }> => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const userRef = doc(db, 'users', result.user.uid)
    const snap = await getDoc(userRef)
    const isNewUser = !snap.exists()

    if (isNewUser) {
      await setDoc(userRef, {
        email: result.user.email,
        phone: null,
        createdAt: serverTimestamp(),
      })
      track('sign_up', { method: 'google' })
    } else {
      track('login', { method: 'google' })
    }

    return { isNewUser }
  }

    const logout = async () => {
    await signOut(auth)
    track('logout')
  }

  return (
    <AuthContext.Provider value={{ user, loading, profileComplete, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider')
  return ctx
}