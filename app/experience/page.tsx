'use client'

import { useState, useRef, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  useReducedMotion,
  animate,
} from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Building2, ArrowUpRight } from 'lucide-react'

const workExperiences = [
  {
    title: 'Salesforce & Marketing Automation Intern',
    company: 'Lupin Ltd',
    period: 'Dec 2025 — Feb 2026',
    description: 'Streamlining business processes and enhancing outreach strategies using Salesforce CRM and advanced marketing automation tools.',
    skills: ['Salesforce', 'Marketing Automation', 'Analytics', 'Technical Strategy'],
    type: 'Internship',
    certificateUrl: 'experience/lupin.pdf',
  },
  {
    title: 'Machine Learning Intern',
    company: 'ION Chemicals',
    period: 'Jan 2025 — Apr 2025',
    description: 'Developing and optimizing machine learning models for chemical analysis and process automation, improving prediction accuracy across datasets.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Scikit-learn'],
    type: 'Internship',
    certificateUrl: 'experience/Ionchemicals.pdf',
  },
  {
    title: 'Graphic Designer',
    company: "BM's Drishtency",
    period: 'Feb 2024 — Mar 2024',
    description: 'Designed high-impact graphics and visual content for digital marketing campaigns and brand identity materials.',
    skills: ['Graphic Design', 'Figma', 'Visual Design', 'Branding'],
    type: 'Internship',
    certificateUrl: '#',
  },
  {
    title: 'Graphic Designer',
    company: 'AASK RETAIL LLP',
    period: 'Jan 2024 — Feb 2024',
    description: 'Specialized in apparel design by creating custom T-shirt graphics and high-fidelity mockups for new retail collections.',
    skills: ['Graphic Design', 'Figma', 'Apparel Design', 'Mockup Design'],
    type: 'Internship',
    certificateUrl: 'experience/irsya.pdf',
  },
]

const collegePositions = [
  {
    title: 'Technical Secretary',
    company: 'Technical Team',
    period: '2025 — 2026',
    description: 'Leading technical initiatives and managing large-scale projects while ensuring high standards of execution and innovation for the college community.',
    skills: ['Leadership', 'Project Management', 'Technical Strategy'],
    type: 'Leadership',
  },
  {
    title: 'Design Lead',
    company: 'TEDx SIESGST',
    period: '2025 — 2026',
    description: 'Leading design direction and creative vision for TEDx events and initiatives, creating compelling and cohesive visual experiences.',
    skills: ['Design', 'Figma', 'Creative Direction', 'UI/UX'],
    type: 'Leadership',
  },
  {
    title: 'Social Media Lead',
    company: 'Ecell SIESGST',
    period: 'Aug 2025 — Dec 2025',
    description: 'Coordinating social media strategies and digital presence to promote entrepreneurship and innovation-focused events.',
    skills: ['Leadership', 'Strategy', 'Growth', 'Marketing'],
    type: 'Leadership',
  },
]

const TABS = [
  { id: 'work', label: 'Work' },
  { id: 'college', label: 'Leadership' },
] as const

type TabId = (typeof TABS)[number]['id']

const EASE = [0.16, 1, 0.3, 1] as const

export default function ExperiencePage() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState<TabId>('work')
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const list = tab === 'work' ? workExperiences : collegePositions

  return (
    <div className="bg-black text-white min-h-screen pt-28 md:pt-36 pb-24 overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 2xl:px-72">
        <Link
          href="/"
          prefetch={false}
          className="group inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors mb-10 md:mb-16"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back Home
        </Link>

        {/* Hero */}
        <header className="mb-12 md:mb-20">
          <RevealHeading reduce={!!reduce} />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            className="mt-6 md:mt-8 text-neutral-400 text-base md:text-lg max-w-lg font-light text-balance"
          >
            The intersection of industry experience and academic leadership — a running log of the work.
          </motion.p>
        </header>

        {/* Tab pills */}
        <div className="mb-14 md:mb-20 flex items-center gap-1 w-fit rounded-full border border-black/10 dark:border-white/15 p-1 backdrop-blur-md">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative rounded-full px-5 md:px-7 py-2.5 text-xs md:text-sm font-medium tracking-tight transition-colors"
            >
              {tab === t.id && (
                <motion.span
                  layoutId="exp-tab-pill"
                  className="absolute inset-0 rounded-full bg-white light:bg-black"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className={`relative z-10 ${tab === t.id ? 'text-black light:text-white' : 'text-neutral-500 hover:text-black dark:hover:text-white'}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12" ref={timelineRef}>
          {/* Spine */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-black/10 dark:bg-white/10" />
          {!reduce && (
            <motion.div
              className="absolute left-0 top-2 bottom-2 w-px bg-black dark:bg-white origin-top"
              style={{ scaleY }}
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {list.map((exp, i) => (
                <ExperienceEntry key={exp.title + exp.company} exp={exp} index={i} reduce={!!reduce} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="mt-28 md:mt-40 pt-12 md:pt-16 border-t border-black/10 dark:border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
            {[
              { value: 4, suffix: '+', label: 'Years Active' },
              { value: 7, suffix: '', label: 'Roles Held' },
              { value: 6, suffix: '', label: 'Organizations' },
              { value: 15, suffix: '+', label: 'Skills Used' },
            ].map((stat, i) => (
              <StatCounter key={stat.label} {...stat} delay={i * 0.08} reduce={!!reduce} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RevealHeading({ reduce }: { reduce: boolean }) {
  const words = ['The', 'Journey']
  return (
    <h1 className="text-[clamp(3rem,12vw,7.5rem)] font-bold tracking-tighter leading-[0.86] uppercase text-balance">
      {words.map((word, i) => (
        <span key={word} className="mr-[0.2em] inline-block overflow-hidden align-bottom pb-[0.06em]">
          <motion.span
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
            className={`inline-block ${i === 1 ? 'text-neutral-600' : ''}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

function ExperienceEntry({ exp, index, reduce }: { exp: any; index: number; reduce: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const hasCert = exp.certificateUrl && exp.certificateUrl !== '#'

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative py-8 md:py-12 border-b border-black/[0.07] dark:border-white/10 last:border-b-0"
    >
      {/* Node */}
      <motion.span
        aria-hidden
        initial={false}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.4 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        className="absolute -left-[calc(2rem+5px)] md:-left-[calc(3rem+5px)] top-10 md:top-14 h-[10px] w-[10px] rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-black"
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <span className="font-mono text-xs text-neutral-500">{exp.period}</span>
          <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter leading-[1.05] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:translate-x-2">
            {exp.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-neutral-500 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Building2 size={14} /> {exp.company}
            </span>
            <span className="inline-flex items-center gap-1.5 md:hidden">
              <Calendar size={14} /> {exp.period}
            </span>
          </div>
        </div>
        <span className="h-fit shrink-0 rounded-full border border-black/10 dark:border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-300">
          {exp.type}
        </span>
      </div>

      <p className="mt-5 max-w-2xl text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed text-pretty">
        {exp.description}
      </p>

      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill: string) => (
            <span
              key={skill}
              className="rounded-full border border-black/10 dark:border-white/15 px-3 py-1 text-[11px] text-neutral-600 dark:text-neutral-300 transition-colors hover:border-black/40 hover:text-black dark:hover:border-white/40 dark:hover:text-white"
            >
              {skill}
            </span>
          ))}
        </div>

        {hasCert && (
          <a
            href={exp.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-black dark:hover:text-white shrink-0"
          >
            View Certificate
            <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

function StatCounter({ value, suffix, label, delay, reduce }: { value: number; suffix: string; label: string; delay: number; reduce: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.1,
      delay,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, delay, reduce])

  return (
    <div ref={ref}>
      <div className="text-4xl md:text-6xl font-bold tracking-tighter tabular-nums">
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">{label}</div>
    </div>
  )
}
