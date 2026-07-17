'use client'

import { motion, Variants } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollTextReveal from '@/components/scroll-text-reveal'
import SpotifyStatus from '@/components/spotify-status'

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.89 6.4 9.32a9.7 9.7 0 0 1-.16-2.81l.86-3.66s-.22-.44-.22-1.09c0-1.02.6-1.78 1.34-1.78.63 0 .94.47.94 1.04 0 .63-.4 1.58-.61 2.45-.18.73.37 1.33 1.08 1.33 1.3 0 2.3-1.38 2.3-3.37 0-1.76-1.26-3-3.07-3-2.1 0-3.35 1.58-3.35 3.22 0 .64.25 1.33.56 1.7.06.07.07.14.05.21l-.18.75c-.03.11-.1.14-.2.09-1.42-.66-2.31-2.73-2.31-4.4 0-3.58 2.6-6.87 7.5-6.87 3.93 0 6.98 2.8 6.98 6.54 0 3.9-2.46 7.05-5.88 7.05-1.15 0-2.23-.6-2.6-1.3l-.7 2.67c-.25.96-.9 2.16-1.35 2.9A10.02 10.02 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
)

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

// The "About" block — intro, expertise grid, principles, and connect bento.
// Used standalone on /about and embedded on the homepage.
export default function AboutSection() {
  return (
    <div className="w-full bg-black text-white pt-24 md:pt-28 pb-20 overflow-hidden relative">
      {/* Crimson ambient glow — echoes the homepage red */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[440px] bg-[#a81f14]/25 blur-[130px] rounded-full pointer-events-none" />

      <section className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 relative z-10">

        {/* Header Section with Photo Beside Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-12 xl:col-span-7"
          >
            <SpotifyStatus variant="inline" />
            <h2 className="text-6xl md:text-[10vw] xl:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
              I'm <span className="text-accent">Rithvik</span>
            </h2>
            <p className="text-xl md:text-3xl text-neutral-400 font-light tracking-wide leading-relaxed max-w-2xl">
              <span className="font-bold text-white tracking-tight text-2xl md:text-4xl">FULL <span className="font-serif italic font-normal text-neutral-300">stack</span> DEVELOPER</span><br />
              Freelancer specialized in building <span className="text-accent">experiences</span>.
            </p>
            <div className="mt-12 flex items-center gap-4 flex-wrap">
              <Link href="/rithvikshetty_resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full border border-black/15 dark:border-transparent hover:scale-105 transition-transform flex items-center justify-center gap-3 text-xs md:text-sm shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                View Resume <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/chat"
                prefetch={false}
                aria-label="Ask my AI assistant"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.03] py-1.5 pl-5 pr-1.5 backdrop-blur-md transition-colors duration-300 hover:border-white/30 shrink-0"
              >
                {/* Hover sheen sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative text-[15px] md:text-base font-semibold tracking-tight text-white">Ask my AI assistant</span>
                <span className="relative ml-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-300 ease-out group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Photo Section (Moved beside text) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 xl:col-span-5 bg-neutral-900 border border-white/10 rounded-[2.5rem] overflow-hidden relative group h-[400px] md:h-[600px] xl:h-[550px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <Image
              src="/about3.PNG"
              alt="Rithvik"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_top] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
          </motion.div>
        </div>

        <div className="space-y-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
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

          {/* Core Values Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={itemVariants}
            className="space-y-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <h3 className="text-2xl font-bold tracking-tight uppercase text-neutral-500">Principles</h3>
            </div>

            <div className="max-w-6xl">
              <ScrollTextReveal
                className="text-2xl md:text-5xl leading-[1.1] font-medium tracking-tight text-neutral-400"
                text="My approach is rooted in being Design Obsessed, where pixel perfection and smooth interactions are non-negotiable. I prioritize being Performant First, ensuring under-the-hood speed that scales effortlessly over time. As a Continuous Learner, I am always adapting to the absolute edge of what's possible."
              />
            </div>
          </motion.div>

          {/* Social Links (Bento Style) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
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
    </div>
  )
}
