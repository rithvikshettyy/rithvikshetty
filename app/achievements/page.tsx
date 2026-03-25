'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Trophy, Award, Medal, Plus, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

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

export default function Achievements() {
  const containerRef = useRef(null)
  const tilesRef = useRef(null)
  const isTilesInView = useInView(tilesRef, { once: false, margin: "-100px" })

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
    <main ref={containerRef} className="w-full bg-black text-white min-h-[200vh] relative">
      <div className="grain" />

      {/* Cinematic Hero Section */}
      <section className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden pointer-events-none z-20">
        {/* Top UI Bar */}
        <div className="flex justify-between items-start text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
          <div className="space-y-1">
            <p>+91 91379 86520</p>
          </div>
          <div className="hidden md:block text-center space-y-1">
            <p className="text-white">Full Stack Developer</p>
            <p>Specialized in Core Engineering</p>
          </div>
          <div className="text-right space-y-1">
            <p>Based in India</p>
            <p className="text-white font-mono">{time}</p>
          </div>
        </div>

        {/* Center Title Area */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="flex-1 flex flex-col justify-center items-center pt-20"
        >
          <div className="flex flex-col items-center gap-6 mb-12">
            <span className="text-3xl md:text-5xl font-light tracking-widest text-neutral-800 dark:text-white/30 italic">({hackathons.length})</span>
            <p className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-500 max-w-[280px] text-center font-medium leading-relaxed uppercase tracking-[0.3em] opacity-100 dark:opacity-60">
              Recognitions earned through <br /> technical excellence and <br /> pure grit.
            </p>
          </div>

          <h1 className="text-[14vw] md:text-[12vw] font-bold tracking-tighter leading-[0.85] text-center uppercase">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-black via-black/80 to-black/20 dark:from-white dark:via-white/70 dark:to-white/20 pb-2">AWARDS &</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-t from-black/20 via-black/60 to-black dark:from-white/10 dark:via-white/50 dark:to-white">RECOGNITIONS</span>
          </h1>
        </motion.div>

        {/* Bottom UI Bar */}
        <div className="flex justify-between items-end">
          <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Tiles Section (Scroll past hero) */}
      <div className="relative z-30 pt-[100vh]">
        <section ref={tilesRef} className="w-full mx-auto px-4 md:px-12 lg:px-24 xl:px-40 pb-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isTilesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {hackathons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative bg-white/5 dark:bg-white/[0.03] backdrop-blur-[40px] border border-black/5 dark:border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-700 h-[400px] md:h-[480px] flex flex-col shadow-2xl shadow-black/10"
              >
                {/* Hero Image Section */}
                <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border-b border-black/5 dark:border-white/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-1000 ease-out opacity-90 group-hover:opacity-100"
                  />
                  {/* Subtle Glass Overlay for document feel */}
                  <div className="absolute inset-0 bg-white/5 dark:bg-black/20 transition-opacity duration-700 group-hover:opacity-0" />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
                  {/* Technical Metadata Grid - Responsive Stagger */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:justify-between items-start sm:items-center gap-4 pb-4 border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10 shrink-0">
                        <item.icon className="w-5 h-5 text-neutral-600 dark:text-white/50" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[7px] md:text-[8px] font-bold tracking-[0.2em] text-neutral-500 dark:text-white/30 uppercase leading-none mb-1">Class</span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-tight text-neutral-950 dark:text-white/90 uppercase truncate">RECOGNITION</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end sm:items-end text-right">
                      <span className="text-[7px] md:text-[8px] font-bold tracking-[0.2em] text-neutral-500 dark:text-white/30 uppercase leading-none mb-1">Issued</span>
                      <span className="text-[10px] md:text-[11px] font-bold text-neutral-950 dark:text-white/90 uppercase font-mono tracking-tighter truncate">{item.date}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tighter leading-[0.95] text-neutral-800 dark:text-white/80 group-hover:text-black dark:group-hover:text-white transition-colors uppercase cursor-default">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm font-light leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Light Reflection */}
                <div className="absolute inset-0 pointer-events-none border-[1.5px] border-white/10 rounded-[2rem] opacity-50 dark:opacity-100" />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </main>
  )
}
