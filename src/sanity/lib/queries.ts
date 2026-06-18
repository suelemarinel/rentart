import { groq } from 'next-sanity'

export const artworksQuery = groq`*[_type == "artwork" && available == true] | order(_createdAt desc) {
  _id,
  title,
  artist,
  slug,
  category,
  dimensions,
  price,
  year,
  images[] {
    asset-> {
      _id,
      url
    },
    hotspot
  }
}`

export const artworkBySlugQuery = groq`*[_type == "artwork" && slug.current == $slug][0] {
  _id,
  title,
  artist,
  slug,
  category,
  dimensions,
  price,
  year,
  available,
  images[] {
    asset-> {
      _id,
      url
    },
    hotspot
  }
}`