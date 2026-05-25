import { MetadataRoute } from 'next'

// Static project slugs defined directly to avoid importing from "use client" modules
const projectSlugs = [
  'tinyroomconcert',
  'trct-in',
  'autopharmax',
  'seaguard',
  'groww-in',
  'looplist',
  'object-measurement',
  'spotify-ui',
  'devtune',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rithvikshetty.in'

  const routes = [
    '',
    '/about',
    '/projects',
    '/experience',
    '/achievements',
    '/blog',
    '/contact',
    // '/playground',
    '/work',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...projectUrls]
}
