"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Calendar, User, Layout } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProjectDetail({ project }: { project: any }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/projects" className="pointer-events-auto flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium mt-0.5">Back</span>
        </Link>
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 hidden md:block mt-0.5">
          Case Study &bull; {project.year}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-tighter leading-[0.8] mb-12 break-words"
          >
            {project.title}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20 border-t border-white/10 pt-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 text-neutral-500 mb-2 uppercase tracking-widest text-[10px] font-bold">
                <User size={12} /> Client
              </div>
              <div className="text-xl font-medium tracking-tight uppercase">{project.client || "Freelance"}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-2 text-neutral-500 mb-2 uppercase tracking-widest text-[10px] font-bold">
                <Layout size={12} /> Category
              </div>
              <div className="text-xl font-medium tracking-tight uppercase">{project.category}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="flex items-center gap-2 text-neutral-500 mb-2 uppercase tracking-widest text-[10px] font-bold">
                <Calendar size={12} /> Year
              </div>
              <div className="text-xl font-medium tracking-tight font-mono">{project.year}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <div className="flex flex-col gap-6">
                {project.url && (
                  <div>
                    <div className="flex items-center gap-2 text-neutral-500 mb-2 uppercase tracking-widest text-[10px] font-bold">
                      Live Project
                    </div>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xl font-medium underline underline-offset-8 hover:opacity-70 transition-opacity">
                      Visit Site <ArrowUpRight size={18} />
                    </a>
                  </div>
                )}

                {project.githubUrl && (
                  <div>
                    <div className="flex items-center gap-2 text-neutral-500 mb-2 uppercase tracking-widest text-[10px] font-bold">
                      Source Code
                    </div>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xl font-medium underline underline-offset-8 hover:opacity-70 transition-opacity">
                      GitHub Repo <ArrowUpRight size={18} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Banner */}
      {project.image?.asset?.url && (
        <section className="px-6 md:px-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-[60vh] md:h-[90vh] relative overflow-hidden"
          >
            <Image
              src={project.image.asset.url}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </section>
      )}

      {/* Overview & Description */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 mb-8 lg:sticky lg:top-32">
              / Project Overview
            </h2>
            {project.logo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-12 lg:sticky lg:top-48 w-48 md:w-64 aspect-square relative opacity-100 transition-all duration-700 rounded-xl overflow-hidden border border-white/10"
              >
                <Image
                  src={project.logo}
                  alt={`${project.title} Logo`}
                  fill
                  className="object-cover object-center"
                />
              </motion.div>
            )}
          </div>
          <div className="lg:col-span-8 flex flex-col gap-12">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
              {project.description}
            </h3>
            {project.overview && (
              <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl">
                {project.overview}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Snippet 1 - The Hook */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-neutral-900/5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-500 mb-12 text-center opacity-50">
              / The Interface
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[16/10] md:aspect-video rounded-lg overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8"
            >
              <Image
                src={project.gallery[0].asset?.url || project.gallery[0].src || project.gallery[0]}
                alt={`${project.title} Preview 1`}
                fill
                className="object-contain bg-neutral-950"
              />
            </motion.div>
            {project.gallery[0].caption && (
              <p className="text-center text-xs text-neutral-400 font-medium tracking-wide max-w-2xl mx-auto">
                {project.gallery[0].caption}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Outcome Section - Interjected for Storytelling */}
      {project.outcome && (
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-white/20" />
          <div className="max-w-[1400px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-500 mb-16">/ The Impact</h2>
              <p className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] max-w-5xl mx-auto">
                {project.outcome}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Remaining Snippets - Deep Dive */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {project.gallery.slice(1).map((img: any, i: number) => {
              const imageUrl = img.asset?.url || img.src || (typeof img === 'string' ? img : null)
              if (!imageUrl) return null

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col gap-6"
                >
                   <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden border border-white/5 bg-neutral-950/50">
                    <Image
                      src={imageUrl}
                      alt={`${project.title} Detail ${i + 2}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="h-px w-8 bg-white/20" />
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold leading-relaxed">
                    {img.caption || `Snippet 0${i + 2}`}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* Case Study Footer / Next Projects */}
      <footer className="py-32 px-6 border-t border-white/10 flex flex-col items-center gap-12">
        <h4 className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Have a project in mind?</h4>
        <Link
          href="/contact"
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter hover:-translate-y-2 transition-transform"
        >
          Let's Talk &rarr;
        </Link>
      </footer>
    </div>
  )
}
