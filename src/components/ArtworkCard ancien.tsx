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

export default function ArtworkCard({ artwork }: Props) {
  const [current, setCurrent] = useState(0)
  const images = artwork.images ?? []

  return (
    <Link href={`/catalogue/${artwork.slug.current}`}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">

        {/* Carrousel */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 group">
          {images.length > 0 ? (
            <>
              {images.map((img, i) => (
                <img
                  key={img.asset._id}
                  src={img.asset.url}
                  alt={`${artwork.title} — vue ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}

              {images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length) }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 2L3 6l4 4" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setCurrent(c => (c + 1) % images.length) }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M5 2l4 4-4 4" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); setCurrent(i) }}
                        className={`rounded-full transition-all duration-300 ${i === current ? 'w-4 h-1 bg-white' : 'w-1 h-1 bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">✦</div>
          )}
        </div>

        {/* Body */}
        <div className="px-4 pt-3 pb-4">
          <div className="mb-2">
            <p className="font-serif text-base leading-snug text-gray-900">{artwork.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{artwork.artist}</p>
          </div>
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 bg-gray-100 rounded-md px-2 py-1 text-[11px] font-medium text-gray-500">
              {CATEGORY_LABELS[artwork.category]}
              <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />
              {artwork.dimensions}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold text-gray-900">à partir de {artwork.price}€</span>
            <span className="text-[11px] text-gray-400">/ mois · Tout compris</span>
          </div>
        </div>
      </div>
    </Link>
  )
}