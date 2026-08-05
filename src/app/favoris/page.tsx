import { client } from '@/sanity/lib/client'
import { Artwork } from '@/types/artwork'
import { artworksQuery } from '@/sanity/lib/queries'
import FavoritesGrid from '@/components/FavoritesGrid'

export const metadata = {
  title: 'Mes favoris',
}

export default async function FavorisPage() {
  const artworks: Artwork[] = await client.fetch(artworksQuery)

  return <FavoritesGrid artworks={artworks} />
}