import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    groq`*[_type == "artwork" && available == true]{ slug }`
  )

  const artworkUrls = slugs.map(({ slug }) => ({
    url: `https://rentart.be/catalogue/${slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://rentart.be',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://rentart.be/a-propos',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://rentart.be/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    ...artworkUrls,
  ]
}