'use client'

import Link from 'next/link'

export default function HeroCatalogue() {
  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden"
      style={{ paddingLeft: 'clamp(1.5rem, 8vw, 5rem)', paddingRight: 'clamp(1.5rem, 8vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 5rem)' }}
    >
      {/* Wrapper — porte le zoom mobile, jamais touché par l'animation */}
      <div className="absolute inset-0 overflow-hidden hero-bg-wrapper">
        {/* Image — garde son animation d'entrée intacte */}
        <div
          className="absolute inset-0 bg-cover animate-hero-reveal hero-bg"
          style={{
            backgroundImage: "url('/hero-principal-test.jpg')",
          }}
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/80" />

      {/* Content */}
      <div className="relative z-10 animate-content-reveal">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/55 mb-6 flex items-center gap-3">
          <span className="block w-7 h-px bg-white/40" />
          RentArt
        </p>
        <h1
          className="font-serif leading-[1.06] text-white max-w-3xl mb-9"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 3.75rem)' }}
        >
          L&apos;art transforme un espace.<br />
          <em className="italic text-white/70">RentArt le rend accessible.</em>
        </h1>
        <p className="text-sm font-light text-white/65 leading-relaxed max-w-md mb-9">
          Louez des œuvres d&apos;art originales pour vos hôtels, restaurants
          et espaces professionnels.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#catalogue"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 text-xs font-medium tracking-wide px-6 py-3 rounded-full hover:opacity-85 transition-opacity"
          >
            Découvrir les œuvres
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/50 text-white text-xs font-medium tracking-wide px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
          >
            Parler de votre projet
          </Link>
        </div>
      </div>

      <style>{`
        .hero-bg {
          background-position: 50% 75%;
        }
        @media (max-width: 767px) {
          .hero-bg {
            background-position: 72% 100%;
          }
          .hero-bg-wrapper {
            transform: scale(1.1);
            transform-origin: 50% 100%;
          }
        }
      `}</style>
    </section>
  )
}