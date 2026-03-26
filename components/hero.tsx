"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-4"
    >
      {/* Ambient Background Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["-20%", "20%", "-20%"],
            y: ["-20%", "20%", "-20%"],
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-white blur-[120px]"
        />
        <motion.div
          animate={{
            x: ["20%", "-20%", "20%"],
            y: ["20%", "-20%", "20%"],
            scale: [1.2, 1, 1.2],
            opacity: [0.01, 0.03, 0.01]
          }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-neutral-400 blur-[130px]"
        />
        <motion.div
          animate={{
            y: ["-30%", "30%", "-30%"],
            opacity: [0.01, 0.02, 0.01]
          }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-neutral-300 blur-[100px]"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="z-10 flex flex-col items-center text-center max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-7xl md:text-[12vw] xl:text-[140px] font-black tracking-tighter leading-[0.8] mb-12">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-600">Rithvik</span>
          </h1>

          <p className="text-2xl md:text-5xl text-neutral-400 font-light tracking-tight leading-tight max-w-4xl mx-auto space-y-4">
            <span className="block font-bold text-white tracking-tighter text-3xl md:text-6xl uppercase">
              FULL <span className="font-serif italic font-normal text-neutral-400 lowercase tracking-normal">stack</span> DEVELOPER
            </span>
            <span className="block text-xl md:text-3xl font-light tracking-wide text-neutral-500 mt-6">
              Freelancer specialized in building <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">experiences</span>.
            </span>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        className="absolute bottom-10 left-10 md:left-12 flex flex-col items-start gap-2 text-xs uppercase tracking-widest text-neutral-500"
      >
        <span className="font-bold text-neutral-300 tracking-tight">FULL <span className="font-serif italic font-normal normal-case tracking-normal text-white text-[14px] leading-none">stack</span> DEVELOPER</span>
        <span>Available for Freelance</span>
      </motion.div>
    </div>
  )
}
