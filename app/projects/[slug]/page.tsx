import type { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { singleProjectQuery } from "@/sanity/lib/queries"
import { staticProjects } from "@/data/projects"
import ProjectDetail from "./project-detail"

export async function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }))
}

async function getProject(slug: string) {
  const staticProj = staticProjects.find((p) => p.slug === slug)

  try {
    const data = await client.fetch(singleProjectQuery, { slug })
    if (data) {
      const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))
      return { ...staticProj, ...cleanData }
    }
  } catch (error) {
    console.error("Error fetching project:", error)
  }

  return staticProj ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: "Project Not Found | Rithvik Shetty" }
  }

  const title = `${project.title} | Rithvik Shetty`
  const description = project.description || `Case study for ${project.title}, a project by Rithvik Shetty.`
  const image = project.image?.asset?.url || project.image || "https://rithvikshetty.in/og-image.jpg"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rithvikshetty.in/projects/${slug}`,
      type: "article",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `https://rithvikshetty.in/projects/${slug}`,
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-4xl font-bold mb-6 tracking-tighter">PROJECT NOT FOUND</h1>
        <Link href="/" className="text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all">
          Back to Home
        </Link>
      </div>
    )
  }

  const image = project.image?.asset?.url || project.image || "https://rithvikshetty.in/og-image.jpg"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: `https://rithvikshetty.in/projects/${slug}`,
            image,
            dateCreated: project.year,
            creator: {
              "@type": "Person",
              name: "Rithvik Shetty",
              url: "https://rithvikshetty.in",
            },
            ...(project.url ? { mainEntityOfPage: project.url } : {}),
          }),
        }}
      />
      <ProjectDetail project={project} />
    </>
  )
}
