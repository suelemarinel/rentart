'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', etablissement: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: brancher un vrai service d'envoi (Resend, Formspree, etc.)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#8A8880] mb-4 flex items-center gap-3">
            <span className="block w-7 h-px bg-[#C8C7C4]" />
            Galerie Sept
          </p>
          <h1 className="font-serif text-4xl text-[#0E0E0D] leading-tight mb-4">
            Parlons de votre<br />
            <em className="italic text-[#8A8880]">projet.</em>
          </h1>
          <p className="text-sm font-light text-[#8A8880] leading-[1.8]">
            Décrivez votre espace et vos besoins — nous vous revenons sous 24h avec une sélection personnalisée.
          </p>
        </div>

        {/* Calendly */}
        <div className="bg-white border border-[#E8E7E4] rounded-2xl p-8 text-center mb-2">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880] mb-3">Consultation</p>
          <h2 className="font-serif text-2xl text-[#0E0E0D] mb-3">Prendre rendez-vous</h2>
          <p className="text-sm font-light text-[#8A8880] leading-[1.8] mb-8">
            Rencontrons-nous pour sélectionner ensemble les œuvres adaptées à votre espace.
          </p>
          
           <a href="https://calendly.com/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0E0E0D] text-white text-sm font-medium px-10 py-4 rounded-full hover:opacity-80 transition-opacity"
          >
            Choisir un créneau
          </a>
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-6 my-14">
          <div className="flex-1 h-px bg-[#E8E7E4]" />
          <span className="text-[11px] tracking-widest uppercase text-[#8A8880]">ou</span>
          <div className="flex-1 h-px bg-[#E8E7E4]" />
        </div>

        {/* Formulaire */}
        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880]">Nom</label>
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                  placeholder="Jean Dupont"
                  className="bg-white border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880]">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jean@restaurant.be"
                  className="bg-white border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880]">Établissement</label>
              <input
                type="text"
                value={form.etablissement}
                onChange={e => setForm(f => ({ ...f, etablissement: e.target.value }))}
                placeholder="Restaurant Le Zinc, Bruxelles"
                className="bg-white border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880]">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Décrivez votre espace, le type d'œuvres recherché, votre budget mensuel..."
                className="bg-white border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0E0E0D] text-white text-sm font-medium py-4 rounded-xl hover:opacity-80 transition-opacity mt-2"
            >
              Envoyer le message
            </button>
          </form>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-6">✦</p>
            <h2 className="font-serif text-2xl text-gray-900 mb-3">Message envoyé</h2>
            <p className="text-sm font-light text-[#8A8880]">Nous vous recontactons sous 24h.</p>
          </div>
        )}

      </div>
    </div>
  )
}