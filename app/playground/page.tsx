"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function PlaygroundReset() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center pt-32 relative overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10 space-y-8">
            <div className="space-y-4">
                 <Link href="/projects" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest mb-6 group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Laboratory
                 </Link>
                 <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">
                    Blank <br /> 
                    <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Canvas</span>
                 </h1>
                 <p className="text-neutral-500 text-sm font-light max-w-sm mx-auto">
                    The playground has been reset. This space is ready for a new vision.
                 </p>
            </div>

            <div className="flex justify-center pt-10">
                <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                     <Sparkles size={32} className="animate-pulse" />
                </div>
            </div>
      </div>

      <div className="fixed bottom-12 left-12 flex items-center gap-4 opacity-10 pointer-events-none">
          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-white">System Standby: IDLE</span>
      </div>
    </div>
  )
}
