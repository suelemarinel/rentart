'use client'

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
            backgroundImage: "url('/hero-principal2.jpg')",
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
          Louez l&apos;art.<br />
          <em className="italic text-white/55">Transformez vos espaces.</em>
        </h1>
        <p className="text-sm font-light text-white/65 leading-relaxed max-w-md">
          Des œuvres originales sélectionnées avec soin, livrées et installées
          dans votre restaurant, hôtel ou espace professionnel — avec option de rachat
          et avantages fiscaux.
        </p>
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