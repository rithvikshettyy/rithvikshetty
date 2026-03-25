"use client"

import React, { useRef, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface ScrollTextRevealProps {
  text: string
  className?: string
}

export default function ScrollTextReveal({ text, className = "" }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

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
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const color = useTransform(progress, range, ["#404040", "#ffffff"])

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.25em] mb-[0.1em] reveal-word"
    >
      {children}
    </motion.span>
  )
}
