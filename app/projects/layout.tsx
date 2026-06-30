import type React from 'react'
import { staticProjects } from '@/data/projects'

export { metadata } from './metadata'

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: staticProjects.map((project, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://rithvikshetty.in/projects/${project.slug}`,
              name: project.title,
            })),
          }),
        }}
      />
      {children}
    </>
  )
}
