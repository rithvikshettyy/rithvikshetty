"use client"

import { Github, Terminal, Cpu, Globe, Layers, Megaphone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Mock data for the team
const developers = [
  {
    id: 1,
    name: "Yash Varma",
    role: "Full Stack Developer", // Updated from Backend Developer to Full Stack Developer
    github: "https://github.com/yashgv",
    portfolio: "https://www.yashvarma.in/",
    bio: "Architecting robust server-side systems. Focusing on scalability, security, and efficient data management.",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
    icon: Terminal,
  },
  {
    id: 2,
    name: "Vinay Pokharkar",
    role: "Frontend Developer",
    github: "https://github.com/vinaypokharkar",
    bio: "Building responsive and interactive user interfaces. transforming designs into seamless web experiences.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    icon: Layers,
  },
  {
    id: 3,
    name: "Shubham Patil",
    role: "Frontend Designer",
    github: "https://github.com/Shucrates",
    bio: "Blending aesthetics with functionality. Crafting unique visual languages and user-centric designs.",
    skills: ["UI/UX", "Figma", "Motion", "React"],
    icon: Cpu,
  },
  {
    id: 4,
    name: "Rithvik Shetty",
    role: "Frontend Developer",
    github: "https://github.com/rithvikshettyy",
    portfolio: "https://www.rithvikshetty.in/",
    bio: "Pushing the boundaries of web performance. Creating smooth, immersive, and accessible applications.",
    skills: ["React", "TypeScript", "Three.js", "GSAP"],
    icon: Globe,
  },
  {
    id: 5,
    name: "Vedant Thakur",
    role: "Marketing Head",
    github: "https://github.com/vedant3715",
    bio: "Driving brand growth and market presence. Connecting innovative solutions with the right audience.",
    skills: ["Strategy", "Growth", "Branding", "Analytics"],
    icon: Megaphone,
  },
]

export default function TeamGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-white/20 border border-white/20">
      {developers.map((dev, index) => (
        <div
          key={dev.id}
          className={cn(
            "group relative h-[400px] md:h-[500px] bg-black p-8 md:p-12 flex flex-col justify-between overflow-hidden transition-all duration-500",
            hoveredId === dev.id ? "bg-neutral-900" : "hover:bg-neutral-950",
          )}
          onMouseEnter={() => setHoveredId(dev.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <div className="absolute right-[-20%] top-[-20%] w-[60%] h-[60%] border-[20px] border-white rounded-full blur-3xl" />
            <div className="absolute left-[-10%] bottom-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <dev.icon className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-neutral-500">0{index + 1}</div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-2 group-hover:translate-x-2 transition-transform duration-300">
              {dev.name}
            </h3>
            <p className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6">{dev.role}</p>

            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {dev.skills.map((skill) => (
                <span key={skill} className="text-[10px] uppercase border border-white/20 px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
              {dev.bio}
            </p>

            <div className="flex gap-6 items-center">
              <Link
                href={dev.github}
                target="_blank"
                className="inline-flex items-center gap-2 text-white group-hover:text-neutral-200 hover:text-neutral-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="uppercase tracking-widest text-sm hidden sm:inline">Github</span>
              </Link>
              {dev.portfolio && (
                <Link
                  href={dev.portfolio}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-white group-hover:text-neutral-200 hover:text-neutral-400 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-sm hidden sm:inline">Website</span>
                </Link>
              )}
            </div>
          </div>

          {/* Hover Glitch/Line Effect */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      ))}
    </div>
  )
}
