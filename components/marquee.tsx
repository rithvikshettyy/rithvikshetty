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
    <div className="py-16 md:py-24 border-y border-black/5 overflow-hidden flex bg-white text-black relative z-20">
      <motion.div
        className="flex whitespace-nowrap gap-20 md:gap-32 items-center"
        animate={{ x: [0, -4000] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration: 50,
        }}
      >
        {[...techStack, ...techStack, ...techStack, ...techStack].map((item, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-12 transition-all duration-300">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-4 md:p-6 bg-[#1a1a1a] rounded-[1.5rem] md:rounded-[2rem] border-2 shadow-2xl"
              style={{ borderColor: `${item.color}20` }}
            >
              <item.icon size={64} strokeWidth={1.5} color={item.color} className="w-10 h-10 md:w-16 md:h-16" />
            </motion.div>
            <span className="text-6xl md:text-9xl lg:text-[10vw] font-black tracking-tighter uppercase">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
