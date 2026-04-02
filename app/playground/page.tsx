"use client"

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from 'framer-motion'

const AsciiArt = dynamic(() => import('@/components/ascii-art'), { ssr: false })

export default function Playground() {
  const [isMounted, setIsMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isModelLoaded, setIsModelLoaded] = useState(false)

  const { scrollYProgress } = useScroll()
  
  // Cinematic scroll transforms for the car - ultra-refined range
  const modelScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.5])
  const modelOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  const smoothScale = useSpring(modelScale, { stiffness: 45, damping: 25 })



  useEffect(() => {
    setIsMounted(true)
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Optimized background ASCII density
  const asciiWidth = Math.floor((windowSize.width || 1200) / 12)
  const asciiHeight = Math.floor((windowSize.height || 800) / 18)

  return (
    <div className="h-[300vh] bg-black text-white relative font-sans">

      {/* Fixed Background Context */}
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden">

        {/* Background ASCII Layer - Ultra-subtile depth texture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          {isMounted && (
            <AsciiArt
              width={asciiWidth}
              height={asciiHeight}
              mode="field"
              speedX={0.003}
              speedY={0.005}
              disintegrate={0}
              fontSize="text-[5px] md:text-[7px]"
              color="text-neutral-900"
              className="leading-none tracking-[0.5em]"
            />
          )}
        </motion.div>

        {/* Main 3D Car Element (Sketchfab Embed) */}
        <motion.div
          style={{
            scale: smoothScale,
            opacity: modelOpacity
          }}
          className="relative z-10 w-full h-[100vh] flex items-center justify-center pointer-events-auto"
        >
          <div className="relative w-full h-full max-w-7xl flex items-center justify-center overflow-hidden rounded-3xl">
            {/* Minimalist Loader */}
            {!isModelLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/50 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-800" />
              </div>
            )}

            {/* The Sketchfab Iframe */}
            <iframe
              src="https://sketchfab.com/models/72731472c2b649eaaaa5b7e0a00761fb/embed?autostart=1&transparent=1&ui_theme=dark&ui_controls=0&ui_infos=0&ui_inspector=0&ui_watermark=0&ui_hint=0"
              frameBorder="0"
              width="100%"
              height="100%"
              onLoad={() => setIsModelLoaded(true)}
              className="w-full h-full scale-[1.05] pointer-events-auto"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              title="RB20"
            />
          </div>
        </motion.div>




        {/* Contextual UI Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 md:p-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 1 }}
            className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em]"
          >
            Mechanical Synthesis // V.002
          </motion.div>

          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [0.5, 0]) }}
            className="flex flex-col items-center gap-4 self-center pb-8"
          >
            <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.3em]">Scroll to Approach</p>
            <div className="w-px h-16 bg-gradient-to-b from-neutral-700 to-transparent" />
          </motion.div>
        </div>

      </div>
    </div>
  )
}


