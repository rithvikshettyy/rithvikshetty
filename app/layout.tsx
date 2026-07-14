import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MouseFollower from "@/components/mouse-follower"
import ModeToggle from "@/components/mode-toggle"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://rithvikshetty.in"),
  title: "Rithvik Shetty | Full Stack Developer & Freelancer",
  description: "Full stack developer and freelancer specializing in React, Next.js, and modern web technologies. Crafting minimalist, high-performance digital solutions.",
  keywords: [
    "Rithvik Shetty",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Development",
    "Creative Technologist",
    "Freelance Developer",
    "Portfolio",
  ],
  authors: [{ name: "Rithvik Shetty" }],
  creator: "Rithvik Shetty",
  publisher: "Rithvik Shetty",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rithvikshetty.in",
    siteName: "Rithvik Shetty",
    title: "Rithvik Shetty | Full Stack Developer & Freelancer",
    description: "Crafting digital experiences with code and creativity. Explore rithvikshetty.in for top-tier full-stack solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rithvik Shetty - Full Stack Developer - Freelancer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithvik Shetty | Full Stack Developer | Freelancer",
    description: "Building the future of the web with performance and aesthetics.",
    images: ["/og-image.png"],
    creator: "@RithvikShetty04", // Recommended to match your social handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "jHG7Fl5URrypSSrxEe-PirtreNUxDNNSVvSafgwSVVo",
  },
  alternates: {
    canonical: "https://rithvikshetty.in",
  },
  generator: "Next.js",
  icons: {
    icon: "/favicon-blob.png",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Set theme before paint: saved choice wins, else follow the OS. Avoids a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('theme-mode');var mode=(m==='light'||m==='dark')?m:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');var el=document.documentElement;el.classList.remove('light','dark','contrast');el.classList.add(mode);}catch(e){}})();`,
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rithvik Shetty" />
        <meta name="msvalidate.01" content="DC7ED36D639D0F0C364F09274887F754" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rithvik Shetty",
              url: "https://rithvikshetty.in",
              jobTitle: "Full Stack Developer",
              description: "Full stack developer and freelancer specializing in React, Next.js, and modern web technologies",
              sameAs: [
                "https://github.com/rithvikshettyy",
                "https://www.linkedin.com/in/rithvikshetty/",
                "https://in.pinterest.com/mayberithvik/"
              ],
              image: "https://rithvikshetty.in/og-image.png",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Rithvik Shetty",
              url: "https://rithvikshetty.in",
              description: "Portfolio of Rithvik Shetty, a full stack developer and freelancer specializing in React, Next.js, and modern web technologies.",
              author: {
                "@type": "Person",
                name: "Rithvik Shetty",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-black text-white min-h-screen flex flex-col overflow-x-hidden`}>
        <MouseFollower />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ModeToggle />
        <Analytics />
      </body>
    </html>
  )
}
