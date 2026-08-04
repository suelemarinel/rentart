'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const whiteText = pathname === '/' && !scrolled

  const navBg = transparent
  ? 'bg-gradient-to-b from-black/35 to-transparent backdrop-blur-[2px] border-transparent'
  : 'bg-white/90 backdrop-blur-md border-b border-gray-200'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-8 transition-all duration-300 ${navBg}`}>
        <Link
          href="/"
          className={`font-serif text-xl tracking-tight transition-colors duration-300 ${whiteText ? 'text-white' : 'text-gray-900'}`}
        >
          rent<span className={`italic ${whiteText ? 'text-white/55' : 'text-gray-400'}`}>art</span>
        </Link>

        {/* Desktop — caché sous 768px */}
        <ul style={{ display: 'var(--nav-desktop-display, flex)' }} className="gap-8 list-none">
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

        <Link href="/contact" className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 hidden-mobile ${
  whiteText
    ? 'bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm'
    : 'bg-gray-900 text-white hover:opacity-80'
}`}>
  Prendre rendez-vous
</Link>

        {/* Burger — visible seulement sur mobile */}
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
      </nav>

      {/* Menu overlay mobile */}
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
          <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
            fontFamily: 'Georgia, serif', fontSize: '2.5rem',
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