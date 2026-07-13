"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

export default function BackgroundMotion() {
  const { scrollYProgress } = useScroll()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Parallax layers for more depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -1000])
  const rotateStep = useTransform(scrollYProgress, [0, 1], [0, 180])

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 80, damping: 25 })
  const springY3 = useSpring(y3, { stiffness: 60, damping: 20 })

  // Mouse trail / Glow
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Grid warp based on mouse
  const gridRotateX = useTransform(mouseY, [0, windowSize.height || 1000], [10, -10])
  const gridRotateY = useTransform(mouseX, [0, windowSize.width || 1000], [-10, 10])

  // Particles state
  const [particles, setParticles] = useState<any[]>([])
  useEffect(() => {
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20
    }))
    setParticles(p)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Reactive Glow Follower */}
      <motion.div
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] opacity-40 mix-blend-screen"
      />
      <motion.div
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] opacity-30 mix-blend-screen"
      />

{/* Floating Particles Layer */ }
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  {particles.map((p) => (
    <motion.div
      key={p.id}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 0],
        y: ["0%", "100%"]
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        delay: p.delay,
        ease: "linear"
      }}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        backgroundColor: "white",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(255,255,255,0.5)"
      }}
      className="absolute"
    />
  ))}
</div>

{/* Dynamic Grid */ }
<motion.div
  style={{
    rotateX: gridRotateX,
    rotateY: gridRotateY,
    perspective: 1500
  }}
  className="absolute inset-[-20%] opacity-20 transition-transform duration-500"
>
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
</motion.div>

{/* Layer 1 - Slow Parallax */ }
<motion.div style={{ y: springY1 }} className="absolute inset-0">
  <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[150px]" />
  <div className="absolute top-[60%] right-[15%] w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[180px]" />

  {/* Animated Connecting Lines */}
  <svg className="absolute inset-0 w-full h-full opacity-20">
    <motion.path
      d="M -200 10% Q 50% 30% 120% 10%"
      fill="none"
      stroke="white"
      strokeWidth="0.5"
      strokeDasharray="10 10"
      style={{ pathLength: scrollYProgress }}
    />
    <motion.path
      d="M -200 70% Q 40% 50% 130% 80%"
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1"
      style={{ pathLength: scrollYProgress }}
    />
  </svg>
</motion.div>

{/* Layer 2 - Medium Parallax */ }
<motion.div style={{ y: springY2 }} className="absolute inset-0">
  <motion.div
    style={{ rotate: rotateStep }}
    className="absolute top-[35%] left-[55%] w-40 h-40 border border-white/5 rounded-2xl rotate-45 backdrop-blur-[2px]"
  />
  <motion.div
    style={{ rotate: rotateStep }}
    className="absolute top-[75%] left-[15%] w-60 h-60 border border-white/5 rounded-full backdrop-blur-[1px]"
  />
</motion.div>

{/* Layer 3 - Fast Parallax (Foreground Sparkles) */ }
<motion.div style={{ y: springY3 }} className="absolute inset-0 opacity-50">
  <div className="absolute top-[10%] right-[20%] w-2 h-2 bg-white rounded-full blur-[1px]" />
  <div className="absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-blue-300 rounded-full blur-[1px]" />
  <div className="absolute bottom-[20%] right-[40%] w-2 h-2 bg-purple-300 rounded-full blur-[2px]" />
</motion.div>

{/* Global Grain Texture */ }
<div
  className="absolute inset-0 opacity-[0.04] pointer-events-none pointer-events-none contrast-150 brightness-150"
  style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
/>
    </div >
  )
}
