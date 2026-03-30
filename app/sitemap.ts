import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { staticProjects } from '@/components/project-list'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rithvikshetty.in'
  
  // Try to fetch dynamic projects from Sanity
  let sanityProjects = []
  try {
    sanityProjects = await client.fetch(projectsQuery)
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error)
  }

  // Combine static and sanity projects, preferring sanity if it exists
  const allProjects = sanityProjects && sanityProjects.length > 0 ? sanityProjects : staticProjects

  const projectUrls = allProjects
    .filter((project: any) => project.slug)
    .map((project: any) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  const routes = [
    '',
    '/about',
    '/projects',
    '/experience',
    '/achievements',
    '/blog',
    '/contact',
    '/playground',
    '/work'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...projectUrls]
}
