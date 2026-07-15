"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

// Intro sequence (reference video):
// 1. chars of the name rise in from below, rotated, staggered — shown centered
// 2. the name glides down and grows into the homepage h1's exact position
// 3. a solid red panel sweeps up from the bottom, covers the screen, and keeps
//    going — revealing the homepage underneath; the name rides above the red
//    and lands pixel-perfect on the hero's identical h1. Invisible handoff.
//
// Sharpness note: the name is laid out at its FINAL (hero) size and starts
// scaled DOWN — glyphs rasterize at the large size, so both the small state
// and the grow animation stay crisp. Scaling up small text blurs it.
const FIRST = "Rithvik"
const LAST = "Shetty."

// Timeline (ms)
const DESCEND_START = 1500 // name starts morphing down into the hero position
const SWEEP_START = 2400 // red panel begins rising
const SWEEP_RISE = 650 // below → covering
const SWEEP_HOLD = 250 // fully red
const END = SWEEP_START + SWEEP_RISE + SWEEP_HOLD + SWEEP_RISE
// Black layer swaps out for the page while the screen is fully red.
const COVER = SWEEP_START + SWEEP_RISE + SWEEP_HOLD / 2

// Chars finish rising (last ends ~1.43s) BEFORE the descend starts at 1.5s —
// overlapping nested transform animations is what made the scaling stutter.
const charVariants = {
  hidden: { y: "115%", rotate: 14 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: {
      delay: 0.15 + i * 0.04,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
}

interface WordPose {
  x: number
  y: number
  scale: number
  origin: string
}

const IDENTITY: WordPose = { x: 0, y: 0, scale: 1, origin: "0 0" }

function Word({
  text,
  offset,
  className,
  style,
  spanRef,
  pose,
  animating,
}: {
  text: string
  offset: number
  className?: string
  style?: React.CSSProperties
  spanRef?: React.Ref<HTMLSpanElement>
  pose?: WordPose | null
  animating?: boolean
}) {
  return (
    // Padding keeps ascenders/descenders and rotated chars from clipping
    // against the overflow mask.
    // The word-level morph runs as a plain CSS transition on transform only —
    // it executes on the compositor thread, so main-thread work (hydration,
    // Lenis, dev overhead) can't make the scaling stutter.
    // pb gives the "y" descender room inside the overflow mask AND the
    // gradient paint box (bg-clip-text only fills the padding box); -mb cancels
    // the layout growth so the glyph position — and the greet→hero handoff —
    // is unchanged.
    <span
      ref={spanRef}
      style={{
        ...style,
        ...(pose
          ? {
              transform: `translate(${pose.x}px, ${pose.y}px) scale(${pose.scale})`,
              transformOrigin: pose.origin,
            }
          : undefined),
        transition: animating ? "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        willChange: "transform",
      }}
      className={`inline-flex overflow-hidden pb-[0.32em] -mb-[0.2em] pt-[0.06em] px-[0.06em] ${className ?? ""}`}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          custom={offset + i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          // The trailing dot is rendered smaller — must match the hero h1.
          className={`inline-block origin-bottom-left will-change-transform ${ch === "." ? "text-[0.6em]" : ""}`}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

// Inverse FLIP: the words are laid out big at the hero position; compute the
// transform that shows them small and centered for the first part of the greet.
function calcStartPoses(f: HTMLElement, l: HTMLElement): { f: WordPose; l: WordPose } {
  // Offset-based measurement: unaffected by the element's own transform, so
  // re-measuring after the start pose is applied (e.g. when fonts finish
  // loading) doesn't poison the math and shift the name off-center.
  const measure = (el: HTMLElement) => {
    const cs = getComputedStyle(el)
    const padL = parseFloat(cs.paddingLeft)
    const padT = parseFloat(cs.paddingTop)
    const padR = parseFloat(cs.paddingRight)
    const padB = parseFloat(cs.paddingBottom)
    const parent = el.offsetParent as HTMLElement
    const pr = parent.getBoundingClientRect()
    return {
      left: pr.left + el.offsetLeft + padL,
      top: pr.top + el.offsetTop + padT,
      w: el.offsetWidth - padL - padR,
      h: el.offsetHeight - padT - padB,
      origin: `${padL}px ${padT}px`,
    }
  }
  const mf = measure(f)
  const ml = measure(l)

  // Small display size for the greet (matches the old text-5xl/8xl look).
  const small = window.innerWidth >= 768 ? 96 : 44
  const fontSize = parseFloat(getComputedStyle(f).fontSize)
  const s = small / fontSize
  const gap = 0.35 * small

  const total = mf.w * s + gap + ml.w * s
  const left = (window.innerWidth - total) / 2
  // Bottom-align the scaled glyph boxes around the vertical center.
  const maxH = Math.max(mf.h, ml.h) * s
  const bottom = window.innerHeight / 2 + maxH / 2

  return {
    f: {
      x: left - mf.left,
      y: bottom - mf.h * s - mf.top,
      scale: s,
      origin: mf.origin,
    },
    l: {
      x: left + mf.w * s + gap - ml.left,
      y: bottom - ml.h * s - ml.top,
      scale: s,
      origin: ml.origin,
    },
  }
}

// Lives in the root layout, which Next.js keeps mounted across client-side
// navigations — so it plays once per full page load (including reloads) and
// never replays on in-site route changes.
export default function Preloader() {
  // 'intro' → name on black; 'reveal' → black gone, red still sweeping; 'done' → unmounted
  const [phase, setPhase] = useState<"intro" | "reveal" | "done">("intro")
  const [reduced, setReduced] = useState(false)
  const [start, setStart] = useState<{ f: WordPose; l: WordPose } | null>(null)
  const [descended, setDescended] = useState(false)
  const [sweep, setSweep] = useState<"below" | "cover" | "gone">("below")
  const firstRef = useRef<HTMLSpanElement>(null)
  const lastRef = useRef<HTMLSpanElement>(null)

  // Measure before first paint so the name never flashes at full size.
  useLayoutEffect(() => {
    const f = firstRef.current
    const l = lastRef.current
    if (!f || !l) return
    setStart(calcStartPoses(f, l))
    // The display fonts may load after mount and change the word widths —
    // re-measure while still in the small state (never once the descend has
    // begun; the pose is identity by then anyway).
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled && firstRef.current && lastRef.current) {
        setStart((prev) => (prev ? calcStartPoses(firstRef.current!, lastRef.current!) : prev))
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReduced(isReduced)
    document.body.style.overflow = "hidden"

    const finish = () => {
      document.body.style.overflow = ""
      ;(window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true
      window.dispatchEvent(new CustomEvent("preloader:done"))
    }

    // Fired the exact tick the overlay (and its copy of the name) unmounts —
    // the hero reveals its identical h1 in the same React commit, so only one
    // copy of the name is ever on screen.
    const handoff = () => {
      ;(window as unknown as { __preloaderEnded?: boolean }).__preloaderEnded = true
      window.dispatchEvent(new CustomEvent("preloader:end"))
      setPhase("done")
    }

    if (isReduced) {
      setDescended(true)
      // Collapse the whole sequence to a short hold.
      const t1 = setTimeout(() => {
        finish()
        handoff()
      }, 1000)
      return () => {
        clearTimeout(t1)
        document.body.style.overflow = ""
      }
    }

    const t0 = setTimeout(() => setDescended(true), DESCEND_START)
    const tS1 = setTimeout(() => setSweep("cover"), SWEEP_START)
    const tS2 = setTimeout(() => setSweep("gone"), SWEEP_START + SWEEP_RISE + SWEEP_HOLD)
    const t1 = setTimeout(() => {
      // Screen is fully red: the page becomes visible as the panel lifts.
      finish()
      setPhase("reveal")
    }, COVER)
    const t2 = setTimeout(handoff, END)
    return () => {
      clearTimeout(t0)
      clearTimeout(tS1)
      clearTimeout(tS2)
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ""
    }
  }, [])

  // Until measured, keep the name invisible (one frame at most).
  const pose = (w: "f" | "l"): WordPose | null => {
    if (descended) return IDENTITY
    return start ? start[w] : null
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        // No exit fade: the hero h1 takes over in the same frame, and any
        // crossfade would briefly show two copies of the name.
        <motion.div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
          {/* Black base — killed the instant the red panel covers it */}
          {phase === "intro" && (
            <div className="absolute inset-0" style={{ backgroundColor: "#050505" }} />
          )}

          {/* Red panel: rises from below the viewport and exits through the
              top. CSS transition on transform only — compositor-driven. */}
          {!reduced && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#e8250c",
                transform:
                  sweep === "below" ? "translateY(100%)" : sweep === "cover" ? "translateY(0)" : "translateY(-100%)",
                transition:
                  sweep === "below" ? "none" : `transform ${SWEEP_RISE}ms cubic-bezier(0.55, 0, 0.45, 1)`,
                willChange: "transform",
              }}
            />
          )}

          {/* The name — an exact clone of the hero h1 (same classes/position),
              transformed small+centered for the greet, then released to its
              natural spot. Rides above the red panel. Inline colors dodge the
              global .light overrides that would make it invisible on black. */}
          <div
            className="absolute bottom-24 md:bottom-36 inset-x-3 md:inset-x-8 flex items-end justify-center gap-[4vw] leading-none tracking-tight translate-y-[5px]"
            style={{ visibility: start ? "visible" : "hidden" }}
          >
            <Word
              text={FIRST}
              offset={0}
              spanRef={firstRef}
              pose={pose("f")}
              animating={descended && !reduced}
              className="font-normal [font-family:Helvetica,Arial,sans-serif] text-[15.2vw]"
              style={{ color: "#f5f5f0" }}
            />
            <Word
              text={LAST}
              offset={FIRST.length}
              spanRef={lastRef}
              pose={pose("l")}
              animating={descended && !reduced}
              className="font-normal [font-family:Helvetica,Arial,sans-serif] text-[15.2vw]"
              style={{
                backgroundImage: "linear-gradient(to right, #9be9d8, #e9fffa, #8fd8c7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
