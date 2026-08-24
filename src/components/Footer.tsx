import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#14141A] text-white">
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 4vw, 2rem)' }}>
        <div className="footer-grid">

          <div>
            <p className="font-serif text-2xl mb-3">rent<em className="italic text-white/50">art</em></p>
            <p className="text-sm font-light text-white/50 leading-relaxed">
              Art original for exceptional spaces.
            </p>
            <a href="https://instagram.com/rentart" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-xs text-white/50 hover:text-white transition-colors">
              Instagram · @rentart
            </a>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/40 mb-5">Navigation</p>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Catalogue</Link></li>
              <li><Link href="/a-propos" className="text-sm text-white/60 hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col justify-between" style={{ gap: '1.5rem' }}>
            <div>
              <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/40 mb-5">Consultation</p>
              <p className="text-sm font-light text-white/50 leading-relaxed mb-6">
                Rencontrons-nous pour sélectionner les œuvres adaptées à votre espace.
              </p>
            </div>
            <a href="/contact" target="_blank" rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 text-xs font-medium tracking-wide px-6 py-3 rounded-full hover:opacity-85 transition-opacity"
  style={{ alignSelf: 'flex-start' }}>
  Prendre rendez-vous
</a>
          </div>

        </div>

        <div className="footer-bottom" style={{ paddingTop: '2rem' }}>
          <p className="text-xs text-white/35">© 2026 RentArt. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}