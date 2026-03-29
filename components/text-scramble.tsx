"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { useInView } from "framer-motion"

interface TextScrambleProps {
  text: string
  autostart?: boolean
  className?: string
  once?: boolean
}

const CHARS = "!@#$%^&*()_+~`|}{[]:;?><,./-="

export default function TextScramble({ text, autostart = false, className = "", once = true }: TextScrambleProps) {
  const [displayChars, setDisplayChars] = useState(text.split(""))
  const [isAnimating, setIsAnimating] = useState(false)
  const iterationRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(containerRef, { once, amount: 0.5 })
  const hasTriggeredOnce = useRef(false)

  const scramble = useCallback(() => {
    // Always clear existing animation before starting new one
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setIsAnimating(true)
    iterationRef.current = 0

    const animate = () => {
      setDisplayChars((prev) =>
        prev.map((_, index) => {
          if (index < Math.floor(iterationRef.current)) {
            return text[index]
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
      )

      if (iterationRef.current < text.length) {
        iterationRef.current += 0.3
        timeoutRef.current = setTimeout(animate, 35)
      } else {
        setIsAnimating(false)
        setDisplayChars(text.split(""))
      }
    }

    animate()
  }, [text]) // Stable dependency

  useEffect(() => {
    if (inView && !hasTriggeredOnce.current) {
      scramble()
      hasTriggeredOnce.current = true
    }
  }, [inView, scramble])

  useEffect(() => {
    if (autostart) {
      scramble()
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [autostart, scramble])

  return (
    <span
      ref={containerRef}
      onMouseEnter={scramble}
      className={`inline-block whitespace-nowrap cursor-default ${className}`}
    >
      {displayChars.map((char, index) => (
        <span key={index} className="relative inline-block overflow-hidden">
          {/* Ghost character to maintain exact width */}
          <span className="invisible select-none" aria-hidden="true">
            {text[index] === " " ? "\u00A0" : text[index]}
          </span>
          {/* Animated character */}
          <span className="absolute inset-0 flex items-center justify-center">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  )
}
