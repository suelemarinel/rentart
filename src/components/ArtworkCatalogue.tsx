'use client'

import { useState } from 'react'
import { Artwork } from '@/types/artwork'
import ArtworkCard from './ArtworkCard'

type Props = { artworks: Artwork[] }
type SizeFilter = 'all' | 'S' | 'M' | 'L' | 'XL'
type CategoryFilter = 'all' | 'peinture' | 'sculpture'
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

const SIZE_FILTERS: { value: SizeFilter; label: string; desc?: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'S', label: 'S', desc: '< 50 cm' },
  { value: 'M', label: 'M', desc: '50–100 cm' },
  { value: 'L', label: 'L', desc: '100–150 cm' },
  { value: 'XL', label: 'XL', desc: '> 150 cm' },
]

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'peinture', label: 'Peinture' },
  { value: 'sculpture', label: 'Sculpture' },
]

const MIN_PRICE = 0
const MAX_PRICE = 500

export default function ArtworkCatalogue({ artworks }: Props) {
  const [activeSize, setActiveSize] = useState<SizeFilter>('all')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [sort, setSort] = useState<SortFilter>('default')

  let filtered = artworks.filter(a => {
    const sizeOk = activeSize === 'all' || getSizeLabel(getMaxDimension(a.dimensions)) === activeSize
    const categoryOk = activeCategory === 'all' || a.category === activeCategory
    const priceOk = a.price <= maxPrice
    return sizeOk && categoryOk && priceOk
  })

  if (sort === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const pricePercent = ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  const btn = (active: boolean): React.CSSProperties => ({
    padding: '6px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 500,
    border: `1px solid ${active ? '#111827' : '#e5e7eb'}`,
    background: active ? '#111827' : 'white',
    color: active ? 'white' : '#6b7280',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'all 0.15s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
  })

  const selectStyle: React.CSSProperties = {
    padding: '6px 28px 6px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 500,
    border: '1px solid #e5e7eb',
    background: 'white',
    color: '#111827',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M2 4l3 3 3-3' stroke='%236b7280' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    flexShrink: 0,
  }

  const label: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 500,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }

  const row: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  return (
    <>
      <style>{`
        .filter-bar {
          background: #E8E4DD;
          position: sticky;
          top: 60px;
          z-index: 40;
        }
        .filter-desktop { display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; }
        .filter-mobile { display: none; flex-direction: column; gap: 10px; }

        @media (max-width: 767px) {
          .filter-bar {
            position: static;
          }
          .filter-desktop { display: none; }
          .filter-mobile { display: flex; }
        }
      `}</style>

      {/* Filter bar */}
      <div className="filter-bar">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px clamp(1rem, 4vw, 2rem)' }}>

          {/* Desktop — tout sur une ligne */}
          <div className="filter-desktop">
            <span style={label}>Catégorie</span>
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value as CategoryFilter)}
              style={selectStyle}
            >
              {CATEGORY_FILTERS.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <div style={{ width: '1px', height: '16px', background: '#e5e7eb', flexShrink: 0 }} />
            <span style={label}>Taille</span>
            <select
              value={activeSize}
              onChange={e => setActiveSize(e.target.value as SizeFilter)}
              style={selectStyle}
            >
              {SIZE_FILTERS.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}{s.desc ? ` (${s.desc})` : ''}
                </option>
              ))}
            </select>
            <div style={{ width: '1px', height: '16px', background: '#e5e7eb', flexShrink: 0 }} />
            <span style={label}>Budget max</span>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '120px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', width: '100%', height: '3px', background: '#e5e7eb', borderRadius: '99px' }} />
              <div style={{ position: 'absolute', height: '3px', background: '#111827', borderRadius: '99px', width: `${pricePercent}%` }} />
              <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={25} value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ position: 'relative', width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', height: '16px' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#111827', whiteSpace: 'nowrap', minWidth: '60px' }}>
              {maxPrice >= MAX_PRICE ? 'Tous prix' : `≤ ${maxPrice}€`}
            </span>
            <div style={{ width: '1px', height: '16px', background: '#e5e7eb', flexShrink: 0 }} />
            <span style={label}>Trier</span>
            <button onClick={() => setSort(sort === 'asc' ? 'default' : 'asc')} style={btn(sort === 'asc')}>Prix ↑</button>
            <button onClick={() => setSort(sort === 'desc' ? 'default' : 'desc')} style={btn(sort === 'desc')}>Prix ↓</button>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
              {filtered.length} œuvre{filtered.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Mobile — une ligne par filtre */}
          <div className="filter-mobile">
            <div style={row}>
              <span style={label}>Catégorie</span>
              <select
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value as CategoryFilter)}
                style={selectStyle}
              >
                {CATEGORY_FILTERS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div style={row}>
              <span style={label}>Taille</span>
              <select
                value={activeSize}
                onChange={e => setActiveSize(e.target.value as SizeFilter)}
                style={selectStyle}
              >
                {SIZE_FILTERS.map(s => (
                  <option key={s.value} value={s.value}>
                    {s.label}{s.desc ? ` (${s.desc})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div style={row}>
              <span style={label}>Budget max</span>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100px', flexShrink: 0 }}>
                <div style={{ position: 'absolute', width: '100%', height: '3px', background: '#e5e7eb', borderRadius: '99px' }} />
                <div style={{ position: 'absolute', height: '3px', background: '#111827', borderRadius: '99px', width: `${pricePercent}%` }} />
                <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={10} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  style={{ position: 'relative', width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', height: '16px' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#111827', whiteSpace: 'nowrap' }}>
                {maxPrice >= MAX_PRICE ? 'Tous prix' : `≤ ${maxPrice}€`}
              </span>
            </div>
            <div style={{ ...row, justifyContent: 'space-between' }}>
              <div style={row}>
                <span style={label}>Trier</span>
                <button onClick={() => setSort(sort === 'asc' ? 'default' : 'asc')} style={btn(sort === 'asc')}>Prix ↑</button>
                <button onClick={() => setSort(sort === 'desc' ? 'default' : 'desc')} style={btn(sort === 'desc')}>Prix ↓</button>
              </div>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                {filtered.length} œuvre{filtered.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Grid */}
<div style={{ background: '#E8E4DD' }}>
  <div style={{
    maxWidth: '1280px',
    margin: '0 auto',
    padding: 'clamp(1rem, 4vw, 2rem)',
    paddingTop: '1.5rem',
    paddingBottom: '3rem',
    minHeight: '100vh',
  }}>
    {filtered.length === 0 ? (
      <div style={{ textAlign: 'center', padding: '6rem 0', color: '#9ca3af' }}>
        <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</p>
        <p style={{ fontSize: '0.875rem' }}>Aucune œuvre dans cette sélection.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(artwork => (
          <ArtworkCard key={artwork._id} artwork={artwork} />
        ))}
      </div>
    )}
  </div>
</div>
    </>
  )
}