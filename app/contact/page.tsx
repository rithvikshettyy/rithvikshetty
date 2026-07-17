"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ContactSection from "@/components/contact-section"

export default function ContactPage() {
  return (
    <div className="h-[100dvh] flex flex-col justify-center relative overflow-hidden text-white">
      {/* Back link — pinned top, aligned with the section's container */}
      <div className="absolute top-6 md:top-8 inset-x-0 z-20">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back Home
          </Link>
        </div>
      </div>
      <ContactSection compact />
    </div>
  )
}
