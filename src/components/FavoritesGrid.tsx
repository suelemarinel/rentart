'use client'

import { Artwork } from '@/types/artwork'
import { useFavorites } from '@/context/FavoritesContext'
import ArtworkCard from './ArtworkCard'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

type Props = { artworks: Artwork[] }

export default function FavoritesGrid({ artworks }: Props) {
  const { favorites } = useFavorites()
  const { user, logout } = useAuth()
  const favorited = artworks.filter(a => favorites.includes(a._id))

  return (
    <div style={{ background: '#F2F1EF', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(6rem, 10vw, 8rem) clamp(1.5rem, 4vw, 2rem) 6rem' }}>

        <div className="mb-10">
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#8A8880] mb-3 flex items-center gap-3">
            <span className="block w-7 h-px bg-[#C8C7C4]" />
            Votre sélection
          </p>
          <h1 className="font-serif text-[#14141A]" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            Mes favoris
          </h1>
        </div>

        {favorited.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#8A8880' }}>
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</p>
            <p className="text-sm mb-6">Vous n&apos;avez pas encore de favoris.</p>
            <Link
              href="/"
              className="inline-block border border-[#14141A] text-[#14141A] text-xs font-medium uppercase tracking-[0.15em] px-8 py-3 rounded-full hover:bg-[#14141A] hover:text-white transition-colors duration-300"
            >
              Explorer le catalogue
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white border border-[#E8E7E4] rounded-2xl p-6 mb-10 flex flex-wrap items-center justify-between gap-6">
              {user ? (
                <>
                  <p className="text-sm text-[#8A8880] leading-relaxed">
                    Connectée en tant que <span className="text-[#14141A]">{user.email}</span> — votre sélection est sauvegardée.
                  </p>
                  <button
                    onClick={logout}
                    className="text-xs font-medium uppercase tracking-[0.1em] px-6 py-3 rounded-full border border-[#C8C7C4] text-[#8A8880] hover:border-[#8A8880] transition-colors"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#8A8880] leading-relaxed">
                    Connectez-vous pour sauvegarder votre sélection et la retrouver sur tous vos appareils.
                  </p>
                  <Link
                    href="/connexion"
                    className="text-xs font-medium uppercase tracking-[0.1em] px-6 py-3 rounded-full border border-[#14141A] text-[#14141A] hover:bg-[#14141A] hover:text-white transition-colors duration-300"
                  >
                    Se connecter
                  </Link>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {favorited.map(artwork => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}