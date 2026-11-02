import { MetadataRoute } from 'next'
import { staticProjects } from '@/data/projects'

const projectSlugs = staticProjects.map((p) => p.slug)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rithvikshetty.in'

  const routes = [
    '',
    '/about',
    '/experience',
    '/awards',
    '/contact',
    '/chat',
    '/work',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
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
