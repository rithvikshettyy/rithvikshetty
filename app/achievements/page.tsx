'use client'

import { motion, Variants } from 'framer-motion'
import { Trophy, Award, Medal, BookOpen, GraduationCap } from 'lucide-react'
import Image from 'next/image'

const hackathons = [
  {
    title: "Conquer Space - Inter Collegiate Exhibition",
    description: "In presence of Dr. V. Narayanan, Chairman of ISRO",
    date: "October, 2025",
    icon: Medal,
    image: "/isro.png",
  },
  {
    title: "Title Winner - Most Product Readiness Award:  HackCelestial 2.0",
    description: "Around 250+ participants",
    date: "September 2025",
    icon: Trophy,
    image: "/hackcelestial.png",
  },
  {
    title: "First Position in Cognition'24",
    description: "Technical Team, SIESGST",
    date: "2024-2025",
    icon: Award,
    image: "/cognition.png",
  },
  {
    title: "Technical Head - Student Council",
    description: "Technical Team, SIESGST",
    date: "2024-2025",
    icon: Award,
    image: "/tech_head.jpg",
  },
]

const research = [
  {
    title: "Attention Enhanced Speaker representation with Contrastive Learning",
    publisher: "ICCUBEA, IEEE",
    year: "2025",
    image: "/about1.jpeg",
  },
  {
    title: "Advanced Fake News Detection Using BERT and Ensemble Learning",
    publisher: "ICDSM, Springer",
    year: "2024",
    image: "/about1.jpeg",
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function Achievements() {
  return (
    <main className="w-full bg-black text-white min-h-screen pt-32 pb-20 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <section className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 relative z-10">

        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-600">Fame</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-400 font-light max-w-2xl tracking-wide">
            A relentless pursuit of boundaries—exploring hackathons, academic research, and published works.
          </p>
        </motion.div>

        {/* Hackathons & Achievements Section */}
        <div className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-10 md:mb-16"
          >
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-neutral-500" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Achievements & Hackathons</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {hackathons.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:bg-neutral-900/50 hover:border-white/20 transition-all duration-500 flex flex-col min-h-[450px]"
              >
                <div className="relative h-56 md:h-64 w-full overflow-hidden border-b border-white/10">
                  <Image src={item.image} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                      <item.icon className="w-6 h-6 text-neutral-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight leading-tight group-hover:text-white text-neutral-100">{item.title}</h3>
                    <p className="text-neutral-400 text-base leading-relaxed mb-8">{item.description}</p>
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
                    <span className="text-sm font-medium text-neutral-300">{item.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Research & Publications Section */}
        {/*
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-10 md:mb-16 border-t border-white/10 pt-16 md:pt-24"
          >
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-neutral-500" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Research & Published Works</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {research.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:bg-neutral-900/50 hover:border-white/20 transition-all duration-500"
              >
                <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-white/10 bg-black flex items-center justify-center">
                  <div className="absolute inset-0 z-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 blur-[2px] group-hover:blur-none" />
                  </div>
                  <GraduationCap className="w-20 h-20 text-white/50 relative z-10 group-hover:opacity-0 transition-opacity duration-300 drop-shadow-2xl" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight leading-tight group-hover:text-white text-neutral-100">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="px-5 py-2 hover:bg-white hover:text-black transition-colors duration-300 bg-white/10 border border-white/20 rounded-full cursor-pointer">
                      <span className="text-sm md:text-base font-semibold tracking-wide">{item.publisher}</span>
                    </div>
                    <span className="text-xl font-light text-neutral-500">{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        */}

      </section>
    </main>
  )
}
