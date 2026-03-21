'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Building2 } from 'lucide-react'
import { Metadata } from 'next'

const experiences = [
  {
    title: 'Technical Secretary',
    company: 'Technical Team',
    period: '2024 - 2026',
    description: 'Leading technical initiatives and managing projects while ensuring high standards of execution and innovation.',
    skills: ['Leadership', 'Project Management', 'Technical Strategy'],
    type: 'Leadership',
  },
  {
    title: 'Design Lead',
    company: 'TEDx SIESGST',
    period: '2025 - 2026',
    description: 'Leading design direction and creative vision for TEDx events and initiatives. Creating compelling visual experiences.',
    skills: ['Design', 'Figma', 'Creative Direction', 'UI/UX'],
    type: 'Design',
  },
  {
    title: 'Sr. Graphic Designer',
    company: "BM's Drishtency",
    period: 'Feb24 - Mar24',
    description: 'Designed graphics and visual content for various campaigns and brand materials.',
    skills: ['Graphic Design', 'Figma', 'Visual Design'],
    type: 'Design',
  },
]

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
            My <span className="text-neutral-600">Experience</span>
          </h1>
          <p className="text-neutral-400 mt-6 text-lg max-w-2xl">
            A timeline of my professional journey, roles, and contributions across various organizations and projects.
          </p>
        </div>

        <div className="relative mt-12" ref={containerRef}>
          {/* Background Track Line */}
          <div className="absolute left-0 top-0 h-full w-[2px] bg-white/10" />
          
          {/* Animated Scroll Progress Line */}
          <motion.div
            className="absolute left-0 top-0 h-full w-[2px] bg-white origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="pl-8 py-8 relative group"
              >
                {/* Animated Dot */}
                <motion.div 
                  initial={{ backgroundColor: "rgba(0,0,0,1)", borderColor: "rgba(255,255,255,0.2)" }}
                  whileInView={{ backgroundColor: "rgba(255,255,255,1)", borderColor: "rgba(255,255,255,1)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute -left-[7px] top-10 w-4 h-4 rounded-full border-2 z-10" 
                />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">{exp.title}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-neutral-400">
                    <span className="flex items-center gap-2">
                      <Building2 size={16} />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {exp.period}
                    </span>
                  </div>
                </div>
                <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs uppercase tracking-widest rounded">
                  {exp.type}
                </span>
              </div>

              <p className="text-neutral-400 text-base leading-relaxed mb-6">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-neutral-900 text-neutral-300 text-xs rounded border border-neutral-700 hover:border-neutral-500 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <h2 className="text-3xl font-bold mb-8">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Years Active', value: '4+' },
              { label: 'Roles Held', value: '4' },
              { label: 'Organizations', value: '4' },
              { label: 'Skills Mastered', value: '15+' },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-neutral-500 text-sm uppercase tracking-widest mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
