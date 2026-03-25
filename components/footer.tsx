"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

const AsciiArt = dynamic(() => import("./ascii-art"), { ssr: false })

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith("/studio") || pathname?.startsWith("/playground") || pathname?.match(/^\/projects\/.+/)) return null

  return (
    <footer className="bg-black border-t border-white/10 py-20 px-6">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
        <div className="relative group">
          <div className="absolute -inset-10 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none transform scale-[0.8] md:scale-110 lg:scale-125 translate-y-[-10px]">
            <AsciiArt />
          </div>
          <h2 className="relative z-10 text-[15vw] md:text-[120px] leading-[0.8] font-bold tracking-tighter select-none text-neutral-600 hover:text-white transition-colors duration-700 cursor-default">
            Rish.
          </h2>
        </div>
        </div>

        <div className="flex gap-12 text-xs uppercase tracking-widest text-neutral-400">
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2 font-bold">Socials</span>
            <Link href="https://x.com/RithvikShetty04" className="hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="https://instagram.com/rithv1k7" className="hover:text-white transition-colors">
              Instagram
            </Link>
            <Link href="https://www.linkedin.com/in/rithvikshetty/" className="hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="https://github.com/rithvikshettyy" className="hover:text-white transition-colors">
              GitHub
            </Link>
            <Link href="https://in.pinterest.com/mayberithvik/" className="hover:text-white transition-colors">
              Pinterest
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2 font-bold">Legal</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-8 md:px-20 lg:px-40 xl:px-64 2xl:px-80 mt-24 pt-8 border-t border-white/10 flex justify-between text-xs text-neutral-400 uppercase tracking-wider">
        <span>© 2026 Rithvik Shetty</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  )
}
