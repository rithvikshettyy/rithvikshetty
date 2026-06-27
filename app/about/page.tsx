'use client'

import { motion, Variants } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Zap, Star, Code2, Wind, FileCode2, Terminal, Server, Database, PenTool, Cloud, Box } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollTextReveal from '@/components/scroll-text-reveal'
import SpotifyStatus from '@/components/spotify-status'

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.89 6.4 9.32a9.7 9.7 0 0 1-.16-2.81l.86-3.66s-.22-.44-.22-1.09c0-1.02.6-1.78 1.34-1.78.63 0 .94.47.94 1.04 0 .63-.4 1.58-.61 2.45-.18.73.37 1.33 1.08 1.33 1.3 0 2.3-1.38 2.3-3.37 0-1.76-1.26-3-3.07-3-2.1 0-3.35 1.58-3.35 3.22 0 .64.25 1.33.56 1.7.06.07.07.14.05.21l-.18.75c-.03.11-.1.14-.2.09-1.42-.66-2.31-2.73-2.31-4.4 0-3.58 2.6-6.87 7.5-6.87 3.93 0 6.98 2.8 6.98 6.54 0 3.9-2.46 7.05-5.88 7.05-1.15 0-2.23-.6-2.6-1.3l-.7 2.67c-.25.96-.9 2.16-1.35 2.9A10.02 10.02 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
)

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function About() {
  return (
    <main className="w-full bg-black text-white min-h-screen pt-32 pb-20 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <section className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 relative z-10">

        {/* Header Section with Photo Beside Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-12 xl:col-span-7"
          >
            <SpotifyStatus variant="inline" />
            <h1 className="text-6xl md:text-[10vw] xl:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-600">Rithvik</span>
            </h1>
            <p className="text-xl md:text-3xl text-neutral-400 font-light tracking-wide leading-relaxed max-w-2xl">
              <span className="font-bold text-white tracking-tight text-2xl md:text-4xl">FRONT <span className="font-serif italic font-normal text-neutral-300">end</span> DEVELOPER</span><br />
              Freelancer specialized in building <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-600">experiences</span>.
            </p>
            <div className="mt-12 flex items-center">
              <Link href="/rithvikshetty_resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 text-xs md:text-sm shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                View Resume <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Photo Section (Moved beside text) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 xl:col-span-5 bg-neutral-900 border border-white/10 rounded-[2.5rem] overflow-hidden relative group h-[400px] md:h-[600px] xl:h-[550px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <Image
              src="/about1.jpeg"
              alt="Rithvik"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-[center_top] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute bottom-10 left-10 z-20">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-base font-medium shadow-2xl tracking-wide">
                Based in India
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-32">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl"
          >
            <div className="space-y-16">
              <ScrollTextReveal
                className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]"
                text="Passionate about emerging technologies, blending Machine Learning with Modern Web Development."
              />
              <ScrollTextReveal
                className="text-2xl md:text-4xl leading-tight font-bold tracking-tighter text-neutral-400 max-w-5xl"
                text="From architecting robust backends with Node & Supabase to designing pixel-perfect interfaces in Figma and React. I don't just write code; I craft holistic user experiences. Former Design Lead at TEDx SIESGST, bringing a creative edge to technical challenges."
              />
            </div>
          </motion.div>

          {/* Tech Stack (Unwrapped from grid) */}
          <motion.div
            variants={itemVariants}
            className="space-y-12 py-6 max-w-7xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <h3 className="text-2xl font-bold tracking-tight uppercase text-neutral-500">Expertise</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { name: "REACT JS", icon: Code2, color: "#61DAFB" },
                { name: "NEXT JS", icon: Code2, color: "#ffffff" },
                { name: "TYPESCRIPT", icon: FileCode2, color: "#3178C6" },
                { name: "TAILWIND", icon: Wind, color: "#38B2AC" },
                { name: "NODE JS", icon: Server, color: "#339933" },
                { name: "PYTHON", icon: Terminal, color: "#3776AB" },
                { name: "SUPABASE", icon: Database, color: "#3ECF8E" },
                { name: "POSTGRES", icon: Database, color: "#336791" },
                { name: "DOCKER", icon: Box, color: "#2496ED" },
                { name: "AWS", icon: Cloud, color: "#FF9900" },
                { name: "FIGMA", icon: PenTool, color: "#F24E1E" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col items-center justify-center space-y-6"
                >
                  <div className="relative">
                    {/* Burst Effect (Shockwave) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileHover={{ scale: 2.2, opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className="w-32 h-32 rounded-full border border-white/40 pointer-events-none z-0"
                      />
                    </div>

                    {/* Drifting Particles Burst */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      {[...Array(8)].map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                          whileHover={{
                            opacity: [0, 1, 0],
                            x: Math.cos((j * 45) * (Math.PI / 180)) * 70,
                            y: Math.sin((j * 45) * (Math.PI / 180)) * 70,
                            scale: [0, 1, 0.5]
                          }}
                          transition={{ duration: 0.7, ease: "backOut", delay: j * 0.01 }}
                          className="absolute w-1 h-1 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      ))}
                    </div>

                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                        rotate: [0, 2, 0, -2, 0]
                      }}
                      transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                      whileHover={{ scale: 1.12, rotate: 5 }}
                      className="p-8 md:p-10 bg-[#1a1a1a] rounded-[2rem] border-2 shadow-2xl relative z-10 transition-all duration-500 group-hover:bg-[#222]"
                      style={{ borderColor: `${item.color}20` }}
                    >
                      <item.icon size={64} strokeWidth={1.5} color={item.color} className="w-12 h-12 md:w-20 md:h-20" />

                      {/* Inner Shine Effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.25 }}
                        className="absolute inset-0 blur-2xl rounded-full"
                        style={{ backgroundColor: item.color }}
                      />

                      {/* Shadow Underneath */}
                      <motion.div
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/40 blur-xl rounded-full"
                        animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      />
                    </motion.div>
                  </div>

                  {/* Skill Typography */}
                  <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase text-neutral-500 group-hover:text-white transition-colors duration-500">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Values Section (Updated to single paragraph) */}
          <motion.div
            variants={itemVariants}
            className="space-y-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <h3 className="text-2xl font-bold tracking-tight uppercase text-neutral-500">Principles</h3>
            </div>

            <div className="max-w-6xl">
              <ScrollTextReveal
                className="text-2xl md:text-5xl leading-[1.1] font-bold tracking-tighter text-neutral-400"
                text="My approach is rooted in being Design Obsessed, where pixel perfection and smooth interactions are non-negotiable. I prioritize being Performant First, ensuring under-the-hood speed that scales effortlessly over time. As a Continuous Learner, I am always adapting to the absolute edge of what's possible."
              />
            </div>
          </motion.div>

          {/* Social Links (Bento Style Restored) */}
          <motion.div
            variants={itemVariants}
            className="space-y-16 pb-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <h3 className="text-2xl font-bold tracking-tight uppercase text-neutral-500">Connect</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
              {[
                { name: 'GitHub', icon: Github, href: 'https://github.com/rithvikshettyy', col: 'md:col-span-2 lg:col-span-4', hover: 'hover:bg-neutral-100 hover:text-black hover:border-white' },
                { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/rithvikshetty/', col: 'md:col-span-2 lg:col-span-4', hover: 'hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white' },
                { name: 'Twitter', icon: Twitter, href: 'https://x.com/RithvikShetty04', col: 'md:col-span-2 lg:col-span-4', hover: 'hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white' },
                { name: 'Pinterest', icon: PinterestIcon, href: 'https://in.pinterest.com/mayberithvik/', col: 'md:col-span-3 lg:col-span-6', hover: 'hover:bg-[#E60023] hover:border-[#E60023] hover:text-white' },
                { name: 'Contact', icon: Mail, href: '/contact', col: 'md:col-span-3 lg:col-span-6', hover: 'hover:bg-red-500 hover:border-red-500 hover:text-white', isLink: true }
              ].map((link, i) => {
                const inner = (
                  <div className="flex flex-col h-full justify-between gap-8">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-white/10 rounded-2xl">
                        <link.icon className="w-7 h-7" />
                      </div>
                      <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>
                    <div className="relative">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{link.name}</h3>
                    </div>
                  </div>
                );

                const className = `group bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 transition-all duration-500 cursor-pointer ${link.hover}`;

                return (
                  <motion.div variants={itemVariants} key={i} className={link.col}>
                    {link.isLink ? (
                      <Link href={link.href} className={`block h-full ${className}`}>{inner}</Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={`block h-full ${className}`}>{inner}</a>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
