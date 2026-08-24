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
    a: "Les œuvres sont assurées par RentArt pendant toute la durée de la location. En cas de sinistre, notre équipe gère directement la procédure — vous n'avez aucune démarche à effectuer."
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
    title: "Sélection personnalisée",
    text: "On comprend votre lieu, son architecture et son identité, puis on vous propose une sélection adaptée."
  },
  {
    num: "02",
    title: "Livraison & installation",
    text: "RentArt organise la livraison et l'installation professionnelle des œuvres directement dans vos espaces."
  },
  {
    num: "03",
    title: "Vivez avec les œuvres",
    text: "Les œuvres restent dans votre établissement pendant la durée convenue, avec une formule de location simple et tout compris."
  },
  {
    num: "04",
    title: "Changez ou achetez",
    text: "Faites évoluer votre sélection au fil du temps ou choisissez d'acquérir une œuvre devenue indissociable de votre lieu."
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
        /* HERO — plein écran, sans cadre */
        .hero-frame {
          position: relative;
          height: 100vh;
        }
        .hero-canvas {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .hero-media-inner {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
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
        .steps-section { padding: 4rem 5rem 7rem; }
        .faq-section { padding: 7rem 5rem; }
        .step-item { text-align: center; }
        .step-num { color: #C8C7C4; }

          @media (max-width: 767px) {
          .steps-section { padding: 3rem 1.5rem; }
          .faq-section { padding: 3rem 1.5rem; }
        }
      `}</style>

      {/* HERO — plein écran, encadré, signature N&B duotone */}
      <div className="hero-frame">
        <div className="hero-canvas">
          <div
            className="hero-media-inner animate-hero-reveal"
            style={{ backgroundImage: "url('/hero-a-propos.jpeg')", backgroundPosition: '50% 22%' }}
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

          {/* Texte principal — flotte directement sur l'image */}
          <div className="hero-caption animate-content-reveal">
            <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/55 mb-6 flex items-center gap-3">
              <span className="block w-7 h-px bg-white/40" />
              RentArt
            </p>
            <h1
              className="font-serif leading-[1.06] text-white max-w-3xl mb-9"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 3.75rem)',
                textShadow: '0 2px 24px rgba(0,0,0,0.5)',
              }}
            >
              L&apos;art, simplement intégré<br />
              <em className="italic text-white/70">à vos espaces.</em>
            </h1>
            <p className="text-sm font-light text-white/65 leading-relaxed max-w-lg" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>
              RentArt permet aux hôtels, restaurants, bureaux et espaces professionnels de vivre
              avec des œuvres d&apos;art originales, sans devoir constituer immédiatement leur propre collection.
              Nous sélectionnons les œuvres avec vous, organisons leur livraison et leur installation,
              et vous accompagnons tout au long de la location.
            </p>
          </div>
         </div>
      </div>    


      {/* STEPS */}
      <section className="steps-section" style={{ background: '#FAFAF8' }}>
        <div className="text-center border-b border-gray-100 pb-6" style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#8A8880] mb-4 flex items-center justify-center gap-3">
            <span className="block w-7 h-px bg-[#C8C7C4]" />
            4 étapes
            <span className="block w-7 h-px bg-[#C8C7C4]" />
          </p>
          <h2 className="font-serif text-gray-900" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>Comment ça fonctionne</h2>
        </div>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={el => { if (el) stepsRef.current[i] = el }}
            data-delay={i * 100}
            className="step-item opacity-0 translate-y-10 transition-all duration-1000 ease-out"
            style={{ padding: 'clamp(1rem, 2.5vw, 2rem) 0', borderBottom: '1px solid #f3f4f6' }}
          >
            <span className="step-num font-serif leading-none block mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{step.num}</span>
            <h3 className="font-serif text-2xl text-gray-900 mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>{step.title}</h3>
            <p className="text-sm font-light text-gray-400 leading-[1.85] max-w-xl mx-auto">{step.text}</p>
          </div>
        ))}
      </section>

      {/* CTA — rectangle arrondi, avant la FAQ */}
      <section style={{ background: '#FAFAF8', padding: 'clamp(2rem, 6vw, 4rem) clamp(1.5rem, 6vw, 5rem)' }}>
        <div
          className="text-center"
          style={{
            background: '#14141A',
            borderRadius: '2rem',
            padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 3rem)',
          }}
        >
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
        </div>
      </section>

      {/* FAQ — tout en bas */}
      <section className="faq-section" style={{ background: '#FAFAF8' }}>
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
    </>
  )
}