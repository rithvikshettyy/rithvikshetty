'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

// One experience per viewport — wheel / swipe / arrows flip through a 3D
// card deck: the current card tips away, the next rises in underneath.
const experiences = [
  {
    type: 'Internship',
    title: 'Salesforce & Marketing Automation Intern',
    company: 'Lupin Ltd',
    period: 'Dec 2025 - Feb 2026',
    description:
      'Streamlining business processes and enhancing outreach strategies using Salesforce CRM and advanced marketing automation tools.',
    highlights: ['Salesforce', 'Marketing Automation', 'Analytics'],
  },
  {
    type: 'Internship',
    title: 'Machine Learning Intern',
    company: 'ION Chemicals',
    period: 'Jan 2025 - Apr 2025',
    description:
      'Developing and optimizing machine learning models for chemical analysis and process automation, improving prediction accuracy across datasets.',
    highlights: ['Python', 'Machine Learning', 'Scikit-learn'],
  },
  {
    type: 'Leadership',
    title: 'Technical Secretary',
    company: 'Technical Team, SIES GST',
    period: '2025 - 2026',
    description:
      'Leading technical initiatives and managing large-scale projects while ensuring high standards of execution and innovation for the college community.',
    highlights: ['Leadership', 'Project Management', 'Technical Strategy'],
  },
  {
    type: 'Leadership',
    title: 'Design Lead',
    company: 'TEDx SIESGST',
    period: '2025 - 2026',
    description:
      'Leading design direction and creative vision for TEDx events and initiatives, creating compelling and cohesive visual experiences.',
    highlights: ['Design', 'Figma', 'Creative Direction', 'UI/UX'],
  },
  {
    type: 'Internship',
    title: 'Graphic Designer',
    company: "BM's Drishtency",
    period: 'Feb 2024 - Mar 2024',
    description:
      'Designed high-impact graphics and visual content for digital marketing campaigns and brand identity materials.',
    highlights: ['Graphic Design', 'Figma', 'Branding'],
  },
]

const N = experiences.length
const EASE = [0.16, 1, 0.3, 1] as const

// Deck-flip variants: direction decides which edge the card enters/leaves from.
const cardVariants = {
  enter: (d: number) => ({
    y: d >= 0 ? 110 : -110,
    opacity: 0,
    scale: 0.92,
    rotateX: d >= 0 ? -14 : 14,
  }),
  center: { y: 0, opacity: 1, scale: 1, rotateX: 0 },
  exit: (d: number) => ({
    y: d >= 0 ? -110 : 110,
    opacity: 0,
    scale: 0.96,
    rotateX: d >= 0 ? 10 : -10,
  }),
}

export default function Work() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const lock = useRef(0)
  const touchY = useRef<number | null>(null)

  const go = useCallback((d: number) => {
    const now = Date.now()
    if (now - lock.current < 850) return
    lock.current = now
    setState(([i]) => [(((i + d) % N) + N) % N, d])
  }, [])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 25) return
      go(e.deltaY > 0 ? 1 : -1)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [go])

  const exp = experiences[index]

  return (
    <main
      className="relative h-[100dvh] overflow-hidden bg-black text-white [font-family:Helvetica,Arial,sans-serif]"
      onTouchStart={(e) => (touchY.current = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (touchY.current === null) return
        const dy = touchY.current - e.changedTouches[0].clientY
        if (Math.abs(dy) > 50) go(dy > 0 ? 1 : -1)
        touchY.current = null
      }}
    >
      {/* Crimson ambient glow, echoing the info page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_70%_45%,rgba(200,33,15,0.35),rgba(120,20,10,0.08)_45%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.65),transparent_55%)]" />

      {/* Top bar */}
      <div className="absolute inset-x-6 top-6 md:inset-x-12 md:top-12 z-20 flex items-start justify-between">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-none">Work</h1>
        <Link
          href="/"
          prefetch={false}
          className="text-sm md:text-base font-semibold uppercase tracking-widest text-white/75 hover:text-white transition-colors"
        >
          Back
        </Link>
      </div>

      {/* Ghost index number */}
      <AnimatePresence mode="popLayout" custom={dir}>
        <motion.span
          key={`ghost-${index}`}
          custom={dir}
          initial={{ opacity: 0, y: dir >= 0 ? 60 : -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: dir >= 0 ? -60 : 60 }}
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden="true"
          className="pointer-events-none absolute right-[4vw] top-1/2 z-0 -translate-y-1/2 select-none text-[38vh] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.08)]"
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      {/* Card */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-[6vw] [perspective:1200px]">
        <AnimatePresence mode="popLayout" custom={dir}>
          <motion.article
            key={index}
            custom={dir}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: EASE }}
            className="max-w-3xl will-change-transform [transform-style:preserve-3d]"
          >
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">{exp.type}</span>
              <span className="h-px w-10 bg-white/20" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{exp.period}</span>
            </div>

            <h2 className="mt-4 text-4xl md:text-6xl xl:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-balance">
              {exp.title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-white/60">{exp.company}</p>

            <p className="mt-6 max-w-xl text-base md:text-lg leading-[1.65] font-light text-white/90">
              {exp.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {exp.highlights.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wider text-white/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Right rail — index nav */}
      <nav className="absolute right-6 md:right-12 top-1/2 z-20 -translate-y-1/2 flex flex-col items-end gap-3">
        {experiences.map((e, i) => (
          <button
            key={e.title}
            onClick={() => {
              if (i === index) return
              lock.current = 0
              go(i - index)
            }}
            aria-label={`Go to ${e.title}`}
            className={`flex items-center gap-2 text-[11px] font-semibold tracking-widest transition-colors ${
              i === index ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
            <span
              className={`h-px transition-all duration-500 ${i === index ? 'w-8 bg-accent' : 'w-4 bg-white/25'}`}
            />
          </button>
        ))}
      </nav>

      {/* Bottom bar */}
      <div className="absolute inset-x-6 bottom-6 md:inset-x-12 md:bottom-8 z-20 flex items-end justify-between">
        <span className="text-sm text-white/50 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">Scroll to navigate</span>
      </div>
    </main>
  )
}
