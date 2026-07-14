"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { usePathname } from "next/navigation"

type Mode = "dark" | "light"

export default function ModeToggle() {
  const pathname = usePathname()
  if (pathname?.startsWith("/studio") || pathname === "/chat") return null

  const [mode, setMode] = useState<Mode>("dark")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedMode = localStorage.getItem("theme-mode")
    // Migrate the removed "contrast" mode to dark.
    if (savedMode === "light" || savedMode === "dark") {
      applyMode(savedMode)
    } else if (savedMode) {
      applyMode("dark")
    }
  }, [])

  const applyMode = (newMode: Mode) => {
    setMode(newMode)
    localStorage.setItem("theme-mode", newMode)
    
    const html = document.documentElement
    html.classList.remove("light", "contrast", "dark")
    if (newMode === "light") html.classList.add("light")
    if (newMode === "dark") html.classList.add("dark")
  }

  const modes = [
    { id: "dark", icon: Moon, label: "Dark Mode" },
    { id: "light", icon: Sun, label: "Light Mode" },
  ]

  const CurrentIcon = modes.find(m => m.id === mode)?.icon || Moon

  // Don't render until mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300, 
        staggerChildren: 0.05, 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20, 
      transition: { type: "spring", damping: 25, stiffness: 300 } 
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 p-2 bg-neutral-900 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl mb-2 origin-bottom-right"
          >
            {modes.map((m) => (
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: -6 }}
                whileTap={{ scale: 0.95 }}
                key={m.id}
                onClick={() => {
                  applyMode(m.id as Mode)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  mode === m.id ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/10"
                }`}
              >
                <m.icon size={16} />
                {m.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-white text-black rounded-full shadow-2xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-white/50 relative overflow-hidden"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon size={24} />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
