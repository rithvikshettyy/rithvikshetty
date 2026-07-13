"use client"

import { motion } from "framer-motion"
import {
  Code2,
  Terminal,
  Database,
  PenTool,
  Layout,
  Smartphone,
  Cloud,
  MonitorSmartphone,
  Wind,
  Box,
  FileCode2,
  Server
} from "lucide-react"

const techStack = [
  { name: "REACT JS", icon: Code2, color: "#61DAFB" },
  { name: "TAILWIND CSS", icon: Wind, color: "#38B2AC" },
  { name: "TYPESCRIPT", icon: FileCode2, color: "#3178C6" },
  { name: "PYTHON", icon: Terminal, color: "#3776AB" },
  { name: "NODE JS", icon: Server, color: "#339933" },
  { name: "DOCKER", icon: Box, color: "#2496ED" },
  { name: "POSTGRESQL", icon: Database, color: "#336791" },
  { name: "MERN", icon: Database, color: "#47A248" },
  { name: "FIGMA", icon: PenTool, color: "#F24E1E" },
  { name: "FRONTEND", icon: Layout, color: "#E34F26" },
  { name: "APP DEV", icon: Smartphone, color: "#007AFF" },
  { name: "AWS", icon: Cloud, color: "#FF9900" },
  { name: "REACT NATIVE", icon: MonitorSmartphone, color: "#61DAFB" },
]

export default function Marquee() {
  return (
    <div className="py-12 md:py-[72px] border-y border-black/5 overflow-hidden flex bg-white text-black relative z-20">
      <motion.div
        className="flex whitespace-nowrap gap-20 md:gap-32 items-center"
        animate={{ x: [0, -6000] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration: 75,
        }}
      >
        {[...techStack, ...techStack, ...techStack, ...techStack].map((item, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-12 transition-all duration-300">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-3 md:p-[18px] bg-[#1a1a1a] rounded-[1.25rem] md:rounded-[1.5rem] border-2 shadow-2xl"
              style={{ borderColor: `${item.color}20` }}
            >
              <item.icon size={64} strokeWidth={1.5} color={item.color} className="w-[30px] h-[30px] md:w-[48px] md:h-[48px]" />
            </motion.div>
            <span className="text-[45px] md:text-8xl lg:text-[7.5vw] font-black tracking-tighter uppercase">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
