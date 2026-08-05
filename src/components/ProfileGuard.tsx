'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const EXCLUDED_PATHS = ['/completer-profil', '/connexion']

export default function ProfileGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, profileComplete } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [blocking, setBlocking] = useState(false)

  useEffect(() => {
    if (loading) return
    if (!user) {
      setBlocking(false)
      return
    }
    if (profileComplete === null) return // profil pas encore chargé, on attend

    const onExcludedPath = EXCLUDED_PATHS.includes(pathname)

    if (!profileComplete && !onExcludedPath) {
      setBlocking(true)
      router.replace('/completer-profil')
    } else {
      setBlocking(false)
    }
  }, [loading, user, profileComplete, pathname, router])

  // Évite d'afficher brièvement la page protégée avant que la redirection ne s'exécute
  if (blocking) return null

  return <>{children}</>
}