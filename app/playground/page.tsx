"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Zap, FlaskConical } from 'lucide-react'
import Link from 'next/link'

export default function Playground() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 pt-40 md:pt-48 pb-20 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/[0.05] blur-[100px] rounded-full pointer-events-none" />

      {/* Particle System (Bubbles) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
                x: Math.random() * 100 + "%", 
                y: "110%", 
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
                y: "-10%", 
                opacity: [0, 0.4, 0],
            }}
            transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-16 md:gap-20">
        
        {/* Animated Icon Core */}
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group"
        >
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-700 pointer-events-none" />
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-neutral-900 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/30 transition-colors">
                <motion.div
                    animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FlaskConical size={48} className="text-white opacity-40 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                </motion.div>
                
                {/* Liquid fill effect */}
                <motion.div 
                    animate={{ y: ["100%", "40%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-0 bottom-0 bg-white/5 h-full pointer-events-none translate-y-full"
                />
            </div>
            
            <div className="absolute -top-4 -right-4">
                 <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-3 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                 >
                    <Zap size={16} fill="currentColor" />
                 </motion.div>
            </div>
        </motion.div>

        {/* Messaging */}
        <div className="space-y-8">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-white/20" />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-neutral-500 italic">Laboratory Node</span>
                    <div className="h-[1px] w-12 bg-white/20" />
                </div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none italic">
                    Something Cool <br />
                    <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Is Brewing</span>
                </h1>
            </motion.div>
            
            <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-500 text-sm md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
            >
                The experimental digital playground is currently under an architectural synthesis. New interactions, shaders, and prototypes are in the synthesis stage.
            </motion.p>
        </div>

        {/* Action */}
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-6"
        >
            <Link 
                href="/" 
                className="group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Return to Surface
            </Link>
            
            <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                 <div className="flex -space-x-2">
                     {[Sparkles, Zap, FlaskConical].map((Icon, i) => (
                         <div key={i} className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
                             <Icon size={12} className="text-neutral-500" />
                         </div>
                     ))}
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-600">Synthesis in Progress</span>
            </div>
        </motion.div>

      </div>

      {/* Status Bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-8 text-[10px] font-mono tracking-widest uppercase">
                <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Uplink: Static
                </span>
                <span className="text-neutral-700">|</span>
                <span>Version 2.0.0-PROTOTYPE</span>
           </div>
      </div>

    </div>
  )
}
