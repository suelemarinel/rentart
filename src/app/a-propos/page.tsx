'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const SLIDES = ['/hero-2.png', '/hero-3.png', '/hero-4.png', '/hero-5.png']

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

function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden" style={{ height: '100%', width: '100%' }}>
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('${src}')`, opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute top-8 right-8 text-[11px] text-white/50 tracking-[0.08em] z-10">
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-0.5 rounded-full transition-all duration-300 ${i === current ? 'w-10 bg-white' : 'w-6 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}

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
        /* Desktop : split hero */
        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100vh;
          overflow: hidden;
        }
        .hero-slideshow { display: block; }
        .steps-section { padding: 7rem 5rem; }
        .faq-section { padding: 7rem 5rem; }
        .cta-section { padding: 7rem 5rem; }
        .step-grid { display: grid; grid-template-columns: 80px 1fr; gap: 0 3rem; }

        /* Mobile : colonne unique, sans slideshow */
        @media (max-width: 767px) {
          .hero-section {
            grid-template-columns: 1fr;
            height: auto;
          }
          .hero-slideshow { display: none; }
          .steps-section { padding: 3rem 1.5rem; }
          .faq-section { padding: 3rem 1.5rem; }
          .cta-section { padding: 3rem 1.5rem; }
          .step-grid { grid-template-columns: 48px 1fr; gap: 0 1rem; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-section">
        {/* Texte — identique desktop */}
        <div className="flex flex-col justify-center px-20 bg-[#FAFAF8] relative" style={{ padding: 'clamp(5rem, 8vw, 5rem) clamp(1.5rem, 6vw, 5rem)' }}>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/10 to-transparent pointer-events-none z-10" />
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#8A8880] mb-8 flex items-center gap-3">
            <span className="block w-7 h-px bg-[#C8C7C4]" />
            Galerie Sept · Bruxelles & Knokke
          </p>
          <h1 className="font-serif text-5xl leading-[1.08] text-[#0E0E0D] mb-7" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            L&apos;art au cœur de votre établissement,{' '}
            <em className="italic text-[#8A8880]">sans contrainte.</em>
          </h1>
          <p className="text-sm font-light text-[#8A8880] leading-[1.8] max-w-sm">
            Un service de location d&apos;œuvres d&apos;art originales pensé pour les restaurants,
            hôtels et espaces professionnels qui souhaitent offrir une expérience
            visuelle forte à leurs clients.
          </p>
          <div className="mt-16 pt-8 border-t border-[#F2F1EF] flex gap-10 flex-wrap">
            {[
              { num: '+200', label: 'Œuvres disponibles' },
              { num: '2', label: 'Galeries — Bruxelles & Knokke' },
              { num: '100%', label: 'Tout compris' },
            ].map(s => (
              <div key={s.num}>
                <div className="font-serif text-3xl text-[#0E0E0D] leading-none mb-1">{s.num}</div>
                <div className="text-[11px] text-[#8A8880] tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slideshow — caché sur mobile */}
        <div className="hero-slideshow">
          <HeroSlideshow />
        </div>
      </section>

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
      <section className="cta-section text-center" style={{ background: '#0E0E0D' }}>
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