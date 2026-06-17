'use client'

import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import ArtworkCard from './ArtworkCard'

type Props = {
  artworks: Artwork[]
}

type SizeFilter = 'all' | 'S' | 'M' | 'L' | 'XL'
type SortFilter = 'default' | 'asc' | 'desc'

function getMaxDimension(dimensions: string): number {
  const numbers = dimensions.match(/\d+/g)
  if (!numbers) return 0
  return Math.max(...numbers.map(Number))
}

function getSizeLabel(max: number): string {
  if (max < 50) return 'S'
  if (max < 100) return 'M'
  if (max < 150) return 'L'
  return 'XL'
}

const SIZE_FILTERS: { value: SizeFilter; label: string; desc: string }[] = [
  { value: 'all', label: 'Toutes tailles', desc: '' },
  { value: 'S', label: 'S', desc: '< 50 cm' },
  { value: 'M', label: 'M', desc: '50–100 cm' },
  { value: 'L', label: 'L', desc: '100–150 cm' },
  { value: 'XL', label: 'XL', desc: '> 150 cm' },
]

export default function ArtworkCatalogue({ artworks }: Props) {
  const [activeSize, setActiveSize] = useState<SizeFilter>('all')
  const [sort, setSort] = useState<SortFilter>('default')

  let filtered = artworks.filter(a => {
    if (activeSize === 'all') return true
    const max = getMaxDimension(a.dimensions)
    return getSizeLabel(max) === activeSize
  })

  if (sort === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <>
      {/* Filter bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center gap-3 flex-wrap">

          {/* Taille */}
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mr-1">Taille</span>
          {SIZE_FILTERS.map(s => (
            <button
              key={s.value}
              onClick={() => setActiveSize(s.value)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap
                ${activeSize === s.value
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              {s.label}
              {s.desc && <span className="opacity-60">{s.desc}</span>}
            </button>
          ))}

          <div className="w-px h-5 bg-gray-200 mx-1" />

          {/* Prix */}
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mr-1">Prix</span>
          <button
            onClick={() => setSort(sort === 'asc' ? 'default' : 'asc')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all
              ${sort === 'asc'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            Croissant ↑
          </button>
          <button
            onClick={() => setSort(sort === 'desc' ? 'default' : 'desc')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all
              ${sort === 'desc'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-transparent text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            Décroissant ↓
          </button>

          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} {filtered.length === 1 ? 'œuvre' : 'œuvres'}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-4xl mb-4">✦</p>
            <p className="text-sm">Aucune œuvre dans cette taille pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(artwork => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}