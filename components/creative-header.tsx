"use client"

import React from 'react'
import { motion } from 'framer-motion'
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
  return (
    <div className="w-full bg-[#efebe0] text-black overflow-hidden relative border-y border-black/15">
      <div className="w-full">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row border-b border-black/15">
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-black/15 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset).padStart(2, '0')})</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none text-neutral-900">
              {row1.left}
            </h2>
          </div>
          <div className="flex-[0.4] border-b lg:border-b-0 lg:border-r border-black/15 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group overflow-hidden">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 1).padStart(2, '0')})</span>
            
            <div className="flex items-center justify-center gap-4 lg:gap-8 relative z-10 w-full lg:w-auto">
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-neutral-700 tracking-tighter shrink-0">
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
          <div className="flex-1 border-b md:border-b-0 border-black/15 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 2).padStart(2, '0')})</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none text-neutral-900">
              {row1.right}
            </h2>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row border-b border-black/15">
          <div className="flex-[0.25] border-b lg:border-b-0 lg:border-r border-black/15 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center bg-black/[0.02] relative group">
             <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 3).padStart(2, '0')})</span>
             <span className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-neutral-700">
              {row2.left}
            </span>
          </div>
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-black/15 py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 4).padStart(2, '0')})</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-neutral-900">
              {row2.right}
            </h2>
          </div>
          <div className="flex-[0.75] py-6 lg:py-8 px-6 lg:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 5).padStart(2, '0')})</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none italic text-neutral-900">
              {row2.center}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreativeHeader
