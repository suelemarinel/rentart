'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const FAQ = [
  {
    q: "Quelle est la durée minimale d'un contrat ?",
    a: "La durée minimale est de 6 mois. Au-delà, le contrat est renouvelable mois par mois ou par période fixe selon vos besoins."
  },
  {
    q: "Qui est responsable en cas de dommage ?",
    a: "Les œuvres sont assurées par Galerie Sept pendant toute la durée de la location. En cas de sinistre, notre équipe gère directement la procédure — vous n'avez aucune démarche à effectuer."
  },
  {
    q: "Peut-on changer d'œuvre en cours de contrat ?",
    a: "Oui, un remplacement est possible après la période minimale d'engagement, selon disponibilité du catalogue et selon les termes de votre contrat."
  },
  {
    q: "Comment se passe l'installation dans mon établissement ?",
    a: "Notre équipe prend rendez-vous pour évaluer vos espaces, puis assure la livraison et l'accrochage. L'intervention prend généralement une demi-journée et ne perturbe pas votre activité."
  },
  {
    q: "Le rachat est-il obligatoire à la fin du contrat ?",
    a: "Non, le rachat est une option. À l'échéance, vous pouvez simplement restituer l'œuvre sans frais supplémentaires, ou renouveler votre contrat."
  },
  {
    q: "Mon établissement peut-il bénéficier des avantages fiscaux ?",
    a: "Toute société assujettie à l'impôt des sociétés en Belgique peut potentiellement déduire les loyers versés. Nous vous recommandons de valider l'application avec votre comptable."
  },
]

const STEPS = [
  {
    num: "01",
    title: "Installation",
    text: "Galerie Sept prend en charge l'intégralité du processus. Nos équipes évaluent vos espaces, sélectionnent les œuvres adaptées à votre identité visuelle, assurent la livraison et procèdent à l'accrochage professionnel — sans perturber votre activité."
  },
  {
    num: "02",
    title: "Conditions de location",
    text: "Durée minimale d'engagement, clause de résiliation souple, assurance complète couvrant les œuvres pendant toute la location. Tout est inclus dans le loyer mensuel — aucune surprise, aucun frais annexe."
  },
  {
    num: "03",
    title: "Option de rachat",
    text: "Si une œuvre devient indissociable de votre espace, vous pouvez l'acquérir à tout moment. Les loyers déjà versés sont intégralement déduits du prix de vente — une façon d'investir progressivement dans une collection qui vous appartient."
  },
  {
    num: "04",
    title: "Avantages fiscaux",
    text: "Les loyers versés sont déductibles du résultat imposable de votre société, dans le cadre de la législation fiscale belge. Pour un restaurant, un hôtel ou tout établissement assujetti à l'impôt des sociétés, louer de l'art devient un choix aussi stratégique qu'esthétique."
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-7 text-left"
      >
        <span className="text-sm font-medium text-gray-900">{question}</span>
        <span className={`w-7 h-7 border border-[#C8C7C4] rounded-full flex items-center justify-center text-base text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45 border-gray-900 text-gray-900' : ''}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className="text-sm font-light text-gray-400 leading-[1.85] pb-7 max-w-2xl">{answer}</p>
      </div>
    </div>
  )
}

export default function AProposPage() {
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const delay = parseInt(el.dataset.delay || '0')
          setTimeout(() => el.classList.add('opacity-100', 'translate-y-0'), delay)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    stepsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* HERO — plein écran, encadré façon œuvre accrochée */
        .hero-frame {
          position: relative;
          height: 100vh;
          padding: clamp(0.75rem, 0.75vw, 0.75rem);
          background: #FAFAF8;
        }
        .hero-canvas {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 2px;
        }
        .hero-media-inner {
          position: absolute;
          inset: -3%;
          width: 106%;
          height: 106%;
          background-size: cover;
          background-position: center;
          animation: kenBurns 30s ease-in-out infinite alternate;
        }
        @keyframes kenBurns {
          from { transform: scale(1) translate(0, 0); }
          to   { transform: scale(1.07) translate(-1.2%, -0.8%); }
        }
        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          opacity: 0.045;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .hero-caption {
          position: absolute;
          bottom: clamp(1.5rem, 5vw, 4rem);
          left: clamp(1.5rem, 5vw, 4rem);
          right: clamp(1.5rem, 5vw, 4rem);
          z-index: 10;
        }
        .steps-section { padding: 7rem 5rem; }
        .faq-section { padding: 7rem 5rem; }
        .cta-section { padding: 7rem 5rem; }
        .step-grid { display: grid; grid-template-columns: 80px 1fr; gap: 0 3rem; }

        @media (max-width: 767px) {
          .hero-frame { padding: 0.5rem; height: 92vh; }
          .steps-section { padding: 3rem 1.5rem; }
          .faq-section { padding: 3rem 1.5rem; }
          .cta-section { padding: 3rem 1.5rem; }
          .step-grid { grid-template-columns: 48px 1fr; gap: 0 1rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-media-inner { animation: none; }
        }
      `}</style>

      {/* HERO — plein écran, encadré, signature N&B duotone */}
      <div className="hero-frame">
        <div className="hero-canvas">
          <div
            className="hero-media-inner"
            style={{ backgroundImage: "url('/step-7.jpeg')", backgroundPosition: '50% 22%' }}
          />

          {/* Force le N&B même si le fichier source dérive, + contraste légèrement creusé */}
          <div
            className="absolute inset-0 z-[4] pointer-events-none"
            style={{ backdropFilter: 'grayscale(1) contrast(1.08)', WebkitBackdropFilter: 'grayscale(1) contrast(1.08)' }}
          />

          {/* Teinte duotone chaude — relie le N&B à la palette du site plutôt qu'un noir froid */}
          <div
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{ background: '#8A7A68', mixBlendMode: 'multiply', opacity: 0.16 }}
          />

          <div className="hero-grain" />

          {/* Voile uniforme — contraste minimum garanti */}
          <div className="absolute inset-0 z-[6] pointer-events-none bg-black/20" />

          {/* Scrim bas — zone du texte */}
          <div
            className="absolute inset-0 z-[6] pointer-events-none"
            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0) 68%)' }}
          />
          <div
            className="absolute inset-0 z-[6] pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%)' }}
          />

          {/* Eyebrow */}
          <p
            className="absolute z-10 text-[11px] font-medium tracking-[0.14em] uppercase text-white/80 flex items-center gap-3"
            style={{ top: 'clamp(4.5rem, 8vw, 6rem)', left: 'clamp(1.5rem, 5vw, 4rem)' }}
          >
            <span className="block w-7 h-px bg-white/50" />
            Galerie Sept · Bruxelles & Knokke
          </p>

          {/* Texte principal — flotte directement sur l'image */}
          <div className="hero-caption">
            <h1
              className="font-serif text-white mb-5"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
                lineHeight: 1.0,
                maxWidth: '16ch',
                textShadow: '0 2px 24px rgba(0,0,0,0.5)',
              }}
            >
              Des œuvres uniques{' '}
              <em className="italic text-white/70">pour embellir vos espaces.</em>
            </h1>

            <div className="flex flex-wrap items-end justify-between gap-6 mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.25)' }}>
              <p className="text-sm font-light text-white/85 leading-[1.8] max-w-sm" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>
                Chaque pièce de notre catalogue est une œuvre originale, sélectionnée et façonnée
                par des artistes que nous représentons.
              </p>

              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-[11px] tracking-wide text-white/70">
                <span><span className="font-serif italic text-sm text-white mr-1">+200</span>œuvres</span>
                <span className="text-white/40 mx-1">·</span>
                <span><span className="font-serif italic text-sm text-white mr-1">2</span>galeries</span>
                <span className="text-white/40 mx-1">·</span>
                <span><span className="font-serif italic text-sm text-white mr-1">100%</span>tout compris</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEPS */}
      <section className="steps-section bg-white">
        <div className="flex items-baseline justify-between border-b border-gray-100 pb-8 mb-20" style={{ marginBottom: 'clamp(2rem, 6vw, 5rem)' }}>
          <h2 className="font-serif text-3xl text-gray-900" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)' }}>Comment ça fonctionne</h2>
          <span className="text-[11px] tracking-[0.1em] uppercase text-gray-400">4 étapes</span>
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={el => { if (el) stepsRef.current[i] = el }}
            data-delay={i * 100}
            className="step-grid opacity-0 translate-y-5 transition-all duration-700"
            style={{ padding: 'clamp(1.5rem, 4vw, 3.5rem) 0', borderBottom: '1px solid #f3f4f6' }}
          >
            <span className="font-serif text-5xl text-gray-100 leading-none pt-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{step.num}</span>
            <div>
              <h3 className="font-serif text-2xl text-gray-900 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>{step.title}</h3>
              <p className="text-sm font-light text-gray-400 leading-[1.85] max-w-xl">{step.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="faq-section" style={{ background: '#F2F1EF' }}>
        <div className="flex items-baseline justify-between mb-16" style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h2 className="font-serif text-3xl text-gray-900" style={{ fontSize: 'clamp(1.5rem, 3vw, 1.875rem)' }}>Questions fréquentes</h2>
          <span className="text-[11px] tracking-[0.1em] uppercase text-gray-400">FAQ</span>
        </div>
        <div className="divide-y divide-[#C8C7C4]">
          {FAQ.map((item, i) => (
            <FaqItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="cta-section text-center" style={{ background: '#14141A' }}>
        <h2 className="font-serif text-5xl text-white leading-[1.1] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Prêt à transformer<br />
          <em className="italic text-white/45">vos espaces ?</em>
        </h2>
        <p className="text-sm font-light text-white/45 mb-12">
          Contactez-nous pour une sélection personnalisée adaptée à votre établissement.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-gray-900 text-sm font-medium tracking-wide px-11 py-4 rounded-full hover:opacity-85 transition-opacity"
        >
          Prendre contact
        </Link>
      </section>
    </>
  )
}