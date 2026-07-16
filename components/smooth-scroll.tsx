"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
// scroll position always agree (same setup as the reference site).
export default function SmoothScroll() {
  useEffect(() => {
    // Native scrolling for users who prefer reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Reloads should start at the top, not restore the previous scroll.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"

    const lenis = new Lenis({
      // Reference-site feel: ~1.2s glide with an expo-out curve.
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    // Snap to the top immediately in case the browser restored a position.
    lenis.scrollTo(0, { immediate: true })

    lenis.on("scroll", ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    // Lenis drives the frame loop — GSAP must not compensate for "lag".
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
