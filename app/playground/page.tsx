"use client"

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useScroll, useTransform, useSpring, motion } from 'framer-motion'

const AsciiArt = dynamic(() => import('@/components/ascii-art'), { ssr: false })

export default function Playground() {
  const [isMounted, setIsMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  
  const { scrollYProgress } = useScroll()
  const rawDisintegrate = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const smoothDisintegrate = useSpring(rawDisintegrate, { stiffness: 50, damping: 20 })
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1])
  const shapeOpacity = useTransform(scrollYProgress, [0.8, 1], [0.8, 0])

  useEffect(() => {
    setIsMounted(true)
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Use higher density for large central composition
  const asciiWidth = Math.floor((windowSize.width || 1200) / 7)
  const asciiHeight = Math.floor((windowSize.height || 800) / 12)

  // Motion Value to Numeric for AsciiArt prop (AsciiArt isn't a motion component)
  const [dis, setDis] = useState(0)
  useEffect(() => {
    return smoothDisintegrate.onChange((v: number) => setDis(v))
  }, [smoothDisintegrate])

  return (
    <div className="h-[300vh] bg-black text-white relative">
      
      {/* Fixed Background Context */}
      <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Centered Overlapping ASCII Shapes */}
        <motion.div 
            style={{ opacity: shapeOpacity }}
            className="absolute inset-0 z-0 flex items-center justify-center"
        >
            {isMounted && (
            <div className="relative w-full h-full flex items-center justify-center scale-125 md:scale-110">
                {/* Primary Inner Shape */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <AsciiArt 
                        width={asciiWidth} 
                        height={asciiHeight} 
                        mode="object"
                        speedX={0.01}
                        speedY={0.015}
                        disintegrate={dis}
                        fontSize="text-[7px] md:text-[11px]" 
                        color="text-neutral-400"
                        className="leading-none tracking-widest"
                    />
                </div>
                {/* Secondary Outer Shape */}
                <div className="absolute inset-0 flex items-center justify-center scale-125 opacity-40 pointer-events-none">
                    <AsciiArt 
                        width={asciiWidth} 
                        height={asciiHeight} 
                        mode="object"
                        speedX={-0.008}
                        speedY={-0.012}
                        disintegrate={dis * 1.5}
                        fontSize="text-[6px] md:text-[10px]" 
                        color="text-neutral-600"
                        className="leading-none tracking-widest"
                    />
                </div>
            </div>
            )}
        </motion.div>

        {/* Maintenance Message */}
        <motion.div 
            style={{ opacity: textOpacity }}
            className="relative z-10 flex flex-col items-center gap-6"
        >
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase italic text-center">
                Under <br /> 
                <span className="text-neutral-500">Maintenance</span>
            </h1>
            <p className="text-neutral-600 font-mono text-xs uppercase tracking-[0.3em]">System Synthesis in Progress</p>
        </motion.div>



        {/* Progress Guide */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest"
        >
            Scroll to Initiate Synthesis
        </motion.div>

      </div>
    </div>
  )
}
