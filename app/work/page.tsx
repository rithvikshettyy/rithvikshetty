'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { staticProjects } from '@/data/projects'

// Same animated red flow-field as the info page — client + desktop only.
const RedFlowBg = dynamic(() => import('@/components/red-flow-bg'), { ssr: false })

// Standalone project index. Deliberately not wired to the homepage #work orbit
// section — this is its own page, reached from the hero's "Work" link.
const projects = staticProjects.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  category: p.category,
  year: p.year,
  image: p.image,
  url: p.url,
}))

export default function WorkPage() {
  const [webgl, setWebgl] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    setWebgl(window.innerWidth >= 768)
  }, [])

  const current = projects[active]

  return (
    <main className="relative min-h-[100dvh] lg:h-[100dvh] bg-black text-white overflow-hidden [font-family:Helvetica,Arial,sans-serif]">
      {/* Static crimson glow — mobile fallback / base under the shader */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_34%_42%,rgba(200,33,15,0.55),rgba(120,20,10,0.12)_45%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.6),transparent_55%)]" />
      {webgl && (
        <>
          <div className="absolute inset-0 z-0 scale-110 blur-[13px] opacity-65">
            <RedFlowBg dpr={0.6} paused={false} disableAnimation={reduced} enableMouseInteraction={!reduced} />
          </div>
          <div className="pointer-events-none absolute inset-0 z-0 bg-black/30" />
        </>
      )}

      {/* Top bar — mirrors the info page */}
      <div className="absolute inset-x-6 top-6 md:inset-x-12 md:top-12 z-20 flex items-start justify-between">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-none">Work</h1>
        <Link
          href="/"
          prefetch={false}
          className="group text-sm md:text-base font-semibold uppercase tracking-widest text-white/75 hover:text-white transition-colors"
          aria-label="Back"
        >
          {/* Char-roll hover — each letter slides up, revealing its copy */}
          {'Back'.split('').map((ch, i) => (
            <span key={i} className="relative inline-block overflow-hidden align-bottom">
              <span
                className="block transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch}
                <span className="absolute left-0 top-full" aria-hidden="true">
                  {ch}
                </span>
              </span>
            </span>
          ))}
        </Link>
      </div>

      <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-[6vw] pt-28 md:pt-24 pb-24 md:pb-20">
        <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-x-20 min-h-0 content-start">
          {/* Left — hovered project preview + meta */}
          <div className="hidden lg:flex flex-col">
            <div className="relative w-full max-w-[340px]">
              <span className="absolute -left-2 -top-2 text-white/50 text-lg select-none">+</span>
              <span className="absolute -right-2 -top-2 text-white/50 text-lg select-none">+</span>
              <span className="absolute -left-2 -bottom-2 text-white/50 text-lg select-none">+</span>
              <span className="absolute -right-2 -bottom-2 text-white/50 text-lg select-none">+</span>
              <div className="relative aspect-[340/404] overflow-hidden border border-white/15 bg-black/40">
                {projects.map((p, i) => (
                  <Image
                    key={p.slug}
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="340px"
                    priority={i === 0}
                    className={`object-cover object-center transition-opacity duration-500 ${
                      i === active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>

            <dl className="mt-5 space-y-5 max-w-[340px]">
              <div className="flex items-baseline justify-between gap-6 border-t border-white/10 pt-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Category</dt>
                <dd className="text-[15px] text-right">{current.category}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-white/10 pt-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Year</dt>
                <dd className="text-[15px] text-right tabular-nums">{current.year}</dd>
              </div>
            </dl>
          </div>

          {/* Right — project index */}
          <div className="flex flex-col min-h-0">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
              Selected Projects ({String(projects.length).padStart(2, '0')})
            </span>

            <ul className="mt-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2 border-t border-white/10">
              {projects.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    href={p.slug ? `/projects/${p.slug}` : p.url || '/'}
                    prefetch={false}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-baseline gap-4 md:gap-6 border-b border-white/10 py-3.5 md:py-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="text-[11px] font-semibold tabular-nums text-white/35 group-hover:text-accent transition-colors">
                      {p.id}
                    </span>
                    <span className="flex-1 text-2xl md:text-[34px] font-light tracking-[-0.02em] leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                      {p.title}
                    </span>
                    <span className="hidden md:block text-[11px] uppercase tracking-[0.14em] text-white/45">
                      {p.category}
                    </span>
                    <span className="text-[11px] tabular-nums text-white/35">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — pinned like the info page */}
      <div className="absolute inset-x-6 bottom-6 md:inset-x-12 md:bottom-8 z-20 flex items-end justify-between">
        <a
          href="mailto:rithvikshetty2004@gmail.com"
          className="text-sm text-white/80 hover:text-white transition-colors"
        >
          rithvikshetty2004@gmail.com
        </a>
        <Link
          href="/about"
          prefetch={false}
          className="text-[11px] uppercase tracking-[0.2em] text-white/45 hover:text-white transition-colors"
        >
          Info
        </Link>
      </div>
    </main>
  )
}
