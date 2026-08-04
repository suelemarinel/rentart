'use client'

export default function HeroCatalogue() {
  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden"
      style={{ paddingLeft: 'clamp(1.5rem, 8vw, 5rem)', paddingRight: 'clamp(1.5rem, 8vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 5rem)' }}
    >
      {/* Image */}
      <div
        className="absolute inset-0 bg-cover animate-hero-reveal"
        style={{
          backgroundImage: "url('/hero-principal2.jpg')",
          backgroundPosition: '50% 75%'
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/80" />

      {/* Content */}
      <div className="relative z-10 animate-content-reveal">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/55 mb-6 flex items-center gap-3">
          <span className="block w-7 h-px bg-white/40" />
          Galerie Sept · Bruxelles & Knokke
        </p>
        <h1
          className="font-serif leading-[1.06] text-white max-w-3xl mb-9"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 3.75rem)' }}
        >
          Louez l&apos;art.<br />
          <em className="italic text-white/55">Transformez vos espaces.</em>
        </h1>
        <p className="text-sm font-light text-white/65 leading-relaxed max-w-md">
          Des œuvres originales sélectionnées par la Galerie Sept, livrées et installées
          dans votre restaurant, hôtel ou espace professionnel — avec option de rachat
          et avantages fiscaux.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/40">Scroll</span>
        <div className="w-6 h-10 border border-white/25 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/55 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}