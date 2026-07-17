import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ExperienceSection from '@/components/experience-section'

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 md:pt-32">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 2xl:px-72">
        <Link
          href="/"
          prefetch={false}
          className="group inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back Home
        </Link>
      </div>
      <ExperienceSection />
    </main>
  )
}
