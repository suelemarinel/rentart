import { groq } from 'next-sanity'

export const artworksQuery = groq`*[_type == "artwork" && available == true] | order(_createdAt desc) {
  _id,
  title,
  artist,
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