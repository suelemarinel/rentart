'use client'

import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import Link from 'next/link'

type Props = {
  artwork: Artwork
}

export default function ArtworkCard({ artwork }: Props) {
  const [current, setCurrent] = useState(0)
  const images = artwork.images ?? []

  return (
    <>
      <style>{`
        .card-arrow { opacity: 1; transition: opacity 0.2s; }
        @media (min-width: 768px) {
          .card-arrow { opacity: 0; }
          .card:hover .card-arrow { opacity: 1; }
        }
      `}</style>

      <Link href={`/catalogue/${artwork.slug.current}`}>
        <div className="card relative w-full aspect-[3/4] bg-gray-950 overflow-hidden cursor-pointer rounded-md">

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
                    className="card-arrow absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm z-10"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 2L3 6l4 4" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); setCurrent(c => (c + 1) % images.length) }}
                    className="card-arrow absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm z-10"
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
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">✦</div>
          )}
        </div>
      </Link>
    </>
  )
}