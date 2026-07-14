"use client"

import React, { useRef, useMemo, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollTextRevealProps {
  text: string
  className?: string
}

export default function ScrollTextReveal({ text, className = "" }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  // Reveal targets white in dark mode; in light mode that vanishes on the white
  // page, so reveal toward near-black instead.
  const [isLight, setIsLight] = useState(false)
  useEffect(() => {
    const el = document.documentElement
    const sync = () => setIsLight(el.classList.contains("light"))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  // Track scroll progress for this specific element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"]
  })

  // Split text into words to simulate line-by-line or word-by-word reveal
  const words = useMemo(() => text.split(" "), [text])

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} isLight={isLight}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range, isLight }: { children: React.ReactNode, progress: any, range: [number, number], isLight: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const color = useTransform(progress, range, isLight ? ["#a3a3a3", "#171717"] : ["#404040", "#ffffff"])

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.25em] mb-[0.1em] reveal-word"
    >
      {children}
    </motion.span>
  )
}
