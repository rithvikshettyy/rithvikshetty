"use client"

import React from 'react'

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
}

const CreativeHeader: React.FC<CreativeHeaderProps> = ({ row1, row2, indexOffset = 1 }) => {
  return (
    <div className="w-full bg-[#efebe0] text-black overflow-hidden relative border-y border-black/15">
      <div className="w-full">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row border-b border-black/15">
          <div className="flex-1 border-r border-black/15 py-4 md:py-6 px-6 md:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset).padStart(2, '0')})</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none text-neutral-900">
              {row1.left}
            </h2>
          </div>
          <div className="flex-[0.4] border-r border-black/15 py-4 md:py-6 px-6 md:px-10 flex items-center justify-center bg-black/[0.03] relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 1).padStart(2, '0')})</span>
            <span className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-neutral-700 tracking-tighter">
              {row1.center}
            </span>
          </div>
          <div className="flex-1 py-4 md:py-6 px-6 md:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 2).padStart(2, '0')})</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none text-neutral-900">
              {row1.right}
            </h2>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row border-b border-black/15">
          <div className="flex-[0.25] border-r border-black/15 py-4 md:py-6 px-6 md:px-10 flex items-center justify-center bg-black/[0.02] relative group">
             <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 3).padStart(2, '0')})</span>
             <span className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-neutral-700">
              {row2.left}
            </span>
          </div>
          <div className="flex-1 border-r border-black/15 py-4 md:py-6 px-6 md:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 4).padStart(2, '0')})</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-neutral-900">
              {row2.right}
            </h2>
          </div>
          <div className="flex-[0.75] py-4 md:py-6 px-6 md:px-10 flex items-center justify-center relative group">
            <span className="absolute top-2 left-2 text-[8px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">({String(indexOffset + 5).padStart(2, '0')})</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none italic text-neutral-900">
              {row2.center}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreativeHeader
