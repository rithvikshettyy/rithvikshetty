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
  // The bar starts hidden and reveals on activity: while scrolled past the hero,
  // or briefly whenever the cursor moves. It hides again when idle at the top.
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // On the landing page the bar reveals on scroll only; elsewhere it also
    // reveals briefly on cursor movement.
    const cursorReveal = pathname !== "/"
    let cursorActive = false
    let idle: ReturnType<typeof setTimeout>

    const update = () => setHidden(!(window.scrollY >= 80 || cursorActive))

    const onScroll = () => update()
    const onMove = () => {
      cursorActive = true
      update()
      clearTimeout(idle)
      idle = setTimeout(() => {
        cursorActive = false
        update()
      }, 2500)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    if (cursorReveal) window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      clearTimeout(idle)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMove)
    }
  }, [pathname])

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
        RHVK
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-4 xl:gap-8 pointer-events-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            prefetch={false}
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
              prefetch={false}
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
