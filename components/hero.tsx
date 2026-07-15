"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

// WebGL can't SSR — load the red flow-field background on the client only.
const RedFlowBg = dynamic(() => import("./red-flow-bg"), { ssr: false })

interface HeroProps {
  // The section that scales up out of the hero. Stays a normal in-flow
  // element; GSAP temporarily fixes it during the pinned sequence.
  // Passed as an element (not a ref) so the GSAP setup re-runs once the
  // dynamically-imported hero mounts after the section.
  nextSection?: HTMLElement | null
}

export default function Hero({ nextSection }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  // The h1 stays hidden until the preloader's copy of the name unmounts —
  // both visible at once reads as doubled text. The rest of the hero UI also
  // waits for this signal.
  const [nameReady, setNameReady] = useState(false)

  // Red flow-field shader background: desktop + dark mode only (the red mass
  // clashes with the white light-mode page), paused off-view, static when the
  // user prefers reduced motion.
  const [webgl, setWebgl] = useState(false)
  const [isLight, setIsLight] = useState(false)
  const [reduced, setReduced] = useState(false)
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

    setWebgl(window.innerWidth >= 768)

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

  useEffect(() => {
    if ((window as unknown as { __preloaderEnded?: boolean }).__preloaderEnded) {
      setNameReady(true)
      return
    }
    const onEnd = () => setNameReady(true)
    window.addEventListener("preloader:end", onEnd)
    const fallback = setTimeout(() => setNameReady(true), 6000)
    return () => {
      window.removeEventListener("preloader:end", onEnd)
      clearTimeout(fallback)
    }
  }, [])

  // --- Pinned hero → next-section scale-up sequence -----------------------
  // Pin release approach: the next section never leaves the document flow
  // permanently — GSAP fixes it (centered, scaled) only while the hero is
  // pinned, and onLeave clears all inline props in the same frame. The pin
  // end lines up with the section's natural in-flow position (viewport top),
  // so fixed→static is pixel-identical: no jump, no flash.
  useGSAP(
    () => {
      const heroEl = containerRef.current
      const next = nextSection
      const h1 = nameRef.current
      if (!heroEl || !next || !h1) return

      const first = h1.querySelector<HTMLElement>('[data-name="first"]')
      const last = h1.querySelector<HTMLElement>('[data-name="last"]')
      if (!first || !last) return

      // Baseline nudge previously done with translate-y-[5px] in CSS — GSAP
      // owns the transform now so the tween starts from the same place.
      gsap.set(h1, { y: 5 })

      const mm = gsap.matchMedia()

      const build = (mobile: boolean) => {
        const exitX = mobile ? 70 : 110

        const fixedBase = {
          position: "fixed",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "100vw",
          height: "100vh",
          zIndex: 40,
          overflow: "hidden",
        } as const
        // Initial state (page load / scrolled back above the sequence).
        const fixNextHidden = () => gsap.set(next, { ...fixedBase, autoAlpha: 0, scale: 0.15, borderRadius: 24 })
        // Re-entering the pinned zone from below: the overlay must come back
        // at its end-of-sequence state (fullscreen, visible). Resetting it to
        // the hidden 0.15 state here leaves it invisible until the scrubbed
        // playhead crosses the alpha tween again — reads as a nasty flash.
        const fixNextShown = () => gsap.set(next, { ...fixedBase, autoAlpha: 1, scale: 1, borderRadius: 0 })
        const unfixNext = () => gsap.set(next, { clearProps: "all" })

        fixNextHidden()

        const tl = gsap.timeline({
          defaults: { overwrite: "auto" },
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: mobile ? "+=150%" : "+=300%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Hand-off: the pin releases one viewport before the section's
        // natural in-flow position (the unpinned hero still occupies the last
        // 100vh of the pin spacer). Keep the overlay fixed at full scale for
        // that stretch — the hero scrolls away invisibly behind it — and swap
        // fixed→static exactly when the section's flow position reaches the
        // viewport top. Both states are pixel-identical: no jump, no flash.
        ScrollTrigger.create({
          start: () => (tl.scrollTrigger?.end ?? 0) + window.innerHeight,
          end: "+=1",
          invalidateOnRefresh: true,
          onEnter: unfixNext,
          onLeaveBack: fixNextShown,
        })

        // As soon as the scroll sequence starts, everything except the name
        // fades away (reference-site behavior). The navbar (and theme toggle)
        // is hidden on the hero from the start and only appears once the next
        // section takes over; reverted automatically on route change.
        const heroUi = gsap.utils.toArray<HTMLElement>(heroEl.querySelectorAll("[data-hero-ui]"))
        const chrome = gsap.utils.toArray<HTMLElement>(
          document.querySelectorAll("header, div.fixed.bottom-6.right-6")
        )
        gsap.set(chrome, { autoAlpha: 0 })
        tl.to(heroUi, { autoAlpha: 0, ease: "none", duration: 0.1 }, 0)
        tl.to(chrome, { autoAlpha: 1, ease: "none", duration: 0.15 }, 0.85)

        // All tweens below are fromTo with explicit start values: the
        // fixed↔static swap of the next section changes the document height,
        // which triggers a ScrollTrigger refresh — with invalidateOnRefresh,
        // plain .to() tweens would re-capture their start values from
        // whatever state the DOM happens to be in, poisoning the reverse
        // scrub (overlay stuck fullscreen, words stuck hidden).

        // Phase A (0 → 0.25): nudge the name line to exact vertical center.
        tl.fromTo(
          h1,
          { y: 5 },
          {
            y: () => window.innerHeight / 2 - (h1.offsetTop + h1.offsetHeight / 2),
            ease: "power2.inOut",
            duration: 0.25,
          },
          0
        )

        // Phase B (0.25 → 0.65): words exit along their natural sides.
        tl.fromTo(first, { x: 0 }, { x: `-${exitX}vw`, ease: "power1.in", duration: 0.4 }, 0.25)
        tl.fromTo(last, { x: 0 }, { x: `${exitX}vw`, ease: "power1.in", duration: 0.4 }, 0.25)
        // Fade near the end of the exit.
        tl.fromTo([first, last], { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.12, immediateRender: false }, 0.53)

        // Phase C (0.25 → 1.0): next section grows from a centered card to
        // full viewport. Quick fade-in so it doesn't pop.
        tl.fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", duration: 0.06 }, 0.25)
        tl.fromTo(
          next,
          { scale: 0.15, borderRadius: 24 },
          { scale: 1, borderRadius: 0, ease: "power2.out", duration: 0.75 },
          0.25
        )

        return () => unfixNext()
      }

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => build(false))
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => build(true))
      // prefers-reduced-motion: no pin, no tweens — hero and next section
      // stay exactly as laid out.

      // The display fonts load late and change the h1 metrics — re-measure.
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: containerRef, dependencies: [nextSection] }
  )

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-4 md:px-8 bg-[radial-gradient(ellipse_at_50%_40%,#ededed_0%,#fff_75%)] dark:bg-[radial-gradient(ellipse_at_50%_40%,#161616_0%,#000_75%)]"
    >
      {/* Red flow-field shader background (reference-site look) */}
      {webgl && !isLight && (
        <div className="absolute inset-0 z-0">
          <RedFlowBg
            dpr={0.75}
            paused={!inView}
            disableAnimation={reduced}
            enableMouseInteraction={!reduced}
          />
        </div>
      )}

      <div className="absolute inset-0 z-10">
        {/* Giant name — spread across the bottom. Outside the entrance fade:
            the preloader's name morphs onto this exact position and hands
            off, so it must already be fully visible at that moment. */}
        <h1
          ref={nameRef}
          style={{ visibility: nameReady ? undefined : "hidden" }}
          className="absolute bottom-24 md:bottom-36 inset-x-3 md:inset-x-8 flex items-end justify-between leading-none tracking-tight"
        >
          <span data-name="first" className="font-normal [font-family:var(--font-coolvetica)] text-[15.2vw]">
            Rithvik
          </span>
          <span
            data-name="last"
            className="font-normal [font-family:var(--font-apparel)] text-[15.2vw] text-transparent bg-clip-text bg-gradient-to-r from-[#9be9d8] via-[#e9fffa] to-[#8fd8c7]"
          >
            Shetty<span className="text-[0.6em]">.</span>
          </span>
        </h1>

        {/* Tagline, rule and version fade in only after the greet has fully
            finished (nameReady = preloader unmounted) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={nameReady ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* Tagline — top left, like the reference */}
          <p data-hero-ui className="absolute top-24 md:top-28 left-4 md:left-12 text-sm md:text-lg font-bold text-white tracking-tight uppercase">
            FULL <span className="font-serif italic font-normal text-neutral-400 lowercase tracking-normal">stack</span> DEVELOPER
          </p>

          {/* Thin rule under the name */}
          <div data-hero-ui className="absolute bottom-20 md:bottom-24 inset-x-3 md:inset-x-8 h-px bg-white/20" />

          {/* Version tag — bottom left, under the rule */}
          <p data-hero-ui className="absolute bottom-5 md:bottom-6 left-3 md:left-8 text-sm md:text-base font-semibold tracking-widest text-white">
            → V4.0
          </p>
        </motion.div>
      </div>
    </div>
  )
}
