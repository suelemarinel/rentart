import { Artwork } from '@/types/artwork'

type Props = {
  artwork: Artwork
}

const CATEGORY_LABELS: Record<string, string> = {
  peinture: 'Peinture',
  sculpture: 'Sculpture',
  photographie: 'Photographie',
  dessin: 'Dessin',
  tirage: 'Tirage',
}

export default function ArtworkCard({ artwork }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        {artwork.image?.asset?.url ? (
          <img
            src={artwork.image.asset.url}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
       ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
          ✦
        </div>
  )}
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-4">

        {/* Ligne 1 : titre + artiste */}
        <div className="mb-2">
          <p className="font-serif text-base leading-snug text-gray-900">{artwork.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{artwork.artist}</p>
        </div>

        {/* Ligne 2 : catégorie + dimensions */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 bg-gray-100 rounded-md px-2 py-1 text-[11px] font-medium text-gray-500">
            {CATEGORY_LABELS[artwork.category]}
            <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />
            {artwork.dimensions}
          </span>
        </div>

        {/* Ligne 3 : prix */}
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-semibold text-gray-900">à partir de {artwork.price}€</span>
          <span className="text-[11px] text-gray-400">/ mois · Tout compris</span>
        </div>

      </div>
    </div>
  )
}