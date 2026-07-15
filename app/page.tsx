'use client'

import dynamic from "next/dynamic"

const Hero = dynamic(() => import("@/components/hero"))
const Marquee = dynamic(() => import("@/components/marquee"))
const ProjectList = dynamic(() => import("@/components/project-list"))
const CreativeTeaser = dynamic(() => import("@/components/creative-teaser"))
import Link from "next/link"
import Image from "next/image"
import React, { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import TextScramble from "@/components/text-scramble"
import ScrollTextReveal from "@/components/scroll-text-reveal"
import Magnetic from "@/components/magnetic"

export default function Home() {
  const introRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  // Element state (not just a ref) so the dynamically-imported Hero re-renders
  // with the section node once it exists — its GSAP setup depends on it.
  const [introEl, setIntroEl] = React.useState<HTMLElement | null>(null)
  const prefersReduced = useReducedMotion()
  // Reveal offsets collapse to 0 when the user prefers reduced motion.
  const revealOffset = prefersReduced ? 0 : 40

  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: contactProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  })

  // The text translates slightly opposite to the scroll direction.
  // Kept small: a larger range shoves the content out of the fixed 100vh
  // overlay during the hero's pinned scale-up and clips the stats row.
  const introTextY = useTransform(introProgress, [0, 1], ["-4%", "4%"])
  const contactTextY = useTransform(contactProgress, [0, 1], ["-25%", "25%"])

  // The background translates slowly making it look deeper
  const introBgY = useTransform(introProgress, [0, 1], ["-50%", "50%"])
  const contactBgY = useTransform(contactProgress, [0, 1], ["-45%", "45%"])
  const introBlobScale = useTransform(introProgress, [0, 0.5, 1], [0.8, 1.1, 0.8])
  const smoothIntroBlobScale = useSpring(introBlobScale, { stiffness: 100, damping: 30 })

  // --- 3D Animation Hook state ---
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Maximum tilt degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"])

  // Smooth the rotation to make it fluid
  const smoothRotateX = useSpring(rotateX, { damping: 20, stiffness: 100 })
  const smoothRotateY = useSpring(rotateY, { damping: 20, stiffness: 100 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!introRef.current) return
    const rect = introRef.current.getBoundingClientRect()
    // Calculate mouse position relative to center of the element, normalized between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="w-full">
      <Hero nextSection={introEl} />

      {/* Intro Section with 3D Tilt Effect.
          min-h-screen + centered content: during the hero's pinned scroll
          sequence this section is scaled up as a fixed 100vw×100vh overlay,
          so its in-flow size must match the viewport for a seamless handoff. */}
      <section
        ref={(el) => {
          introRef.current = el
          setIntroEl(el)
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="min-h-screen flex flex-col justify-center py-8 md:py-10 px-4 md:px-12 border-t border-white/10 bg-neutral-950 relative overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* Decorative parallax element */}
        <motion.div
          style={{ y: introBgY }}
          className="absolute right-0 md:right-32 top-1/4 w-[300px] h-[300px] bg-white/[0.03] rounded-full blur-[80px] pointer-events-none"
        />

        <motion.div
          style={{
            y: introTextY,
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            z: 20 // Pulls the element slightly forward in 3D space
          }}
          className="w-full xl:w-[90%] mx-auto relative z-10 transform-gpu"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
            <ScrollTextReveal
              text="I'm a full stack developer who turns ideas into elegant digital solutions. Specializing in modern web applications, scalable backends, and pixel-perfect frontends."
              className="flex-1 text-3xl md:text-5xl leading-tight font-light text-neutral-400"
            />

            <motion.div
              style={{ scale: smoothIntroBlobScale }}
              className="w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96 relative flex-shrink-0 group flex items-center justify-center transform-gpu"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
              <Image
                src="/blob.webp"
                alt="Animated Blob Graphic"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                unoptimized
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-700"
              />
            </motion.div>
          </div>

          <motion.div
            className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 border-t border-white/10 pt-8 md:pt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.12 }}
          >
            {[
              { number: "20+", label: "Projects" },
              { number: "4+", label: "Years" },
              { number: "100%", label: "Dedication" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, y: revealOffset },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
                <div className="text-sm uppercase tracking-widest text-neutral-500 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Marquee />
      <ProjectList />
      <CreativeTeaser />

      {/* Parallax Contact Section */}
      <section ref={contactRef} className="min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center bg-white text-black px-4 py-20 md:py-0 text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] opacity-5 mix-blend-multiply"
          style={{ y: contactBgY, scale: 1.3 }}
        />

        <motion.div
          className="flex flex-col items-center relative z-10"
          initial={{ opacity: 0, y: revealOffset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            className="text-5xl md:text-[12vw] font-bold leading-none tracking-tighter"
            style={{ y: contactTextY }}
          >
            <TextScramble text="GET IN TOUCH" />
          </motion.h2>

          <motion.p
            className="text-base md:text-xl lg:text-2xl max-w-md mt-6 mb-8 md:mb-12 font-light"
            style={{ y: contactTextY }}
          >
            Have a project in mind? Let's collaborate and build something extraordinary.
          </motion.p>

          <motion.div style={{ y: contactTextY }}>
            <Magnetic strength={0.4} className="inline-block">
              <Link
                href="/contact"
                prefetch={false}
                className="px-8 md:px-12 py-4 md:py-6 bg-black text-white rounded-full text-base md:text-xl font-medium hover:scale-105 transition-transform duration-300 inline-flex items-center justify-center shadow-2xl"
              >
                Contact Me
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
