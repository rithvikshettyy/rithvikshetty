"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion"
import { staticProjects } from "@/data/projects"

const FILTERS = [
  { id: "all", label: "All Work" },
  { id: "client", label: "Client" },
  { id: "personal", label: "Personal" },
] as const

type FilterId = (typeof FILTERS)[number]["id"]

const EASE = [0.16, 1, 0.3, 1] as const

export default function ProjectsPage() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<FilterId>("all")
  const [hovered, setHovered] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const list = staticProjects.filter((p) =>
    filter === "all" ? true : filter === "client" ? p.isClient : !p.isClient,
  )

  // Cursor-following state (viewport coords) drives both the floating preview
  // and the spotlight glow behind the list.
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const sx = useSpring(cx, { stiffness: 260, damping: 32, mass: 0.6 })
  const sy = useSpring(cy, { stiffness: 260, damping: 32, mass: 0.6 })
  const glow = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, color-mix(in oklch, currentColor 9%, transparent), transparent 72%)`

  const onMove = (e: React.MouseEvent) => {
    cx.set(e.clientX)
    cy.set(e.clientY)
  }

  const active = hovered !== null

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden pt-28 md:pt-36 pb-24">
      {/* Cursor spotlight — desktop, motion-safe */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 hidden md:block"
          style={{ backgroundImage: glow }}
        />
      )}

      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 2xl:px-72">
        <Link
          href="/"
          prefetch={false}
          className="group inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors mb-10 md:mb-16"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back Home
        </Link>

        {/* Hero */}
        <header className="mb-10 md:mb-16">
          <RevealHeading reduce={!!reduce} />
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              className="text-neutral-400 text-base md:text-lg max-w-md font-light text-balance"
            >
              Client commissions and personal builds across engineering and design — {staticProjects.length} in total.
            </motion.p>

            {/* Filter pills */}
            <div className="flex items-center gap-1 self-start md:self-auto rounded-full border border-white/15 p-1 backdrop-blur-md">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className="relative rounded-full px-4 py-2 text-xs md:text-sm font-medium tracking-tight transition-colors"
                >
                  {filter === f.id && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-white light:bg-black"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className={`relative z-10 ${filter === f.id ? "text-black light:text-white" : "text-neutral-400 hover:text-white"}`}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Kinetic marquee */}
        <Marquee reduce={!!reduce} />

        {/* Project index */}
        <div
          ref={listRef}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
          className="relative mt-4 border-t border-white/10"
        >
          <AnimatePresence mode="popLayout">
            {list.map((project, i) => (
              <ProjectRow
                key={project.slug || project.id}
                project={project}
                index={i}
                dim={active && hovered !== i}
                reduce={!!reduce}
                onHover={() => setHovered(i)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating cursor preview — desktop only */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <AnimatePresence>
              {active && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative h-[240px] w-[340px] overflow-hidden rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/15"
                >
                  <Image
                    src={list[hovered!]?.image || "/placeholder.svg"}
                    alt=""
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function RevealHeading({ reduce }: { reduce: boolean }) {
  const words = ["Selected", "Work"]
  return (
    <h1 className="text-[clamp(3rem,11vw,7rem)] font-bold tracking-tighter leading-[0.88] uppercase text-balance">
      {words.map((word, i) => (
        <span key={word} className="mr-[0.2em] inline-block overflow-hidden align-bottom pb-[0.05em]">
          <motion.span
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
            className={`inline-block ${i === 1 ? "text-neutral-600" : ""}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

function Marquee({ reduce }: { reduce: boolean }) {
  const items = ["Full Stack", "Next.js", "React", "Design Systems", "Supabase", "TypeScript", "Motion", "Product"]
  const strip = [...items, ...items]
  return (
    <div className="relative overflow-hidden py-4 border-y border-white/10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {strip.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-sm uppercase tracking-[0.25em] text-neutral-500">
            {t}
            <span className="text-neutral-700">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function ProjectRow({
  project,
  index,
  dim,
  reduce,
  onHover,
}: {
  project: any
  index: number
  dim: boolean
  reduce: boolean
  onHover: () => void
}) {
  const href = project.slug ? `/projects/${project.slug}` : project.url || "#"
  const external = !project.slug && project.url?.startsWith("http")
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -12 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index * 0.05, 0.3) }}
      onMouseEnter={onHover}
      animate={{ opacity: dim ? 0.35 : 1 }}
      className="group border-b border-white/10"
    >
      <Link href={href} prefetch={false} {...linkProps} className="block">
        <div className="flex flex-col gap-4 py-6 md:py-8 md:flex-row md:items-center md:gap-8">
          <span className="font-mono text-xs text-neutral-500 md:w-12 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title with slide-swap on hover */}
          <div className="relative flex-1 overflow-hidden">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-6">
              {project.title}
            </h3>
          </div>

          {/* Inline thumbnail — mobile (no cursor preview there) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-900 md:hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center justify-between gap-6 md:justify-end md:gap-10">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors group-hover:text-white">
              {project.category}
            </span>
            <span className="font-mono text-xs text-neutral-600">{project.year}</span>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-neutral-500 transition-all duration-300 group-hover:text-white md:opacity-0 md:-translate-x-3 md:group-hover:translate-x-0 md:group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
