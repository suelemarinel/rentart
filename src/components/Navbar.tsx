'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  const isHeroPage = pathname === '/' || pathname === '/a-propos'

  useEffect(() => {
    setScrolled(window.scrollY > 60)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const transparent = isHeroPage && !scrolled
  const whiteText = pathname === '/' && !scrolled

  const navBg = transparent
    ? 'bg-transparent border-transparent'
    : 'bg-white/90 backdrop-blur-md border-b border-gray-200'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-8 transition-all duration-300 ${navBg}`}>
      <Link
        href="/"
        className={`font-serif text-xl tracking-tight transition-colors duration-300 ${whiteText ? 'text-white' : 'text-gray-900'}`}
      >
        rent<span className={`italic ${whiteText ? 'text-white/55' : 'text-gray-400'}`}>art</span>
      </Link>

      <ul className="flex gap-8 list-none">
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

      <button className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 ${
        whiteText
          ? 'bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm'
          : 'bg-gray-900 text-white hover:opacity-80'
      }`}>
        Louer une œuvre
      </button>
    </nav>
  )
}