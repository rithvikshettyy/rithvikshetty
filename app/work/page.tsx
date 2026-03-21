'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const workExperience = [
  {
    title: 'Technical Secretary',
    company: 'Technical Team',
    period: '2024 - 2026',
    description: 'Leading technical initiatives and managing projects while ensuring high standards of execution and innovation.',
    highlights: ['Leadership', 'Project Management', 'Technical Strategy'],
  },
  {
    title: 'Design Lead',
    company: 'TEDx SIESGST',
    period: '2025 - 2026',
    description: 'Leading design direction and creative vision for TEDx events and initiatives. Creating compelling visual experiences.',
    highlights: ['Design', 'Figma', 'Creative Direction', 'UI/UX'],
  },
  {
    title: 'Sr. Graphic Designer',
    company: "BM's Drishtency",
    period: 'Feb24 - Mar24',
    description: 'Designed graphics and visual content for various campaigns and brand materials.',
    highlights: ['Graphic Design', 'Figma', 'Visual Design'],
  },
  {
    title: 'ML Intern',
    company: 'ION Chemicals',
    period: 'Jan25 - Apr25',
    description: 'Worked on machine learning projects and data analysis initiatives.',
    highlights: ['Machine Learning', 'Data Analysis', 'Python'],
  },
]

export default function Work() {
  return (
    <main className="w-full bg-neutral-950 text-white pt-32">
      <section className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-[8vw] md:text-[6vw] font-bold leading-tight mb-12 tracking-tighter">
            Work <span className="text-neutral-600">Experience</span>
          </h1>

          <div className="space-y-20">
            {workExperience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="border-l border-white/20 pl-8 hover:border-white/50 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{item.title}</h2>
                    <p className="text-neutral-400 text-lg mt-1">{item.company}</p>
                  </div>
                  <span className="text-sm uppercase tracking-widest text-neutral-500 whitespace-nowrap">{item.period}</span>
                </div>

                <p className="text-neutral-400 mb-6 max-w-2xl">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((skill) => (
                    <span key={skill} className="px-3 py-1 border border-white/20 text-sm rounded-full hover:bg-white/10 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-white/10">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              Let's Work Together
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
