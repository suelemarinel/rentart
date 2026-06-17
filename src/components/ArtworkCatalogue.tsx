'use client'

import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import ArtworkCard from './ArtworkCard'

type Props = { artworks: Artwork[] }
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
  { value: 'all', label: 'Toutes', desc: '' },
  { value: 'S', label: 'S', desc: '< 50 cm' },
  { value: 'M', label: 'M', desc: '50–100 cm' },
  { value: 'L', label: 'L', desc: '100–150 cm' },
  { value: 'XL', label: 'XL', desc: '> 150 cm' },
]

const MIN_PRICE = 0
const MAX_PRICE = 300

export default function ArtworkCatalogue({ artworks }: Props) {
  const [activeSize, setActiveSize] = useState<SizeFilter>('all')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [sort, setSort] = useState<SortFilter>('default')

  let filtered = artworks.filter(a => {
    const sizeOk = activeSize === 'all' || getSizeLabel(getMaxDimension(a.dimensions)) === activeSize
    const priceOk = a.price <= maxPrice
    return sizeOk && priceOk
  })

  if (sort === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const pricePercent = ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  return (
    <>
      {/* Filter bar */}
      <div className="bg-[#F2F1EF] sticky top-[60px] z-40 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center gap-6 flex-wrap">

          {/* Taille */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Taille</span>
            <div className="flex gap-1.5">
              {SIZE_FILTERS.map(s => (
                <button
                  key={s.value}
                  onClick={() => setActiveSize(s.value)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap
                    ${activeSize === s.value
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-[#E8E7E4] hover:text-gray-900'
                    }`}
                >
                  {s.label}
                  {s.desc && <span className="opacity-50 text-[10px]">{s.desc}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200" />

          {/* Prix slider */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest whitespace-nowrap">
              Budget max
            </span>
            <div className="relative flex items-center w-40">
              <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
              <div
                className="absolute h-1 bg-gray-900 rounded-full"
                style={{ width: `${pricePercent}%` }}
              />
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={10}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="relative w-full appearance-none bg-transparent cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gray-900
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-white
                  [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-gray-900
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-white
                  [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
            <span className="text-sm font-medium text-gray-900 w-16 whitespace-nowrap">
              {maxPrice >= MAX_PRICE ? 'Tous prix' : `≤ ${maxPrice}€`}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200" />

          {/* Tri */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Trier</span>
            <button
              onClick={() => setSort(sort === 'asc' ? 'default' : 'asc')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${sort === 'asc'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-[#E8E7E4] hover:text-gray-900'
                }`}
            >
              Prix ↑
            </button>
            <button
              onClick={() => setSort(sort === 'desc' ? 'default' : 'desc')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${sort === 'desc'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-[#E8E7E4] hover:text-gray-900'
                }`}
            >
              Prix ↓
            </button>
          </div>

          {/* Count */}
          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} {filtered.length === 1 ? 'œuvre' : 'œuvres'}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8 min-h-screen">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-4xl mb-4">✦</p>
            <p className="text-sm">Aucune œuvre dans cette sélection.</p>
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