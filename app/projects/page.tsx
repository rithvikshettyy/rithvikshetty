"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { staticProjects } from "@/components/project-list"

export default function ProjectsPage() {
  const clientProjects = staticProjects.filter(p => p.isClient)
  const myProjects = staticProjects.filter(p => !p.isClient)

  const renderProjectCard = (project: any, index: number, isPriority: boolean = false) => {
    const href = project.slug ? `/projects/${project.slug}` : (project.url || "#")
    const isInternal = !!project.slug
    const linkProps = !isInternal && project.url ? { target: "_blank", rel: "noopener noreferrer" } : {}

    return (
      <Link
        key={index}
        href={href}
        {...linkProps}
      >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 mb-4 md:mb-6 rounded-lg">
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-10" />
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={isPriority}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2 md:mb-3 gap-2">
            <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
            <span className="text-xs md:text-sm font-mono text-neutral-500 flex-shrink-0">{project.year}</span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed mb-3 md:mb-4">{project.description}</p>
          <span className="inline-block text-xs text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
            View Project →
          </span>
        </div>
      </motion.div>
    </Link>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80">
        <div className="mb-12 md:mb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest text-neutral-500 hover:text-white mb-6 md:mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back Home
          </Link>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
            My <span className="text-neutral-600">Projects</span>
          </h1>
          <p className="text-neutral-400 mt-4 md:mt-6 text-base md:text-xl max-w-2xl font-light">
            A curated selection of client commissions and personal initiatives across engineering and design.
          </p>
        </div>

        {/* Client Projects Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-500 whitespace-nowrap">Client Projects</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-20">
            {clientProjects.map((project, index) => renderProjectCard(project, index, index < 2))}
          </div>
        </div>

        {/* My Projects Section */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-500 whitespace-nowrap">My Projects</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-20">
            {myProjects.map((project, index) => renderProjectCard(project, index, false))}
          </div>
        </div>
      </div>
    </div>
  );
}
