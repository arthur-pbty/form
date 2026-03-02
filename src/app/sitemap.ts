import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://form.arthurp.fr'
  const lastModified = new Date('2026-03-02')

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/creer`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mes-formulaires`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]
}
