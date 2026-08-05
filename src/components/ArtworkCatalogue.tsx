'use client'

import { useEffect, useRef, useState } from 'react'
import { Artwork } from '@/types/artwork'
import ArtworkCard from './ArtworkCard'

type Props = { artworks: Artwork[] }
type SizeFilter = 'all' | 'S' | 'M' | 'L' | 'XL'
type CategoryFilter = 'all' | 'peinture' | 'sculpture'
type SortFilter = 'default' | 'asc' | 'desc'

function getMaxDimension(dimensions: string | null | undefined): number {
  if (!dimensions) return 0
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [inView, setInView] = useState(false)
  const startRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkInView = () => {
      const start = startRef.current
      if (!start) return

      const startRect = start.getBoundingClientRect()
      const pastStart = startRect.top < window.innerHeight - 100

      const footerEl = document.querySelector('footer')
      const footerRect = footerEl?.getBoundingClientRect()
      const beforeFooter = !footerRect || footerRect.top > window.innerHeight

      setInView(pastStart && beforeFooter)
    }
    checkInView()
    window.addEventListener('scroll', checkInView)
    window.addEventListener('resize', checkInView)
    return () => {
      window.removeEventListener('scroll', checkInView)
      window.removeEventListener('resize', checkInView)
    }
  }, [])

  let filtered = artworks.filter(a => {
    const sizeOk = activeSize === 'all' || getSizeLabel(getMaxDimension(a.dimensions)) === activeSize
    const categoryOk = activeCategory === 'all' || a.category === activeCategory
    const priceOk = a.price <= maxPrice
    return sizeOk && categoryOk && priceOk
  })

  if (sort === 'asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'desc') filtered = [...filtered].sort((a, b) => b.price - a.price)

  const pricePercent = ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (activeSize !== 'all' ? 1 : 0) +
    (maxPrice < MAX_PRICE ? 1 : 0) +
    (sort !== 'default' ? 1 : 0)

  const pillBtn = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 500,
    border: `1px solid ${active ? '#111827' : '#e5e7eb'}`,
    background: active ? '#111827' : 'white',
    color: active ? 'white' : '#374151',
    cursor: 'pointer',
    transition: 'all 0.15s',
  })

  const sectionTitle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 500,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '14px',
  }

  const resetFilters = () => {
    setActiveCategory('all')
    setActiveSize('all')
    setMaxPrice(MAX_PRICE)
    setSort('default')
  }

  return (
    <>
      <style>{`
        .filter-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 60;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .filter-drawer-backdrop.open {
          opacity: 1;
          pointer-events: auto;
        }
        .filter-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 420px;
          background: white;
          z-index: 61;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }
        .filter-drawer.open {
          transform: translateX(0);
        }
        .filter-trigger {
          position: fixed;
          bottom: clamp(1.25rem, 4vw, 2rem);
          left: 50%;
          transform: translateX(-50%) translateY(0);
          z-index: 50;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          background: #14141A;
          color: white;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.03em;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .filter-trigger.visible {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>

      {/* Grid */}
      <div style={{ background: '#F2F1EF' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(1rem, 4vw, 2rem)',
          paddingTop: '1.5rem',
          paddingBottom: '7rem',
        }}>
          <div ref={startRef} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>
              {filtered.length} œuvre{filtered.length > 1 ? 's' : ''}
            </span>
          </div>

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

      {/* Floating trigger */}
      <button className={`filter-trigger ${inView ? 'visible' : ''}`} onClick={() => setDrawerOpen(true)}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 3.5h12M3.5 7h7M6 10.5h2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        Filtrer &amp; trier
        {activeFilterCount > 0 && (
          <span style={{
            background: 'white', color: '#111827', borderRadius: '999px',
            fontSize: '10px', fontWeight: 600, minWidth: '18px', height: '18px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`filter-drawer-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className={`filter-drawer ${drawerOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem clamp(1.25rem, 4vw, 2rem)', borderBottom: '1px solid #e5e7eb' }}>
          <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#111827' }}>Filtrer &amp; trier</h3>
          <button onClick={() => setDrawerOpen(false)} aria-label="Fermer" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="#111827" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1.25rem, 4vw, 2rem)' }}>

          {/* Catégorie */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={sectionTitle}>Catégorie</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CATEGORY_FILTERS.map(c => (
                <button key={c.value} onClick={() => setActiveCategory(c.value)} style={pillBtn(activeCategory === c.value)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Taille */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={sectionTitle}>Taille</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {SIZE_FILTERS.map(s => (
                <button key={s.value} onClick={() => setActiveSize(s.value)} style={pillBtn(activeSize === s.value)}>
                  {s.label}{s.desc ? ` · ${s.desc}` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Budget max */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={sectionTitle}>Budget max</p>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
              <div style={{ position: 'absolute', width: '100%', height: '3px', background: '#e5e7eb', borderRadius: '99px' }} />
              <div style={{ position: 'absolute', height: '3px', background: '#111827', borderRadius: '99px', width: `${pricePercent}%` }} />
              <input type="range" min={MIN_PRICE} max={MAX_PRICE} step={25} value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ position: 'relative', width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', height: '20px' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>
              {maxPrice >= MAX_PRICE ? 'Tous prix' : `≤ ${maxPrice}€ / mois`}
            </span>
          </div>

          {/* Trier */}
          <div>
            <p style={sectionTitle}>Trier par prix</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setSort(sort === 'asc' ? 'default' : 'asc')} style={pillBtn(sort === 'asc')}>Croissant ↑</button>
              <button onClick={() => setSort(sort === 'desc' ? 'default' : 'desc')} style={pillBtn(sort === 'desc')}>Décroissant ↓</button>
            </div>
          </div>

        </div>

        <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem)', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
          <button
            onClick={resetFilters}
            style={{
              flex: '0 0 auto', padding: '13px 20px', borderRadius: '999px', fontSize: '12px',
              fontWeight: 500, border: '1px solid #e5e7eb', background: 'white', color: '#6b7280', cursor: 'pointer',
            }}
          >
            Réinitialiser
          </button>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{
              flex: 1, padding: '13px 20px', borderRadius: '999px', fontSize: '12px',
              fontWeight: 500, border: 'none', background: '#111827', color: 'white', cursor: 'pointer',
            }}
          >
            Voir {filtered.length} œuvre{filtered.length > 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </>
  )
}