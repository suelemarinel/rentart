import { client } from '@/sanity/lib/client'
import { artworksQuery } from '@/sanity/lib/queries'
import { Artwork } from '@/types/artwork'
import ArtworkCatalogue from '@/components/ArtworkCatalogue'
import HeroCatalogue from '@/components/HeroCatalogue'

export const revalidate = 60

export default async function HomePage() {
  const artworks: Artwork[] = await client.fetch(artworksQuery)

  return (
    <main>
      <HeroCatalogue />

{/* Transition */}
<div className="bg-[#F2F1EF] pt-16 pb-2 text-center">
  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400 mb-3">Galerie Sept</p>
  <h2 className="font-serif text-3xl text-gray-900">Notre catalogue</h2>
</div>

      <ArtworkCatalogue artworks={artworks} />
    </main>
  )
}
