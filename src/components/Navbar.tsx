'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFavorites } from '@/context/FavoritesContext'
import { Heart } from 'lucide-react'

function FavoritesIcon() {
  const { count } = useFavorites()
  return (
    <span className="relative inline-flex items-center">
      <Heart size={18} strokeWidth={1.6} />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#14141A] text-white text-[9px] font-medium rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </span>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState<boolean | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHeroPage = pathname === '/' || pathname === '/a-propos'

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60)
    check()
    window.addEventListener('scroll', check)
    return () => window.removeEventListener('scroll', check)
  }, [pathname])

  if (scrolled === null) return null

  const transparent = isHeroPage && !scrolled
  const whiteText = isHeroPage && !scrolled

  const navBg = transparent
    ? 'bg-transparent border-transparent'
    : 'bg-white border-b border-gray-200'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] items-center px-8 transition-all duration-300 ${navBg}`}
        style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* Colonne gauche — logo */}
        <Link
          href="/"
          className={`font-serif text-xl tracking-tight transition-colors duration-300 justify-self-start ${whiteText ? 'text-white' : 'text-gray-900'}`}
        >
          rent<span className={`italic ${whiteText ? 'text-white/55' : 'text-gray-400'}`}>art</span>
        </Link>

        {/* Colonne centrale — liens, vraiment centrés */}
        <ul style={{ display: 'var(--nav-desktop-display, flex)' }} className="gap-8 list-none justify-self-center">
          {[
            { href: '/', label: 'Catalogue' },
            { href: '/a-propos', label: 'À propos' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                    whiteText
                      ? active ? 'text-white' : 'text-white/55 hover:text-white'
                      : active ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Colonne droite — cœur + bouton regroupés */}
        <div className="flex items-center gap-5 justify-self-end">
          <Link
            href="/favoris"
            aria-label="Mes favoris"
            className={`hidden-mobile inline-flex items-center transition-colors duration-300 ${whiteText ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
          >
            <FavoritesIcon />
          </Link>

          <Link href="/contact" className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 hidden-mobile ${
            whiteText
              ? 'bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm'
              : 'bg-[#14141A] text-white hover:opacity-80'
          }`}>
            Prendre rendez-vous
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="burger-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: whiteText ? 'white' : '#111827', marginBottom: '5px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: whiteText ? 'white' : '#111827', marginBottom: '5px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: whiteText ? 'white' : '#111827', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        backgroundColor: 'white',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2.5rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s',
        display: 'none',
      }} className="mobile-menu">
        {[
          { href: '/', label: 'Catalogue' },
          { href: '/a-propos', label: 'À propos' },
          { href: '/contact', label: 'Contact' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="font-serif" style={{
            fontSize: '2.5rem',
            textDecoration: 'none', color: pathname === href ? '#d1d5db' : '#111827',
          }}>
            {label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .burger-btn { display: block !important; }
          .hidden-mobile { display: none !important; }
          nav ul { display: none !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  )
}