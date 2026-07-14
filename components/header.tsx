"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  // { name: "Playground", path: "/playground" },
  { name: "About", path: "/about" },
  { name: "Awards", path: "/awards" },
  { name: "Contact", path: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Pages with a full-screen hero: the bar starts hidden over the hero and
  // slides in on scroll.
  const slideOnScroll = pathname === "/" || pathname === "/awards"
  const [hidden, setHidden] = useState(slideOnScroll)

  useEffect(() => {
    if (!slideOnScroll) {
      setHidden(false)
      return
    }
    const onScroll = () => setHidden(window.scrollY < 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [slideOnScroll])

  if (pathname?.startsWith("/studio") || pathname?.match(/^\/projects\/.+/) || pathname === "/chat") return null

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 md:py-6 flex justify-between items-center text-white pointer-events-none bg-black/80 backdrop-blur-md transition-transform duration-300 ease-out",
        hidden && "-translate-y-full",
      )}
    >
      <Link
        href="/"
        className="text-xl md:text-2xl font-bold tracking-tighter uppercase hover:opacity-70 transition-opacity pointer-events-auto"
      >
        RS
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-4 xl:gap-8 pointer-events-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={cn(
              "text-xs md:text-sm font-medium tracking-tight transition-colors hover:text-gray-400",
              pathname === item.path ? "text-gray-500" : "text-white"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden pointer-events-auto p-2 hover:opacity-70 transition-opacity"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-black border-t border-white/10 flex flex-col pointer-events-auto lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 text-sm font-medium tracking-tight border-b border-white/10 transition-colors hover:bg-white/5",
                pathname === item.path && "opacity-50 bg-white/5",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
