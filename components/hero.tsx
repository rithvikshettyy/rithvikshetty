"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// WebGL can't SSR — load the dithered wave background on the client only.
const Dither = dynamic(() => import("./Dither"), { ssr: false })

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  // Fade the background out as the hero scrolls away.
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // The shader draws waves on a black base. In light mode we invert it so it
  // reads as a soft gray texture on the white page. `.dark` is the default.
  const [isLight, setIsLight] = useState(false)
  const [reduced, setReduced] = useState(false)
  // Render the shader below native resolution — the dither/pixelation hides the
  // softness and the per-pixel fbm cost scales with pixel count, so this is the
  // main lever against cursor/animation lag.
  const [dpr, setDpr] = useState(0.75)
  // Pause the shader's render loop while the hero is scrolled out of view — it's
  // faded out there anyway, and a live WebGL loop is the biggest main-thread cost.
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = document.documentElement
    const syncMode = () => setIsLight(el.classList.contains("light"))
    syncMode()
    const obs = new MutationObserver(syncMode)
    obs.observe(el, { attributes: true, attributeFilter: ["class"] })

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => setReduced(mq.matches)
    syncMotion()
    mq.addEventListener("change", syncMotion)

    setDpr(window.innerWidth < 768 ? 0.5 : 0.75)

    let io: IntersectionObserver | undefined
    if (containerRef.current) {
      io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.02 })
      io.observe(containerRef.current)
    }

    return () => {
      obs.disconnect()
      mq.removeEventListener("change", syncMotion)
      io?.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-4 md:px-8 bg-[radial-gradient(ellipse_at_50%_40%,#ededed_0%,#fff_75%)] dark:bg-[radial-gradient(ellipse_at_50%_40%,#161616_0%,#000_75%)]"
    >
      {/* Dithered wave background — inverted in light mode */}
      <motion.div
        style={{ opacity: bgOpacity, filter: isLight ? "invert(1)" : undefined }}
        className="absolute inset-0 z-0"
      >
          <Dither
            waveColor={[0.35, 0.35, 0.35]}
            waveSpeed={0.03}
            waveFrequency={3}
            waveAmplitude={0.3}
            colorNum={4}
            pixelSize={2}
            mouseRadius={0.4}
            dpr={dpr}
            paused={!inView}
            disableAnimation={reduced}
            enableMouseInteraction={!reduced}
          />
        </motion.div>

      {/* Radial vignette keeps headline contrast crisp over the dark dither;
          skip it in light mode where it would darken the halo behind black text */}
      {!isLight && (
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.25)_45%,transparent_78%)]" />
      )}

      <motion.div
        style={{ y, opacity }}
        className="z-10 flex flex-col items-center text-center w-full max-w-5xl px-2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          <h1 className="text-6xl sm:text-7xl md:text-[12vw] xl:text-[140px] font-black tracking-tighter leading-[0.85] md:leading-[0.8] mb-6 md:mb-12 mt-1">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-600">Rithvik</span>
          </h1>

          <div className="text-lg sm:text-2xl md:text-5xl text-neutral-400 font-light tracking-tight leading-tight max-w-4xl mx-auto space-y-4 px-2">
            <span className="block font-bold text-white tracking-tighter text-xl sm:text-3xl md:text-6xl uppercase">
              FULL <span className="font-serif italic font-normal text-neutral-400 lowercase tracking-normal">stack</span> DEVELOPER
            </span>
            <span className="block text-base sm:text-xl md:text-3xl font-light tracking-wide text-neutral-500 mt-2 md:mt-6">
              Freelancer specialized in building <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">experiences</span>.
            </span>
          </div>

          {/* Chat row */}
          <div className="mt-8 md:mt-12 w-full flex justify-center items-center gap-3 overflow-hidden flex-wrap">
            <Link
              href="/chat"
              prefetch={false}
              aria-label="Ask my AI assistant"
              className="group pointer-events-auto relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.03] py-1.5 pl-5 pr-1.5 backdrop-blur-md transition-colors duration-300 hover:border-white/30 shrink-0"
            >
              {/* Hover sheen sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

              {/* Label */}
              <span className="relative text-[15px] md:text-base font-semibold tracking-tight text-white">Ask my AI assistant</span>

              {/* Arrow chip (inverted, rotates on hover) */}
              <span className="relative ml-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-300 ease-out group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
