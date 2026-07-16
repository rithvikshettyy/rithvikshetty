"use client"

import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import { staticProjects } from "@/data/projects"

export { staticProjects }

type Filter = "all" | "client" | "personal"
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "client", label: "Client" },
  { id: "personal", label: "Personal" },
]

export default function ProjectList() {
  const [hoveredProject, setHoveredProject] = useState<any>(null)
  const [filter, setFilter] = useState<Filter>("all")

  const visibleProjects = staticProjects.filter((p) =>
    filter === "all" ? true : filter === "client" ? (p as any).isClient : !(p as any).isClient
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <div className="py-32 px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 w-full mx-auto">
      <div className="mb-20 border-b border-white/20 pb-6 flex justify-between items-end relative overflow-visible">
        <div className="flex items-center gap-2 md:gap-4 w-fit h-fit">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">SELECTED WORKS</h2>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 md:w-24 md:h-24 relative shrink-0 -ml-6 md:-ml-0"
          >
            <Image src="/star3d.png" alt="Star Accent" fill className="object-contain drop-shadow-2xl brightness-110" />
          </motion.div>
        </div>
        <span className="hidden md:inline-block text-sm text-neutral-500">( 2022 — 2026 )</span>
      </div>

      {/* Work-type filter */}
      <div className="mb-8 flex items-center gap-2 md:gap-3">
        {FILTERS.map((f) => {
          const active = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`relative rounded-full px-4 py-2 text-xs md:text-sm font-medium uppercase tracking-widest transition-colors ${
                active ? "text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col" onMouseMove={handleMouseMove}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Hover Image */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale: hoveredProject ? 1 : 0,
          opacity: hoveredProject ? 1 : 0,
          rotate: hoveredProject ? 5 : 0,
        }}
        className="fixed top-0 left-0 w-80 h-52 pointer-events-none z-[60] overflow-hidden rounded-xl border border-white/20 shadow-2xl transition-all duration-300 ease-out"
      >
        {hoveredProject && (
          <Image
            src={hoveredProject.image || "/placeholder.svg"}
            alt={hoveredProject.title}
            fill
            className="object-cover"
          />
        )}
      </motion.div>

      <div className="mt-20 flex justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/projects"
            prefetch={false}
            className="group relative px-8 py-4 border border-white/30 rounded-full text-sm uppercase tracking-widest overflow-hidden inline-block"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              View All Projects
            </span>
            <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function ProjectItem({ project, onMouseEnter, onMouseLeave }: { project: any; onMouseEnter: () => void; onMouseLeave: () => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Use local slug-based URL if available, otherwise external URL, otherwise /projects
  const href = project.slug ? `/projects/${project.slug}` : (project.url || "/projects")
  const isExternal = !project.slug && project.url && project.url.startsWith("http")
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative border-b border-white/10 py-8 cursor-pointer transition-colors hover:bg-neutral-900/50"
    >
      <Link
        href={href}
        prefetch={false}
        {...linkProps}
        className="flex flex-col px-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6 md:w-1/2">
            <span className="text-xs font-mono text-neutral-500 shrink-0">/{project.id}</span>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-4">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center justify-between md:w-1/2 md:justify-end gap-12">
            <span className="text-sm uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
              {project.category}
            </span>
            <span className="text-sm font-mono text-neutral-600">{project.year}</span>
            <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>

        {/* Expandable Description */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:ml-[3.25rem]">
          <div className="overflow-hidden">
            <p className="pt-4 pb-2 text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed transform md:translate-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:delay-100">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
