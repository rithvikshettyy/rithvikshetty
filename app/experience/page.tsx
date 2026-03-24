'use client'

import { useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Building2, ExternalLink } from 'lucide-react'

const workExperiences = [
  {
    title: 'Salesforce & Marketing Automation Intern',
    company: 'Lupin Ltd',
    period: 'Dec 2025 - Feb 2026',
    description: 'Streamlining business processes and enhancing outreach strategies using Salesforce CRM and advanced marketing automation tools.',
    skills: ['Salesforce', 'Marketing Automation', 'Analytics', 'Technical Strategy'],
    type: 'Internship',
    certificateUrl: 'experience/lupin.pdf',
  },
  {
    title: 'Machine Learning Intern',
    company: 'ION Chemicals',
    period: 'Jan 2025 - Apr 2025',
    description: 'Developing and optimizing machine learning models for chemical analysis and process automation, improving prediction accuracy across datasets.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Scikit-learn'],
    type: 'Internship',
    certificateUrl: 'experience/Ionchemicals.pdf',
  },
  {
    title: 'Graphic Designer',
    company: "BM's Drishtency",
    period: 'Feb 2024 - Mar 2024',
    description: 'Designed high-impact graphics and visual content for digital marketing campaigns and brand identity materials.',
    skills: ['Graphic Design', 'Figma', 'Visual Design', 'Branding'],
    type: 'INTERNSHIP',
    certificateUrl: '#',
  },
  {
    title: 'Graphic Designer',
    company: "AASK RETAIL LLP",
    period: 'Jan 2024 - Feb 2024',
    description: 'Specialized in apparel design by creating custom T-shirt graphics and high-fidelity mockups for new retail collections.',
    skills: ['Graphic Design', 'Figma', 'Apparel Design', 'Mockup Design'],
    type: 'INTERNSHIP',
    certificateUrl: 'experience/irsya.pdf',
  },
]

const collegePositions = [
  {
    title: 'Technical Secretary',
    company: 'Technical Team',
    period: '2025 - 2026',
    description: 'Leading technical initiatives and managing large-scale projects while ensuring high standards of execution and innovation for the college community.',
    skills: ['Leadership', 'Project Management', 'Technical Strategy'],
    type: 'Leadership',
    // certificateUrl: '#',
  },
  {
    title: 'Design Lead',
    company: 'TEDx SIESGST',
    period: '2025 - 2026',
    description: 'Leading design direction and creative vision for TEDx events and initiatives, creating compelling and cohesive visual experiences.',
    skills: ['Design', 'Figma', 'Creative Direction', 'UI/UX'],
    type: 'Leadership',
    // certificateUrl: '#',
  },
  {
    title: 'Social Media Lead',
    company: 'Ecell SIESGST',
    period: 'Aug 2025 - Dec 2025',
    description: 'Coordinating social media strategies and digital presence to promote entrepreneurship and innovation-focused events.',
    skills: ['Leadership', 'Strategy', 'Growth', 'Marketing'],
    type: 'leadership',
    // certificateUrl: '#',
  },
]

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<'work' | 'college'>('work');
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

  const renderExperienceItem = (exp: any, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: -20, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 20, y: -20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="pl-8 py-10 md:py-12 relative group"
    >
      {/* Animated Dot */}
      <motion.div
        initial={{ backgroundColor: "rgba(0,0,0,1)", borderColor: "rgba(255,255,255,0.2)" }}
        animate={{ backgroundColor: "rgba(255,255,255,1)", borderColor: "rgba(255,255,255,1)" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -left-[7px] top-12 md:top-14 w-4 h-4 rounded-full border-2 z-10"
      />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{exp.title}</h3>
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
        <span className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] md:text-xs uppercase tracking-widest rounded h-fit">
          {exp.type}
        </span>
      </div>

      <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 max-w-4xl">
        {exp.description}
      </p>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill: string, skillIndex: number) => (
            <span
              key={skillIndex}
              className="px-3 py-1 bg-neutral-900 text-neutral-300 text-[10px] md:text-xs rounded border border-neutral-700 hover:border-neutral-500 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {exp.certificateUrl && (
          <a
            href={exp.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors group/link"
          >
            <span>View Certificate</span>
            <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );

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
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">
            My <span className="text-neutral-600">Journey</span>
          </h1>
          <p className="text-neutral-400 mt-6 text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
            Exploring the intersection of <span className="text-white font-medium">industry experience</span> and <span className="text-white font-medium">academic leadership</span>.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="mb-20 flex justify-center md:justify-start">
          <div className="relative p-1 bg-neutral-900/50 rounded-2xl border border-white/5 flex w-full md:w-auto overflow-hidden">
            <motion.div
              layoutId="tab-background"
              className="absolute inset-y-1 bg-white rounded-xl z-0"
              initial={false}
              animate={{
                x: activeTab === 'work' ? 0 : '100%',
                width: '50%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab('work')}
              className={`relative z-10 flex-1 px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === 'work' ? 'text-black' : 'text-neutral-500 hover:text-white'}`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('college')}
              className={`relative z-10 flex-1 px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === 'college' ? 'text-black' : 'text-neutral-500 hover:text-white'}`}
            >
              Positions Of Responsibility
            </button>
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Background Track Line */}
          <div className="absolute left-0 top-0 h-full w-[2px] bg-white/10" />

          {/* Animated Scroll Progress Line */}
          <motion.div
            className="absolute left-0 top-0 h-full w-[2px] bg-white origin-top"
            style={{ scaleY }}
          />

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === 'work' ? (
                  <div className="space-y-4">
                    {workExperiences.map((exp, index) => renderExperienceItem(exp, index))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {collegePositions.map((exp, index) => renderExperienceItem(exp, index))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-32 pt-20 border-t border-white/10"
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
