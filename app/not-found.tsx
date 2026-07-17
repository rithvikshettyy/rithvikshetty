'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 py-20 text-white">
      {/* Giant red 404 — soft-focus, sits behind everything */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
      >
        <span className="block font-black leading-none tracking-tighter text-[#c30b1e] text-[56vw] md:text-[42vw] blur-[2px] drop-shadow-[0_0_120px_rgba(195,11,30,0.55)]">
          404
        </span>
        {/* Vignette to deepen the edges like the reference */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
      </motion.div>

      {/* Top marker */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.35em] text-white/80"
      >
        <p>404</p>
        <p className="text-white/40">Error Page</p>
      </motion.div>

      {/* Center block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/90">404</p>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.25em] text-white/90 md:text-base">
          Sorry, we couldn&apos;t find this page
        </p>

        {/* GO BACK with a hand-drawn scribble struck through it */}
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-apparel)' }}
          className="group relative mt-3 inline-block px-6 py-2 text-2xl italic tracking-wide text-white transition-colors duration-300 hover:text-[#e5364a] md:text-3xl"
        >
          Go Back
          <svg
            aria-hidden
            viewBox="0 0 260 70"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[190%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          >
            <motion.path
              d="M18 44 C70 22 150 20 232 34 C176 30 96 30 30 48 C92 36 178 36 244 40 C170 52 88 52 22 38"
              fill="none"
              stroke="#e5364a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 1.4, ease: EASE, delay: 1 }}
            />
          </svg>
        </Link>
      </motion.div>

      {/* Bottom marker */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className="absolute bottom-8 left-1/2 max-w-xs -translate-x-1/2 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.25em] text-white/60"
      >
        The page you are looking for doesn&apos;t exist or an other error occurred.
      </motion.div>
    </div>
  )
}
