import { client } from '@/sanity/lib/client'
import { artworkBySlugQuery } from '@/sanity/lib/queries'
import { Artwork } from '@/types/artwork'
import { notFound } from 'next/navigation'
import ArtworkDetail from '@/components/ArtworkDetail'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const artwork: Artwork = await client.fetch(artworkBySlugQuery, { slug })

  if (!artwork) return { title: 'Œuvre introuvable' }

  return {
    title: artwork.title,
    description: `Louez "${artwork.title}" de ${artwork.artist} — ${artwork.dimensions ?? ''} — à partir de ${artwork.price}€/mois. Livraison et installation comprises.`,
    openGraph: {
      title: artwork.title,
      description: `Location mensuelle à partir de ${artwork.price}€. Tout compris.`,
      images: artwork.images?.[0]?.asset?.url
        ? [{ url: artwork.images[0].asset.url }]
        : [],
    },
  }
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params
  const artwork: Artwork = await client.fetch(artworkBySlugQuery, { slug })

  if (!artwork) notFound()

  return <ArtworkDetail artwork={artwork} />
}