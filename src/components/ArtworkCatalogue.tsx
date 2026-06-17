'use client'

import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import ArtworkCard from './ArtworkCard'

type Props = {
  artworks: Artwork[]
}

const CATEGORIES = [
  { value: 'all', label: 'Toutes', icon: '✦' },
  { value: 'peinture', label: 'Peinture', icon: '🖼' },
  { value: 'sculpture', label: 'Sculpture', icon: '🗿' },
  { value: 'photographie', label: 'Photographie', icon: '📷' },
  { value: 'dessin', label: 'Dessin', icon: '✏️' },
  { value: 'tirage', label: 'Tirage', icon: '🖨' },
]

export default function ArtworkCatalogue({ artworks }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? artworks
    : artworks.filter(a => a.category === activeCategory)

  return (
    <>
      {/* Category bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap
                ${activeCategory === cat.value
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <p className="text-xs text-gray-400 mb-6">
          {filtered.length} {filtered.length === 1 ? 'œuvre' : 'œuvres'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(artwork => (
            <ArtworkCard key={artwork._id} artwork={artwork} />
          ))}
        </div>
      </div>
    </>
  )
}