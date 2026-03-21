"use client"

import { motion } from "framer-motion"
import { Code2, Terminal, Database, PenTool, Layout, Smartphone, Cloud, MonitorSmartphone } from "lucide-react"

const techStack = [
  { name: "REACT JS", icon: Code2, color: "#61DAFB" },
  { name: "PYTHON", icon: Terminal, color: "#3776AB" },
  { name: "MERN", icon: Database, color: "#47A248" },
  { name: "FIGMA", icon: PenTool, color: "#F24E1E" },
  { name: "FRONTEND", icon: Layout, color: "#E34F26" },
  { name: "APP DEV", icon: Smartphone, color: "#007AFF" },
  { name: "AWS", icon: Cloud, color: "#FF9900" },
  { name: "REACT NATIVE", icon: MonitorSmartphone, color: "#61DAFB" },
]

export default function Marquee() {
  return (
    <div className="py-10 md:py-20 border-y border-white/10 overflow-hidden flex bg-white text-black relative z-20">
      <motion.div
        className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration: 40,
        }}
      >
        {[...techStack, ...techStack, ...techStack, ...techStack].map((item, i) => (
          <div key={i} className="flex items-center gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-2xl"
            >
              <item.icon size={48} strokeWidth={1} color={item.color} />
            </motion.div>
            <span className="text-5xl md:text-7xl font-bold tracking-tighter">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
