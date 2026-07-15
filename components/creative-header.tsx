"use client"

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

interface CreativeHeaderProps {
  row1: {
    left: string
    center: string
    right: string
  }
  row2: {
    left: string
    center: string
    right: string
  }
  indexOffset?: number
  floatingImage?: string
}

const CreativeHeader: React.FC<CreativeHeaderProps> = ({ row1, row2, indexOffset = 1, floatingImage }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Rows move in opposite directions on scroll
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100])
  
  const springLeft = useSpring(xLeft, { stiffness: 100, damping: 30 })
  const springRight = useSpring(xRight, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="w-full bg-[#a81f14] text-white overflow-hidden relative border-y border-white/20">
      <div className="w-full">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row border-b border-white/20">
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-white/20 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset).padStart(2, '0')})</span>
            <motion.h2 
              style={{ x: springLeft }}
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none text-white whitespace-nowrap"
            >
              {row1.left}
            </motion.h2>
          </div>
          <div className="flex-[0.4] border-b lg:border-b-0 lg:border-r border-white/20 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group overflow-hidden">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 1).padStart(2, '0')})</span>
            
            <div className="flex items-center justify-center gap-4 lg:gap-8 relative z-10 w-full lg:w-auto">
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white/70 tracking-tighter shrink-0">
                {row1.center}
              </span>

              {floatingImage && (
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 md:w-24 md:h-24 pointer-events-none opacity-90 drop-shadow-xl"
                >
                  <Image src={floatingImage} alt="3D Accent" fill className="object-contain" />
                </motion.div>
              )}
            </div>
          </div>
          <div className="flex-1 border-b md:border-b-0 border-white/20 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 2).padStart(2, '0')})</span>
            <motion.h2 
              style={{ x: springRight }}
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none text-white whitespace-nowrap"
            >
              {row1.right}
            </motion.h2>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row border-b border-white/20">
          <div className="flex-[0.25] border-b lg:border-b-0 lg:border-r border-white/20 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center bg-white/[0.05] relative group">
             <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 3).padStart(2, '0')})</span>
             <span className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white/70">
              {row2.left}
            </span>
          </div>
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-white/20 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 4).padStart(2, '0')})</span>
            <motion.h2 
              style={{ x: springLeft }}
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-white whitespace-nowrap"
            >
              {row2.right}
            </motion.h2>
          </div>
          <div className="flex-[0.75] py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 5).padStart(2, '0')})</span>
            <motion.h2 
              style={{ x: springRight }}
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none italic text-white whitespace-nowrap"
            >
              {row2.center}
            </motion.h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreativeHeader
