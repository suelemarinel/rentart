import { client } from '@/sanity/lib/client'
import { artworksQuery } from '@/sanity/lib/queries'
import { Artwork } from '@/types/artwork'
import ArtworkCatalogue from '@/components/ArtworkCatalogue'

export const revalidate = 60

export default async function HomePage() {
  const artworks: Artwork[] = await client.fetch(artworksQuery)

  return (
    <main>
      <ArtworkCatalogue artworks={artworks} />
    </main>
  )
}
