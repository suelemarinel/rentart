'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'

export default function LoginPromptModal() {
  const { showLoginPrompt, dismissLoginPrompt } = useFavorites()

  if (!showLoginPrompt) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(20,20,26,0.5)', padding: 'clamp(1.5rem, 6vw, 2rem)' }}
      onClick={dismissLoginPrompt}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-sm text-center"
        style={{ padding: 'clamp(2rem, 6vw, 2.5rem)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={dismissLoginPrompt}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-[#8A8880] hover:text-[#14141A] transition-colors"
        >
          <X size={18} strokeWidth={1.6} />
        </button>

        <p className="text-2xl mb-4" style={{ color: '#C8C7C4' }}>✦</p>

        <h2 className="font-serif text-[#14141A] mb-3" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
          Connectez-vous pour enregistrer votre sélection
        </h2>
        <p className="text-sm font-light text-[#8A8880] leading-relaxed mb-8">
          Créez un compte pour retrouver vos œuvres favorites sur tous vos appareils
          et recevoir une proposition personnalisée.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/connexion?mode=signup"
            onClick={dismissLoginPrompt}
            className="w-full bg-[#14141A] text-white text-xs font-medium uppercase tracking-[0.15em] py-4 rounded-full hover:opacity-85 transition-opacity"
          >
            Créer un compte
          </Link>
          <Link
            href="/connexion"
            onClick={dismissLoginPrompt}
            className="w-full border border-[#E8E7E4] text-[#14141A] text-xs font-medium uppercase tracking-[0.15em] py-4 rounded-full hover:bg-[#FAFAF8] transition-colors"
          >
            Se connecter
          </Link>
        </div>

        <button
          onClick={dismissLoginPrompt}
          className="text-xs text-[#C8C7C4] hover:text-[#8A8880] transition-colors mt-6"
        >
          Continuer sans compte
        </button>
      </div>
    </div>
  )
}