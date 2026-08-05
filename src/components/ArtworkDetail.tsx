'use client'

import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'

type Props = {
  artwork: Artwork
}

const CATEGORY_LABELS: Record<string, string> = {
  peinture: 'Peinture',
  sculpture: 'Sculpture',
}

export default function ArtworkDetail({ artwork }: Props) {
  const [current, setCurrent] = useState(0)
  const images = artwork.images ?? []
  const { isFavorited, toggleFavorite } = useFavorites()
  const favorited = isFavorited(artwork._id)

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr]">

        {/* Panneau gauche — Vitrine de l'œuvre */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen bg-[#F5F4F1] flex flex-col">

          <div className="absolute top-0 left-0 z-10" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Retour au catalogue
            </Link>
          </div>

          <div
            className="relative flex-1 flex items-center justify-center"
            style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 4rem)' }}
          >
            {images[current] && (
              <img
                src={images[current].asset.url}
                alt={artwork.title}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{ maxHeight: 'min(70vh, 640px)' }}
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}
                  aria-label="Image précédente"
                  className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow transition"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrent(i => (i + 1) % images.length)}
                  aria-label="Image suivante"
                  className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow transition"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div
              className="flex gap-2 justify-center flex-wrap"
              style={{ padding: '0 2rem clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === current ? 'border-gray-900' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img.asset.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Panneau droit — Fiche de l'œuvre, style étiquette de galerie */}
        <div
          className="flex flex-col justify-center"
          style={{ padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4.5rem)' }}
        >
          {/* Eyebrow + bouton favori */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#111110]" />
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.25em]">
                {CATEGORY_LABELS[artwork.category]}
              </span>
            </div>

            <button
              onClick={() => toggleFavorite(artwork._id)}
              aria-label={favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              className="transition-transform hover:scale-110"
            >
              <Heart
                size={22}
                color="#14141A"
                fill={favorited ? '#14141A' : 'none'}
                strokeWidth={1.6}
              />
            </button>
          </div>

          {/* Titre en serif italique */}
          <h1
            className="font-serif italic text-[#111110] mb-3"
            style={{
              fontWeight: 500,
              fontSize: 'clamp(2.75rem, 5vw, 4rem)',
              lineHeight: 1.05,
            }}
          >
            {artwork.title}
          </h1>

          <p className="font-serif text-base text-gray-500 mb-10 tracking-wide" style={{ fontSize: '1.15rem' }}>
            {artwork.artist}
          </p>

          {/* Fiche technique — style étiquette de musée */}
          <dl className="flex flex-col mb-10">
            {artwork.year && (
              <div className="flex items-baseline gap-3 py-2.5 border-b border-gray-100">
                <dt className="text-[11px] uppercase tracking-widest text-gray-400 whitespace-nowrap">Année</dt>
                <span className="flex-1 border-b border-dotted border-gray-300 -mb-1" />
                <dd className="text-sm text-[#111110]">{artwork.year}</dd>
              </div>
            )}
            {artwork.dimensions && (
              <div className="flex items-baseline gap-3 py-2.5 border-b border-gray-100">
                <dt className="text-[11px] uppercase tracking-widest text-gray-400 whitespace-nowrap">Dimensions</dt>
                <span className="flex-1 border-b border-dotted border-gray-300 -mb-1" />
                <dd className="text-sm text-[#111110]">{artwork.dimensions} cm</dd>
              </div>
            )}
            <div className="flex items-baseline gap-3 py-2.5 border-b border-gray-100">
              <dt className="text-[11px] uppercase tracking-widest text-gray-400 whitespace-nowrap">Disponibilité</dt>
              <span className="flex-1 border-b border-dotted border-gray-300 -mb-1" />
              <dd className={`text-sm ${artwork.available ? 'text-green-700' : 'text-red-400'}`}>
                {artwork.available ? 'Disponible' : 'Non disponible'}
              </dd>
            </div>
          </dl>

          {/* Prix */}
          <div className="border border-gray-200 rounded-sm p-6 mb-8">
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mb-2">Location mensuelle</p>
            <p className="font-serif text-[#111110]" style={{ fontSize: '2.25rem', fontWeight: 500 }}>
              {artwork.price}€
              <span className="text-sm text-gray-400 ml-1 font-sans">/ mois</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">Tout compris — installation, assurance, retrait</p>
          </div>

          {/* CTA */}
          <a
            href={`mailto:contact@galeriesept.com?subject=Demande de location — ${artwork.title}`}
            className="w-full border border-[#111110] text-[#111110] text-xs font-medium uppercase tracking-[0.15em] py-4 rounded-sm text-center hover:bg-[#111110] hover:text-white transition-colors duration-300"
          >
            Demander une location
          </a>

          <p className="font-serif text-xs text-gray-400 text-center mt-4 italic">
            Réponse sous 24h · Sans engagement
          </p>
        </div>
      </div>
    </div>
  )
}