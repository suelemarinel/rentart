'use client'

import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import Link from 'next/link'

type Props = {
  artwork: Artwork
}

const CATEGORY_LABELS: Record<string, string> = {
  peinture: 'Peinture',
  sculpture: 'Sculpture',
  photographie: 'Photographie',
  dessin: 'Dessin',
  tirage: 'Tirage',
}

export default function ArtworkDetail({ artwork }: Props) {
  const [current, setCurrent] = useState(0)
  const images = artwork.images ?? []

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 pt-28 pb-4">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-900 transition-colors">
          ← Retour au catalogue
        </Link>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-8 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Colonne gauche — Images */}
        <div className="flex flex-col gap-4">

          {/* Image principale */}
          <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
            {images[current] && (
              <img
                src={images[current].asset.url}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow transition"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrent(i => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow transition"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === current ? 'border-gray-900' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img.asset.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Colonne droite — Infos */}
        <div className="flex flex-col justify-start pt-2">

          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
            {CATEGORY_LABELS[artwork.category]}
          </span>

          <h1 className="text-3xl font-light text-gray-900 mb-1">{artwork.title}</h1>

          <p className="text-base text-gray-500 mb-6">{artwork.artist}</p>

          <div className="w-12 h-px bg-gray-200 mb-6" />

          <dl className="flex flex-col gap-3 mb-8">
            {artwork.year && (
              <div className="flex justify-between text-sm">
                <dt className="text-gray-400">Année</dt>
                <dd className="text-gray-900">{artwork.year}</dd>
              </div>
            )}
            {artwork.dimensions && (
              <div className="flex justify-between text-sm">
                <dt className="text-gray-400">Dimensions</dt>
                <dd className="text-gray-900">{artwork.dimensions}</dd>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <dt className="text-gray-400">Disponibilité</dt>
              <dd className={artwork.available ? 'text-green-600' : 'text-red-400'}>
                {artwork.available ? 'Disponible' : 'Non disponible'}
              </dd>
            </div>
          </dl>

          <div className="bg-[#F5F4F1] rounded-xl p-5 mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Location mensuelle</p>
            <p className="text-2xl font-light text-gray-900">
              à partir de <span className="font-medium">{artwork.price}€</span>
              <span className="text-sm font-normal text-gray-400"> / mois</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">Tout compris — installation, assurance, retrait</p>
          </div>

          
          <a  href={`mailto:contact@galeriesept.com?subject=Demande de location — ${artwork.title}`}
            className="w-full bg-gray-900 text-white text-sm font-medium py-4 rounded-xl text-center hover:bg-gray-700 transition-colors"
          >
            Demander une location
          </a>

          <p className="text-xs text-gray-400 text-center mt-3">
            Réponse sous 24h · Sans engagement
          </p>
        </div>
      </div>
    </div>
  )
}