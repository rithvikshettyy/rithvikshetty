'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Trophy, Award, Medal, Plus, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

const hackathons = [
  {
    title: "Conquer Space - Inter Collegiate Exhibition",
    description: "In presence of Dr. V. Narayanan, Chairman of ISRO",
    date: "October, 2025",
    icon: Medal,
    image: "/isro.PNG",
  },
  {
    title: "Title Winner - Most Product Readiness Award: HackCelestial 2.0",
    description: "Around 250+ participants",
    date: "September 2025",
    icon: Trophy,
    image: "/hackcelestial.PNG",
  },
  {
    title: "First Position in Cognition'24",
    description: "Technical Team, SIESGST",
    date: "2024-2025",
    icon: Award,
    image: "/cognition.png",
  },
  {
    title: "Technical Head - Student Council",
    description: "Technical Team, SIESGST",
    date: "2024-2025",
    icon: Award,
    image: "/tech_head.jpg",
  },
]

// The "Awards & Recognitions" cinematic block — sticky hero + tilt tiles.
// Used standalone on /awards and embedded on the homepage.
export default function AwardsSection() {
  const containerRef = useRef(null)
  const tilesRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div ref={containerRef} className="w-full bg-black text-white min-h-[200vh] relative">
      {/* Cinematic Hero Section */}
      <section className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden pointer-events-none z-20">
        {/* Ambient background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-25 dark:opacity-40 z-0 pointer-events-none"
        >
          <source src="/awards.mp4" type="video/mp4" />
        </video>
        {/* Legibility wash over the video */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-white/70 via-white/30 to-white/70 dark:from-black/70 dark:via-black/30 dark:to-black/70" />
        {/* Crimson ambient glow — echoes the homepage red */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] z-[1] bg-[#a81f14]/20 blur-[140px] rounded-full pointer-events-none" />

        {/* Top UI Bar */}
        <div className="relative z-10 flex justify-end items-start text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
          <div className="text-right space-y-1">
            <p>Based in India</p>
            <p className="text-white font-mono">{time}</p>
          </div>
        </div>

        {/* Center Title Area */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="relative z-10 flex-1 flex flex-col justify-center items-center pt-12 md:pt-24 pb-8 md:pb-12"
        >
          <div className="flex flex-col items-center gap-6 mb-6">
            <span className="text-3xl md:text-5xl font-light tracking-widest text-neutral-800 dark:text-white/30 italic">({hackathons.length})</span>
            <p className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-500 max-w-[280px] text-center font-medium leading-relaxed uppercase tracking-[0.3em] opacity-100 dark:opacity-60">
              Recognitions earned through <br /> technical excellence and <br /> pure grit.
            </p>
          </div>

          <h2 className="group pointer-events-auto cursor-default text-[14vw] md:text-[12vw] font-bold tracking-tighter leading-[0.85] text-center uppercase transition-transform duration-500 ease-out hover:scale-[1.02]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-black via-black/80 to-black/20 dark:from-white dark:via-white/70 dark:to-white/20 pb-2 transition-transform duration-500 ease-out group-hover:-translate-x-2 md:group-hover:-translate-x-4">AWARDS &</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-t from-black/20 via-black/60 to-black dark:from-white/10 dark:via-white/50 dark:to-white transition-transform duration-500 ease-out group-hover:translate-x-2 md:group-hover:translate-x-4">RECOGNITIONS</span>
          </h2>
        </motion.div>

        {/* Bottom UI Bar */}
        <div className="relative z-10 flex justify-between items-end">
          <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Tiles Section (Scroll past hero) */}
      <div className="relative z-30 pt-[100vh]">
        <section ref={tilesRef} className="w-full mx-auto px-4 md:px-12 lg:px-24 xl:px-40 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
            {hackathons.map((item, i) => (
              <AwardTile key={i} item={item} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function AwardTile({ item, index }: { item: any; index: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  // Cursor-driven 3D tilt.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], ['7deg', '-7deg']), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], ['-7deg', '7deg']), { stiffness: 150, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE, delay: Math.min(index * 0.08, 0.3) }}
      style={{ perspective: 1200 }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        className="relative h-[380px] md:h-[440px] rounded-[1.75rem] overflow-hidden transform-gpu will-change-transform ring-1 ring-black/10 dark:ring-white/10 shadow-2xl shadow-black/20"
      >
        {/* Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />

        {/* Scrim — always keeps the overlaid text legible, deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
        {/* Stronger base gradient behind the bottom title block */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/75 to-transparent transition-opacity duration-700" />
        {/* Hover sheen sweep */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

        {/* Top row: index + meta */}
        <div className="absolute inset-x-0 top-0 p-5 md:p-7 flex items-start justify-between text-[#fff]" style={{ transform: 'translateZ(40px)' }}>
          <span className="font-mono text-xs text-white/60">/{String(index + 1).padStart(2, '0')}</span>
          <div className="flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5">
            <item.icon className="w-3.5 h-3.5 text-[#fff]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/90">{item.date}</span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-[#fff]" style={{ transform: 'translateZ(60px)' }}>
          <div className="mb-3 h-px w-10 bg-white/40 origin-left transition-transform duration-500 group-hover:scale-x-[2.2]" />
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-xl md:text-2xl font-bold tracking-tighter leading-[1.05] uppercase text-balance [text-shadow:0_2px_16px_rgba(0,0,0,0.75)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-light text-white/70 leading-relaxed transition-all duration-500 md:max-h-0 md:opacity-0 md:overflow-hidden md:group-hover:max-h-24 md:group-hover:opacity-100">
                {item.description}
              </p>
            </div>
            <span className="shrink-0 grid h-10 w-10 place-items-center rounded-full bg-white text-black opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
