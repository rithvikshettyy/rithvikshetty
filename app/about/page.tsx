'use client'

import { motion, Variants } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Zap, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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

        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-600">Rithvik</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-400 font-light max-w-2xl tracking-wide leading-relaxed">
            <span className="font-bold text-white tracking-tight text-2xl md:text-3xl">FRONT <span className="font-serif italic font-normal text-neutral-300">end</span> DEVELOPER</span><br />
            Freelancer specialized in building <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-600">experiences</span>.
          </p>
          <div className="mt-10 flex items-center">
            <Link href="/rithvikshetty_resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 text-xs md:text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              View Resume <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]"
        >

          {/* Main Bio Bento Box */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-8 bg-neutral-900/30 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 hover:bg-neutral-900/50 transition-colors duration-500 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <Zap className="w-8 h-8 text-neutral-500 mb-8 opacity-50 hidden md:block" />
              <div className="space-y-6 text-neutral-300">
                <p className="text-xl md:text-3xl leading-relaxed font-light">
                  Passionate about emerging technologies, blending <strong className="font-semibold text-white">Machine Learning</strong> with <strong className="font-semibold text-white">Modern Web Development</strong>.
                </p>
                <p className="text-base md:text-xl leading-relaxed font-light text-neutral-400">
                  From architecting robust backends with Node & Supabase to designing pixel-perfect interfaces in Figma and React. I don't just write code; I craft holistic user experiences. Former Design Lead at TEDx SIESGST, bringing a creative edge to technical challenges.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Photo Bento Box */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 lg:col-span-4 bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden relative group h-[400px] md:h-auto min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
            <Image
              src="/about1.jpeg"
              alt="Rithvik"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-[80%_center] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm md:text-base font-medium shadow-2xl tracking-wide">
                Based in India
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Bento */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-4 bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-neutral-900/50 transition-colors duration-500 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-neutral-300" />
              <h3 className="text-2xl font-bold tracking-tight">Tech Stack</h3>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-3 w-full">
              {['Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning', 'Supabase', 'Tailwind', 'Figma'].map((skill, i) => (
                <span key={i} className="inline-flex px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-neutral-300 text-sm md:text-base hover:bg-white hover:text-black hover:scale-105 transition-all cursor-crosshair font-medium whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Core Values Bento */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-8 bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 items-center flex"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
              {[
                { title: "Design Obsessed", desc: "Pixel perfection and smooth interactions are non-negotiable." },
                { title: "Performant First", desc: "Under the hood speed that scales effortlessly over time." },
                { title: "Continuous Learner", desc: "Always adapting to the absolute edge of what's possible." }
              ].map((val, idx) => (
                <div key={idx} className="space-y-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-neutral-400 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    0{idx + 1}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-neutral-100 tracking-tight">{val.title}</h4>
                  <p className="text-neutral-500 text-base leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links Bento Layout */}
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
        </motion.div>
      </section>
    </main>
  )
}
