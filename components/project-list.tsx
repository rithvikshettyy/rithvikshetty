"use client"

import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

const projects = [
  {
    id: "01",
    title: "TRCT.IN",
    category: "Freelance",
    year: "2026",
    description: "A dedicated website built for a thriving run club in Thane. The platform enhances community engagement and streamlines tracking and events for runners.",
  },
  {
    id: "02",
    title: "AUTOPHARMAX",
    category: "Machine Learning",
    year: "2026",
    url: "https://github.com/rithvikshettyy/autopharmax",
    description: "AI-driven platform that analyzes global drug efficacy data and clinical insights to optimize treatment outcomes.",
  },
  {
    id: "03",
    title: "SEAGUARD",
    category: "Hackathon Project",
    year: "2025",
    url: "https://github.com/rithvikshettyy/SeaGuard",
    description: "An innovative mobile application built with React Native, Supabase backend, and SARVAM AI integration. Features Twilio communication and Figma-designed UI.",
  },
  {
    id: "04",
    title: "ML BASED PIPELINE LEAK DETECTION",
    category: "Machine Learning",
    year: "2024",
    url: "https://github.com/rithvikshettyy/ml-based-pipeline-leak-detection",
    description: "A machine learning solution for detecting pipeline leaks using advanced sensor data analysis.",
  },
  {
    id: "05",
    title: "LOOPLIST",
    category: "SOFTWARE",
    year: "2024",
    url: "https://github.com/rithvikshettyy/LoopList-Collaborative-ToDo-app-using-Firebase-and-Streamlit",
    description: "A collaborative to-do list web application that allows users to manage their tasks in real-time.",
  },
  {
    id: "06",
    title: "FEEDBACK FORM",
    category: "JAVA APPLICATION",
    year: "2023",
    url: "https://github.com/rithvikshettyy/FeedbackForm",
    description: "A simple feedback form built with Java Swing for collecting user feedback.",
  },
  {
    id: "07",
    title: "AI CHATBOT",
    category: "PYTHON",
    year: "2023",
    url: "https://github.com/rithvikshettyy/AI-Chatbot",
    description: "A simple AI chatbot built with Python for collecting user feedback.",
  },
]

export default function ProjectList() {
  return (
    <div className="py-32 px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 w-full mx-auto">
      <div className="mb-20 border-b border-white/20 pb-6 flex justify-between items-end">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">SELECTED WORKS</h2>
        <span className="hidden md:inline-block text-sm text-neutral-500">( 2022 — 2026 )</span>
      </div>

      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/projects"
            className="group relative px-8 py-4 border border-white/30 rounded-full text-sm uppercase tracking-widest overflow-hidden inline-block"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              View All Projects
            </span>
            <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function ProjectItem({ project }: { project: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const isExternal = project.url && project.url.startsWith("http")
  const href = project.url || "/projects"
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="group relative border-b border-white/10 py-8 cursor-pointer transition-colors hover:bg-neutral-900/50"
    >
      <Link
        href={href}
        {...linkProps}
        className="flex flex-col px-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6 md:w-1/2">
            <span className="text-xs font-mono text-neutral-500 shrink-0">/{project.id}</span>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-4">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center justify-between md:w-1/2 md:justify-end gap-12">
            <span className="text-sm uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
              {project.category}
            </span>
            <span className="text-sm font-mono text-neutral-600">{project.year}</span>
            <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>

        {/* Expandable Description */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:ml-[3.25rem]">
          <div className="overflow-hidden">
            <p className="pt-4 pb-2 text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed transform md:translate-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:delay-100">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
