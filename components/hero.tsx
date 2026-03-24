"use client"

import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useRef } from "react"

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const text1 = "RITHVIK"
  const text2 = "SHETTY"

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const letterVariants: Variants = {
    hidden: { y: "110%", opacity: 0, rotateZ: 10, scale: 0.9 },
    visible: {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

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

      <motion.div style={{ y, opacity }} className="z-10 flex flex-col items-center">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[calc(17vw_-_6px)] md:text-[calc(13vw_-_6px)] leading-[0.85] font-bold tracking-tighter text-center mix-blend-difference select-none flex flex-col items-center"
        >
          <div className="flex overflow-hidden px-4 pb-2">
            {text1.split("").map((char, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block origin-bottom">
                {char}
              </motion.span>
            ))}
          </div>
          <div className="flex overflow-hidden text-neutral-600 px-4 pb-2">
            {text2.split("").map((char, i) => (
              <motion.span key={i} variants={letterVariants} className="inline-block origin-bottom">
                {char}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-lg md:text-2xl max-w-2xl text-center font-light text-neutral-400 tracking-wide"
        >
          <span className="font-bold text-white tracking-tight uppercase">FULL <span className="font-serif italic font-normal text-neutral-300 normal-case">stack</span> DEVELOPER</span> & Freelancer crafting digital experiences with code and creativity.
        </motion.p>
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
