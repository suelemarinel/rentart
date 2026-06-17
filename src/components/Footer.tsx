import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0D] text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-4 gap-12 pb-16 border-b border-white/10">

          <div>
            <p className="font-serif text-2xl mb-3">rent<em className="italic text-white/40">art</em></p>
            <p className="text-sm font-light text-white/40 leading-relaxed">
              Des œuvres originales dans vos espaces professionnels.
            </p>
            <a href="https://instagram.com/galeriesept" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-xs text-white/40 hover:text-white transition-colors">
              Instagram · @galeriesept
            </a>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/30 mb-5">Navigation</p>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">Catalogue</Link></li>
              <li><Link href="/a-propos" className="text-sm text-white/50 hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/30 mb-5">Nos galeries</p>
            <div className="space-y-5">
              <div>
                <p className="text-sm text-white/70 font-medium mb-1">Bruxelles</p>
                <p className="text-xs text-white/35 leading-relaxed font-light">Rue de la Régence 7<br />1000 Bruxelles</p>
              </div>
              <div>
                <p className="text-sm text-white/70 font-medium mb-1">Knokke</p>
                <p className="text-xs text-white/35 leading-relaxed font-light">Zeedijk 123<br />8300 Knokke-Heist</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/30 mb-5">Consultation</p>
              <p className="text-sm font-light text-white/40 leading-relaxed mb-6">
                Rencontrons-nous pour sélectionner les œuvres adaptées à votre espace.
              </p>
            </div>
            <a href="https://calendly.com/galeriesept" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 text-xs font-medium tracking-wide px-6 py-3 rounded-full hover:opacity-85 transition-opacity">
              Prendre rendez-vous
            </a>
          </div>

        </div>

        <div className="pt-8 flex items-center justify-between">
          <p className="text-xs text-white/25">© 2025 Rentart · Galerie Sept. Tous droits réservés.</p>
          <p className="text-xs text-white/25">Bruxelles &amp; Knokke</p>
        </div>
      </div>
    </footer>
  )
}