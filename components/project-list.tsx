"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import { projectsQuery } from "@/sanity/lib/queries"

export const staticProjects = [
  {
    id: "01",
    slug: "interviewdump",
    title: "INTERVIEWDUMP",
    client: "Personal Project",
    category: "Software",
    year: "2026",
    url: "https://www.interviewdump.dev/",
    image: "/interview.PNG",
    logo: "/interview.PNG",
    description: "A free, full-stack tech interview prep platform with 500+ curated questions across DSA, SQL, System Design, Core CS, and Aptitude. All with no paywall or signup wall.",
    overview: "Built a full-stack interview prep platform from scratch using Next.js, TypeScript, Tailwind CSS, and Supabase. Covers 500+ questions across 8 categories with rich explanations, company-specific question banks, and interactive learning tools and streak system are backed by Supabase with Row Level Security.",
    outcome: "A production-deployed, SEO-optimized platform that gives job seekers a complete interview preparation toolkit entirely free, no paywalls, no signups required for browsing.",
    isClient: false,
  },
  {
    id: "02",
    slug: "anyformat",
    title: "ANYFORMAT",
    client: "Personal Project",
    category: "Software",
    year: "2026",
    url: "https://anyformat.rithvikshetty.in/",
    image: "/format.jpg",
    logo: "/format.jpg",
    description: "A full-stack file conversion platform built with Next.js 14, featuring 18+ tools for PDF, image, and document processing, a Redis-backed URL shortener with click analytics, Razorpay payment integration for enterprise tiers, and Google OAuth authentication. Deployed on Vercel with Upstash Redis and Cloudflare Turnstile bot protection.",
    overview: "Built a full-stack file conversion platform with 18+ tools for PDF, image, and document processing, a Redis-backed URL shortener with click analytics, and Razorpay payment integration.",
    outcome: "A production-deployed, SEO-optimized conversion platform that gives users free access to PDF merging, image conversion, QR generation, and more.",
    isClient: false,
  },
  {
    id: "03",
    slug: "tune",
    title: "TUNE CLI",
    client: "Open Source Tool",
    category: "CLI / IDE Ext",
    year: "2026",
    url: "https://devtune.rithvikshetty.in",
    githubUrl: "https://github.com/rithvikshettyy/DevTune",
    image: "/devtune-logo.png",
    logo: "/devtune-logo.png",
    description: "A terminal-based Spotify controller and IDE extension designed for developers to control their music directly from the workspace.",
    overview: "Tune CLI bridges the gap between coding and workspace focus. It's a high-performance terminal tool that allows Spotify Premium users to control their music with minimal friction, featuring a sleek, developer-first command-line interface.",
    gallery: [
      { src: "/projects/devtune_extension.png", caption: "Interface for DevTune CLI extension" },
    ],
    outcome: "Eliminates context switching for developers, providing a rhythm-driven coding environment with negligible overhead.",
    isClient: false,
  },
  {
    id: "04",
    slug: "trct-in",
    title: "TRCT.IN",
    client: "Community",
    category: "Freelance",
    year: "2026",
    url: "https://trct-in.vercel.app",
    image: "/trct.png",
    logo: "/trct.png",
    description: "A dedicated website built for a thriving run club in Thane. The platform enhances community engagement and streamlines tracking and events for runners.",
    overview: "Built for the Thane Run Club Tribe (TRCT), this platform was designed to foster local athletic communities by providing a central hub for event registrations and performance leaderboards.",
    gallery: [
      { src: "/projects/trct_1.png", caption: "Bold, redundant branding for the 'Not a club - A Cult' philosophy" },
      { src: "/projects/trct_2.png", caption: "Weekly event calendar and community tracking" },
      { src: "/projects/trct_3.png", caption: "Interaction design for upcoming race cards" }
    ],
    outcome: "A 40% increase in club membership and streamlined race day check-ins.",
    isClient: true,
  },
  {
    id: "05",
    slug: "autopharmax",
    title: "AUTOPHARMAX",
    client: "HealthTech",
    category: "Machine Learning",
    year: "2026",
    url: "https://github.com/rithvikshettyy/autopharmax",
    image: "/neon-glowing-web-design.jpg",
    description: "AI-driven platform that analyzes global drug efficacy data and clinical insights to optimize treatment outcomes.",
    overview: "An experimental platform using BERT and transformer models to synthesize clinical trial results and predict drug-to-drug interactions.",
    outcome: "Reduced research synthesis time by 65% for medical interns.",
    isClient: false,
  },
  {
    id: "06",
    slug: "seaguard",
    title: "SEAGUARD",
    client: "Hackathon",
    category: "Hackathon Project",
    year: "2025",
    url: "https://github.com/rithvikshettyy/SeaGuard",
    image: "/seaguardbottomboat.png",
    logo: "/seaguardbottomboat.png",
    description: "An innovative mobile application built with React Native, Supabase backend, and SARVAM AI integration. Features Twilio communication and Figma-designed UI.",
    overview: "SeaGuard was built in 24 hours during a global hackathon to provide real-time water quality monitoring and fisherman safety alerts using low-latency satellite data.",
    gallery: [{ src: "/isro.PNG", caption: "Our project was selected for ISRO project presentation in the presence of ISRO chairman Dr. V Narayanan" }],
    outcome: "Won the 'Most Product Readiness Award' at Hackcelestial 2.0.",
    isClient: false,
  },
  {
    id: "07",
    slug: "groww-in",
    title: "GROWW.IN",
    client: "Personal Project",
    category: "Frontend Dev",
    year: "2024",
    url: "https://github.com/rithvikshettyy/Groww.in",
    image: "/groww.jpg",
    description: "Frontend recreation of Groww investment platform. Built with React, HTML, CSS, SCSS, and Figma design. Responsive and feature-rich interface.",
    overview: "A pixel-perfect recreation of India's leading investment platform to demonstrate mastery of complex UI states and financial data visualization.",
    outcome: "A highly robust component library that mimics the production environment of Groww.",
    isClient: false,
  },
  {
    id: "08",
    slug: "looplist",
    title: "LOOPLIST",
    client: "Productive Tools",
    category: "Software",
    year: "2024",
    url: "https://github.com/rithvikshettyy/LoopList-Collaborative-ToDo-app-using-Firebase-and-Streamlit",
    image: "/geometric-app-design.jpg",
    description: "A collaborative to-do list web application that allows users to manage their tasks in real-time.",
    overview: "A real-time task management tool utilizing Firebase's real-time database to sync tasks across multiple users instantly.",
    outcome: "Zero-latency synchronization for up to 10 concurrent collaborators per project.",
    isClient: false,
  },
  {
    id: "09",
    slug: "object-measurement",
    title: "OBJECT MEASUREMENT",
    client: "Computer Vision",
    category: "Python",
    year: "2024",
    url: "https://github.com/rithvikshettyy/Object-Measurement",
    image: "/dashboard-analytics-black.jpg",
    description: "A Python project that measures the size of objects in an image using OpenCV and image processing techniques.",
    overview: "Leverages computer vision to calculate dimensions of physical objects from a 2D image using a reference scale (A4 paper).",
    outcome: "Reached 98.5% measurement accuracy across various lighting conditions.",
    isClient: false,
  },
  {
    id: "10",
    slug: "spotify-ui",
    title: "SPOTIFY.COM",
    client: "Personal UI Study",
    category: "Frontend Dev",
    year: "2023",
    url: "https://spotify-five-fawn.vercel.app/",
    image: "/spotify.jpg",
    description: "Music streaming platform UI with React, HTML, and CSS. Interactive elements and responsive design.",
    overview: "A study in dark-mode aesthetics and complex navigation patterns found in modern streaming applications.",
    outcome: "Improved responsive layout performance across 10+ viewport sizes.",
  },
]

export default function ProjectList() {
  const [projects, setProjects] = useState<any[]>(staticProjects)
  const [hoveredProject, setHoveredProject] = useState<any>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(projectsQuery)
        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (error) {
        console.error("Error fetching projects from Sanity:", error)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="py-32 px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 w-full mx-auto">
      <div className="mb-20 border-b border-white/20 pb-6 flex justify-between items-end relative overflow-visible">
        <div className="flex items-center gap-2 md:gap-4 w-fit h-fit">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">SELECTED WORKS</h2>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 md:w-24 md:h-24 relative shrink-0 -ml-6 md:-ml-0"
          >
            <Image src="/star3d.png" alt="Star Accent" fill className="object-contain drop-shadow-2xl brightness-110" />
          </motion.div>
        </div>
        <span className="hidden md:inline-block text-sm text-neutral-500">( 2022 — 2026 )</span>
      </div>

      <div className="flex flex-col" onMouseMove={handleMouseMove}>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
          />
        ))}
      </div>

      {/* Floating Hover Image */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          scale: hoveredProject ? 1 : 0,
          opacity: hoveredProject ? 1 : 0,
          rotate: hoveredProject ? 5 : 0,
        }}
        className="fixed top-0 left-0 w-80 h-52 pointer-events-none z-[60] overflow-hidden rounded-xl border border-white/20 shadow-2xl transition-all duration-300 ease-out"
      >
        {hoveredProject && (
          <Image
            src={hoveredProject.image || "/placeholder.svg"}
            alt={hoveredProject.title}
            fill
            className="object-cover"
          />
        )}
      </motion.div>

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

function ProjectItem({ project, onMouseEnter, onMouseLeave }: { project: any; onMouseEnter: () => void; onMouseLeave: () => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Use local slug-based URL if available, otherwise external URL, otherwise /projects
  const href = project.slug ? `/projects/${project.slug}` : (project.url || "/projects")
  const isExternal = !project.slug && project.url && project.url.startsWith("http")
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
