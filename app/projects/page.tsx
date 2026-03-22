"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

const clientProjects = [
  {
    title: "TinyRoomConcert",
    description: "An immersive platform built for intimate live music sessions, providing musicians a space to perform and fans a unique way to discover and attend exclusive concerts.",
    year: "2026",
    image: "/ttrc.png",
    url: "https://tinyroomconcert.vercel.app",
  },
  {
    title: "TRCT.IN",
    description: "A dedicated website built for a thriving run club in Thane. The platform enhances community engagement and streamlines tracking and events for runners.",
    year: "2026",
    image: "/trct.png",
    url: "https://trct-in.vercel.app",
  },
]

const myProjects = [
  {
    title: "AutopharmaX",
    description: "AI-driven platform that analyzes global drug efficacy data and clinical insights to optimize treatment outcomes.",
    year: "2026",
    image: "/neon-glowing-web-design.jpg",
    url: "https://github.com/rithvikshettyy/autopharmax",
  },
  {
    title: "SeaGuard",
    description: "An innovative mobile application built with ReactNative, Supabase backend, and SARVAM AI integration. Features Twilio communication and Figma-designed UI.",
    year: "2025",
    image: "/seaguardbottomboat.png",
    url: "https://github.com/rithvikshettyy/SeaGuard",
  },
  {
    title: "Groww.in",
    description: "Frontend recreation of Groww investment platform. Built with React, HTML, CSS, SCSS, and Figma design. Responsive and feature-rich interface.",
    year: "2024",
    image: "/groww.jpg",
    url: "https://github.com/rithvikshettyy/Groww.in",
  },
  {
    title: "LoopList",
    description: "A collaborative to-do list web application that allows users to manage their tasks in real-time.",
    year: "2024",
    image: "/geometric-app-design.jpg",
    url: "https://github.com/rithvikshettyy/LoopList-Collaborative-ToDo-app-using-Firebase-and-Streamlit",
  },
  {
    title: "Object Measurement",
    description: "This Python project demonstrates how to measure the size of objects in an image using OpenCV. It employs image processing techniques to detect objects and calculate their dimensions, provided a known reference object or scale.",
    year: "2024",
    image: "/dashboard-analytics-black.jpg",
    url: "https://github.com/rithvikshettyy/Object-Measurement",
  },
  {
    title: "Spotify.com",
    description: "Music streaming platform UI with React, HTML, and CSS. Interactive elements and responsive design showcasing frontend expertise.",
    year: "2023",
    image: "/spotify.jpg",
    url: "https://spotify-five-fawn.vercel.app/",
  },
  {
    title: "Portfolio Website",
    description: "Professional portfolio website showcasing projects and work. Built with modern web technologies and design principles.",
    year: "2026",
    image: "/rithvik.png",
    url: "https://github.com/rithvikshettyy/rithvikshetty",
  },
]

export default function ProjectsPage() {
  const renderProjectCard = (project: any, index: number) => (
    <Link
      key={index}
      href={project.url || "#"}
      target={project.url ? "_blank" : undefined}
      rel={project.url ? "noopener noreferrer" : undefined}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 mb-4 md:mb-6 rounded-lg">
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-10" />
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2 md:mb-3 gap-2">
            <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
            <span className="text-xs md:text-sm font-mono text-neutral-500 flex-shrink-0">{project.year}</span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed mb-3 md:mb-4">{project.description}</p>
          <span className="inline-block text-xs text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
            View Project →
          </span>
        </div>
      </motion.div>
    </Link>
  );

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80">
        <div className="mb-12 md:mb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest text-neutral-500 hover:text-white mb-6 md:mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back Home
          </Link>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
            My <span className="text-neutral-600">Projects</span>
          </h1>
          <p className="text-neutral-400 mt-4 md:mt-6 text-base md:text-xl max-w-2xl font-light">
            A curated selection of client commissions and personal initiatives across engineering and design.
          </p>
        </div>

        {/* Client Projects Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-500 whitespace-nowrap">Client Projects</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-20">
            {clientProjects.map((project, index) => renderProjectCard(project, index))}
          </div>
        </div>

        {/* My Projects Section */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-500 whitespace-nowrap">My Projects</h2>
            <div className="h-[1px] w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-20">
            {myProjects.map((project, index) => renderProjectCard(project, index))}
          </div>
        </div>
      </div>
    </div>
  );
}
