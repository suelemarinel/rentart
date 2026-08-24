'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/lib/firebase'

export default function CompleterProfilPage() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleSave = async () => {
    if (!user) return
    if (!phone.trim()) {
      setError('Le numéro de téléphone est requis.')
      return
    }
    setError(null)
    setLoading(true)
    await setDoc(doc(db, 'users', user.uid), { phone: phone.trim() }, { merge: true })
    router.push('/favoris')
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center" style={{ padding: 'clamp(1.5rem, 6vw, 2rem)' }}>
      <div className="w-full max-w-sm text-center">

        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#8A8880] mb-4 flex items-center justify-center gap-3">
          <span className="block w-7 h-px bg-[#C8C7C4]" />
          RentArt
          <span className="block w-7 h-px bg-[#C8C7C4]" />
        </p>

        <h1 className="font-serif text-[#14141A] mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
          Presque terminé.
        </h1>
        <p className="text-sm text-[#8A8880] leading-relaxed mb-8">
          Laissez-nous votre numéro pour qu&apos;on puisse vous recontacter au sujet de votre sélection.
        </p>

        <div className="flex flex-col gap-2 text-left mb-2">
          <label className="text-[11px] font-medium tracking-widest uppercase text-[#8A8880]">
            Téléphone
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+32 470 12 34 56"
            className="bg-white border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-[#14141A] placeholder:text-[#C8C7C4] focus:outline-none focus:border-[#8A8880] transition-colors"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 text-left mb-4">{error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-[#14141A] text-white text-sm font-medium py-4 rounded-xl hover:opacity-80 transition-opacity disabled:opacity-50 mt-4"
        >
          {loading ? 'Enregistrement…' : 'Continuer'}
        </button>
      </div>
    </div>
  )
}