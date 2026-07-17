'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Same animated red flow-field as the homepage hero — client + desktop only.
const RedFlowBg = dynamic(() => import('@/components/red-flow-bg'), { ssr: false })

const skills = [
  {
    label: 'Frontend',
    items: ['React · Next.js', 'TypeScript', 'Tailwind CSS', 'HTML · CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js · Express', 'Python', 'PostgreSQL · Redis', 'Supabase'],
  },
  {
    label: 'AI / ML',
    items: ['Machine Learning', 'Scikit-learn', 'OpenCV', 'Pandas · NumPy'],
  },
  {
    label: 'Tools',
    items: ['Docker · Git', 'AWS', 'Figma', 'Razorpay · Stripe'],
  },
]

export default function AboutPage() {
  const [webgl, setWebgl] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    setWebgl(window.innerWidth >= 768)
  }, [])

  return (
    <main className="relative h-[100dvh] bg-black text-white overflow-hidden [font-family:Helvetica,Arial,sans-serif]">
      {/* Static crimson glow — mobile fallback / base under the shader */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_66%_42%,rgba(200,33,15,0.55),rgba(120,20,10,0.12)_45%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.6),transparent_55%)]" />
      {/* Animated red flow-field (desktop) — subtler than the homepage: lower
          opacity, softer blur, and a dark scrim to mute it */}
      {webgl && (
        <>
          <div className="absolute inset-0 z-0 scale-110 blur-[13px] opacity-65">
            <RedFlowBg dpr={0.6} paused={false} disableAnimation={reduced} enableMouseInteraction={!reduced} />
          </div>
          <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />
        </>
      )}

      {/* Top bar — sits above the photo's top edge, like the reference */}
      <div className="absolute inset-x-6 top-6 md:inset-x-12 md:top-12 z-20 flex items-start justify-between">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-none">Info</h1>
        <Link
          href="/"
          prefetch={false}
          className="group text-sm md:text-base font-semibold uppercase tracking-widest text-white/75 hover:text-white transition-colors"
          aria-label="Back"
        >
          {/* Char-roll hover — each letter slides up, revealing its copy, with a small stagger */}
          {'Back'.split('').map((ch, i) => (
            <span key={i} className="relative inline-block overflow-hidden align-bottom">
              <span
                className="block transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch}
                <span className="absolute left-0 top-full" aria-hidden="true">
                  {ch}
                </span>
              </span>
            </span>
          ))}
        </Link>
      </div>

      <div className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-[6vw] pt-28 md:pt-24 pb-16 md:pb-20">
        {/* Main grid */}
        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-x-20 min-h-0 content-start">
          {/* Left — photo + meta */}
          <div className="flex flex-col">
            {/* Framed photo with corner marks — full portrait, uncropped */}
            <div className="relative w-full max-w-[340px]">
              <span className="absolute -left-2 -top-2 text-white/50 text-lg select-none">+</span>
              <span className="absolute -right-2 -top-2 text-white/50 text-lg select-none">+</span>
              <span className="absolute -left-2 -bottom-2 text-white/50 text-lg select-none">+</span>
              <span className="absolute -right-2 -bottom-2 text-white/50 text-lg select-none">+</span>
              <div className="relative aspect-[340/404] overflow-hidden border border-white/15">
                <Image
                  src="/about4.png"
                  alt="Rithvik Shetty"
                  fill
                  sizes="(max-width: 1024px) 100vw, 340px"
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Meta */}
            <dl className="mt-5 space-y-5 max-w-[340px]">
              <div className="flex items-baseline justify-between gap-6 border-t border-white/10 pt-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Based in</dt>
                <dd className="text-[15px] text-right">Thane, India</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-white/10 pt-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Status</dt>
                <dd className="text-[15px] text-right">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#9be9d8] animate-pulse" />
                    Available for work
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right — about + skills */}
          <div className="flex flex-col lg:pt-[18px]">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">About</span>
            <h2 className="mt-2 text-5xl md:text-7xl xl:text-[96px] font-light tracking-[-0.03em] leading-[0.95]">
              Rithvik Shetty<span className="text-accent">.</span>
            </h2>

            <div className="mt-3 space-y-5">
              <p className="max-w-[640px] text-lg md:text-[21px] leading-[1.4] text-white">
                Full stack developer &amp; computer science student, specialized in modern web development.
              </p>
              <p className="max-w-2xl text-base md:text-lg leading-[1.65] text-white font-light">
                I build tailor-made web experiences where technical precision meets clean{' '}
                <span className="font-serif italic">design</span>. Passionate about performance,
                interaction and detail, blending Machine Learning with the modern web.
              </p>
            </div>

            {/* Skills grid */}
            <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-x-9 gap-y-6">
              {skills.map((col) => (
                <div key={col.label}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50 mb-3">{col.label}</h3>
                  <ul className="space-y-[5px]">
                    {col.items.map((item) => (
                      <li key={item} className="text-[15px] leading-snug text-white/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar — pinned like the reference */}
      <div className="absolute inset-x-6 bottom-6 md:inset-x-12 md:bottom-8 z-20 flex items-end justify-between">
        <a
          href="mailto:rithvikshetty2004@gmail.com"
          className="text-sm text-white/80 hover:text-white transition-colors"
        >
          rithvikshetty2004@gmail.com
        </a>
      </div>
    </main>
  )
}
