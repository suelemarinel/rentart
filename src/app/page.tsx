import { client } from '@/sanity/lib/client'
import { artworksQuery } from '@/sanity/lib/queries'
import { Artwork } from '@/types/artwork'
import ArtworkCatalogue from '@/components/ArtworkCatalogue'
import HeroCatalogue from '@/components/HeroCatalogue'

export const revalidate = 60

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Catalogue d'œuvres d'art à louer",
  description: "Parcourez notre catalogue d'œuvres originales disponibles à la location mensuelle pour professionnels. Peintures, sculptures, photographies — livraison et installation comprises.",
}

export default async function HomePage() {
  const artworks: Artwork[] = await client.fetch(artworksQuery)

  return (
    <main>
      <HeroCatalogue />

{/* Transition */}
<div className="bg-[#F2F1EF] pt-16 pb-2 text-center">
  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">RentArt</p>
  <h2 className="font-serif text-3xl text-gray-900">Notre catalogue</h2>
</div>

      <ArtworkCatalogue artworks={artworks} />
    </main>
  )
}
