'use client'

import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Artwork } from '@/types/artwork'
import { useFavorites } from '@/context/FavoritesContext'
import ArtworkCard from './ArtworkCard'
import Link from 'next/link'
import { Phone, CalendarDays } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

type Props = { artworks: Artwork[] }

export default function FavoritesGrid({ artworks }: Props) {
  const { favorites } = useFavorites()
  const { user, logout } = useAuth()
  const favorited = artworks.filter(a => favorites.includes(a._id))
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const handleSendSelection = async () => {
    setSending(true)
    setError(false)

    const lines = favorited.map(
      a => `— ${a.title}, ${a.artist} (${a.year}) — ${a.dimensions} — ${a.price}€/mois`
    )

    const bodyParts = [
      'Nouvelle demande de proposition depuis le site.',
      '',
      ...lines,
      '',
    ]
    if (user?.email) bodyParts.push(`Email de contact : ${user.email}`)
    if (phone.trim()) bodyParts.push(`Téléphone préférentiel : ${phone.trim()}`)

    try {
      await addDoc(collection(db, 'mail'), {
        to: 'sue.lemarinel@gmail.com',
        message: {
          subject: `Demande de proposition — Ma sélection RentArt (${favorited.length} œuvre${favorited.length > 1 ? 's' : ''})`,
          text: bodyParts.join('\n'),
        },
        // Champs additionnels ignorés par l'extension, utiles pour ton propre suivi/historique
        artworkIds: favorited.map(a => a._id),
        contactEmail: user?.email ?? null,
        contactPhone: phone.trim() || null,
        createdAt: serverTimestamp(),
      })
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
              {favorited.map(artwork => (
                <ArtworkCard key={artwork._id} artwork={artwork} />
              ))}
            </div>

            {/* Envoyer la sélection */}
            <div className="bg-white border border-[#E8E7E4] rounded-2xl p-6" style={{ maxWidth: '28rem' }}>
              {!sent ? (
                <>
                  <p className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880] mb-3">Étape suivante</p>
                  <h2 className="font-serif text-xl text-[#14141A] mb-3">Recevoir une proposition</h2>
                  <p className="text-sm font-light text-[#8A8880] leading-relaxed mb-6">
                    Envoyez-nous votre sélection de {favorited.length} œuvre{favorited.length > 1 ? 's' : ''} — nous vous recontactons avec une proposition personnalisée.
                  </p>

                  <div className="flex flex-col gap-2 mb-6">
                    <label className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880]">
                      Téléphone préférentiel <span className="normal-case font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+32 470 12 34 56"
                      className="bg-[#FAFAF8] border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-[#14141A] placeholder:text-[#C8C7C4] focus:outline-none focus:border-[#8A8880] transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleSendSelection}
                    disabled={sending}
                    className="w-full bg-[#14141A] text-white text-xs font-medium uppercase tracking-[0.15em] py-4 rounded-full hover:opacity-85 transition-opacity disabled:opacity-50"
                  >
                    {sending ? 'Envoi en cours…' : 'Recevoir une proposition'}
                  </button>

                  {error && (
                    <p className="text-xs text-red-500 text-center mt-4">
                      Une erreur est survenue. Réessayez ou contactez-nous directement à contact@rentart.be.
                    </p>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p className="text-2xl mb-4" style={{ color: '#C8C7C4' }}>✦</p>
                  <h2 className="font-serif text-xl text-[#14141A] mb-3">
                    Votre sélection est bien envoyée
                  </h2>
                  <p className="text-sm font-light text-[#8A8880] leading-relaxed mb-8">
                    Nous revenons vers vous sous 24h avec une proposition personnalisée pour vos {favorited.length} œuvre{favorited.length > 1 ? 's' : ''}.
                  </p>

                  <div className="border-t border-[#E8E7E4] pt-6">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880] mb-4">
                      Envie d&apos;aller plus vite ?
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="https://calendly.com/PLACEHOLDER"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#14141A] text-white text-xs font-medium uppercase tracking-[0.15em] py-4 rounded-full hover:opacity-85 transition-opacity"
                      >
                        <CalendarDays size={15} strokeWidth={1.6} />
                        Prendre rendez-vous
                      </a>
                      <a
                        href="tel:+32000000000"
                        className="w-full inline-flex items-center justify-center gap-2 border border-[#E8E7E4] text-[#14141A] text-xs font-medium uppercase tracking-[0.15em] py-4 rounded-full hover:bg-[#FAFAF8] transition-colors"
                      >
                        <Phone size={15} strokeWidth={1.6} />
                        +32 0 000 00 00
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}