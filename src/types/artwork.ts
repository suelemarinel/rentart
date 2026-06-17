export type Artwork = {
  _id: string
  title: string
  artist: string
  category: 'peinture' | 'sculpture' | 'photographie' | 'dessin' | 'tirage'
  dimensions: string
  price: number
  year: number
  available: boolean
  image?: {
    asset: {
      _id: string
      url: string
    }
    hotspot?: {
      x: number
      y: number
    }
  }
}